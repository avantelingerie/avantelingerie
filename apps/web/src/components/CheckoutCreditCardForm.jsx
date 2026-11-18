import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { CreditCard, Lock, Calendar, User, ShieldCheck, HelpCircle, Check } from 'lucide-react';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';

// Detecção de bandeiras populares no Brasil
function detectCardBrand(number) {
  const clean = (number || '').replace(/\D/g, '');
  if (!clean) return { id: '', name: '', icon: null };

  if (/^4/.test(clean)) {
    return { id: 'visa', name: 'Visa' };
  }
  if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)/.test(clean)) {
    return { id: 'master', name: 'Mastercard' };
  }
  if (/^(4011|4389|4514|4576|5041|5066|5067|509|6277|6362|6363|650|6516|6550)/.test(clean)) {
    return { id: 'elo', name: 'Elo' };
  }
  if (/^(34|37)/.test(clean)) {
    return { id: 'amex', name: 'American Express' };
  }
  if (/^(606282|3841)/.test(clean)) {
    return { id: 'hipercard', name: 'Hipercard' };
  }

  return { id: 'other', name: 'Cartão de Crédito' };
}

// Máscaras de digitação
function formatCardNumber(val) {
  const digits = (val || '').replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

function formatExpiration(val) {
  const digits = (val || '').replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

function formatCPF(val) {
  const digits = (val || '').replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

const CheckoutCreditCardForm = forwardRef(function CheckoutCreditCardForm(
  { finalTotal, defaultCpf, defaultName },
  ref
) {
  const [publicKey, setPublicKey] = useState('');
  const [maxInstallmentsConfig, setMaxInstallmentsConfig] = useState(6);
  const [minInstallmentAmount, setMinInstallmentAmount] = useState(25);
  const [mpLoaded, setMpLoaded] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState(defaultName || '');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [cpf, setCpf] = useState(defaultCpf || '');
  const [selectedInstallments, setSelectedInstallments] = useState(1);

  // Sincroniza CPF inicial se fornecido
  useEffect(() => {
    if (defaultCpf && !cpf) {
      setCpf(formatCPF(defaultCpf));
    }
  }, [defaultCpf]);

  // Carrega a chave pública do Mercado Pago
  useEffect(() => {
    let isMounted = true;
    async function loadConfig() {
      try {
        const res = await apiServerClient.fetch('/payment/public-key');
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setPublicKey(data.publicKey || '');
            if (data.maxInstallments) setMaxInstallmentsConfig(data.maxInstallments);
            if (data.minInstallmentAmount) setMinInstallmentAmount(data.minInstallmentAmount);
          }
        }
      } catch (err) {
        console.warn('[CheckoutCardForm] Erro ao carregar configurações do MP:', err);
      }
    }
    loadConfig();
    return () => { isMounted = false; };
  }, []);

  // Carrega dinamicamente o SDK JS v2 do Mercado Pago
  useEffect(() => {
    if (window.MercadoPago) {
      setMpLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = () => {
      setMpLoaded(true);
    };
    script.onerror = () => {
      console.error('[CheckoutCardForm] Falha ao carregar SDK JS do Mercado Pago.');
    };
    document.body.appendChild(script);

    return () => {
      // mantém script para reutilização
    };
  }, []);

  const brand = detectCardBrand(cardNumber);

  // Calcula parcelas permitidas com base no valor do pedido e regra da parcela mínima
  const total = Number(finalTotal) || 0;
  const calculatedMaxByMin = Math.max(1, Math.floor(total / (minInstallmentAmount || 25)));
  const effectiveMaxInstallments = Math.min(maxInstallmentsConfig || 6, calculatedMaxByMin);

  const installmentOptions = [];
  for (let i = 1; i <= effectiveMaxInstallments; i++) {
    const installmentValue = (total / i).toFixed(2).replace('.', ',');
    if (i === 1) {
      installmentOptions.push({
        count: i,
        label: `1x de R$ ${installmentValue} à vista (sem acréscimo)`,
      });
    } else {
      installmentOptions.push({
        count: i,
        label: `${i}x de R$ ${installmentValue} (parcelado no cartão)`,
      });
    }
  }

  // Expõe a função de tokenização segura para o componente pai
  useImperativeHandle(ref, () => ({
    async createToken() {
      const cleanNumber = cardNumber.replace(/\D/g, '');
      const cleanExp = expiration.replace(/\D/g, '');
      const cleanCvv = cvv.replace(/\D/g, '');
      const cleanCpf = cpf.replace(/\D/g, '');
      const trimmedName = cardholderName.trim();

      // Validações no frontend
      if (cleanNumber.length < 13 || cleanNumber.length > 19) {
        toast.error('Por favor, informe um número de cartão de crédito válido.');
        return null;
      }
      if (!trimmedName || trimmedName.split(' ').length < 2) {
        toast.error('Por favor, informe o nome completo como está impresso no cartão.');
        return null;
      }
      if (cleanExp.length !== 4) {
        toast.error('Informe a data de validade completa (mês e ano, ex: 08/28).');
        return null;
      }
      const expMonth = parseInt(cleanExp.slice(0, 2), 10);
      const expYear = parseInt('20' + cleanExp.slice(2, 4), 10);
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      if (expMonth < 1 || expMonth > 12) {
        toast.error('Mês de validade inválido (deve ser entre 01 e 12).');
        return null;
      }
      if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        toast.error('O cartão informado está com a data de validade vencida.');
        return null;
      }
      if (cleanCvv.length < 3 || cleanCvv.length > 4) {
        toast.error('Informe o código de segurança (CVV) com 3 ou 4 dígitos.');
        return null;
      }
      if (cleanCpf.length !== 11) {
        toast.error('Informe o CPF válido do titular do cartão (11 dígitos).');
        return null;
      }

      if (!window.MercadoPago || !publicKey) {
        toast.error('Serviço de pagamentos inicializando. Aguarde 3 segundos e tente novamente.');
        return null;
      }

      try {
        const mp = new window.MercadoPago(publicKey, { locale: 'pt-BR' });

        const cardTokenResult = await mp.createCardToken({
          cardNumber: cleanNumber,
          cardholderName: trimmedName,
          cardExpirationMonth: String(expMonth).padStart(2, '0'),
          cardExpirationYear: String(expYear),
          securityCode: cleanCvv,
          identification: {
            type: 'CPF',
            number: cleanCpf,
          },
        });

        if (!cardTokenResult || !cardTokenResult.id) {
          throw new Error('Falha ao tokenizar cartão no Mercado Pago.');
        }

        return {
          token: cardTokenResult.id,
          installments: Number(selectedInstallments) || 1,
          payment_method_id: brand.id && brand.id !== 'other' ? brand.id : undefined,
          payerIdentification: {
            type: 'CPF',
            number: cleanCpf,
          },
        };
      } catch (tokenErr) {
        console.error('[CheckoutCardForm] Erro ao criar token de cartão:', tokenErr);
        toast.error('Não foi possível validar os dados do seu cartão. Verifique o número, validade e CVV.');
        return null;
      }
    },
  }));

  return (
    <div className="bg-[#FFFDF9] border border-[#c59b5f]/30 rounded-3xl p-5 sm:p-6 mt-6 shadow-premium-sm transition-all text-left">
      {/* Cabeçalho de Proteção */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#c59b5f]/15 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#c59b5f]/15 border border-[#c59b5f]/30 flex items-center justify-center text-[#c59b5f] shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-gray-900 text-sm">Dados do Cartão de Crédito</h4>
            <p className="text-[11px] text-gray-400 font-light">Ambiente criptografado com tecnologia oficial Mercado Pago</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
          <ShieldCheck className="w-3 h-3 text-emerald-600" /> Criptografia 256-Bit
        </span>
      </div>

      <div className="space-y-4">
        {/* Número do Cartão */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
            <span>Número do Cartão</span>
            {brand.name && brand.id !== 'other' && (
              <span className="text-[11px] font-bold text-[#c59b5f] uppercase tracking-wider bg-[#c59b5f]/10 px-2 py-0.5 rounded-md border border-[#c59b5f]/20">
                {brand.name}
              </span>
            )}
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-mono tracking-wider text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#c59b5f] focus:ring-1 focus:ring-[#c59b5f] transition-all"
            />
            <CreditCard className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Nome Impresso */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Nome Completo no Cartão
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Ex: MARIA SILVA SANTOS"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#c59b5f] focus:ring-1 focus:ring-[#c59b5f] transition-all uppercase"
            />
            <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Linha dupla: Validade e CVV */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Validade (MM/AA)
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                placeholder="MM/AA"
                value={expiration}
                onChange={(e) => setExpiration(formatExpiration(e.target.value))}
                className="w-full pl-10 pr-3 py-3 bg-white border border-gray-200 rounded-xl text-sm font-mono tracking-wider text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#c59b5f] focus:ring-1 focus:ring-[#c59b5f] transition-all"
              />
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
              <span>CVV</span>
              <span className="text-[10px] text-gray-400 font-light">Verso</span>
            </label>
            <div className="relative">
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                className="w-full pl-10 pr-3 py-3 bg-white border border-gray-200 rounded-xl text-sm font-mono tracking-wider text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#c59b5f] focus:ring-1 focus:ring-[#c59b5f] transition-all"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* CPF do Titular */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            CPF do Titular do Cartão
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(formatCPF(e.target.value))}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-mono tracking-wider text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#c59b5f] focus:ring-1 focus:ring-[#c59b5f] transition-all"
          />
          <p className="text-[10px] text-gray-400 font-light mt-1">
            Necessário para aprovação antifraude da operadora do cartão.
          </p>
        </div>

        {/* Seleção de Parcelas */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
            <span>Opções de Parcelamento</span>
            <span className="text-[11px] font-medium text-gray-500">Em até 6x no cartão</span>
          </label>
          <select
            value={selectedInstallments}
            onChange={(e) => setSelectedInstallments(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#c59b5f] focus:ring-1 focus:ring-[#c59b5f] transition-all cursor-pointer font-medium"
          >
            {installmentOptions.map((opt) => (
              <option key={opt.count} value={opt.count}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bandeiras Aceitas */}
      <div className="mt-5 pt-3.5 border-t border-[#c59b5f]/15 flex items-center justify-between text-[11px] text-gray-400 flex-wrap gap-2">
        <span>Bandeiras aceitas:</span>
        <span className="text-gray-700 font-semibold tracking-wide">
          Visa, Mastercard, Elo, Hipercard, Amex
        </span>
      </div>
    </div>
  );
});

export default CheckoutCreditCardForm;
