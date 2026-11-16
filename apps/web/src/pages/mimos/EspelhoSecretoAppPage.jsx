// Caminho do arquivo: apps/web/src/pages/mimos/EspelhoSecretoAppPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { 
  Sparkles, 
  Smartphone, 
  Eye, 
  CheckCircle2, 
  Circle, 
  Star, 
  ExternalLink, 
  ArrowRight, 
  BookOpen, 
  Printer, 
  Copy, 
  ShieldCheck, 
  RotateCcw, 
  Ruler, 
  Heart, 
  Flame, 
  Award,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Card } from '@/components/ui/card.jsx';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { toast } from 'sonner';

export default function EspelhoSecretoAppPage() {
  const [activeTab, setActiveTab] = useState('quiz');

  // ================= ESTADOS DO QUIZ DE DIAGNÓSTICO =================
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [respostaBusto, setRespostaBusto] = useState('');
  const [respostaDesafio, setRespostaDesafio] = useState('');
  const [respostaEfeito, setRespostaEfeito] = useState('');

  // ================= ESTADOS DA CALCULADORA DE MEDIDAS =================
  const [medidaBusto, setMedidaBusto] = useState(92);
  const [medidaTorax, setMedidaTorax] = useState(78);

  // Categorias Dinâmicas carregadas do PocketBase
  const [categoriasLoja, setCategoriasLoja] = useState([
    { nome: 'Conjunto', slug: 'conjunto' },
    { nome: 'Body', slug: 'body' },
    { nome: 'Calcinha', slug: 'calcinha' },
    { nome: 'Cropped', slug: 'cropped' },
    { nome: 'Plus Size', slug: 'plus-size' }
  ]);

  useEffect(() => {
    const fetchCats = async () => {
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
        console.warn('Usando categorias padrão:', err);
      }
    };
    fetchCats();
  }, []);

  // Diagnóstico Inteligente baseado nas respostas
  const diagnosticoFinal = useMemo(() => {
    if (!respostaBusto || !respostaDesafio || !respostaEfeito) return null;

    let perfil = 'Silhueta Clássica & Harmoniosa';
    let sutiãIdeal = 'Sutiã com Bojo Soft e Base Anatômica';
    let calcinhaIdeal = 'Calcinha Cós Médio com Laterais em Renda Francesa';
    let evite = 'Peças com aros rígidos ou elásticos finos que dividem a silhueta.';
    let categoriaAlvo = 'conjunto';

    if (respostaBusto === 'volumoso') {
      perfil = 'Silhueta Busto Cheio & Sustentação Máxima';
      sutiãIdeal = 'Sutiã com Base Reforçada, Laterais Largas em Dupla Poliamida e Alças de 18mm';
      calcinhaIdeal = 'Calcinha Cós Alto / Modeladora para sustentação uniforme do abdômen';
      evite = 'Meias-taças sem base de sustentação ou alças fininhas que sobrecarregam os ombros.';
      categoriaAlvo = 'plus-size';
    } else if (respostaBusto === 'pequeno') {
      perfil = 'Silhueta Delicada & Decote Valorizado';
      sutiãIdeal = 'Sutiã Triângulo com Renda Francesa ou Push-Up com Bolha Gradual';
      calcinhaIdeal = 'Calcinha Fio Duplo ou Tanga Renda para alongar as pernas';
      evite = 'Bojos rígidos que sobram na parte superior ou criam espaço oco.';
      categoriaAlvo = 'conjunto';
    } else if (respostaBusto === 'espalhado') {
      perfil = 'Silhueta com Foco em Centralização & Conforto Lateral';
      sutiãIdeal = 'Sutiã com Fecho Lateral Reforçado e Taça Inteira que projeta para o centro';
      calcinhaIdeal = 'Calcinha Sem Costura com Corte a Laser';
      evite = 'Sutiãs sem lateral alta que deixam o tecido lateral escapar.';
      categoriaAlvo = 'body';
    }

    if (respostaEfeito === 'conforto') {
      sutiãIdeal = 'Top Cropped em Alta Renda Sem Aro com Forro 100% Algodão Antitranspirante';
    } else if (respostaEfeito === 'sensual') {
      sutiãIdeal = 'Body de Renda Francesa com Decote Profundo e Transparência Elegante';
      categoriaAlvo = 'body';
    }

    return {
      perfil,
      sutiãIdeal,
      calcinhaIdeal,
      evite,
      categoriaAlvo
    };
  }, [respostaBusto, respostaDesafio, respostaEfeito]);

  // Cálculo da Tabela de Medidas ABNT
  const calculoMedida = useMemo(() => {
    const busto = Math.max(60, Number(medidaBusto) || 90);
    const torax = Math.max(50, Number(medidaTorax) || 75);

    let tamanhoSugerido = 'M (42)';
    let descricaoTamanho = 'Busto entre 89cm e 93cm | Tórax entre 78cm e 82cm';

    if (busto <= 86 || torax <= 72) {
      tamanhoSugerido = 'P (40)';
      descricaoTamanho = 'Busto entre 80cm e 86cm | Tórax entre 68cm e 72cm';
    } else if (busto <= 93 && torax <= 82) {
      tamanhoSugerido = 'M (42)';
      descricaoTamanho = 'Busto entre 89cm e 93cm | Tórax entre 78cm e 82cm';
    } else if (busto <= 98 && torax <= 87) {
      tamanhoSugerido = 'G (44)';
      descricaoTamanho = 'Busto entre 94cm e 98cm | Tórax entre 83cm e 87cm';
    } else {
      tamanhoSugerido = 'GG (46/48)';
      descricaoTamanho = 'Busto acima de 99cm | Tórax acima de 88cm';
    }

    const diferenca = busto - torax;
    let tipoTaca = 'Taça B (Proporcional)';
    if (diferenca < 12) tipoTaca = 'Taça A (Costas maiores que o busto)';
    if (diferenca >= 16) tipoTaca = 'Taça C / D (Busto volumoso para as costas)';

    return {
      tamanhoSugerido,
      descricaoTamanho,
      tipoTaca,
      diferenca
    };
  }, [medidaBusto, medidaTorax]);

  const resetQuiz = () => {
    setEtapaAtual(1);
    setRespostaBusto('');
    setRespostaDesafio('');
    setRespostaEfeito('');
    toast.info('Quiz reiniciado. Vamos refazer o diagnóstico!');
  };

  const handleSalvarNoCelular = () => {
    if (navigator.share) {
      navigator.share({
        title: 'O Espelho Secreto • Avante Lingerie',
        text: 'Meu Diagnóstico VIP de Busto e Silhueta da Avante Lingerie',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado! Salve nos favoritos do seu celular.');
    }
  };

  return (
    <div className="min-h-screen bg-[#090514] text-zinc-100 font-sans pb-24 selection:bg-[#9333ea] selection:text-white">
      
      {/* ================= HEADER DO APP: IDENTIDADE VIP AVANTE LINGERIE ================= */}
      <header className="sticky top-0 z-50 bg-[#100824]/95 backdrop-blur-md border-b-2 border-[#9333ea]/40 px-4 py-3 shadow-[0_4px_25px_rgba(147,51,234,0.2)]">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          
          {/* Logo e Informações */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#9333ea] via-[#c084fc] to-[#6b21a8] p-0.5 shadow-lg shadow-[#9333ea]/30 shrink-0">
                <div className="w-full h-full bg-[#0d071c] rounded-[14px] flex items-center justify-center text-[#c084fc]">
                  <Crown className="w-6 h-6 animate-pulse" />
                </div>
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#090514] rounded-full"></span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-serif font-black tracking-widest text-[#c084fc] text-xs sm:text-sm uppercase drop-shadow-sm">
                  AVANTE LINGERIE
                </span>
                <Badge className="bg-gradient-to-r from-[#9333ea] to-[#c084fc] text-white font-extrabold text-[9px] py-0 px-1.5 uppercase shadow-sm">
                  Mimo da Fábrica
                </Badge>
              </div>
              <h1 className="font-extrabold text-sm sm:text-base text-white tracking-wide flex items-center gap-1">
                O Espelho Secreto
              </h1>
            </div>
          </div>

          {/* Botão de Salvar no Celular */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSalvarNoCelular}
            className="border-[#9333ea]/60 bg-[#1c0e3a] hover:bg-[#2a1555] text-[#c084fc] hover:text-white rounded-2xl text-xs gap-1.5 h-9 font-bold shadow-md shadow-[#9333ea]/15 shrink-0"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Salvar no Celular</span>
            <span className="sm:hidden">Salvar</span>
          </Button>

        </div>
      </header>

      {/* ================= CONTAINER PRINCIPAL (LARGURA MOBILE FIRST) ================= */}
      <main className="max-w-2xl mx-auto px-4 pt-5 space-y-5">
        
        {/* ================= BANNER SUPERIOR HERO COM A ARTE 3D OFICIAL ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#241147] via-[#150a2e] to-[#090514] border-2 border-[#9333ea]/60 p-5 sm:p-6 shadow-[0_0_35px_rgba(147,51,234,0.25)]">
          {/* Brilhos decorativos no fundo */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#9333ea]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#c084fc]/15 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left relative z-10">
            {/* Imagem Bonita 3D Oficial (Sem linha dourada em volta) */}
            <div className="w-24 sm:w-28 shrink-0 relative group">
              <img 
                src="/assets/mimos/capa-espelho-secreto-3d.png" 
                alt="O Espelho Secreto • Capa 3D" 
                className="w-full h-auto drop-shadow-[0_12px_25px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider text-black bg-gradient-to-r from-[#facc15] via-[#fde047] to-[#eab308] px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  MAIS ESCOLHIDO
                </span>
                <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#e11d48] to-[#be123c] border border-rose-400/40 px-2 py-0.5 rounded-full shadow-sm">
                  De R$ 67 por: GRÁTIS HOJE
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-white font-serif tracking-wide leading-tight">
                Seu Diagnóstico VIP de Busto & Silhueta Perfeita
              </h2>

              <p className="text-xs text-zinc-300 leading-relaxed max-w-lg">
                Presente exclusivo da <strong>Avante Lingerie</strong> para você. Descubra a modelagem exata que valoriza seu colo, sustenta com conforto e elimina marcas nas costas sem apertar.
              </p>
            </div>
          </div>
        </div>

        {/* ================= ABAS DO APLICATIVO ================= */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
          <TabsList className="w-full grid grid-cols-3 bg-[#150a2e] border-2 border-[#9333ea]/40 p-1.5 rounded-2xl h-auto shadow-md">
            <TabsTrigger 
              value="quiz" 
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9333ea] data-[state=active]:via-[#a855f7] data-[state=active]:to-[#9333ea] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-zinc-400 transition-all uppercase tracking-wider"
            >
              <Eye className="w-4 h-4 shrink-0" />
              <span>Quiz VIP</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="medidas" 
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9333ea] data-[state=active]:via-[#a855f7] data-[state=active]:to-[#9333ea] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-zinc-400 transition-all uppercase tracking-wider"
            >
              <Ruler className="w-4 h-4 shrink-0" />
              <span>Medidas</span>
            </TabsTrigger>

            <TabsTrigger 
              value="guia" 
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9333ea] data-[state=active]:via-[#a855f7] data-[state=active]:to-[#9333ea] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-zinc-400 transition-all uppercase tracking-wider"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Guia PDF</span>
            </TabsTrigger>
          </TabsList>

          {/* ================= ABA 1: QUIZ INTERATIVO ================= */}
          <TabsContent value="quiz" className="space-y-5 mt-0 focus-visible:outline-none">
            
            {/* Bloco de Categorias da Loja */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#170b34] border border-[#9333ea]/35 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c084fc]" />
                  Encontre a sua modelagem na vitrine da fábrica:
                </span>
                <span className="text-[10px] text-[#c084fc] font-medium hidden sm:inline">
                  Toque para abrir
                </span>
              </div>

              {/* Nomes das Categorias apenas em Texto */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1 text-xs">
                {categoriasLoja.map((cat, idx) => (
                  <React.Fragment key={cat.slug || cat.id || idx}>
                    <a
                      href={`/categoria/${cat.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-200 hover:text-[#c084fc] font-semibold underline underline-offset-4 decoration-[#9333ea]/50 hover:decoration-[#c084fc] transition-all cursor-pointer inline-flex items-center gap-1 group py-0.5"
                      title={`Ver todos os produtos de ${cat.nome}`}
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">{cat.nome}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-zinc-500 group-hover:text-[#c084fc] shrink-0" />
                    </a>
                    {idx < categoriasLoja.length - 1 && (
                      <span className="text-zinc-600 select-none">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* QUIZ: Etapas 1, 2 e 3 ou Painel do Resultado */}
            {!diagnosticoFinal ? (
              <Card className="bg-[#120827] border-2 border-[#9333ea]/40 rounded-3xl p-5 sm:p-6 space-y-5 shadow-xl">
                
                {/* Indicador de Etapa */}
                <div className="flex items-center justify-between border-b border-[#9333ea]/20 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-[#c084fc]">
                    Etapa {etapaAtual} de 3
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3].map((step) => (
                      <div 
                        key={step} 
                        className={`h-2 rounded-full transition-all ${
                          etapaAtual === step 
                            ? 'w-6 bg-[#c084fc]' 
                            : etapaAtual > step 
                              ? 'w-2.5 bg-emerald-400' 
                              : 'w-2.5 bg-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* ETAPA 1: Volume e Formato do Busto */}
                {etapaAtual === 1 && (
                  <div className="space-y-3.5">
                    <div>
                      <h3 className="text-sm font-black text-white">
                        Como você descreve o volume do seu busto?
                      </h3>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Selecione a opção que melhor se aproxima do seu colo ao se olhar no espelho:
                      </p>
                    </div>

                    <div className="space-y-2">
                      {[
                        { id: 'pequeno', label: 'Busto Pequeno / Pouco Volume', desc: 'Sutiãs comuns costumam sobrar na taça ou ficar com espaço oco.' },
                        { id: 'medio', label: 'Busto Médio / Firme & Proporcional', desc: 'Preenche bem a taça média, sem transbordar nem sobrar.' },
                        { id: 'volumoso', label: 'Busto Cheio / Pesado', desc: 'Exige sustentação firme; alças finas machucam o ombro e a base sobe nas costas.' },
                        { id: 'espalhado', label: 'Busto Espalhado para as Laterais', desc: 'O volume vai para os lados em direção à axila; precisa de aproximação.' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setRespostaBusto(opt.id);
                            setEtapaAtual(2);
                          }}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                            respostaBusto === opt.id
                              ? 'bg-gradient-to-r from-[#9333ea]/30 to-[#c084fc]/20 border-[#c084fc] shadow-md'
                              : 'bg-[#0b051a] border-zinc-800 hover:border-[#9333ea]/70'
                          }`}
                        >
                          <span className="text-xs font-bold text-white block">{opt.label}</span>
                          <span className="text-[10px] text-zinc-400 mt-0.5 block">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ETAPA 2: Maior Desafio no Dia a Dia */}
                {etapaAtual === 2 && (
                  <div className="space-y-3.5">
                    <div>
                      <h3 className="text-sm font-black text-white">
                        Qual é o seu maior incômodo com sutiãs comuns?
                      </h3>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        O que mais te irrita na hora de usar lingerie o dia todo?
                      </p>
                    </div>

                    <div className="space-y-2">
                      {[
                        { id: 'machuca', label: 'O aro de ferro machuca o osso ou fura a lateral', desc: 'Termina o dia com marcas vermelhas e louca para arrancar o sutiã.' },
                        { id: 'caindo', label: 'As alças ficam escorregando pelos ombros', desc: 'Tem que ficar puxando a alça o tempo todo por baixo da blusa.' },
                        { id: 'gordurinha', label: 'Gordurinha lateral ou nas costas fica marcada', desc: 'A lateral aperta demais e cria dobras visíveis na roupa justa.' },
                        { id: 'caido', label: 'Falta de sustentação (parece caído/esparramado)', desc: 'Gostaria de um colo mais firme, empinado e bem desenhado.' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setRespostaDesafio(opt.id);
                            setEtapaAtual(3);
                          }}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                            respostaDesafio === opt.id
                              ? 'bg-gradient-to-r from-[#9333ea]/30 to-[#c084fc]/20 border-[#c084fc] shadow-md'
                              : 'bg-[#0b051a] border-zinc-800 hover:border-[#9333ea]/70'
                          }`}
                        >
                          <span className="text-xs font-bold text-white block">{opt.label}</span>
                          <span className="text-[10px] text-zinc-400 mt-0.5 block">{opt.desc}</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setEtapaAtual(1)}
                        className="text-[11px] text-zinc-400 hover:text-white transition-colors"
                      >
                        ← Voltar para etapa anterior
                      </button>
                    </div>
                  </div>
                )}

                {/* ETAPA 3: Efeito Desejado no Espelho */}
                {etapaAtual === 3 && (
                  <div className="space-y-3.5">
                    <div>
                      <h3 className="text-sm font-black text-white">
                        Qual resultado você quer ver ao se olhar no espelho?
                      </h3>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Escolha a sensação perfeita que você busca na sua lingerie:
                      </p>
                    </div>

                    <div className="space-y-2">
                      {[
                        { id: 'conforto', label: 'Conforto Absoluto & Zero Aperto', desc: 'Parece que não estou usando nada, mas com formato bonito.' },
                        { id: 'pushup', label: 'Decote Valorizado & Colo Empinado', desc: 'Efeito Push-up elegante para vestidos e decotes sem vulgaridade.' },
                        { id: 'sensual', label: 'Renda Francesa & Elegância de Alta Costura', desc: 'Peça nobre para ocasiões especiais ou para me sentir poderosa.' },
                        { id: 'redutor', label: 'Costas Lisas & Laterais Seguras', desc: 'Sem dobras nas costas, tecido nobre que abraça sem marcar.' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setRespostaEfeito(opt.id)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                            respostaEfeito === opt.id
                              ? 'bg-gradient-to-r from-[#9333ea]/30 to-[#c084fc]/20 border-[#c084fc] shadow-md'
                              : 'bg-[#0b051a] border-zinc-800 hover:border-[#9333ea]/70'
                          }`}
                        >
                          <span className="text-xs font-bold text-white block">{opt.label}</span>
                          <span className="text-[10px] text-zinc-400 mt-0.5 block">{opt.desc}</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-1 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setEtapaAtual(2)}
                        className="text-[11px] text-zinc-400 hover:text-white transition-colors"
                      >
                        ← Voltar
                      </button>

                      {respostaEfeito && (
                        <Button 
                          onClick={() => toast.success('Diagnóstico concluído com sucesso!')}
                          className="bg-gradient-to-r from-[#9333ea] to-[#c084fc] text-white font-black text-xs px-4 py-2 rounded-xl shadow-lg"
                        >
                          Ver Meu Resultado VIP
                        </Button>
                      )}
                    </div>
                  </div>
                )}

              </Card>
            ) : (
              /* ================= CARD DO DIAGNÓSTICO FINAL ================= */
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#25104d] via-[#160a30] to-[#090514] border-2 border-[#c084fc] p-5 sm:p-6 shadow-[0_0_40px_rgba(147,51,234,0.35)] space-y-5">
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-black bg-gradient-to-r from-[#facc15] via-[#fde047] to-[#eab308] px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 fill-current" />
                    SEU DIAGNÓSTICO VIP LIBERADO
                  </span>
                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="text-[11px] text-[#c084fc] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Refazer
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-mono">Seu Biotipo Identificado:</span>
                  <h3 className="text-lg sm:text-xl font-black text-white font-serif tracking-wide">
                    {diagnosticoFinal.perfil}
                  </h3>
                </div>

                {/* Bloco 1: A Modelagem Ideal */}
                <div className="p-4 rounded-2xl bg-[#110726] border-2 border-[#9333ea]/50 space-y-2">
                  <span className="text-xs font-black text-[#c084fc] uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Modelagem Perfeita Para o Seu Corpo:
                  </span>
                  <p className="text-xs text-zinc-200 leading-relaxed font-bold">
                    {diagnosticoFinal.sutiãIdeal}
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Calcinha combinando:</strong> {diagnosticoFinal.calcinhaIdeal}.
                  </p>
                </div>

                {/* Bloco 2: O que Evitar */}
                <div className="p-4 rounded-2xl bg-[#1a0c36] border border-rose-500/30 space-y-1.5">
                  <span className="text-xs font-black text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-rose-400" />
                    O que Você Deve Evitar a Todo Custo:
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {diagnosticoFinal.evite}
                  </p>
                </div>

                {/* Botão de Direcionamento para a Loja */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[#170b34] border border-[#9333ea]/40">
                  <div>
                    <span className="text-xs font-black text-white block">Quer ver as peças recomendadas?</span>
                    <span className="text-[11px] text-zinc-400">Peças com caimento perfeito direto da fábrica</span>
                  </div>
                  <a
                    href={`/categoria/${diagnosticoFinal.categoriaAlvo}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gradient-to-r from-[#9333ea] to-[#c084fc] hover:brightness-110 text-white font-black text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-md shrink-0 transition-all"
                  >
                    <span>Ver Peças Ideais na Loja</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            )}

          </TabsContent>

          {/* ================= ABA 2: CALCULADORA DE MEDIDAS ================= */}
          <TabsContent value="medidas" className="space-y-5 mt-0 focus-visible:outline-none">
            
            <Card className="bg-[#120827] border-2 border-[#9333ea]/40 rounded-3xl p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.6)] space-y-6">
              
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-[#c084fc] tracking-wider">
                  Padrão ABNT Oficial • Avante Lingerie
                </span>
                <h3 className="text-base font-black text-white">
                  Descubra Seu Tamanho Exato em Segundos
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Pegue uma fita métrica e informe suas duas medidas corporais sem apertar:
                </p>
              </div>

              {/* Input 1: Medida do Busto */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-[#c084fc] flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-[#c084fc]" />
                    1. Medida do Busto (na altura do mamilo):
                  </label>
                  <span className="text-[11px] text-zinc-400 font-mono">Parte mais cheia</span>
                </div>
                
                <div className="relative">
                  <Input 
                    type="number"
                    min="60"
                    max="160"
                    value={medidaBusto}
                    onChange={(e) => setMedidaBusto(e.target.value)}
                    className="pl-4 pr-12 bg-[#090514] border-2 border-[#9333ea]/50 text-white font-black text-2xl h-14 rounded-2xl focus-visible:ring-[#c084fc] focus-visible:border-[#c084fc] shadow-inner"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-[#c084fc]">cm</span>
                </div>
              </div>

              {/* Input 2: Medida do Tórax / Abaixo do Busto */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-[#c084fc] flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-[#c084fc]" />
                    2. Medida do Tórax (logo abaixo dos seios):
                  </label>
                  <span className="text-[11px] text-zinc-400 font-mono">Subbusto / Costas</span>
                </div>
                
                <div className="relative">
                  <Input 
                    type="number"
                    min="50"
                    max="140"
                    value={medidaTorax}
                    onChange={(e) => setMedidaTorax(e.target.value)}
                    className="pl-4 pr-12 bg-[#090514] border-2 border-[#9333ea]/50 text-white font-black text-2xl h-14 rounded-2xl focus-visible:ring-[#c084fc] focus-visible:border-[#c084fc] shadow-inner"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-[#c084fc]">cm</span>
                </div>
              </div>

            </Card>

            {/* Resultado do Tamanho Sugerido */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#241147] via-[#150a2e] to-[#090514] border-2 border-[#c084fc] p-5 sm:p-6 shadow-[0_0_35px_rgba(147,51,234,0.3)] space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#9333ea] to-[#c084fc] px-3 py-1 rounded-full shadow-md">
                  SEU TAMANHO RECOMENDADO
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  Caimento Perfeito
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#120827] border-2 border-[#9333ea]/60 rounded-2xl p-4 text-center space-y-1 shadow-lg">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#c084fc] block">
                    Tamanho da Peça
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {calculoMedida.tamanhoSugerido}
                  </div>
                  <span className="text-[10px] text-zinc-300 font-bold block pt-0.5">
                    Padrão de Fábrica
                  </span>
                </div>

                <div className="bg-[#120827] border-2 border-emerald-500/60 rounded-2xl p-4 text-center space-y-1 shadow-lg">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
                    Tipo de Taça
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-white tracking-tight pt-1">
                    {calculoMedida.tipoTaca.split(' ')[1] || 'B'}
                  </div>
                  <span className="text-[10px] text-emerald-300 font-bold block pt-0.5">
                    {calculoMedida.tipoTaca}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#140a2b] border border-[#9333ea]/30 text-xs text-zinc-300 space-y-1">
                <span className="font-bold text-white block">Faixa de Medidas:</span>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  {calculoMedida.descricaoTamanho}. Com essa numeração, você nunca mais terá problemas de sutiã apertando nas costas ou sobrando no busto.
                </p>
              </div>

            </div>

          </TabsContent>

          {/* ================= ABA 3: GUIA OFICIAL EM PDF ================= */}
          <TabsContent value="guia" className="space-y-5 mt-0 focus-visible:outline-none">
            
            {/* Bloco de Download / Impressão Formatado */}
            <Card className="bg-[#120827] border-2 border-[#9333ea]/50 rounded-3xl p-5 sm:p-6 text-center space-y-4 shadow-xl">
              
              {/* Capa 3D Oficial do E-book (Sem linha dourada em volta) */}
              <div className="w-36 sm:w-44 mx-auto">
                <img 
                  src="/assets/mimos/capa-espelho-secreto-3d.png" 
                  alt="Capa Oficial do E-book O Espelho Secreto" 
                  className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-[#c084fc] tracking-wider">
                  Material Oficial Avante Lingerie
                </span>
                <h3 className="text-lg font-black text-white font-serif">
                  O Manual Secreto do Caimento Perfeito
                </h3>
                <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Abaixo você confere o conteúdo completo organizado, com as regras de ouro para escolher a lingerie perfeita para o seu tipo de corpo.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 justify-center max-w-md mx-auto pt-1">
                <Button 
                  onClick={() => {
                    toast.success('Abrindo janela de impressão/PDF!');
                    window.print();
                  }}
                  className="flex-1 bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#7e22ce] hover:brightness-110 text-white font-black py-5 rounded-2xl text-xs gap-2 shadow-lg shadow-[#9333ea]/25"
                >
                  <Printer className="w-4 h-4" />
                  Salvar / Imprimir em PDF
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    const text = `O ESPELHO SECRETO • AVANTE LINGERIE\n\n1. O ERRO NÚMERO 1:\n80% das mulheres usam o sutiã com as costas folgadas e as alças apertadas demais. O segredo da sustentação vem da BASE do sutiã, não das alças!\n\n2. COMO ESCONDER AS GORDURINHAS:\nPrefira peças com laterais largas em dupla poliamida e acabamento sem costura na cava.\n\n3. ESCOLHA POR OCASIÃO:\n- Dia a dia: Cropped sem aro com forro de algodão\n- Decotes: Sutiã meia-taça anatômico com bojo flexível\n- Alta Noite: Bodies com renda francesa trabalhada.`;
                    navigator.clipboard.writeText(text);
                    toast.success('Resumo do Manual copiado para sua área de transferência!');
                  }}
                  className="border-[#9333ea]/60 bg-[#1c0e3a] text-[#c084fc] hover:bg-[#281552] rounded-2xl text-xs font-bold py-5 gap-1.5"
                >
                  <Copy className="w-4 h-4" />
                  Copiar Resumo
                </Button>
              </div>
            </Card>

            {/* Conteúdo Completo do Manual */}
            <div className="bg-[#120827] border border-[#9333ea]/40 rounded-3xl p-5 sm:p-6 space-y-6 text-zinc-200">
              
              <div className="border-b border-zinc-800 pb-4 text-center sm:text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#c084fc]">
                  Capítulo 1 • A Anatomia da Lingerie Perfeita
                </span>
                <h4 className="text-base sm:text-lg font-black text-white mt-1">
                  Por que 8 em Cada 10 Mulheres Usam o Tamanho Errado?
                </h4>
              </div>

              {/* Ponto 1 */}
              <div className="space-y-2">
                <h5 className="font-bold text-xs text-[#c084fc] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  1. O Mito das Alças: O Peso Não Deve Ficar nos Ombros
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Se o seu sutiã deixa marcas fundas nos ombros ou causa dor cervical ao final do dia, a base do sutiã está frouxa. 85% da sustentação do busto deve vir da faixa torácica (base) e apenas 15% das alças. Ao ajustar o tórax corretamente, seus ombros ficam 100% livres de tensão.
                </p>
              </div>

              {/* Ponto 2 */}
              <div className="space-y-2">
                <h5 className="font-bold text-xs text-[#c084fc] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  2. Como Eliminar as Marquinhas nas Costas
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Para não criar a famosa "dobrinha" abaixo da axila ou nas costas, a largura da lateral é decisiva. As modelagens exclusivas da Avante Lingerie possuem laterais de 10cm a 14cm em poliamida com elastano duplo, distribuindo a pressão uniformemente e deixando as costas totalmente lisinhas sob vestidos ou blusas finas.
                </p>
              </div>

              {/* Ponto 3 */}
              <div className="space-y-2">
                <h5 className="font-bold text-xs text-[#c084fc] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  3. O Toque da Renda Francesa de Nova Friburgo
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Renda bonita não pode pinicar nem causar alergia. Produzida no polo têxtil de Nova Friburgo, a renda dos nossos conjuntos passa por lavagem amaciada e acabamento com toque de seda, garantindo sensualidade com conforto que você esquece que está usando.
                </p>
              </div>

              {/* CTA da Loja */}
              <div className="p-4 rounded-2xl bg-[#170b34] border-2 border-[#9333ea]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black text-white block">Quer Renovar Suas Peças com Preço de Fábrica?</span>
                  <span className="text-[11px] text-zinc-400">Conjuntos, bodies e calcinhas sem costura</span>
                </div>
                <a
                  href="/categoria/conjunto"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-to-r from-[#9333ea] to-[#c084fc] hover:brightness-110 text-white font-black text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-md shrink-0 transition-all"
                >
                  <span>Ver Catálogo da Fábrica</span>
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
