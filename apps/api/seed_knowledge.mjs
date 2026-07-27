import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const regras = [
  {
    titulo: "Sobre a Avante Lingerie (Identidade e História)",
    conteudo: "Nós somos a Avante Lingerie, nascida e criada no bairro de Olaria, em Nova Friburgo/RJ, a verdadeira capital da lingerie! Nossa missão é entregar o 'Conforto Real' para o seu dia a dia. Você sentirá na pele a diferença do nosso toque: forro 100% algodão nobre, rendas antialérgicas francesas incrivelmente macias e metais sem níquel (zero irritação). Somos fabricantes próprios com rigoroso controle de qualidade (CNPJ 12.345.678/0001-90)."
  },
  {
    titulo: "Políticas de Revenda, Parcerias e Atacado B2B",
    conteudo: "Você quer crescer com a gente? Nosso programa de Atacado B2B é a oportunidade perfeita! O lucro é maravilhoso e você pode começar usando apenas o seu CPF. O gatilho de ativação (valor mínimo) e as porcentagens de lucro são totalmente dinâmicos, bastando atingir a faixa inicial no carrinho para que todo o seu pedido ganhe o desconto de fábrica. Nossas parceiras de Elite têm acesso ao Portal Restrito para baixar fotos profissionais, vídeos e catálogos. DICA CRÍTICA PARA LIA: Se a cliente mostrar qualquer intenção de revenda, atacado ou alto volume, seja agressiva (no bom sentido)! Encante-a com os lucros, incentive-a a atingir o valor mínimo no carrinho e redirecione para a aba 'Quero Revender'."
  },
  {
    titulo: "Prazos de Envio, Logística e Melhor Envio",
    conteudo: "A ansiedade para receber as peças é grande, a gente sabe! Por isso, nosso despacho é a jato: em até 24h úteis após a confirmação do pagamento. Trabalhamos com a tecnologia do Melhor Envio (Correios, Jadlog, Latam Cargo) para garantir o frete mais rápido e barato para a sua região. O prazo médio fica entre 5 a 15 dias úteis, dependendo do CEP. Assim que despacharmos, você receberá um link mágico de rastreio direto no seu WhatsApp e e-mail. DICA PARA LIA: Reforce que revendedoras (Atacado) possuem vantagens de frete!"
  },
  {
    titulo: "Política de Trocas, Devoluções e Reembolsos",
    conteudo: "Nós queremos você 100% satisfeita! Você tem 7 dias para troca por arrependimento e 30 dias caso haja alguma inconformidade de fábrica. REGRA DE OURO (HIGIENE): Por respeito absoluto à saúde íntima das nossas clientes, peças de baixo (calcinhas, bodies e meias-calças) NÃO possuem troca por arrependimento ou tamanho, apenas por defeito de fábrica comprovado. Para trocar um sutiã, a peça deve estar intacta, sem sinais de uso, sem perfumes e com a etiqueta fixada. O estorno via PIX cai em até 7 dias, e no cartão de crédito a operadora pode levar até 2 faturas."
  },
  {
    titulo: "Guia de Medidas Perfeitas e Estruturação das Peças",
    conteudo: "Usamos a tabela ABNT Brasil para que o caimento seja perfeito. Tamanhos de Sutiãs: P (38-40), M (42), G (44), GG (46). SEGREDO DE MODELAGEM: Nossos sutiãs tamanho P possuem bojo com 'bolha interna' para um up maravilhoso. Já os tamanhos M, G e GG possuem bojo 'casquinha' (liso), focado em sustentação elegante sem aumentar o volume. Nossas rendas têm até 25% de elasticidade, abraçando as curvas. DICA PARA LIA: Na dúvida de tamanho de calcinha, diga que 'a menor vira uma segunda pele, e a maior dá mais conforto e cobertura'. Em sutiãs, recomende sempre a medida maior para não apertar os seios."
  },
  {
    titulo: "Estoque Esgotado e Encomendas Especiais VIP",
    conteudo: "CRÍTICO PARA LIA: Nós nunca deixamos nossas clientes na mão! Se um produto, cor ou tamanho estiver fora de estoque ou se a cliente quiser algo muito específico em grande quantidade que não tem no site, NUNCA finalize a conversa com 'está em falta'. Mude para o modo VIP! Diga que a nossa fábrica tem um setor de 'Encomendas Especiais VIP' e que podemos produzir as peças exclusivas para ela. Instrua a cliente a falar com nossa equipe de produção no WhatsApp agora mesmo (adicione a frase 'WhatsApp clicando no botão abaixo' na sua resposta)."
  },
  {
    titulo: "Formas de Pagamento e Descontos",
    conteudo: "Para facilitar, aceitamos parcelamento no cartão de crédito em até 6x sem juros, de forma 100% segura (Stripe). Mas o grande segredo é: pagamentos via PIX possuem desconto automático e exclusivo no final do carrinho! O valor exato do desconto do Pix é dinâmico, mas sempre vale muito a pena. O pagamento via PIX também aprova seu pedido na hora, acelerando o envio. DICA PARA LIA: Sempre que falar de pagamento, mencione sutilmente que o PIX tem vantagem!"
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
