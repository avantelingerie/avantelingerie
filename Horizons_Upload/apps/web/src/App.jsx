
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
import SobrePage from '@/pages/SobrePage.jsx';
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

  useEffect(() => {
    const checkComingSoonMode = async () => {
      try {
        const response = await apiServerClient.fetch('/configuracoes/modo-em-breve');
        if (response.ok) {
          const data = await response.json();
          setIsComingSoonMode(!!data.modo_em_breve);
        } else {
          setIsComingSoonMode(false);
        }
      } catch (error) {
        console.error('Failed to fetch coming soon config:', error);
        setIsComingSoonMode(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkComingSoonMode();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-[#0a0a1a]" />;
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
      </Route>

      {/* Store Routes */}
      <Route path="/*" element={
        <StoreLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produto/:id" element={<ProductPage />} />
            <Route path="/produto" element={<ProductPage />} />
            <Route path="/categoria/:categoryName" element={<CategoryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/central-da-cliente" element={<CentralDaClientePage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/rastreio" element={<RastreioPage />} />
            <Route path="/medidas" element={<MedidasPage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/faq" element={<CentralDaClientePage />} />
            <Route path="/quero-revender" element={<QueroRevenderPage />} />
            <Route 
              path="/portal-revenda" 
              element={
                <ProtectedRouteReseller>
                  <ResellerPortalPage />
                </ProtectedRouteReseller>
              } 
            />
            <Route 
              path="/account" 
              element={
                <ProtectedRoute>
                  <MinhaContaPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pedidos" 
              element={
                <ProtectedRoute>
                  <MinhaContaPage initialTab="pedidos" />
                </ProtectedRoute>
              } 
            />
            {/* Critical Fix: Cart page should be fully public so guest users can check out! */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </StoreLayout>
      } />
    </Routes>
  );
};

export default function App() {
  return (
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
  );
}
