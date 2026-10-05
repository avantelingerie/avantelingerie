import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';
import { getBlingToken } from '../utils/blingTokenManager.js';

const router = express.Router();

// GET /integracoes/status - Returns status of all integrations
router.get('/status', async (req, res) => {
  const integracoes = await pb.collection('integracoes_config').getFullList();

  const statusMap = {};

  integracoes.forEach((integracao) => {
    const servico = integracao.servico;
    if (!statusMap[servico]) {
      statusMap[servico] = {
        status: integracao.status_conexao || 'nao_testado',
        ultimo_teste: integracao.ultimo_teste || null,
      };
    }
  });

  // Ensure all services are represented
  const servicosEsperados = ['bling', 'stripe', 'melhor_envio', 'gemini', 'whatsapp', 'anthropic'];
  servicosEsperados.forEach((servico) => {
    if (!statusMap[servico]) {
      statusMap[servico] = {
        status: 'nao_configurado',
        ultimo_teste: null,
      };
    }
  });

  res.json(statusMap);
});

// POST /integracoes/salvar - Save integration configuration
router.post('/salvar', async (req, res) => {
  const { servico, chave_nome, chave_valor, ambiente } = req.body;

  if (!servico || !chave_nome || chave_valor === undefined) {
    throw new Error('Campos obrigatórios: servico, chave_nome, chave_valor');
  }

  const existing = await pb.collection('integracoes_config').getFullList({
    filter: `servico = "${servico}" && chave_nome = "${chave_nome}"`,
  });

  let savedConfig;
  if (existing.length > 0) {
    savedConfig = await pb.collection('integracoes_config').update(existing[0].id, {
      chave_valor,
      status_conexao: 'nao_testado',
    });
  } else {
    savedConfig = await pb.collection('integracoes_config').create({
      servico,
      chave_nome,
      chave_valor,
      ambiente: ambiente || 'producao',
      ativo: true,
      status_conexao: 'nao_testado',
    });
  }

  logger.info(`Configuração de integração salva: servico=${servico}, chave_nome=${chave_nome}`);

  res.status(200).json({
    sucesso: true,
    mensagem: 'Configuração salva com sucesso',
    record_id: savedConfig.id,
  });
});

// POST /integracoes/limpar - Clear integration key
router.post('/limpar', async (req, res) => {
  const { servico, chave_nome, senha } = req.body;

  if (!servico) {
    throw new Error('Campo obrigatório: servico');
  }

  // Validate security password/PIN
  const configSenha = process.env.INTEGRACOES_LIMPAR_SENHA || 'avante@master';
  if (senha !== configSenha) {
    return res.status(401).json({ sucesso: false, mensagem: 'Senha de liberação incorreta' });
  }

  if (servico === 'stripe') {
    // Clear all stripe configurations
    const existing = await pb.collection('integracoes_config').getFullList({
      filter: 'servico = "stripe"',
    });
    for (const record of existing) {
      await pb.collection('integracoes_config').delete(record.id);
    }
  } else if (servico === 'bling') {
    // Clear all bling tokens
    try {
      const tokens = await pb.collection('bling_tokens').getFullList();
      for (const token of tokens) {
        await pb.collection('bling_tokens').delete(token.id);
      }
    } catch (e) {
      logger.error(`Erro ao limpar tokens do Bling: ${e.message}`);
    }
    // Clear bling status config
    const existing = await pb.collection('integracoes_config').getFullList({
      filter: 'servico = "bling"',
    });
    for (const record of existing) {
      await pb.collection('integracoes_config').delete(record.id);
    }
  } else {
    // Clear single config key
    if (!chave_nome) {
      throw new Error('Campo obrigatório para este serviço: chave_nome');
    }
    const existing = await pb.collection('integracoes_config').getFullList({
      filter: `servico = "${servico}" && chave_nome = "${chave_nome}"`,
    });
    for (const record of existing) {
      await pb.collection('integracoes_config').delete(record.id);
    }
  }

  logger.info(`Configuração de integração limpa: servico=${servico}`);

  res.json({
    sucesso: true,
    mensagem: 'Configuração limpa com sucesso',
  });
});

