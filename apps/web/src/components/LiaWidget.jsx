import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/context/AuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';

export default function LiaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [sessionId, setSessionId] = useState('');
  
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const { user } = useAuth();
  
  const inactivityTimerRef = useRef(null);

  // Initialize Session ID
  useEffect(() => {
    let sid = sessionStorage.getItem('lia_session_id');
    if (!sid) {
      sid = crypto.randomUUID();
      sessionStorage.setItem('lia_session_id', sid);
    }
    setSessionId(sid);
    
    // Load history if any (could fetch from backend, but keeping it light for now or relying on local state)
    const savedChat = sessionStorage.getItem('lia_chat_history');
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    }
  }, []);

  // Save history
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('lia_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Triggers (15s inactivity and Exit Intent)
  useEffect(() => {
    if (isDismissed || hasTriggered || isOpen) return;

    // Inactivity Trigger (15s)
    const resetTimer = () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (!isDismissed && !hasTriggered && !isOpen) {
        inactivityTimerRef.current = setTimeout(() => {
          triggerLia('inactivity');
        }, 15000);
      }
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('click', resetTimer);
    
    resetTimer();

    // Exit Intent Trigger
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !isDismissed && !hasTriggered && !isOpen) {
        triggerLia('exit_intent');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('click', resetTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [isDismissed, hasTriggered, isOpen]);

  // Route change resets triggers if not dismissed
  useEffect(() => {
    if (!isDismissed) {
      setHasTriggered(false);
    }
  }, [location.pathname, isDismissed]);

  const renderMessageWithLinks = (text) => {
    if (typeof text !== 'string') return text;
    
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <a 
          key={match.index} 
          href={match[2]} 
          className="text-[#B8860B] underline font-medium hover:text-[#9A7009] transition-colors"
        >
          {match[1]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };

  const triggerLia = (reason) => {
    setHasTriggered(true);
    setIsOpen(true);
    
    if (messages.length === 0) {
      let initialMsg = "Oi! Eu sou a Lia, sua consultora aqui na Avante. Posso te ajudar a encontrar a peça perfeita hoje? ✨";
      
      if (reason === 'exit_intent') {
        initialMsg = "Espera! Esqueceu alguma peça? Posso te mostrar nossas mais vendidas antes de você ir. 💖";
      } else if (location.pathname.includes('/produto/')) {
        initialMsg = "Esse aqui é um dos queridinhos da nossa loja! Quer que eu te ajude a escolher o tamanho certo?";
      } else if (location.pathname === '/carrinho') {
        initialMsg = "Vi que você separou peças lindas! ✨ Ficou com alguma dúvida sobre elas? Se precisar de ajuda para adicionar, trocar algum tamanho ou remover itens, eu estou aqui para ajudar. Se preferir, também posso te transferir para nossa equipe humana no WhatsApp clicando no botão abaixo!";
      }

      setMessages([{ role: 'assistant', content: initialMsg }]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await apiServerClient.fetch('/lia/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          mensagem: userMessage,
          contexto: {
            paginaAtual: location.pathname,
            valorCarrinho: '0,00', // Hook up to actual cart later if needed
          }
        })
      });

      const data = await response.json();
      
      if (data.sucesso) {
        if (data.pausada) {
          setMessages(prev => [...prev, { role: 'assistant', content: "✨ Uma de nossas consultoras humanas acabou de assumir o atendimento! Ela já vai te responder por aqui mesmo. Aguarde um instante! 💕" }]);
        } else {
          setMessages(prev => [...prev, { role: 'assistant', content: data.resposta }]);
        }
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Desculpe, tive um problema de conexão. Pode tentar novamente?" }]);
      }
    } catch (error) {
      console.error("Lia Chat Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Tive um pequeno soluço na minha conexão! 😅 Pode repetir, por favor?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const [imageError, setImageError] = useState(false);

  // ... (manter o restante igual e alterar o render do botão)
  if (isDismissed && !isOpen) return null;

  return (
    <div className="fixed bottom-0 right-4 md:right-8 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-6 w-[350px] sm:w-[380px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-[#B8860B]/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#1A1A1A] text-[#FDF0F0] p-4 flex items-center justify-between border-b border-[#B8860B]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#B8860B]/20 border border-[#B8860B]/50 flex items-center justify-center">
                <img 
                  src="https://lmdesignerweb.com/imagens/lia_avatar.png" 
                  alt="Lia" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <Sparkles className="w-5 h-5 text-[#B8860B] hidden" />
              </div>
              <div>
                <h3 className="font-semibold text-[15px]">Lia | Consultora Avante</h3>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Online
                </div>
              </div>
            </div>
            <button 
              onClick={() => { setIsOpen(false); setIsDismissed(true); }}
              className="text-[#FDF0F0]/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDF0F0]/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#1A1A1A] text-white rounded-tr-sm' 
                    : 'bg-white text-gray-800 border border-[#B8860B]/20 rounded-tl-sm'
                }`}>
                  {renderMessageWithLinks(msg.content)}
                  
                  {/* Renderiza o botão do WhatsApp se a Lia mencionar a palavra chave */}
                  {msg.content.includes('botão abaixo') && msg.content.includes('WhatsApp') && (
                    <a 
                      href="https://wa.me/5511999999999?text=Oi!%20Estava%20falando%20com%20a%20Lia%20no%20site%20e%20preciso%20de%20ajuda%20humana." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full font-medium text-xs hover:bg-[#20b858] transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Falar no WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#B8860B]/20 rounded-2xl rounded-tl-sm p-4 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-[#B8860B]/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#B8860B]/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#B8860B]/50 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input 
                placeholder="Escreva sua dúvida..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping}
                className="rounded-full focus-visible:ring-[#B8860B]/30"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!inputValue.trim() || isTyping}
                className="rounded-full bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 shrink-0"
              >
                {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button (Imagem da Lia Recortada ou Fallback) */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setHasTriggered(true); if(messages.length === 0) triggerLia('manual'); }}
          className={`relative group flex items-center justify-center transition-transform duration-500 hover:scale-105 origin-bottom animate-in slide-in-from-bottom-10 ${
            imageError 
              ? 'w-16 h-16 bg-[#1A1A1A] text-white rounded-full shadow-lg ring-2 ring-[#B8860B]/50' 
              : 'h-48 md:h-64 items-end'
          }`}
        >
          {messages.length > 0 && !isTyping && (
            <span className={`absolute flex z-10 ${imageError ? 'top-0 right-0 h-3 w-3' : 'top-4 right-4 h-4 w-4'}`}>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-red-500"></span>
            </span>
          )}
          
          {/* Balão de chamariz (opcional, aparece no hover) */}
          {!imageError && (
            <div className="absolute -top-6 right-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#1A1A1A] text-xs font-medium py-2 px-4 rounded-2xl rounded-br-sm shadow-xl border border-[#B8860B]/20 whitespace-nowrap z-10">
              Falar com a Lia ✨
            </div>
          )}

          {!imageError ? (
            <img 
              src="https://lmdesignerweb.com/imagens/lia_avatar.png" 
              alt="Falar com a Lia" 
              className="h-full w-auto object-contain drop-shadow-2xl filter contrast-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <MessageSquare className="w-6 h-6" />
          )}
        </button>
      )}
    </div>
  );
}
