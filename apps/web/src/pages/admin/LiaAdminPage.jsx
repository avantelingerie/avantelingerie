import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { ScrollArea } from '@/components/ui/scroll-area.jsx';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';
import { 
  MessageSquare, Brain, Search, CheckCircle2, User, Sparkles, 
  Hand, Plus, Trash2, Calendar, Smartphone, PowerOff, 
  ExternalLink, Laptop, RefreshCw, Send, ArrowLeft,
  CheckCheck, MessageCircle, ShieldAlert
} from 'lucide-react';

// Helper inteligente para formatar título, telefone e canal da conversa
function formatSessionDisplay(session_id, canal) {
  if (!session_id) {
    return {
      title: 'Cliente Anônimo',
      subtitle: 'Sem identificador',
      isPhone: false,
      rawPhone: '',
      formattedPhone: '',
      badgeType: 'site'
    };
  }

  if (canal === 'whatsapp') {
    // Número direto ou padrão @c.us
    if (session_id.includes('@c.us') || /^\d{10,15}$/.test(session_id)) {
      const cleanDigits = session_id.replace(/\D/g, '');
      let formatted = cleanDigits;
      if (cleanDigits.startsWith('55') && cleanDigits.length >= 12) {
        const ddd = cleanDigits.substring(2, 4);
        const num = cleanDigits.substring(4);
        if (num.length === 9) {
          formatted = `+55 (${ddd}) ${num.substring(0, 5)}-${num.substring(5)}`;
        } else if (num.length === 8) {
          formatted = `+55 (${ddd}) ${num.substring(0, 4)}-${num.substring(4)}`;
        }
      }
      return {
        title: formatted,
        subtitle: 'WhatsApp Oficial da Fábrica',
        isPhone: true,
        rawPhone: cleanDigits,
        formattedPhone: formatted,
        badgeType: 'whatsapp'
      };
    }

    // Linked Identity do WhatsApp (@lid)
    if (session_id.includes('@lid')) {
      const lidClean = session_id.replace('@lid', '');
      const shortId = lidClean.substring(0, 6);
      return {
        title: `WhatsApp • Contato #${shortId}`,
        subtitle: `ID Seguro: ${lidClean.substring(0, 10)}...`,
        isPhone: false,
        rawPhone: '',
        formattedPhone: '',
        badgeType: 'whatsapp'
      };
    }

    return {
      title: session_id.replace('@c.us', ''),
      subtitle: 'WhatsApp',
      isPhone: false,
      rawPhone: '',
      formattedPhone: '',
      badgeType: 'whatsapp'
    };
  }

  // Canal Site / Web Chat
  const shortCode = session_id.length > 6 ? session_id.substring(0, 6) : session_id;
  return {
    title: `Visitante Loja #${shortCode.toUpperCase()}`,
    subtitle: 'Chat da Loja Virtual',
    isPhone: false,
    rawPhone: '',
    formattedPhone: '',
    badgeType: 'site'
  };
}

// Helper para exibição humanizada de data e hora
function formatMessageTime(dateInput, fallbackTimestamp) {
  let d = null;
  if (dateInput) {
    d = new Date(dateInput);
  } else if (fallbackTimestamp) {
    d = new Date(fallbackTimestamp);
  }

  if (!d || isNaN(d.getTime())) {
    return 'Recente';
  }

  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isToday) {
    return `Hoje às ${timeStr}`;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) {
    return `Ontem às ${timeStr}`;
  }

  return `${d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} às ${timeStr}`;
}

