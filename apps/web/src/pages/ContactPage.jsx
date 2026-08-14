import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  RefreshCw, 
  Truck, 
  HeartHandshake,
  HelpCircle,
  ChevronRight,
  Send
} from 'lucide-react';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const navigate = useNavigate();
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    order_number: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const checkOperatingHours = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hour = now.getHours();
      
      let isOpen = false;
      if (day >= 1 && day <= 4) {
        // Mon-Thu: 8h to 17h
        isOpen = hour >= 8 && hour < 17;
      } else if (day === 5) {
        // Fri: 8h to 13h
        isOpen = hour >= 8 && hour < 13;
      }
      setIsOpenNow(isOpen);
    };

    checkOperatingHours();
    const interval = setInterval(checkOperatingHours, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'E-mail inválido';
    
    if (!formData.phone.trim()) newErrors.phone = 'Telefone/WhatsApp é obrigatório';
    if (!formData.subject) newErrors.subject = 'Selecione um assunto';
    if (!formData.message.trim()) newErrors.message = 'Mensagem é obrigatória';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, preencha todos os campos obrigatórios corretamente.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await pb.collection('contact_messages').create(formData, { $autoCancel: false });
      toast.success('Mensagem enviada com sucesso! Retornaremos em breve.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        order_number: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFaqClick = (e, anchor) => {
    e.preventDefault();
    navigate(`/${anchor}`);
    setTimeout(() => {
      const el = document.getElementById(anchor.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const customStyles = `
    .contato-page-container {
      --color-black: #121212;
      --color-black-light: #1a1a1a;
      --color-gold: #c59b5f;
      --color-gold-dark: #a98048;
      --color-gold-light: #d6b384;
      --color-gold-bg: #FCF9F5;
      --color-white: #ffffff;
      --color-gray-50: #FFFBF8;
      --color-gray-100: #F3F1ED;
      --color-gray-200: #EAE6DF;
      --color-gray-600: #555555;
      --color-gray-800: #222222;
      
      --transition-smooth: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      --shadow-premium: 0 15px 35px rgba(197, 155, 95, 0.05), 0 5px 15px rgba(0, 0, 0, 0.02);
      --font-display: 'Playfair Display', serif;
      
      font-family: 'Inter', sans-serif;
      background-color: var(--color-gray-50);
      color: var(--color-gray-800);
      min-height: 100vh;
    }

    .contato-page-container .hero {
      background-color: var(--color-black);
      color: var(--color-white);
      padding: 9rem 2rem 6rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .contato-page-container .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at center, rgba(197, 155, 95, 0.08) 0%, transparent 70%);
      pointer-events: none;
    }

    .contato-page-container .hero h1 {
      font-family: var(--font-display);
      font-size: 3rem;
      font-weight: 500;
      margin-bottom: 1.25rem;
      color: var(--color-gold);
      letter-spacing: -0.02em;
    }

    .contato-page-container .hero p {
      font-size: 1.15rem;
      color: #EAE6DF;
      max-width: 600px;
      margin: 0 auto;
      font-weight: 300;
      letter-spacing: 0.02em;
    }

    .contato-page-container .info-cards-section {
      max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
      margin-top: -3rem;
      position: relative;
      z-index: 20;
      margin-bottom: 4rem;
    }

    .contato-page-container .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }

    .contato-page-container .info-card {
      background: var(--color-white);
      border-radius: 1.25rem;
      padding: 2rem 1.5rem;
      box-shadow: var(--shadow-premium);
      border: 1px solid rgba(197, 155, 95, 0.12);
      text-align: center;
      transition: var(--transition-smooth);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .contato-page-container .info-card:hover {
      transform: translateY(-6px);
      border-color: var(--color-gold);
    }

    .contato-page-container .info-card .icon-wrapper {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.25rem;
      background-color: var(--color-gold-bg);
      color: var(--color-gold);
      border: 1px solid rgba(197, 155, 95, 0.15);
      transition: var(--transition-smooth);
    }

    .contato-page-container .info-card:hover .icon-wrapper {
      background-color: var(--color-gold);
      color: var(--color-black);
      transform: scale(1.05);
    }

    .contato-page-container .info-card h3 {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--color-black);
      margin-bottom: 0.5rem;
    }

    .contato-page-container .info-card p {
      font-size: 0.95rem;
      color: var(--color-gray-600);
      margin-bottom: 0;
      line-height: 1.5;
    }

    .contato-page-container .main-grid {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: 3rem;
      max-width: 1300px;
      margin: 0 auto 5rem;
      padding: 0 2rem;
    }

    .contato-page-container .form-card {
      background: var(--color-white);
      border-radius: 1.25rem;
      box-shadow: var(--shadow-premium);
      border: 1px solid rgba(197, 155, 95, 0.12);
      padding: 3.5rem;
    }

    .contato-page-container .form-card h2 {
      font-family: var(--font-display);
      font-size: 2.25rem;
      color: var(--color-black);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .contato-page-container .form-card p.subtitle {
      color: var(--color-gray-600);
      font-size: 1.05rem;
      margin-bottom: 2.5rem;
    }

    .contato-page-container .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .contato-page-container label {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--color-black);
      letter-spacing: 0.02em;
    }

    .contato-page-container input,
    .contato-page-container select,
    .contato-page-container textarea {
      width: 100%;
      padding: 1rem 1.25rem;
      border-radius: 0.75rem;
      border: 1px solid var(--color-gray-200);
      background-color: var(--color-white);
      color: var(--color-gray-800);
      font-size: 0.95rem;
      transition: var(--transition-smooth);
      outline: none;
    }

    .contato-page-container input:focus,
    .contato-page-container select:focus,
    .contato-page-container textarea:focus {
      border-color: var(--color-gold);
      box-shadow: 0 0 0 4px rgba(197, 155, 95, 0.1);
      background-color: var(--color-gold-bg);
    }

    .contato-page-container .btn-submit {
      width: 100%;
      background-color: var(--color-gold);
      color: var(--color-black);
      font-weight: 700;
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 1.15rem 2rem;
      border-radius: 0.75rem;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      transition: var(--transition-smooth);
      box-shadow: 0 8px 25px rgba(197, 155, 95, 0.25);
    }

    .contato-page-container .btn-submit:hover {
      background-color: var(--color-white);
      color: var(--color-gold-dark);
      border: 1px solid var(--color-gold);
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(197, 155, 95, 0.35);
    }

    .contato-page-container .btn-submit:active {
      transform: translateY(0);
    }

    .contato-page-container .sidebar-column {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .contato-page-container .whatsapp-card {
      background-color: var(--color-black);
      color: var(--color-white);
      border-radius: 1.25rem;
      padding: 3rem 2.25rem;
      border: 1px solid rgba(197, 155, 95, 0.15);
      position: relative;
      overflow: hidden;
      box-shadow: var(--shadow-premium);
    }

    .contato-page-container .whatsapp-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at top right, rgba(37, 211, 102, 0.1) 0%, transparent 60%);
      pointer-events: none;
    }

    .contato-page-container .whatsapp-card .icon-circle {
      width: 4rem;
      height: 4rem;
      background-color: rgba(37, 211, 102, 0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #25D366;
      border: 1px solid rgba(37, 211, 102, 0.2);
      margin-bottom: 2rem;
    }

    .contato-page-container .whatsapp-card h3 {
      font-family: var(--font-display);
      font-size: 1.5rem;
      color: var(--color-gold);
      margin-bottom: 0.75rem;
      font-weight: 500;
    }

    .contato-page-container .whatsapp-card p {
      font-size: 0.95rem;
      color: #EAE6DF;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .contato-page-container .btn-whatsapp {
      width: 100%;
      background-color: #25D366;
      color: var(--color-black);
      font-weight: 700;
      padding: 1.15rem;
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      text-decoration: none;
      transition: var(--transition-smooth);
      box-shadow: 0 8px 25px rgba(37, 211, 102, 0.25);
    }

    .contato-page-container .btn-whatsapp:hover {
      background-color: #20BA56;
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(37, 211, 102, 0.35);
    }

    .contato-page-container .hours-card,
    .contato-page-container .faq-card {
      background: var(--color-white);
      border-radius: 1.25rem;
      padding: 2.25rem;
      box-shadow: var(--shadow-premium);
      border: 1px solid rgba(197, 155, 95, 0.12);
    }

    .contato-page-container .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.75rem;
    }

    .contato-page-container .card-title-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .contato-page-container .card-title-icon {
      width: 2.5rem;
      height: 2.5rem;
      background-color: var(--color-gold-bg);
      color: var(--color-gold);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(197, 155, 95, 0.15);
    }

    .contato-page-container .card-header h3 {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--color-black);
    }

    .contato-page-container .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 1rem;
      border-radius: 2rem;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .contato-page-container .status-badge.open {
      background-color: rgba(37, 211, 102, 0.1);
      color: #1E823E;
      border: 1px solid rgba(37, 211, 102, 0.2);
    }

    .contato-page-container .status-badge.closed {
      background-color: var(--color-gray-100);
      color: var(--color-gray-600);
      border: 1px solid var(--color-gray-200);
    }

    .contato-page-container .hours-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid var(--color-gray-100);
      font-size: 0.95rem;
    }

    .contato-page-container .hours-row:last-child {
      border-bottom: none;
    }

    .contato-page-container .hours-day {
      color: var(--color-gray-600);
      font-weight: 500;
    }

    .contato-page-container .hours-time {
      color: var(--color-black);
      font-weight: 600;
    }

    .contato-page-container .faq-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
      border-radius: 0.75rem;
      text-decoration: none;
      transition: var(--transition-smooth);
      border: 1px solid transparent;
      margin-bottom: 0.5rem;
    }

    .contato-page-container .faq-link:last-child {
      margin-bottom: 0;
    }

    .contato-page-container .faq-link:hover {
      background-color: var(--color-gold-bg);
      border-color: rgba(197, 155, 95, 0.2);
      transform: translateX(5px);
    }

    .contato-page-container .faq-text {
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--color-gray-800);
      transition: var(--transition-smooth);
    }

    .contato-page-container .faq-link:hover .faq-text {
      color: var(--color-gold-dark);
    }

    .contato-page-container .faq-arrow {
      color: var(--color-gray-200);
      transition: var(--transition-smooth);
    }

    .contato-page-container .faq-link:hover .faq-arrow {
      color: var(--color-gold);
      transform: translateX(3px);
    }

    @media (max-width: 1024px) {
      .contato-page-container .main-grid {
        grid-template-columns: 1fr;
        padding: 0 1.5rem;
        gap: 2rem;
      }
      .contato-page-container .form-card {
        padding: 2.5rem 2rem;
      }
      .contato-page-container .hero {
        padding: 8rem 1.5rem 5rem;
      }
      .contato-page-container .hero h1 {
        font-size: 2.25rem;
      }
    }
  `;

  return (
    <div className="contato-page-container">
      <style>{customStyles}</style>
      <Helmet>
        <title>Contato | Avante Lingerie</title>
        <meta name="description" content="Fale com a Avante Lingerie. Estamos aqui para ajudar em cada etapa da sua compra." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="hero">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contato
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Fale com a Gente! Estamos aqui para ajudar em cada etapa da sua compra.
        </motion.p>
      </section>

      {/* INFO CARDS */}
      <section className="info-cards-section">
        <div className="info-grid">
          {[
            { icon: Mail, title: 'E-mail', text: 'contato@avantelingerie.com.br' },
            { icon: MessageCircle, title: 'WhatsApp', text: '(22) 99761-8591' },
            { icon: Clock, title: 'Horário', text: 'Seg–Qui: 8h às 17h | Sex: 8h às 13h' },
            { icon: CheckCircle2, title: 'Resposta média', text: 'Até 24 horas úteis' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              className="info-card"
            >
              <div className="icon-wrapper">
                <item.icon className="w-5 h-5" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <section className="main-grid">
        {/* FORM COLUMN */}
        <div className="form-card">
          <h2>Envie uma mensagem</h2>
          <p className="subtitle">Preencha o formulário abaixo e retornaremos o mais breve possível.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="name">Nome completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'border-red-500 focus:ring-red-500' : ''}
                  placeholder="Seu nome"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">E-mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
                  placeholder="seu@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="phone">WhatsApp/Telefone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'border-red-500 focus:ring-red-500' : ''}
                  placeholder="(00) 00000-0000"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="order_number">Número do pedido <span className="text-gray-400 font-normal">(opcional)</span></label>
                <input
                  type="text"
                  id="order_number"
                  name="order_number"
                  value={formData.order_number}
                  onChange={handleChange}
                  placeholder="Ex: PED-123"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Assunto *</label>
              <div className="relative">
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'border-red-500 focus:ring-red-500' : ''}
                >
                  <option value="" disabled>Selecione um assunto</option>
                  <option value="Dúvida sobre pedido">Dúvida sobre pedido</option>
                  <option value="Prazo de entrega">Prazo de entrega</option>
                  <option value="Troca ou devolução">Troca ou devolução</option>
                  <option value="Financeiro / Pagamento">Financeiro / Pagamento</option>
                  <option value="Marketing / Parcerias">Marketing / Parcerias</option>
                  <option value="Privacidade (LGPD)">Privacidade (LGPD)</option>
                  <option value="Atacado / Revendas">Atacado / Revendas</option>
                  <option value="Outro assunto">Outro assunto</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensagem *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={errors.message ? 'border-red-500 focus:ring-red-500' : ''}
                placeholder="Como podemos te ajudar?"
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-submit"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar mensagem
                </>
              )}
            </button>
          </form>
        </div>

        {/* SIDEBAR COLUMN */}
        <div className="sidebar-column">
          {/* WhatsApp Card */}
          <div className="whatsapp-card">
            <div className="icon-circle">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3>Atendimento via WhatsApp</h3>
            <p>Resposta rápida nos horários de atendimento para solucionar suas dúvidas.</p>
            
            <a 
              href="https://wa.me/5522997618591" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle className="w-5 h-5" />
              Chamar no WhatsApp
            </a>
          </div>

          {/* Operating Hours Card */}
          <div className="hours-card">
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-title-icon">
                  <Clock className="w-5 h-5" />
                </div>
                <h3>Horário de atendimento</h3>
              </div>
              
              {isOpenNow ? (
                <span className="status-badge open">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E823E] animate-pulse"></span>
                  Aberto agora
                </span>
              ) : (
                <span className="status-badge closed">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  Fechado
                </span>
              )}
            </div>
            
            <div className="space-y-1">
              <div className="hours-row">
                <span className="hours-day">Segunda a Quinta</span>
                <span className="hours-time">8h às 17h</span>
              </div>
              <div className="hours-row">
                <span className="hours-day">Sexta-feira</span>
                <span className="hours-time">8h às 13h</span>
              </div>
              <div className="hours-row">
                <span className="hours-day">Sáb, Dom e Feriados</span>
                <span className="hours-time" style={{ color: 'var(--color-gray-600)', fontWeight: 500 }}>Fechado</span>
              </div>
            </div>
          </div>

          {/* Dúvidas Frequentes Card */}
          <div className="faq-card">
            <div className="card-header" style={{ marginBottom: '1.25rem' }}>
              <div className="card-title-group">
                <div className="card-title-icon">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3>Dúvidas frequentes</h3>
              </div>
            </div>
            
            <div className="flex flex-col">
              {[
                { q: 'Como rastrear meu pedido?', a: '#faq' },
                { q: 'Qual o prazo de troca?', a: '#faq' },
                { q: 'Vocês enviam para todo o Brasil?', a: '#faq' },
                { q: 'Como funciona o pagamento?', a: '#faq' }
              ].map((faq, idx) => (
                <a 
                  key={idx}
                  href="/#faq"
                  onClick={(e) => handleFaqClick(e, faq.a)}
                  className="faq-link"
                >
                  <span className="faq-text">{faq.q}</span>
                  <ChevronRight className="w-4 h-4 faq-arrow" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}