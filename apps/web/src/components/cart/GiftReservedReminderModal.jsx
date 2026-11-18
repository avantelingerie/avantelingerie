import React from 'react';
import { Gift, Sparkles, X, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog.jsx';
import { Button } from '@/components/ui/button.jsx';

/**
 * GiftReservedReminderModal
 * Pop-up de retenção disparado no carrinho quando o cliente já selecionou o presente VIP
 * e tenta sair da página (Exit-Intent).
 * 
 * Lembra o cliente que o presente já está reservado exclusivamente para ele e que
 * será perdido caso ele feche a aba sem concluir o pedido.
 */
export default function GiftReservedReminderModal({
  isOpen,
  onClose,
  onProceedToCheckout,
  chosenGiftName = 'Aplicativo VIP Exclusivo',
  isCombo = false
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-[94vw] p-0 border border-[#D4AF37]/50 rounded-3xl overflow-hidden bg-gradient-to-b from-[#18140F] via-[#0E0C09] to-[#080705] text-white shadow-[0_0_60px_rgba(212,175,55,0.3)] z-50">
        
        {/* Glow de fundo */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10 p-6 sm:p-8 flex flex-col items-center text-center">
          
          {/* Badge Superior */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#deb881] text-[11px] font-extrabold tracking-widest uppercase mb-4 animate-pulse">
            <Clock className="w-3.5 h-3.5 text-[#deb881]" />
            <span>Sua Reserva Está Ativa Por Poucos Minutos</span>
          </div>

          {/* Imagem Imponente da Caixa de Presente com Fita Vermelha */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 my-1 flex items-center justify-center">
            {/* Halo de luz dourada */}
            <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-2xl animate-pulse" />
            <img
              src="/assets/mimos/caixa-presente-ganhouu.png"
              alt="Presente VIP Reservado"
              className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(212,175,55,0.4)] animate-bounce duration-1000"
            />
          </div>

          {/* Título de Alto Impacto */}
          <h2 className="text-2xl sm:text-3.2xl font-serif font-extrabold text-white leading-tight mt-2">
            Espere! Seu <span className="bg-gradient-to-r from-[#deb881] via-[#FFF3B0] to-[#deb881] bg-clip-text text-transparent">Presente VIP</span> Já Está Reservado!
          </h2>

          {/* Descrição Persuasiva */}
          <p className="text-xs sm:text-sm text-gray-300 font-light mt-3 leading-relaxed max-w-md">
            Você garantiu o <strong className="text-white font-semibold">{chosenGiftName}</strong> {isCombo ? 'no Combo Especial' : '100% GRÁTIS'} da fábrica.
            Se você sair da sacola agora, sua reserva exclusiva será cancelada e o presente retornará ao estoque.
          </p>

          {/* Mini Callout de Garantia */}
          <div className="w-full mt-4 bg-white/5 border border-[#deb881]/25 rounded-2xl p-3 flex items-center justify-center gap-3 text-xs text-amber-200/90 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Acompanha suas peças no checkout seguro</span>
          </div>

          {/* Botão Principal de Ação (Garantir e Finalizar) */}
          <Button
            onClick={() => {
              onClose();
              onProceedToCheckout();
            }}
            className="w-full mt-6 bg-gradient-to-r from-[#deb881] via-[#c59b5f] to-[#b0874c] hover:from-[#c59b5f] hover:to-[#deb881] text-black font-black text-sm uppercase tracking-wider py-6 sm:py-7 rounded-2xl shadow-[0_8px_30px_rgba(197,155,95,0.4)] hover:shadow-[0_12px_40px_rgba(197,155,95,0.6)] transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Garantir Presente & Concluir Pedido</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </Button>

          {/* Link Secundário */}
          <button
            onClick={onClose}
            className="mt-3.5 text-xs text-gray-400 hover:text-white transition-colors underline underline-offset-4 font-light cursor-pointer"
          >
            Continuar editando minha sacola
          </button>

        </div>
      </DialogContent>
    </Dialog>
  );
}
