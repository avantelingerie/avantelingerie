import express from 'express';
import PocketBase from 'pocketbase';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';
import fs from 'node:fs';
import path from 'node:path';

const router = express.Router();

const POCKETBASE_HOST = process.env.POCKETBASE_URL || (process.env.NODE_ENV === 'production' ? 'http://localhost:8090' : 'https://avantelingerie.com.br/hcgi/platform');
const PRIMARY_MODEL = 'nvidia/nemotron-3-super-120b-a12b:free';
const FALLBACK_MODEL = 'nvidia/nemotron-3.5-lightning:free';
const TERTIARY_MODEL = 'nvidia/nemotron-3-ultra-550b-a55b:free';

// Middleware: Autenticação isolada por requisição (previne poluição do singleton pb global)
const requireAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido' });
  }

  try {
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    // Cria instância isolada para validar o token do admin sem mutar o singleton do backend
    const requestPb = new PocketBase(POCKETBASE_HOST);
    requestPb.authStore.save(token, null);

    const authData = await requestPb.collection('usuarios').authRefresh();
    if (!authData?.record || authData.record.collectionName !== 'usuarios') {
      return res.status(403).json({ error: 'Acesso restrito exclusivamente ao Administrador' });
    }

    req.admin = authData.record;
    next();
  } catch (err) {
    logger.warn('Tentativa de acesso não autorizado à Central Nemotron:', err.message);
    return res.status(403).json({ error: 'Sessão administrativa inválida ou expirada' });
  }
};

// Sanitizador de dados de pedidos (Zero PII - Remove CPF, email, endereço, telefone para conformidade LGPD)
const sanitizarPedidos = (pedidos) => {
  return pedidos.map(p => ({
    id: p.id,
    numero_pedido: p.numero_pedido,
    status: p.status,
    valor_total: p.valor_total,
    created: p.created,
    itens: Array.isArray(p.itens) ? p.itens.map(item => ({
      sku: item.sku || item.codigo || 'SEM_SKU',
      quantidade: item.quantidade || item.qtd || 1,
      preco_unitario: item.preco_unitario || item.preco || 0
    })) : []
  }));
};

// Coleta de contexto da loja em tempo real
const coletarContextoLoja = async () => {
  try {
    const seteDiasAtras = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // 1. Pedidos recentes dos últimos 7 dias (sanitizados, max 30)
    const pedidosRaw = await pb.collection('pedidos').getList(1, 30, {
      filter: `created >= "${seteDiasAtras}"`,
      sort: '-created'
    });
    const pedidosSanitizados = sanitizarPedidos(pedidosRaw.items || []);

    // 2. Variações com estoque crítico (estoque <= 3)
    const variacoesCriticas = await pb.collection('variacoes').getList(1, 20, {
      filter: 'estoque <= 3 && status = true',
      expand: 'produto_id',
      sort: 'estoque'
    });
    const estoqueAlerta = (variacoesCriticas.items || []).map(v => ({
      sku: v.sku,
      cor: v.cor,
      tamanho: v.tamanho,
      estoque: v.estoque,
      produto: v.expand?.produto_id?.nome || 'Produto'
    }));

    return {
      pedidos_ultimos_7_dias_total: pedidosRaw.totalItems,
      amostra_pedidos_recentes: pedidosSanitizados.slice(0, 5),
      itens_estoque_critico: estoqueAlerta
    };
  } catch (err) {
    logger.error('Erro ao coletar contexto da loja para Nemotron:', err);
    return { erro_contexto: 'Não foi possível carregar métricas em tempo real' };
  }
};

// Chamador seguro do OpenRouter com fallback
async function chamarOpenRouter(model, messages, timeoutMs = 25000) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('Chave OPENROUTER_API_KEY não configurada no servidor.');
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://avantelingerie.com.br',
        'X-Title': 'Avante Lingerie Admin HUD'
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter status ${response.status}: ${errText}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message || 'Erro do provedor OpenRouter');
    }

    return {
      content: data.choices?.[0]?.message?.content || '',
      modelUsed: model
    };
  } finally {
    clearTimeout(timer);
  }
}