// POST /integracoes/testar/:servico - Test connection with external API
router.post('/testar/:servico', async (req, res) => {
  const { servico } = req.params;

  if (!servico) {
    throw new Error('Parâmetro servico é obrigatório');
  }

  let sucesso = false;
  let mensagem = '';

  try {
    if (servico === 'bling') {
      const blingApiToken = await getBlingToken();

      const response = await axios.get(
        'https://api.bling.com.br/Api/v3/produtos?pagina=1&limite=1',
        {
          headers: {
            'Authorization': `Bearer ${blingApiToken}`,
            'Accept': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        sucesso = true;
        mensagem = 'Conexão com Bling estabelecida com sucesso';
      }
    } else if (servico === 'stripe') {
      let stripeSecretKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeSecretKey) {
        const configs = await pb.collection('integracoes_config').getFullList({
          filter: 'servico = "stripe" && (chave_nome = "sk_live" || chave_nome = "stripe_sk_live")',
        });
        if (configs.length > 0 && configs[0].chave_valor) {
          stripeSecretKey = configs[0].chave_valor;
        }
      }

      if (!stripeSecretKey) {
        throw new Error('STRIPE_SECRET_KEY / sk_live não configurado');
      }

      const response = await axios.get(
        'https://api.stripe.com/v1/account',
        {
          auth: {
            username: stripeSecretKey,
            password: '',
          },
        }
      );

      if (response.status === 200) {
        sucesso = true;
        mensagem = 'Conexão com Stripe estabelecida com sucesso';
      }
    } else if (servico === 'melhor_envio') {
      let melhorEnvioToken = process.env.MELHOR_ENVIO_TOKEN;
      if (!melhorEnvioToken) {
        const configs = await pb.collection('integracoes_config').getFullList({
          filter: 'servico = "melhor_envio" && chave_nome = "token"',
        });
        if (configs.length > 0 && configs[0].chave_valor) {
          melhorEnvioToken = configs[0].chave_valor;
        }
      }

      if (!melhorEnvioToken) {
        throw new Error('MELHOR_ENVIO_TOKEN / token não configurado');
      }

      const response = await axios.get(
        'https://api.melhorenvio.com/v2/me/shipment/services',
        {
          headers: {
            'Authorization': `Bearer ${melhorEnvioToken}`,
            'Accept': 'application/json',
            'User-Agent': 'Avante Lingerie Storefront (contato@avantelingerie.com.br)'
          },
        }
      );

      if (response.status === 200) {
        sucesso = true;
        mensagem = 'Conexão com Melhor Envio estabelecida com sucesso';
      }
    } else if (servico === 'gemini') {
      const configs = await pb.collection('integracoes_config').getFullList({
        filter: `servico = "gemini" && chave_nome = "api_key"`,
      });

      if (configs.length === 0 || !configs[0].chave_valor) {
        throw new Error('Chave API do Gemini não configurada no banco de dados');
      }

      const apiKey = configs[0].chave_valor;
      const response = await axios.get(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
      );

      if (response.status === 200) {
        sucesso = true;
        mensagem = 'Conexão com Gemini API estabelecida com sucesso';
      }
    } else if (servico === 'whatsapp') {
      sucesso = true;
      mensagem = 'Conexão com API do WhatsApp (Lia) estabelecida com sucesso (Simulação)';
    } else if (servico === 'anthropic') {
      const configs = await pb.collection('integracoes_config').getFullList({
        filter: `servico = "anthropic" && chave_nome = "api_key"`,
      });

      if (configs.length === 0 || !configs[0].chave_valor) {
        throw new Error('Chave API da Anthropic não configurada no banco de dados');
      }

      const apiKey = configs[0].chave_valor;
      
      try {
        const response = await axios.post(
          'https://api.anthropic.com/v1/messages',
          {
            model: "claude-haiku-4-5-20251001",
            max_tokens: 1,
            messages: [{ role: "user", content: "oi" }]
          },
          {
            headers: {
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
              'content-type': 'application/json'
            }
          }
        );

        if (response.status === 200) {
          sucesso = true;
          mensagem = 'Conexão com Anthropic (Claude) estabelecida com sucesso!';
        }
      } catch (e) {
        if (e.response?.status === 401) {
          throw new Error('Chave API inválida ou incorreta.');
        }
        throw new Error(e.response?.data?.error?.message || e.message);
      }
    } else {
      throw new Error(`Serviço desconhecido: ${servico}`);
    }

    const integracoes = await pb.collection('integracoes_config').getFullList({
      filter: `servico = "${servico}"`,
    });

    if (integracoes.length > 0) {
      await pb.collection('integracoes_config').update(integracoes[0].id, {
        status_conexao: sucesso ? 'conectado' : 'erro',
        ultimo_teste: new Date().toISOString(),
      });
    }
  } catch (error) {
    sucesso = false;
    mensagem = `Erro ao testar ${servico}: ${error.message}`;
    logger.error(mensagem);
  }

  res.json({
    sucesso,
    mensagem
  });
});

// POST /integracoes/gemini/gerar-descricao - Generate product descriptions using Gemini AI
router.post('/gemini/gerar-descricao', async (req, res) => {
  try {
    const { name, categoryName, estilo, tecido, destaques } = req.body;

    if (!name) {
      return res.status(400).json({ sucesso: false, mensagem: 'Nome do product é obrigatório' });
    }

    const configs = await pb.collection('integracoes_config').getFullList({
      filter: 'servico = "gemini" && chave_nome = "api_key"',
    });

    if (configs.length === 0 || !configs[0].chave_valor) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Chave API do Gemini não configurada. Por favor, configure-a no Painel Admin > Integrações.'
      });
    }

    const apiKey = configs[0].chave_valor;

    const prompt = `Você é o Especialista Chefe em SEO para Google Shopping, Copywriting de Moda Íntima e Dados Estruturados da marca 'Avante Lingerie' (confecção própria premium em Nova Friburgo/RJ, polo da moda íntima).
Seu objetivo é redigir o título, a meta descrição e as abas deste produto para posicioná-lo no TOP 1 das buscas do Google e gerar máxima taxa de conversão em vendas.

DADOS DE ENTRADA DO PRODUTO:
- Nome Base: "${name}"
- Categoria: "${categoryName || 'Lingerie'}"
- Estilo: "${estilo || 'Conforto & Elegância'}"
- Tecido Principal: "${tecido || ''}"
- Destaques Selecionados: [${(destaques || []).join(', ')}]

REGRAS ESTRITAS DE SEO E COPYWRITING:

1. "seo_title" (Título Principal do Produto para H1 e Google Shopping):
- O algoritmo do Google lê da ESQUERDA PARA A DIREITA. As palavras mais pesquisadas devem vir no início.
- FÓRMULA: [Tipo de Peça] + [Gênero Feminino] + [Modelo Específico] + [Tecido/Material] + [Atributos Principais de Conforto/Caimento].
- Exemplo: "Pijama Feminino Short Doll Suede Confortável Tecido Leve e Macio Fresquinho" ou "Conjunto Feminino com Renda Luxo Alças Confortáveis Bojo Macio".
- Tamanho: Entre 65 e 95 caracteres (máximo 120 caracteres, com as palavras mais buscadas nos primeiros 70 caracteres para visualização perfeita no celular).
- NUNCA use termos genéricos como "Lindo", "Promoção" ou "Compre já" no título.
- Certifique-se de incluir o tipo de tecido/material claramente (ex: Suede, Renda, Algodão, Microfibra) para alimentar o NCM fiscal e o filtro de materiais do Google.

2. "seo_meta_description" (Breve Descrição para o topo da página e Meta Description do Google):
- FÓRMULA: [Benefício Emocional e Sensorial de Uso] + [Características Reais do Toque no Corpo] + [Chamada para Ação no Imperativo (Garanta, Sinta, Aproveite, Descubra)].
- LIMITE ESTRITO: Entre 120 e 155 caracteres (NÃO ultrapasse 155 para não ser cortado com reticências '...' nos resultados de busca do Google).
- Exemplo: "Sinta o conforto absoluto com o nosso Short Doll Feminino em Suede. Toque macio, leve e aveludado para noites perfeitas. Garanta o seu direto da fábrica!"

3. "desc_geral" (Aba 1 - Geral: Storytelling de Desejo):
- 2 a 3 frases envolventes focadas no bem-estar, autoestima e experiência sensorial de vestir a peça. Use emojis discretos e refinados (✨, 🌸, 💎).

4. "desc_tecido" (Aba 2 - Tecido & Composição):
- Em tópicos (bullet points): Composição têxtil técnica estimada (ex: 96% Poliéster, 4% Elastano / Suede Premium Aveludado), sensação térmica, respirabilidade e resistência a bolinhas.

5. "desc_modelagem" (Aba 3 - Modelagem & Caimento):
- Como veste no corpo: Caimento anatômico, valorização das curvas sem apertar, elástico suave, alças confortáveis e liberdade de movimento.

6. "desc_cuidados" (Aba 4 - Guia de Lavagem e Conservação):
- Instruções práticas: Lavagem manual ou em saquinho para delicados, sabão neutro, não usar alvejante com cloro, secar à sombra e dispensar ferro quente.

7. "desc_diferenciais" (Aba 5 - Por que Avante Lingerie):
- Fabricação 100% própria em Nova Friburgo/RJ (Polo da Moda Íntima), costuras reforçadas de alta costura, envio rápido e preço justo direto da confecção.

8. "desc_compra_segura" (Aba 6 - Confiança & Garantia):
- 5% OFF no PIX, até 12x no cartão, garantia e troca facilitada em 7 dias (CDC) e embalagem discreta e perfumada.

FORMATO DE RETORNO OBRIGATÓRIO:
Retorne ESTRITAMENTE em formato JSON puro válido (sem crases de markdown \`\`\`json). O objeto DEVE conter exatamente as seguintes chaves:
{
  "seo_title": "...",
  "seo_meta_description": "...",
  "desc_geral": "...",
  "desc_tecido": "...",
  "desc_modelagem": "...",
  "desc_cuidados": "...",
  "desc_diferenciais": "...",
  "desc_compra_segura": "..."
}`;

     const trials = [
      { version: 'v1', model: 'gemini-3.5-flash-lite' },
      { version: 'v1beta', model: 'gemini-3.5-flash-lite' },
      { version: 'v1', model: 'gemini-3.1-flash-lite' },
      { version: 'v1beta', model: 'gemini-3.1-flash-lite' },
      { version: 'v1', model: 'gemini-3.6-flash' },
      { version: 'v1beta', model: 'gemini-3.6-flash' },
      { version: 'v1', model: 'gemini-3.5-flash' },
      { version: 'v1', model: 'gemini-3.7-flash' },
      { version: 'v1', model: 'gemini-3.8-flash' }
    ];
    const errors = {};
    let response = null;

    for (const trial of trials) {
      const trialKey = `${trial.model} (${trial.version})`;
      try {
        logger.info(`Tentando gerar descrição com: ${trialKey}`);
        response = await axios.post(
          `https://generativelanguage.googleapis.com/${trial.version}/models/${trial.model}:generateContent?key=${apiKey}`,
          {
            contents: [{ parts: [{ text: prompt }] }]
          },
          { headers: { 'Content-Type': 'application/json' }, timeout: 20000 }
        );

        if (response && response.status === 200) {
          break;
        }
      } catch (err) {
        const status = err.response?.status || 'desconhecido';
        const msg = err.response?.data?.error?.message || err.message;
        errors[trialKey] = `[Status ${status}] ${msg}`;
        logger.error(`Falha no ${trialKey}: Status ${status} - ${msg}`);
      }
    }

    if (!response) {
      let availableModels = [];
      try {
        const modelsRes = await axios.get(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
        availableModels = modelsRes.data?.models?.map(m => m.name) || [];
      } catch (e) {
        try {
          const modelsResBeta = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
          availableModels = modelsResBeta.data?.models?.map(m => m.name) || [];
        } catch (e2) {
          availableModels = [`Erro v1: ${e.message}`, `Erro v1beta: ${e2.message}`];
        }
      }
      throw new Error(`Todos os modelos falharam: ${JSON.stringify(errors)}. Modelos disponíveis para sua chave: ${JSON.stringify(availableModels)}`);
    }

    const textResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Remove markdown code blocks if present
    let cleanText = textResponse.trim();
    if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
    }

    const parsedData = JSON.parse(cleanText);

    res.json({
      sucesso: true,
      dados: parsedData
    });
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: `Erro ao gerar descrições com a IA: ${error.message}`
    });
  }
});

// POST /integracoes/gemini/autopreencher
router.post('/gemini/autopreencher', async (req, res) => {
  res.status(200).json({ sucesso: true });
});

export default router;