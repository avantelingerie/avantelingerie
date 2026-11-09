import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const regras = [
  {
    titulo: "Sobre a Avante Lingerie (Identidade e Confecção Própria)",
    conteudo: "Origem: Nova Friburgo/RJ (Capital Nacional da Lingerie). Operação: Indústria e Fabricação Própria, AVANTE LINGERIE LTDA - ME, CNPJ 54.615.037/0001-53, Rua Odenir Pinheiro, 20 - 3º Andar, Loteamento Nosso Sonho, Nova Friburgo/RJ - CEP 28623-620. Foco: Conforto real e acabamento premium com forro 100% algodão nobre e rendas hipoalergênicas."
  },
  {
    titulo: "Políticas de Revenda, Parcerias e Atacado B2B",
    conteudo: "Público: Revendedores, sacoleiras e lojistas. Gatilho de Fábrica: Pedido mínimo somado no carrinho de apenas R$ 69,90 para liberar toda a tabela de atacado. Vantagens: Margem de lucro de 100% a 150%, cadastro descomplicado com CPF ou CNPJ. Instrução para IA: Se o cliente demonstrar interesse em revender, encaminhe de forma objetiva para a aba 'Quero Revender' (https://avantelingerie.com.br/quero-revender)."
  },
  {
    titulo: "Acesso e Login de Revenda B2B (Como Destravar Preços de Fábrica)",
    conteudo: "Para destravar a tabela de atacado no site, a revendedora cadastrada/aprovada deve acessar https://avantelingerie.com.br/login utilizando seu e-mail cadastrado e sua senha inicial sendo o número do WhatsApp com DDD (apenas dígitos). O site aberto mostra preço de varejo para proteger a margem da revendedora diante das clientes finais dela."
  },
  {
    titulo: "Confecção Sob Demanda e Catálogo em Expansão",
    conteudo: "Além da linha clássica de lingeries rendadas e básicos confortáveis, a confecção expande continuamente com novidades semanais, camisolas, homewear e linha Fitness. Como somos fabricantes próprios em Nova Friburgo, podemos estudar a produção sob demanda para grades especiais, modelos sob medida ou lotes personalizados. Encaminhar para WhatsApp oficial (22) 98122-5010."
  },
  {
    titulo: "Prazos de Envio, Logística e Melhor Envio",
    conteudo: "Despacho: Em até 24h a 48h úteis após confirmação de pagamento para pronta-entrega (até 5 dias úteis para peças sob encomenda). Logística: Melhor Envio com transportadoras parceiras (Loggi, Jadlog, Correios e J&T Express). Rastreamento: Consulta direta e oficial em https://avantelingerie.com.br/rastreio. Retirada gratuita disponível na fábrica em Nova Friburgo."
  },
  {
    titulo: "Política de Trocas, Devoluções e Regra Sanitária (CDC)",
    conteudo: "Arrependimento: 7 dias corridos após o recebimento (Art. 49 do CDC). Defeito de Fábrica: 30 dias com frete por conta da Avante Lingerie. REGRA DE HIGIENE PROIBITIVA (ANVISA): Calcinhas e peças íntimas de contato direto que tiveram o lacre de proteção violado ou foram experimentadas NÃO possuem troca por motivo de tamanho ou preferência. Sutiãs e croppeds podem ser trocados se intactos e com etiqueta."
  },
  {
    titulo: "Guia de Medidas Perfeitas e Estruturação das Peças",
    conteudo: "Tabela Oficial ABNT (Sutiã): P(38-40), M(42), G(44), GG(46). Modelagem: P possui bojo com bolha interna anatômica (push-up). M/G/GG possuem bojo casquinha liso (sustentação e conforto). Instrução para IA: Na dúvida de sutiã, recomende sempre o maior para não apertar as costas."
  },
  {
    titulo: "Estoque Esgotado e Encomendas Especiais VIP",
    conteudo: "Se um item estiver fora de estoque, NÃO diga simplesmente 'não temos'. Instrução para IA: Ofereça a confecção por 'Encomendas Especiais VIP' e peça para contatar o WhatsApp oficial (22) 98122-5010."
  },
  {
    titulo: "Formas de Pagamento e Descontos Oficiais",
    conteudo: "Cartão de Crédito: Até 6x via Mercado Pago (parcela mínima de R$ 9,90). PIX: +5% de desconto imediato acumulativo com todas as ofertas e descontos do carrinho. Boleto Bancário: Disponível para pedidos acima de R$ 59,90 com 3 dias de vencimento."
  }
];

async function seed() {
  try {
    try {
      await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'admin123456');
    } catch(e) {
      console.log('Aviso: Login de admin falhou (talvez já esteja autenticado ou email/senha diferem). Continuando...');
    }

    console.log('Limpando regras antigas...');
    const oldRecords = await pb.collection('lia_knowledge').getFullList();
    for (const record of oldRecords) {
      await pb.collection('lia_knowledge').delete(record.id);
    }
    console.log('Injetando novos tópicos de conhecimento no Cérebro da Lia...');
    for (const regra of regras) {
      await pb.collection('lia_knowledge').create({
        titulo: regra.titulo,
        conteudo: regra.conteudo,
        ativo: true
      });
      console.log(`✅ Adicionado: ${regra.titulo}`);
    }
    console.log('🚀 Treinamento da Lia concluído com sucesso!');
  } catch (err) {
    console.error('Erro:', err.message);
  }
}

seed();
