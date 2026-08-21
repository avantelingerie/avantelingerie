import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, Tags, ShoppingCart, LayoutDashboard, LogOut, Menu, X, ChevronRight, Archive, Settings, BadgePercent as TicketPercent, Users, Link2, Store, Truck, ChevronDown, BarChart3, Sparkles, Grid } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { estoqueService } from '@/services/estoqueService.js';
import NotificacoesPanel from '@/components/admin/NotificacoesPanel.jsx';

export default function AdminLayout() {
  const { currentAdmin, logoutAdmin } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [inventoryStats, setInventoryStats] = useState({ zerado: 0, baixo: 0 });
  const [theme, setTheme] = useState(() => localStorage.getItem('adminTheme') || 'dark');

  const fetchInventoryStats = async () => {
    try {
      const config = await estoqueService.buscarConfiguracoes();
      const limite = config.limite_alerta_global || 10;
      
      const variacoes = await estoqueService.buscarTodasVariacoesSemPaginacao();
      
      let zerado = 0;
      let baixo = 0;
      
      variacoes.forEach(v => {
        const qtd = v.estoque || 0;
        if (qtd === 0) zerado++;
        else if (qtd <= limite) baixo++;
      });
      
      setInventoryStats({ zerado, baixo });
    } catch (err) {
      console.error('Failed to fetch inventory stats', err);
    }
  };

  useEffect(() => {
    fetchInventoryStats();

    const handleUpdate = () => fetchInventoryStats();
    window.addEventListener('inventory_updated', handleUpdate);
    
    if (location.pathname.startsWith('/admin/configuracoes')) {
      setIsConfigOpen(true);
    }
    
    return () => {
      window.removeEventListener('inventory_updated', handleUpdate);
    };
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('adminTheme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Produtos', href: '/admin/produtos', icon: Package },
    { name: 'Categorias', href: '/admin/categorias', icon: Tags },
    { name: 'Coleções', href: '/admin/colecoes', icon: Grid },
    { name: 'Estoque', href: '/admin/estoque', icon: Archive, badge: true },
    { name: 'Pedidos', href: '/admin/pedidos', icon: ShoppingCart },
    { name: 'Clientes', href: '/admin/clientes', icon: Users },
    { name: 'Integrações', href: '/admin/integracoes', icon: Link2 },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Cérebro da Lia', href: '/admin/lia', icon: Sparkles },
  ];

  const configSubmenu = [
    { name: 'Loja', href: '/admin/configuracoes/loja', icon: Store },
    { name: 'Frete', href: '/admin/configuracoes/frete', icon: Truck },
    { name: 'Estoque', href: '/admin/configuracoes', icon: Archive },
    { name: 'Descontos', href: '/admin/descontos', icon: TicketPercent },
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const totalCritical = inventoryStats.zerado + inventoryStats.baixo;
  const isDanger = inventoryStats.zerado > 0;

  return (
    <div className={`${theme} admin-panel-container flex bg-[#f9f6f0] dark:bg-[#0a0a0a] transition-colors duration-300 min-h-screen text-zinc-900 dark:text-foreground font-sans`}>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 admin-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col bg-white dark:bg-[#121212] border-r border-zinc-200 dark:border-[#c59b5f]/15`}>
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-[#c59b5f]/15 shrink-0 bg-zinc-50 dark:bg-[#0e0e0e]">
          <span className="text-lg font-bold tracking-wider uppercase bg-gradient-to-r from-zinc-900 via-zinc-600 to-[#c59b5f] dark:from-white dark:via-zinc-200 bg-clip-text text-transparent">Avante Admin</span>
          <button className="ml-auto lg:hidden text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white" onClick={() => setIsSidebarOpen(false)}><X className="w-5 h-5" /></button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/admin' && location.pathname.startsWith(item.href));
            const isDashboard = item.href === '/admin' && location.pathname === '/admin';
            const isReallyActive = item.href === '/admin' ? isDashboard : isActive;
            const Icon = item.icon;
            
            return (
              <Link key={item.name} to={item.href} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isReallyActive ? 'bg-[#c59b5f]/10 dark:bg-gradient-to-r dark:from-[#c59b5f]/15 dark:to-transparent border-l-2 border-[#c59b5f] text-[#c59b5f] font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white'}`}>
                <Icon className={`w-5 h-5 transition-transform duration-205 group-hover:scale-110 ${isReallyActive ? 'text-[#c59b5f]' : 'text-zinc-500'}`} />
                {item.name}
                
                {item.badge && totalCritical > 0 && (
                  <Badge variant="outline" className={`ml-auto px-1.5 py-0 min-w-[20px] h-5 flex items-center justify-center border-0 text-white font-bold rounded-full ${isDanger ? 'bg-red-500 shadow-md shadow-red-500/20' : 'bg-amber-500 shadow-md shadow-amber-500/20'}`}>{totalCritical}</Badge>
                )}
                {isReallyActive && !item.badge && <ChevronRight className="w-4 h-4 ml-auto opacity-75" />}
              </Link>
            );
          })}

          <div className="pt-2">
            <button onClick={() => setIsConfigOpen(!isConfigOpen)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left group ${location.pathname.startsWith('/admin/configuracoes') || location.pathname === '/admin/descontos' ? 'text-zinc-900 dark:text-white font-medium bg-zinc-100 dark:bg-white/5' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white'}`}>
              <Settings className="w-5 h-5 text-zinc-500 group-hover:rotate-45 transition-transform duration-300" />
              <span>Configurações</span>
              <ChevronDown className={`w-4 h-4 ml-auto transition-transform duration-200 ${isConfigOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isConfigOpen && (
              <div className="mt-1 ml-4 pl-4 border-l border-zinc-200 dark:border-zinc-800 space-y-1">
                {configSubmenu.map((subItem) => {
                  const isSubActive = location.pathname === subItem.href;
                  const SubIcon = subItem.icon;
                  return (
                    <Link key={subItem.name} to={subItem.href} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${isSubActive ? 'bg-zinc-100 dark:bg-zinc-800/40 text-[#c59b5f] font-semibold border-l-2 border-[#c59b5f] dark:border-[#c59b5f]/50 pl-3' : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-white/5'}`}>
                      <SubIcon className={`w-4 h-4 ${isSubActive ? 'text-[#c59b5f]' : 'opacity-70'}`} />
                      {subItem.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-[#c59b5f]/15 shrink-0 bg-zinc-50 dark:bg-[#0e0e0e]">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-lg bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/5">
            <div className="w-8 h-8 rounded-full bg-[#c59b5f] flex items-center justify-center text-white font-bold shadow-md shadow-[#c59b5f]/20">{currentAdmin?.nome?.charAt(0) || 'A'}</div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-zinc-900 dark:text-white truncate">{currentAdmin?.nome || 'Administrador'}</span>
              <span className="text-xs text-[#c59b5f] truncate font-medium capitalize">{currentAdmin?.role || 'Admin'}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200">
            <LogOut className="w-5 h-5 text-red-500 dark:text-red-400/80" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-[#f4f4f5] dark:bg-[#0d0d0d]">
        <header className="h-16 bg-white dark:bg-[#121212] border-b border-zinc-200 dark:border-zinc-800/80 flex items-center px-4 sm:px-6 lg:px-8 shrink-0 shadow-sm dark:shadow-md sticky top-0 z-40">
          <button className="lg:hidden p-2 -ml-2 mr-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors" onClick={() => setIsSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
          
          <div className="ml-auto flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
              title="Alternar Tema"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <NotificacoesPanel />
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block"></div>
            <Button variant="outline" size="sm" onClick={() => navigate('/')} className="border-[#c59b5f]/30 hover:border-[#c59b5f] text-[#c59b5f] hover:bg-[#c59b5f]/10 bg-transparent transition-all">Ver Loja</Button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#f9f6f0] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}