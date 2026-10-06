import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Bot, X, Send, Sparkles, AlertTriangle, ShieldCheck, 
  Copy, Check, FileCode, Package, RefreshCw, ChevronLeft, 
  ChevronRight, Minimize2, Terminal, Activity
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext.jsx';
import { toast } from 'sonner';

export default function NemotronAdminHUD() {
  const { currentAdmin, isAdminAuthenticated, adminPb } = useAdminAuth();
  const location = useLocation();

  const hasAdmin = isAdminAuthenticated || !!currentAdmin || !!adminPb?.authStore?.isValid;

  // Escuta evento customizado disparado pelo menu do Admin ou atalhos
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-nemotron-hud', handleOpen);
    return () => window.removeEventListener('open-nemotron-hud', handleOpen);
  }, []);

  // Se não for o administrador autenticado, o componente simplesmente não existe no DOM
  if (!hasAdmin) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'estoque' | 'auditor'
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Olá, Luiz! Sou o **Nemotron 550B**, sua Central Estratégica, Auditor de Código e Diretor de PCP da Avante Lingerie.\n\nEstou conectado ao seu e-commerce 24/7. O que gostaria de auditar ou calcular agora?`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState('');
  const [estoqueData, setEstoqueData] = useState(null);
  const [loadingEstoque, setLoadingEstoque] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll no chat
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Envio de prompt para o backend
  const handleSendMessage = async (customPrompt = null, customFilePath = null) => {
    const textToSend = customPrompt || inputValue.trim();
    if (!textToSend || isLoading) return;

    if (!customPrompt) setInputValue('');

    const newMessages = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const token = adminPb?.authStore?.token || '';
      const response = await fetch('/hcgi/api/nemotron/analisar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt: textToSend,
          pageContext: {
            path: location.pathname,
            title: document.title,
            adminEmail: currentAdmin?.email
          },
          arquivoPath: customFilePath || selectedFile || null
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || `Erro HTTP ${response.status}`);
      }

      const data = await response.json();
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: data.reply || 'Sem resposta do modelo.',
        modelUsed: data.modelUsed
      }]);
    } catch (err) {
      toast.error(`Falha no Nemotron: ${err.message}`);
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: `⚠️ **Erro na comunicação:** ${err.message}\n\nVerifique se o token de administrador está ativo ou se o servidor na VPS está acessível.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Copiar trecho de código formatado para repassar à Ada
  const copyCodeToAda = (text, index) => {
    const codeMatch = text.match(/```(?:[a-z]+)?\n([\s\S]*?)```/);
    const textToCopy = codeMatch ? codeMatch[1].trim() : text;

    navigator.clipboard.writeText(textToCopy);
    setCopiedIndex(index);
    toast.success('Código copiado! Cole na IDE para a Ada implementar.');
    setTimeout(() => setCopiedIndex(null), 3000);
  };

  // Disparar auditoria de estoque em tempo real
  const handleAuditarEstoque = async () => {
    setLoadingEstoque(true);
    setActiveTab('chat');
    await handleSendMessage('Faça um diagnóstico completo do estoque crítico da loja. Liste os SKUs com estoque <= 3, calcule o risco de ruptura para as próximas 48h e sugira as prioridades de corte e costura para a fábrica da Avante.');
    setLoadingEstoque(false);
  };

  // Disparar auditoria do arquivo selecionado
  const handleAuditarArquivo = (caminho) => {
    setSelectedFile(caminho);
    setActiveTab('chat');
    handleSendMessage(`Faça uma auditoria minuciosa e revisão de código no arquivo '${caminho}'. Aponte eventuais bugs, vazamentos de memória, melhorias de performance e me dê o código corrigido caso haja problemas.`, caminho);
  };

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {/* 1. BOTÃO FLUTUANTE "PERGUNTE AO CÉREBRO" (LATERAL ESQUERDA) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          title="Pergunte ao Cérebro (Nemotron 550B & PCP)"
          className={`fixed ${isAdminPage ? 'left-0 lg:left-64' : 'left-0'} top-1/2 -translate-y-1/2 z-[9999] group flex items-center bg-[#0c0d10]/95 hover:bg-[#15171f] text-white border-y-2 border-r-2 border-[#c59b5f]/70 hover:border-[#c59b5f] rounded-r-2xl p-1.5 shadow-[0_0_25px_rgba(197,155,95,0.35)] hover:shadow-[0_0_35px_rgba(197,155,95,0.65)] transition-all duration-300 hover:scale-105 focus:outline-none`}
        >
          <div className="relative flex items-center">
            {/* Arte 3D Cérebro com Ponto de Interrogação */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-[#c59b5f]/40 group-hover:border-[#c59b5f] transition-all bg-black flex items-center justify-center shadow-inner">
              <img 
                src="/pergunte-ao-cerebro.jpg" 
                alt="Pergunte ao Cérebro" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Ponto de Notificação / Liveness */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#0c0d10]"></span>
            </span>

            {/* Card Expansível de Curiosidade no Hover */}
            <div className="hidden group-hover:flex items-center gap-1.5 ml-2.5 pr-2 py-1 bg-[#141720]/95 border border-[#c59b5f]/50 rounded-lg shadow-xl whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-200">
              <span className="text-xs font-bold text-[#c59b5f] tracking-wide">Pergunte ao Cérebro</span>
              <span className="text-[10px] bg-[#c59b5f]/20 text-[#c59b5f] font-mono px-1 rounded font-semibold">550B</span>
            </div>
          </div>
        </button>
      )}

      {/* 2. JANELA MODAL POP-UP / DRAWER EXECUTIVO FLUTUANTE */}
      {isOpen && (
        <div className={`fixed ${isAdminPage ? 'left-2 lg:left-[270px]' : 'left-2 md:left-4'} top-1/2 -translate-y-1/2 z-[9999] w-[95vw] sm:w-[540px] md:w-[620px] h-[85vh] max-h-[720px] bg-[#0c0e12]/98 backdrop-blur-2xl border border-[#c59b5f]/40 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col text-white overflow-hidden animate-in fade-in zoom-in-95 duration-200`}>
          
          {/* HEADER DO POPUP */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#c59b5f]/20 bg-gradient-to-r from-[#14171f] to-[#0c0e12]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#c59b5f]/40 bg-black flex-shrink-0">
                <img src="/pergunte-ao-cerebro.jpg" alt="Cérebro" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-wide text-white">Central Nemotron & PCP</h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-mono font-medium">
                    550B Ultra
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 flex items-center gap-1.5 truncate max-w-[280px]">
                  <Activity className="w-3 h-3 text-[#c59b5f]" />
                  <span>Navegando: <strong className="text-gray-300 font-mono">{location.pathname}</strong></span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="Minimizar"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ABAS SUPERIORES (REORDENADAS) */}
          <div className="flex border-b border-white/10 bg-[#090b0e] text-xs">
            {/* 1. Copiloto Executivo (Diretor Comercial e Estratégico) */}
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2.5 px-3 font-medium transition-colors flex items-center justify-center gap-1.5 border-b-2 ${
                activeTab === 'chat'
                  ? 'border-[#c59b5f] text-[#c59b5f] bg-[#c59b5f]/5 font-semibold'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Copiloto Executivo</span>
            </button>

            {/* 2. Auditor de Código (Arquiteto de Software e Validador Técnico) */}
            <button
              onClick={() => setActiveTab('auditor')}
              className={`flex-1 py-2.5 px-3 font-medium transition-colors flex items-center justify-center gap-1.5 border-b-2 ${
                activeTab === 'auditor'
                  ? 'border-[#c59b5f] text-[#c59b5f] bg-[#c59b5f]/5 font-semibold'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Auditor de Código</span>
            </button>

            {/* 3. Radar Estoque & PCP (Diretor Industrial e de Fábrica) */}
            <button
              onClick={() => setActiveTab('estoque')}
              className={`flex-1 py-2.5 px-3 font-medium transition-colors flex items-center justify-center gap-1.5 border-b-2 ${
                activeTab === 'estoque'
                  ? 'border-[#c59b5f] text-[#c59b5f] bg-[#c59b5f]/5 font-semibold'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Radar Estoque & PCP</span>
            </button>
          </div>

          {/* CONTEÚDO PRINCIPAL DAS ABAS */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm custom-scrollbar bg-[#08090c]/50">
            {activeTab === 'chat' && (
              <>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl px-4 py-3 leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#c59b5f] text-black font-medium rounded-tr-sm shadow-md'
                          : 'bg-[#141720] border border-white/10 text-gray-200 rounded-tl-sm shadow-sm'
                      }`}
                    >
                      <div className="prose prose-invert prose-sm max-w-none break-words text-xs sm:text-sm">
                        {msg.content.split('\n').map((line, lIdx) => (
                          <p key={lIdx} className="mb-1.5 last:mb-0">
                            {line}
                          </p>
                        ))}
                      </div>

                      {/* Se a mensagem tiver bloco de código gerado pelo Nemotron */}
                      {msg.role === 'assistant' && msg.content.includes('```') && (
                        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                          <span className="text-[10px] text-gray-400 font-mono">Código auditado pronto</span>
                          <button
                            onClick={() => copyCodeToAda(msg.content, idx)}
                            className="flex items-center gap-1 text-[11px] bg-[#c59b5f]/20 hover:bg-[#c59b5f]/30 text-[#c59b5f] px-2.5 py-1 rounded-md border border-[#c59b5f]/40 transition-colors font-medium"
                          >
                            {copiedIndex === idx ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Copiado!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copiar para a Ada</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                    {msg.modelUsed && (
                      <span className="text-[9px] text-gray-500 mt-0.5 px-1 font-mono">
                        via {msg.modelUsed.includes('3.5') ? 'Nemotron Lightning' : 'Nemotron 550B Ultra'}
                      </span>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-gray-400 bg-[#141720] p-3 rounded-xl border border-white/10 w-fit">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#c59b5f]" />
                    <span>Nemotron 550B raciocinando dados da loja...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}

            {/* ABA 2: RADAR DE ESTOQUE & PCP */}
            {activeTab === 'estoque' && (
              <div className="space-y-4">
                <div className="bg-[#141720] border border-[#c59b5f]/30 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-[#c59b5f]" />
                    <span>Auditoria de Ruptura de Estoque (PCP Têxtil)</span>
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    Cruza as vendas dos últimos 7 dias com as peças zeradas ou com saldo crítico (≤ 3 unidades) para priorizar o corte na fábrica.
                  </p>
                  <button
                    onClick={handleAuditarEstoque}
                    disabled={loadingEstoque || isLoading}
                    className="w-full bg-[#c59b5f] hover:bg-[#d4aa6e] text-black font-semibold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingEstoque ? 'animate-spin' : ''}`} />
                    <span>Disparar Análise de Estoque Agora</span>
                  </button>
                </div>

                <div className="bg-[#141720] border border-white/10 p-3.5 rounded-xl space-y-2 text-xs">
                  <h5 className="font-semibold text-gray-300">Consultas Rápidas Sugeridas:</h5>
                  <button
                    onClick={() => {
                      setActiveTab('chat');
                      handleSendMessage('Com base no catálogo da Avante, quais 3 produtos de maior valor agregado têm menor concorrência no atacado e como devemos precificá-los?');
                    }}
                    className="w-full text-left p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                  >
                    💡 Precificação & Margem de Atacado B2B
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('chat');
                      handleSendMessage('Explique o cálculo de reposição FIFO para os conjuntos de renda considerando prazo médio de costura de 7 dias nas facções.');
                    }}
                    className="w-full text-left p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                  >
                    🏭 Lógica de Alocação de Facções (PCP)
                  </button>
                </div>
              </div>
            )}

            {/* ABA 3: AUDITOR DE CÓDIGO */}
            {activeTab === 'auditor' && (
              <div className="space-y-4">
                <div className="bg-[#141720] border border-white/10 p-4 rounded-xl space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-[#c59b5f]" />
                    <span>Inspecionar Arquivo do Projeto</span>
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Escolha um dos arquivos-chave abaixo para o Nemotron ler em disco, auditar a lógica e gerar o código de melhoria para a Ada:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      { nome: 'HomePage.jsx', path: 'apps/web/src/pages/HomePage.jsx' },
                      { nome: 'ProductPage.jsx', path: 'apps/web/src/pages/ProductPage.jsx' },
                      { nome: 'webhooks.js (Bling/Stripe)', path: 'apps/api/src/routes/webhooks.js' },
                      { nome: 'bling.js (Sincronização)', path: 'apps/api/src/routes/bling.js' },
                      { nome: 'guessNcm.js (Fiscal)', path: 'apps/web/src/utils/guessNcm.js' },
                      { nome: 'CartPage.jsx', path: 'apps/web/src/pages/CartPage.jsx' }
                    ].map((arq, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => handleAuditarArquivo(arq.path)}
                        className="p-2.5 rounded-lg bg-white/5 hover:bg-[#c59b5f]/15 hover:border-[#c59b5f]/40 border border-transparent text-left transition-all"
                      >
                        <p className="font-semibold text-white truncate">{arq.nome}</p>
                        <p className="text-[10px] text-gray-400 truncate font-mono">{arq.path}</p>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <label className="text-[11px] text-gray-400 block mb-1 font-mono">
                      Ou digite o caminho relativo de outro arquivo:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={selectedFile}
                        onChange={(e) => setSelectedFile(e.target.value)}
                        placeholder="apps/web/src/components/Header.jsx"
                        className="flex-1 bg-black/40 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c59b5f] font-mono"
                      />
                      <button
                        onClick={() => selectedFile && handleAuditarArquivo(selectedFile)}
                        disabled={!selectedFile || isLoading}
                        className="bg-[#c59b5f] hover:bg-[#d4aa6e] text-black font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                      >
                        Auditar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RODAPÉ DO CHAT / INPUT */}
          {activeTab === 'chat' && (
            <div className="p-3 border-t border-white/10 bg-[#090b0e]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Pergunte sobre estoque, PCP, cálculos ou peça revisão de código..."
                  disabled={isLoading}
                  className="flex-1 bg-[#141720] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c59b5f] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-[#c59b5f] hover:bg-[#d4aa6e] text-black p-2.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                  title="Enviar pergunta"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}
