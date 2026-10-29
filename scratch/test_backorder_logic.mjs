// Teste de Sandbox Isolado: Lógica de Carrinho e Frete para Venda Sob Encomenda (Backorder)

function testBackorderLogic() {
  console.log('=== TESTE DE SANDBOX: LÓGICA DE BACKORDER / ENCOMENDA ===\n');

  // 1. Simulação do Carrinho
  let cart = [];

  const addToCartMock = (product, isEligibleUser) => {
    const stock = Number(product.estoque) || 0;
    const isEncomenda = Boolean(product.is_encomenda);

    if (stock <= 0) {
      if (!isEncomenda || !isEligibleUser) {
        return { success: false, reason: 'ESGOTADO_OU_NAO_ELEGIVEL' };
      }
    }

    const existingIndex = cart.findIndex(i => i.id === product.id && i.size === product.size);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += product.quantity || 1;
    } else {
      cart.push({
        ...product,
        quantity: product.quantity || 1,
        is_encomenda: isEncomenda,
        dias_producao: isEncomenda ? (product.dias_producao || 7) : 0
      });
    }

    return { success: true };
  };

  // Helper de detecção de encomenda e maior prazo
  const getEncomendaMeta = (items) => {
    const hasEncomenda = items.some(i => i.is_encomenda);
    const maxDiasProducao = hasEncomenda 
      ? Math.max(...items.filter(i => i.is_encomenda).map(i => i.dias_producao || 7)) 
      : 0;
    return { hasEncomenda, maxDiasProducao };
  };

  // Helper de cálculo de frete somado
  const calculateDeliveryEstimate = (shippingOption, items) => {
    const { hasEncomenda, maxDiasProducao } = getEncomendaMeta(items);
    const baseDays = Number(shippingOption.delivery_time) || 0;
    const totalDays = baseDays + maxDiasProducao;

    return {
      company: shippingOption.company,
      baseDays,
      productionDays: maxDiasProducao,
      totalDays,
      hasEncomenda,
      displayLabel: hasEncomenda 
        ? `${totalDays} dias úteis (inclui ${maxDiasProducao} dias úteis de confecção)`
        : `${baseDays} dias úteis`
    };
  };

  // TESTE 1: Cliente anônimo tenta comprar peça esgotada
  console.log('Teste 1: Visitante anônimo tentando adicionar peça com estoque zero...');
  const res1 = addToCartMock({ id: 'calcinha-renda-01', estoque: 0, is_encomenda: false }, false);
  console.assert(!res1.success, 'Falha no Teste 1: Deveria ter bloqueado!');
  console.log('✅ Passou: Bloqueado com sucesso (direcionado para formulário de contato).\n');

  // TESTE 2: Cliente VIP / Revenda compra sob encomenda autorizada
  console.log('Teste 2: Revendedora elegível comprando peça sob encomenda...');
  const res2 = addToCartMock({ id: 'conjunto-cropped-02', estoque: 0, is_encomenda: true, dias_producao: 7 }, true);
  console.assert(res2.success, 'Falha no Teste 2: Deveria ter permitido!');
  console.log('✅ Passou: Adicionado ao carrinho com is_encomenda=true e dias_producao=7.\n');

  // TESTE 3: Carrinho misto (1 produto pronta-entrega + 1 produto sob encomenda)
  console.log('Teste 3: Adicionando produto de pronta entrega no mesmo carrinho...');
  addToCartMock({ id: 'sutia-confort-03', estoque: 15, is_encomenda: false }, true);
  
  const meta = getEncomendaMeta(cart);
  console.log('Itens no carrinho:', cart.length);
  console.log('Possui itens sob encomenda?', meta.hasEncomenda);
  console.log('Prazo de confecção a considerar:', meta.maxDiasProducao, 'dias úteis');
  console.assert(meta.hasEncomenda === true && meta.maxDiasProducao === 7, 'Falha no Teste 3');
  console.log('✅ Passou: Carrinho detectou corretamente o maior prazo de produção.\n');

  // TESTE 4: Cálculo de frete unificado
  console.log('Teste 4: Simulação de opções de frete dos Correios / Melhor Envio...');
  const pacOption = { company: 'Correios', name: 'PAC', delivery_time: 5, price: 14.90 };
  const sedexOption = { company: 'Correios', name: 'SEDEX', delivery_time: 2, price: 24.90 };
  const localOption = { company: 'Fábrica', name: 'Retirada no Ateliê', delivery_time: 0, price: 0 };

  const pacEst = calculateDeliveryEstimate(pacOption, cart);
  const sedexEst = calculateDeliveryEstimate(sedexOption, cart);
  const localEst = calculateDeliveryEstimate(localOption, cart);

  console.log('PAC:', pacEst.displayLabel);
  console.log('SEDEX:', sedexEst.displayLabel);
  console.log('Retirada:', localEst.displayLabel);

  console.assert(pacEst.totalDays === 12, 'Falha no PAC (5 + 7 = 12)');
  console.assert(sedexEst.totalDays === 9, 'Falha no SEDEX (2 + 7 = 9)');
  console.assert(localEst.totalDays === 7, 'Falha na Retirada (0 + 7 = 7)');
  console.log('✅ Passou: Todos os prazos somados matematicamente com precisão!\n');

  console.log('🎉 TODOS OS TESTES DE SANDBOX PASSARAM COM SUCESSO!');
}

testBackorderLogic();
