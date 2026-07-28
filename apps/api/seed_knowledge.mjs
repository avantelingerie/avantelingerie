import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const regras = [
  {
    titulo: "Sobre a Avante Lingerie (Identidade e História)",
    conteudo: "Origem: Nova Friburgo/RJ (capital da lingerie). Foco: Conforto Real para o dia a dia. Materiais: Forro 100% algodão nobre, rendas francesas hipoalergênicas, metais sem níquel. Operação: Fabricação própria, CNPJ 54.615.037/0001-53."
  },
  {
    titulo: "Políticas de Revenda, Parcerias e Atacado B2B",
    conteudo: "Público: Revendedores e Atacadistas. Gatilho de Desconto de Fábrica: R$ 500,00 no carrinho. Vantagens: Alta margem de lucro, cadastro com CPF, Portal Restrito (para baixar fotos e vídeos). Instrução para IA: Se o cliente demonstrar interesse em revender, encaminhe de forma objetiva para a aba 'Quero Revender'."
  },
  {
    titulo: "Prazos de Envio, Logística e Melhor Envio",
    conteudo: "Despacho: Em até 24h úteis após pagamento. Logística: Melhor Envio (Correios, Jadlog, Latam Cargo). Prazo de Entrega Médio: 5 a 15 dias úteis. Rastreio: Enviado via WhatsApp e e-mail."
  },
  {
    titulo: "Política de Trocas, Devoluções e Reembolsos",
    conteudo: "Prazo de Arrependimento: 7 dias (Frete pago pelo cliente). Defeito de Fábrica: 30 dias (Frete pago pela loja). REGRA DE HIGIENE PROIBITIVA: Calcinhas e meias-calças NÃO possuem troca por tamanho ou arrependimento. Sutiãs e croppeds podem ser trocados se intactos e com etiqueta."
  },
  {
    titulo: "Guia de Medidas Perfeitas e Estruturação das Peças",
    conteudo: "Tabela (Sutiã): P(38-40), M(42), G(44), GG(46). Modelagem: P possui bojo com bolha interna (volume). M/G/GG possuem bojo casquinha liso (sustentação). Elasticidade das rendas: 25%. Instrução para IA: Na dúvida de sutiã, recomende o maior."
  },
  {
    titulo: "Estoque Esgotado e Encomendas Especiais VIP",
    conteudo: "Se um item estiver fora de estoque, NÃO diga simplesmente 'não temos'. Instrução para IA: Ofereça a produção por 'Encomendas Especiais VIP' e peça para contatar o WhatsApp clicando no botão abaixo."
  },
  {
    titulo: "Formas de Pagamento e Descontos",
    conteudo: "Cartão de Crédito: Até 6x sem juros (Stripe). PIX: Possui desconto automático no carrinho. Aprovação imediata."
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
