import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ChevronDown, 
  ShieldCheck, 
  RefreshCw, 
  HeartHandshake, 
  Scissors, 
  Ruler, 
  Heart,
  MessageSquare,
  Play,
  Volume2,
  VolumeX,
  Compass,
  Check
} from 'lucide-react';

// URLs Externas de Mídia hospedadas com sucesso na lmdesignerweb.com
const IMAGE_PATH = "https://lmdesignerweb.com/imagens/img_pagina_medida.png"; // Formato 3:4 vertical
const VIDEO_PATH = "https://lmdesignerweb.com/video/video_pagina_medidas.mp4"; // Formato 9:16 vertical

export default function MedidasPage() {
  const [activeTab, setActiveTab] = useState('sutias');
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const customStyles = `
    main {
      padding-top: 0 !important;
    }
    .medidas-page-container {
      --color-black: #121212;
      --color-black-light: #1c1c1c;
      --color-gold: #c59b5f;
      --color-gold-dark: #a98048;
      --color-gold-light: #d6b384;
      --color-gold-bg: #FCF9F5;
      --color-white: #ffffff;
      --color-gray-50: #FAF8F5;
      --color-gray-100: #F3F1ED;
      --color-gray-200: #eae6df;
      --color-gray-600: #666666;
      --color-gray-800: #2a2a2a;
      
      --transition-smooth: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      --shadow-premium: 0 20px 40px rgba(197, 155, 95, 0.04), 0 5px 15px rgba(0, 0, 0, 0.01);
      --font-display: 'Playfair Display', serif;
      
      font-family: 'Inter', sans-serif;
      background-color: var(--color-gray-50);
      color: var(--color-gray-800);
      min-height: 100vh;
      padding-bottom: 6rem;
    }

    .medidas-page-container .hero {
      background: linear-gradient(180deg, var(--color-black) 0%, #1a1510 100%);
      color: var(--color-white);
      padding: 9rem 2rem 5rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .medidas-page-container .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at center, rgba(197, 155, 95, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }

    .medidas-page-container .hero h1 {
      font-family: var(--font-display);
      font-size: 3.5rem;
      font-weight: 400;
      margin-bottom: 1.25rem;
      color: var(--color-gold);
      letter-spacing: -0.01em;
    }

    .medidas-page-container .hero p {
      font-size: 1.2rem;
      color: #eae6df;
      max-width: 650px;
      margin: 0 auto 3rem;
      font-weight: 300;
      line-height: 1.6;
      letter-spacing: 0.02em;
    }

    /* CONTAINER DO VÍDEO VERTICAL 9:16 */
    .medidas-page-container .video-wrapper {
      max-width: 340px; /* Largura perfeita para exibir vídeo vertical 9:16 */
      margin: 0 auto;
      aspect-ratio: 9 / 16; /* Forçando a proporção vertical exata */
      position: relative;
      border-radius: 1.5rem;
      overflow: hidden;
      box-shadow: 0 25px 55px rgba(0, 0, 0, 0.45), 0 0 35px rgba(197, 155, 95, 0.18);
      border: 1px solid rgba(197, 155, 95, 0.3);
      background-color: var(--color-black-light);
    }

    .medidas-page-container .video-element {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .medidas-page-container .video-controls {
      position: absolute;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 10;
    }

    .medidas-page-container .video-btn {
      background: rgba(18, 18, 18, 0.8);
      color: var(--color-gold);
      border: 1px solid rgba(197, 155, 95, 0.4);
      padding: 0.65rem;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-smooth);
      backdrop-filter: blur(8px);
    }

    .medidas-page-container .video-btn:hover {
      background: var(--color-gold);
      color: var(--color-black);
      transform: scale(1.1);
    }

    /* BLOCO QUEBRA DE OBJEÇÃO */
    .medidas-page-container .objection-section {
      max-width: 1100px;
      margin: -2.5rem auto 4rem;
      padding: 0 2rem;
      position: relative;
      z-index: 20;
    }

    .medidas-page-container .objection-card {
      background: var(--color-white);
      border: 1px solid rgba(197, 155, 95, 0.18);
      border-radius: 1.5rem;
      padding: 3rem;
      box-shadow: var(--shadow-premium);
      text-align: center;
    }

    .medidas-page-container .objection-card h2 {
      font-family: var(--font-display);
      font-size: 2rem;
      color: var(--color-black);
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
    }

    .medidas-page-container .objection-card p {
      font-size: 1.1rem;
      color: var(--color-gray-600);
      line-height: 1.7;
      max-width: 800px;
      margin: 0 auto;
    }

    /* GRID COMO MEDIR */
    .medidas-page-container .layout-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 4rem;
      max-width: 1200px;
      margin: 4rem auto 0;
      padding: 0 2rem;
      align-items: start;
    }

    .medidas-page-container .guide-left-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .medidas-page-container .guide-title-section h2 {
      font-family: var(--font-display);
      font-size: 2.5rem;
      color: var(--color-black);
      font-weight: 400;
      margin-bottom: 1rem;
      position: relative;
      padding-bottom: 0.75rem;
    }

    .medidas-page-container .guide-title-section h2::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 2px;
      background-color: var(--color-gold);
    }

    .medidas-page-container .guide-title-section p {
      color: var(--color-gray-600);
      font-size: 1.1rem;
      line-height: 1.7;
    }

    .medidas-page-container .instruction-step {
      display: flex;
      gap: 1.5rem;
      background: var(--color-white);
      padding: 2rem;
      border-radius: 1.25rem;
      border: 1px solid rgba(197, 155, 95, 0.08);
      box-shadow: var(--shadow-premium);
      transition: var(--transition-smooth);
    }

    .medidas-page-container .instruction-step:hover {
      transform: translateY(-4px);
      border-color: var(--color-gold-light);
      box-shadow: 0 25px 50px rgba(197, 155, 95, 0.08);
    }

    .medidas-page-container .step-icon-circle {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      background-color: var(--color-gold-bg);
      color: var(--color-gold);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(197, 155, 95, 0.15);
      flex-shrink: 0;
    }

    .medidas-page-container .instruction-step h3 {
      font-family: var(--font-display);
      font-size: 1.35rem;
      color: var(--color-black);
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .medidas-page-container .instruction-step p {
      color: var(--color-gray-600);
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 0;
    }

    /* CARD IMAGEM 3:4 VERTICAL */
    .medidas-page-container .model-image-card {
      background: var(--color-white);
      border-radius: 1.5rem;
      border: 1px solid rgba(197, 155, 95, 0.12);
      box-shadow: var(--shadow-premium);
      padding: 1.5rem;
      text-align: center;
      position: relative;
    }

    .medidas-page-container .model-image-container {
      aspect-ratio: 3 / 4; /* Proporção vertical 3:4 exata */
      width: 100%;
      border-radius: 1rem;
      overflow: hidden;
      position: relative;
      background-color: var(--color-gold-bg);
      box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    }

    .medidas-page-container .model-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* SEÇÃO DE TABELAS */
    .medidas-page-container .tabs-section {
      max-width: 1200px;
      margin: 6rem auto 0;
      padding: 0 2rem;
    }

    .medidas-page-container .tabs-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 3rem;
      border-bottom: 1px solid var(--color-gray-200);
      padding-bottom: 1.5rem;
    }

    .medidas-page-container .tab-button {
      padding: 1rem 2.25rem;
      border-radius: 2rem;
      font-size: 1rem;
      font-weight: 500;
      border: 1px solid var(--color-gray-200);
      background: var(--color-white);
      color: var(--color-gray-600);
      cursor: pointer;
      transition: var(--transition-smooth);
    }

    .medidas-page-container .tab-button:hover {
      border-color: var(--color-gold);
      color: var(--color-gold-dark);
      background-color: var(--color-gold-bg);
    }

    .medidas-page-container .tab-button.active {
      background-color: var(--color-black);
      color: var(--color-gold) !important;
      border-color: var(--color-gold);
      box-shadow: 0 8px 25px rgba(197, 155, 95, 0.15);
    }

    .medidas-page-container .table-card {
      background: var(--color-white);
      border-radius: 1.5rem;
      box-shadow: var(--shadow-premium);
      border: 1px solid rgba(197, 155, 95, 0.1);
      padding: 4rem;
      margin-bottom: 4rem;
    }

    .medidas-page-container .table-card h3 {
      font-family: var(--font-display);
      font-size: 2rem;
      color: var(--color-black);
      font-weight: 400;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .medidas-page-container .size-table-container {
      overflow-x: auto;
      border-radius: 0.75rem;
      border: 1px solid var(--color-gray-200);
      margin-bottom: 2.5rem;
    }

    .medidas-page-container .size-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    .medidas-page-container .size-table th,
    .medidas-page-container .size-table td {
      padding: 1.5rem 1.75rem;
      border-bottom: 1px solid var(--color-gray-100);
      font-size: 1rem;
    }

    .medidas-page-container .size-table th {
      background-color: var(--color-gold-bg);
      font-weight: 600;
      color: var(--color-gold-dark);
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .medidas-page-container .size-table tr:hover td {
      background-color: var(--color-gold-bg);
      color: var(--color-black);
    }

    .medidas-page-container .size-table tr:last-child td {
      border-bottom: none;
    }

    /* VESTIBILIDADE COMPARATIVA */
    .medidas-page-container .vestibilidade-section {
      background-color: var(--color-gold-bg);
      border: 1px dashed rgba(197, 155, 95, 0.35);
      padding: 2.5rem;
      border-radius: 1.25rem;
      margin-bottom: 2.5rem;
    }

    .medidas-page-container .vestibilidade-section h4 {
      font-family: var(--font-display);
      font-size: 1.35rem;
      color: var(--color-gold-dark);
      font-weight: 500;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .medidas-page-container .vestibilidade-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
    }

    .medidas-page-container .vestibilidade-card {
      background: var(--color-white);
      border: 1px solid rgba(197, 155, 95, 0.1);
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.01);
    }

    .medidas-page-container .vestibilidade-card strong {
      display: block;
      color: var(--color-black);
      font-size: 1.05rem;
      margin-bottom: 0.5rem;
    }

    .medidas-page-container .vestibilidade-card span {
      font-size: 0.95rem;
      color: var(--color-gray-600);
      line-height: 1.5;
      display: block;
    }

    /* ELASTICIDADE EXPLICATIVO */
    .medidas-page-container .elasticidade-banner {
      background: linear-gradient(135deg, #1c1c1c 0%, #2b231a 100%);
      color: var(--color-white);
      padding: 3rem;
      border-radius: 1.5rem;
      margin-bottom: 5rem;
      display: flex;
      align-items: center;
      gap: 3rem;
      box-shadow: var(--shadow-premium);
      border: 1px solid rgba(197, 155, 95, 0.15);
    }

    .medidas-page-container .elasticidade-banner-content h4 {
      font-family: var(--font-display);
      font-size: 1.75rem;
      color: var(--color-gold);
      margin-bottom: 0.75rem;
      font-weight: 400;
    }

    .medidas-page-container .elasticidade-banner-content p {
      color: #eae6df;
      font-size: 1.05rem;
      line-height: 1.7;
      margin-bottom: 0;
    }

    /* SEÇÃO DE CONFIANÇA & CRITÉRIOS */
    .medidas-page-container .advice-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .medidas-page-container .advice-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2.5rem;
      margin-top: 4rem;
    }

    .medidas-page-container .advice-card {
      background: var(--color-white);
      border-radius: 1.25rem;
      border: 1px solid rgba(197, 155, 95, 0.1);
      padding: 3rem 2.5rem;
      box-shadow: var(--shadow-premium);
      transition: var(--transition-smooth);
    }

    .medidas-page-container .advice-card:hover {
      transform: translateY(-6px);
      border-color: var(--color-gold);
      box-shadow: 0 30px 60px rgba(197, 155, 95, 0.07);
    }

    .medidas-page-container .advice-card h4 {
      font-family: var(--font-display);
      font-size: 1.4rem;
      color: var(--color-black);
      margin-bottom: 1.25rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .medidas-page-container .advice-card h4 svg {
      color: var(--color-gold);
    }

    .medidas-page-container .advice-card p {
      color: var(--color-gray-600);
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 0;
    }

    /* EMOCIONAL: SEU CORPO É ÚNICO */
    .medidas-page-container .emotional-banner {
      background-color: #faf3ea;
      border-radius: 1.5rem;
      padding: 4rem 3rem;
      text-align: center;
      margin: 6rem auto;
      max-width: 1100px;
      border: 1px solid rgba(197, 155, 95, 0.15);
      position: relative;
    }

    .medidas-page-container .emotional-banner h3 {
      font-family: var(--font-display);
      font-size: 2.25rem;
      color: var(--color-black);
      margin-bottom: 1.25rem;
      font-weight: 400;
    }

    .medidas-page-container .emotional-banner p {
      font-size: 1.15rem;
      color: var(--color-gray-600);
      line-height: 1.8;
      max-width: 850px;
      margin: 0 auto;
      font-style: italic;
    }

    /* FAQ ACORDEÃO */
    .medidas-page-container .faq-section {
      max-width: 900px;
      margin: 6rem auto 0;
      padding: 0 2rem;
    }

    .medidas-page-container .faq-title-wrap {
      text-align: center;
      margin-bottom: 3.5rem;
    }

    .medidas-page-container .faq-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .medidas-page-container .faq-item {
      background: var(--color-white);
      border: 1px solid rgba(197, 155, 95, 0.12);
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.005);
      transition: var(--transition-smooth);
    }

    .medidas-page-container .faq-item.open {
      border-color: var(--color-gold);
      box-shadow: var(--shadow-premium);
    }

    .medidas-page-container .faq-question {
      padding: 1.75rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      user-select: none;
      transition: var(--transition-smooth);
    }

    .medidas-page-container .faq-question:hover {
      background-color: var(--color-gold-bg);
    }

    .medidas-page-container .faq-question span {
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--color-black);
    }

    .medidas-page-container .faq-toggle-icon {
      color: var(--color-gold);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .medidas-page-container .faq-item.open .faq-toggle-icon {
      transform: rotate(180deg);
    }

    .medidas-page-container .faq-answer-container {
      overflow: hidden;
    }

    .medidas-page-container .faq-answer {
      padding: 0 2rem 2rem;
      font-size: 1rem;
      color: var(--color-gray-600);
      line-height: 1.7;
    }

    /* AJUDA HUMANIZADA FINAL */
    .medidas-page-container .support-vip-card {
      background: linear-gradient(135deg, var(--color-black) 0%, #1e1610 100%);
      color: var(--color-white);
      border-radius: 2rem;
      padding: 4.5rem 3rem;
      text-align: center;
      max-width: 1100px;
      margin: 6rem auto 2rem;
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.25), 0 0 50px rgba(197, 155, 95, 0.1);
      border: 1px solid rgba(197, 155, 95, 0.2);
      position: relative;
      overflow: hidden;
    }

    .medidas-page-container .support-vip-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(197, 155, 95, 0.06) 0%, transparent 60%);
      pointer-events: none;
    }

    .medidas-page-container .support-vip-card h3 {
      font-family: var(--font-display);
      font-size: 2.5rem;
      color: var(--color-gold);
      margin-bottom: 1rem;
      font-weight: 400;
    }

    .medidas-page-container .support-vip-card p {
      font-size: 1.2rem;
      color: #eae6df;
      max-width: 700px;
      margin: 0 auto 2.5rem;
      font-weight: 300;
      line-height: 1.7;
    }

    .medidas-page-container .whatsapp-btn-luxury {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: var(--color-gold);
      color: var(--color-black);
      padding: 1.25rem 3.5rem;
      border-radius: 3rem;
      font-size: 1.1rem;
      font-weight: 600;
      text-decoration: none;
      box-shadow: 0 10px 30px rgba(197, 155, 95, 0.3);
      transition: var(--transition-smooth);
      border: 1px solid var(--color-gold-light);
    }

    .medidas-page-container .whatsapp-btn-luxury:hover {
      background: var(--color-white);
      color: var(--color-black);
      border-color: var(--color-white);
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(255, 255, 255, 0.15);
    }

    .medidas-page-container .trust-badges-wrapper {
      display: flex;
      justify-content: center;
      gap: 3rem;
      flex-wrap: wrap;
      margin-top: 3.5rem;
      padding-top: 3rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .medidas-page-container .trust-badge-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: #bfa88f;
      letter-spacing: 0.05em;
    }

    /* RESPONSIVIDADE */
    @media (max-width: 1024px) {
      .medidas-page-container .layout-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
      .medidas-page-container .table-card {
        padding: 3rem 1.5rem;
      }
      .medidas-page-container .hero {
        padding: 8rem 1.5rem 4rem;
      }
      .medidas-page-container .hero h1 {
        font-size: 2.75rem;
      }
      .medidas-page-container .elasticidade-banner {
        flex-direction: column;
        text-align: center;
        padding: 2.5rem 2rem;
        gap: 1.5rem;
      }
      .medidas-page-container .support-vip-card {
        padding: 3rem 1.5rem;
      }
      .medidas-page-container .support-vip-card h3 {
        font-size: 2rem;
      }
      .medidas-page-container .trust-badges-wrapper {
        gap: 1.5rem;
      }
    }
  `;

  const tables = {
    sutias: {
      title: 'Tabela de Sutiãs & Conjuntos',
      intro: 'A medida do busto determina a taça e o tórax/sob busto determina a largura da base do sutiã para sustentação ideal.',
      headers: ['Tamanho', 'Manequim', 'Busto (cm)', 'Cintura (cm)', 'Quadril (cm)'],
      rows: [
        ['P', '38 – 40', '84 – 88 cm', '66 – 72 cm', '90 – 96 cm'],
        ['M', '42', '89 – 94 cm', '73 – 78 cm', '97 – 102 cm'],
        ['G', '44', '95 – 102 cm', '79 – 86 cm', '103 – 110 cm'],
        ['GG', '46', '103 – 110 cm', '87 – 94 cm', '111 – 118 cm']
      ]
    },
    calcinhas: {
      title: 'Tabela de Calcinhas / Fios / Calçolas',
      intro: 'Para calcinhas, a medida do quadril é o principal indicador para assegurar um caimento sem marcas e com conforto absoluto.',
      headers: ['Tamanho', 'Manequim BR', 'Quadril (cm)'],
      rows: [
        ['P', '36 – 38', '88 – 96 cm'],
        ['M', '40 – 42', '97 – 102 cm'],
        ['G', '44', '103 – 110 cm'],
        ['GG', '46 – 48', '111 – 118 cm']
      ]
    },
    bodies: {
      title: 'Tabela de Medidas — Bodys',
      intro: 'Por ser peça única, meça o busto, cintura e quadril. A flexibilidade do tecido garante a vestibilidade em alturas variadas.',
      headers: ['Tamanho', 'Busto (cm)', 'Cintura (cm)', 'Quadril (cm)', 'Tronco (cm)'],
      rows: [
        ['P', '80 – 88 cm', '60 – 68 cm', '84 – 92 cm', '66 – 68 cm'],
        ['M', '88 – 96 cm', '68 – 76 cm', '92 – 100 cm', '69 – 71 cm'],
        ['G', '96 – 104 cm', '76 – 84 cm', '100 – 108 cm', '72 – 74 cm'],
        ['GG', '104 – 112 cm', '84 – 92 cm', '108 – 116 cm', '75 – 77 cm']
      ],
      alert: 'Se você tiver o tronco longo (altura acima de 1.72m ou tronco proporcionalmente mais alto), recomendamos fortemente escolher um tamanho acima do seu padrão usual.'
    },
    pijamas: {
      title: 'Tabela de Medidas — Pijamas',
      intro: 'Linha Sleepwear criada para proporcionar fluidez e leveza absoluta em momentos de descanso. Caimento relaxado e elegante.',
      headers: ['Tamanho', 'Busto / Cropped (cm)', 'Quadril / Shorts / Calça (cm)', 'Caimento Sugerido'],
      rows: [
        ['P', '82 – 90 cm', '86 – 94 cm', 'Fluido, Soltinho e Macio'],
        ['M', '90 – 98 cm', '94 – 102 cm', 'Fluido, Soltinho e Macio'],
        ['G', '98 – 106 cm', '102 – 110 cm', 'Fluido, Soltinho e Macio'],
        ['GG', '106 – 114 cm', '110 – 118 cm', 'Fluido, Soltinho e Macio']
      ]
    },
    croppeds: {
      title: 'Tabela de Medidas — Croppeds',
      intro: 'Nossos croppeds possuem modelagens estruturadas que servem perfeitamente tanto como lingerie de luxo quanto para outwear.',
      headers: ['Tamanho', 'Busto (cm)', 'Comprimento (cm)', 'Elasticidade'],
      rows: [
        ['P', '80 – 88 cm', '38 cm', 'Alta Adaptação Anatômica'],
        ['M', '88 – 96 cm', '40 cm', 'Alta Adaptação Anatômica'],
        ['G', '96 – 104 cm', '42 cm', 'Alta Adaptação Anatômica'],
        ['GG', '104 – 112 cm', '44 cm', 'Alta Adaptação Anatômica']
      ]
    }
  };

  const faqData = [
    {
      q: 'E se eu estiver entre dois tamanhos?',
      a: 'Para sutiãs, croppeds ou bodys estruturados, recomendamos escolher o tamanho maior para que a taça acomode perfeitamente o busto de forma segura. Para calcinhas ou peças de tecidos ultra-elásticos (como nossa microfibra premium), o tamanho menor irá se moldar como uma segunda pele, enquanto o tamanho maior proporcionará mais cobertura e folga nas pernas.'
    },
    {
      q: 'O tecido estica?',
      a: 'Sim! Todas as lingeries da Avante são produzidas com rendas francesas de alta qualidade e microfibras de poliamida com elastano premium. Isso garante uma alta elasticidade (até 25% de expansão confortável) que permite às peças se moldarem perfeitamente ao seu corpo sem apertar ou machucar.'
    },
    {
      q: 'As medidas são padrão BR?',
      a: 'Sim, nossas modelagens seguem rigorosamente a tabela padrão brasileira (ABNT). Você pode escolher o tamanho (P, M, G, GG) baseado no manequim que costuma usar em lojas brasileiras conceituadas.'
    },
    {
      q: 'Posso trocar se não servir?',
      a: 'Com certeza! Nós compreendemos a ansiedade de comprar online. Oferecemos a primeira troca gratuita em até 7 dias corridos após o recebimento do pedido para sutiãs, pijamas, croppeds e fitness. Por razões de segurança sanitária e higiene coletiva, pedimos especial atenção ao medir calcinhas e bodys, pois estes itens íntimos de contato direto não possuem troca por erro de tamanho.'
    },
    {
      q: 'Como saber meu tamanho ideal?',
      a: 'A forma mais correta é usar uma fita métrica maleável contornando seu corpo nas linhas guias indicadas em nosso manual acima. Evite usar fitas de construção rígidas e certifique-se de que a fita esteja reta e paralela ao chão, sem puxar demais ou deixar muito frouxa.'
    },
    {
      q: 'Cada peça veste igual?',
      a: 'A modelagem varia ligeiramente pelo estilo da peça. Lingeries com renda sem forro e sem aro tendem a se adaptar com mais facilidade e margem de tolerância. Modelagens estruturadas com aro ou bojo bolha exigem mais fidelidade às medidas exatas do busto descritas em nossa tabela.'
    },
    {
      q: 'O bojo aumenta o tamanho?',
      a: 'Nossos bojos no tamanho P possuem bolha interna suave para aproximar e valorizar os seios de forma natural. Nos tamanhos M, G e GG os bojos são anatômicos casquinha, projetados apenas para modelar, estruturar e dar suporte aos seios sem adicionar volume artificial.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="medidas-page-container">
      <style>{customStyles}</style>
      <Helmet>
        <title>Descubra Seu Tamanho Perfeito | Guia de Medidas Avante Lingerie</title>
        <meta name="description" content="Acesse nosso Guia de Medidas oficial e premium. Tabelas padrão ABNT brasileira para sutiãs, calcinhas, bodys e pijamas da Avante Lingerie." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </Helmet>

      {/* 1. HERO SECTION (ABERTURA PREMIUM) */}
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="text-[11px] md:text-xs font-bold uppercase tracking-[4px] text-[#c59b5f] mb-4 block">
            Guia de Alta Costura e Ajuste
          </span>
          <h1>Descubra seu tamanho perfeito</h1>
          <p>
            Criamos um guia simples e prático para você comprar com segurança, conforto e confiança. Encontre a modelagem ideal para os contornos do seu corpo.
          </p>
        </motion.div>

        {/* 2. VÍDEO DEMONSTRATIVO EM DESTAQUE (VERTICAL 9:16) */}
        <motion.div 
          className="video-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {!videoError ? (
            <video 
              className="video-element"
              src={VIDEO_PATH}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              controls
              onError={() => setVideoError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-8 w-full h-full bg-[#1c1c1c] text-center">
              <Play className="w-14 h-14 text-[#c59b5f] mb-4 opacity-80 cursor-pointer hover:scale-110 transition-transform" />
              <h4 className="font-serif text-[#c59b5f] text-lg font-medium mb-2">Vídeo de Demonstração de Ajuste</h4>
              <p className="text-gray-400 text-xs max-w-[240px] leading-relaxed">
                Um guia passo a passo vertical de alta resolução. Faça o upload do arquivo <strong>video_pagina_medidas.mp4</strong> para ativá-lo.
              </p>
            </div>
          )}
          
          {!videoError && (
            <div className="video-controls">
              <button 
                type="button" 
                className="video-btn"
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? "Ativar som" : "Desativar som"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          )}
        </motion.div>
      </section>

      {/* 3. BLOCO DE QUEBRA DE OBJEÇÃO */}
      <section className="objection-section">
        <motion.div 
          className="objection-card"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Não se preocupe se estiver em dúvida 💖</h2>
          <p>
            Nossas peças possuem modelagens testadas e pensadas meticulosamente para vestir com absoluto conforto. 
            Cada detalhe, das costuras à escolha do elástico, foi projetado para valorizar suas curvas. E caso precise, 
            nossa equipe pode te ajudar na escolha ideal através do nosso atendimento exclusivo.
          </p>
        </motion.div>
      </section>

      {/* 4. COMO MEDIR CORRETAMENTE & IMAGEM VERTICAL 3:4 */}
      <div className="layout-grid">
        <div className="guide-left-content">
          <div className="guide-title-section">
            <h2>Instruções de Medição</h2>
            <p>
              Tudo o que você precisa é de uma fita métrica flexível e um espelho. Para obter resultados exatos, meça diretamente sobre a pele ou usando uma lingerie bem fina sem bojo.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="instruction-step">
              <div className="step-icon-circle">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <h3>1. Busto</h3>
                <p>Contorne a fita métrica horizontalmente sobre a parte mais saliente dos seios (linha do mamilo). Mantenha a fita firme, mas sem apertar.</p>
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-icon-circle">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <h3>2. Sob Busto / Tórax</h3>
                <p>Passe a fita métrica logo abaixo dos seios, exatamente na linha onde fica o elástico da base do sutiã. Essa medida garante sustentação sem apertar.</p>
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-icon-circle">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <h3>3. Cintura</h3>
                <p>Contorne a fita na curva mais fina do seu abdômen (geralmente dois dedos acima do seu umbigo). Respire normalmente ao medir.</p>
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-icon-circle">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3>4. Quadril</h3>
                <p>Passe a fita métrica na região de maior circunferência dos glúteos, mantendo a fita alinhada horizontalmente com o chão.</p>
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-icon-circle">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3>5. Comprimento de Tronco</h3>
                <p>Indispensável para bodys perfeitos. Meça do ponto mais alto do ombro (próximo ao pescoço), descendo pela frente do corpo até a virilha.</p>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGEM PREMIUM VERTICAL 3:4 */}
        <div className="model-image-card">
          <div className="model-image-container">
            {!imageError ? (
              <img 
                src={IMAGE_PATH} 
                alt="Instruções ilustradas de medidas femininas Avante Lingerie" 
                className="model-image"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-8 w-full h-full bg-[#121212] text-center border border-[#c59b5f]/15">
                <Ruler className="w-10 h-10 text-[#c59b5f] mb-4 opacity-80" />
                <h4 className="font-serif text-white text-md font-medium mb-1">Ilustração Silhouette</h4>
                <p className="text-gray-400 text-[11px] max-w-[220px] leading-relaxed mb-6">
                  Faça o upload da imagem <strong>img_pagina_medida.png</strong> no seu painel para exibir a foto de modelo vertical 3:4.
                </p>
                {/* Fallback Premium Vector Silhuette */}
                <svg className="w-32 h-48 text-[#c59b5f]/40 opacity-80" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 18C52.5 18 54.5 16 54.5 13.5C54.5 11 52.5 9 50 9C47.5 9 45.5 11 45.5 13.5C45.5 16 47.5 18 50 18Z" stroke="#c59b5f" strokeWidth="1.2"/>
                  <path d="M50 18C47.5 20 43 23 39 27C35.5 31 34.5 35 35.5 39C36.5 44 39 49 39 54C39 60 35 66 35 73C35 81 38 88 41 95C44 103 46.5 114 47.5 124" stroke="#c59b5f" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M50 18C52.5 20 57 23 61 27C64.5 31 65.5 35 64.5 39C63.5 44 61 49 61 54C61 60 65 66 65 73C65 81 62 88 59 95C56 103 53.5 114 52.5 124" stroke="#c59b5f" strokeWidth="1.2" strokeLinecap="round"/>
                  {/* Lines */}
                  <line x1="36" y1="42" x2="64" y2="42" stroke="#c59b5f" strokeWidth="0.8" strokeDasharray="3 3"/>
                  <line x1="39" y1="58" x2="61" y2="58" stroke="#c59b5f" strokeWidth="0.8" strokeDasharray="3 3"/>
                  <line x1="35" y1="75" x2="65" y2="75" stroke="#c59b5f" strokeWidth="0.8" strokeDasharray="3 3"/>
                </svg>
              </div>
            )}
          </div>
          <div className="absolute inset-0 border border-[#c59b5f]/15 rounded-3xl pointer-events-none" style={{ margin: '15px' }} />
        </div>
      </div>

      {/* 5. TABELA UNIVERSAL BR */}
      <section className="tabs-section">
        <div className="tabs-header">
          <button 
            type="button"
            className={`tab-button ${activeTab === 'sutias' ? 'active' : ''}`}
            onClick={() => setActiveTab('sutias')}
          >
            Sutiãs & Conjuntos
          </button>
          <button 
            type="button"
            className={`tab-button ${activeTab === 'calcinhas' ? 'active' : ''}`}
            onClick={() => setActiveTab('calcinhas')}
          >
            Calcinhas & Tangas
          </button>
          <button 
            type="button"
            className={`tab-button ${activeTab === 'bodies' ? 'active' : ''}`}
            onClick={() => setActiveTab('bodies')}
          >
            Bodys
          </button>
          <button 
            type="button"
            className={`tab-button ${activeTab === 'pijamas' ? 'active' : ''}`}
            onClick={() => setActiveTab('pijamas')}
          >
            Sleepwear / Pijamas
          </button>
          <button 
            type="button"
            className={`tab-button ${activeTab === 'croppeds' ? 'active' : ''}`}
            onClick={() => setActiveTab('croppeds')}
          >
            Croppeds
          </button>
        </div>

        {/* EXIBIÇÃO DA TABELA ATIVA */}
        <div className="table-card">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>{tables[activeTab].title}</h3>
            <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto leading-relaxed">
              {tables[activeTab].intro}
            </p>

            <div className="size-table-container">
              <table className="size-table">
                <thead>
                  <tr>
                    {tables[activeTab].headers.map((h, i) => (
                      <th key={i}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tables[activeTab].rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j}>
                          {j === 0 ? (
                            <span className="inline-block px-3.5 py-1.5 bg-[#FCF9F5] text-[#c59b5f] border border-[#c59b5f]/20 rounded-full font-bold text-sm">
                              {cell}
                            </span>
                          ) : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {tables[activeTab].alert && (
              <div className="p-5 bg-amber-50/50 border-l-2 border-amber-500/70 text-amber-900 rounded-r-xl text-sm mb-6 leading-relaxed">
                <strong>💡 Nota sobre comprimento:</strong> {tables[activeTab].alert}
              </div>
            )}

            {/* 13. DIFERENCIAL ABSURDO: COMPARATIVO DE VESTIBILIDADE */}
            <div className="vestibilidade-section">
              <h4><Sparkles className="w-5 h-5" /> Guia de Vestibilidade & Preferência Pessoal</h4>
              <div className="vestibilidade-grid">
                <div className="vestibilidade-card">
                  <strong>Gosta mais firme?</strong>
                  <span>Selecione a numeração exata indicada na tabela de medidas.</span>
                </div>
                <div className="vestibilidade-card">
                  <strong>Gosta mais confortável?</strong>
                  <span>Recomendamos escolher exatamente 1 tamanho acima das suas medidas.</span>
                </div>
                <div className="vestibilidade-card">
                  <strong>Muito Busto?</strong>
                  <span>Priorize sempre a medida do busto na aba de Sutiãs para acomodação perfeita.</span>
                </div>
                <div className="vestibilidade-card">
                  <strong>Muito Quadril?</strong>
                  <span>Priorize a aba de Calcinhas com base exclusiva na medida do quadril.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. EXPLICAÇÃO SOBRE ELASTICIDADE */}
      <section className="max-w-[1200px] mx-auto px-8">
        <div className="elasticidade-banner">
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-[#c59b5f]/15 border border-[#c59b5f]/30">
            <Sparkles className="w-6 h-6 text-[#c59b5f]" />
          </div>
          <div className="elasticidade-banner-content">
            <h4>Adaptação Térmica e Elasticidade Avançada</h4>
            <p>
              Nossas matérias-primas são selecionadas rigorosamente. O elastano das nossas rendas e a poliamida de alta performance adaptam-se de forma suave e anatômica ao corpo. Pequenas variações de 1 a 2 centímetros são totalmente normais e compensadas pela elasticidade macia do tecido.
            </p>
          </div>
        </div>
      </section>

      {/* 8. BLOCO EMOCIONAL: SEU CORPO É ÚNICO */}
      <section className="px-8">
        <div className="emotional-banner">
          <h3>Seu corpo é uma obra de arte única 🌸</h3>
          <p>
            "Nenhuma tabela define sua beleza singular. Cada silhueta feminina possui suas próprias proporções e formas, 
            e isso é maravilhoso. Nosso guia de medidas existe para ajudar você a encontrar o ajuste que proporcione a você 
            conforto, liberdade, sofisticação e autoconfiança de forma absoluta em cada detalhe."
          </p>
        </div>
      </section>

      {/* 10. BLOCO DE CONFIANÇA */}
      <section className="advice-section">
        <div className="text-center mb-4">
          <span className="text-[11px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f]">
            Garantia de Qualidade
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-2">
            Segurança ao Escolher
          </h2>
        </div>

        <div className="advice-grid">
          <div className="advice-card">
            <h4><ShieldCheck className="w-6 h-6" /> Modelagem Padrão ABNT</h4>
            <p>
              Desenvolvemos nossas coleções seguindo os padrões ergonômicos da modelagem brasileira de alto luxo. O tamanho M ou G veste com fidelidade absoluta o padrão esperado de grandes grifes nacionais.
            </p>
          </div>

          <div className="advice-card">
            <h4><RefreshCw className="w-6 h-6" /> Primeira Troca Grátis</h4>
            <p>
              Errou na fita métrica? Não se preocupe. Oferecemos a primeira troca gratuita em peças como sutiãs, pijamas e moda fitness. A coleta é rápida, sem burocracia e totalmente grátis para sua total comodidade.
            </p>
          </div>

          <div className="advice-card">
            <h4><HeartHandshake className="w-6 h-6" /> Tecidos Hipoalergênicos</h4>
            <p>
              Além de modelar de forma perfeita, nos preocupamos com a saúde íntima feminina. Nossos forros são sempre em algodão premium 100% natural, prevenindo alergias e promovendo transpiração ideal.
            </p>
          </div>
        </div>
      </section>

      {/* 11. FAQ ESTRATÉGICO ACORDEÃO */}
      <section className="faq-section">
        <div className="faq-title-wrap">
          <span className="text-[11px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f]">
            FAQ
          </span>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mt-2">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="faq-list">
          {faqData.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{item.q}</span>
                  <ChevronDown className="w-5 h-5 faq-toggle-icon" />
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-answer-container"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="faq-answer">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. AJUDA HUMANIZADA / SUPORTE VIP & 12. BLOCO PREMIUM FINAL */}
      <section className="px-8">
        <div className="support-vip-card">
          <span className="text-[11px] md:text-xs font-bold uppercase tracking-[4px] text-[#c59b5f] mb-4 block">
            Atendimento Exclusivo
          </span>
          <h3>Ainda ficou com alguma dúvida?</h3>
          <p>
            Conforto começa desde a escolha. Nossa equipe de consultoras de estilo está disponível para te ajudar! 
            Envia-nos uma mensagem no WhatsApp com suas medidas; responderemos na hora indicando o tamanho perfeito do modelo escolhido.
          </p>

          <a 
            href="https://wa.me/5522997618591?text=Ol%C3%A1%2C+gostaria+de+ajuda+para+saber+meu+tamanho+ideal+na+Avante+Lingerie%21" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="whatsapp-btn-luxury"
          >
            <MessageSquare className="w-5 h-5" />
            Falar com Consultora VIP
          </a>

          <div className="trust-badges-wrapper">
            <div className="trust-badge-item">
              <Check className="w-4 h-4 text-[#c59b5f]" />
              Atendimento 100% Humano e Rápido
            </div>
            <div className="trust-badge-item">
              <Check className="w-4 h-4 text-[#c59b5f]" />
              Modelagens Testadas e Aprovadas
            </div>
            <div className="trust-badge-item">
              <Check className="w-4 h-4 text-[#c59b5f]" />
              Troca Simplificada e sem Burocracia
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}