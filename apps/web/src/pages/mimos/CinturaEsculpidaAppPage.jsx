// Caminho do arquivo: apps/web/src/pages/mimos/CinturaEsculpidaAppPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { 
  Sparkles, 
  Smartphone, 
  Droplets, 
  CalendarCheck, 
  CheckCircle2, 
  Circle, 
  Activity, 
  Flame, 
  BookOpen, 
  Printer, 
  Copy, 
  Check, 
  Award, 
  Trophy, 
  HeartHandshake, 
  Star, 
  ChevronRight, 
  ArrowRight, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  RefreshCw,
  Gift
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Card } from '@/components/ui/card.jsx';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { toast } from 'sonner';

export default function CinturaEsculpidaAppPage() {
  const [activeTab, setActiveTab] = useState('protocolo');

  // ================= ESTADOS DO PROTOCOLO 21 DIAS =================
  const [diasConcluidos, setDiasConcluidos] = useState(() => {
    try {
      const saved = localStorage.getItem('cintura_esculpida_dias');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleDia = (diaNum) => {
    setDiasConcluidos((prev) => {
      const isDone = prev.includes(diaNum);
      const updated = isDone ? prev.filter((d) => d !== diaNum) : [...prev, diaNum];
      try {
        localStorage.setItem('cintura_esculpida_dias', JSON.stringify(updated));
      } catch {}
      if (!isDone) {
        toast.success(`Parabéns! Dia ${diaNum} concluído com sucesso. Mais perto da sua cintura esculpida! ✨`);
      }
      return updated;
    });
  };

  const resetProtocolo = () => {
    if (window.confirm('Deseja reiniciar o seu progresso do desafio de 21 dias?')) {
      setDiasConcluidos([]);
      try {
        localStorage.removeItem('cintura_esculpida_dias');
      } catch {}
      toast.info('Desafio reiniciado. Bora começar com tudo!');
    }
  };

  // ================= ESTADOS DA CALCULADORA DE HIDRATAÇÃO =================
  const [pesoKg, setPesoKg] = useState(65);
  const [nivelAtividade, setNivelAtividade] = useState('moderada'); // 'leve', 'moderada', 'intensa'

  const calculoAgua = useMemo(() => {
    const peso = Math.max(30, Number(pesoKg) || 60);
    // Fatores de hidratação: 35ml a 45ml por kg corporal
    let fatorMl = 35;
    if (nivelAtividade === 'moderada') fatorMl = 40;
    if (nivelAtividade === 'intensa') fatorMl = 45;

    const totalMl = peso * fatorMl;
    const totalLitros = (totalMl / 1000).toFixed(1);
    const totalCopos250 = Math.round(totalMl / 250);
    const totalGarrafas500 = Math.round(totalMl / 500);

    return {
      totalMl,
      totalLitros,
      totalCopos250,
      totalGarrafas500
    };
  }, [pesoKg, nivelAtividade]);

  // ================= CATEGORIAS DINÂMICAS DA LOJA =================
  const [categoriasLoja, setCategoriasLoja] = useState([
    { nome: 'Calcinha', slug: 'calcinha' },
    { nome: 'Body', slug: 'body' },
    { nome: 'Fitness', slug: 'fitness' },
    { nome: 'Conjunto', slug: 'conjunto' },
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
          setCategoriasLoja(records.map((r) => ({
            id: r.id,
            nome: r.nome,
            slug: r.slug
          })));
        }
      } catch (err) {
        console.warn('Usando categorias padrão da fábrica:', err);
      }
    };
    fetchCats();
  }, []);

  // Lista dos 21 Dias Estruturados em 3 Fases
  const cronograma21Dias = useMemo(() => [
    // FASE 1: DESINCHAR & ATIVAR (Dias 1 a 7)
    {
      fase: 'Fase 1: Desinchar & Ativar',
      corFase: 'from-[#0284c7] to-[#0ea5e9]',
      descricaoFase: 'Foco total em eliminação de líquidos retidos e ativação da circulação linfática.',
      dias: [
        { num: 1, titulo: 'Ativação Linfática & Despertar', tempo: '5 min', tarefa: '10 bombeamentos suaves nos gânglios da virilha + 5 min de deslizamento ascendente no abdômen.' },
        { num: 2, titulo: 'Respiração Diafragmática & Copo em Jejum', tempo: '6 min', tarefa: 'Copo de água morna com limão ao acordar + 10 repetições de vácuo abdominal leve.' },
        { num: 3, titulo: 'Drenagem dos Flancos Laterais', tempo: '7 min', tarefa: 'Movimento em pinça da cintura trazendo as toxinas laterais em direção ao umbigo e virilha.' },
        { num: 4, titulo: 'Hidratação Turbo & Liberação Abdominal', tempo: '6 min', tarefa: 'Cumprir a meta de água calculada + 5 min de massagem circular em sentido horário.' },
        { num: 5, titulo: 'Abertura das Linfonodos Claviculares', tempo: '7 min', tarefa: 'Massagem suave na região do colo e virilha para desobstruir os canais principais.' },
        { num: 6, titulo: 'Ritual Detox Matinal', tempo: '8 min', tarefa: 'Massagem com creme ou óleo vegetal com pressão leve/média por 8 minutos contínuos.' },
        { num: 7, titulo: 'Check-in da 1ª Semana (Menos Retenção)', tempo: '5 min', tarefa: 'Tire sua foto ou meça a cintura. Você sentirá o abdômen muito mais leve e desinchado!' }
      ]
    },
    // FASE 2: ESCULPIR & DELINEAR (Dias 8 a 14)
    {
      fase: 'Fase 2: Esculpir & Delinear',
      corFase: 'from-[#0369a1] to-[#38bdf8]',
      descricaoFase: 'Moldagem da curvatura da cintura e estímulo da fáscia do músculo transverso.',
      dias: [
        { num: 8, titulo: 'Técnica de Pinçamento Redutor', tempo: '8 min', tarefa: 'Pinçamento em zigue-zague na linha da cintura para oxigenar o tecido subcutâneo.' },
        { num: 9, titulo: 'Vácuo Abdominal Fortalecido', tempo: '7 min', tarefa: '3 séries de 15 segundos de vácuo abdominal em 4 apoios antes do café da manhã.' },
        { num: 10, titulo: 'Drenagem Profunda em Ampulheta', tempo: '8 min', tarefa: 'Deslizamento vigoroso das costas em direção ao centro, desenhando a curva da cintura.' },
        { num: 11, titulo: 'Controle de Sódio & Água Mineral', tempo: '6 min', tarefa: 'Evitar alimentos ultraprocessados + massagem ascendente focada na parte inferior do umbigo.' },
        { num: 12, titulo: 'Escultura da Linha Ilíaca', tempo: '8 min', tarefa: 'Deslizamento com os nós dos dedos nas laterais do quadril, drenando para a fossa ilíaca.' },
        { num: 13, titulo: 'Técnica da Toalha Aquecida', tempo: '9 min', tarefa: 'Aplicar toalha morna 2 minutos antes da massagem para vasodilatação e melhor absorção.' },
        { num: 14, titulo: 'Check-in da 2ª Semana (Curva Definida)', tempo: '5 min', tarefa: 'Segunda medição da cintura. A musculatura profunda começa a sustentar a cintura mais fina.' }
      ]
    },
    // FASE 3: BLINDAGEM & SUSTENTAÇÃO (Dias 15 a 21)
    {
      fase: 'Fase 3: Blindagem & Firmeza',
      corFase: 'from-[#0284c7] via-[#0284c7] to-[#f59e0b]',
      descricaoFase: 'Fixação dos resultados obtidos, sustentação postural e tônus contínuo.',
      dias: [
        { num: 15, titulo: 'Massagem de Alta Definição', tempo: '8 min', tarefa: 'Combinação dos 4 movimentos: bombeamento, pinçamento, leque e esvaziamento total.' },
        { num: 16, titulo: 'Alinhamento Postural & Cinta Modeladora', tempo: '7 min', tarefa: 'Exercício de postura consciente + uso de calcinha/cinta modeladora confortável após a rotina.' },
        { num: 17, titulo: 'Drenagem Pré-Sono', tempo: '6 min', tarefa: 'Massagem leve e relaxante 30 minutos antes de dormir para potencializar a regeneração noturna.' },
        { num: 18, titulo: 'Vácuo Abdominal Avançado', tempo: '8 min', tarefa: '4 séries de 20 segundos de vácuo diafragmático mantendo o umbigo sugado nas costas.' },
        { num: 19, titulo: 'Esvaziamento Ganglionar Completo', tempo: '7 min', tarefa: 'Massagem lenta e fluida por todo o abdômen drenando para os gânglios inguinais.' },
        { num: 20, titulo: 'Ritual de Firmeza & Hidratação', tempo: '8 min', tarefa: 'Aplicação de hidratante com massagem vigorosa circular para estimular o colágeno da pele.' },
        { num: 21, titulo: '🏆 Vitória do Desafio! Cintura Esculpida', tempo: '10 min', tarefa: 'Parabéns! Faça a medição final. Você conquistou um novo hábito e um contorno corporal incrível!' }
      ]
    }
  ], []);

  // Porcentagem de Progresso
  const progressoPercent = useMemo(() => {
    return Math.round((diasConcluidos.length / 21) * 100);
  }, [diasConcluidos]);

  // Função para compartilhar/salvar
  const handleSalvarNoCelular = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Método Cintura Esculpida • Avante Lingerie',
        text: 'Meu App VIP do Método Cintura Esculpida da Avante Lingerie',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link do App copiado! Salve nos favoritos do seu celular.');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 font-sans pb-24 selection:bg-[#0284c7] selection:text-white">
      
      {/* ================= HEADER DO APP: IDENTIDADE VIP AVANTE LINGERIE ================= */}
      <header className="sticky top-0 z-50 bg-[#070e22]/95 backdrop-blur-md border-b-2 border-[#0284c7]/40 px-4 py-3 shadow-[0_4px_25px_rgba(2,132,199,0.2)]">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          
          {/* Logo e Informações de Quem Deu o Presente */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0284c7] via-[#0ea5e9] to-[#0369a1] p-0.5 shadow-lg shadow-[#0284c7]/30 shrink-0">
                <div className="w-full h-full bg-[#040918] rounded-[14px] flex items-center justify-center text-[#38bdf8]">
                  <Activity className="w-6 h-6 animate-pulse" />
                </div>
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#030712] rounded-full"></span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-serif font-black tracking-widest text-[#38bdf8] text-xs sm:text-sm uppercase drop-shadow-sm">
                  AVANTE LINGERIE
                </span>
                <Badge className="bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] text-white font-extrabold text-[9px] py-0 px-1.5 uppercase shadow-sm">
                  Mimo da Fábrica
                </Badge>
              </div>
              <h1 className="font-extrabold text-sm sm:text-base text-white tracking-wide flex items-center gap-1">
                Método Cintura Esculpida
              </h1>
            </div>
          </div>

          {/* Botão de Salvar no Celular */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSalvarNoCelular}
            className="border-[#0284c7]/60 bg-[#0b1739] hover:bg-[#122456] text-[#38bdf8] hover:text-white rounded-2xl text-xs gap-1.5 h-9 font-bold shadow-md shadow-[#0284c7]/15 shrink-0"
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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0a1738] via-[#07112b] to-[#030712] border-2 border-[#0284c7]/60 p-5 sm:p-6 shadow-[0_0_35px_rgba(2,132,199,0.25)]">
          {/* Brilhos decorativos no fundo */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#0284c7]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#38bdf8]/15 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left relative z-10">
            {/* Imagem Bonita 3D Oficial (Sem linha dourada em volta) */}
            <div className="w-24 sm:w-28 shrink-0 relative group">
              <img 
                src="/assets/mimos/capa-cintura-esculpida-3d.png" 
                alt="Método Cintura Esculpida • Capa 3D" 
                className="w-full h-auto drop-shadow-[0_12px_25px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider text-black bg-gradient-to-r from-[#facc15] via-[#fde047] to-[#eab308] px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  RESULTADO REAL
                </span>
                <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#e11d48] to-[#be123c] border border-rose-400/40 px-2 py-0.5 rounded-full shadow-sm">
                  De R$ 97 por: GRÁTIS HOJE
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-white font-serif tracking-wide leading-tight">
                Seu Protocolo VIP de 21 Dias para Afinar a Cintura
              </h2>

              <p className="text-xs text-zinc-300 leading-relaxed max-w-lg">
                Presente exclusivo da <strong>Avante Lingerie</strong> para você. Drenagem linfática modeladora, checklist de hábitos diários e calculadora inteligente de água para desinchar o abdômen.
              </p>
            </div>
          </div>

          {/* Barra de Progresso do Desafio no Banner */}
          <div className="mt-5 pt-4 border-t border-[#0284c7]/30 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-[#facc15]" />
                Seu Progresso no Desafio:
              </span>
              <span className="text-xs font-black text-[#38bdf8]">
                {diasConcluidos.length} de 21 dias ({progressoPercent}%)
              </span>
            </div>
            
            <div className="w-full h-3 bg-[#040816] rounded-full overflow-hidden p-0.5 border border-[#0284c7]/40">
              <div 
                className="h-full bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] rounded-full transition-all duration-500 shadow-md"
                style={{ width: `${Math.max(5, progressoPercent)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* ================= ABAS DO APLICATIVO ================= */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
          <TabsList className="w-full grid grid-cols-3 bg-[#07112b] border-2 border-[#0284c7]/40 p-1.5 rounded-2xl h-auto shadow-md">
            <TabsTrigger 
              value="protocolo" 
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0284c7] data-[state=active]:via-[#0ea5e9] data-[state=active]:to-[#0284c7] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-zinc-400 transition-all uppercase tracking-wider"
            >
              <CalendarCheck className="w-4 h-4 shrink-0" />
              <span>21 Dias</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="hidratacao" 
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0284c7] data-[state=active]:via-[#0ea5e9] data-[state=active]:to-[#0284c7] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-zinc-400 transition-all uppercase tracking-wider"
            >
              <Droplets className="w-4 h-4 shrink-0" />
              <span>Água & Detox</span>
            </TabsTrigger>

            <TabsTrigger 
              value="guia" 
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0284c7] data-[state=active]:via-[#0ea5e9] data-[state=active]:to-[#0284c7] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-zinc-400 transition-all uppercase tracking-wider"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Guia PDF</span>
            </TabsTrigger>
          </TabsList>

          {/* ================= ABA 1: PROTOCOLO 21 DIAS INTERATIVO ================= */}
          <TabsContent value="protocolo" className="space-y-5 mt-0 focus-visible:outline-none">
            
            {/* Bloco de Pesquisa de Peças Modeladoras na Loja */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#091536] border border-[#0284c7]/35 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                  Potencialize os resultados com peças de alta compressão:
                </span>
                <span className="text-[10px] text-[#38bdf8] font-medium hidden sm:inline">
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
                      className="text-zinc-200 hover:text-[#38bdf8] font-semibold underline underline-offset-4 decoration-[#0284c7]/50 hover:decoration-[#38bdf8] transition-all cursor-pointer inline-flex items-center gap-1 group py-0.5"
                      title={`Ver todos os produtos de ${cat.nome}`}
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">{cat.nome}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-zinc-500 group-hover:text-[#38bdf8] shrink-0" />
                    </a>
                    {idx < categoriasLoja.length - 1 && (
                      <span className="text-zinc-600 select-none">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Fases do Desafio com Checklist Interativo */}
            <div className="space-y-4">
              {cronograma21Dias.map((faseItem, idxFase) => (
                <Card 
                  key={idxFase} 
                  className="bg-[#07112b] border-2 border-[#0284c7]/40 rounded-3xl p-4 sm:p-5 space-y-3.5 shadow-lg"
                >
                  <div className="border-b border-[#0284c7]/20 pb-2.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-black uppercase tracking-wider text-white bg-gradient-to-r ${faseItem.corFase} px-3 py-1 rounded-full shadow-sm`}>
                        {faseItem.fase}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {faseItem.dias.filter(d => diasConcluidos.includes(d.num)).length} de {faseItem.dias.length} feitos
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-300 mt-2 leading-relaxed">
                      {faseItem.descricaoFase}
                    </p>
                  </div>

                  {/* Dias da Fase */}
                  <div className="space-y-2">
                    {faseItem.dias.map((d) => {
                      const concluido = diasConcluidos.includes(d.num);
                      return (
                        <div
                          key={d.num}
                          onClick={() => toggleDia(d.num)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                            concluido
                              ? 'bg-[#0a2550]/80 border-emerald-500/60 shadow-md'
                              : 'bg-[#040a1d] border-zinc-800/90 hover:border-[#0284c7]/60'
                          }`}
                        >
                          {/* Checkbox redonda */}
                          <div className="pt-0.5 shrink-0">
                            {concluido ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950" />
                            ) : (
                              <Circle className="w-5 h-5 text-zinc-600 hover:text-[#38bdf8]" />
                            )}
                          </div>

                          <div className="space-y-0.5 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-xs font-bold ${concluido ? 'text-emerald-300 line-through' : 'text-white'}`}>
                                Dia {d.num} • {d.titulo}
                              </span>
                              <span className="text-[10px] text-zinc-400 font-mono shrink-0 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#38bdf8]" />
                                {d.tempo}
                              </span>
                            </div>
                            <p className={`text-[11px] leading-relaxed ${concluido ? 'text-zinc-400' : 'text-zinc-300'}`}>
                              {d.tarefa}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>

            {/* Botão de Reiniciar Progresso */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={resetProtocolo}
                className="text-[11px] text-zinc-400 hover:text-rose-400 transition-colors inline-flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Reiniciar meu progresso do desafio
              </button>
            </div>

          </TabsContent>

          {/* ================= ABA 2: CALCULADORA DE HIDRATAÇÃO & DESINCHAÇO ================= */}
          <TabsContent value="hidratacao" className="space-y-5 mt-0 focus-visible:outline-none">
            
            <Card className="bg-[#07112b] border-2 border-[#0284c7]/40 rounded-3xl p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.6)] space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-[#38bdf8] flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-[#38bdf8]" />
                    Qual é o seu peso corporal atual?
                  </label>
                  <span className="text-[11px] text-zinc-400 font-mono">Cálculo celular</span>
                </div>

                <div className="relative">
                  <Input 
                    type="number"
                    min="30"
                    max="200"
                    value={pesoKg}
                    onChange={(e) => setPesoKg(e.target.value)}
                    className="pl-4 pr-12 bg-[#030712] border-2 border-[#0284c7]/50 text-white font-black text-2xl h-14 rounded-2xl focus-visible:ring-[#38bdf8] focus-visible:border-[#38bdf8] shadow-inner"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-[#38bdf8]">kg</span>
                </div>
              </div>

              {/* Nível de Atividade Física */}
              <div className="space-y-2 pt-2 border-t border-[#0284c7]/30">
                <label className="text-xs font-black uppercase tracking-wider text-[#38bdf8] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#facc15]" />
                  Seu Nível de Movimento no Dia a Dia:
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'leve', label: 'Leve', desc: 'Trabalho sentada (35ml/kg)' },
                    { id: 'moderada', label: 'Moderada', desc: 'Caminhada diária (40ml/kg)' },
                    { id: 'intensa', label: 'Intensa', desc: 'Treino ou academia (45ml/kg)' }
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setNivelAtividade(lvl.id)}
                      className={`p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                        nivelAtividade === lvl.id
                          ? 'bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white font-black border-[#38bdf8] shadow-lg shadow-[#0284c7]/30 scale-102'
                          : 'bg-[#030712] border-zinc-800 text-zinc-300 hover:border-[#0284c7]/50'
                      }`}
                    >
                      <span className="text-xs font-black">{lvl.label}</span>
                      <span className={`text-[9px] text-center mt-0.5 ${nivelAtividade === lvl.id ? 'text-white/90 font-medium' : 'text-zinc-500'}`}>
                        {lvl.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </Card>

            {/* Painel de Resultados da Hidratação */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e214d] via-[#081533] to-[#030712] border-2 border-[#38bdf8] p-5 sm:p-6 shadow-[0_0_40px_rgba(2,132,199,0.3)] space-y-5">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#0284c7] px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 fill-current" />
                  SUA META DIÁRIA PARA DESINCHAR
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  Anti-Retenção
                </span>
              </div>

              {/* Cards de Volume em Litros e Copos */}
              <div className="grid grid-cols-2 gap-3.5">
                
                <div className="bg-gradient-to-b from-[#0a1738] to-[#040a1d] border-2 border-[#0284c7]/60 rounded-2xl p-4 text-center space-y-1 shadow-lg">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#38bdf8] block">
                    Volume em Litros
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {calculoAgua.totalLitros} L
                  </div>
                  <span className="text-[10px] text-zinc-300 font-bold block pt-0.5">
                    {calculoAgua.totalMl} ml por dia
                  </span>
                </div>

                <div className="bg-gradient-to-b from-[#0a1738] to-[#040a1d] border-2 border-emerald-500/60 rounded-2xl p-4 text-center space-y-1 shadow-lg">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
                    Equivalente em Copos
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {calculoAgua.totalCopos250}
                  </div>
                  <span className="text-[10px] text-emerald-300 font-bold block pt-0.5">
                    copos de 250ml
                  </span>
                </div>

              </div>

              {/* Cronograma Recomendado de Horários */}
              <div className="bg-[#050c20] border border-[#0284c7]/30 rounded-2xl p-4 space-y-2.5">
                <span className="text-xs font-black text-[#38bdf8] uppercase tracking-wide flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Cronograma Inteligente de Horários para Beber:
                </span>
                
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#091536] text-zinc-200">
                    <span className="font-bold">☀️ 07:00 (Ao acordar)</span>
                    <span className="text-[#38bdf8] font-bold">2 copos (500ml) com limão</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#091536] text-zinc-200">
                    <span className="font-bold">🌤️ 10:00 (Meio da manhã)</span>
                    <span className="text-[#38bdf8] font-bold">2 copos (500ml)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#091536] text-zinc-200">
                    <span className="font-bold">🍲 12:00 (30 min antes do almoço)</span>
                    <span className="text-[#38bdf8] font-bold">1 copo (250ml)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#091536] text-zinc-200">
                    <span className="font-bold">☕ 15:30 (Tarde)</span>
                    <span className="text-[#38bdf8] font-bold">2 copos (500ml)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#091536] text-zinc-200">
                    <span className="font-bold">🌙 19:30 (Noite)</span>
                    <span className="text-[#38bdf8] font-bold">1 a 2 copos (evitar perto de dormir)</span>
                  </div>
                </div>
              </div>

              {/* Dica da Fábrica sobre Retenção */}
              <div className="bg-[#081533] border-2 border-[#0284c7]/40 rounded-2xl p-4 flex items-start gap-3 shadow-md">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <span className="font-black text-emerald-400 text-xs uppercase block tracking-wide">
                    O Segredo do Desinchaço:
                  </span>
                  <p className="text-zinc-200 text-xs leading-relaxed">
                    Quando você bebe pouca água, o corpo entra em estado de alerta e <strong>retém líquidos</strong> na região abdominal. Ao bater sua meta diária calculada acima, o organismo entende que não há escassez e elimina todo o inchaço retido nas primeiras 48 horas!
                  </p>
                </div>
              </div>

            </div>

          </TabsContent>

          {/* ================= ABA 3: GUIA OFICIAL DE MASSAGEM & PDF ================= */}
          <TabsContent value="guia" className="space-y-5 mt-0 focus-visible:outline-none">
            
            {/* Bloco de Download / Impressão Formatado */}
            <Card className="bg-[#07112b] border-2 border-[#0284c7]/50 rounded-3xl p-5 sm:p-6 text-center space-y-4 shadow-xl">
              
              {/* Capa 3D Oficial do E-book (Sem linha dourada em volta) */}
              <div className="w-36 sm:w-44 mx-auto">
                <img 
                  src="/assets/mimos/capa-cintura-esculpida-3d.png" 
                  alt="Capa Oficial do E-book Método Cintura Esculpida" 
                  className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-[#38bdf8] tracking-wider">
                  Material Oficial Avante Lingerie
                </span>
                <h3 className="text-lg font-black text-white font-serif">
                  Manual de Automassagem Redutora & Drenagem
                </h3>
                <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Abaixo você confere os 4 movimentos oficiais da técnica para praticar no seu dia a dia, copiar o resumo ou imprimir em PDF no seu celular.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 justify-center max-w-md mx-auto pt-1">
                <Button 
                  onClick={() => {
                    toast.success('Abrindo janela de impressão/PDF!');
                    window.print();
                  }}
                  className="flex-1 bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#0369a1] hover:brightness-110 text-white font-black py-5 rounded-2xl text-xs gap-2 shadow-lg shadow-[#0284c7]/25"
                >
                  <Printer className="w-4 h-4" />
                  Salvar / Imprimir em PDF
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    const text = `MÉTODO CINTURA ESCULPIDA • AVANTE LINGERIE\n\n1. OS 4 MOVIMENTOS DA DRENAGEM:\n- Movimento 1: Bombeamento dos gânglios da virilha (10x suave)\n- Movimento 2: Deslizamento em pinça nas laterais da cintura (cintura até o umbigo)\n- Movimento 3: Vácuo abdominal diafragmático (segurar 15 segundos em jejum)\n- Movimento 4: Esvaziamento total em direção aos gânglios inguinais\n\n2. REGRAS DE OURO:\n- Use óleo vegetal ou creme para as mãos deslizarem sem atrito\n- Nunca coloque força excessiva: a linfa é superficial, pressão suave é mais eficaz\n- Beba 500ml de água logo após a massagem para acelerar a eliminação de toxinas.`;
                    navigator.clipboard.writeText(text);
                    toast.success('Resumo dos Movimentos copiado para sua área de transferência!');
                  }}
                  className="border-[#0284c7]/60 bg-[#091536] text-[#38bdf8] hover:bg-[#112459] rounded-2xl text-xs font-bold py-5 gap-1.5"
                >
                  <Copy className="w-4 h-4" />
                  Copiar Resumo
                </Button>
              </div>
            </Card>

            {/* Conteúdo Completo dos 4 Movimentos Ilustrados */}
            <div className="bg-[#07112b] border border-[#0284c7]/40 rounded-3xl p-5 sm:p-6 space-y-6 text-zinc-200">
              
              <div className="border-b border-zinc-800 pb-4 text-center sm:text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#38bdf8]">
                  Capítulo Prático • A Técnica dos 4 Movimentos
                </span>
                <h4 className="text-base sm:text-lg font-black text-white mt-1">
                  Como Executar a Drenagem Modeladora em Casa (7 minutos)
                </h4>
              </div>

              {/* Movimento 1 */}
              <div className="space-y-2">
                <h5 className="font-bold text-xs text-[#38bdf8] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  1. O Bombeamento Linfático (Desbloqueio)
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Posicione as duas mãos abertas sobre as dobras da virilha (gânglios inguinais). Faça 10 compressões suaves e ritmadas, como se estivesse bombeando uma esponja macia. Isso abre os canais por onde o excesso de líquido acumulado no abdômen será drenado.
                </p>
              </div>

              {/* Movimento 2 */}
              <div className="space-y-2">
                <h5 className="font-bold text-xs text-[#38bdf8] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  2. O Deslizamento em Ampulheta (Esculpir a Cintura)
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Coloque as mãos nas costas, acima dos flancos. Com pressão moderada e firme, puxe a pele e os tecidos das costas em direção à frente do umbigo, desenhando a curva natural da cintura. Repita 15 vezes em cada lado.
                </p>
              </div>

              {/* Movimento 3 */}
              <div className="space-y-2">
                <h5 className="font-bold text-xs text-[#38bdf8] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  3. O Vácuo Abdominal (Ativação do Músculo Transverso)
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Solte todo o ar dos pulmões pela boca. Sem puxar o ar de volta, chupe o umbigo para dentro e para cima, como se quisesse encostar o estômago nas costelas. Segure por 15 a 20 segundos e respire normalmente. Repita 3 vezes. Este movimento é a cinta natural do seu corpo.
                </p>
              </div>

              {/* Movimento 4 */}
              <div className="space-y-2">
                <h5 className="font-bold text-xs text-[#38bdf8] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  4. O Esvaziamento Final (Drenagem para a Virilha)
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Com as palmas das mãos espalmadas, faça deslizamentos de cima para baixo (do estômago até a virilha), conduzindo todo o líquido mobilizado para os gânglios desbloqueados no passo 1. Finalize com 5 bombeamentos suaves na virilha.
                </p>
              </div>

              {/* Dica de Combinação com Peças da Loja */}
              <div className="p-4 rounded-2xl bg-[#091536] border-2 border-[#0284c7]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black text-white block">Quer Manter a Cintura Modelada o Dia Todo?</span>
                  <span className="text-[11px] text-zinc-400">Use calcinhas modeladoras de alta compressão da Avante Lingerie</span>
                </div>
                <a
                  href="/categoria/calcinha"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#0284c7] text-white font-black text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-md shrink-0 hover:brightness-110 transition-all"
                >
                  <span>Ver Modeladores na Loja</span>
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
