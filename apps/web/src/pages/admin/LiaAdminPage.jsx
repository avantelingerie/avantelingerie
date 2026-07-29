import React, { useState, useEffect, useRef } from 'react';
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
import { MessageSquare, Brain, Search, Clock, CheckCircle2, User, Sparkles, Hand, Plus, Trash2, Calendar, Smartphone, PowerOff } from 'lucide-react';

export default function LiaAdminPage() {
  const { currentAdmin } = useAdminAuth();
  
  const [conversas, setConversas] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [isLoadingConversas, setIsLoadingConversas] = useState(true);

  const [knowledge, setKnowledge] = useState([]);
  const [isKnowledgeLoading, setIsKnowledgeLoading] = useState(true);

  const [novaRegra, setNovaRegra] = useState({ titulo: '', conteudo: '', data_expiracao: '' });
  const [qrTimestamp, setQrTimestamp] = useState(Date.now());
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setQrTimestamp(Date.now());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchConversas();
    fetchKnowledge();
    
    // Inscreve no Realtime para novas mensagens
    pb.collection('lia_conversas').subscribe('*', function (e) {
      if (e.action === 'create' || e.action === 'update') {
        setConversas(prev => {
          const exists = prev.findIndex(c => c.id === e.record.id);
          if (exists >= 0) {
            const copy = [...prev];
            copy[exists] = e.record;
            // Re-sort by updated date
            return copy.sort((a, b) => new Date(b.updated) - new Date(a.updated));
          } else {
            return [e.record, ...prev];
          }
        });
      }
    });

    return () => {
      pb.collection('lia_conversas').unsubscribe('*');
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversas, selectedSessionId]);

  const fetchConversas = async () => {
    try {
      setIsLoadingConversas(true);
      const records = await pb.collection('lia_conversas').getFullList();
      // Ordenar no frontend caso o banco local não tenha o campo de data indexado
      records.sort((a, b) => new Date(b.updated || Date.now()) - new Date(a.updated || Date.now()));
      setConversas(records);
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

  const assumirConversa = async (conversaId) => {
    try {
      await pb.collection('lia_conversas').update(conversaId, {
        assumida_por_humano: true
      });
      toast.success('Você assumiu esta conversa. A Lia foi pausada para esta cliente.');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao pausar a Lia. Dica: Verifique se a coluna "assumida_por_humano" (Booleana) existe na tabela lia_conversas da Horizons.');
    }
  };

  const retomarConversa = async (conversaId) => {
    try {
      await pb.collection('lia_conversas').update(conversaId, {
        assumida_por_humano: false
      });
      toast.success('Você devolveu o controle. A Lia voltará a responder essa cliente!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao despausar a Lia.');
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
      toast.error('Erro ao alterar status da regra.');
    }
  };

  const deleteRegra = async (id) => {
    if (!window.confirm('Tem certeza que deseja apagar esta instrução da Lia?')) return;
    try {
      await pb.collection('lia_knowledge').delete(id);
      setKnowledge(prev => prev.filter(k => k.id !== id));
      toast.success('Instrução removida.');
    } catch (error) {
      toast.error('Erro ao remover regra.');
    }
  };

  const handleDisconnect = async () => {
    if (!window.confirm("Atenção: Isso irá desconectar o WhatsApp atual e gerar um novo QR Code. A Lia ficará offline por alguns segundos. Deseja continuar?")) return;
    
    setIsDisconnecting(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'https://avantelingerie.com.br/hcgi/api';
      const response = await fetch(`${baseUrl}/whatsapp/disconnect`, {
        method: 'POST'
      });
      if (response.ok) {
        toast.success('Lia está se desconectando! Aguarde um instante para o novo QR Code.');
        // Força atualização da imagem do QR code após alguns segundos para o container ter tempo de reiniciar
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

  const selectedConversa = conversas.find(c => c.session_id === selectedSessionId);

  return (
    <div className="max-w-7xl mx-auto space-y-8 bg-[#1A1A1A] p-6 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(212,175,55,0.05)] border border-[#D4AF37]/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-white flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/30 shadow-sm">
              <Sparkles className="w-8 h-8 text-[#D4AF37]" />
            </div>
            Cérebro da Lia
          </h1>
          <p className="text-gray-400 mt-2 text-lg font-light">Gerencie a inteligência artificial, treine seu conhecimento e monitore os chats ao vivo.</p>
        </div>
      </div>

      <Tabs defaultValue="chats" className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start gap-3 bg-transparent mb-10 p-0">
          <TabsTrigger value="chats" className="flex items-center gap-2 px-6 py-3 rounded-full data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#1A1A1A] data-[state=active]:shadow-lg data-[state=inactive]:bg-[#121212] data-[state=inactive]:hover:bg-[#1A1A1A] data-[state=inactive]:text-gray-300 border data-[state=active]:border-[#D4AF37] data-[state=inactive]:border-[#D4AF37]/20 transition-all font-medium text-sm">
            <MessageSquare className="w-4 h-4" /> Chats Ao Vivo
          </TabsTrigger>
          <TabsTrigger value="treinamento" className="flex items-center gap-2 px-6 py-3 rounded-full data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#1A1A1A] data-[state=active]:shadow-lg data-[state=inactive]:bg-[#121212] data-[state=inactive]:hover:bg-[#1A1A1A] data-[state=inactive]:text-gray-300 border data-[state=active]:border-[#D4AF37] data-[state=inactive]:border-[#D4AF37]/20 transition-all font-medium text-sm">
            <Brain className="w-4 h-4" /> Treinamento
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center gap-2 px-6 py-3 rounded-full data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#1A1A1A] data-[state=active]:shadow-lg data-[state=inactive]:bg-[#121212] data-[state=inactive]:hover:bg-[#1A1A1A] data-[state=inactive]:text-gray-300 border data-[state=active]:border-[#D4AF37] data-[state=inactive]:border-[#D4AF37]/20 transition-all font-medium text-sm">
            <Smartphone className="w-4 h-4" /> Conexão WhatsApp
          </TabsTrigger>
        </TabsList>

        {/* CHATS AO VIVO */}
        <TabsContent value="chats" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
            
            {/* Lista de Conversas */}
            <Card className="flex flex-col h-full shadow-lg border-[#D4AF37]/20 bg-[#121212] rounded-2xl overflow-hidden">
              <CardHeader className="p-4 border-b border-[#D4AF37]/10 bg-[#1A1A1A]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input placeholder="Buscar por sessão..." className="pl-9 bg-[#121212] border-[#D4AF37]/30 text-white focus-visible:ring-[#D4AF37] rounded-xl placeholder:text-gray-600" />
                </div>
              </CardHeader>
              <ScrollArea className="flex-1 min-h-0 p-2">
                {isLoadingConversas ? (
                  <div className="p-4 text-center text-gray-400 text-sm">Carregando...</div>
                ) : conversas.length === 0 ? (
                  <div className="p-4 text-center text-gray-400 text-sm">Nenhuma conversa encontrada.</div>
                ) : (
                  <div className="space-y-2">
                    {conversas.map(conversa => {
                      const msgCount = conversa.mensagens?.length || 0;
                      const ultimaMsg = conversa.mensagens?.[msgCount - 1]?.content || 'Nova Conversa';
                      const isSelected = selectedSessionId === conversa.session_id;

                      return (
                        <div 
                          key={conversa.id} 
                          onClick={() => setSelectedSessionId(conversa.session_id)}
                          className={`p-4 cursor-pointer transition-all duration-200 rounded-xl border ${isSelected ? 'bg-[#1A1A1A] shadow-md border-[#D4AF37] translate-x-1' : 'bg-transparent border-transparent hover:bg-[#1A1A1A]/50 hover:border-[#D4AF37]/30 hover:shadow-sm'}`}
                        >
                          <div className="flex justify-between items-start mb-1.5">
                            <span className="font-semibold text-sm truncate flex items-center gap-2 text-white">
                              {conversa.canal === 'whatsapp' ? (
                                <>📱 {conversa.session_id.replace('@c.us', '')}</>
                              ) : (
                                <>💻 Site ({conversa.session_id.substring(0,4)})</>
                              )} 
                              {conversa.converteu && <Badge variant="success" className="bg-emerald-900/50 text-emerald-400 border-emerald-800 text-[10px] px-1.5 py-0 shadow-sm">Venda</Badge>}
                              {conversa.assumida_por_humano && <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-[#D4AF37] text-[#1A1A1A] shadow-sm border-transparent font-bold">Pausada</Badge>}
                            </span>
                            <span className={`text-[10px] flex items-center gap-1 font-medium ${isSelected ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
                              <Clock className="w-3 h-3" />
                              {conversa.updated ? new Date(conversa.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Agora'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 truncate max-w-[250px]">{ultimaMsg}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </Card>

            {/* View da Conversa */}
            <Card className="lg:col-span-2 flex flex-col h-full shadow-lg border-[#D4AF37]/20 bg-[#121212] rounded-2xl overflow-hidden relative">
              {selectedConversa ? (
                <>
                  <CardHeader className="p-4 border-b border-[#D4AF37]/10 bg-[#1A1A1A] flex flex-row items-center justify-between sticky top-0 z-10">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2 font-serif text-white">
                        Conversa Atual
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                        Sessão: <span className="font-mono text-[#D4AF37]">{selectedConversa.session_id.substring(0,8)}...</span> • {selectedConversa.created ? new Date(selectedConversa.created).toLocaleString('pt-BR') : 'Data não disponível'}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      {!selectedConversa.assumida_por_humano ? (
                        <Button variant="outline" size="sm" onClick={() => assumirConversa(selectedConversa.id)} className="border-red-900 text-red-400 hover:bg-red-900/30 hover:text-red-300 bg-transparent rounded-full shadow-sm transition-all hover:scale-105">
                          <Hand className="w-4 h-4 mr-2" />
                          Pausar IA (Assumir)
                        </Button>
                      ) : (
                        <>
                          <Badge variant="outline" className="border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
                            <User className="w-4 h-4 mr-2" /> Atendimento Humano
                          </Badge>
                          <Button size="sm" onClick={() => retomarConversa(selectedConversa.id)} className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-sm transition-all shadow-emerald-500/20 hover:scale-105 border-0">
                            <Brain className="w-4 h-4 mr-2" />
                            Devolver para a Lia
                          </Button>
                        </>
                      )}
                    </div>
                  </CardHeader>
                  <ScrollArea className="flex-1 min-h-0 p-4 lg:p-6 bg-[#0a0a0a]">
                    <div className="space-y-6 pb-4">
                      {selectedConversa.mensagens?.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] lg:max-w-[70%] p-4 text-sm shadow-md ${
                            msg.role === 'user' 
                              ? 'bg-[#D4AF37] text-[#1A1A1A] font-medium rounded-2xl rounded-tr-sm' 
                              : 'bg-[#1A1A1A] text-white border border-[#D4AF37]/30 rounded-2xl rounded-tl-sm'
                          }`}>
                            {msg.role === 'assistant' && (
                              <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5" /> Lia
                              </div>
                            )}
                            <div className="leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-60">
                  <div className="w-20 h-20 bg-[#1A1A1A] rounded-full flex items-center justify-center shadow-sm mb-4 border border-[#D4AF37]/20">
                    <MessageSquare className="w-8 h-8 text-[#D4AF37]/50" />
                  </div>
                  <p className="font-medium">Selecione uma conversa para visualizar os detalhes.</p>
                </div>
              )}
            </Card>

          </div>
        </TabsContent>

        {/* TREINAMENTO E CONHECIMENTO */}
        <TabsContent value="treinamento" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Adicionar Regra */}
            <Card className="md:col-span-1 h-fit shadow-lg border-[#D4AF37]/20 bg-[#121212] rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-white">Nova Regra / Promoção</CardTitle>
                <CardDescription className="text-gray-400">Ensine a Lia a responder sobre novas campanhas, regras de frete ou avisos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Título (Para organização)</label>
                  <Input 
                    placeholder="Ex: Promoção Dia das Mães" 
                    value={novaRegra.titulo}
                    onChange={(e) => setNovaRegra({...novaRegra, titulo: e.target.value})}
                    className="bg-[#1A1A1A] border-[#D4AF37]/30 text-white focus-visible:ring-[#D4AF37] rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Instrução para a IA</label>
                  <Textarea 
                    placeholder="Ex: Informe que em compras acima de R$500,00 o frete é grátis até o fim do mês."
                    className="min-h-[120px] bg-[#1A1A1A] border-[#D4AF37]/30 text-white focus-visible:ring-[#D4AF37] rounded-xl"
                    value={novaRegra.conteudo}
                    onChange={(e) => setNovaRegra({...novaRegra, conteudo: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Data de Expiração (Opcional)
                  </label>
                  <Input 
                    type="date" 
                    value={novaRegra.data_expiracao}
                    onChange={(e) => setNovaRegra({...novaRegra, data_expiracao: e.target.value})}
                    className="bg-[#1A1A1A] border-[#D4AF37]/30 text-white focus-visible:ring-[#D4AF37] [color-scheme:dark] rounded-xl"
                  />
                  <p className="text-xs text-gray-500 mt-1">A Lia esquecerá essa regra após essa data.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#D4AF37] hover:bg-[#b58825] text-[#1A1A1A] font-semibold shadow-md transition-all rounded-xl py-6 text-md" onClick={handleSalvarRegra}>
                  <Plus className="w-5 h-5 mr-2" />
                  Treinar Lia
                </Button>
              </CardFooter>
            </Card>

            {/* Lista de Regras */}
            <Card className="md:col-span-2 shadow-lg border-[#D4AF37]/20 bg-[#121212] rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-white">Conhecimento Ativo da Lia</CardTitle>
                <CardDescription className="text-gray-400">Todas as regras e instruções dinâmicas que a Lia lê antes de responder qualquer mensagem.</CardDescription>
              </CardHeader>
              <CardContent>
                {isKnowledgeLoading ? (
                  <div className="text-center py-8 text-gray-500">Carregando cérebro da Lia...</div>
                ) : knowledge.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 border-2 border-dashed border-[#D4AF37]/20 rounded-lg">
                    Nenhuma regra cadastrada. A Lia usará apenas o catálogo padrão.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {knowledge.map((k) => (
                      <div key={k.id} className={`p-5 rounded-2xl border transition-all ${k.ativo ? 'border-[#D4AF37]/50 bg-[#1A1A1A] shadow-sm' : 'border-[#D4AF37]/10 bg-[#1A1A1A]/40 opacity-70'}`}>
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                          <h4 className="font-semibold flex flex-wrap items-center gap-2 text-white text-lg">
                            {k.titulo}
                            {k.data_expiracao && (
                              <Badge variant="outline" className="text-xs font-normal border-amber-600 bg-amber-900/20 text-amber-500">
                                Expira em {new Date(k.data_expiracao).toLocaleDateString('pt-BR')}
                              </Badge>
                            )}
                          </h4>
                          <div className="flex items-center gap-2 shrink-0">
                            <Button 
                              variant={k.ativo ? "outline" : "secondary"} 
                              size="sm" 
                              onClick={() => toggleRegraAtiva(k.id, k.ativo)}
                              className={`rounded-xl border-0 ${k.ativo ? "text-[#1A1A1A] bg-[#D4AF37] hover:bg-[#b58825]" : "text-gray-400 bg-[#121212] hover:bg-[#1A1A1A]"}`}
                            >
                              {k.ativo ? 'Desativar' : 'Ativar'}
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-xl" onClick={() => deleteRegra(k.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 font-mono bg-[#121212] p-4 rounded-xl border border-[#D4AF37]/20 shadow-inner">
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
        {/* WHATSAPP CONNECTION */}
        <TabsContent value="whatsapp" className="space-y-6">
          <Card className="max-w-2xl mx-auto shadow-lg border-[#D4AF37]/20 bg-[#121212] rounded-2xl">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-serif text-white">Conexão do WhatsApp</CardTitle>
              <CardDescription className="text-gray-400">Escaneie o QR Code abaixo com o número oficial de atendimento da loja.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="bg-[#1A1A1A] p-8 rounded-3xl border border-[#D4AF37]/20 shadow-inner flex flex-col items-center relative overflow-hidden w-full max-w-sm">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
                {!qrError ? (
                  <img 
                    src={`https://avantelingerie.com.br/imagens/qr.png?t=${qrTimestamp}`} 
                    alt="QR Code WhatsApp"
                    className="w-64 h-64 object-contain bg-white p-3 rounded-2xl shadow-md border border-[#D4AF37]/20 relative z-10 transition-all duration-300 hover:scale-105"
                    onError={() => setQrError(true)}
                    onLoad={() => setQrError(false)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center relative z-10 w-full h-64">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center shadow-lg shadow-emerald-900/50">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-2xl text-white">Conectado!</h3>
                      <p className="text-sm text-gray-400 mt-2">
                        A Lia está online e pronta para trabalhar.<br />
                        Nenhuma ação adicional é necessária.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-6 text-center max-w-sm">
                Se o QR Code não estiver aparecendo e o WhatsApp não estiver respondendo, o bot pode estar reiniciando. Aguarde alguns segundos.
              </p>
              
              <div className="mt-8 flex justify-center w-full">
                <Button 
                  variant="outline" 
                  onClick={handleDisconnect} 
                  disabled={isDisconnecting}
                  className="border-red-900 text-red-400 hover:bg-red-900/30 hover:text-red-300 bg-transparent rounded-xl transition-all"
                >
                  <PowerOff className="w-4 h-4 mr-2" />
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
