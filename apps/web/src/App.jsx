// Caminho do arquivo: App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';

import { AuthProvider } from '@/context/AuthContext.jsx';
import { AdminAuthProvider, useAdminAuth } from '@/context/AdminAuthContext.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import ErrorBoundary from '@/components/ErrorBoundary.jsx';
import apiServerClient from '@/lib/apiServerClient.js';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HomePage from '@/pages/HomePage.jsx';
import ProductPage from '@/pages/ProductPage.jsx';
import CartPage from '@/pages/CartPage.jsx';
import Checkout from '@/pages/Checkout.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import OrderConfirmation from '@/pages/OrderConfirmation.jsx';
import CategoryPage from '@/pages/CategoryPage.jsx';
import ComingSoonPage from '@/pages/ComingSoonPage.jsx';
import CookieBanner from '@/components/CookieBanner.jsx';
import CentralDaClientePage from '@/pages/CentralDaClientePage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import RastreioPage from '@/pages/RastreioPage.jsx';
import MedidasPage from '@/pages/MedidasPage.jsx';
import MinhaContaPage from '@/pages/MinhaContaPage.jsx';
import QueroRevenderPage from '@/pages/QueroRevenderPage.jsx';
import ProtectedRouteReseller from '@/components/ProtectedRouteReseller.jsx';
import ResellerPortalPage from '@/pages/ResellerPortalPage.jsx';
import useMarketingTracker from '@/hooks/useMarketingTracker.js';
import { initializePixels } from '@/lib/marketingPixels.js';

// Admin Components
import AdminLogin from '@/pages/admin/AdminLogin.jsx';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import DashboardPage from '@/pages/admin/DashboardPage.jsx';
import ProdutosListagem from '@/pages/admin/ProdutosListagem.jsx';
import ProdutoForm from '@/pages/admin/ProdutoForm.jsx';
import CategoriasManager from '@/pages/admin/CategoriasManager.jsx';
import EstoqueListagem from '@/pages/admin/EstoqueListagem.jsx';
import ConfiguracoesEstoque from '@/pages/admin/ConfiguracoesEstoque.jsx';
import DescontosPage from '@/pages/admin/DescontosPage.jsx';
import PedidosPage from '@/pages/admin/PedidosPage.jsx';
import PedidoDetalhePage from '@/pages/admin/PedidoDetalhePage.jsx';
import NovoPedidoPage from '@/pages/admin/NovoPedidoPage.jsx';
import ClientesPage from '@/pages/admin/ClientesPage.jsx';
import ClienteDetalhePage from '@/pages/admin/ClienteDetalhePage.jsx';
import IntegracoesList from '@/pages/admin/IntegracoesList.jsx';
import ConfiguracoesLoja from '@/pages/admin/ConfiguracoesLoja.jsx';
import ConfiguracoesFrete from '@/pages/admin/ConfiguracoesFrete.jsx';
import AnalyticsPage from '@/pages/admin/AnalyticsPage.jsx';
import LiaAdminPage from '@/pages/admin/LiaAdminPage.jsx';

// Catch-all 404 Component
const NotFound = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-4">
    <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-6 text-foreground">Página não encontrada</h2>
    <p className="text-muted-foreground mb-8">A página que você está procurando não existe ou foi movida.</p>
    <a href="/" className="px-8 py-3 bg-[#3A2E2A] text-white rounded-xl font-bold hover:bg-[#2A1E1A] transition-colors">
      VOLTAR PARA O INÍCIO
    </a>
  </div>
);

// Premium Inline Pages for perfect brand identity and preventing 404/blank pages
const SobrePage = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#FFFBF8] pt-24 md:pt-32">
    <h1 className="text-4xl md:text-5.5xl font-serif font-bold text-[#c59b5f] mb-6 drop-shadow-sm">Sobre a Avante</h1>
    <p className="text-gray-600 max-w-2xl text-base md:text-lg font-light leading-relaxed mb-8">
      Nascida na Capital Nacional da Lingerie, em Nova Friburgo, a Avante Lingerie foi concebida para redefinir o conceito de elegância e conforto íntimo. Cada peça é uma joia artesanal de alta costura, desenhada para moldar e valorizar as curvas do corpo feminino com rendas francesas hipoalergênicas e materiais tecnológicos de compressão suave.
    </p>
    <a href="/" className="px-8 py-3.5 bg-[#121212] hover:bg-[#c59b5f] text-white hover:text-black rounded-full font-bold transition-all duration-300 shadow-md uppercase tracking-wider text-xs">
      Explorar Coleções
    </a>
  </div>
);

