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
      const baseUrl = import.meta.env.VITE_API_URL || 'https://avantelingerie.com.br/api';
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
    <div className="max-w-7xl mx-auto space-y-8 bg-gradient-to-br from-[#F9F6F0]/80 to-white/90 p-6 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-[#1A1A1A] flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-[#B8860B]/20 to-[#B8860B]/5 rounded-2xl border border-[#B8860B]/20 shadow-sm">
              <Sparkles className="w-8 h-8 text-[#B8860B]" />
            </div>
            Cérebro da Lia
          </h1>
          <p className="text-gray-500 mt-2 text-lg font-light">Gerencie a inteligência artificial, treine seu conhecimento e monitore os chats ao vivo.</p>
        </div>
      </div>

      <Tabs defaultValue="chats" className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start gap-3 bg-transparent mb-10 p-0">
          <TabsTrigger value="chats" className="flex items-center gap-2 px-6 py-3 rounded-full data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-[#B8860B] data-[state=active]:shadow-lg data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-gray-50 data-[state=inactive]:text-gray-600 border border-transparent data-[state=inactive]:border-gray-200 transition-all font-medium text-sm">
            <MessageSquare className="w-4 h-4" /> Chats Ao Vivo
          </TabsTrigger>
          <TabsTrigger value="treinamento" className="flex items-center gap-2 px-6 py-3 rounded-full data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-[#B8860B] data-[state=active]:shadow-lg data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-gray-50 data-[state=inactive]:text-gray-600 border border-transparent data-[state=inactive]:border-gray-200 transition-all font-medium text-sm">
            <Brain className="w-4 h-4" /> Treinamento
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center gap-2 px-6 py-3 rounded-full data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-[#B8860B] data-[state=active]:shadow-lg data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-gray-50 data-[state=inactive]:text-gray-600 border border-transparent data-[state=inactive]:border-gray-200 transition-all font-medium text-sm">
            <Smartphone className="w-4 h-4" /> Conexão WhatsApp
          </TabsTrigger>
        </TabsList>

        {/* CHATS AO VIVO */}
        <TabsContent value="chats" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
            
            {/* Lista de Conversas */}
            <Card className="flex flex-col h-full shadow-lg shadow-black/5 border-white/40 bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden">
              <CardHeader className="p-4 border-b border-gray-100/50 bg-white/40">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Buscar por sessão..." className="pl-9 bg-white/80 border-gray-200 focus-visible:ring-[#B8860B] rounded-xl" />
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
                          className={`p-4 cursor-pointer transition-all duration-200 rounded-xl border ${isSelected ? 'bg-white shadow-md border-[#B8860B]/30 translate-x-1' : 'bg-transparent border-transparent hover:bg-white/50 hover:border-gray-200 hover:shadow-sm'}`}
                        >
                          <div className="flex justify-between items-start mb-1.5">
                            <span className="font-semibold text-sm truncate flex items-center gap-2 text-gray-900">
                              {conversa.canal === 'whatsapp' ? '📱 WhatsApp' : '💻 Site'} 
                              {conversa.converteu && <Badge variant="success" className="bg-emerald-100 text-emerald-800 border-emerald-200 text-[10px] px-1.5 py-0 shadow-sm">Venda</Badge>}
                              {conversa.assumida_por_humano && <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-[#1A1A1A] text-[#B8860B] shadow-sm border-transparent">Pausada</Badge>}
                            </span>
                            <span className={`text-[10px] flex items-center gap-1 font-medium ${isSelected ? 'text-[#B8860B]' : 'text-gray-400'}`}>
                              <Clock className="w-3 h-3" />
                              {conversa.updated ? new Date(conversa.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Agora'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 truncate max-w-[250px]">{ultimaMsg}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </Card>

            {/* View da Conversa */}
            <Card className="lg:col-span-2 flex flex-col h-full shadow-lg shadow-black/5 border-white/40 bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden relative">
              {selectedConversa ? (
                <>
                  <CardHeader className="p-4 border-b border-gray-100/50 bg-white/60 backdrop-blur-md flex flex-row items-center justify-between sticky top-0 z-10">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2 font-serif">
                        Conversa Atual
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1 text-xs">
                        Sessão: <span className="font-mono">{selectedConversa.session_id.substring(0,8)}...</span> • {selectedConversa.created ? new Date(selectedConversa.created).toLocaleString('pt-BR') : 'Data não disponível'}
                      </CardDescription>
                    </div>
                    <div>
                      {!selectedConversa.assumida_por_humano ? (
                        <Button variant="outline" size="sm" onClick={() => assumirConversa(selectedConversa.id)} className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full shadow-sm transition-all hover:scale-105">
                          <Hand className="w-4 h-4 mr-2" />
                          Pausar IA (Assumir)
                        </Button>
                      ) : (
                        <Badge variant="outline" className="border-[#B8860B]/30 text-[#B8860B] bg-[#B8860B]/10 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
                          <User className="w-4 h-4 mr-2" /> Atendimento Humano
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <ScrollArea className="flex-1 min-h-0 p-4 lg:p-6 bg-gradient-to-b from-white/30 to-white/10">
                    <div className="space-y-6 pb-4">
                      {selectedConversa.mensagens?.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] lg:max-w-[70%] p-4 text-sm shadow-md ${
                            msg.role === 'user' 
                              ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl rounded-tr-sm' 
                              : 'bg-white text-gray-800 border border-[#B8860B]/10 rounded-2xl rounded-tl-sm'
                          }`}>
                            {msg.role === 'assistant' && (
                              <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-[#B8860B] uppercase tracking-wider">
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
                <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-gray-100">
                    <MessageSquare className="w-8 h-8 text-[#B8860B]/50" />
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
            <Card className="md:col-span-1 h-fit shadow-lg shadow-black/5 border-white/40 bg-white/60 backdrop-blur-md rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-gray-900">Nova Regra / Promoção</CardTitle>
                <CardDescription>Ensine a Lia a responder sobre novas campanhas, regras de frete ou avisos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Título (Para organização)</label>
                  <Input 
                    placeholder="Ex: Promoção Dia das Mães" 
                    value={novaRegra.titulo}
                    onChange={(e) => setNovaRegra({...novaRegra, titulo: e.target.value})}
                    className="bg-white/80 border-gray-200 focus-visible:ring-[#B8860B] rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instrução para a IA</label>
                  <Textarea 
                    placeholder="Ex: Informe que em compras acima de R$500,00 o frete é grátis até o fim do mês."
                    className="min-h-[120px] bg-white/80 border-gray-200 focus-visible:ring-[#B8860B] rounded-xl"
                    value={novaRegra.conteudo}
                    onChange={(e) => setNovaRegra({...novaRegra, conteudo: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Data de Expiração (Opcional)
                  </label>
                  <Input 
                    type="date" 
                    value={novaRegra.data_expiracao}
                    onChange={(e) => setNovaRegra({...novaRegra, data_expiracao: e.target.value})}
                    className="bg-white/80 border-gray-200 focus-visible:ring-[#B8860B] rounded-xl"
                  />
                  <p className="text-xs text-muted-foreground mt-1">A Lia esquecerá essa regra após essa data.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-[#B8860B] hover:to-[#d4a017] text-white shadow-md transition-all rounded-xl py-6 text-md" onClick={handleSalvarRegra}>
                  <Plus className="w-5 h-5 mr-2" />
                  Treinar Lia
                </Button>
              </CardFooter>
            </Card>

            {/* Lista de Regras */}
            <Card className="md:col-span-2 shadow-lg shadow-black/5 border-white/40 bg-white/60 backdrop-blur-md rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-gray-900">Conhecimento Ativo da Lia</CardTitle>
                <CardDescription>Todas as regras e instruções dinâmicas que a Lia lê antes de responder qualquer mensagem.</CardDescription>
              </CardHeader>
              <CardContent>
                {isKnowledgeLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Carregando cérebro da Lia...</div>
                ) : knowledge.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                    Nenhuma regra cadastrada. A Lia usará apenas o catálogo padrão.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {knowledge.map((k) => (
                      <div key={k.id} className={`p-5 rounded-2xl border transition-all ${k.ativo ? 'border-emerald-200/50 bg-gradient-to-br from-emerald-50/50 to-white shadow-sm' : 'border-gray-200 bg-white/50 opacity-80'}`}>
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                          <h4 className="font-semibold flex flex-wrap items-center gap-2 text-gray-900 text-lg">
                            {k.titulo}
                            {k.data_expiracao && (
                              <Badge variant="outline" className="text-xs font-normal border-amber-200 bg-amber-50 text-amber-700">
                                Expira em {new Date(k.data_expiracao).toLocaleDateString('pt-BR')}
                              </Badge>
                            )}
                          </h4>
                          <div className="flex items-center gap-2 shrink-0">
                            <Button 
                              variant={k.ativo ? "outline" : "secondary"} 
                              size="sm" 
                              onClick={() => toggleRegraAtiva(k.id, k.ativo)}
                              className={`rounded-xl ${k.ativo ? "text-emerald-700 border-emerald-200 hover:bg-emerald-50" : ""}`}
                            >
                              {k.ativo ? 'Desativar' : 'Ativar'}
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl" onClick={() => deleteRegra(k.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 font-mono bg-white/80 p-4 rounded-xl border border-gray-100 shadow-inner">
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
          <Card className="max-w-2xl mx-auto shadow-lg shadow-black/5 border-white/40 bg-white/60 backdrop-blur-md rounded-2xl">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-serif text-gray-900">Conexão do WhatsApp</CardTitle>
              <CardDescription className="text-sm">Escaneie o QR Code abaixo com o número oficial de atendimento da loja.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="bg-gradient-to-b from-white to-gray-50/50 p-8 rounded-3xl border border-gray-100 shadow-inner flex flex-col items-center relative overflow-hidden w-full max-w-sm">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#B8860B]/5 rounded-full blur-3xl pointer-events-none"></div>
                <img 
                  src={`https://avantelingerie.com.br/imagens/qr.png?t=${qrTimestamp}`} 
                  alt="QR Code WhatsApp"
                  className="w-64 h-64 object-contain bg-white p-3 rounded-2xl shadow-md border border-[#B8860B]/20 relative z-10 transition-all duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden flex-col items-center justify-center p-8 space-y-4 text-center relative z-10 w-full h-64">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-2xl text-gray-900">Conectado!</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      A Lia está online e pronta para trabalhar.<br />
                      Nenhuma ação adicional é necessária.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-6 text-center max-w-sm">
                Se o QR Code não estiver aparecendo e o WhatsApp não estiver respondendo, o bot pode estar reiniciando. Aguarde alguns segundos.
              </p>
              
              <div className="mt-8 flex justify-center w-full">
                <Button 
                  variant="outline" 
                  onClick={handleDisconnect} 
                  disabled={isDisconnecting}
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all"
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
