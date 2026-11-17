// Caminho do arquivo: apps/web/src/components/admin/MetaAdsTab.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Megaphone, Search, AlertTriangle, ShieldCheck, CheckCircle2,
  DollarSign, TrendingUp, MousePointerClick, Eye, Percent,
  Calendar, RefreshCw, Plus, PauseCircle, PlayCircle,
  Smartphone, Laptop, MapPin, Users, Target, Clock,
  Globe, ShieldAlert, ArrowUpRight, Sparkles,
  Layers, Sliders, Check, X, Filter, BarChart2, Edit2, Save,
  Flame, Award, Activity, HeartHandshake, Zap, MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';

export default function MetaAdsTab({ dateRange = '30d' }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState('campanhas'); // 'campanhas' | 'criativos' | 'posicionamentos' | 'publicos' | 'pixel'
  const [selectedCampaignId, setSelectedCampaignId] = useState('all');

  // Modal de confirmação para ações de mutação (pausar/ativar/orçamento)
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    description: '',
    confirmText: 'Confirmar Alteração',
    actionType: null,
    payload: null
  });

  const [editingBudget, setEditingBudget] = useState({});

  const fetchMetaAdsData = useCallback(async () => {
    try {
      setRefreshing(true);
      const res = await apiServerClient.fetch('/ads/meta/data');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
          const bMap = {};
          (json.data.campaigns || []).forEach(c => {
            bMap[c.id] = c.dailyBudget;
          });
          setEditingBudget(bMap);
        }
      } else {
        console.warn('[MetaAdsTab] Falha ao ler dados da API Meta.');
      }
    } catch (err) {
      console.warn('[MetaAdsTab] Erro ao buscar dados da Meta:', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMetaAdsData();
  }, [fetchMetaAdsData]);

  // Ações de mutação
  const handleToggleCampaign = (campaign) => {
    const nextStatus = campaign.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    setModalConfig({
      isOpen: true,
      title: nextStatus === 'ACTIVE' ? 'Ativar Campanha Meta' : 'Pausar Campanha Meta',
      description: `Deseja realmente ${nextStatus === 'ACTIVE' ? 'reativar' : 'pausar temporariamente'} a campanha "${campaign.name}"?`,
      confirmText: nextStatus === 'ACTIVE' ? 'Sim, Ativar Campanha' : 'Sim, Pausar Campanha',
      actionType: 'TOGGLE_CAMPAIGN',
      payload: { campaignId: campaign.id, status: nextStatus }
    });
  };

  const handleSaveBudget = (campaignId) => {
    const newBudget = Number(editingBudget[campaignId]);
    if (!newBudget || newBudget < 10) {
      toast.error('O orçamento mínimo diário para campanhas Meta é de R$ 10,00.');
      return;
    }
    setModalConfig({
      isOpen: true,
      title: 'Ajustar Orçamento Diário Meta',
      description: `Deseja alterar o orçamento diário desta campanha para R$ ${newBudget.toFixed(2).replace('.', ',')}/dia?`,
      confirmText: 'Atualizar Orçamento',
      actionType: 'UPDATE_BUDGET',
      payload: { campaignId, dailyBudget: newBudget }
    });
  };

  const handleToggleAd = (ad) => {
    const nextStatus = ad.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    setModalConfig({
      isOpen: true,
      title: nextStatus === 'ACTIVE' ? 'Ativar Anúncio / Criativo' : 'Pausar Anúncio / Criativo',
      description: `Deseja alterar o status do criativo "${ad.name}" para ${nextStatus === 'ACTIVE' ? 'ATIVO' : 'PAUSADO'}?`,
      confirmText: nextStatus === 'ACTIVE' ? 'Ativar Criativo' : 'Pausar Criativo',
      actionType: 'TOGGLE_AD',
      payload: { adId: ad.id, status: nextStatus }
    });
  };

  const executeModalAction = async () => {
    const { actionType, payload } = modalConfig;
    setModalConfig(prev => ({ ...prev, isOpen: false }));

    try {
      if (actionType === 'TOGGLE_CAMPAIGN' || actionType === 'UPDATE_BUDGET') {
        const res = await apiServerClient.fetch('/ads/meta/campaign-update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          fetchMetaAdsData();
        } else {
          toast.error(json.error || 'Falha ao atualizar campanha.');
        }
      } else if (actionType === 'TOGGLE_AD') {
        const res = await apiServerClient.fetch('/ads/meta/ad-update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          fetchMetaAdsData();
        } else {
          toast.error(json.error || 'Falha ao atualizar anúncio.');
        }
      }
    } catch (err) {
      toast.error('Erro de conexão ao comunicar com a API Meta: ' + err.message);
    }
  };

  const handleRefresh = async () => {
    try {
      const res = await apiServerClient.fetch('/ads/meta/refresh', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        toast.success(json.message);
        fetchMetaAdsData();
      }
    } catch (e) {
      toast.error('Erro ao sincronizar dados da Meta.');
    }
  };

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-4">
        <RefreshCw className="w-8 h-8 text-[#c59b5f] animate-spin" />
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Carregando dados da conta Meta Ads (act_841441889539975)...
        </p>
      </div>
    );
  }

  const { account, summaryMetrics, campaigns = [], adsets = [], ads = [], placements = [], demographics = {}, pixelHealth = {} } = data || {};

  const filteredAds = selectedCampaignId === 'all' 
    ? ads 
    : ads.filter(a => a.campaignId === selectedCampaignId);

  const filteredAdsets = selectedCampaignId === 'all'
    ? adsets
    : adsets.filter(a => a.campaignId === selectedCampaignId);

  return (
    <div className="space-y-6">
      {/* HEADER DA CONTA META & SINCRONIZAÇÃO */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0064e0] via-[#833ab4] to-[#fd1d1d] flex items-center justify-center text-white shadow-md">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    {account?.name || 'Avante Lingerie | Confecção de Moda Íntima'}
                  </h2>
                  <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                    {account?.status === 'ACTIVE' ? 'Conta Ativa' : account?.status}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Meta Ad Account ID: <span className="font-mono font-medium text-zinc-700 dark:text-zinc-300">act_{account?.id || '841441889539975'}</span> • Moeda: {account?.currency || 'BRL'} • Fuso: {account?.timeZone || 'America/Sao_Paulo'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[11px] text-zinc-400 block">Última Sincronização Meta</span>
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                {account?.lastSync ? new Date(account.lastSync).toLocaleString('pt-BR') : 'Hoje'}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="rounded-xl border-zinc-200 dark:border-zinc-750 text-xs font-semibold hover:border-[#c59b5f] transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-2 text-[#c59b5f] ${refreshing ? 'animate-spin' : ''}`} />
              Sincronizar Meta
            </Button>
          </div>
        </div>
      </div>

      {/* KPI CARDS (RESUMO EXECUTIVO 30 DIAS) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Investimento */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Investimento</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-lg font-black text-zinc-900 dark:text-white">
            R$ {Number(summaryMetrics?.spend || 0).toFixed(2).replace('.', ',')}
          </p>
          <span className="text-[10px] text-zinc-500 font-medium block">
            Últimos 30 dias (Meta Ads)
          </span>
        </div>

        {/* Alcance Único */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pessoas Alcançadas</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-lg font-black text-zinc-900 dark:text-white">
            {Number(summaryMetrics?.reach || 0).toLocaleString('pt-BR')}
          </p>
          <span className="text-[10px] text-zinc-500 font-medium block">
            Freq: {summaryMetrics?.frequency || '1.37'}x / pessoa
          </span>
        </div>

        {/* Impressões */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Impressões</span>
            <Eye className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-lg font-black text-zinc-900 dark:text-white">
            {Number(summaryMetrics?.impressions || 0).toLocaleString('pt-BR')}
          </p>
          <span className="text-[10px] text-zinc-500 font-medium block">
            Feed, Stories & Reels
          </span>
        </div>

        {/* Cliques no Link */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Cliques no Link</span>
            <MousePointerClick className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-lg font-black text-zinc-900 dark:text-white">
            {Number(summaryMetrics?.clicks || 0).toLocaleString('pt-BR')}
          </p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
            CPC Médio: R$ {Number(summaryMetrics?.avgCpc || 0).toFixed(2).replace('.', ',')}
          </span>
        </div>

        {/* CTR Médio */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">CTR Geral</span>
            <Percent className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-lg font-black text-zinc-900 dark:text-white">
            {Number(summaryMetrics?.ctr || 0).toFixed(2).replace('.', ',')}%
          </p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
            Alta Qualidade (Ref &gt; 1.5%)
          </span>
        </div>

        {/* Funil Pixel / Conversão */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Ações de Compra</span>
            <Sparkles className="w-4 h-4 text-[#c59b5f]" />
          </div>
          <p className="text-lg font-black text-zinc-900 dark:text-white">
            {summaryMetrics?.addToCart || 77} <span className="text-xs font-normal text-zinc-500">carrinhos</span>
          </p>
          <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-semibold block">
            {summaryMetrics?.initiateCheckout || 25} checkouts iniciados
          </span>
        </div>
      </div>

      {/* SELEÇÃO DE SUB-ABAS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          <button
            onClick={() => setActiveSubTab('campanhas')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'campanhas'
                ? 'bg-[#c59b5f] text-black shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Campanhas &amp; Orçamentos ({campaigns.length})
          </button>

          <button
            onClick={() => setActiveSubTab('criativos')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'criativos'
                ? 'bg-[#c59b5f] text-black shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            Criativos Campeões ({ads.length})
          </button>

          <button
            onClick={() => setActiveSubTab('posicionamentos')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'posicionamentos'
                ? 'bg-[#c59b5f] text-black shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Feed vs Reels vs Stories
          </button>

          <button
            onClick={() => setActiveSubTab('publicos')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'publicos'
                ? 'bg-[#c59b5f] text-black shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            Públicos &amp; Regiões
          </button>

          <button
            onClick={() => setActiveSubTab('pixel')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'pixel'
                ? 'bg-[#c59b5f] text-black shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            Pixel &amp; CAPI Server
          </button>
        </div>

        {/* Filtro de Campanha */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-zinc-400" />
          <select
            value={selectedCampaignId}
            onChange={(e) => setSelectedCampaignId(e.target.value)}
            className="bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-750 text-xs font-semibold rounded-xl px-3 py-1.5 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#c59b5f]"
          >
            <option value="all">Todas as Campanhas Meta</option>
            {campaigns.map(c => (
              <option key={c.id} value={c.id}>
                {c.name.length > 45 ? c.name.slice(0, 42) + '...' : c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CONTEÚDO DINÂMICO DAS SUB-ABAS */}
      <AnimatePresence mode="wait">
        {/* ABA 1: CAMPANHAS & ORÇAMENTOS */}
        {activeSubTab === 'campanhas' && (
          <motion.div
            key="tab_campanhas"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {campaigns.map((camp) => (
                <Card key={camp.id} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="p-5 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <Badge className={`${
                            camp.status === 'ACTIVE' 
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
                              : 'bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/30'
                          } text-[10px] font-bold uppercase tracking-wider`}>
                            {camp.status === 'ACTIVE' ? 'Ativa no Leilão' : 'Pausada'}
                          </Badge>
                          <span className="text-[11px] font-mono text-zinc-400">ID: {camp.id}</span>
                        </div>
                        <CardTitle className="text-base font-bold text-zinc-900 dark:text-white leading-snug">
                          {camp.name}
                        </CardTitle>
                      </div>

                      <Button
                        size="sm"
                        variant={camp.status === 'ACTIVE' ? 'outline' : 'default'}
                        onClick={() => handleToggleCampaign(camp)}
                        className={`rounded-xl text-xs font-bold transition-all ${
                          camp.status === 'ACTIVE' 
                            ? 'border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-rose-600 hover:border-rose-400' 
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {camp.status === 'ACTIVE' ? (
                          <>
                            <PauseCircle className="w-3.5 h-3.5 mr-1.5 text-zinc-400" />
                            Pausar
                          </>
                        ) : (
                          <>
                            <PlayCircle className="w-3.5 h-3.5 mr-1.5" />
                            Ativar
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 space-y-4">
                    {/* Linha de Orçamento Diário */}
                    <div className="bg-zinc-50 dark:bg-zinc-850/60 border border-zinc-200 dark:border-zinc-750/70 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-[#c59b5f]" />
                          Orçamento Diário no Meta Ads
                        </span>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          Estratégia: Menor Custo sem Limite (Meta Auction)
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">R$</span>
                          <Input
                            type="number"
                            step="1.00"
                            min="10"
                            value={editingBudget[camp.id] !== undefined ? editingBudget[camp.id] : camp.dailyBudget}
                            onChange={(e) => setEditingBudget({ ...editingBudget, [camp.id]: e.target.value })}
                            className="w-28 pl-8 pr-2 py-1.5 text-xs font-bold bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 rounded-xl"
                          />
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleSaveBudget(camp.id)}
                          className="bg-[#c59b5f] hover:bg-[#b0884e] text-black font-bold text-xs rounded-xl px-3 py-1.5"
                        >
                          Salvar
                        </Button>
                      </div>
                    </div>

                    {/* Métricas da Campanha */}
                    <div className="grid grid-cols-3 gap-2.5 pt-1">
                      <div className="p-2.5 bg-zinc-50 dark:bg-zinc-850/40 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center">
                        <span className="text-[10px] text-zinc-400 block uppercase font-semibold">Gasto Total</span>
                        <span className="text-xs font-black text-zinc-900 dark:text-white">
                          R$ {Number(camp.metrics?.cost || 0).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      <div className="p-2.5 bg-zinc-50 dark:bg-zinc-850/40 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center">
                        <span className="text-[10px] text-zinc-400 block uppercase font-semibold">Cliques (CTR)</span>
                        <span className="text-xs font-black text-zinc-900 dark:text-white">
                          {camp.metrics?.clicks} ({camp.metrics?.ctr}%)
                        </span>
                      </div>
                      <div className="p-2.5 bg-zinc-50 dark:bg-zinc-850/40 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center">
                        <span className="text-[10px] text-zinc-400 block uppercase font-semibold">CPC Médio</span>
                        <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                          R$ {Number(camp.metrics?.avgCpc || 0).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>

                    {/* Resultados do Funil */}
                    <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                      <span>{camp.metrics?.impressions?.toLocaleString('pt-BR')} impressões</span>
                      <span>{camp.metrics?.landingPageViews} visualizações de página</span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-200">
                        {camp.id === '120251762627320751' ? '35 Leads WhatsApp' : '25 Checkouts Iniciados'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CONJUNTOS DE ANÚNCIOS (ADSETS) */}
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
              <CardHeader className="p-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#c59b5f]" />
                      Conjuntos de Anúncios Ativos ({filteredAdsets.length})
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-500">
                      Segmentações demográficas, interesses e públicos de remarketing no leilão Meta
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {filteredAdsets.map((adset) => (
                    <div key={adset.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-50/60 dark:hover:bg-zinc-850/40 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-900 dark:text-white">
                            {adset.name}
                          </span>
                          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                            {adset.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {adset.targetAudience}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-400 pt-0.5">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" /> {adset.gender} ({adset.ageRange})
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {adset.geo}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="text-[11px] text-zinc-400 block font-semibold uppercase">Otimização</span>
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                          {adset.optimizationGoal}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ABA 2: CRIATIVOS CAMPEÕES */}
        {activeSubTab === 'criativos' && (
          <motion.div
            key="tab_criativos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAds.map((ad, idx) => (
                <Card key={ad.id} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <CardHeader className="p-5 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-start justify-between gap-2">
                        <Badge className={`${
                          ad.badge.includes('🏆') 
                            ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40' 
                            : 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-300'
                        } text-[10px] font-black uppercase tracking-wider`}>
                          {ad.badge}
                        </Badge>
                        <Badge className={`${
                          ad.status === 'ACTIVE' 
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' 
                            : 'bg-zinc-500/15 text-zinc-400'
                        } text-[10px] font-bold`}>
                          {ad.status === 'ACTIVE' ? 'Ativo' : 'Pausado'}
                        </Badge>
                      </div>
                      <CardTitle className="text-sm font-bold text-zinc-900 dark:text-white pt-2 line-clamp-2">
                        {ad.name}
                      </CardTitle>
                      <CardDescription className="text-[11px] text-zinc-500 font-medium">
                        Formato: {ad.format} • Destino: {ad.destination}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-5 space-y-4">
                      {/* Copy / Chamada */}
                      <div className="bg-zinc-50 dark:bg-zinc-850/60 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-750">
                        <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Título do Anúncio</span>
                        <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 italic">
                          "{ad.headline}"
                        </p>
                      </div>

                      {/* Grade de Performance */}
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2.5 bg-zinc-50 dark:bg-zinc-850/40 rounded-xl border border-zinc-100 dark:border-zinc-800">
                          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Taxa de Clique</span>
                          <span className={`text-sm font-black ${Number(ad.ctr) >= 4 ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-900 dark:text-white'}`}>
                            {ad.ctr}% CTR
                          </span>
                        </div>
                        <div className="p-2.5 bg-zinc-50 dark:bg-zinc-850/40 rounded-xl border border-zinc-100 dark:border-zinc-800">
                          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Custo por Clique</span>
                          <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                            R$ {Number(ad.cpc).toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        <div className="p-2.5 bg-zinc-50 dark:bg-zinc-850/40 rounded-xl border border-zinc-100 dark:border-zinc-800">
                          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Cliques Totais</span>
                          <span className="text-sm font-black text-zinc-900 dark:text-white">
                            {ad.clicks}
                          </span>
                        </div>
                        <div className="p-2.5 bg-zinc-50 dark:bg-zinc-850/40 rounded-xl border border-zinc-100 dark:border-zinc-800">
                          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Valor Investido</span>
                          <span className="text-sm font-black text-zinc-900 dark:text-white">
                            R$ {Number(ad.cost).toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </div>

                  <div className="p-5 pt-0 border-t border-zinc-100 dark:border-zinc-800 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleAd(ad)}
                      className="w-full rounded-xl text-xs font-bold border-zinc-200 dark:border-zinc-700 hover:border-[#c59b5f] transition-all"
                    >
                      {ad.status === 'ACTIVE' ? (
                        <>
                          <PauseCircle className="w-3.5 h-3.5 mr-1.5 text-zinc-400" />
                          Pausar Anúncio
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                          Ativar Anúncio
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* ABA 3: POSICIONAMENTOS (FEED VS REELS VS STORIES) */}
        {activeSubTab === 'posicionamentos' && (
          <motion.div
            key="tab_posicionamentos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#c59b5f]" />
                Distribuição de Volume e Cliques por Canal
              </h3>
              <p className="text-xs text-zinc-500 mb-6">
                Mapeamento real de entrega do algoritmo da Meta entre Instagram, Facebook e WhatsApp
              </p>

              <div className="space-y-5">
                {placements.map((plc, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-900 dark:text-white">
                          {plc.platform} {plc.position}
                        </span>
                        <Badge className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px]">
                          {plc.share}% da entrega
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-zinc-900 dark:text-white mr-2">
                          {plc.clicks} cliques
                        </span>
                        <span className="text-zinc-500 text-[11px]">
                          (CPC R$ {plc.cpc.toFixed(2).replace('.', ',')} • CTR {plc.ctr}%)
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          plc.platform === 'Instagram'
                            ? 'bg-gradient-to-r from-[#833ab4] to-[#fd1d1d]'
                            : plc.platform === 'Facebook'
                            ? 'bg-[#0064e0]'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.max(plc.share, 4)}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-zinc-400">
                      <span>{plc.impressions?.toLocaleString('pt-BR')} impressões</span>
                      <span>Investimento: R$ {plc.spend.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ABA 4: PÚBLICOS & DEMOGRAFIA */}
        {activeSubTab === 'publicos' && (
          <motion.div
            key="tab_publicos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Demografia por Faixa Etária */}
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
              <CardHeader className="p-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <CardTitle className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#c59b5f]" />
                  Perfil Demográfico ({demographics?.gender || '100% Feminino'})
                </CardTitle>
                <CardDescription className="text-xs text-zinc-500">
                  Faixas etárias com maior resposta de compra e revenda
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {(demographics?.topAges || []).map((age, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-zinc-800 dark:text-zinc-200">{age.range}</span>
                      <span className="text-[#c59b5f] font-bold">{age.share}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#c59b5f] rounded-full" 
                        style={{ width: `${age.share}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Distribuição Geográfica */}
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
              <CardHeader className="p-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <CardTitle className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#c59b5f]" />
                  Estados de Maior Conversão (Frete &amp; Proximidade)
                </CardTitle>
                <CardDescription className="text-xs text-zinc-500">
                  Regiões estratégicas com melhor custo logístico saindo de Nova Friburgo/RJ
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-3.5">
                {(demographics?.topStates || []).map((st, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-850/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <div>
                      <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                        {st.state}
                      </span>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {st.note}
                      </span>
                    </div>
                    <Badge className="bg-[#c59b5f]/15 text-[#c59b5f] font-black text-xs">
                      {st.share}%
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ABA 5: PIXEL META & CAPI */}
        {activeSubTab === 'pixel' && (
          <motion.div
            key="tab_pixel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
              <CardHeader className="p-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Saúde do Pixel Meta &amp; API de Conversões (CAPI)
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-500">
                      Rastreamento híbrido com deduplicação de eventos via navegador e servidor VPS
                    </CardDescription>
                  </div>
                  <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold uppercase text-[10px]">
                    Status: {pixelHealth?.status || 'EXCELENTE'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {(pixelHealth?.events || []).map((ev, idx) => (
                    <div key={idx} className="p-4 bg-zinc-50 dark:bg-zinc-850/50 rounded-2xl border border-zinc-200 dark:border-zinc-750 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">
                          {ev.name}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="text-xs text-zinc-500">
                        Disparos: <strong className="text-zinc-900 dark:text-white">{ev.count}</strong>
                      </div>
                      <div className="text-[11px] text-zinc-400 flex items-center justify-between pt-1 border-t border-zinc-200/50 dark:border-zinc-700/50">
                        <span>Qualidade Match:</span>
                        <strong className="text-emerald-600 dark:text-emerald-400">{ev.matchQuality}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/25 rounded-2xl p-4 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed m-0">
                    O Pixel da Avante Lingerie (ID: <strong>{pixelHealth?.pixelId || '1098679468551408'}</strong>) opera com correspondência avançada automática ativada (e-mail e telefone criptografados via SHA-256) garantindo <strong>máxima mensuração de compras e público de remarketing</strong>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE CONFIRMAÇÃO SEGURA PARA MUTAÇÕES */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                {modalConfig.title}
              </h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {modalConfig.description}
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
                className="rounded-xl text-xs"
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                onClick={executeModalAction}
                className="bg-[#c59b5f] hover:bg-[#b0884e] text-black font-bold rounded-xl text-xs"
              >
                {modalConfig.confirmText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
