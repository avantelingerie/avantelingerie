import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown, Download, ShieldCheck, Smartphone, Users, DollarSign,
  Copy, CheckCircle2, ChevronRight, FileText, Share2,
  Sparkles, Loader2, Key, Info, HelpCircle, Phone, Home, Heart, Award,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { toast } from 'sonner';

export default function ResellerPortalPage() {
  const { currentUser, updateUser } = useAuth();

  // Tab/Screen state
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'downloads', 'pricing', 'catalog'

  // Activation state
  const [isActivating, setIsActivating] = useState(false);
  const [activationForm, setActivationForm] = useState({
    cpf_cnpj: currentUser?.cpf_cnpj || '',
    whatsapp: currentUser?.whatsapp || '',
    endereco: currentUser?.endereco || '',
    cidade_estado: currentUser?.cidade_estado || '',
    ja_revende: 'sim'
  });

  // Price Calculator state
  const [custoPeca, setCustoPeca] = useState(35);
  const [margemLucro, setMargemLucro] = useState(120); // 120% margin
  const [descontoPix, setDescontoPix] = useState(''); // empty by default per user request
  const [numParcelas, setNumParcelas] = useState(''); // empty by default per user request
  const [nomeOferta, setNomeOferta] = useState('Avante Lingerie Premium'); // customizable brand/offer name
  const [copiandoPreco, setCopiandoPreco] = useState(false);

  // Catalog PDF state
  const [nomeFranquia, setNomeFranquia] = useState('');
  const [whatsappFranquia, setWhatsappFranquia] = useState('');
  const [isGeneratingCatalog, setIsGeneratingCatalog] = useState(false);

  // Simulated download state
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [mediaFilter, setMediaFilter] = useState('todos'); // 'todos', 'fotos', 'videos', 'canva'

  // Premium downloads high-fidelity mock list
  const mediaPackages = [
    {
      id: 'pkg-1',
      title: 'Coleção Satin Gold - Estúdio Profissional',
      description: 'Lote completo com 45 fotos em altíssima definição tiradas por fotógrafos de moda de Nova Friburgo.',
      size: '52 MB',
      type: 'fotos',
      typeName: 'Imagens (JPG)',
      downloadUrl: 'https://images.unsplash.com/photo-1610304386762-b9cf5903b412?auto=format&fit=crop&q=80&w=1200',
      thumbnail: 'https://images.unsplash.com/photo-1610304386762-b9cf5903b412?auto=format&fit=crop&q=80&w=600',
      badge: 'Novidade',
      details: '45 fotos • Fundo Estúdio Branco & Neutro'
    },
    {
      id: 'pkg-2',
      title: 'Coleção Satin Gold - Reels Verticais',
      description: '12 vídeos profissionais de alta conversão sem marca d\'água prontos para Stories, Reels e TikTok.',
      size: '128 MB',
      type: 'videos',
      typeName: 'Vídeos (MP4)',
      downloadUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=1200',
      thumbnail: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=600',
      badge: 'Vídeos Reels',
      details: '12 vídeos • Alta Definição 4K UHD'
    },
    {
      id: 'pkg-3',
      title: 'Kit Social Media - Criativos & Banners de Ofertas',
      description: 'Templates editáveis no Canva com gatilhos mentais fortes para promoções e ofertas no Instagram.',
      size: '18 MB',
      type: 'canva',
      typeName: 'Templates (Canva)',
      downloadUrl: 'https://images.unsplash.com/photo-1544030122-89198d5a7b6a?auto=format&fit=crop&q=80&w=1200',
      thumbnail: 'https://images.unsplash.com/photo-1544030122-89198d5a7b6a?auto=format&fit=crop&q=80&w=600',
      badge: 'Canva 100% Grátis',
      details: '15 templates • Posts & Stories editáveis'
    },
    {
      id: 'pkg-4',
      title: 'Fotos Ambientadas - Modelo ao Ar Livre',
      description: '25 imagens conceituais perfeitas para construir o branding sofisticado da sua loja de lingeries.',
      size: '48 MB',
      type: 'fotos',
      typeName: 'Imagens (JPG)',
      downloadUrl: 'https://images.unsplash.com/photo-1590580499385-a72d73507d72?auto=format&fit=crop&q=80&w=1200',
      thumbnail: 'https://images.unsplash.com/photo-1590580499385-a72d73507d72?auto=format&fit=crop&q=80&w=600',
      badge: 'Conceitual',
      details: '25 fotos • Locações externas luxuosas'
    },
    {
      id: 'pkg-5',
      title: 'Vídeos de Closeups - Detalhes das Peças',
      description: '6 vídeos gravados em macro mostrando o acabamento das alças, aros banhados a ouro e rendas exclusivas.',
      size: '72 MB',
      type: 'videos',
      typeName: 'Vídeos (MP4)',
      downloadUrl: 'https://images.unsplash.com/photo-1610304386762-b9cf5903b412?auto=format&fit=crop&q=80&w=1200',
      thumbnail: 'https://images.unsplash.com/photo-1610304386762-b9cf5903b412?auto=format&fit=crop&q=80&w=600',
      badge: 'Detalhismo',
      details: '6 vídeos curtos • Foco em valor percebido'
    },
    {
      id: 'pkg-6',
      title: 'Manual de Vendas B2B - Método Avante 2026',
      description: 'Guia completo em PDF de como quebrar objeções de tamanho e tecido para aumentar o ticket médio das clientes.',
      size: '12 MB',
      type: 'canva',
      typeName: 'Manual PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200',
      thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600',
      badge: 'E-book Exclusivo',
      details: '32 páginas • Copywriting persuasivo de vendas'
    }
  ];

  // Dynamic calculations for pricing calculator B2B
  const valorSugerido = Math.round(custoPeca * (1 + margemLucro / 100));
  const descPixNum = Number(descontoPix) || 0;
  const numParcNum = Number(numParcelas) || 1;
  const valorPix = Math.round(valorSugerido * (1 - descPixNum / 100));
  const valorCartao = Math.round(valorSugerido);
  const parcelaCartao = (valorCartao / numParcNum).toFixed(2);

  // Show pricing totals only if PIX discount and parcel range are explicitly filled/selected
  const showTotal = custoPeca > 0 && margemLucro > 0 && descontoPix !== '' && numParcelas !== '';

  const handleActivationSubmit = async (e) => {
    e.preventDefault();
    if (!activationForm.cpf_cnpj || !activationForm.whatsapp || !activationForm.endereco || !activationForm.cidade_estado) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsActivating(true);
    try {
      // 1. Atualizar campos no usuário sem mudar cadastro_completo
      const updatedUser = await pb.collection('users').update(currentUser.id, {
        cpf_cnpj: activationForm.cpf_cnpj,
        whatsapp: activationForm.whatsapp,
        endereco: activationForm.endereco,
        cidade_estado: activationForm.cidade_estado
      });
      updateUser(updatedUser);

      // 2. Enviar para aprovação B2B
      try {
        await pb.collection('solicitacoes_revendedor').create({
          user_id: currentUser.id,
          nome: currentUser.name || currentUser.nome_completo || 'Revendedora',
          whatsapp: activationForm.whatsapp,
          cpf_cnpj: activationForm.cpf_cnpj,
          cidade_estado: activationForm.cidade_estado,
          ja_revende: 'sim',
          status: 'pendente'
        }, { $autoCancel: false });
        toast.success('Dados enviados com sucesso! Aguarde a análise da diretoria para liberar os downloads.');
      } catch (createErr) {
        console.error('Erro ao criar solicitação de revenda:', createErr);
        toast.success('Seus dados foram salvos na conta. Aguarde a aprovação para liberação das mídias.');
      }
    } catch (error) {
      console.error('Erro ao salvar dados de revendedora:', error);
      toast.error('Erro ao atualizar seus dados comerciais. Tente novamente.');
    } finally {
      setIsActivating(false);
    }
  };

  const handleCopyWhatsAppMsg = () => {
    if (!showTotal) {
      toast.error('Preencha os campos de Pix e Parcelas primeiro!');
      return;
    }
    setCopiandoPreco(true);
    const msg = `✨ *Oferta Especial - ${nomeOferta}* ✨\n\nOi, querida! Veja que conjunto maravilhoso acabei de separar para você:\n\n🛍️ *${nomeOferta}*\n💵 *Preço Especial:* R$ ${valorSugerido.toLocaleString('pt-BR')}\n💸 *À vista no Pix (${descontoPix}% OFF):* R$ ${valorPix.toLocaleString('pt-BR')}\n💳 *Ou parcelado:* ${numParcelas}x de R$ ${parcelaCartao} sem juros!\n\nDeseja reservar o seu tamanho antes que acabe? Me avise aqui! 💖`;

    navigator.clipboard.writeText(msg)
      .then(() => {
        toast.success('Texto formatado copiado com sucesso!');
      })
      .catch(() => {
        toast.error('Erro ao copiar texto.');
      })
      .finally(() => {
        setTimeout(() => setCopiandoPreco(false), 800);
      });
  };

  const handleShareWhatsAppMsg = () => {
    if (!showTotal) {
      toast.error('Preencha os campos de Pix e Parcelas primeiro!');
      return;
    }
    const msg = `✨ *Oferta Especial - ${nomeOferta}* ✨\n\nOi, querida! Veja que conjunto maravilhoso acabei de separar para você:\n\n🛍️ *${nomeOferta}*\n💵 *Preço Especial:* R$ ${valorSugerido.toLocaleString('pt-BR')}\n💸 *À vista no Pix (${descontoPix}% OFF):* R$ ${valorPix.toLocaleString('pt-BR')}\n💳 *Ou parcelado:* ${numParcelas}x de R$ ${parcelaCartao} sem juros!\n\nDeseja reservar o seu tamanho antes que acabe? Me avise aqui! 💖`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleShareNativeMsg = () => {
    if (!showTotal) {
      toast.error('Preencha os campos de Pix e Parcelas primeiro!');
      return;
    }
    const msg = `✨ *Oferta Especial - ${nomeOferta}* ✨\n\nOi, querida! Veja que conjunto maravilhoso acabei de separar para você:\n\n🛍️ *${nomeOferta}*\n💵 *Preço Especial:* R$ ${valorSugerido.toLocaleString('pt-BR')}\n💸 *À vista no Pix (${descontoPix}% OFF):* R$ ${valorPix.toLocaleString('pt-BR')}\n💳 *Ou parcelado:* ${numParcelas}x de R$ ${parcelaCartao} sem juros!\n\nDeseja reservar o seu tamanho antes que acabe? Me avise aqui! 💖`;

    if (navigator.share) {
      navigator.share({
        title: `Orçamento - ${nomeOferta}`,
        text: msg
      })
        .then(() => toast.success('Orçamento compartilhado com sucesso!'))
        .catch((err) => console.log('Erro ao compartilhar:', err));
    } else {
      navigator.clipboard.writeText(msg)
        .then(() => toast.success('Texto copiado! Selecione o app para colar.'));
    }
  };

  const handlePrintCatalog = (e) => {
    e.preventDefault();
    if (!nomeFranquia || !whatsappFranquia) {
      toast.error('Por favor, preencha o nome comercial e o WhatsApp para o catálogo.');
      return;
    }

    setIsGeneratingCatalog(true);

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Catalogo Avante Lingerie - ${nomeFranquia}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap');
            body {
              font-family: 'Outfit', sans-serif;
              color: #1a1a1a;
              margin: 0;
              padding: 0;
              background-color: #FFFBF8;
            }
            .header-banner {
              background-color: #1a1a1a;
              color: white;
              padding: 40px;
              text-align: center;
              border-bottom: 5px solid #C59B5F;
            }
            .header-banner h1 {
              font-family: 'Playfair Display', serif;
              font-size: 32px;
              margin: 0 0 10px 0;
              color: #C59B5F;
            }
            .header-banner p {
              font-size: 14px;
              margin: 5px 0;
              font-weight: 300;
              letter-spacing: 1px;
            }
            .catalog-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 30px;
              padding: 40px;
              max-width: 1000px;
              margin: 0 auto;
            }
            .catalog-card {
              background: white;
              border: 1px solid #EADCD9;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 4px 10px rgba(0,0,0,0.02);
            }
            .catalog-card img {
              width: 100%;
              height: 350px;
              object-fit: cover;
              object-position: center;
            }
            .catalog-info {
              padding: 20px;
            }
            .catalog-title {
              font-family: 'Playfair Display', serif;
              font-size: 18px;
              margin: 0 0 8px 0;
              font-weight: bold;
            }
            .catalog-desc {
              font-size: 12px;
              color: #5C4D4A;
              line-height: 1.5;
              margin-bottom: 15px;
            }
            .catalog-action {
              font-size: 13px;
              font-weight: 600;
              color: #C59B5F;
              border-top: 1px solid #FAF6F0;
              padding-top: 12px;
              display: flex;
              justify-content: space-between;
            }
            @media print {
              .no-print { display: none; }
              body { background: white; }
            }
          </style>
        </head>
        <body>
          <div class="header-banner">
            <p>REVENDEDORA AUTORIZADA EXCLUSIVA</p>
            <h1>${nomeFranquia.toUpperCase()}</h1>
            <p>Faça seus pedidos via WhatsApp: <strong>${whatsappFranquia}</strong></p>
            <p style="font-size: 10px; opacity: 0.6; margin-top: 10px;">Lingeries de Alta Costura direto de Nova Friburgo</p>
          </div>
          
          <div class="catalog-grid">
            <div class="catalog-card">
              <img src="https://images.unsplash.com/photo-1610304386762-b9cf5903b412?auto=format&fit=crop&q=80&w=600" />
              <div class="catalog-info">
                <div class="catalog-title">Conjunto Satin Gold</div>
                <div class="catalog-desc">Renda francesa acetinada com toque de algodão e aros banhados a ouro para modelagem anatômica perfeita.</div>
                <div class="catalog-action">
                  <span>Alta Modelagem</span>
                  <span>Fale no WhatsApp</span>
                </div>
              </div>
            </div>
            
            <div class="catalog-card">
              <img src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=600" />
              <div class="catalog-info">
                <div class="catalog-title">Conjunto Allure Black</div>
                <div class="catalog-desc">Sofisticação clássica em microfibra tecnológica respirável e rendas florais de alta definição.</div>
                <div class="catalog-action">
                  <span>Conforto Absoluto</span>
                  <span>Consulte Disponibilidade</span>
                </div>
              </div>
            </div>

            <div class="catalog-card">
              <img src="https://images.unsplash.com/photo-1590580499385-a72d73507d72?auto=format&fit=crop&q=80&w=600" />
              <div class="catalog-info">
                <div class="catalog-title">Body Renda Intense</div>
                <div class="catalog-desc">Perfeito para compor looks outwear. Design anatômico com sustentação estruturada de busto.</div>
                <div class="catalog-action">
                  <span>Elegância Versátil</span>
                  <span>Encomende Já</span>
                </div>
              </div>
            </div>

            <div class="catalog-card">
              <img src="https://images.unsplash.com/photo-1544030122-89198d5a7b6a?auto=format&fit=crop&q=80&w=600" />
              <div class="catalog-info">
                <div class="catalog-title">Caleçon Romance Rose</div>
                <div class="catalog-desc">Charme e delicadeza em tons pastéis de alta fidelidade de cor, com elasticidade anti-alérgica.</div>
                <div class="catalog-action">
                  <span>Sensualidade Suave</span>
                  <span>Disponível Sob Medida</span>
                </div>
              </div>
            </div>
          </div>
          
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();

    setTimeout(() => {
      setIsGeneratingCatalog(false);
      toast.success('Catálogo personalizado compilado com sucesso!');
    }, 1500);
  };

  const handleShareCatalogNative = () => {
    if (!nomeFranquia || !whatsappFranquia) {
      toast.error('Por favor, preencha o nome comercial e o WhatsApp para poder compartilhar.');
      return;
    }

    const shareData = {
      title: `Catálogo de Lingeries - ${nomeFranquia}`,
      text: `Confira os modelos exclusivos de alta costura da Avante Lingerie na minha franquia digital!`,
      url: `https://avantelingerie.com.br/catalogo-digital?nome=${encodeURIComponent(nomeFranquia)}&whats=${encodeURIComponent(whatsappFranquia)}`
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => toast.success('Catálogo compartilhado com sucesso!'))
        .catch((err) => console.log('Erro ao compartilhar:', err));
    } else {
      navigator.clipboard.writeText(shareData.url)
        .then(() => toast.success('Link do catálogo personalizado copiado! Envie para suas clientes.'));
    }
  };

  const handleShareCatalogWhatsApp = () => {
    if (!nomeFranquia || !whatsappFranquia) {
      toast.error('Por favor, preencha o nome comercial e o WhatsApp para poder compartilhar.');
      return;
    }

    const shareText = `✨ *Catálogo Exclusivo - Avante Lingerie Premium* ✨\n\nOlá! Separei com todo carinho as novidades de lingeries de alta costura da Coleção Satin Gold.\n\n💖 *Confira os modelos personalizados para a minha loja:*\n👉 https://avantelingerie.com.br/catalogo-digital?nome=${encodeURIComponent(nomeFranquia)}&whats=${encodeURIComponent(whatsappFranquia)}\n\n🛍️ *Para dúvidas e reservas de tamanhos, me chame aqui!* 🌹`;

    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  // Interactive simulated downloader
  const handleDownloadPackage = (pkg) => {
    if (downloadingId) return; // Prevent concurrent downloads

    setDownloadingId(pkg.id);
    setDownloadProgress(0);
    toast.info(`Compactando e preparando pacote: "${pkg.title}"...`);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setDownloadingId(null);
          setDownloadProgress(0);
          toast.success(`Download de "${pkg.title}" concluído!`);

          // Trigger actual download
          window.open(pkg.downloadUrl, '_blank');
        }, 300);
      }
      setDownloadProgress(progress);
    }, 150);
  };

  const handleCopyDownloadLink = (pkg) => {
    navigator.clipboard.writeText(pkg.downloadUrl)
      .then(() => {
        toast.success(`Link de "${pkg.title}" copiado para a área de transferência!`);
      });
  };

  const isGold = currentUser?.cadastro_completo && (currentUser?.is_gold || currentUser?.faturamento_acumulado > 3000);

  // Filter packages based on selected filter
  const filteredPackages = mediaFilter === 'todos'
    ? mediaPackages
    : mediaPackages.filter(p => p.type === mediaFilter);

  const isAdmin = currentUser?.email === 'admin@avantelingerie.com.br' || currentUser?.role === 'admin' || currentUser?.is_admin === true;

  // FORCE B2B ACTIVATION STEP REMOVED - NOW INLINE IN DOWNLOADS TAB

  // LOGGED-IN & FULLY ACTIVATED PORTAL (VIP Softer charcoal background #2c2c2c behind card components #1a1a1a)
  return (
    <div className="min-h-screen bg-[#2c2c2c] text-white overflow-x-hidden pt-24 md:pt-28 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Welcome Dashboard Banner */}
        <div className="bg-[#1a1a1a] text-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden mb-12 border border-[#b0874e]/20">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C59B5F]/10 rounded-full filter blur-3xl transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/5 rounded-full filter blur-3xl transform -translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C59B5F]/20 border border-[#C59B5F]/30 text-[#C59B5F] font-bold text-[10px] tracking-wider uppercase">
                <Crown className="w-3.5 h-3.5" /> Parceira {isGold ? 'Gold Elite' : 'Silver Verified'}
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Seja bem-vinda ao Portal, {currentUser?.nome || 'Revendedora Avante'}!
              </h1>
              <p className="text-white/70 text-sm font-light max-w-xl">
                Parabéns pelo seu faturamento! Você tem acesso a preços de fábrica exclusivos, kits com alto faturamento e recursos avançados de anúncios.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4 border-l border-white/10 pl-6 text-left shrink-0">
              <div>
                <p className="text-xxs uppercase tracking-wider text-white/40">Seu Nível B2B</p>
                <p className="text-xl font-bold font-serif text-[#C59B5F]">
                  {isGold ? 'Gold Elite' : 'Silver Verified'}
                </p>
              </div>
              <div>
                <p className="text-xxs uppercase tracking-wider text-white/40">Suporte Dedicado</p>
                <p className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1">
                  <Phone className="w-3.5 h-3.5" /> Ativo via Whats
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (VIP golden/white selectors) */}
        <div className="flex border-b border-white/10 gap-8 mb-8 overflow-x-auto pb-1 text-left font-serif text-sm">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-4 text-base font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 ${activeTab === 'dashboard' ? 'border-[#C59B5F] text-[#C59B5F]' : 'border-transparent text-white/40 hover:text-white'}`}
          >
            <Home className="w-4 h-4" /> Visão Geral
          </button>

          <button
            onClick={() => setActiveTab('downloads')}
            className={`pb-4 text-base font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 ${activeTab === 'downloads' ? 'border-[#C59B5F] text-[#C59B5F]' : 'border-transparent text-white/40 hover:text-white'}`}
          >
            <Download className="w-4 h-4" /> Central de Mídias
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`pb-4 text-base font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 ${activeTab === 'pricing' ? 'border-[#C59B5F] text-[#C59B5F]' : 'border-transparent text-white/40 hover:text-white'}`}
          >
            <Smartphone className="w-4 h-4" /> Precificadora Whats
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`pb-4 text-base font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 ${activeTab === 'catalog' ? 'border-[#C59B5F] text-[#C59B5F]' : 'border-transparent text-white/40 hover:text-white'}`}
          >
            <FileText className="w-4 h-4" /> Catálogo Personalizado
          </button>
        </div>

        {/* Tab Content rendering */}
        <AnimatePresence mode="wait">

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left"
            >

              <div className="lg:col-span-8 space-y-6">
                <div className="bg-[#1a1a1a] border border-[#b0874e]/30 p-6 md:p-8 rounded-3xl shadow-xl space-y-6">
                  <h3 className="text-xl font-serif font-bold text-white">Primeiros Passos da Revenda Premium</h3>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    Você agora é uma parceira oficial! Seu acesso permite comprar pacotes fechados de atacado direto na sacola de compras com descontos progressivos aplicados na hora. Use o menu acima para obter todas as ferramentas de vendas.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-[#C59B5F]/10 flex items-center justify-center text-[#C59B5F]">
                        <Download className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-xs text-white">Apoio Visual</h4>
                      <p className="text-xxs text-white/50 font-light">Baixe fotos profissionais tiradas em estúdio com modelos da marca para divulgar.</p>
                    </div>

                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-[#C59B5F]/10 flex items-center justify-center text-[#C59B5F]">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-xs text-white">Margens Próprias</h4>
                      <p className="text-xxs text-white/50 font-light">Calcule margens de até 150% e envie orçamentos persuasivos por WhatsApp em segundos.</p>
                    </div>

                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-[#C59B5F]/10 flex items-center justify-center text-[#C59B5F]">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-xs text-white">Logotipo no Catálogo</h4>
                      <p className="text-xxs text-white/50 font-light">Personalize o catálogo oficial em PDF com seus próprios dados e telefone no topo.</p>
                    </div>
                  </div>
                </div>

                {/* B2B Tier Progress Card - styled with thin gold border (#b0874e/30) & brand icons */}
                <div className="bg-[#1a1a1a] border border-[#b0874e]/30 p-6 md:p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#C59B5F]" /> Progresso de Prestígio B2B
                      </h3>
                      <p className="text-xs text-white/50 font-light mt-0.5">Sua jornada de compras acumuladas nesta coleção.</p>
                    </div>
                    <span className="text-xs bg-[#C59B5F]/15 border border-[#C59B5F]/20 text-[#C59B5F] px-3 py-1 rounded-full font-bold uppercase">
                      Nível {isGold ? 'Gold Elite' : 'Silver Verified'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Tier steps with highly premium inline brand icons */}
                    <div className="flex justify-between text-xs font-bold items-center gap-2">
                      <span className="flex items-center gap-1.5 text-amber-600/90 font-medium">
                        <Award className="w-4 h-4" /> Bronze Partner
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-300 font-extrabold">
                        <ShieldCheck className="w-4 h-4 text-slate-400" /> Silver Verified
                      </span>
                      <span className="flex items-center gap-1.5 text-[#C59B5F] font-extrabold animate-pulse">
                        <Crown className="w-4 h-4 text-[#C59B5F]" /> Gold Elite
                      </span>
                    </div>

                    {/* Progress Bar with glowing gold border */}
                    <div className="w-full h-4 bg-[#262626] rounded-full overflow-hidden border border-[#b0874e]/20 relative shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-[#2a2a2a] via-[#b0874e] to-[#C59B5F] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${Math.min(100, Math.round(((currentUser?.faturamento_acumulado || 1450) / 3000) * 100))}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-xs font-light text-white/50">
                      <span className="font-mono">R$ {(currentUser?.faturamento_acumulado || 1450).toLocaleString('pt-BR')} acumulado</span>
                      <span className="font-mono">Alvo: R$ 3.000,00</span>
                    </div>
                  </div>

                  {!isGold && (
                    <div className="bg-[#2c2c2c] border border-[#b0874e]/20 rounded-2xl p-4 flex gap-3.5 items-start">
                      <Sparkles className="w-5 h-5 text-[#C59B5F] shrink-0 mt-0.5 animate-pulse" />
                      <p className="text-xxs text-white/70 leading-relaxed m-0 font-light">
                        Faltam apenas <strong>R$ {(3000 - (currentUser?.faturamento_acumulado || 1450)).toLocaleString('pt-BR')}</strong> em compras para sua loja atingir o nível <strong>Gold Elite</strong>!
                        Ao atingir, você desbloqueia downloads ilimitados de vídeos promocionais sem marca d'água das modelos e prioridade absoluta no estoque da fábrica.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-[#1a1a1a] border border-[#b0874e]/30 p-6 md:p-8 rounded-3xl shadow-xl space-y-4">
                  <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-white">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" /> Benefícios Ativos da Sua Conta
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light text-white/70">
                    <div className="flex items-center gap-2 bg-[#262626] p-3 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Tabela de Preço Direto de Nova Friburgo
                    </div>
                    <div className="flex items-center gap-2 bg-[#262626] p-3 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Frete Subsidiado com Melhor Envio
                    </div>
                    <div className="flex items-center gap-2 bg-[#262626] p-3 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Selo de Segurança em Transações B2B
                    </div>
                    <div className="flex items-center gap-2 bg-[#262626] p-3 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Prioridade de Coleta nas Transportadoras
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="bg-[#1a1a1a] border border-[#b0874e]/30 text-white p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[300px]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C59B5F]/10 rounded-full filter blur-xl transform translate-x-1/2 -translate-y-1/2" />
                  <div className="space-y-4 relative z-10">
                    <span className="text-[#C59B5F] text-[10px] uppercase font-bold tracking-wider">Gerente B2B Exclusivo</span>
                    <h4 className="text-2xl font-serif font-bold text-white">Precisa de suporte ou encomendas sob medida?</h4>
                    <p className="text-xs text-white/60 font-light text-left">Seu faturamento garante assessoria VIP. Fale direto com nossa gerência de grandes contas pelo WhatsApp.</p>
                  </div>

                  <a
                    href="https://wa.me/5522999999999"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 px-6 py-3.5 bg-[#C59B5F] hover:bg-[#b0874e] text-black font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" /> Falar com Suporte VIP
                  </a>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: CENTRAL DE MÍDIAS PRIVADA */}
          {activeTab === 'downloads' && (
            <motion.div
              key="downloads"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 text-left"
            >
              {!currentUser?.cadastro_completo && !isAdmin ? (
                <div className="max-w-3xl mx-auto bg-[#1a1a1a] border border-[#b0874e]/30 rounded-3xl p-8 shadow-2xl space-y-6 text-white text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                      <AlertCircle className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl text-white">Downloads de Mídias Bloqueados</h3>
                      <span className="text-[9px] uppercase tracking-wider text-amber-500 font-bold">Documentação Pendente</span>
                    </div>
                  </div>

                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Você já possui acesso ao portal e às ferramentas, porém o download de criativos, fotos de estúdio e Reels das modelos é exclusivo para revendedoras com cadastro comercial completo. Preencha seus dados abaixo e aguarde a aprovação da diretoria para liberar o acesso.
                  </p>

                  <form onSubmit={handleActivationSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xxs font-bold uppercase tracking-wider text-white/60">CPF ou CNPJ comercial</label>
                      <input
                        type="text"
                        placeholder="000.000.000-00 ou 00.000.000/0000-00"
                        value={activationForm.cpf_cnpj}
                        onChange={(e) => setActivationForm({ ...activationForm, cpf_cnpj: e.target.value })}
                        className="w-full px-4 py-3 border border-white/10 focus:border-[#C59B5F] rounded-xl outline-none text-sm bg-[#262626] text-white"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xxs font-bold uppercase tracking-wider text-white/60">WhatsApp de Vendas</label>
                        <input
                          type="tel"
                          placeholder="(00) 90000-0000"
                          value={activationForm.whatsapp}
                          onChange={(e) => setActivationForm({ ...activationForm, whatsapp: e.target.value })}
                          className="w-full px-4 py-3 border border-white/10 focus:border-[#C59B5F] rounded-xl outline-none text-sm bg-[#262626] text-white"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xxs font-bold uppercase tracking-wider text-white/60">Cidade / Estado</label>
                        <input
                          type="text"
                          placeholder="Ex: Nova Friburgo / RJ"
                          value={activationForm.cidade_estado}
                          onChange={(e) => setActivationForm({ ...activationForm, cidade_estado: e.target.value })}
                          className="w-full px-4 py-3 border border-white/10 focus:border-[#C59B5F] rounded-xl outline-none text-sm bg-[#262626] text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xxs font-bold uppercase tracking-wider text-white/60">Endereço Completo de Entrega</label>
                      <input
                        type="text"
                        placeholder="Rua, número, complemento e CEP"
                        value={activationForm.endereco}
                        onChange={(e) => setActivationForm({ ...activationForm, endereco: e.target.value })}
                        className="w-full px-4 py-3 border border-white/10 focus:border-[#C59B5F] rounded-xl outline-none text-sm bg-[#262626] text-white"
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isActivating}
                        className="w-full py-3.5 bg-[#C59B5F] hover:bg-[#b0874e] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isActivating ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Enviar Dados para Aprovação'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <div className="max-w-3xl space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-white">Downloads de Imagens & Reels Profissionais</h3>
                    <p className="text-sm text-white/70 font-light leading-relaxed">
                      Ganhe tempo produzir conteúdo! Faça download de pacotes fechados de fotos autorizadas do estúdio oficial da Avante Lingerie para anunciar e postar antes mesmo do estoque físico chegar.
                    </p>
                  </div>

                  {/* Filtros de Mídia */}
                  <div className="flex border-b border-white/10 gap-4 mb-6 pb-2 overflow-x-auto scrollbar-none">
                    {[
                      { id: 'todos', label: 'Todos os Materiais' },
                      { id: 'fotos', label: 'Fotos Premium (Atacado)' },
                      { id: 'videos', label: 'Vídeos Reels & TikTok' },
                      { id: 'canva', label: 'Canva & Banners Editáveis' }
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setMediaFilter(filter.id)}
                        className={`px-4 py-2 text-[10px] font-extrabold transition-all rounded-full shrink-0 border uppercase tracking-wider ${mediaFilter === filter.id
                          ? 'bg-[#C59B5F] text-black border-[#C59B5F] shadow-sm'
                          : 'bg-[#1a1a1a] text-white/60 border-white/10 hover:border-[#C59B5F] hover:text-white'
                          }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  {/* Visual Grid of media packages */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                    {filteredPackages.map((pkg) => {
                      const isDownloadingThis = downloadingId === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          className="bg-[#1a1a1a] border border-[#b0874e]/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between hover:border-[#C59B5F] transition-all duration-300 group hover:shadow-[#C59B5F]/5 relative"
                        >
                          {/* Image Thumbnail with Overlay */}
                          <div className="relative aspect-video overflow-hidden shrink-0 bg-[#2c2c2c]">
                            <img
                              src={pkg.thumbnail}
                              alt={pkg.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 to-transparent pointer-events-none" />

                            {/* Badges on Thumbnail */}
                            <div className="absolute top-4 left-4 flex gap-2">
                              <span className="text-[9px] bg-black/85 border border-[#C59B5F]/40 backdrop-blur text-[#C59B5F] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm">
                                {pkg.badge}
                              </span>
                            </div>

                            <div className="absolute bottom-4 right-4 text-xxs bg-black/85 border border-white/10 backdrop-blur text-white px-2 py-0.5 rounded font-mono font-medium">
                              {pkg.size}
                            </div>
                          </div>

                          {/* Content Box */}
                          <div className="p-6 flex-grow flex flex-col justify-between">
                            <div className="space-y-3 text-left">
                              <span className="text-[10px] text-[#C59B5F] uppercase font-bold tracking-widest">{pkg.details}</span>
                              <h4 className="font-bold font-serif text-base text-white leading-snug group-hover:text-[#C59B5F] transition-colors">
                                {pkg.title}
                              </h4>
                              <p className="text-xs text-white/60 font-light leading-relaxed">
                                {pkg.description}
                              </p>
                            </div>

                            {/* Interactive download status overlay inside the card body when active */}
                            {isDownloadingThis && (
                              <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-bold text-white/60">
                                  <span className="flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 animate-spin text-[#C59B5F]" /> Compactando pacote...</span>
                                  <span className="font-mono">{downloadProgress}%</span>
                                </div>
                                <div className="w-full h-2 bg-[#2c2c2c] rounded-full overflow-hidden border border-white/10">
                                  <div
                                    className="h-full bg-gradient-to-r from-[#b0874e] to-[#C59B5F] rounded-full transition-all duration-150"
                                    style={{ width: `${downloadProgress}%` }}
                                  />
                                </div>
                              </div>
                            )}

                            {/* Card Action footer */}
                            {!isDownloadingThis && (
                              <div className="pt-5 border-t border-white/5 mt-5 flex justify-between items-center text-xs">
                                <span className="text-[10px] text-white/40 uppercase font-extrabold tracking-wider">{pkg.typeName}</span>

                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleCopyDownloadLink(pkg)}
                                    className="p-2.5 bg-[#262626] border border-white/5 hover:bg-[#333333] text-white/80 rounded-xl transition-all duration-300 flex items-center justify-center"
                                    title="Copiar link de download"
                                  >
                                    <Share2 className="w-3.5 h-3.5 text-[#C59B5F]" />
                                  </button>

                                  <button
                                    onClick={() => handleDownloadPackage(pkg)}
                                    disabled={!!downloadingId}
                                    className="px-4 py-2.5 bg-[#C59B5F] hover:bg-[#b0874e] text-black rounded-xl transition-all duration-300 flex items-center gap-2 font-bold uppercase text-[10px] tracking-wider disabled:opacity-50"
                                  >
                                    <Download className="w-3.5 h-3.5" /> Baixar
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Manual/Playbook de Divulgação */}
                  <div className="bg-[#1a1a1a] border border-[#b0874e]/30 text-white rounded-3xl p-6 md:p-8 mt-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C59B5F]/10 rounded-full filter blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                    <h3 className="text-lg font-serif font-bold text-[#C59B5F] mb-6 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#C59B5F] animate-pulse" /> Como Vender Lingerie Usando Essas Mídias (Método Avante 2026)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
                        <span className="text-xxs uppercase tracking-wider text-[#C59B5F] font-bold">Passo 1: Antecipação</span>
                        <h5 className="font-bold text-xs text-white">Gere Curiosidade no WhatsApp</h5>
                        <p className="text-xxs text-white/70 font-light leading-relaxed">
                          Não poste todas as fotos de uma vez. Baixe os lotes e solte 2 a 3 fotos de estúdio nos seus status do WhatsApp com legendas instigantes: <em>"A coleção mais macia do ano está chegando... Faça sua reserva de tamanho"</em>.
                        </p>
                      </div>

                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
                        <span className="text-xxs uppercase tracking-wider text-[#C59B5F] font-bold">Passo 2: Humanização</span>
                        <h5 className="font-bold text-xs text-white">Use os Reels para Engajamento</h5>
                        <p className="text-xxs text-white/70 font-light leading-relaxed">
                          Os vídeos sem marca d'água das modelos são perfeitos para Reels. Poste-os adicionando uma música em alta do Instagram e grave sua voz por cima (Voiceover) explicando as vantagens do fecho banhado a ouro e tecidos antialérgicos.
                        </p>
                      </div>

                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
                        <span className="text-xxs uppercase tracking-wider text-[#C59B5F] font-bold">Passo 3: Call to Action</span>
                        <h5 className="font-bold text-xs text-white">Precifique e Feche Pedidos</h5>
                        <p className="text-xxs text-white/70 font-light leading-relaxed">
                          Use a nossa aba <strong>Precificadora Whats</strong> para calcular instantaneamente o valor Pix (10% OFF) e parcelado. Envie a mensagem formatada para as clientes que demonstraram interesse nas mídias postadas. A taxa de conversão sobe até 180%!
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* TAB 3: PRECIFICADORA INTELIGENTE WHATSAPP */}
          {activeTab === 'pricing' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left"
            >

              {/* Calculator card - styled with #1a1a1a background & ultra-thin gold border (#b0874e/30) */}
              <div className="lg:col-span-7 bg-[#1a1a1a] border border-[#b0874e]/30 p-6 md:p-8 rounded-3xl shadow-2xl space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-white">
                    <Smartphone className="w-5 h-5 text-[#C59B5F]" /> Precificadora de WhatsApp
                  </h3>
                  <p className="text-xs text-white/60 font-light">Calcule seu preço de venda com base no custo de fábrica, configure as margens de desconto/parcelas e copie uma mensagem pronta para mandar para clientes.</p>
                </div>

                <div className="space-y-5 pt-4 border-t border-white/10">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/70">Preço de Custo no Atacado (R$)</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[#C59B5F] font-bold text-sm">R$</span>
                      <input
                        type="number"
                        value={custoPeca}
                        onChange={(e) => setCustoPeca(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3.5 border border-[#b0874e]/30 focus:border-[#C59B5F] rounded-xl outline-none font-bold bg-[#262626] text-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Customizable Commercial Offer / Brand Title */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/70">Nome da Oferta / Loja Comercial</label>
                    <input
                      type="text"
                      value={nomeOferta}
                      onChange={(e) => setNomeOferta(e.target.value)}
                      placeholder="Ex: Lingerie Closet da Maria"
                      className="w-full px-4 py-3 border border-white/10 focus:border-[#C59B5F] rounded-xl outline-none text-sm bg-[#262626] text-white transition-all"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-white/75">
                      <span>Margem de Lucro Desejada</span>
                      <span className="text-lg font-serif font-bold text-[#C59B5F]">{margemLucro}%</span>
                    </div>
                    {/* distinct range slider bar */}
                    <div className="relative pt-1">
                      <input
                        type="range"
                        min="50"
                        max="250"
                        step="5"
                        value={margemLucro}
                        onChange={(e) => setMargemLucro(Number(e.target.value))}
                        className="w-full h-2.5 bg-[#262626] rounded-lg appearance-none cursor-pointer accent-[#C59B5F] border border-white/10"
                      />
                    </div>
                    <div className="flex justify-between text-xxs text-white/40 font-bold">
                      <span>Mínima: 50%</span>
                      <span>Média: 120%</span>
                      <span>Elite: 250%</span>
                    </div>
                  </div>

                  {/* Customizable Partner Discounts & Installments */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-white/60">Desconto Pix (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={descontoPix}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDescontoPix(val === '' ? '' : Number(val));
                        }}
                        placeholder="Ex: 10"
                        className="w-full px-3 py-2 border border-white/10 focus:border-[#C59B5F] rounded-xl outline-none font-bold text-xs bg-[#262626] text-white transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-white/60">Parcelas no Cartão</label>
                      <select
                        value={numParcelas}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNumParcelas(val === '' ? '' : Number(val));
                        }}
                        className="w-full px-3 py-2 border border-white/10 focus:border-[#C59B5F] rounded-xl outline-none font-bold text-xs bg-[#262626] text-white transition-all"
                      >
                        <option value="">Selecione...</option>
                        {[1, 2, 3, 4, 5, 6, 10, 12].map(n => (
                          <option key={n} value={n}>{n}x sem juros</option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>
              </div>

              {/* Orçamento Calculado Premium Card - styled with #1a1a1a background & thin gold border (#b0874e/30) */}
              <div className="lg:col-span-5 bg-[#1a1a1a] border border-[#b0874e]/30 text-white p-8 rounded-3xl shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C59B5F]/10 rounded-full filter blur-xl transform translate-x-1/2 -translate-y-1/2" />

                <div className="space-y-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[#C59B5F] text-[10px] uppercase font-bold tracking-wider">Orçamento Calculado</span>

                    {/* Interactive conditional view: only displays calculations when Pix discount and installments are entered */}
                    {!showTotal ? (
                      <div className="flex flex-col items-center justify-center border border-dashed border-[#b0874e]/30 rounded-2xl p-6 text-center space-y-4 my-auto min-h-[220px]">
                        <Sparkles className="w-8 h-8 text-[#C59B5F] animate-pulse" />
                        <div className="space-y-1">
                          <h5 className="font-serif font-bold text-sm text-[#C59B5F]">Gerar Orçamento VIP</h5>
                          <p className="text-xxs text-white/50 leading-relaxed max-w-[240px]">
                            Insira a porcentagem do Pix e a quantidade de parcelas ao lado para liberar os cálculos e a prévia do WhatsApp.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3 border-b border-white/10 pb-4">
                          <div className="flex justify-between text-xs text-white/60">
                            <span>Valor Sugerido:</span>
                            <span className="font-bold text-white">R$ {valorSugerido.toLocaleString('pt-BR')}</span>
                          </div>
                          <div className="flex justify-between text-xs text-[#C59B5F] font-bold">
                            <span>À vista Pix ({descontoPix}% OFF):</span>
                            <span>R$ {valorPix.toLocaleString('pt-BR')}</span>
                          </div>
                          <div className="flex justify-between text-xs text-white/60">
                            <span>No cartão ({numParcelas}x sem juros):</span>
                            <span className="font-bold text-white">{numParcelas}x de R$ {parcelaCartao}</span>
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-white/40 uppercase font-semibold">Prévia do WhatsApp</span>
                            <Heart className="w-3.5 h-3.5 text-[#C59B5F] fill-current" />
                          </div>
                          <p className="text-[10px] text-white/70 leading-normal whitespace-pre-line font-light italic text-left">
                            ✨ *Oferta Especial - ${nomeOferta}* ✨
                            {"\n\n"}Oi, querida! Veja que conjunto maravilhoso acabei de separar para você:
                            {"\n\n"}🛍️ *${nomeOferta}*
                            {"\n"}💵 *Preço Especial:* R$ {valorSugerido.toLocaleString('pt-BR')}
                            {"\n"}💸 *À vista no Pix ({descontoPix}% OFF):* R$ {valorPix.toLocaleString('pt-BR')}
                            {"\n"}💳 *Ou parcelado:* {numParcelas}x de R$ {parcelaCartao} sem juros!
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Premium Copy & Share button layout */}
                {showTotal && (
                  <div className="grid grid-cols-3 gap-2 mt-6">
                    <button
                      onClick={handleCopyWhatsAppMsg}
                      disabled={copiandoPreco}
                      className="py-3.5 bg-[#C59B5F] hover:bg-[#b0874e] text-black font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                      title="Copiar texto formatado"
                    >
                      {copiandoPreco ? (
                        <>Copiado <CheckCircle2 className="w-3.5 h-3.5" /></>
                      ) : (
                        <>Copiar <Copy className="w-3.5 h-3.5" /></>
                      )}
                    </button>

                    <button
                      onClick={handleShareWhatsAppMsg}
                      className="py-3.5 border border-[#C59B5F]/40 hover:bg-[#C59B5F] hover:text-black text-[#C59B5F] font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                      title="Enviar pelo WhatsApp Web/Mobile"
                    >
                      Whats <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleShareNativeMsg}
                      className="py-3.5 bg-[#262626] border border-white/10 hover:bg-[#333333] text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                      title="Compartilhar nativo (Celular)"
                    >
                      Enviar <Share2 className="w-3.5 h-3.5 text-[#C59B5F]" />
                    </button>
                  </div>
                )}
              </div>

            </motion.div>
          )}

          {/* TAB 4: CATÁLOGO PERSONALIZADO */}
          {activeTab === 'catalog' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left"
            >

              <div className="lg:col-span-7 bg-[#1a1a1a] border border-[#b0874e]/30 p-6 md:p-8 rounded-3xl shadow-2xl space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-white">
                    <FileText className="w-5 h-5 text-[#C59B5F]" /> Gerador de Catálogo Personalizado (PDF)
                  </h3>
                  <p className="text-xs text-white/60 font-light">Digite seus dados comerciais para gerar um catálogo oficial em alta definição aplicando um cabeçalho personalizado com os seus dados de vendas.</p>
                </div>

                <form onSubmit={handlePrintCatalog} className="space-y-4 pt-4 border-t border-white/10">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/70">Nome da sua Marca / Franquia de Revenda</label>
                    <input
                      type="text"
                      placeholder="Ex: Lingerie Closet da Maria"
                      value={nomeFranquia}
                      onChange={(e) => setNomeFranquia(e.target.value)}
                      className="w-full px-4 py-3.5 border border-white/10 focus:border-[#C59B5F] rounded-xl outline-none text-sm bg-[#262626] text-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/70">Seu Telefone de Contato B2C (WhatsApp)</label>
                    <input
                      type="tel"
                      placeholder="Ex: (00) 98888-8888"
                      value={whatsappFranquia}
                      onChange={(e) => setWhatsappFranquia(e.target.value)}
                      className="w-full px-4 py-3.5 border border-white/10 focus:border-[#C59B5F] rounded-xl outline-none text-sm bg-[#262626] text-white"
                      required
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isGeneratingCatalog}
                      className="w-full py-4 bg-[#C59B5F] hover:bg-[#b0874e] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                    >
                      {isGeneratingCatalog ? (
                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                      ) : (
                        <>Gerar Catálogo Personalizado PDF <Sparkles className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>

                  {/* Premium Share Options Panel */}
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                    <p className="text-xxs uppercase tracking-wider text-white/50 font-bold">Opções de Compartilhamento B2B</p>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={handleShareCatalogWhatsApp}
                        className="py-3 px-4 border border-white/10 hover:border-emerald-500 bg-[#262626] text-white hover:text-emerald-400 font-bold text-xxs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Share2 className="w-3.5 h-3.5" /> Enviar p/ WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={handleShareCatalogNative}
                        className="py-3 px-4 border border-[#C59B5F] bg-[#262626] text-white hover:text-[#C59B5F] font-bold text-xxs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Outras Redes
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Interactive preview box */}
              <div className="lg:col-span-5 bg-[#1a1a1a] border border-[#b0874e]/30 text-white p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full filter blur-xl transform translate-x-1/2 -translate-y-1/2" />

                <div className="space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[#C59B5F] text-[10px] uppercase font-bold tracking-wider">Prévia de Cabeçalho do Catálogo</span>

                    <div className="bg-white text-black p-4 rounded-xl border border-white/10 text-center space-y-2">
                      <p className="text-[9px] text-[#C59B5F] font-bold tracking-widest">REVENDEDORA AUTORIZADA EXCLUSIVA</p>
                      <h5 className="font-serif font-bold text-sm text-[#1a1a1a]">
                        {nomeFranquia.trim() ? nomeFranquia.toUpperCase() : 'NOME DO SEU NEGÓCIO'}
                      </h5>
                      <p className="text-[10px] text-gray-500">
                        Faça seus pedidos via WhatsApp: <strong>{whatsappFranquia || '(00) 90000-0000'}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2 text-xs font-light text-white/60">
                    <p className="flex items-start gap-2"><Info className="w-4 h-4 text-[#C59B5F] shrink-0 mt-0.5" /> <span>O cabeçalho será injetado no topo de todas as páginas do catálogo impresso.</span></p>
                    <p className="flex items-start gap-2"><Info className="w-4 h-4 text-[#C59B5F] shrink-0 mt-0.5" /> <span>Ao imprimir, configure as margens como padrão e salve o arquivo como <strong>Salvar como PDF</strong> no seu navegador.</span></p>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}