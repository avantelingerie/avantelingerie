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

    const prompt = `Atue como um especialista em SEO e copywriter para e-commerce. A marca é 'Avante Lingerie', uma confecção própria de Nova Friburgo/RJ que vende tanto no varejo quanto no atacado através de um sistema de descontos progressivos automáticos no carrinho.

Dados do Produto:
- Nome Base: "${name}"
- Categoria: "${categoryName || 'Lingerie'}"
- Estilo: "${estilo || ''}"
- Tecido principal: "${tecido || ''}"
- Diferenciais/Destaques: [${(destaques || []).join(', ')}]

Você deve gerar as descrições em abas E as novas Meta Tags de SEO, seguindo REGRAS ESTRITAS de formatação e tamanho.

Regras de SEO (OBRIGATÓRIO):
1. seo_title: Máximo 60 caracteres. Siga exatamente a fórmula: [Nome Base ou otimizado] + [Estilo/Público] + [Tecido principal] + [Tipo de Peça] - Avante Lingerie.
2. seo_meta_description: Máximo 160 caracteres. Siga exatamente a fórmula: [Benefício Emocional do Produto] + direto de Nova Friburgo. Economize no varejo ou ganhe descontos progressivos automáticos de atacado. Compre direto da fábrica!

Diretrizes de Formatação para Abas:
1. Emojis Inteligentes: Insira emojis delicados no início de parágrafos/listas (ex: ✨, 🌸, 💎).
2. Organização: Use quebras de linha (\\n) para tópicos.
3. Tom Premium: Sofisticado, focado em vendas e autoestima.

Instruções para Abas:
1. Geral: Breve texto de introdução comercial.
2. Tecido: Descrição da composição premium e sensação na pele.
3. Modelagem: Como veste no corpo (sustentação, caimento).
4. Cuidados: Regras de lavagem.
5. Diferenciais: Principais pontos fortes.
6. Compra Segura: Detalhes de entrega expressa, troca e pagamento.

IMPORTANTE: Retorne ESTRITAMENTE em formato JSON puro, sem crases de markdown (\`\`\`json). O objeto DEVE conter as seguintes chaves:
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
      { version: 'v1', model: 'gemini-2.5-flash' },
      { version: 'v1beta', model: 'gemini-2.5-flash' },
      { version: 'v1', model: 'gemini-3.5-flash' },
      { version: 'v1beta', model: 'gemini-3.5-flash' },
      { version: 'v1', model: 'gemini-2.5-flash-lite' },
      { version: 'v1', model: 'gemini-3.1-flash-lite' }
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