// POST /hcgi/api/nemotron/analisar
router.post('/analisar', requireAdmin, async (req, res) => {
  try {
    const { prompt, pageContext, arquivoPath } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'O prompt é obrigatório' });
    }

    // Coleta dados estruturados do banco (Zero PII)
    const dadosBanco = await coletarContextoLoja();

    // Injeção de arquivo seguro sob demanda (com prevenção contra directory traversal)
    let arquivoSnippet = '';
    if (arquivoPath && typeof arquivoPath === 'string') {
      const sanitizedRelative = path.normalize(arquivoPath).replace(/^(\.\.[\/\\])+/, '');
      let rootDir = process.cwd();
      if (!fs.existsSync(path.join(rootDir, 'apps'))) {
        if (fs.existsSync(path.resolve(rootDir, '../apps'))) rootDir = path.resolve(rootDir, '..');
        else if (fs.existsSync(path.resolve(rootDir, '../../apps'))) rootDir = path.resolve(rootDir, '../..');
      }
      const fullPath = path.resolve(rootDir, sanitizedRelative);

      if (fullPath.startsWith(rootDir) && fs.existsSync(fullPath)) {
        const stat = fs.statSync(fullPath);
        if (!stat.isDirectory() && stat.size < 80000) {
          arquivoSnippet = `\n\n[ARQUIVO SOLICITADO: ${sanitizedRelative}]\n\`\`\`\n${fs.readFileSync(fullPath, 'utf8')}\n\`\`\``;
        }
      }
    }

    const systemPrompt = `Você é o Nemotron, Copiloto Estratégico, Auditor de Código e Diretor de PCP da Avante Lingerie.
Você está conversando diretamente com o Administrador (Luiz) no Painel Executivo Flutuante da loja.

Conhecimento do Ecossistema Avante:
- A Lia é a Consultora de Vendas oficial e Inteligência Artificial de atendimento da Avante Lingerie (opera no WhatsApp e no chat de vitrine da loja).
- Você (Nemotron) e a Lia trabalham juntos no ecossistema: a Lia cuida do atendimento aos clientes, recomendação de peças e conversão, enquanto você é o braço direito do Luiz na gestão interna, estratégias, PCP fabril, estoque e auditoria técnica.
- A Ada é a Arquiteta de Software Líder do projeto (responsável por codificar e implementar todas as decisões nos arquivos do sistema).

Contexto atual da navegação do Admin: ${JSON.stringify(pageContext || {})}
Métricas da Loja em tempo real (Zero PII): ${JSON.stringify(dadosBanco)}
${arquivoSnippet}

Diretrizes Obrigatórias:
1. Seja altamente analítico, direto, técnico, cortês e estratégico. Responda em Português do Brasil com formatação Markdown limpa.
2. Ao diagnosticar bugs ou sugerir melhorias de código, entregue o trecho exato de código limpo e pronto para a Ada implementar no projeto.
3. Para estoque e vendas, sugira prioridades de corte e reposição para a fábrica e facções.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ];

    let result;
    try {
      result = await chamarOpenRouter(PRIMARY_MODEL, messages);
    } catch (primaryErr) {
      logger.warn('Nemotron Super indisponível, acionando fallback Lightning:', primaryErr.message);
      try {
        result = await chamarOpenRouter(FALLBACK_MODEL, messages);
      } catch (fallbackErr) {
        logger.warn('Nemotron Lightning indisponível, acionando fallback Ultra 550B:', fallbackErr.message);
        result = await chamarOpenRouter(TERTIARY_MODEL, messages);
      }
    }

    return res.json({
      success: true,
      reply: result.content,
      modelUsed: result.modelUsed,
      contextSummary: {
        pedidosSemana: dadosBanco.pedidos_ultimos_7_dias_total || 0,
        itensCriticos: dadosBanco.itens_estoque_critico?.length || 0
      }
    });
  } catch (error) {
    logger.error('Erro na rota Nemotron:', error);
    return res.status(500).json({
      error: 'Falha ao processar consulta na Central Nemotron',
      details: error.message
    });
  }
});

export default router;
