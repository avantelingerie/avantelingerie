import React, { createContext, useContext, useState, useEffect } from 'react';
import PocketBase, { LocalAuthStore } from 'pocketbase';
import pb from '@/lib/pocketbaseClient.js';

// Isolated PocketBase instance specifically for Admin authentication
// to prevent session collision between customer (pocketbase_auth) and admin (pocketbase_admin_auth)
const adminPb = new PocketBase("/hcgi/platform", new LocalAuthStore('pocketbase_admin_auth'));

export const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [currentAdmin, setCurrentAdmin] = useState(
    adminPb.authStore.model?.collectionName === 'usuarios' ? adminPb.authStore.model : null
  );
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    adminPb.authStore.isValid && adminPb.authStore.model?.collectionName === 'usuarios'
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial check on mount
    const isModelAdmin = adminPb.authStore.model?.collectionName === 'usuarios';
    console.log('[AdminAuthContext] Initial auth check:', {
      isValid: adminPb.authStore.isValid,
      isModelAdmin,
      model: adminPb.authStore.model
    });
    
    setCurrentAdmin(isModelAdmin ? adminPb.authStore.model : null);
    setIsAdminAuthenticated(adminPb.authStore.isValid && isModelAdmin);
    setIsLoading(false);

    // Listen to admin auth state changes
    const unsubscribe = adminPb.authStore.onChange((token, model) => {
      const isModelAdminNow = model?.collectionName === 'usuarios';
      console.log('[AdminAuthContext] Auth state changed:', {
        hasToken: !!token,
        isModelAdmin: isModelAdminNow,
        model
      });
      
      setCurrentAdmin(isModelAdminNow ? model : null);
      setIsAdminAuthenticated(!!model && isModelAdminNow);
    });

    return () => unsubscribe();
  }, []);

  // Sync token from isolated adminPb to the global pb client
  // so that all database calls (products, categories, stock) inside admin pages work perfectly
  useEffect(() => {
    const syncToken = () => {
      const isModelAdmin = adminPb.authStore.model?.collectionName === 'usuarios';
      if (adminPb.authStore.isValid && isModelAdmin) {
        console.log('[AdminAuthContext] Syncing admin token to global pb client');
        pb.authStore.save(adminPb.authStore.token, adminPb.authStore.model);
      } else {
        // If logged out from admin and global pb still holds admin model, clean it up
        if (pb.authStore.model?.collectionName === 'usuarios') {
          console.log('[AdminAuthContext] Clearing admin token from global pb client');
          pb.authStore.clear();
        }
      }
    };

    syncToken();
    const unsubscribe = adminPb.authStore.onChange(() => {
      syncToken();
    });

    return () => unsubscribe();
  }, []);

  const loginAdmin = async (email, password) => {
    try {
      console.log('[AdminAuthContext] Attempting login for:', email);
      const authData = await adminPb.collection('usuarios').authWithPassword(email, password, { $autoCancel: false });
      console.log('[AdminAuthContext] Login successful:', authData.record.id);
      return authData;
    } catch (error) {
      console.error('[AdminAuthContext] Login failed:', error);
      throw error;
    }
  };

  const logoutAdmin = () => {
    if (adminPb.authStore.model?.collectionName === 'usuarios') {
      console.log('[AdminAuthContext] Logging out admin');
      adminPb.authStore.clear();
      setCurrentAdmin(null);
      setIsAdminAuthenticated(false);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ currentAdmin, isAdminAuthenticated, isLoading, loginAdmin, logoutAdmin, adminPb }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
export { adminPb };