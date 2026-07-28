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
import { MessageSquare, Brain, Search, Clock, CheckCircle2, User, Sparkles, Hand, Plus, Trash2, Calendar } from 'lucide-react';

export default function LiaAdminPage() {
  const { currentAdmin } = useAdminAuth();
  
  const [conversas, setConversas] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [isLoadingConversas, setIsLoadingConversas] = useState(true);

  const [knowledge, setKnowledge] = useState([]);
  const [isKnowledgeLoading, setIsKnowledgeLoading] = useState(true);

  const [novaRegra, setNovaRegra] = useState({ titulo: '', conteudo: '', data_expiracao: '' });

  const messagesEndRef = useRef(null);

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

  const selectedConversa = conversas.find(c => c.session_id === selectedSessionId);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-[#B8860B]" />
            Cérebro da Lia
          </h1>
          <p className="text-muted-foreground mt-1">Gerencie a inteligência artificial, treine seu conhecimento e monitore os chats ao vivo.</p>
        </div>
      </div>

      <Tabs defaultValue="chats" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2 mb-8">
          <TabsTrigger value="chats" className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Chats Ao Vivo</TabsTrigger>
          <TabsTrigger value="treinamento" className="flex items-center gap-2"><Brain className="w-4 h-4" /> Treinamento (Knowledge)</TabsTrigger>
        </TabsList>

        {/* CHATS AO VIVO */}
        <TabsContent value="chats" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
            
            {/* Lista de Conversas */}
            <Card className="flex flex-col h-full shadow-sm">
              <CardHeader className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar por sessão..." className="pl-9" />
                </div>
              </CardHeader>
              <ScrollArea className="flex-1 p-0">
                {isLoadingConversas ? (
                  <div className="p-4 text-center text-muted-foreground">Carregando...</div>
                ) : conversas.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">Nenhuma conversa encontrada.</div>
                ) : (
                  <div className="divide-y">
                    {conversas.map(conversa => {
                      const msgCount = conversa.mensagens?.length || 0;
                      const ultimaMsg = conversa.mensagens?.[msgCount - 1]?.content || 'Nova Conversa';
                      const isSelected = selectedSessionId === conversa.session_id;

                      return (
                        <div 
                          key={conversa.id} 
                          onClick={() => setSelectedSessionId(conversa.session_id)}
                          className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${isSelected ? 'bg-muted border-l-4 border-[#B8860B]' : ''}`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-semibold text-sm truncate flex items-center gap-2">
                              {conversa.canal === 'whatsapp' ? '📱 WhatsApp' : '💻 Site'} 
                              {conversa.converteu && <Badge variant="success" className="bg-emerald-100 text-emerald-800 border-none text-[10px] px-1.5 py-0">Venda</Badge>}
                              {conversa.assumida_por_humano && <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-yellow-100 text-yellow-800">Pausada</Badge>}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {conversa.updated ? new Date(conversa.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Agora'}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate max-w-[250px]">{ultimaMsg}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </Card>

            {/* View da Conversa */}
            <Card className="lg:col-span-2 flex flex-col h-full shadow-sm bg-gray-50/50">
              {selectedConversa ? (
                <>
                  <CardHeader className="p-4 border-b bg-white flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        Sessão: <span className="font-mono text-sm font-normal text-gray-500">{selectedConversa.session_id}</span>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        Início: {selectedConversa.created ? new Date(selectedConversa.created).toLocaleString('pt-BR') : 'Data não disponível'}
                      </CardDescription>
                    </div>
                    <div>
                      {!selectedConversa.assumida_por_humano ? (
                        <Button variant="outline" size="sm" onClick={() => assumirConversa(selectedConversa.id)} className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                          <Hand className="w-4 h-4 mr-2" />
                          Assumir Conversa (Pausar IA)
                        </Button>
                      ) : (
                        <Badge variant="outline" className="border-yellow-300 text-yellow-700 bg-yellow-50 px-3 py-1 text-sm">
                          <User className="w-4 h-4 mr-2" /> IA Pausada
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <ScrollArea className="flex-1 p-4 bg-white/50">
                    <div className="space-y-4 pb-4">
                      {selectedConversa.mensagens?.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[75%] rounded-2xl p-3 text-sm shadow-sm ${
                            msg.role === 'user' 
                              ? 'bg-[#1A1A1A] text-white rounded-tr-sm' 
                              : 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm'
                          }`}>
                            {msg.role === 'assistant' && (
                              <div className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-[#B8860B]">
                                <Sparkles className="w-3 h-3" /> Lia
                              </div>
                            )}
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50">
                  <MessageSquare className="w-16 h-16 mb-4" />
                  <p>Selecione uma conversa ao lado para visualizar os detalhes.</p>
                </div>
              )}
            </Card>

          </div>
        </TabsContent>

        {/* TREINAMENTO E CONHECIMENTO */}
        <TabsContent value="treinamento" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Adicionar Regra */}
            <Card className="md:col-span-1 h-fit shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Nova Regra / Promoção</CardTitle>
                <CardDescription>Ensine a Lia a responder sobre novas campanhas, regras de frete ou avisos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Título (Para organização)</label>
                  <Input 
                    placeholder="Ex: Promoção Dia das Mães" 
                    value={novaRegra.titulo}
                    onChange={(e) => setNovaRegra({...novaRegra, titulo: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instrução para a IA</label>
                  <Textarea 
                    placeholder="Ex: Informe que em compras acima de R$500,00 o frete é grátis até o fim do mês."
                    className="min-h-[120px]"
                    value={novaRegra.conteudo}
                    onChange={(e) => setNovaRegra({...novaRegra, conteudo: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Data de Expiração (Opcional)
                  </label>
                  <Input 
                    type="date" 
                    value={novaRegra.data_expiracao}
                    onChange={(e) => setNovaRegra({...novaRegra, data_expiracao: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">A Lia esquecerá essa regra após essa data.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#1A1A1A] hover:bg-[#B8860B] transition-colors" onClick={handleSalvarRegra}>
                  <Plus className="w-4 h-4 mr-2" />
                  Treinar Lia
                </Button>
              </CardFooter>
            </Card>

            {/* Lista de Regras */}
            <Card className="md:col-span-2 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Conhecimento Ativo da Lia</CardTitle>
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
                      <div key={k.id} className={`p-4 rounded-xl border ${k.ativo ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold flex items-center gap-2 text-gray-900">
                            {k.titulo}
                            {k.data_expiracao && (
                              <Badge variant="outline" className="text-xs font-normal border-amber-200 bg-amber-50 text-amber-700">
                                Expira em {new Date(k.data_expiracao).toLocaleDateString('pt-BR')}
                              </Badge>
                            )}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant={k.ativo ? "outline" : "secondary"} 
                              size="sm" 
                              onClick={() => toggleRegraAtiva(k.id, k.ativo)}
                              className={k.ativo ? "text-emerald-700 border-emerald-200 hover:bg-emerald-50" : ""}
                            >
                              {k.ativo ? 'Desativar' : 'Ativar'}
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => deleteRegra(k.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 font-mono bg-white p-3 rounded-md border border-gray-100 shadow-sm">
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
      </Tabs>
    </div>
  );
}
