import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * OrderCelebrationOverlay
 * Efeito visual de celebração com arte oficial da Avante Lingerie 100% transparente
 * e chuva contínua de confetes coloridos em Canvas caindo do topo até a base da tela.
 * 
 * Dupla função de fechamento solicitada pelo lojista:
 * 1. Fecha com clique/toque em QUALQUER lugar da tela ou na própria imagem.
 * 2. Fecha automaticamente após 6.5 segundos (máximo 6 a 7 segundos) com fade-out suave.
 */
export default function OrderCelebrationOverlay({ isVisible, onClose }) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const canvasRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Sincroniza abertura quando isVisible muda
  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setIsFadingOut(false);
    } else {
      setShouldRender(false);
      setIsFadingOut(false);
    }
  }, [isVisible]);

  // Função de fechamento suave com transição de opacidade
  const handleDismiss = useCallback(() => {
    setIsFadingOut(true);
    setTimeout(() => {
      setShouldRender(false);
      setIsFadingOut(false);
      if (onCloseRef.current) {
        onCloseRef.current();
      }
    }, 350);
  }, []);

  // Timer automático de 6.5 segundos (entre 6 e 7s) e listener global de clique
  useEffect(() => {
    if (!isVisible || !shouldRender) return;

    // 1. Timer automático: fecha entre 6 e 7 segundos
    const timer = setTimeout(() => {
      handleDismiss();
    }, 6500);

    // 2. Fechamento ao clique/toque em QUALQUER ponto da janela ou da imagem
    let clickCleanup = null;
    const bindTimer = setTimeout(() => {
      const onGlobalClick = (e) => {
        e.stopPropagation();
        handleDismiss();
      };

      window.addEventListener('click', onGlobalClick, { capture: true, once: true });
      window.addEventListener('touchstart', onGlobalClick, { capture: true, once: true });

      clickCleanup = () => {
        window.removeEventListener('click', onGlobalClick, { capture: true });
        window.removeEventListener('touchstart', onGlobalClick, { capture: true });
      };
    }, 150);

    return () => {
      clearTimeout(timer);
      clearTimeout(bindTimer);
      if (clickCleanup) clickCleanup();
    };
  }, [isVisible, shouldRender, handleDismiss]);

  // Animação de confetes em Canvas nativo
  useEffect(() => {
    if (!isVisible || !shouldRender) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    // Paleta de confetes festiva, vibrante e nobre
    const colors = [
      '#deb881', // Ouro Nobre
      '#c59b5f', // Dourado Avante
      '#3b82f6', // Azul Real
      '#10b981', // Verde Esmeralda
      '#ef4444', // Vermelho Rubi
      '#8b5cf6', // Roxo Violeta
      '#f59e0b', // Amarelo Radiante
      '#ec4899', // Rosa Pink Nobre
      '#14b8a6', // Turquesa
      '#ffffff'  // Branco Puro
    ];

    const particleCount = 180;
    const particles = [];

    // Distribuição inicial por toda a altura da tela (topo, meio e base)
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 1.2) - (canvas.height * 0.2),
        w: Math.random() * 11 + 6,
        h: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5,
        speedX: (Math.random() - 0.5) * 2.5,
        speedY: Math.random() * 3.5 + 2.5,
        opacity: Math.random() * 0.3 + 0.7,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        // Recicla continuamente para o topo
        if (p.y > canvas.height + 25) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
          p.speedY = Math.random() * 3.5 + 2.5;
        }

        if (p.x < -20) p.x = canvas.width + 10;
        if (p.x > canvas.width + 20) p.x = -10;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    window.addEventListener('resize', updateCanvasSize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [isVisible, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      onClick={handleDismiss}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md transition-all duration-350 cursor-pointer select-none p-4 ${
        isFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Imagem Oficial com 100% de Transparência Externa (Sem bordas pretas) */}
      <div 
        onClick={handleDismiss}
        className="relative z-20 max-w-[360px] sm:max-w-[440px] md:max-w-[470px] w-full mx-auto text-center animate-in zoom-in-95 duration-500 flex items-center justify-center cursor-pointer"
      >
        <img
          src="/assets/celebration-banner.png"
          alt="Compra Realizada com Sucesso! Parabéns - Avante Lingerie"
          onClick={handleDismiss}
          className="w-full h-auto max-h-[82vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] block cursor-pointer transition-transform hover:scale-[1.01]"
        />
      </div>

      {/* Canvas dos Confetes Animados em Tela Cheia */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-30"
      />
    </div>
  );
}