const LojasPage = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#FFFBF8] pt-24 md:pt-32">
    <h1 className="text-4xl md:text-5.5xl font-serif font-bold text-[#c59b5f] mb-6 drop-shadow-sm">Nossas Lojas</h1>
    <p className="text-gray-600 max-w-2xl text-base md:text-lg font-light leading-relaxed mb-8">
      Nossa loja física e ateliê central estão localizados na Capital Nacional da Lingerie. Venha conhecer nosso espaço físico, experimentar nossas modelagens e receber atendimento VIP.
    </p>
    <div className="bg-white border border-[#c59b5f]/15 rounded-3xl p-8 max-w-md w-full shadow-premium-sm text-left mb-8">
      <h3 className="font-bold text-gray-900 mb-2 font-serif text-lg">Ateliê Nova Friburgo</h3>
      <p className="text-xs text-gray-500 mb-4">Rua Folly, 69, Olaria, Nova Friburgo — RJ</p>
      <p className="text-xs text-gray-600 font-bold mb-1">Segunda a Quinta: 08:00h às 17:00h</p>
      <p className="text-xs text-gray-600 font-bold">Sexta: 08:00h às 13:00h</p>
    </div>
    <a href="/contato" className="px-8 py-3.5 bg-[#121212] hover:bg-[#c59b5f] text-white hover:text-black rounded-full font-bold transition-all duration-300 shadow-md uppercase tracking-wider text-xs">
      Fale Conosco
    </a>
  </div>
);

import LiaWidget from '@/components/LiaWidget.jsx';

// Wrapper component to use useLocation hook for public routes
const StoreLayout = ({ children }) => {
  const location = useLocation();
  
  const isFullBleed = location.pathname === '/' || 
                      location.pathname === '/cart' || 
                      location.pathname === '/login' || 
                      location.pathname === '/checkout' ||
                      location.pathname === '/contato' ||
                      location.pathname === '/rastreio' ||
                      location.pathname === '/central-da-cliente' ||
                      location.pathname === '/account' ||
                      location.pathname === '/pedidos' ||
                      location.pathname === '/sobre' ||
                      location.pathname === '/lojas' ||
                      location.pathname === '/faq' ||
                      location.pathname === '/quero-revender' ||
                      location.pathname === '/portal-revenda' ||
                      location.pathname.includes('/order-confirmation') ||
                      location.pathname.includes('/categoria');

  return (
    <div className="min-h-screen flex flex-col w-full bg-background font-sans">
      <Header />
      <main className={`flex-grow w-full ${isFullBleed ? '' : 'pt-[72px] md:pt-[88px]'}`}>
        {children}
      </main>
      <Footer />
      <LiaWidget />
    </div>
  );
};

