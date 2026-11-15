// Caminho do arquivo: apps/web/src/pages/mimos/MaquinaVendasAppPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { 
  Sparkles, 
  Smartphone, 
  Calculator, 
  MessageSquare, 
  Copy, 
  Check, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Download, 
  Zap, 
  Percent, 
  Package, 
  CreditCard, 
  Gift,
  Star,
  ExternalLink,
  HeartHandshake,
  CheckCircle2,
  Lightbulb,
  Truck,
  Layers,
  ArrowRight,
  BookOpen,
  Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Card } from '@/components/ui/card.jsx';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { toast } from 'sonner';

export default function MaquinaVendasAppPage() {
  const [activeTab, setActiveTab] = useState('calculadora');

  // ================= ESTADOS DA CALCULADORA INTELIGENTE =================
  const [precoCusto, setPrecoCusto] = useState(24.90);
  const [margemLucro, setMargemLucro] = useState(100); // 100% padrão de fábrica
  const [isCustomMargem, setIsCustomMargem] = useState(false);
  
  // Custos Ocultos Personalizáveis
  const [usarMaquininha, setUsarMaquininha] = useState(true);
  const [taxaMaquininha, setTaxaMaquininha] = useState(3.5); // % customizável

  const [usarEmbalagem, setUsarEmbalagem] = useState(true);
  const [custoEmbalagem, setCustoEmbalagem] = useState(2.50); // R$ customizável

  const [usarFrete, setUsarFrete] = useState(false);
  const [custoFrete, setCustoFrete] = useState(2.00); // R$ customizável

  // Scripts de Copiar
  const [copiedScriptId, setCopiedScriptId] = useState(null);

  // ================= CÁLCULOS MATEMÁTICOS DINÂMICOS =================
  const calculos = useMemo(() => {
    const custoBase = Math.max(0, Number(precoCusto) || 0);
    const taxaCartaoNum = Math.max(0, Number(taxaMaquininha) || 0);
    const embalagemNum = Math.max(0, Number(custoEmbalagem) || 0);
    const freteNum = Math.max(0, Number(custoFrete) || 0);
    const margemNum = Math.max(0, Number(margemLucro) || 0);

    const custoExtraEmbalagem = usarEmbalagem ? embalagemNum : 0;
    const custoExtraFrete = usarFrete ? freteNum : 0;
    const custoTotalPeca = custoBase + custoExtraEmbalagem + custoExtraFrete;

    // Preço no Pix / À Vista com margem desejada
    const valorMargem = custoBase * (margemNum / 100);
    const precoBaseVenda = custoBase + valorMargem + custoExtraEmbalagem + custoExtraFrete;

    // Arredondamento comercial atraente (.90)
    let precoVistaFinal = precoBaseVenda;
    if (precoBaseVenda > 5) {
      precoVistaFinal = Math.ceil(precoBaseVenda) - 0.10;
      if (precoVistaFinal < precoBaseVenda) precoVistaFinal += 1;
    }

    // Preço no Cartão compensando a taxa da maquininha para manter o lucro líquido
    const taxaDecimal = usarMaquininha ? taxaCartaoNum / 100 : 0;
    let precoCartaoFinal = precoVistaFinal;
    if (taxaDecimal > 0 && taxaDecimal < 0.99) {
      const precoCartaoBruto = precoVistaFinal / (1 - taxaDecimal);
      precoCartaoFinal = Math.ceil(precoCartaoBruto) - 0.10;
      if (precoCartaoFinal < precoCartaoBruto) precoCartaoFinal += 1;
    }

    // Lucro Líquido Real no Bolso
    const lucroLiquidoVista = Math.max(0, precoVistaFinal - custoTotalPeca);
    const taxaPagaCartao = precoCartaoFinal * taxaDecimal;
    const lucroLiquidoCartao = Math.max(0, precoCartaoFinal - custoTotalPeca - taxaPagaCartao);

    // Margem real líquida sobre o custo total
    const margemRealLiquidaPercent = custoTotalPeca > 0 ? (lucroLiquidoVista / custoTotalPeca) * 100 : 0;

    // Projeções Mensais (26 dias úteis)
    const projecao1PecaDia = lucroLiquidoVista * 26;
    const projecao3PecasDia = lucroLiquidoVista * 3 * 26;
    const projecao5PecasDia = lucroLiquidoVista * 5 * 26;

    // Parcelas sugeridas no cartão
    const parcela2x = precoCartaoFinal / 2;
    const parcela3x = precoCartaoFinal / 3;

    return {
      custoBase,
      custoTotalPeca,
      precoVistaFinal,
      precoCartaoFinal,
      lucroLiquidoVista,
      lucroLiquidoCartao,
      margemRealLiquidaPercent,
      projecao1PecaDia,
      projecao3PecasDia,
      projecao5PecasDia,
      parcela2x,
      parcela3x
    };
  }, [precoCusto, margemLucro, usarMaquininha, taxaMaquininha, usarEmbalagem, custoEmbalagem, usarFrete, custoFrete]);

  // Função para copiar scripts com feedback
  const handleCopyScript = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptId(id);
    toast.success('Script copiado com sucesso! Agora é só colar no WhatsApp.');
    setTimeout(() => {
      setCopiedScriptId(null);
    }, 2500);
  };

  // Categorias Dinâmicas carregadas do banco de dados (PocketBase)
  const [categoriasLoja, setCategoriasLoja] = useState([
    { nome: 'Calcinha', slug: 'calcinha' },
    { nome: 'Conjunto', slug: 'conjunto' },
    { nome: 'Body', slug: 'body' },
    { nome: 'Cropped', slug: 'cropped' },
    { nome: 'Fitness', slug: 'fitness' },
    { nome: 'Pijama', slug: 'pijama' },
    { nome: 'Plus Size', slug: 'plus-size' }
  ]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const records = await pb.collection('categorias').getFullList({
          filter: 'ativo = true',
          sort: 'nome',
          $autoCancel: false
        });
        if (records && records.length > 0) {
          setCategoriasLoja(records.map(r => ({
            id: r.id,
            nome: r.nome,
            slug: r.slug
          })));
        }
      } catch (err) {
        console.warn('Carregamento de categorias dinâmicas usando padrão:', err);
      }
    };
    fetchCategorias();
  }, []);

  // Scripts de Alta Conversão no WhatsApp
  const scriptsProntos = [
    {
      id: 'script-1',
      categoria: 'Status & Stories',
      titulo: '🔥 Foto de Peça no Status (Curiosidade Máxima)',
      objetivo: 'Gerar mensagens espontâneas no privado sem parecer venda forçada.',
      texto: `Gente, olha o que acabou de chegar direto da fábrica de Nova Friburgo! 😱✨\n\nEssa renda francesa tem um toque surreal e modela o corpo sem apertar. Peguei pouquíssimas unidades exclusivas para as primeiras que me mandarem mensagem.\n\nQuem quiser ver no seu tamanho antes que acabe, me chama aqui no zap! 💖👇`
    },
    {
      id: 'script-2',
      categoria: 'Abordagem Direta',
      titulo: '🌸 Mensagem Carinhosa para Amigas e Clientes',
      objetivo: 'Quebrar o gelo com elegância e despertar desejo imediato.',
      texto: `Oii, [Nome da Amiga]! Tudo bem, lindeza? 💕\n\nLembrei de você hoje na hora! Peguei umas peças direto da fábrica de Nova Friburgo (as peças são de alta costura, nível loja de shopping, só que pela metade do preço normal).\n\nChegaram uns conjuntos maravilhosos no seu tamanho. Posso te mandar 3 fotinhos rápidas sem compromisso só pra você ver que perfeição? 😍`
    },
    {
      id: 'script-3',
      categoria: 'Fechamento com Urgência',
      titulo: '⚡ Fechamento sem Perder a Venda',
      objetivo: 'Fazer a cliente fechar o pedido na hora com as condições calculadas.',
      texto: `Amiga, só estou te avisando porque esse modelo foi o mais disputado e só tenho mais 1 peça no seu tamanho aqui comigo!\n\nSe você quiser garantir, já coloco na sua sacolinha com mimo especial. Consigo fazer para você por R$ ${calculos.precoVistaFinal.toFixed(2)} no Pix ou em até 2x de R$ ${calculos.parcela2x.toFixed(2)} no cartão. Qual fica melhor para você? ✨`
    },
    {
      id: 'script-4',
      categoria: 'Cobrança Elegante',
      titulo: '🤝 Cobrança Leve e Amigável',
      objetivo: 'Cobrar valores pendentes sem climão e sem vergonha.',
      texto: `Oii, [Nome]! Tudo bem com você? Passando rapidinho só para confirmar se você amou aquele conjuntinho lindo que pegou comigo! 🥰\n\nEstou fechando os envios e pagamentos da fábrica hoje. Segue a minha chave Pix para você acertar o restante com tranquilidade: [Sua Chave Pix aqui]. Qualquer dúvida é só me avisar tá bom? Muito obrigada pelo carinho!`
    },
    {
      id: 'script-5',
      categoria: 'Pós-Venda & Recompra',
      titulo: '🔄 Pós-Venda das 2 Semanas (Fidelização Contínua)',
      objetivo: 'Transformar uma compradora em cliente fiel todo mês.',
      texto: `Oii, lindeza! Passando para saber como ficou o caimento da lingerie em você? Ficou confortável como você queria? 💕\n\nA fábrica acabou de liberar uma nova coleção de calcinhas sem costura e pijaminhas de seda que são um sonho. Como você já é minha cliente VIP, você tem prioridade para escolher primeiro. Quer que eu te mande o catálogo novo?`
    }
  ];

  return (
    <div className="min-h-screen bg-[#070604] text-zinc-100 font-sans pb-24 selection:bg-[#f59e0b] selection:text-black">
      
      {/* ================= HEADER DO APP: IDENTIDADE VIP AVANTE LINGERIE ================= */}
      <header className="sticky top-0 z-50 bg-[#0e0c08]/95 backdrop-blur-md border-b-2 border-[#d97706]/40 px-4 py-3 shadow-[0_4px_25px_rgba(217,119,6,0.15)]">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          
          {/* Logo e Informações de Quem Deu o Presente */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#d97706] via-[#f59e0b] to-[#b45309] p-0.5 shadow-lg shadow-[#f59e0b]/20 shrink-0">
                <div className="w-full h-full bg-[#120f0a] rounded-[14px] flex items-center justify-center text-[#f59e0b]">
                  <Gift className="w-6 h-6 animate-pulse" />
                </div>
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#070604] rounded-full"></span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-serif font-black tracking-widest text-[#f59e0b] text-xs sm:text-sm uppercase drop-shadow-sm">
                  AVANTE LINGERIE
                </span>
                <Badge className="bg-gradient-to-r from-[#d97706] to-[#f59e0b] text-black font-extrabold text-[9px] py-0 px-1.5 uppercase shadow-sm">
                  Mimo da Fábrica
                </Badge>
              </div>
              <h1 className="font-extrabold text-sm sm:text-base text-white tracking-wide flex items-center gap-1">
                Máquina de Vendas Zap
              </h1>
            </div>
          </div>

          {/* Botão de Salvar no Celular */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Máquina de Vendas Zap • Avante Lingerie',
                  text: 'Meu App VIP de Precificação e Vendas da Avante Lingerie',
                  url: window.location.href
                }).catch(() => {});
              } else {
                navigator.clipboard.writeText(window.location.href);
                toast.success('Link do App copiado! Salve nos favoritos do seu celular.');
              }
            }}
            className="border-[#f59e0b]/50 bg-[#1a140b] hover:bg-[#281e0f] text-[#f59e0b] hover:text-white rounded-2xl text-xs gap-1.5 h-9 font-bold shadow-md shadow-[#f59e0b]/10 shrink-0"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Salvar no Celular</span>
            <span className="sm:hidden">Salvar</span>
          </Button>

        </div>
      </header>

      {/* ================= CONTAINER PRINCIPAL (LARGURA MOBILE FIRST) ================= */}
      <main className="max-w-2xl mx-auto px-4 pt-5 space-y-5">
        
        {/* ================= BANNER SUPERIOR ESTILO ARTE DO POPUP ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#21180d] via-[#151009] to-[#0c0905] border-2 border-[#d97706]/60 p-5 sm:p-6 shadow-[0_0_35px_rgba(245,158,11,0.18)]">
          {/* Brilhos decorativos no fundo */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#f59e0b]/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left relative z-10">
            {/* Imagem Bonita 3D Oficial (Sem linha dourada em volta) */}
            <div className="w-24 sm:w-28 shrink-0 relative group">
              <img 
                src="/assets/mimos/capa-maquina-vendas-3d.jpg" 
                alt="Máquina de Vendas Zap • Capa 3D" 
                className="w-full h-auto rounded-2xl drop-shadow-[0_12px_25px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider text-black bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#b45309] px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  RENDA EXTRA DIRETO DA FÁBRICA
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  De R$ 97 por: GRÁTIS HOJE
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-white font-serif tracking-wide leading-tight">
                Seu Aplicativo VIP de Precificação & Vendas
              </h2>

              <p className="text-xs text-zinc-300 leading-relaxed max-w-lg">
                Presente exclusivo da <strong>Avante Lingerie</strong> para você. Precifique suas peças com segurança, blinde seu lucro contra custos ocultos e use scripts prontos para faturar no WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* ================= ABAS DO APLICATIVO ================= */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
          <TabsList className="w-full grid grid-cols-3 bg-[#130f0a] border-2 border-[#d97706]/40 p-1.5 rounded-2xl h-auto shadow-md">
            <TabsTrigger 
              value="calculadora" 
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d97706] data-[state=active]:via-[#f59e0b] data-[state=active]:to-[#b45309] data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=inactive]:text-zinc-400 transition-all uppercase tracking-wider"
            >
              <Calculator className="w-4 h-4 shrink-0" />
              <span>Calculadora</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="scripts" 
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d97706] data-[state=active]:via-[#f59e0b] data-[state=active]:to-[#b45309] data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=inactive]:text-zinc-400 transition-all uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>Scripts Zap</span>
            </TabsTrigger>

            <TabsTrigger 
              value="guia" 
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d97706] data-[state=active]:via-[#f59e0b] data-[state=active]:to-[#b45309] data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=inactive]:text-zinc-400 transition-all uppercase tracking-wider"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Guia PDF</span>
            </TabsTrigger>
          </TabsList>

          {/* ================= ABA 1: CALCULADORA INTELIGENTE ================= */}
          <TabsContent value="calculadora" className="space-y-5 mt-0 focus-visible:outline-none">
            
            {/* Bloco de Entradas (Inputs) */}
            <Card className="bg-[#120f0a] border-2 border-[#d97706]/40 rounded-3xl p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.6)] space-y-6">
              
              {/* Preço de Custo na Fábrica */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-[#f59e0b] flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-[#f59e0b]" />
                    Quanto Você Pagou na Peça na Fábrica?
                  </label>
                  <span className="text-[11px] text-zinc-400 font-mono">Custo unitário</span>
                </div>
                
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-black text-[#f59e0b]">R$</span>
                  <Input 
                    type="number"
                    step="0.10"
                    min="1"
                    value={precoCusto}
                    onChange={(e) => setPrecoCusto(e.target.value)}
                    className="pl-12 bg-[#090805] border-2 border-[#d97706]/50 text-white font-black text-xl h-14 rounded-2xl focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b] shadow-inner"
                  />
                </div>

                {/* ================= SEÇÃO DE PESQUISA DE PREÇOS NA LOJA (CATEGORIAS DINÂMICAS) ================= */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#141009] border border-[#d97706]/35 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                      Pesquise preços reais das peças na nossa loja:
                    </span>
                    <span className="text-[10px] text-[#f59e0b] font-medium hidden sm:inline">
                      Toque na categoria para abrir
                    </span>
                  </div>

                  {/* Nomes das Categorias apenas em Texto, uma ao lado da outra */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1 text-xs">
                    {categoriasLoja.map((cat, idx) => (
                      <React.Fragment key={cat.slug || cat.id || idx}>
                        <a
                          href={`/categoria/${cat.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-200 hover:text-[#f59e0b] font-semibold underline underline-offset-4 decoration-[#d97706]/50 hover:decoration-[#f59e0b] transition-all cursor-pointer inline-flex items-center gap-1 group py-0.5"
                          title={`Ver todos os produtos de ${cat.nome}`}
                        >
                          <span className="group-hover:translate-x-0.5 transition-transform">{cat.nome}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-zinc-500 group-hover:text-[#f59e0b] shrink-0" />
                        </a>
                        {idx < categoriasLoja.length - 1 && (
                          <span className="text-zinc-600 select-none">•</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

              </div>

              {/* ================= MARGEM DE LUCRO PERSONALIZÁVEL ================= */}
              <div className="space-y-3 pt-3 border-t-2 border-[#d97706]/30">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-[#f59e0b] flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-[#f59e0b]" />
                    Margem de Lucro que Você Quer
                  </label>
                  <span className="text-xs font-black text-black bg-gradient-to-r from-[#d97706] to-[#f59e0b] px-2.5 py-0.5 rounded-full shadow-sm">
                    +{margemLucro}% de Lucro
                  </span>
                </div>

                {/* Seletores de Margem Prontos */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: '60%', val: 60, desc: 'Rápido' },
                    { label: '80%', val: 80, desc: 'Bom' },
                    { label: '100%', val: 100, desc: 'Padrão Fábrica ⭐' },
                    { label: '130%', val: 130, desc: 'Alta Margem' }
                  ].map((m) => (
                    <button
                      key={m.val}
                      type="button"
                      onClick={() => {
                        setMargemLucro(m.val);
                        setIsCustomMargem(false);
                      }}
                      className={`p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                        margemLucro === m.val && !isCustomMargem
                          ? 'bg-gradient-to-br from-[#d97706] via-[#f59e0b] to-[#b45309] text-black font-black border-[#f59e0b] shadow-lg shadow-[#f59e0b]/25 scale-102'
                          : 'bg-[#090805] border-zinc-800 text-zinc-300 hover:border-[#d97706]/60'
                      }`}
                    >
                      <span className="text-xs font-black">{m.label}</span>
                      <span className={`text-[9px] ${margemLucro === m.val && !isCustomMargem ? 'text-black font-bold' : 'text-zinc-500'}`}>
                        {m.desc}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Campo de Margem Personalizada Livre */}
                <div className="p-3 rounded-2xl bg-[#090805] border border-zinc-800 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                      <Percent className="w-3.5 h-3.5 text-[#f59e0b]" />
                      Quer escolher outra porcentagem?
                    </span>
                    <p className="text-[10px] text-zinc-400">Digite qualquer porcentagem de lucro desejada</p>
                  </div>

                  <div className="flex items-center gap-1.5 w-32 shrink-0">
                    <Input 
                      type="number"
                      min="10"
                      max="1000"
                      placeholder="Ex: 75"
                      value={margemLucro}
                      onChange={(e) => {
                        setMargemLucro(e.target.value);
                        setIsCustomMargem(true);
                      }}
                      className="bg-[#120f0a] border-2 border-[#d97706]/60 text-white font-black text-center text-sm h-10 rounded-xl focus-visible:ring-[#f59e0b]"
                    />
                    <span className="text-sm font-black text-[#f59e0b]">%</span>
                  </div>
                </div>

              </div>

              {/* ================= BLINDAGEM CONTRA CUSTOS OCULTOS TOTALMENTE EDITÁVEL ================= */}
              <div className="space-y-3 pt-3 border-t-2 border-[#d97706]/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#f59e0b] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#f59e0b]" />
                    Blindagem contra Custos Ocultos (Edite os Valores)
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full font-bold">
                    Evite Prejuízo
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Preencha os custos reais que você tem para o sistema calcular o seu lucro líquido exato:
                </p>

                {/* 1. Taxa de Maquininha / Cartão */}
                <div className="p-3.5 rounded-2xl bg-[#090805] border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#f59e0b]" />
                      <span className="text-xs font-bold text-zinc-200">Taxa da sua Maquininha (%)</span>
                    </div>
                    <Switch checked={usarMaquininha} onCheckedChange={setUsarMaquininha} />
                  </div>

                  {usarMaquininha && (
                    <div className="flex items-center justify-between gap-3 pt-1 border-t border-zinc-900">
                      <span className="text-[11px] text-zinc-400">Porcentagem que a maquininha desconta:</span>
                      <div className="flex items-center gap-1.5 w-28">
                        <Input 
                          type="number"
                          step="0.1"
                          min="0"
                          max="30"
                          value={taxaMaquininha}
                          onChange={(e) => setTaxaMaquininha(e.target.value)}
                          className="bg-[#120f0a] border border-[#d97706]/50 text-white font-bold text-center text-xs h-8 rounded-lg"
                        />
                        <span className="text-xs font-bold text-[#f59e0b]">%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Sacolinha & Embalagem */}
                <div className="p-3.5 rounded-2xl bg-[#090805] border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#f59e0b]" />
                      <span className="text-xs font-bold text-zinc-200">Sacolinha, Laço & Embalagem (R$)</span>
                    </div>
                    <Switch checked={usarEmbalagem} onCheckedChange={setUsarEmbalagem} />
                  </div>

                  {usarEmbalagem && (
                    <div className="flex items-center justify-between gap-3 pt-1 border-t border-zinc-900">
                      <span className="text-[11px] text-zinc-400">Quanto você gasta por sacolinha/brinde:</span>
                      <div className="flex items-center gap-1.5 w-28">
                        <span className="text-xs font-bold text-[#f59e0b]">R$</span>
                        <Input 
                          type="number"
                          step="0.50"
                          min="0"
                          value={custoEmbalagem}
                          onChange={(e) => setCustoEmbalagem(e.target.value)}
                          className="bg-[#120f0a] border border-[#d97706]/50 text-white font-bold text-center text-xs h-8 rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Frete Rateado da Fábrica por Peça */}
                <div className="p-3.5 rounded-2xl bg-[#090805] border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#f59e0b]" />
                      <span className="text-xs font-bold text-zinc-200">Frete da Fábrica por Peça (R$)</span>
                    </div>
                    <Switch checked={usarFrete} onCheckedChange={setUsarFrete} />
                  </div>

                  {usarFrete && (
                    <div className="flex items-center justify-between gap-3 pt-1 border-t border-zinc-900">
                      <span className="text-[11px] text-zinc-400">Valor do frete rateado em cada peça:</span>
                      <div className="flex items-center gap-1.5 w-28">
                        <span className="text-xs font-bold text-[#f59e0b]">R$</span>
                        <Input 
                          type="number"
                          step="0.50"
                          min="0"
                          value={custoFrete}
                          onChange={(e) => setCustoFrete(e.target.value)}
                          className="bg-[#120f0a] border border-[#d97706]/50 text-white font-bold text-center text-xs h-8 rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </Card>

            {/* ================= PAINEL DO RESULTADO (ESTILO LUXO / E-BOOK DO POPUP) ================= */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#241a0d] via-[#161007] to-[#0a0805] border-2 border-[#f59e0b] p-5 sm:p-6 shadow-[0_0_40px_rgba(245,158,11,0.25)] space-y-5">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-black bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#b45309] px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  PREÇO SUGERIDO PARA VENDER
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  100% Calibrado
                </span>
              </div>

              {/* Preços à Vista e Parcelado no Cartão */}
              <div className="grid grid-cols-2 gap-3.5">
                
                {/* Cartão 1: Preço no Pix / À Vista */}
                <div className="bg-gradient-to-b from-[#18130a] to-[#0c0905] border-2 border-emerald-500/60 rounded-2xl p-4 text-center space-y-1.5 shadow-lg relative">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
                    Preço no Pix (À Vista)
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    R$ {calculos.precoVistaFinal.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-emerald-300 font-bold bg-emerald-950/80 py-0.5 px-2 rounded-md border border-emerald-800/40 inline-block">
                    Lucro no Bolso: +R$ {calculos.lucroLiquidoVista.toFixed(2)}
                  </span>
                </div>

                {/* Cartão 2: Preço no Cartão Parcelado */}
                <div className="bg-gradient-to-b from-[#18130a] to-[#0c0905] border-2 border-[#f59e0b]/70 rounded-2xl p-4 text-center space-y-1.5 shadow-lg relative">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#f59e0b] block">
                    Preço no Cartão
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    R$ {calculos.precoCartaoFinal.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-[#f59e0b] font-bold bg-[#1f1609] py-0.5 px-2 rounded-md border border-[#d97706]/40 inline-block">
                    Em até 2x de R$ {calculos.parcela2x.toFixed(2)}
                  </span>
                </div>

              </div>

              {/* Destaque do Lucro Líquido Real com a Matemática Aberta */}
              <div className="bg-gradient-to-r from-emerald-950/90 via-[#0e2114] to-emerald-950/90 border-2 border-emerald-500/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block uppercase tracking-wide">
                      Seu Lucro Líquido Real no Bolso
                    </span>
                    <span className="text-[10px] text-emerald-300">
                      Custo total descontado: R$ {calculos.custoTotalPeca.toFixed(2)} (peça + embalagem + frete)
                    </span>
                  </div>
                </div>

                <div className="text-center sm:text-right shrink-0">
                  <span className="text-2xl font-black text-emerald-400 block tracking-tight">
                    +R$ {calculos.lucroLiquidoVista.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-zinc-300 font-bold bg-emerald-900/60 px-2 py-0.5 rounded-full">
                    {calculos.margemRealLiquidaPercent.toFixed(0)}% de ganho limpo
                  </span>
                </div>
              </div>

              {/* Simulador de Renda Mensal com 3 Caixas */}
              <div className="space-y-2.5 pt-2 border-t-2 border-[#d97706]/30">
                <span className="text-xs font-black uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#f59e0b]" />
                  Simulação de Renda Extra Mensal com essa Peça (26 dias):
                </span>
                
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="bg-[#120f09] p-3 rounded-2xl border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 uppercase font-bold block">1 peça/dia</span>
                    <strong className="text-emerald-400 text-base sm:text-lg block mt-0.5 font-black">
                      R$ {calculos.projecao1PecaDia.toFixed(0)}
                    </strong>
                    <span className="text-[9px] text-zinc-500">lucro limpo/mês</span>
                  </div>

                  <div className="bg-[#1c1409] p-3 rounded-2xl border-2 border-[#f59e0b] shadow-md shadow-[#f59e0b]/15 scale-102">
                    <span className="text-[10px] text-[#f59e0b] uppercase font-black block">3 peças/dia ⭐</span>
                    <strong className="text-[#f59e0b] text-base sm:text-lg block mt-0.5 font-black">
                      R$ {calculos.projecao3PecasDia.toFixed(0)}
                    </strong>
                    <span className="text-[9px] text-zinc-400">lucro limpo/mês</span>
                  </div>

                  <div className="bg-[#120f09] p-3 rounded-2xl border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 uppercase font-bold block">5 peças/dia</span>
                    <strong className="text-emerald-400 text-base sm:text-lg block mt-0.5 font-black">
                      R$ {calculos.projecao5PecasDia.toFixed(0)}
                    </strong>
                    <span className="text-[9px] text-zinc-500">lucro limpo/mês</span>
                  </div>
                </div>
              </div>

              {/* Dica de Ouro de Ancoragem para Falar para a Cliente */}
              <div className="bg-[#1a140b] border-2 border-[#d97706]/40 rounded-2xl p-4 flex items-start gap-3 shadow-md">
                <Lightbulb className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <span className="font-black text-[#f59e0b] text-xs uppercase block tracking-wide">
                    Dica de Ouro da Fábrica para a Cliente Achar Barato:
                  </span>
                  <p className="text-zinc-200 text-xs leading-relaxed italic">
                    "Amiga, uma lingerie com esse mesmo padrão de alta costura em lojas de shopping custa facilmente de R$ 90 a R$ 120. Comigo, como trago direto da fábrica de Nova Friburgo sem intermediários, você leva essa joia por apenas <strong>R$ {calculos.precoVistaFinal.toFixed(2)} no Pix</strong> ou 2x de R$ {calculos.parcela2x.toFixed(2)} no cartão!"
                  </p>
                </div>
              </div>

            </div>

          </TabsContent>

          {/* ================= ABA 2: SCRIPTS DE WHATSAPP ================= */}
          <TabsContent value="scripts" className="space-y-4 mt-0 focus-visible:outline-none">
            
            <div className="bg-[#120f0a] border-2 border-[#d97706]/40 rounded-2xl p-4 text-xs text-zinc-300 space-y-1.5 shadow-md">
              <span className="font-black text-white flex items-center gap-1.5 text-sm uppercase text-[#f59e0b]">
                <MessageSquare className="w-4 h-4 text-[#f59e0b]" />
                Copie e Cole no seu WhatsApp
              </span>
              <p className="text-xs text-zinc-300">
                Toque no botão <strong>"Copiar"</strong> e envie para suas clientes. Textos testados e validados para vender no WhatsApp sem parecer chata.
              </p>
            </div>

            <div className="space-y-3.5">
              {scriptsProntos.map((s) => (
                <Card key={s.id} className="bg-[#120f0a] border border-[#d97706]/30 rounded-2xl p-4 space-y-3 shadow-md hover:border-[#f59e0b]/70 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black text-black bg-gradient-to-r from-[#d97706] to-[#f59e0b] px-2 py-0.5 rounded-md uppercase">
                        {s.categoria}
                      </span>
                      <h3 className="font-bold text-sm text-white mt-1.5">{s.titulo}</h3>
                      <p className="text-[10px] text-zinc-400 mt-0.5">{s.objetivo}</p>
                    </div>

                    <Button 
                      size="sm"
                      onClick={() => handleCopyScript(s.id, s.texto)}
                      className={`h-8 px-3 rounded-xl text-xs font-black shrink-0 gap-1.5 transition-all ${
                        copiedScriptId === s.id
                          ? 'bg-emerald-500 text-black'
                          : 'bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:brightness-110 text-black shadow-md'
                      }`}
                    >
                      {copiedScriptId === s.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="bg-[#070604] border border-[#d97706]/20 rounded-xl p-3.5 text-xs text-zinc-200 whitespace-pre-wrap font-sans leading-relaxed select-text">
                    {s.texto}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ================= ABA 3: GUIA EM E-BOOK PDF (ORGANIZADO & PRONTO) ================= */}
          <TabsContent value="guia" className="space-y-5 mt-0 focus-visible:outline-none">
            
            {/* Bloco de Download / Impressão Formatado */}
            <Card className="bg-[#120f0a] border-2 border-[#d97706]/50 rounded-3xl p-5 sm:p-6 text-center space-y-4 shadow-xl">
              {/* Capa 3D Oficial do E-book (Sem linha dourada em volta) */}
              <div className="w-36 sm:w-44 mx-auto">
                <img 
                  src="/assets/mimos/capa-maquina-vendas-3d.jpg" 
                  alt="Capa Oficial do E-book Máquina de Vendas Zap" 
                  className="w-full h-auto rounded-2xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-[#f59e0b] tracking-wider">
                  Material Oficial Avante Lingerie
                </span>
                <h3 className="text-lg font-black text-white font-serif">
                  Guia Completo da Revendedora de Sucesso
                </h3>
                <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Abaixo você pode ler o guia completo organizado, copiar o conteúdo ou imprimir/salvar em PDF no seu celular.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 justify-center max-w-md mx-auto pt-1">
                <Button 
                  onClick={() => {
                    toast.success('Abrindo janela de impressão/PDF!');
                    window.print();
                  }}
                  className="flex-1 bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#b45309] hover:brightness-110 text-black font-black py-5 rounded-2xl text-xs gap-2 shadow-lg shadow-[#f59e0b]/20"
                >
                  <Printer className="w-4 h-4" />
                  Salvar / Imprimir em PDF
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    const text = `GUIA DA REVENDEDORA AVANTE LINGERIE\n\n1. TABELA DE PRECIFICAÇÃO:\n- Preço de Custo na Fábrica: Conjuntos a partir de R$ 19,90 a R$ 24,90\n- Margem Recomendada: 100% de lucro no bolso\n- Preço de Venda Sugerido: R$ 49,90 a R$ 54,90\n\n2. REGRAS DE OURO:\n- Sempre mostre a peça nas mãos ou em cabides limpos\n- Mencione a renda francesa e o polo de Nova Friburgo\n- Dê o desconto no Pix para ter dinheiro na mão na hora.`;
                    navigator.clipboard.writeText(text);
                    toast.success('Resumo do Guia copiado para sua área de transferência!');
                  }}
                  className="border-[#d97706]/50 bg-[#1a140b] text-[#f59e0b] hover:bg-[#281e0f] rounded-2xl text-xs font-bold py-5 gap-1.5"
                >
                  <Copy className="w-4 h-4" />
                  Copiar Resumo
                </Button>
              </div>
            </Card>

            {/* Conteúdo Completo do Guia em Layout de Leitura Luxo */}
            <div className="bg-[#120f0a] border border-[#d97706]/40 rounded-3xl p-5 sm:p-6 space-y-6 text-zinc-200">
              
              <div className="border-b border-zinc-800 pb-4 text-center sm:text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#f59e0b]">
                  Capítulo 1 • O Método Avante
                </span>
                <h4 className="text-base sm:text-lg font-black text-white mt-1">
                  Como Lucrar 100% a 150% Revendendo Moda Íntima
                </h4>
              </div>

              {/* Bloco 1 */}
              <div className="space-y-2">
                <h5 className="font-bold text-xs text-[#f59e0b] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  1. O Segredo da Fábrica de Nova Friburgo
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Nova Friburgo/RJ é reconhecida como a Capital Nacional da Moda Íntima. Comprando direto da Avante Lingerie sem passar por atacadistas ou atravessadores, você tem acesso às mesmas modelagens de alta costura que lojas de shopping vendem por R$ 120, pagando apenas R$ 24,90. Essa diferença é o seu lucro limpo.
                </p>
              </div>

              {/* Bloco 2 */}
              <div className="space-y-2">
                <h5 className="font-bold text-xs text-[#f59e0b] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  2. A Regra dos R$ 49,90 (O Preço Mágico do Pix)
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Evite vender por números redondos como R$ 50 ou R$ 60. O preço psicológico terminado em <strong>,90</strong> ativa na mente da cliente a sensação de promoção imperdível. Ao comprar por R$ 24,90 e vender a R$ 49,90 no Pix, você dobra o seu investimento na mesma hora.
                </p>
              </div>

              {/* Bloco 3 */}
              <div className="space-y-2">
                <h5 className="font-bold text-xs text-[#f59e0b] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  3. Como Montar Sacolinhas Perfumadas que Encantam
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Borrife um aroma suave de lavanda ou baunilha no papel de seda da sacolinha. Quando a cliente abre o pacote e sente o perfume, ela associa a compra a um momento de autocuidado VIP. Isso elimina qualquer comparação de preço e faz ela comprar de você todos os meses.
                </p>
              </div>

              {/* Bloco de Ação com o Catálogo */}
              <div className="p-4 rounded-2xl bg-[#1a140b] border-2 border-[#d97706]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black text-white block">Quer Abastecer com Peças Novas?</span>
                  <span className="text-[11px] text-zinc-400">Direto da fábrica em Nova Friburgo/RJ</span>
                </div>
                <a
                  href="/quero-revender"
                  className="bg-gradient-to-r from-[#d97706] to-[#f59e0b] text-black font-black text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-md shrink-0"
                >
                  <span>Acessar Catálogo Atacado</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </TabsContent>
        </Tabs>

      </main>

    </div>
  );
}
