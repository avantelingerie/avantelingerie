import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext.jsx';
import { AdminAuthContext } from '@/context/AdminAuthContext.jsx';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children, isAdminRoute = false }) {
  const { isAuthenticated, isLoading: isUserLoading } = useContext(AuthContext);
  const adminContext = useContext(AdminAuthContext);
  
  const location = useLocation();

  if (isAdminRoute) {
    if (!adminContext) {
       console.error("[ProtectedRoute] AdminAuthContext not found!");
       return <Navigate to="/" replace />;
    }
    const { isAdminAuthenticated, isLoading: isAdminLoading } = adminContext;
    
    console.log('[ProtectedRoute] Checking admin auth:', {
      isAdminAuthenticated,
      isAdminLoading,
      path: location.pathname
    });
    
    if (isAdminLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      );
    }

    if (!isAdminAuthenticated) {
      console.log('[ProtectedRoute] Admin not authenticated, redirecting to /admin/login');
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    console.log('[ProtectedRoute] Admin authenticated, rendering protected content');
    return children;
  }

  // Regular user protection
  console.log('[ProtectedRoute] Checking user auth:', {
    isAuthenticated,
    isUserLoading,
    path: location.pathname
  });
  
  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('[ProtectedRoute] User not authenticated, redirecting to /login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('[ProtectedRoute] User authenticated, rendering protected content');
  return children;
}