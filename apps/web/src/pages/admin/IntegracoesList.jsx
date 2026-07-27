import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link2, Key, CheckCircle2, XCircle, AlertCircle, Eye, EyeOff, Loader2, RefreshCw, Save, Sparkles, MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog.jsx';

const API_SERVER_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('192.168.')
  ? 'http://localhost:3001'
  : '/hcgi/api';

export default function IntegracoesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    const blingAuth = searchParams.get('bling_auth');
    if (blingAuth === 'success') {
      toast.success('Autenticação com o Bling realizada com sucesso!');
      searchParams.delete('bling_auth');
      setSearchParams(searchParams);
    } else if (blingAuth === 'error') {
      const errorMsg = searchParams.get('error_msg') || 'Erro desconhecido na autorização.';
      toast.error(`Falha na autorização com o Bling: ${errorMsg}`);
      searchParams.delete('bling_auth');
      searchParams.delete('error_msg');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const [status, setStatus] = useState({
    bling: { status: 'nao_configurado', ultimo_teste: null },
    stripe: { status: 'nao_configurado', ultimo_teste: null },
    melhor_envio: { status: 'nao_configurado', ultimo_teste: null },
    gemini: { status: 'nao_configurado', ultimo_teste: null },
    whatsapp: { status: 'nao_configurado', ultimo_teste: null },
    anthropic: { status: 'nao_configurado', ultimo_teste: null }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isTesting, setIsTesting] = useState({});
  const [isSaving, setIsSaving] = useState({});
  const [showKeys, setShowKeys] = useState({});

  const [keys, setKeys] = useState({
    stripe_pk_live: '',
    stripe_sk_live: '',
    stripe_webhook_secret: '',
    melhor_envio_token: '',
    gemini_api_key: '',
    whatsapp_token: '',
    anthropic_api_key: '',
    bling_client_id: '',
    bling_client_secret: '',
    bling_redirect_uri: ''
  });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    servico: null,
    chave_nome: null,
    password: '',
    error: '',
    isLoading: false
  });

  const fetchStatus = async () => {
    try {
      const res = await apiServerClient.fetch('/integracoes/status');
      if (res.ok) {
        const data = await res.json();
        setStatus(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Erro ao buscar status das integrações:', error);
      toast.error('Não foi possível carregar o status das integrações.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleSaveDb = async (servico, chave_nome, chave_valor) => {
    if (!chave_valor) return;
    setIsSaving(prev => ({ ...prev, [servico]: true }));
    try {
      const res = await apiServerClient.fetch('/integracoes/salvar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          servico,
          chave_nome,
          chave_valor,
          ambiente: 'producao'
        })
      });

      if (!res.ok) throw new Error('Falha ao salvar no servidor');

      toast.success(`Configurações de ${servico} salvas com sucesso!`);
      setKeys(prev => ({ ...prev, [`${servico}_${chave_nome === 'api_key' ? 'api_key' : 'token'}`]: '' }));
      fetchStatus();
    } catch (error) {
      console.error(error);
      toast.error(`Erro ao salvar configurações de ${servico}.`);
    } finally {
      setIsSaving(prev => ({ ...prev, [servico]: false }));
    }
  };

  const handleClearClick = (servico, chave_nome = null) => {
    setConfirmModal({
      isOpen: true,
      servico,
      chave_nome,
      password: '',
      error: '',
      isLoading: false
    });
  };

  const handleConfirmClear = async () => {
    setConfirmModal(prev => ({ ...prev, isLoading: true, error: '' }));
    try {
      const { servico, chave_nome } = confirmModal;

      const res = await apiServerClient.fetch('/integracoes/limpar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          servico,
          chave_nome,
          senha: confirmModal.password
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.mensagem || 'Falha ao limpar no servidor');
      }

      toast.success(`Configurações de ${servico} limpas com sucesso!`);
      setConfirmModal({ isOpen: false, servico: null, chave_nome: null, password: '', error: '', isLoading: false });
      fetchStatus();
    } catch (error) {
      console.error('Erro ao limpar chaves:', error);
      setConfirmModal(prev => ({
        ...prev,
        isLoading: false,
        error: error?.message || 'Senha de liberação incorreta ou erro ao processar.'
      }));
    }
  };

  const handleSave = async (servico, keyData) => {
    setIsSaving(prev => ({ ...prev, [servico]: true }));
    try {
      for (const [chave_nome, chave_valor] of Object.entries(keyData)) {
        if (!chave_valor) continue;
        const res = await apiServerClient.fetch('/integracoes/salvar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            servico,
            chave_nome,
            chave_valor,
            ambiente: 'producao'
          })
        });
        if (!res.ok) throw new Error('Falha ao salvar');
      }
      toast.success(`Configurações de ${servico} salvas com sucesso!`);
      setKeys(prev => {
        const newKeys = { ...prev };
        Object.keys(keyData).forEach(k => newKeys[k] = '');
        return newKeys;
      });
      fetchStatus();
    } catch (error) {
      toast.error(`Erro ao salvar configurações de ${servico}.`);
    } finally {
      setIsSaving(prev => ({ ...prev, [servico]: false }));
    }
  };

  const handleTest = async (servico) => {
    setIsTesting(prev => ({ ...prev, [servico]: true }));
    try {
      const res = await apiServerClient.fetch(`/integracoes/testar/${servico}`, { method: 'POST' });
      const data = await res.json();
      if (data.sucesso) {
        toast.success(`Conexão com ${servico} bem-sucedida!`);
      } else {
        toast.error(`Falha na conexão com ${servico}: ${data.mensagem}`);
      }
      fetchStatus();
    } catch (error) {
      toast.error(`Erro ao testar conexão com ${servico}.`);
    } finally {
      setIsTesting(prev => ({ ...prev, [servico]: false }));
    }
  };

  const toggleShowKey = (keyName) => {
    setShowKeys(prev => ({ ...prev, [keyName]: !prev[keyName] }));
  };

  const StatusBadge = ({ statusData }) => {
    if (statusData?.status === 'conectado') {
      return <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-200"><CheckCircle2 className="w-3 h-3 mr-1" /> Conectado</Badge>;
    }
    if (statusData?.status === 'erro') {
      return <Badge variant="destructive" className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-200"><XCircle className="w-3 h-3 mr-1" /> Erro</Badge>;
    }
    return <Badge variant="outline" className="text-muted-foreground"><AlertCircle className="w-3 h-3 mr-1" /> Não Testado</Badge>;
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integrações</h1>
        <p className="text-muted-foreground mt-2">Gerencie as conexões com serviços externos (Pagamentos, ERP, Logística).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stripe Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#635BFF]/10 flex items-center justify-center">
                  <Key className="w-5 h-5 text-[#635BFF]" />
                </div>
                <div>
                  <CardTitle>Stripe</CardTitle>
                  <CardDescription>Gateway de Pagamentos</CardDescription>
                </div>
              </div>
              <StatusBadge statusData={status.stripe} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Publishable Key (pk_live / pk_test)</label>
              <div className="relative">
                <Input 
                  type={showKeys.stripe_pk_live ? "text" : "password"} 
                  placeholder="pk_live_... ou pk_test_..." 
                  value={keys.stripe_pk_live}
                  onChange={e => setKeys({...keys, stripe_pk_live: e.target.value})}
                  className="pr-10"
                />
                <button type="button" onClick={() => toggleShowKey('stripe_pk_live')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showKeys.stripe_pk_live ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Secret Key (sk_live / sk_test)</label>
              <div className="relative">
                <Input 
                  type={showKeys.stripe_sk_live ? "text" : "password"} 
                  placeholder="sk_live_..." 
                  value={keys.stripe_sk_live}
                  onChange={e => setKeys({...keys, stripe_sk_live: e.target.value})}
                  className="pr-10"
                />
                <button type="button" onClick={() => toggleShowKey('stripe_sk_live')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showKeys.stripe_sk_live ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Webhook Secret (whsec)</label>
              <div className="relative">
                <Input 
                  type={showKeys.stripe_webhook_secret ? "text" : "password"} 
                  placeholder="whsec_..." 
                  value={keys.stripe_webhook_secret}
                  onChange={e => setKeys({...keys, stripe_webhook_secret: e.target.value})}
                  className="pr-10"
                />
                <button type="button" onClick={() => toggleShowKey('stripe_webhook_secret')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showKeys.stripe_webhook_secret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {status.stripe?.ultimo_teste && (
              <p className="text-xs text-muted-foreground">Último teste: {new Date(status.stripe.ultimo_teste).toLocaleString('pt-BR')}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4 bg-muted/20">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleTest('stripe')} disabled={isTesting.stripe}>
                {isTesting.stripe ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                Testar Conexão
              </Button>
              <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleClearClick('stripe')} disabled={isSaving.stripe}>
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar
              </Button>
            </div>
            <Button onClick={() => handleSave('stripe', { pk_live: keys.stripe_pk_live, sk_live: keys.stripe_sk_live, webhook_secret: keys.stripe_webhook_secret })} disabled={isSaving.stripe || (!keys.stripe_pk_live && !keys.stripe_sk_live && !keys.stripe_webhook_secret)}>
              {isSaving.stripe ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Salvar
            </Button>
          </CardFooter>
        </Card>

        {/* Melhor Envio Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Melhor Envio</CardTitle>
                  <CardDescription>Logística e Fretes</CardDescription>
                </div>
              </div>
              <StatusBadge statusData={status.melhor_envio} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Token de Acesso (Bearer)</label>
              <div className="relative">
                <Input 
                  type={showKeys.melhor_envio_token ? "text" : "password"} 
                  placeholder="eyJ0eXAiOiJKV1Qi..." 
                  value={keys.melhor_envio_token}
                  onChange={e => setKeys({...keys, melhor_envio_token: e.target.value})}
                  className="pr-10"
                />
                <button type="button" onClick={() => toggleShowKey('melhor_envio_token')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showKeys.melhor_envio_token ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {status.melhor_envio?.ultimo_teste && (
              <p className="text-xs text-muted-foreground">Último teste: {new Date(status.melhor_envio.ultimo_teste).toLocaleString('pt-BR')}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4 bg-muted/20 mt-auto">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleTest('melhor_envio')} disabled={isTesting.melhor_envio}>
                {isTesting.melhor_envio ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                Testar Conexão
              </Button>
              <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleClearClick('melhor_envio', 'token')} disabled={isSaving.melhor_envio}>
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar
              </Button>
            </div>
            <Button onClick={() => handleSave('melhor_envio', { token: keys.melhor_envio_token })} disabled={isSaving.melhor_envio || !keys.melhor_envio_token}>
              {isSaving.melhor_envio ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Salvar
            </Button>
          </CardFooter>
        </Card>

        {/* Google Gemini AI Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <CardTitle>Google Gemini AI</CardTitle>
                  <CardDescription>Geração de Descrições Otimizadas (SEO)</CardDescription>
                </div>
              </div>
              <StatusBadge statusData={status.gemini} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Chave de API do Gemini (API Key)</label>
              <div className="relative">
                <Input 
                  type={showKeys.gemini_api_key ? "text" : "password"} 
                  placeholder={status.gemini?.status !== 'nao_configurado' ? "•••••••••••••••• (Configurada)" : "Cole sua chave API do Gemini aqui..."} 
                  value={keys.gemini_api_key}
                  onChange={e => setKeys({...keys, gemini_api_key: e.target.value})}
                  className="pr-10"
                />
                <button type="button" onClick={() => toggleShowKey('gemini_api_key')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showKeys.gemini_api_key ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {status.gemini?.ultimo_teste && (
              <p className="text-xs text-muted-foreground">Último teste: {new Date(status.gemini.ultimo_teste).toLocaleString('pt-BR')}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4 bg-muted/20">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleTest('gemini')} disabled={isTesting.gemini || (status.gemini?.status === 'nao_configurado' && !keys.gemini_api_key)}>
                {isTesting.gemini ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                Testar Conexão
              </Button>
              <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleClearClick('gemini', 'api_key')} disabled={isSaving.gemini}>
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar
              </Button>
            </div>
            <Button onClick={() => handleSaveDb('gemini', 'api_key', keys.gemini_api_key)} disabled={isSaving.gemini || !keys.gemini_api_key}>
              {isSaving.gemini ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Salvar
            </Button>
          </CardFooter>
        </Card>

        {/* Anthropic (Cérebro da Lia) Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle>Anthropic (Claude)</CardTitle>
                  <CardDescription>O Cérebro da Inteligência da Lia</CardDescription>
                </div>
              </div>
              <StatusBadge statusData={status.anthropic} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Chave de API (API Key)</label>
              <div className="relative">
                <Input 
                  type={showKeys.anthropic_api_key ? "text" : "password"} 
                  placeholder={status.anthropic?.status !== 'nao_configurado' ? "•••••••••••••••• (Configurada)" : "sk-ant-api03..."} 
                  value={keys.anthropic_api_key}
                  onChange={e => setKeys({...keys, anthropic_api_key: e.target.value})}
                  className="pr-10"
                />
                <button type="button" onClick={() => toggleShowKey('anthropic_api_key')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showKeys.anthropic_api_key ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {status.anthropic?.ultimo_teste && (
              <p className="text-xs text-muted-foreground">Último teste: {new Date(status.anthropic.ultimo_teste).toLocaleString('pt-BR')}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4 bg-muted/20">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleTest('anthropic')} disabled={isTesting.anthropic || (status.anthropic?.status === 'nao_configurado' && !keys.anthropic_api_key)}>
                {isTesting.anthropic ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                Testar Conexão
              </Button>
              <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleClearClick('anthropic', 'api_key')} disabled={isSaving.anthropic}>
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar
              </Button>
            </div>
            <Button onClick={() => handleSaveDb('anthropic', 'api_key', keys.anthropic_api_key)} disabled={isSaving.anthropic || !keys.anthropic_api_key}>
              {isSaving.anthropic ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Salvar
            </Button>
          </CardFooter>
        </Card>

        {/* Lia (WhatsApp) Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle>WhatsApp API Oficial (Lia)</CardTitle>
                  <CardDescription>Envio e Recebimento via Meta Cloud API</CardDescription>
                </div>
              </div>
              <StatusBadge statusData={status.whatsapp} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Token de Integração (API Token)</label>
              <div className="relative">
                <Input 
                  type={showKeys.whatsapp_token ? "text" : "password"} 
                  placeholder={status.whatsapp?.status !== 'nao_configurado' ? "•••••••••••••••• (Configurada)" : "Cole seu token do WhatsApp..."} 
                  value={keys.whatsapp_token}
                  onChange={e => setKeys({...keys, whatsapp_token: e.target.value})}
                  className="pr-10"
                />
                <button type="button" onClick={() => toggleShowKey('whatsapp_token')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showKeys.whatsapp_token ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {status.whatsapp?.ultimo_teste && (
              <p className="text-xs text-muted-foreground">Último teste: {new Date(status.whatsapp.ultimo_teste).toLocaleString('pt-BR')}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4 bg-muted/20">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleTest('whatsapp')} disabled={isTesting.whatsapp || (status.whatsapp?.status === 'nao_configurado' && !keys.whatsapp_token)}>
                {isTesting.whatsapp ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                Testar Conexão
              </Button>
              <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleClearClick('whatsapp', 'token')} disabled={isSaving.whatsapp}>
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar
              </Button>
            </div>
            <Button onClick={() => handleSaveDb('whatsapp', 'token', keys.whatsapp_token)} disabled={isSaving.whatsapp || !keys.whatsapp_token}>
              {isSaving.whatsapp ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Salvar
            </Button>
          </CardFooter>
        </Card>

        {/* Bling Card */}
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <CardTitle>Bling ERP V3</CardTitle>
                  <CardDescription>Sincronização de Estoque e Notas Fiscais via API V3</CardDescription>
                </div>
              </div>
              <StatusBadge statusData={status.bling} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Bling Client ID</label>
                <div className="relative">
                  <Input 
                    type={showKeys.bling_client_id ? "text" : "password"} 
                    placeholder={status.bling?.status !== 'nao_configurado' ? "•••••••••••••••• (Configurado)" : "Client ID da API do Bling..."} 
                    value={keys.bling_client_id}
                    onChange={e => setKeys({...keys, bling_client_id: e.target.value})}
                    className="pr-10"
                  />
                  <button type="button" onClick={() => toggleShowKey('bling_client_id')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showKeys.bling_client_id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bling Client Secret</label>
                <div className="relative">
                  <Input 
                    type={showKeys.bling_client_secret ? "text" : "password"} 
                    placeholder={status.bling?.status !== 'nao_configurado' ? "•••••••••••••••• (Configurado)" : "Client Secret da API do Bling..."} 
                    value={keys.bling_client_secret}
                    onChange={e => setKeys({...keys, bling_client_secret: e.target.value})}
                    className="pr-10"
                  />
                  <button type="button" onClick={() => toggleShowKey('bling_client_secret')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showKeys.bling_client_secret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Redirect URI (URI de Redirecionamento no Bling)</label>
              <Input 
                type="text" 
                placeholder={status.bling?.status !== 'nao_configurado' ? "Ex: https://avantelingerie.com.br/api/bling/callback (Configurada)" : "Ex: http://localhost:3001/bling/auth"} 
                value={keys.bling_redirect_uri}
                onChange={e => setKeys({...keys, bling_redirect_uri: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                Esta URI deve ser cadastrada exatamente igual no painel de desenvolvedor do Bling. Em ambiente local, use: <code>{window.location.protocol}//{window.location.hostname}:3001/bling/auth</code> ou <code>{window.location.protocol}//{window.location.hostname}:3001/bling/callback</code>.
              </p>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border/50 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold">Autenticação OAuth2</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Após preencher e salvar as credenciais acima, clique em autorizar para conectar o sistema ao Bling.
                  </p>
                </div>
                <Button 
                  onClick={() => window.location.href = API_SERVER_URL + '/bling/autorizar'} 
                  disabled={status.bling?.status === 'nao_configurado' && !keys.bling_client_id}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  Autorizar com Bling
                </Button>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleTest('bling')} disabled={isTesting.bling || status.bling?.status === 'nao_configurado'}>
                    {isTesting.bling ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                    Testar Conexão Atual
                  </Button>
                  <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleClearClick('bling')} disabled={isSaving.bling}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Limpar Conexão
                  </Button>
                </div>
                {status.bling?.ultimo_teste && (
                  <span className="text-xs text-muted-foreground">Último teste: {new Date(status.bling.ultimo_teste).toLocaleString('pt-BR')}</span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-4 bg-muted/20">
            <Button 
              onClick={() => handleSave('bling', { client_id: keys.bling_client_id, client_secret: keys.bling_client_secret, redirect_uri: keys.bling_redirect_uri })} 
              disabled={isSaving.bling || (!keys.bling_client_id && !keys.bling_client_secret && !keys.bling_redirect_uri)}
            >
              {isSaving.bling ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Salvar Credenciais
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Password Confirmation Modal for Cleans */}
      <Dialog open={confirmModal.isOpen} onOpenChange={(open) => !open && setConfirmModal(prev => ({ ...prev, isOpen: false }))}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              Confirmar Exclusão
            </DialogTitle>
            <DialogDescription className="pt-2 text-muted-foreground text-sm">
              Você está prestes a apagar as credenciais de <strong>{confirmModal.servico === 'gemini' ? 'Google Gemini AI' : confirmModal.servico === 'whatsapp' ? 'WhatsApp (Lia)' : confirmModal.servico === 'stripe' ? 'Stripe' : confirmModal.servico === 'melhor_envio' ? 'Melhor Envio' : confirmModal.servico === 'bling' ? 'Bling ERP' : confirmModal.servico}</strong>.
              <br /><br />
              Esta ação é destrutiva e pode interromper o funcionamento dessa integração. Para continuar, insira a senha de liberação das integrações:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Senha de liberação"
                value={confirmModal.password}
                onChange={(e) => setConfirmModal(prev => ({ ...prev, password: e.target.value, error: '' }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && confirmModal.password && !confirmModal.isLoading) {
                    handleConfirmClear();
                  }
                }}
                autoFocus
              />
              {confirmModal.error && (
                <p className="text-sm font-medium text-destructive">{confirmModal.error}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
              disabled={confirmModal.isLoading}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmClear}
              disabled={!confirmModal.password || confirmModal.isLoading}
            >
              {confirmModal.isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Confirmar e Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}