export default function LiaAdminPage() {
  useAdminAuth();
  
  const [conversas, setConversas] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState('all'); // 'all', 'whatsapp', 'site', 'paused', 'sales'
  const [isLoadingConversas, setIsLoadingConversas] = useState(true);
  const [showQrCode, setShowQrCode] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Mensagem manual do operador humano no CRM
  const [respostaHumana, setRespostaHumana] = useState('');
  const [isEnviandoResposta, setIsEnviandoResposta] = useState(false);

  const [knowledge, setKnowledge] = useState([]);
  const [isKnowledgeLoading, setIsKnowledgeLoading] = useState(true);

  const [novaRegra, setNovaRegra] = useState({ titulo: '', conteudo: '', data_expiracao: '' });
  const [qrTimestamp, setQrTimestamp] = useState(Date.now());
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [qrError, setQrError] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setQrTimestamp(Date.now());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchConversas = async () => {
    try {
      setIsLoadingConversas(true);
      // Busca otimizada e paginada: últimas 50 conversas mais ativas/recentes
      let records = [];
      try {
        const paged = await pb.collection('lia_conversas').getList(1, 50, {
          sort: '-updated'
        });
        records = paged.items;
      } catch (errSort) {
        // Fallback caso sort no SQLite não tenha índice ou dê erro
        const all = await pb.collection('lia_conversas').getFullList();
        records = all.slice(-50).reverse();
      }
      setConversas(records);
      if (records.length > 0 && !selectedSessionId) {
        setSelectedSessionId(records[0].session_id);
      }
    } catch (error) {
      console.error('Erro ao buscar conversas:', error);
      toast.error('Não foi possível carregar as conversas.');
    } finally {
      setIsLoadingConversas(false);
    }
  };

  const fetchKnowledge = async () => {
    try {
      setIsKnowledgeLoading(true);
      const records = await pb.collection('lia_knowledge').getFullList();
      records.sort((a, b) => new Date(b.created || 0) - new Date(a.created || 0));
      setKnowledge(records);
    } catch (error) {
      console.error('Erro ao buscar treinamento:', error);
    } finally {
      setIsKnowledgeLoading(false);
    }
  };

  useEffect(() => {
    fetchConversas();
    fetchKnowledge();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedSessionId, conversas]);

  const assumirConversa = async (conversaId) => {
    try {
      await pb.collection('lia_conversas').update(conversaId, {
        assumida_por_humano: true
      });
      setConversas(prev => prev.map(c => c.id === conversaId ? { ...c, assumida_por_humano: true } : c));
      toast.success('Você assumiu esta conversa. A Lia foi pausada para esta cliente.');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao pausar a Lia.');
    }
  };

  const retomarConversa = async (conversaId) => {
    try {
      await pb.collection('lia_conversas').update(conversaId, {
        assumida_por_humano: false
      });
      setConversas(prev => prev.map(c => c.id === conversaId ? { ...c, assumida_por_humano: false } : c));
      toast.success('Você devolveu o controle. A Lia voltará a responder essa cliente!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao despausar a Lia.');
    }
  };

  const handleEnviarMensagemHumana = async (e) => {
    if (e) e.preventDefault();
    if (!respostaHumana.trim() || !selectedConversa) return;
    
    const texto = respostaHumana.trim();
    setIsEnviandoResposta(true);
    
    const nowIso = new Date().toISOString();
    const novaMsg = {
      role: 'assistant',
      content: texto,
      sender: 'humano',
      timestamp: nowIso
    };

    const historicoAtualizado = [...(selectedConversa.mensagens || []), novaMsg];

    try {
      await pb.collection('lia_conversas').update(selectedConversa.id, {
        mensagens: historicoAtualizado,
        assumida_por_humano: true
      });

      setConversas(prev => prev.map(c => c.id === selectedConversa.id ? {
        ...c,
        mensagens: historicoAtualizado,
        assumida_por_humano: true,
        updated: nowIso
      } : c));

      setRespostaHumana('');
      toast.success('Mensagem enviada com sucesso no atendimento!');
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      toast.error('Erro ao registrar resposta.');
    } finally {
      setIsEnviandoResposta(false);
    }
  };

  const handleSalvarRegra = async () => {
    if (!novaRegra.titulo || !novaRegra.conteudo) {
      toast.error('Preencha o título e o conteúdo da regra.');
      return;
    }
    
    try {
      const record = await pb.collection('lia_knowledge').create({
        titulo: novaRegra.titulo,
        conteudo: novaRegra.conteudo,
        ativo: true,
        data_expiracao: novaRegra.data_expiracao ? new Date(novaRegra.data_expiracao).toISOString() : null
      });
      setKnowledge([record, ...knowledge]);
      setNovaRegra({ titulo: '', conteudo: '', data_expiracao: '' });
      toast.success('Nova instrução adicionada ao cérebro da Lia!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao salvar regra.');
    }
  };

  const toggleRegraAtiva = async (id, statusAtual) => {
    try {
      const record = await pb.collection('lia_knowledge').update(id, { ativo: !statusAtual });
      setKnowledge(prev => prev.map(k => k.id === id ? record : k));
    } catch (error) {
      console.error(error);
      toast.error('Erro ao alterar status da regra.');
    }
  };

  const deleteRegra = async (id, titulo) => {
    if (!window.confirm(`Atenção: Tem certeza que deseja apagar a instrução "${titulo || 'selecionada'}" do cérebro da Lia? Essa exclusão é definitiva.`)) return;
    try {
      await pb.collection('lia_knowledge').delete(id);
      setKnowledge(prev => prev.filter(k => k.id !== id));
      toast.success('Instrução removida.');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao remover regra.');
    }
  };

  const handleDisconnect = async () => {
    const confirmacao = window.prompt(
      "⚠️ ALERTA DE SEGURANÇA (TRÁFEGO PAGO ATIVO):\n\nDesconectar o WhatsApp fará o bot da Lia ficar temporariamente offline, o que pode pausar o atendimento automático das revendedoras vindas dos anúncios da Meta Ads.\n\nPara confirmar a reinicialização forçada do robô, digite exatamente DESCONECTAR:"
    );
    if (confirmacao !== "DESCONECTAR") {
      toast.info("Ação cancelada com segurança. O WhatsApp da Lia continua ativo.");
      return;
    }
    
    setIsDisconnecting(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'https://avantelingerie.com.br/hcgi/api';
      const response = await fetch(`${baseUrl}/whatsapp/disconnect`, {
        method: 'POST'
      });
      if (response.ok) {
        toast.success('Lia está se desconectando! Aguarde um instante para o novo QR Code.');
        setTimeout(() => setQrTimestamp(Date.now()), 4000);
      } else {
        toast.error('Erro ao enviar o comando para o bot.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro de conexão ao tentar desconectar.');
    } finally {
      setIsDisconnecting(false);
    }
  };

  // Contadores para o Mini-Dashboard
  const metrics = useMemo(() => {
    const total = conversas.length;
    const whatsapp = conversas.filter(c => c.canal === 'whatsapp').length;
    const site = conversas.filter(c => c.canal !== 'whatsapp').length;
    const paused = conversas.filter(c => c.assumida_por_humano).length;
    const sales = conversas.filter(c => c.converteu).length;
    return { total, whatsapp, site, paused, sales };
  }, [conversas]);

  // Filtros combinados (Canal + Busca)
  const filteredConversas = useMemo(() => {
    return conversas.filter(c => {
      if (channelFilter === 'whatsapp' && c.canal !== 'whatsapp') return false;
      if (channelFilter === 'site' && c.canal === 'whatsapp') return false;
      if (channelFilter === 'paused' && !c.assumida_por_humano) return false;
      if (channelFilter === 'sales' && !c.converteu) return false;

      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      const matchSession = c.session_id?.toLowerCase().includes(term);
      const matchMessage = c.mensagens?.some(m => m.content?.toLowerCase().includes(term));
      return matchSession || matchMessage;
    });
  }, [conversas, channelFilter, searchTerm]);

  const selectedConversa = conversas.find(c => c.session_id === selectedSessionId);
  const selectedDisplay = selectedConversa ? formatSessionDisplay(selectedConversa.session_id, selectedConversa.canal) : null;

  return (
    <div className="w-full space-y-6 text-zinc-100 font-sans pb-12">
      
      {/* ================= BARRA SUPERIOR EXECUTIVA (HEADER CRM) ================= */}
      <div className="bg-zinc-900/90 border border-zinc-800/80 p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c59b5f]/30 to-[#c59b5f]/5 border border-[#c59b5f]/40 flex items-center justify-center text-[#c59b5f] shadow-sm shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-xl font-serif font-bold text-white tracking-wide">
                Central de Atendimento & CRM Lia
              </h1>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                (22) 98122-5010
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Gestão omnicanal em tempo real de revendedoras e clientes do atacado e varejo.
            </p>
          </div>
        </div>

        {/* KPIs na Barra Superior */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-zinc-800/90 text-zinc-300 border border-zinc-700/50">
              Total: <strong className="text-white ml-1">{metrics.total}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
              WhatsApp: <strong className="text-emerald-200 ml-1">{metrics.whatsapp}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#c59b5f]/15 border border-[#c59b5f]/30 text-[#c59b5f]">
              Loja: <strong className="text-white ml-1">{metrics.site}</strong>
            </span>
            {metrics.paused > 0 && (
              <span className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-800/40 text-amber-300 animate-pulse">
                Humano: <strong className="text-amber-200 ml-1">{metrics.paused}</strong>
              </span>
            )}
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchConversas}
            disabled={isLoadingConversas}
            className="border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-xl gap-1.5 text-xs h-8.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingConversas ? 'animate-spin text-[#c59b5f]' : ''}`} />
            <span>Atualizar</span>
          </Button>
        </div>
      </div>

      {/* ================= ABAS PRINCIPAIS ================= */}
      <Tabs defaultValue="chats" className="w-full space-y-4">
        
        {/* Barra de Navegação das Abas */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
          <TabsList className="bg-zinc-900 border border-zinc-800 p-1 rounded-xl h-auto">
            <TabsTrigger 
              value="chats" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold data-[state=active]:bg-[#c59b5f] data-[state=active]:text-zinc-950 data-[state=active]:font-bold data-[state=inactive]:text-zinc-400 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Atendimentos & CRM</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-zinc-800 data-[state=active]:bg-zinc-950/25 data-[state=active]:text-zinc-950 text-zinc-300">
                {metrics.total}
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="treinamento" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium data-[state=active]:bg-[#c59b5f] data-[state=active]:text-zinc-950 data-[state=active]:font-bold data-[state=inactive]:text-zinc-400 transition-all"
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Treinamento & Regras</span>
            </TabsTrigger>
            <TabsTrigger 
              value="whatsapp" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium data-[state=active]:bg-[#c59b5f] data-[state=active]:text-zinc-950 data-[state=active]:font-bold data-[state=inactive]:text-zinc-400 transition-all"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Conexão WhatsApp</span>
            </TabsTrigger>
          </TabsList>

          <span className="text-xs text-zinc-500 hidden md:block">
            Meta Ads & Loja Virtual • Integrado com Inteligência Lia
          </span>
        </div>

        {/* ================= ABA 1: CHATS AO VIVO & CRM ================= */}
        <TabsContent value="chats" className="mt-0 focus-visible:outline-none">
          {/* Card Container com Altura Estável e Bordas Elegantes */}
          <div className="w-full h-[calc(100vh-270px)] min-h-[640px] max-h-[880px] bg-zinc-900/95 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            
            {/* PAINEL ESQUERDO: LISTA DE CONTATOS (CRM PIPELINE) */}
            <div className={`w-full lg:w-[380px] xl:w-[420px] bg-zinc-900/90 border-r border-zinc-800/80 flex flex-col shrink-0 ${
              showMobileChat ? 'hidden lg:flex' : 'flex'
            }`}>
              
              {/* Barra de Pesquisa */}
              <div className="p-3 border-b border-zinc-800/80 space-y-2.5 bg-zinc-900/60 shrink-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                  <Input 
                    placeholder="Buscar por telefone, nome ou mensagem..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-7 bg-zinc-950 border-zinc-800 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-[#c59b5f] rounded-xl text-xs h-8.5" 
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Pílulas de Filtros Rápidos (Estilo WhatsApp Business) */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-[11px]">
                  <button
                    onClick={() => setChannelFilter('all')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      channelFilter === 'all' 
                        ? 'bg-[#c59b5f] text-zinc-950 shadow-sm' 
                        : 'bg-zinc-800/90 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    Todos ({metrics.total})
                  </button>

                  <button
                    onClick={() => setChannelFilter('whatsapp')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
                      channelFilter === 'whatsapp' 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-zinc-800/90 text-zinc-400 hover:bg-zinc-800 hover:text-emerald-400'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" /> WhatsApp ({metrics.whatsapp})
                  </button>

                  <button
                    onClick={() => setChannelFilter('site')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
                      channelFilter === 'site' 
                        ? 'bg-zinc-200 text-zinc-950 shadow-sm' 
                        : 'bg-zinc-800/90 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    <Laptop className="w-3 h-3" /> Loja ({metrics.site})
                  </button>

                  <button
                    onClick={() => setChannelFilter('paused')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
                      channelFilter === 'paused' 
                        ? 'bg-amber-500 text-zinc-950 shadow-sm' 
                        : 'bg-zinc-800/90 text-zinc-400 hover:bg-zinc-800 hover:text-amber-400'
                    }`}
                  >
                    <User className="w-3 h-3" /> Humano ({metrics.paused})
                  </button>
                </div>
              </div>

              {/* Lista Scrollável de Clientes */}
              <ScrollArea className="flex-1 p-2">
                {isLoadingConversas ? (
                  <div className="py-16 text-center text-zinc-500 text-xs flex flex-col items-center gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin text-[#c59b5f]" />
                    Carregando atendimentos...
                  </div>
                ) : filteredConversas.length === 0 ? (
                  <div className="py-16 text-center text-zinc-500 text-xs px-4">
                    Nenhuma conversa encontrada para o filtro selecionado.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredConversas.map(conversa => {
                      const msgCount = conversa.mensagens?.length || 0;
                      const ultimaMsgObj = conversa.mensagens?.[msgCount - 1];
                      const ultimaMsg = ultimaMsgObj?.content || 'Iniciou conversa';
                      const isSelected = selectedSessionId === conversa.session_id;
                      const display = formatSessionDisplay(conversa.session_id, conversa.canal);
                      const timeDisplay = formatMessageTime(conversa.updated, conversa.local_updated);

                      return (
                        <div 
                          key={conversa.id} 
                          onClick={() => {
                            setSelectedSessionId(conversa.session_id);
                            setShowMobileChat(true);
                          }}
                          className={`p-3 cursor-pointer transition-all duration-150 rounded-xl border flex gap-3 items-start relative ${
                            isSelected 
                              ? 'bg-zinc-800/90 border-[#c59b5f] shadow-md shadow-[#c59b5f]/5' 
                              : 'bg-zinc-950/40 border-zinc-800/50 hover:bg-zinc-850 hover:border-zinc-700/80'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#c59b5f] rounded-r"></div>
                          )}

                          {/* Avatar */}
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border shadow-xs ${
                            conversa.canal === 'whatsapp'
                              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400'
                              : 'bg-[#c59b5f]/15 border-[#c59b5f]/40 text-[#c59b5f]'
                          }`}>
                            {conversa.canal === 'whatsapp' ? (
                              <Smartphone className="w-4 h-4" />
                            ) : (
                              <Laptop className="w-4 h-4" />
                            )}
                          </div>

                          {/* Dados do Contato */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="font-semibold text-xs text-white truncate max-w-[180px]" title={display.title}>
                                {display.title}
                              </span>
                              <span className={`text-[10px] shrink-0 font-medium ${isSelected ? 'text-[#c59b5f]' : 'text-zinc-500'}`}>
                                {timeDisplay}
                              </span>
                            </div>

                            {/* Prévia da Mensagem */}
                            <p className="text-[11px] text-zinc-400 truncate leading-relaxed">
                              {ultimaMsgObj?.role === 'user' ? (
                                <span className="text-zinc-300">👤 </span>
                              ) : (
                                <span className="text-[#c59b5f]">✨ Lia: </span>
                              )}
                              {ultimaMsg}
                            </p>

                            {/* Tags de Status */}
                            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                              {conversa.canal === 'whatsapp' ? (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-950/90 border border-emerald-800/40 px-1.5 py-0.5 rounded-md">
                                  WhatsApp
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#c59b5f] bg-[#c59b5f]/10 border border-[#c59b5f]/30 px-1.5 py-0.5 rounded-md">
                                  Loja Virtual
                                </span>
                              )}

                              {conversa.converteu && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-300 bg-emerald-900/70 border border-emerald-700/60 px-1.5 py-0.5 rounded-md">
                                  ✓ Compra Fechada
                                </span>
                              )}

                              {conversa.assumida_por_humano ? (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-300 bg-amber-950/90 border border-amber-800/50 px-1.5 py-0.5 rounded-md">
                                  👤 Humano
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[9px] font-medium text-zinc-400 bg-zinc-800/70 px-1.5 py-0.5 rounded-md">
                                  🤖 Lia Ativa
                                </span>
                              )}

                              <span className="text-[9px] text-zinc-500 ml-auto font-mono">
                                {msgCount} msgs
                              </span>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* PAINEL DIREITO: CONVERSA COMPLETA & WORKSPACE DE ATENDIMENTO */}
            <div className={`flex-1 flex flex-col bg-zinc-950 overflow-hidden relative ${
              !showMobileChat ? 'hidden lg:flex' : 'flex'
            }`}>
              {selectedConversa && selectedDisplay ? (
                <>
                  {/* Header do Chat Aberto */}
                  <div className="h-16 px-4 sm:px-6 border-b border-zinc-800/80 bg-zinc-900/90 flex items-center justify-between gap-3 shrink-0">
                    <div className="flex items-center gap-3">
                      {/* Botão Voltar (Mobile) */}
                      <button 
                        onClick={() => setShowMobileChat(false)}
                        className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg -ml-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>

                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                        selectedConversa.canal === 'whatsapp'
                          ? 'bg-emerald-950 border-emerald-500/50 text-emerald-400'
                          : 'bg-[#c59b5f]/20 border-[#c59b5f]/50 text-[#c59b5f]'
                      }`}>
                        {selectedConversa.canal === 'whatsapp' ? (
                          <Smartphone className="w-4 h-4" />
                        ) : (
                          <Laptop className="w-4 h-4" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="font-bold text-sm sm:text-base text-white">
                            {selectedDisplay.title}
                          </h2>
                          {selectedConversa.canal === 'whatsapp' ? (
                            <Badge className="bg-emerald-950/80 border-emerald-600/50 text-emerald-400 text-[10px] py-0 px-2">
                              WhatsApp
                            </Badge>
                          ) : (
                            <Badge className="bg-[#c59b5f]/15 border-[#c59b5f]/40 text-[#c59b5f] text-[10px] py-0 px-2">
                              Loja Virtual
                            </Badge>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 flex items-center gap-2">
                          <span>{selectedDisplay.subtitle}</span>
                          <span>•</span>
                          <span>{selectedConversa.mensagens?.length || 0} mensagens registradas</span>
                        </p>
                      </div>
                    </div>

                    {/* Ações do Atendimento */}
                    <div className="flex items-center gap-2">
                      {/* Botão de Abrir no WhatsApp Web */}
                      {selectedDisplay.isPhone && selectedDisplay.rawPhone && (
                        <a
                          href={`https://web.whatsapp.com/send?phone=${selectedDisplay.rawPhone}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm"
                          title="Abrir diretamente conversa no WhatsApp Web"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Abrir no Zap</span>
                        </a>
                      )}

                      {/* Botão Pausar / Assumir */}
                      {!selectedConversa.assumida_por_humano ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => assumirConversa(selectedConversa.id)} 
                          className="border-red-900/60 bg-red-950/30 text-red-300 hover:bg-red-900/50 hover:text-white rounded-xl text-xs font-semibold h-8"
                        >
                          <Hand className="w-3.5 h-3.5 mr-1" />
                          <span className="hidden sm:inline">Pausar Lia (Assumir)</span>
                          <span className="sm:hidden">Pausar</span>
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => retomarConversa(selectedConversa.id)} 
                          className="bg-[#c59b5f] hover:bg-[#b58825] text-zinc-950 font-bold rounded-xl text-xs shadow-md shadow-[#c59b5f]/20 h-8"
                        >
                          <Brain className="w-3.5 h-3.5 mr-1" />
                          <span className="hidden sm:inline">Devolver para Lia</span>
                          <span className="sm:hidden">Devolver</span>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Banner de Estado (Humano vs Lia) */}
                  {selectedConversa.assumida_por_humano ? (
                    <div className="bg-amber-950/70 border-b border-amber-800/50 px-4 py-2 flex items-center justify-between text-xs text-amber-200 shrink-0">
                      <span className="flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                        <span><strong>Atendimento Humano em Andamento:</strong> A Lia não responderá novas mensagens dessa cliente.</span>
                      </span>
                      <span className="text-[11px] text-amber-300/80 hidden md:block">
                        Você pode responder pelo celular ou pelo formulário abaixo
                      </span>
                    </div>
                  ) : (
                    <div className="bg-zinc-900/40 border-b border-zinc-800/70 px-4 py-1.5 flex items-center justify-between text-[11px] text-zinc-400 shrink-0">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#c59b5f]" />
                        <span><strong>Lia 100% Ativa:</strong> Atendendo automaticamente com base no catálogo de atacado e regras da fábrica.</span>
                      </span>
                      <span className="text-[10px] text-zinc-500 hidden sm:block">
                        ID: {selectedConversa.session_id}
                      </span>
                    </div>
                  )}

                  {/* Canvas de Mensagens (Estilo WhatsApp) */}
                  <ScrollArea className="flex-1 p-4 sm:p-6 bg-[#0c0d0e]">
                    <div className="space-y-3.5 max-w-3xl mx-auto pb-4">
                      {(!selectedConversa.mensagens || selectedConversa.mensagens.length === 0) ? (
                        <div className="text-center py-16 text-zinc-500 text-xs">
                          Nenhuma mensagem registrada nesta sessão.
                        </div>
                      ) : (
                        selectedConversa.mensagens.map((msg, idx) => {
                          const isUser = msg.role === 'user';
                          const isHumanOperator = msg.sender === 'humano';
                          
                          return (
                            <div 
                              key={idx} 
                              className={`flex ${isUser ? 'justify-start' : 'justify-end'}`}
                            >
                              <div className={`max-w-[85%] sm:max-w-[70%] p-3.5 text-xs rounded-2xl shadow-sm ${
                                isUser 
                                  ? 'bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-tl-xs' 
                                  : isHumanOperator
                                    ? 'bg-[#c59b5f] text-zinc-950 font-medium rounded-tr-xs shadow-md'
                                    : 'bg-emerald-950/80 border border-emerald-600/40 text-emerald-50 rounded-tr-xs'
                              }`}>
                                {/* Header do Balão */}
                                <div className="flex items-center justify-between gap-3 mb-1 text-[10px]">
                                  {isUser ? (
                                    <span className="font-semibold text-zinc-400 flex items-center gap-1">
                                      <User className="w-3 h-3" /> Cliente
                                    </span>
                                  ) : isHumanOperator ? (
                                    <span className="font-bold text-zinc-950 uppercase tracking-wider flex items-center gap-1">
                                      <User className="w-3 h-3" /> Atendente Humano (Você)
                                    </span>
                                  ) : (
                                    <span className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                                      <Sparkles className="w-3 h-3 text-emerald-400" /> Lia • Consultora Avante
                                    </span>
                                  )}
                                </div>

                                {/* Conteúdo da Mensagem */}
                                <div className="leading-relaxed whitespace-pre-wrap select-text">
                                  {msg.content}
                                </div>

                                {/* Rodapé do Balão com Hora e Ticks */}
                                <div className={`flex items-center justify-end gap-1 mt-1.5 text-[9px] ${
                                  isUser ? 'text-zinc-500' : isHumanOperator ? 'text-zinc-800' : 'text-emerald-400/70'
                                }`}>
                                  <span>{msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                                  {!isUser && <CheckCheck className="w-3 h-3 ml-0.5" />}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* ================= BARRA DE DIGITAÇÃO HUMANA (RESPOSTA CRM) ================= */}
                  <form 
                    onSubmit={handleEnviarMensagemHumana}
                    className="p-3.5 border-t border-zinc-800 bg-zinc-900/95 flex items-center gap-2 shrink-0"
                  >
                    <Input 
                      placeholder={
                        selectedConversa.assumida_por_humano
                          ? "Digite uma resposta humana para registrar no atendimento..."
                          : "Digite para responder (a conversa será assumida por humano automaticamente)..."
                      }
                      value={respostaHumana}
                      onChange={(e) => setRespostaHumana(e.target.value)}
                      disabled={isEnviandoResposta}
                      className="flex-1 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-xs rounded-xl focus-visible:ring-[#c59b5f] h-10"
                    />
                    
                    <Button 
                      type="submit"
                      disabled={isEnviandoResposta || !respostaHumana.trim()}
                      className="bg-[#c59b5f] hover:bg-[#b58825] text-zinc-950 font-bold px-4 rounded-xl text-xs h-10 gap-1.5 shadow-md shadow-[#c59b5f]/20"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Enviar</span>
                    </Button>
                  </form>

                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-zinc-600 p-8 text-center">
                  <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-3">
                    <MessageCircle className="w-8 h-8 text-[#c59b5f]" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-zinc-300">Nenhum Atendimento Selecionado</h3>
                  <p className="text-xs text-zinc-500 max-w-sm mt-1">
                    Selecione um cliente na lista à esquerda para carregar o histórico de mensagens e monitorar a conversa da Lia em tempo real.
                  </p>
                </div>
              )}
            </div>

          </div>
        </TabsContent>

        {/* ================= ABA 2: TREINAMENTO & REGRAS ================= */}
        <TabsContent value="treinamento" className="w-full mt-2 focus-visible:outline-none">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Adicionar Regra */}
            <Card className="lg:col-span-1 h-fit bg-zinc-900/90 border-zinc-800 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-white">Nova Regra / Promoção</CardTitle>
                <CardDescription className="text-zinc-400 text-xs">Ensine a Lia a responder sobre novas campanhas, regras de frete ou avisos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Título (Para organização)</label>
                  <Input 
                    placeholder="Ex: Promoção Atacado Friburgo" 
                    value={novaRegra.titulo}
                    onChange={(e) => setNovaRegra({...novaRegra, titulo: e.target.value})}
                    className="bg-zinc-950 border-zinc-800 text-white focus-visible:ring-[#c59b5f] rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Instrução para a IA</label>
                  <Textarea 
                    placeholder="Ex: Informe que compras acima de R$ 69,90 já entram no preço de fábrica com 100% de margem."
                    className="min-h-[120px] bg-zinc-950 border-zinc-800 text-white focus-visible:ring-[#c59b5f] rounded-xl text-xs"
                    value={novaRegra.conteudo}
                    onChange={(e) => setNovaRegra({...novaRegra, conteudo: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#c59b5f]" /> Data de Expiração (Opcional)
                  </label>
                  <Input 
                    type="date" 
                    value={novaRegra.data_expiracao}
                    onChange={(e) => setNovaRegra({...novaRegra, data_expiracao: e.target.value})}
                    className="bg-zinc-950 border-zinc-800 text-white focus-visible:ring-[#c59b5f] rounded-xl text-xs [color-scheme:dark]"
                  />
                  <p className="text-[10px] text-zinc-500">A Lia esquecerá essa regra automaticamente após essa data.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#c59b5f] hover:bg-[#b58825] text-zinc-950 font-bold transition-all rounded-xl py-5 text-xs shadow-md shadow-[#c59b5f]/20" onClick={handleSalvarRegra}>
                  <Plus className="w-4 h-4 mr-2" />
                  Treinar Lia
                </Button>
              </CardFooter>
            </Card>

            {/* Lista de Regras Ativas */}
            <Card className="lg:col-span-2 bg-zinc-900/90 border-zinc-800 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-white">Conhecimento Ativo da Lia</CardTitle>
                <CardDescription className="text-zinc-400 text-xs">Todas as regras e instruções dinâmicas que a Lia lê antes de responder qualquer mensagem.</CardDescription>
              </CardHeader>
              <CardContent>
                {isKnowledgeLoading ? (
                  <div className="text-center py-8 text-zinc-500 text-xs">Carregando cérebro da Lia...</div>
                ) : knowledge.length === 0 ? (
                  <div className="text-center py-8 text-zinc-500 border border-dashed border-zinc-800 rounded-xl text-xs">
                    Nenhuma regra cadastrada. A Lia usará apenas o catálogo padrão.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {knowledge.map((k) => (
                      <div key={k.id} className={`p-4 rounded-xl border transition-all ${k.ativo ? 'border-[#c59b5f]/40 bg-zinc-950/80 shadow-xs' : 'border-zinc-800 bg-zinc-950/30 opacity-60'}`}>
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h4 className="font-semibold flex items-center gap-2 text-white text-sm">
                            {k.titulo}
                            {k.data_expiracao && (
                              <Badge variant="outline" className="text-[10px] font-normal border-amber-600/40 bg-amber-950/30 text-amber-400">
                                Expira em {new Date(k.data_expiracao).toLocaleDateString('pt-BR')}
                              </Badge>
                            )}
                          </h4>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <Button 
                              variant={k.ativo ? "outline" : "secondary"} 
                              size="sm" 
                              onClick={() => toggleRegraAtiva(k.id, k.ativo)}
                              className={`rounded-lg h-7 text-[11px] font-semibold border-0 ${k.ativo ? "text-zinc-950 bg-[#c59b5f] hover:bg-[#b58825]" : "text-zinc-400 bg-zinc-800 hover:bg-zinc-700"}`}
                            >
                              {k.ativo ? 'Desativar' : 'Ativar'}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg" onClick={() => deleteRegra(k.id, k.titulo)}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-300 font-mono bg-zinc-900/90 p-3 rounded-lg border border-zinc-800/80 leading-relaxed">
                          "{k.conteudo}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </TabsContent>

        {/* ================= ABA 3: CONEXÃO WHATSAPP ================= */}
        <TabsContent value="whatsapp" className="w-full mt-2 focus-visible:outline-none">
          <Card className="max-w-2xl mx-auto bg-zinc-900/90 border-zinc-800 rounded-2xl shadow-xl">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-serif text-white">Conexão Oficial do WhatsApp</CardTitle>
              <CardDescription className="text-zinc-400 text-xs">Escaneie o QR Code abaixo com o número oficial de atendimento da Avante Lingerie `(22) 98122-5010`.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-inner flex flex-col items-center relative overflow-hidden w-full max-w-sm">
                {!showQrCode ? (
                  <div className="flex flex-col items-center justify-center p-6 space-y-4 text-center w-full h-64">
                    <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center border border-[#c59b5f]/30">
                      <Smartphone className="w-8 h-8 text-[#c59b5f]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-white mb-2">Conectar WhatsApp da Fábrica</h3>
                      <p className="text-xs text-zinc-400 mb-4">Número cadastrado: (22) 98122-5010</p>
                      <Button onClick={() => setShowQrCode(true)} className="bg-[#c59b5f] hover:bg-[#b58825] text-zinc-950 font-bold rounded-xl text-xs">
                        Exibir QR Code
                      </Button>
                    </div>
                  </div>
                ) : !qrError ? (
                  <img 
                    src={`https://avantelingerie.com.br/imagens/qr.png?t=${qrTimestamp}`} 
                    alt="QR Code WhatsApp"
                    className="w-60 h-60 object-contain bg-white p-3 rounded-xl shadow-md relative z-10 transition-all duration-300"
                    onError={() => setQrError(true)}
                    onLoad={() => setQrError(false)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 space-y-3 text-center w-full h-64">
                    <div className="w-16 h-16 bg-emerald-600/20 border border-emerald-500/40 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">Lia Conectada!</h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        O bot do WhatsApp está online e ativo na VPS.<br />
                        As mensagens recebidas serão atendidas automaticamente.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {showQrCode && (
                <p className="text-[11px] text-zinc-500 mt-4 text-center max-w-sm">
                  Se o QR Code não aparecer e o WhatsApp não responder, aguarde alguns segundos enquanto o robô inicializa na VPS.
                </p>
              )}
              
              <div className="mt-6 flex justify-center w-full">
                <Button 
                  variant="outline" 
                  onClick={async () => {
                    await handleDisconnect();
                    setShowQrCode(true);
                  }} 
                  disabled={isDisconnecting}
                  className="border-red-900/60 bg-red-950/20 text-red-400 hover:bg-red-900/40 hover:text-red-300 rounded-xl text-xs font-semibold"
                >
                  <PowerOff className="w-3.5 h-3.5 mr-2" />
                  {isDisconnecting ? 'Desconectando...' : 'Desconectar e Gerar Novo QR Code'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