// Interceptor component to handle Coming Soon mode globally
const AppInterceptor = () => {
  const location = useLocation();
  const { currentAdmin } = useAdminAuth();
  
  // Track and capture UTM marketing parameters automatically
  useMarketingTracker();

  // Initialize marketing tracking pixels (Meta / Google) dynamically
  useEffect(() => {
    initializePixels();
  }, []);

  const [isComingSoonMode, setIsComingSoonMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const checkComingSoonMode = async () => {
      // Set a timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        console.warn('Coming Soon API timeout - defaulting to normal mode');
        setIsComingSoonMode(false);
        setIsLoading(false);
      }, 5000);

      try {
        const response = await apiServerClient.fetch('/configuracoes/modo-em-breve');
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          setIsComingSoonMode(!!data.modo_em_breve);
          setHasError(false);
        } else {
          console.warn('Coming Soon API returned non-OK status - defaulting to normal mode');
          setIsComingSoonMode(false);
          setHasError(false);
        }
      } catch (error) {
        clearTimeout(timeoutId);
        console.error('Failed to fetch coming soon config:', error);
        // On error, default to normal mode (not coming soon) so users can access the site
        setIsComingSoonMode(false);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkComingSoonMode();
  }, []);

  // Show minimal loading state (max 5 seconds due to timeout)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFBF8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#c59b5f] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm font-light">Carregando...</p>
        </div>
      </div>
    );
  }

  const shouldShowComingSoon = isComingSoonMode && !currentAdmin;

  // Intercept public routes when in Coming Soon mode and not an admin
  if (shouldShowComingSoon && !location.pathname.startsWith('/admin')) {
    return <ComingSoonPage />;
  }

  return (
    <Routes>
      {/* Admin Routes - Wrapped with ErrorBoundary */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      <Route path="/admin" element={
        <ErrorBoundary>
          <ProtectedRoute isAdminRoute={true}>
            <AdminLayout />
          </ProtectedRoute>
        </ErrorBoundary>
      }>
        <Route index element={<ErrorBoundary><DashboardPage /></ErrorBoundary>} />
        <Route path="produtos" element={<ErrorBoundary><ProdutosListagem /></ErrorBoundary>} />
        <Route path="produtos/novo" element={<ErrorBoundary><ProdutoForm /></ErrorBoundary>} />
        <Route path="produtos/:id/editar" element={<ErrorBoundary><ProdutoForm /></ErrorBoundary>} />
        <Route path="categorias" element={<ErrorBoundary><CategoriasManager /></ErrorBoundary>} />
        <Route path="estoque" element={<ErrorBoundary><EstoqueListagem /></ErrorBoundary>} />
        <Route path="descontos" element={<ErrorBoundary><DescontosPage /></ErrorBoundary>} />
        <Route path="configuracoes" element={<ErrorBoundary><ConfiguracoesEstoque /></ErrorBoundary>} />
        <Route path="configuracoes/loja" element={<ErrorBoundary><ConfiguracoesLoja /></ErrorBoundary>} />
        <Route path="configuracoes/frete" element={<ErrorBoundary><ConfiguracoesFrete /></ErrorBoundary>} />
        <Route path="integracoes" element={<ErrorBoundary><IntegracoesList /></ErrorBoundary>} />
        <Route path="analytics" element={<ErrorBoundary><AnalyticsPage /></ErrorBoundary>} />
        <Route path="pedidos" element={<ErrorBoundary><PedidosPage /></ErrorBoundary>} />
        <Route path="pedidos/novo" element={<ErrorBoundary><NovoPedidoPage /></ErrorBoundary>} />
        <Route path="pedidos/:id" element={<ErrorBoundary><PedidoDetalhePage /></ErrorBoundary>} />
        <Route path="clientes" element={<ErrorBoundary><ClientesPage /></ErrorBoundary>} />
        <Route path="clientes/:id" element={<ErrorBoundary><ClienteDetalhePage /></ErrorBoundary>} />
        <Route path="lia" element={<ErrorBoundary><LiaAdminPage /></ErrorBoundary>} />
      </Route>

      {/* Store Routes - Wrapped with ErrorBoundary */}
      <Route path="/*" element={
        <ErrorBoundary>
          <StoreLayout>
            <Routes>
              <Route path="/" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
              <Route path="/produto/:id" element={<ErrorBoundary><ProductPage /></ErrorBoundary>} />
              <Route path="/produto" element={<ErrorBoundary><ProductPage /></ErrorBoundary>} />
              <Route path="/categoria/:categoryName" element={<ErrorBoundary><CategoryPage /></ErrorBoundary>} />
              <Route path="/login" element={<ErrorBoundary><LoginPage /></ErrorBoundary>} />
              <Route path="/checkout" element={<ErrorBoundary><Checkout /></ErrorBoundary>} />
              <Route path="/order-confirmation/:orderId" element={<ErrorBoundary><OrderConfirmation /></ErrorBoundary>} />
              <Route path="/central-da-cliente" element={<ErrorBoundary><CentralDaClientePage /></ErrorBoundary>} />
              <Route path="/contato" element={<ErrorBoundary><ContactPage /></ErrorBoundary>} />
              <Route path="/rastreio" element={<ErrorBoundary><RastreioPage /></ErrorBoundary>} />
              <Route path="/medidas" element={<ErrorBoundary><MedidasPage /></ErrorBoundary>} />
              <Route path="/sobre" element={<ErrorBoundary><SobrePage /></ErrorBoundary>} />
              <Route path="/lojas" element={<ErrorBoundary><LojasPage /></ErrorBoundary>} />
              <Route path="/faq" element={<ErrorBoundary><CentralDaClientePage /></ErrorBoundary>} />
              <Route path="/quero-revender" element={<ErrorBoundary><QueroRevenderPage /></ErrorBoundary>} />
              <Route 
                path="/portal-revenda" 
                element={
                  <ErrorBoundary>
                    <ProtectedRouteReseller>
                      <ResellerPortalPage />
                    </ProtectedRouteReseller>
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/account" 
                element={
                  <ErrorBoundary>
                    <ProtectedRoute>
                      <MinhaContaPage />
                    </ProtectedRoute>
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/pedidos" 
                element={
                  <ErrorBoundary>
                    <ProtectedRoute>
                      <MinhaContaPage initialTab="pedidos" />
                    </ProtectedRoute>
                  </ErrorBoundary>
                } 
              />
              <Route path="/cart" element={<ErrorBoundary><CartPage /></ErrorBoundary>} />
              <Route path="*" element={<ErrorBoundary><NotFound /></ErrorBoundary>} />
            </Routes>
          </StoreLayout>
        </ErrorBoundary>
      } />
    </Routes>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AdminAuthProvider>
            <ScrollToTop />
            <AppInterceptor />
            <CookieBanner />
            <Toaster position="bottom-right" richColors />
          </AdminAuthProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}