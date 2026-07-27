import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Instagram, Facebook, MessageCircle, Music2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';
import apiServerClient from '@/lib/apiServerClient.js';

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading
  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
  const [particles, setParticles] = useState([]);
  
  const [config, setConfig] = useState(null);
  const [isConfigLoading, setIsConfigLoading] = useState(true);

  // Fetch dynamic configuration
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await apiServerClient.fetch('/configuracoes/modo-em-breve');
        if (!res.ok) throw new Error('Failed to fetch config');
        const data = await res.json();
        setConfig(data);
      } catch (err) {
        console.error('Error fetching coming soon config:', err);
        // We will use fallback values if config fetch fails
      } finally {
        setIsConfigLoading(false);
      }
    };
    fetchConfig();
  }, []);

  // Generate fewer, slower background particles for premium elegant look
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1, // 1-4px
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${Math.random() * 20 + 25}s`, // 25-45s duration for extreme fluidity
      delay: `${Math.random() * 8}s`
    }));
    setParticles(newParticles);
  }, []);

  // Ultra-robust countdown timer logic
  useEffect(() => {
    const getTargetTime = () => {
      try {
        if (!config || !config.data_lancamento) {
          // Fallback target date if config is missing or loading
          return new Date(2026, 5, 16, 0, 0, 0).getTime(); // June 16, 2026 local time
        }

        const rawDate = config.data_lancamento;
        let year, month, day;

        // Try to parse DD/MM/YYYY format
        if (rawDate.includes('/')) {
          const parts = rawDate.split('/');
          if (parts.length >= 3) {
            day = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10);
            year = parseInt(parts[2].substring(0, 4), 10); // Extract year ignoring potential time part
          }
        } 
        // Try to parse YYYY-MM-DD or ISO formats
        else if (rawDate.includes('-')) {
          const datePart = rawDate.split('T')[0];
          const parts = datePart.split('-');
          if (parts.length >= 3) {
            year = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10);
            day = parseInt(parts[2], 10);
          }
        }

        // Validate parsed components
        if (
          year !== undefined && month !== undefined && day !== undefined && 
          !isNaN(year) && !isNaN(month) && !isNaN(day)
        ) {
          // Create date at local midnight
          const target = new Date(year, month - 1, day, 0, 0, 0).getTime();
          if (!isNaN(target)) return target;
        }

        // Fallback to native JS Date parsing if manual parsing failed
        const nativeDate = new Date(rawDate);
        if (!isNaN(nativeDate.getTime())) {
          nativeDate.setHours(0, 0, 0, 0); // Force local midnight
          return nativeDate.getTime();
        }

        throw new Error('Invalid date format provided');
      } catch (error) {
        console.error('Error parsing target date:', error);
        // Absolute fallback to avoid breaking the UI
        return new Date(2026, 5, 16, 0, 0, 0).getTime();
      }
    };

    const targetDate = getTargetTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // Handle past dates or invalid calculation (prevents NaN)
      if (isNaN(distance) || distance <= 0) {
        setTimeLeft({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
        return false; // Stop the interval
      }

      setTimeLeft({
        dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
        horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutos: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        segundos: Math.floor((distance % (1000 * 60)) / 1000)
      });
      
      return true; // Continue the interval
    };

    // Run initially to avoid 1-second delay
    const shouldContinue = updateTimer();
    if (!shouldContinue) return;

    // Start interval
    const interval = setInterval(() => {
      const keepGoing = updateTimer();
      if (!keepGoing) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [config]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      await pb.collection('leads_prelancamento').create({ 
        email,
        origem: 'coming_soon_page'
      }, { $autoCancel: false });
      
      toast.success('Pronto! Você será a primeira a saber. 💛');
      setEmail('');
    } catch (err) {
      console.error(err);
      toast.error('Erro ao cadastrar email. Tente novamente ou verifique se já está cadastrado.');
    } finally {
      setStatus('idle');
    }
  };

  const easeOut = [0.25, 1, 0.5, 1];

  const affiliatedLogos = [
    { 
      name: 'Versátil', 
      url: 'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/b6ebf950f6ace886ca2383ec2ee19aa3.png',
      width: 160,
      height: 100
    },
    { 
      name: 'Bella Íntima', 
      url: 'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/f51d937e04be6201411bebf4142d31a5.png',
      width: 180,
      height: 120
    },
    { 
      name: 'Jeito Feminino', 
      url: 'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/121ec8662af1d378656c5345c663d1e4.png',
      width: 220,
      height: 140
    },
    { 
      name: 'Mimo', 
      url: 'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/c9aac3a683c9c37054fd9d67d4c59909.png',
      width: 160,
      height: 100
    }
  ];

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ 
        background: 'radial-gradient(circle at center, #1a1525 0%, #0a0a12 100%)',
        fontFamily: "'Poppins', system-ui, sans-serif"
      }}
    >
      <Helmet>
        <title>Avante Lingerie — Em Breve</title>
        <meta name="description" content="Estamos preparando uma experiência única para você. Em breve, a Avante Lingerie abre suas portas." />
        <style type="text/css">{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@100;300;400;500&display=swap');
        `}</style>
      </Helmet>

      {/* Subtle Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              backgroundColor: '#c9a96e',
              opacity: 0,
              boxShadow: '0 0 12px rgba(201, 169, 110, 0.6)',
              animation: `float-slow ${p.duration} infinite ease-in-out ${p.delay}`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[900px] px-6 py-16 flex flex-col items-center text-center">
        
        {/* 1. Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: easeOut }}
          className="flex flex-col items-center relative mb-2"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#c9a96e] rounded-full blur-[100px] opacity-15 pointer-events-none"></div>
          
          <div style={{ animation: 'float-vertical 4s ease-in-out infinite' }}>
            <img 
              src="https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/044c91be3baada2ab03542c7a04777be.png" 
              alt="Avante Lingerie Logo" 
              className="w-[220px] md:w-[320px] h-auto object-contain mb-6 relative z-10"
              style={{ filter: 'drop-shadow(0 0 15px rgba(201,169,110,0.3))' }}
            />
          </div>
          
          <p className="font-thin text-[11px] md:text-[12px] tracking-[3px] uppercase text-[#c9a96e]">
            Lingerie que te faz avançar
          </p>
        </motion.div>

        {/* 2. Decorative Line */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: easeOut }}
          className="w-[60px] h-[1px] my-10 flex justify-center overflow-hidden"
        >
          <div 
            className="w-full h-full bg-[#c9a96e]" 
            style={{ animation: 'fade-pulse 3s ease-in-out infinite' }} 
          />
        </motion.div>

        {/* 3. Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: easeOut }}
          className="mb-12"
        >
          <h1 
            className="text-[32px] md:text-[48px] font-normal mb-6 text-[#f5f0e8] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
          >
            Algo incrível está chegando
          </h1>
          <p className="font-thin text-[#a09b94] text-[14px] md:text-[16px] leading-relaxed max-w-[500px] mx-auto">
            Estamos preparando uma experiência única para você. Em breve, a Avante Lingerie abre suas portas com conforto, confiança e muito estilo.
          </p>
        </motion.div>

        {/* 4. Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: easeOut }}
          className="mb-16 w-full flex justify-center"
        >
          <div className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-6 items-center justify-center">
            {[
              { label: 'DIAS', value: timeLeft.dias },
              { label: 'HORAS', value: timeLeft.horas },
              { label: 'MINUTOS', value: timeLeft.minutos },
              { label: 'SEGUNDOS', value: timeLeft.segundos }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white/5 backdrop-blur-[10px] border border-[#c9a96e]/20 rounded-lg p-4 w-full md:w-[110px] md:h-[110px] justify-center transition-colors hover:bg-white/10 hover:border-[#c9a96e]/40">
                <motion.span 
                  key={`${item.label}-${item.value}`}
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="text-[36px] md:text-[48px] font-bold text-white leading-none mb-2 inline-block"
                >
                  {item.value.toString().padStart(2, '0')}
                </motion.span>
                <span className="text-[10px] uppercase tracking-[2px] text-[#c9a96e] font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 5. Email Capture Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: easeOut }}
          className="w-full max-w-[460px] mb-16"
        >
          <h3 className="font-thin text-[18px] text-[#c9a96e] mb-6">
            Quer ser a primeira a saber?
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              required
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="flex-1 bg-transparent border border-[#c9a96e] rounded-sm text-[#f5f0e8] placeholder:text-[#a09b94]/50 px-5 py-4 focus:outline-none focus:shadow-[0_0_15px_rgba(201,169,110,0.2)] transition-all font-light text-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="sm:w-auto w-full text-white font-bold uppercase tracking-[1px] text-sm px-8 py-4 rounded-sm hover:shadow-[0_0_20px_rgba(201,169,110,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ 
                background: 'linear-gradient(135deg, #c9a96e, #d4af7a)'
              }}
            >
              {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin mx-auto text-white" /> : 'Me avise!'}
            </button>
          </form>
        </motion.div>

        {/* 6. Affiliated Stores Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.0, ease: easeOut }}
          className="w-full flex flex-col items-center mb-16"
        >
          <div className="w-[60px] h-[1px] flex justify-center overflow-hidden mb-12">
            <div 
              className="w-full h-full bg-[#c9a96e]" 
              style={{ animation: 'fade-pulse 3s ease-in-out infinite', animationDelay: '1.5s' }} 
            />
          </div>
          
          <h2 
            className="text-[24px] text-[#c9a96e] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nossas Afiliadas
          </h2>
          <p className="font-thin text-[14px] text-[#a09b94] mb-10 max-w-[400px]">
            Marcas parceiras que compartilham nosso compromisso com qualidade e elegância
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px] md:gap-[40px] items-center justify-items-center w-full max-w-[900px]">
            {affiliatedLogos.map((logo, idx) => {
              // Apply enhanced vivid silver filter to "Jeito Feminino"
              const isJeitoFeminino = logo.name === 'Jeito Feminino';
              const imageStyle = isJeitoFeminino 
                ? { filter: 'brightness(0) invert(0.85) brightness(1.4) contrast(1.3) drop-shadow(0 0 5px rgba(255,255,255,0.3))' } 
                : {};

              return (
                <div 
                  key={idx} 
                  className="flex items-center justify-center p-2 opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300 ease-out cursor-pointer"
                  style={{ 
                    width: '100%', 
                    maxWidth: `${logo.width}px`, 
                    height: `${logo.height}px` 
                  }}
                >
                  <img 
                    src={logo.url} 
                    alt={`Logo ${logo.name}`} 
                    className="w-full h-full object-contain"
                    style={imageStyle}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 7. Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5, ease: easeOut }}
          className="flex justify-center gap-10 mb-16"
        >
          <a 
            href={config?.instagram_url || "#"} 
            target={config?.instagram_url ? "_blank" : "_self"}
            rel={config?.instagram_url ? "noopener noreferrer" : ""}
            className="text-[#6b6560] hover:text-[#c9a96e] transition-colors duration-300"
          >
            <Instagram strokeWidth={1.5} className="w-6 h-6" />
            <span className="sr-only">Instagram</span>
          </a>
          <a 
            href={config?.facebook_url || "#"} 
            target={config?.facebook_url ? "_blank" : "_self"}
            rel={config?.facebook_url ? "noopener noreferrer" : ""}
            className="text-[#6b6560] hover:text-[#c9a96e] transition-colors duration-300"
          >
            <Facebook strokeWidth={1.5} className="w-6 h-6" />
            <span className="sr-only">Facebook</span>
          </a>
          <a 
            href={config?.whatsapp_url || "#"} 
            target={config?.whatsapp_url ? "_blank" : "_self"}
            rel={config?.whatsapp_url ? "noopener noreferrer" : ""}
            className="text-[#6b6560] hover:text-[#c9a96e] transition-colors duration-300"
          >
            <MessageCircle strokeWidth={1.5} className="w-6 h-6" />
            <span className="sr-only">WhatsApp</span>
          </a>
          <a 
            href={config?.tiktok_url || "#"} 
            target={config?.tiktok_url ? "_blank" : "_self"}
            rel={config?.tiktok_url ? "noopener noreferrer" : ""}
            className="text-[#6b6560] hover:text-[#c9a96e] transition-colors duration-300"
          >
            <Music2 strokeWidth={1.5} className="w-6 h-6" />
            <span className="sr-only">TikTok</span>
          </a>
        </motion.div>

        {/* 8. Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.0, ease: easeOut }}
          className="mt-auto pt-10"
        >
          <p className="text-[11px] text-[#4a4540] font-light tracking-wide">
            © 2026 Avante Lingerie — Todos os direitos reservados
          </p>
        </motion.div>
      </div>
    </div>
  );
}