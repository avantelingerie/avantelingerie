import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

export default function CentralDaClientePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('politica-de-privacidade');
  const [activeFaq, setActiveFaq] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      const sections = [
        'politica-de-privacidade',
        'termos-de-uso',
        'trocas-e-devolucoes',
        'fale-conosco',
        'perguntas-frequentes'
      ];

      let currentSection = sections[0];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      scrollToElement(id);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    scrollToElement(id);
    window.history.pushState(null, '', `#${id}`);
    setActiveSection(id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const customStyles = `
    .central-cliente-container {
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
      padding-bottom: 5rem;
    }

    .central-cliente-container .hero {
      background-color: var(--color-black);
      color: var(--color-white);
      padding: 9rem 2rem 6rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .central-cliente-container .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at center, rgba(197, 155, 95, 0.08) 0%, transparent 70%);
      pointer-events: none;
    }

    .central-cliente-container .hero h1 {
      font-family: var(--font-display);
      font-size: 3rem;
      font-weight: 500;
      margin-bottom: 1.25rem;
      color: var(--color-gold);
      letter-spacing: -0.02em;
    }

    .central-cliente-container .hero p {
      font-size: 1.15rem;
      color: #EAE6DF;
      max-width: 600px;
      margin: 0 auto;
      font-weight: 300;
      letter-spacing: 0.02em;
    }

    .central-cliente-container .layout-grid {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 3rem;
      max-width: 1300px;
      margin: -3rem auto 0;
      padding: 0 2rem;
      position: relative;
      z-index: 10;
    }

    .central-cliente-container .sidebar {
      position: sticky;
      top: 120px;
      align-self: start;
      background: var(--color-white);
      border-radius: 1.25rem;
      box-shadow: var(--shadow-premium);
      padding: 2rem 1.5rem;
      border: 1px solid rgba(197, 155, 95, 0.12);
    }

    .central-cliente-container .sidebar-menu {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .central-cliente-container .sidebar-menu li a {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      color: var(--color-gray-600);
      text-decoration: none;
      border-radius: 0.75rem;
      transition: var(--transition-smooth);
      font-weight: 500;
      font-size: 0.95rem;
      letter-spacing: 0.01em;
    }

    .central-cliente-container .sidebar-menu li a:hover {
      background-color: var(--color-gold-bg);
      color: var(--color-gold-dark);
      transform: translateX(6px);
    }

    .central-cliente-container .sidebar-menu li a.active {
      background-color: var(--color-gold-bg);
      color: var(--color-gold);
      font-weight: 600;
      border-left: 3px solid var(--color-gold);
      border-radius: 0 0.75rem 0.75rem 0;
    }

    .central-cliente-container .sidebar-menu li a i {
      font-size: 1.1rem;
      color: var(--color-gold);
      transition: var(--transition-smooth);
    }

    .central-cliente-container .main-content {
      background: var(--color-white);
      border-radius: 1.25rem;
      box-shadow: var(--shadow-premium);
      padding: 4rem;
      border: 1px solid rgba(197, 155, 95, 0.12);
    }

    .central-cliente-container section {
      margin-bottom: 5rem;
    }

    .central-cliente-container section:last-child {
      margin-bottom: 0;
    }

    .central-cliente-container h2 {
      font-family: var(--font-display);
      font-size: 2.25rem;
      color: var(--color-black);
      margin-bottom: 2.25rem;
      position: relative;
      padding-bottom: 1rem;
      scroll-margin-top: 140px;
      font-weight: 500;
    }

    .central-cliente-container h2::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 2px;
      background-color: var(--color-gold);
    }

    .central-cliente-container h3 {
      font-family: var(--font-display);
      font-size: 1.5rem;
      color: var(--color-gold-dark);
      margin-top: 3rem;
      margin-bottom: 1.25rem;
      scroll-margin-top: 140px;
      font-weight: 500;
    }

    .central-cliente-container p {
      line-height: 1.8;
      margin-bottom: 1.75rem;
      font-size: 1.05rem;
      color: var(--color-gray-600);
    }

    .central-cliente-container ul, 
    .central-cliente-container ol {
      margin-bottom: 1.75rem;
    }

    .central-cliente-container hr {
      border: 0;
      height: 1px;
      background: var(--color-gray-200);
      margin: 3.5rem 0;
    }

    .central-cliente-container .quick-summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 2rem;
      margin-bottom: 3.5rem;
    }

    .central-cliente-container .summary-card {
      background: var(--color-white);
      border: 1px solid rgba(197, 155, 95, 0.1);
      border-radius: 1rem;
      padding: 2.25rem 1.75rem;
      text-align: center;
      transition: var(--transition-smooth);
      box-shadow: 0 4px 20px rgba(0,0,0,0.01);
    }

    .central-cliente-container .summary-card h4 {
      font-family: var(--font-display);
      font-weight: 500;
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
      color: var(--color-black);
    }

    .central-cliente-container .summary-card p {
      font-size: 0.95rem;
      color: var(--color-gray-600);
      margin-bottom: 0;
      line-height: 1.6;
    }

    .central-cliente-container .summary-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-premium);
      border-color: var(--color-gold);
    }

    .central-cliente-container .summary-icon {
      font-size: 2.25rem;
      color: var(--color-gold);
      margin-bottom: 1.25rem;
      display: inline-block;
    }

    .central-cliente-container .trust-strip {
      background: var(--color-black);
      color: var(--color-gold-light);
      padding: 1.5rem;
      text-align: center;
      font-weight: 500;
      letter-spacing: 0.05em;
      border-radius: 1rem;
      border: 1px solid rgba(197, 155, 95, 0.15);
    }

    .central-cliente-container .trust-strip .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.9rem;
      text-transform: uppercase;
    }

    .central-cliente-container .gold-alert {
      background-color: var(--color-gold-bg);
      border-left: 3px solid var(--color-gold);
      padding: 2rem;
      margin: 2.5rem 0;
      color: var(--color-gray-800);
      border-radius: 0 1rem 1rem 0;
      box-shadow: 0 4px 15px rgba(197, 155, 95, 0.03);
    }

    .central-cliente-container .policy-table {
      width: 100%;
      border-collapse: collapse;
      margin: 2.5rem 0;
      border: 1px solid var(--color-gray-200);
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.01);
    }

    .central-cliente-container .policy-table th,
    .central-cliente-container .policy-table td {
      padding: 1.25rem 1.5rem;
      text-align: left;
      border-bottom: 1px solid var(--color-gray-200);
      font-size: 0.95rem;
    }

    .central-cliente-container .policy-table th {
      background-color: var(--color-gold-bg);
      font-weight: 600;
      color: var(--color-gold-dark);
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .central-cliente-container .policy-table tr:last-child td {
      border-bottom: none;
    }

    .central-cliente-container .btn-scroll-top {
      position: fixed;
      bottom: 2.5rem;
      right: 2.5rem;
      background-color: var(--color-black);
      color: var(--color-gold);
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-center;
      border: 1px solid var(--color-gold);
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: var(--transition-smooth);
      z-index: 50;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }

    .central-cliente-container .btn-scroll-top.show {
      opacity: 1;
      visibility: visible;
    }

    .central-cliente-container .btn-scroll-top:hover {
      background-color: var(--color-gold);
      color: var(--color-black);
      transform: translateY(-5px);
    }

    .central-cliente-container .faq-container {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .central-cliente-container .faq-item {
      border: 1px solid var(--color-gray-200);
      border-radius: 1rem;
      overflow: hidden;
      transition: var(--transition-smooth);
      background: var(--color-white);
    }

    .central-cliente-container .faq-item.active {
      border-color: var(--color-gold);
      box-shadow: 0 4px 20px rgba(197, 155, 95, 0.05);
    }

    .central-cliente-container .faq-question {
      background: var(--color-white);
      padding: 1.5rem 2rem;
      font-weight: 500;
      font-family: var(--font-display);
      font-size: 1.15rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border: none;
      text-align: left;
      color: var(--color-black);
      transition: var(--transition-smooth);
    }

    .central-cliente-container .faq-question:hover {
      color: var(--color-gold);
    }

    .central-cliente-container .faq-answer {
      padding: 0 2rem 2.25rem;
      background: var(--color-white);
    }

    .central-cliente-container .faq-answer p {
      margin-bottom: 0;
      font-size: 1rem;
      line-height: 1.7;
    }

    .central-cliente-container .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 2rem;
      margin: 2.5rem 0;
    }

    .central-cliente-container .contact-card {
      background-color: var(--color-gold-bg);
      border: 1px solid rgba(197, 155, 95, 0.1);
      border-radius: 1rem;
      padding: 2.5rem 2rem;
      text-align: center;
      transition: var(--transition-smooth);
    }

    .central-cliente-container .contact-card:hover {
      transform: translateY(-8px);
      border-color: var(--color-gold);
      box-shadow: var(--shadow-premium);
    }

    .central-cliente-container .contact-card i {
      font-size: 2.5rem;
      color: var(--color-gold);
      margin-bottom: 1.5rem;
    }

    .central-cliente-container .contact-card h5 {
      font-family: var(--font-display);
      color: var(--color-black);
      font-size: 1.3rem;
      margin-bottom: 0.75rem;
      font-weight: 500;
    }

    .central-cliente-container .contact-card p {
      font-size: 0.95rem;
      color: var(--color-gray-600);
      margin: 0.5rem 0 0;
      line-height: 1.5;
    }

    @media (max-width: 1024px) {
      .central-cliente-container .layout-grid {
        grid-template-columns: 1fr;
        margin-top: -2rem;
        gap: 2rem;
      }
      
      .central-cliente-container .sidebar {
        position: static;
        padding: 1.5rem;
      }
      
      .central-cliente-container .main-content {
        padding: 2.5rem 2rem;
      }

      .central-cliente-container .hero {
        padding: 8rem 1.5rem 5rem;
      }

      .central-cliente-container .hero h1 {
        font-size: 2.25rem;
      }
    }
  `;

  const faqData = [
    {
      q: "Posso solicitar a troca ou devolução de calcinhas?",
      a: "Por motivos óbvios de higiene pessoal e saúde pública, <strong>não realizamos troca ou devolução por arrependimento de calcinhas, bodies ou meias-calças</strong>. A única exceção é se as peças apresentarem defeitos comprovados de fabricação ou forem entregues de forma incorreta por nossa equipe."
    },
    {
      q: "Como funciona o desconto progressivo de revenda (B2B)?",
      a: "Disponibilizamos um canal diferenciado de compras voltado ao atacado para revendedoras qualificadas. Esse programa oferece descontos progressivos automáticos atrelados ao volume (10%, 15% ou 20%). A aprovação de cadastro de revendedora é rápida e individual."
    },
    {
      q: "Qual o prazo e meio de recebimento do reembolso?",
      a: "Os reembolsos são processados na mesma forma de pagamento da compra original e somente após o produto devolvido passar por análise técnica (que leva até 2 dias úteis): no <strong>PIX</strong>, o valor é creditado em até <strong>7 dias úteis</strong>; no <strong>cartão de crédito</strong>, a solicitação é feita de imediato à Stripe e o crédito pode constar em até <strong>2 faturas subsequentes</strong>."
    }
  ];

  return (
    <div className="central-cliente-container">
      <style>{customStyles}</style>
      <Helmet>
        <title>Central da Cliente | Avante Lingerie</title>
        <meta name="description" content="Encontre respostas e soluções para suas dúvidas na Central da Cliente Avante Lingerie." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="hero">
        <h1>Central da Cliente</h1>
        <p>Transparência, segurança e respeito em todas as etapas da sua compra.</p>
      </div>

      <div className="layout-grid">
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li>
              <a
                href="#politica-de-privacidade"
                onClick={(e) => handleNavClick(e, 'politica-de-privacidade')}
                className={activeSection === 'politica-de-privacidade' ? 'active' : ''}
              >
                <i className="fas fa-shield-alt"></i>
                Privacidade
              </a>
            </li>
            <li>
              <a
                href="#termos-de-uso"
                onClick={(e) => handleNavClick(e, 'termos-de-uso')}
                className={activeSection === 'termos-de-uso' ? 'active' : ''}
              >
                <i className="fas fa-file-contract"></i>
                Termos & Compras
              </a>
            </li>
            <li>
              <a
                href="#trocas-e-devolucoes"
                onClick={(e) => handleNavClick(e, 'trocas-e-devolucoes')}
                className={activeSection === 'trocas-e-devolucoes' ? 'active' : ''}
              >
                <i className="fas fa-exchange-alt"></i>
                Trocas & Reembolsos
              </a>
            </li>
            <li>
              <a
                href="#fale-conosco"
                onClick={(e) => handleNavClick(e, 'fale-conosco')}
                className={activeSection === 'fale-conosco' ? 'active' : ''}
              >
                <i className="fas fa-headset"></i>
                Atendimento
              </a>
            </li>
          </ul>
        </aside>

        <div className="main-content">

          <div className="quick-summary-grid">
            <div className="summary-card">
              <i className="fas fa-shield-halved summary-icon"></i>
              <h4>Compra 100% Segura</h4>
              <p>Seus dados protegidos com criptografia de ponta a ponta.</p>
            </div>
            <div className="summary-card">
              <i className="fas fa-box-open summary-icon"></i>
              <h4>Troca Simplificada</h4>
              <p>Troca por arrependimento em até 7 dias, ou por defeito em até 30 dias.</p>
            </div>
            <div className="summary-card">
              <i className="fas fa-truck-fast summary-icon"></i>
              <h4>Entrega Garantida</h4>
              <p>Rastreamento em tempo real e seguro contra extravios.</p>
            </div>
          </div>

          <div className="trust-strip flex flex-wrap justify-center gap-6 items-center mb-12">
            <span className="badge"><i className="fas fa-lock"></i> SSL Criptografado</span>
            <span className="badge"><i className="fas fa-check-circle"></i> Compra Garantida</span>
            <span className="badge"><i className="fas fa-file-shield"></i> LGPD Conforme</span>
            <div className="payment-icons flex gap-3 text-2xl ml-4">
              <i className="fa-brands fa-pix"></i>
              <i className="fa-brands fa-cc-visa"></i>
              <i className="fa-brands fa-cc-mastercard"></i>
              <i className="fa-brands fa-cc-stripe"></i>
            </div>
          </div>

          <section id="politica-de-privacidade">
            <h2>1. Política de Privacidade</h2>
            <p>
              A Avante Lingerie, sediada na Rua Odenir Pinheiro, nº 20 - 3º Andar, Loteamento Nosso Sonho - Olaria, Nova Friburgo, RJ, CEP: 28623-620, valoriza a sua privacidade e garante a segurança dos seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </p>

            <h3 id="politica-dados">1.1. Coleta de Dados</h3>
            <p>
              Coletamos informações que você nos fornece diretamente ao criar uma conta, realizar uma compra, participar de promoções ou assinar nossa newsletter. Isso inclui: nome completo, endereço de e-mail, CPF, endereço de entrega, telefone e dados de pagamento.
            </p>

            <h3 id="politica-uso">1.2. Uso dos Dados</h3>
            <div className="gold-alert">
              <strong className="block mb-2 text-lg"><i className="fas fa-info-circle mr-2"></i>Aviso sobre seus Dados</strong>
              <p className="m-0">
                Seus dados são tratados com o mais alto nível de segurança e privacidade. Nós da Avante Lingerie garantimos que nunca venderemos ou repassaremos suas informações pessoais para terceiros não autorizados.
              </p>
            </div>
            <p>
              Utilizamos seus dados para processar pedidos, melhorar sua experiência de compra e enviar comunicações relevantes. Veja o detalhamento das finalidades abaixo:
            </p>

            <table className="policy-table">
              <thead>
                <tr>
                  <th>Finalidade</th>
                  <th>Base Legal (LGPD)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Identificação, faturamento e emissão de nota fiscal</td>
                  <td>Execução de Contrato / Obrigação Legal</td>
                </tr>
                <tr>
                  <td>Atualizações de status do pedido e marketing</td>
                  <td>Consentimento / Legítimo Interesse</td>
                </tr>
                <tr>
                  <td>Cálculo de frete e entrega de produtos físicos</td>
                  <td>Execução de Contrato</td>
                </tr>
                <tr>
                  <td>Personalização da experiência e análises de tráfego</td>
                  <td>Consentimento</td>
                </tr>
                <tr>
                  <td>Prevenção a fraudes e segurança da plataforma</td>
                  <td>Legítimo Interesse</td>
                </tr>
              </tbody>
            </table>

            <h3 id="politica-compartilhamento">1.3. Compartilhamento de Informações</h3>
            <p>
              Compartilhamos seus dados apenas com parceiros estritamente necessários para a operação do nosso e-commerce, como transportadoras (para viabilizar a entrega) e gateways de pagamento (para processamento financeiro seguro). Exigimos que todos os nossos parceiros cumpram rigorosamente as normas de proteção de dados.
            </p>

            <h3 id="politica-seguranca">1.4. Segurança dos Dados</h3>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais avançadas, incluindo criptografia SSL de ponta a ponta, para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição acidental.
            </p>

            <h3 id="politica-direitos">1.5. Seus Direitos (LGPD)</h3>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de solicitar acesso, correção, atualização, exclusão ou portabilidade dos seus dados pessoais a qualquer momento. Para exercer esses direitos, entre em contato com nossa equipe de privacidade.
            </p>

            <h3 id="politica-contato">1.6. Contato e Encarregado de Dados</h3>
            <p className="mb-4">
              Se você tiver dúvidas sobre esta Política de Privacidade, sobre o tratamento de seus dados pessoais, ou caso deseje exercer seus direitos previstos na LGPD, entre em contato com nosso Encarregado de Proteção de Dados (DPO) através dos seguintes canais:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 leading-relaxed pl-4">
              <li className="mb-2"><strong>E-mail:</strong> privacidade@avantelingerie.com.br</li>
              <li className="mb-2"><strong>WhatsApp:</strong> (22) 99761-8591</li>
              <li><strong>Endereço Postal:</strong> Rua Odenir Pinheiro, nº 20 - 3º Andar, Loteamento Nosso Sonho - Olaria, Nova Friburgo, RJ, CEP: 28623-620</li>
            </ul>
          </section>

          <hr />

          <section id="termos-de-uso">
            <h2>2. Termos de Uso e Condições de Compra</h2>

            <div className="gold-alert">
              <strong className="block mb-2 text-lg"><i className="fas fa-exclamation-triangle mr-2"></i>Aceitação dos Termos</strong>
              <p className="m-0">
                Ao acessar e utilizar o site da Avante Lingerie, você concorda integralmente com os termos e condições descritos abaixo. Caso não concorde com algum destes termos, solicitamos que não utilize nossos serviços.
              </p>
            </div>

            <h3 id="termos-produtos">2.1. Produtos e Informações</h3>
            <p>
              Trabalhamos continuamente para apresentar as cores, detalhes e texturas dos nossos produtos com a maior precisão possível. No entanto, pequenas variações de tonalidade podem ocorrer devido às configurações e calibração de cor de cada monitor ou tela de celular.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 leading-relaxed pl-4">
              <li className="mb-2">As informações técnicas de cada produto, como composição dos tecidos (rendas, microfibra, algodão), tabelas de medidas e orientações de tamanho, estão detalhadas na respectiva página de cada item.</li>
              <li className="mb-2">A disponibilidade de estoque é atualizada em tempo real. Em casos excepcionais de compras simultâneas que gerem indisponibilidade de algum item, nossa equipe entrará em contato de imediato para propor a substituição por outro produto de sua escolha ou o estorno imediato do valor correspondente.</li>
              <li>Reservamo-nos o direito de corrigir eventuais erros materiais de digitação em preços de produtos. Se um produto for anunciado por um valor manifestamente irrisório ou equivocado, a compra poderá ser cancelada e o cliente será integralmente reembolsado.</li>
            </ul>

            <h3 id="termos-pagamento">2.2. Preços e Pagamentos</h3>
            <p>
              Todos os preços estão sujeitos a alterações sem aviso prévio. O valor válido é o exibido no momento da finalização da compra. Aceitamos pagamentos via <strong>Cartão de Crédito</strong> (em até 6x sem juros) e <strong>PIX à vista</strong> (com benefício de 5% de desconto extra).
            </p>
            <p>
              Todas as transações financeiras são processadas de forma 100% segura e criptografada pela <strong>Stripe</strong>, líder global em infraestrutura de pagamentos digitais. O processo utiliza criptografia de nível bancário (SSL/TLS e conformidade com o padrão internacional de segurança PCI-DSS Nível 1). Por conta disso, os dados do seu cartão de crédito nunca são armazenados ou sequer trafegam em nossos servidores, garantindo total blindagem contra vazamento de dados e fraudes.
            </p>

            <h3 id="termos-entrega">2.3. Entrega e Frete</h3>
            <p>
              O prazo de entrega dos seus pedidos varia de acordo com a sua localidade e a modalidade de frete selecionada no momento da compra. A contagem do prazo inicia-se sempre no <strong>dia útil seguinte à confirmação do pagamento</strong>.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 leading-relaxed pl-4">
              <li className="mb-2"><strong>Prazo Médio:</strong> Nosso prazo geral de entrega varia de <strong>5 a 15 dias úteis</strong>, podendo sofrer variações em áreas com restrições de entrega postal ou regiões de difícil acesso.</li>
              <li className="mb-2"><strong>Cálculo do Frete:</strong> O valor do frete é calculated de forma automatizada através do Melhor Envio com base no CEP de destino, peso total e dimensões da embalagem.</li>
              <li className="mb-2"><strong>Código de Rastreamento:</strong> Assim que o pedido for postado, você receberá por e-mail o código de rastreio para acompanhar cada etapa da entrega no site dos Correios ou da transportadora parceira.</li>
              <li><strong>Divergência ou Avaria no Recebimento:</strong> No momento da entrega, verifique as condições da embalagem. Caso note sinais de violação, rasgos ou avarias graves, recuse o recebimento e notifique nossa central de atendimento em até 48 horas úteis.</li>
            </ul>

            <h3 id="termos-revenda">2.4. Programa de Revendedoras B2B</h3>
            <p>
              Disponibilizamos um canal diferenciado de compras voltado ao atacado para revendedoras qualificadas. Esse programa oferece descontos progressivos atrelados ao volume financeiro ou de peças do pedido, conforme tabela de descontos de atacado vigente.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 leading-relaxed pl-4">
              <li className="mb-2">O cadastro e a aprovação no programa de revendedora são individuais e sujeitos a análise de perfil.</li>
              <li className="mb-2">As revendedoras e parceiras comerciais atuam como empreendedoras autônomas, <strong>não possuindo qualquer tipo de vínculo empregatício, societário ou de subordinação</strong> com a Avante Lingerie LTDA.</li>
              <li>Reservamo-nos o direito de suspender ou cancelar o cadastro de revendedoras que descumprirem as boas práticas comerciais ou que comercializarem produtos da marca de forma a prejudicar a imagem institucional da empresa.</li>
            </ul>

            <h3 id="termos-cancelamento">2.5. Cancelamento de Pedidos</h3>
            <p>
              O cancelamento de compras pode ocorrer sob as seguintes circunstâncias:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 leading-relaxed pl-4">
              <li className="mb-2"><strong>Pelo Cliente (Antes do Envio):</strong> O cliente pode solicitar o cancelamento integral do pedido diretamente com nossa equipe de suporte se a mercadoria ainda não tiver sido despachada, garantindo-se o reembolso total dos valores pagos.</li>
              <li className="mb-2"><strong>Pelo Cliente (Após o Envio):</strong> Se o pedido já estiver em trânsito com a transportadora, o cliente deverá aguardar a entrega, recusar o recebimento no ato ou realizar o processo padrão de devolução por arrependimento em até 7 dias.</li>
              <li><strong>Pela Loja:</strong> Reservamo-nos o direito de cancelar pedidos automaticamente em casos de suspeita de fraude em transações de cartão de crédito apontada pelo nosso gateway de pagamentos, inconsistência insanável em dados cadastrais, ou erros grotescos e evidentes na precificação de produtos.</li>
            </ul>

            <h3 id="termos-conflitos">2.6. Resolução de Conflitos</h3>
            <p>
              Buscamos sempre solucionar qualquer divergência ou insatisfação de nossas clientes de forma rápida e amigável através do nosso suporte direto no WhatsApp (22) 99761-8591 ou e-mail contato@avantelingerie.com.br.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 leading-relaxed pl-4">
              <li className="mb-2">Caso não seja possível resolver a demanda diretamente, o consumidor poderá registrar sua reclamação na plataforma oficial de conciliação do Governo Federal: <strong>consumidor.gov.br</strong>.</li>
              <li>Para dirimir quaisquer litígios judiciais que porventura decorram da interpretação ou execução destes termos, fica eleito o <strong>Foro da Comarca de Nova Friburgo — RJ</strong>, com renúncia expressa a qualquer outro foro, por mais privilegiado que seja.</li>
            </ul>
          </section>

          <hr />

          <section id="trocas-e-devolucoes">
            <h2>3. Política de Trocas e Devoluções</h2>
            <p>Seguimos estritamente o Código de Defesa do Consumidor (CDC). Você tem até <strong>7 dias corridos</strong> após a entrega para desistir por arrependimento, e <strong>30 dias</strong> para comunicar defeitos de fábrica (com frete de retorno pago por nós).</p>

            <div className="gold-alert">
              <strong><i className="fas fa-circle-exclamation mr-2"></i>REQUISITOS OBRIGATÓRIOS:</strong>
              <p className="m-0 mt-1">Peças sem sinal de uso, livre de lavagens/odores, etiquetas originais afixadas e embalagens preservadas.</p>
            </div>

            <div className="gold-alert" style={{ borderLeftColor: '#d9534f', backgroundColor: '#FFF5F5' }}>
              <strong style={{ color: '#d9534f' }}><i className="fas fa-ban mr-2"></i>RESTRIÇÃO DE HIGIENE E SAÚDE PÚBLICA:</strong>
              <p className="m-0 mt-1" style={{ color: '#555' }}>
                Por razões sanitárias e de proteção à saúde coletiva, <strong>NÃO trocamos calcinhas, bodies/bodysuits e meias-calças por arrependimento ou tamanho</strong>. A única exceção é no caso de defeitos de fabricação de origem comprovados. Sutiãs, croppeds (peças de cima), pijamas e robes são elegíveis para trocas normalmente dentro dos 7 dias.
              </p>
            </div>

            <h3 id="trocas-frete">3.4. Responsabilidade de Fretes</h3>
            <table className="policy-table">
              <thead>
                <tr>
                  <th>Motivo da Troca</th>
                  <th>Responsável pelo Custo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Defeito ou Envio Incorreto</td>
                  <td><strong>Avante Lingerie</strong> (reversa grátis)</td>
                </tr>
                <tr>
                  <td>Arrependimento ou tamanho comum</td>
                  <td><strong>Cliente</strong></td>
                </tr>
              </tbody>
            </table>

            <h3 id="trocas-solicitar">3.5. Como Solicitar a Troca</h3>
            <p>Fale conosco no WhatsApp <strong>(22) 99761-8591</strong> ou e-mail <strong>trocas@avantelingerie.com.br</strong> com o número do pedido e fotos. Retornamos em até <strong>2 dias úteis</strong> com as orientações de envio.</p>

            <h3 id="trocas-reembolso">3.6. Estorno e Prazos</h3>
            <p>Os reembolsos ocorrem após a recepção e perícia no CD (até 2 dias): no <strong>PIX</strong>, o estorno ocorre em <strong>7 dias úteis</strong>; no <strong>cartão de crédito (Stripe)</strong>, o estorno é processado de imediato e constará em até <strong>2 faturas subsequentes</strong> (prazo da sua operadora).</p>
          </section>

          <hr />

          <section id="fale-conosco">
            <h2>4. Canais de Atendimento</h2>
            <p>Fale conosco através dos canais oficiais:</p>
            <div className="contact-grid">
              <div className="contact-card">
                <i className="fa-brands fa-whatsapp"></i>
                <h5>WhatsApp</h5>
                <p><strong>(22) 99761-8591</strong></p>
                <p>Seg a Qui 8h às 17h, Sex 8h às 13h</p>
              </div>
              <div className="contact-card">
                <i className="fa-solid fa-envelope"></i>
                <h5>E-mail</h5>
                <p><strong>trocas@avantelingerie.com.br</strong></p>
                <p>Retornos em até 24h úteis</p>
              </div>
              <div className="contact-card">
                <i className="fa-solid fa-location-dot"></i>
                <h5>Sede</h5>
                <p>Rua Odenir Pinheiro, 20</p>
                <p>Nova Friburgo — RJ</p>
              </div>
            </div>
          </section>

          <hr />

          <section id="perguntas-frequentes">
            <h2>Perguntas Frequentes (FAQ)</h2>
            <div className="faq-container">
              {faqData.map((faq, idx) => (
                <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
                  <button
                    className="faq-question"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    <i className="fa-solid fa-chevron-down" style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}></i>
                  </button>
                  {activeFaq === idx && (
                    <div className="faq-answer">
                      <p dangerouslySetInnerHTML={{ __html: faq.a }}></p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      <div
        className={`btn-scroll-top ${showScrollTop ? 'show' : ''}`}
        id="scrollTopBtn"
        aria-label="Voltar ao topo"
        onClick={scrollToTop}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </div>
    </div>
  );
}