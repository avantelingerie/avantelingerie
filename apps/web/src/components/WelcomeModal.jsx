import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog.jsx';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has already seen the modal
    const hasSeenModal = localStorage.getItem('avante_welcome_seen');
    
    if (!hasSeenModal) {
      // Small delay so it doesn't pop up instantly jarring the user
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('avante_welcome_seen', 'true');
  };

  const handleNavigate = () => {
    handleClose();
    navigate('/quero-revender');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleClose();
    }}>
      <DialogContent className="max-w-[90vw] md:max-w-2xl p-0 overflow-hidden bg-transparent border-none shadow-2xl [&>button]:hidden">
        <div className="relative group cursor-pointer" onClick={handleNavigate}>
          {/* We add an explicit close button just in case the one on the image isn't obvious or clickable enough */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-2 right-2 md:top-4 md:right-4 z-50 p-2 rounded-full bg-black/40 text-white hover:bg-black/80 transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
          
          <img 
            src="/popup-revenda.jpg" 
            alt="Compre Direto da Fábrica - Avante Lingerie" 
            className="w-full h-auto rounded-lg object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
