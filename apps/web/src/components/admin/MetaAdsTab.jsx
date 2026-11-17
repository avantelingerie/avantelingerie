// Caminho do arquivo: apps/web/src/components/admin/MetaAdsTab.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Megaphone, Search, AlertTriangle, ShieldCheck, CheckCircle2,
  DollarSign, TrendingUp, MousePointerClick, Eye, Percent,
  Calendar, RefreshCw, Plus, Trash2, PauseCircle, PlayCircle,
  Smartphone, Laptop, Tablet, MapPin, Users, Target, Clock,
  Globe, ShieldAlert, ArrowUpRight, ArrowDownRight, Sparkles,
  HelpCircle, ChevronDown, Check, X, Filter, BarChart2, Edit2, Save,
  Flame, Award, Activity, Sliders, Layers
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';

export default function MetaAdsTab({ dateRange = '30d' }) {
  // Estado principal
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState('120251762627320751');
  const [activeSubTab, setActiveSubTab] = useState('demografia'); // 'criativos' | 'demografia' | 'geografia' | 'dispositivos' | 'audiencias'
  const [selectedTimeRange, setSelectedTimeRange] = useState(dateRange);

  // Modal de Confirmação Segura
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    description: '',
    confirmText: 'Confirmar Alteração',
    actionType: null,
    payload: null
  });

  // Estados locais para inputs de Adição e Edição
  const [editingAgeModifier, setEditingAgeModifier] = useState({});
  const [editingGenderModifier, setEditingGenderModifier] = useState({});
  const [editingIncomeModifier, setEditingIncomeModifier] = useState({});
  const [editingLocationModifier, setEditingLocationModifier] = useState({});
  const [editingDeviceModifier, setEditingDeviceModifier] = useState({});
  const [editingPlacementModifier, setEditingPlacementModifier] = useState({});
  const [editingAudienceModifier, setEditingAudienceModifier] = useState({});
  const [editingCampaignBudget, setEditingCampaignBudget] = useState({});

  // Busca de dados estruturados
  const fetchMetaAdsData = useCallback(async () => {
    try {
      setRefreshing(true);
      const res = await apiServerClient.fetch('/ads/meta/data');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);

          // Inicializar mapas locais de edição
          const ageMap = {};
          (json.data.ageDemographics || []).forEach(a => {
            ageMap[a.range] = { bidModifier: a.bidModifier || (a.status === 'EXCLUDED' ? -100 : 0), status: a.status };
          });
          setEditingAgeModifier(ageMap);

          const genMap = {};
          (json.data.genderDemographics || []).forEach(g => {
            genMap[g.gender] = { bidModifier: g.bidModifier || (g.status === 'EXCLUDED' ? -100 : 0), status: g.status };
          });
          setEditingGenderModifier(genMap);

          const incMap = {};
          (json.data.incomeDemographics || []).forEach(i => {
            incMap[i.tier] = { bidModifier: i.bidModifier || 0, status: i.status };
          });
          setEditingIncomeModifier(incMap);

          const locMap = {};
          (json.data.locations || []).forEach(l => {
            locMap[l.name] = { bidModifier: l.bidModifier || 0, status: l.status };
          });
          setEditingLocationModifier(locMap);

          const devMap = {};
          (json.data.devices || []).forEach(d => {
            devMap[d.type] = { bidModifier: d.bidModifier || 0, status: d.status };
          });
          setEditingDeviceModifier(devMap);

          const plcMap = {};
          (json.data.placements || []).forEach(p => {
            const key = p.position;
            plcMap[key] = { bidModifier: p.bidModifier || 0, status: p.status || 'ENABLED' };
          });
          setEditingPlacementModifier(plcMap);

          const audMap = {};
          (json.data.audiencesConfig || []).forEach(a => {
            audMap[a.id] = { bidModifier: a.bidModifier || 0, mode: a.mode };
          });
          setEditingAudienceModifier(audMap);

          const bMap = {};
          (json.data.campaigns || []).forEach(c => {
            bMap[c.id] = c.dailyBudget;
          });
          setEditingCampaignBudget(bMap);
        }
      }
    } catch (err) {
      console.warn('[MetaAdsTab] Falha ao carregar dados:', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMetaAdsData();
  }, [fetchMetaAdsData]);

  // Campanha atualmente selecionada
  const activeCampaign = useMemo(() => {
    if (!data?.campaigns) return null;
    return data.campaigns.find(c => c.id === selectedCampaignId) || data.campaigns[0];
  }, [data, selectedCampaignId]);

  // Formatações
  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);
  const formatNumber = (val) => new Intl.NumberFormat('pt-BR').format(val || 0);

  // Helper de Modal Seguro
  const promptAction = (title, description, actionType, payload, confirmText = 'Salvar Alteração') => {
    setModalConfig({
      isOpen: true,
      title,
      description,
      actionType,
      payload,
      confirmText
    });
  };

  // Execução de Mutações Aprovadas pelo Modal
  const executeModalAction = async () => {
    const { actionType, payload } = modalConfig;
    setModalConfig(prev => ({ ...prev, isOpen: false }));

    try {
      if (actionType === 'update_age') {
        const { range, status, bidModifier } = payload;
        const res = await apiServerClient.fetch('/ads/meta/age-modifier', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ range, status, bidModifier })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setData(prev => ({
            ...prev,
            ageDemographics: prev.ageDemographics.map(a => a.range === range ? { ...a, status, bidModifier } : a)
          }));
        } else {
          toast.error(json.error || 'Erro ao atualizar faixa etária.');
        }
      } else if (actionType === 'update_gender') {
        const { gender, status, bidModifier } = payload;
        const res = await apiServerClient.fetch('/ads/meta/gender-modifier', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gender, status, bidModifier })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setData(prev => ({
            ...prev,
            genderDemographics: prev.genderDemographics.map(g => g.gender === gender ? { ...g, status, bidModifier } : g)
          }));
        } else {
          toast.error(json.error || 'Erro ao atualizar gênero.');
        }
      } else if (actionType === 'update_income') {
        const { tier, status, bidModifier } = payload;
        const res = await apiServerClient.fetch('/ads/meta/income-modifier', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier, status, bidModifier })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setData(prev => ({
            ...prev,
            incomeDemographics: prev.incomeDemographics.map(i => i.tier === tier ? { ...i, status, bidModifier } : i)
          }));
        } else {
          toast.error(json.error || 'Erro ao atualizar faixa de renda.');
        }
      } else if (actionType === 'update_location') {
        const { name, status, bidModifier } = payload;
        const res = await apiServerClient.fetch('/ads/meta/location-modifier', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, status, bidModifier })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setData(prev => ({
            ...prev,
            locations: prev.locations.map(l => l.name === name ? { ...l, status, bidModifier } : l)
          }));
        } else {
          toast.error(json.error || 'Erro ao atualizar localização.');
        }
      } else if (actionType === 'update_device') {
        const { deviceType, bidModifier } = payload;
        const res = await apiServerClient.fetch('/ads/meta/device-modifier', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deviceType, bidModifier })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setData(prev => ({
            ...prev,
            devices: prev.devices.map(d => d.type === deviceType ? { ...d, bidModifier, status: bidModifier === -100 ? 'EXCLUDED' : 'ENABLED' } : d)
          }));
        } else {
          toast.error(json.error || 'Erro ao salvar dispositivo.');
        }
      } else if (actionType === 'update_placement') {
        const { position, bidModifier, status } = payload;
        const res = await apiServerClient.fetch('/ads/meta/placement-modifier', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ position, bidModifier, status })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setData(prev => ({
            ...prev,
            placements: prev.placements.map(p => p.position === position ? { ...p, bidModifier, status } : p)
          }));
        } else {
          toast.error(json.error || 'Erro ao atualizar posicionamento.');
        }
      } else if (actionType === 'update_audience') {
        const { id, mode, bidModifier } = payload;
        const res = await apiServerClient.fetch('/ads/meta/audience-modifier', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, mode, bidModifier })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setData(prev => ({
            ...prev,
            audiencesConfig: prev.audiencesConfig.map(a => a.id === id ? { ...a, mode, bidModifier } : a)
          }));
        } else {
          toast.error(json.error || 'Erro ao atualizar público.');
        }
      } else if (actionType === 'toggle_ad') {
        const { adId, status } = payload;
        const res = await apiServerClient.fetch('/ads/meta/ad-update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adId, status })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setData(prev => ({
            ...prev,
            ads: prev.ads.map(a => a.id === adId ? { ...a, status } : a)
          }));
        } else {
          toast.error(json.error || 'Erro ao atualizar anúncio.');
        }
      } else if (actionType === 'update_budget') {
        const { campaignId, dailyBudget } = payload;
        const res = await apiServerClient.fetch('/ads/meta/campaign-update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaignId, dailyBudget })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setData(prev => ({
            ...prev,
            campaigns: prev.campaigns.map(c => c.id === campaignId ? { ...c, dailyBudget } : c)
          }));
        } else {
          toast.error(json.error || 'Erro ao atualizar orçamento.');
        }
      } else if (actionType === 'toggle_campaign') {
        const { campaignId, status } = payload;
        const res = await apiServerClient.fetch('/ads/meta/campaign-update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaignId, status })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setData(prev => ({
            ...prev,
            campaigns: prev.campaigns.map(c => c.id === campaignId ? { ...c, status } : c)
          }));
        } else {
          toast.error(json.error || 'Erro ao atualizar status da campanha.');
        }
      }
    } catch (e) {
      toast.error('Erro de comunicação: ' + e.message);
    }
  };

  const handleManualSync = async () => {
    try {
      setRefreshing(true);
      const res = await apiServerClient.fetch('/ads/meta/refresh', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        toast.success('Métricas e Segmentações do Meta Ads (Instagram/FB) sincronizadas com a API Oficial!');
        fetchMetaAdsData();
      }
    } catch (e) {
      toast.error('Falha ao sincronizar: ' + e.message);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-zinc-900 dark:text-zinc-100">
        <RefreshCw className="w-8 h-8 text-[#c59b5f] animate-spin" />
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Carregando central de comando do Meta Ads...</p>
      </div>
    );
  }

  if (!data) return null;

  // Totalizadores
  const totalAge = (data.ageDemographics || []).reduce((acc, a) => {
    acc.impressions += a.impressions || 0;
    acc.clicks += a.clicks || 0;
    acc.cost += a.cost || 0;
    return acc;
  }, { impressions: 0, clicks: 0, cost: 0 });

  const totalGender = (data.genderDemographics || []).reduce((acc, g) => {
    acc.clicks += g.clicks || 0;
    acc.cost += g.cost || 0;
    return acc;
  }, { clicks: 0, cost: 0 });

  const totalIncome = (data.incomeDemographics || []).reduce((acc, i) => {
    acc.clicks += i.clicks || 0;
    acc.cost += i.cost || 0;
    return acc;
  }, { clicks: 0, cost: 0 });

  const totalLocations = (data.locations || []).reduce((acc, l) => {
    acc.impressions += l.impressions || 0;
    acc.clicks += l.clicks || 0;
    acc.cost += l.cost || 0;
    return acc;
  }, { impressions: 0, clicks: 0, cost: 0 });

  const totalPlacements = (data.placements || []).reduce((acc, p) => {
    acc.impressions += p.impressions || 0;
    acc.clicks += p.clicks || 0;
    acc.cost += p.cost || 0;
    return acc;
  }, { impressions: 0, clicks: 0, cost: 0 });

  return (
    <div className="space-y-6">
      {/* 1. HEADER DA CONTA META & SELETOR DE CAMPANHA (EXATO GOOGLE ADS) */}
      <div className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm dark:shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c59b5f]/15 border border-[#c59b5f]/30 flex items-center justify-center text-[#c59b5f]">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{data.account.name}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">ID: {data.account.id}</span>
                <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono">
                  ● API CONECTADA
                </Badge>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Central Executiva de Segmentações Meta (Instagram, Facebook &amp; WhatsApp) • Modo Operacional Ativo
              </p>
            </div>
          </div>
        </div>

        {/* Controles de Campanha e Atualização */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300">
            <span className="text-zinc-500 mr-2 font-medium">Campanha:</span>
            <select
              value={selectedCampaignId}
              onChange={(e) => setSelectedCampaignId(e.target.value)}
              className="bg-transparent text-zinc-900 dark:text-zinc-100 font-semibold focus:outline-none cursor-pointer max-w-[280px] truncate"
            >
              {data.campaigns.map(c => (
                <option key={c.id} value={c.id} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {activeCampaign && (
            <div className="flex items-center bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 gap-1.5">
              <span className="text-zinc-500 font-medium">Orçamento:</span>
              <div className="flex items-center gap-1 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                <span>R$</span>
                <input
                  type="number"
                  min="5"
                  step="5"
                  value={editingCampaignBudget[activeCampaign.id] ?? activeCampaign.dailyBudget}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setEditingCampaignBudget(prev => ({
                      ...prev,
                      [activeCampaign.id]: val
                    }));
                  }}
                  className="w-12 h-6 text-center text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#c59b5f]"
                />
                <span className="text-zinc-500 font-normal">/dia</span>
              </div>
              {Number(editingCampaignBudget[activeCampaign.id] ?? activeCampaign.dailyBudget) !== Number(activeCampaign.dailyBudget) && (
                <Button
                  size="sm"
                  onClick={() => promptAction(
                    'Alterar Orçamento da Campanha Meta',
                    `Deseja alterar o orçamento diário da campanha "${activeCampaign.name}" para R$ ${editingCampaignBudget[activeCampaign.id]}/dia?`,
                    'update_budget',
                    { campaignId: activeCampaign.id, dailyBudget: Number(editingCampaignBudget[activeCampaign.id]) },
                    'Salvar Orçamento'
                  )}
                  className="h-6 px-2 text-[10px] bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded-lg"
                >
                  Salvar
                </Button>
              )}
            </div>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={handleManualSync}
            disabled={refreshing}
            className="text-xs border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 gap-2 h-9"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#c59b5f]' : ''}`} />
            <span>Sincronizar Meta Ads</span>
          </Button>
        </div>
      </div>

      {/* 2. SCORECARDS DE KPIS PRINCIPAIS (EXATO GOOGLE ADS) */}
      {activeCampaign && (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5">
          <Card className="bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800/80 shadow-sm">
            <CardContent className="p-4 space-y-1">
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs">
                <span>Custo Investido</span>
                <DollarSign className="w-3.5 h-3.5 text-[#c59b5f]" />
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {formatCurrency(activeCampaign.metrics.cost)}
              </div>
              <span className="text-[10px] text-zinc-500 block">Total do período selecionado</span>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800/80 shadow-sm">
            <CardContent className="p-4 space-y-1">
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs">
                <span>Cliques Reais</span>
                <MousePointerClick className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {formatNumber(activeCampaign.metrics.clicks)}
              </div>
              <span className="text-[10px] text-blue-600 dark:text-blue-400/80 block font-mono">100% tráfego qualificado</span>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800/80 shadow-sm">
            <CardContent className="p-4 space-y-1">
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs">
                <span>Impressões na Rede</span>
                <Eye className="w-3.5 h-3.5 text-zinc-400" />
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {formatNumber(activeCampaign.metrics.impressions)}
              </div>
              <span className="text-[10px] text-zinc-500 block">Feed, Stories &amp; Reels</span>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800/80 shadow-sm">
            <CardContent className="p-4 space-y-1">
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs">
                <span>CTR Médio Global</span>
                <Percent className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {activeCampaign.metrics.ctr}%
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-500/80 block">Taxa de atração alta</span>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800/80 shadow-sm">
            <CardContent className="p-4 space-y-1">
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs">
                <span>CPC Médio Geral</span>
                <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {formatCurrency(activeCampaign.metrics.avgCpc)}
              </div>
              <span className="text-[10px] text-zinc-500 block">Custo por clique médio</span>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900/60 border-amber-300 dark:border-amber-500/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-amber-500/10 rounded-bl-full pointer-events-none" />
            <CardContent className="p-4 space-y-1">
              <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 text-xs">
                <span>Conversões</span>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-amber-600 dark:text-amber-400">
                {activeCampaign.metrics.conversions}
              </div>
              <span className="text-[10px] text-amber-600 dark:text-amber-300/80 block">
                {selectedCampaignId === '120251762627320751' ? 'Leads WhatsApp Fábrica' : '25 Checkouts Iniciados'}
              </span>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 3. NAVEGAÇÃO ENTRE AS 5 MACRO-SEGMENTAÇÕES (EXATO GOOGLE ADS) */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('criativos')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'criativos'
              ? 'bg-[#c59b5f] text-black shadow-md'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-rose-500" />
          <span>A. Anúncios &amp; Criativos Campeões ({data.ads.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('demografia')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'demografia'
              ? 'bg-[#c59b5f] text-black shadow-md'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>B &amp; C. Demografia Básica &amp; Renda Familiar</span>
        </button>

        <button
          onClick={() => setActiveSubTab('geografia')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'geografia'
              ? 'bg-[#c59b5f] text-black shadow-md'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>D. Localização Geográfica &amp; Estados Polo</span>
        </button>

        <button
          onClick={() => setActiveSubTab('dispositivos')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'dispositivos'
              ? 'bg-[#c59b5f] text-black shadow-md'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>E. Posicionamentos &amp; Dispositivos (Feed, Stories &amp; Reels)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('audiencias')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'audiencias'
              ? 'bg-[#c59b5f] text-black shadow-md'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>F. Públicos-Alvo, Remarketing &amp; Pixel CAPI</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SEÇÃO 1: CRIATIVOS CAMPEÕES & ANÚNCIOS ATIVOS (TABELA COMPLETA COM LANCES) */}
      {/* ========================================================================= */}
      {activeSubTab === 'criativos' && (
        <div className="space-y-8">
          <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
            <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                    <Flame className="w-4 h-4 text-rose-500" />
                    Vitrine de Criativos &amp; Anúncios Oficiais Meta Ads
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                    Gerencie o status de veiculação e acompanhe os anúncios de maior retorno sobre o investimento.
                  </CardDescription>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold text-amber-500">🏆 Destaque:</span>
                  <span>AD B2B 01 com CTR histórico de 8,22%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Anúncio / Criativo</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Formato</th>
                    <th className="py-3 px-3 text-right">Impressões</th>
                    <th className="py-3 px-3 text-right">Cliques</th>
                    <th className="py-3 px-3 text-right">CTR</th>
                    <th className="py-3 px-3 text-right">CPC Médio</th>
                    <th className="py-3 px-3 text-right">Custo Total</th>
                    <th className="py-3 px-4 text-center">Salvar / Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                  {data.ads.map((ad) => {
                    const isPaused = ad.status !== 'ACTIVE';
                    return (
                      <tr key={ad.id} className={`hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors ${isPaused ? 'opacity-60 bg-zinc-100/50 dark:bg-zinc-900/40' : ''}`}>
                        <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{ad.name}</span>
                            {ad.badge && (
                              <Badge className={`${
                                ad.badge.includes('🏆') 
                                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' 
                                  : 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20'
                              } text-[9px] font-black uppercase`}>
                                {ad.badge}
                              </Badge>
                            )}
                          </div>
                          <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">
                            Destino: {ad.destination} • "{ad.headline}"
                          </span>
                        </td>
                        <td className="py-3 px-3 font-sans">
                          {ad.status === 'ACTIVE' ? (
                            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                              Ativo
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-[10px] bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
                              Pausado
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-3 font-sans text-zinc-600 dark:text-zinc-300">{ad.format}</td>
                        <td className="py-3 px-3 text-right text-zinc-600 dark:text-zinc-300">{formatNumber(ad.impressions)}</td>
                        <td className="py-3 px-3 text-right text-zinc-900 dark:text-zinc-100 font-bold">{formatNumber(ad.clicks)}</td>
                        <td className={`py-3 px-3 text-right font-bold ${Number(ad.ctr) >= 4 ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-600 dark:text-zinc-300'}`}>
                          {ad.ctr}%
                        </td>
                        <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(ad.cpc)}</td>
                        <td className="py-3 px-3 text-right text-[#c59b5f] font-bold">{formatCurrency(ad.cost)}</td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const newSt = ad.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
                              promptAction(
                                newSt === 'ACTIVE' ? 'Reativar Anúncio' : 'Pausar Anúncio',
                                `Deseja ${newSt === 'ACTIVE' ? 'reativar' : 'pausar'} a veiculação do anúncio "${ad.name}" no Meta Ads?`,
                                'toggle_ad',
                                { adId: ad.id, status: newSt },
                                newSt === 'ACTIVE' ? 'Reativar Anúncio' : 'Pausar Anúncio'
                              );
                            }}
                            className={`h-7 px-2.5 text-[10px] font-bold rounded-lg border ${
                              ad.status === 'ACTIVE'
                                ? 'text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/10'
                                : 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10'
                            }`}
                          >
                            {ad.status === 'ACTIVE' ? 'Pausar' : 'Reativar'}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-zinc-100 dark:bg-zinc-950 font-mono font-bold text-xs border-t-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
                  <tr>
                    <td className="py-3.5 px-4 font-sans uppercase tracking-wider text-[#c59b5f]">TOTAL DE TODOS OS CRIATIVOS</td>
                    <td className="py-3.5 px-3 font-sans text-zinc-500">-</td>
                    <td className="py-3.5 px-3 font-sans text-zinc-500">-</td>
                    <td className="py-3.5 px-3 text-right">{formatNumber(data.summaryMetrics.impressions)}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">{formatNumber(data.summaryMetrics.clicks)}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">{data.summaryMetrics.ctr}%</td>
                    <td className="py-3.5 px-3 text-right">{formatCurrency(data.summaryMetrics.avgCpc)}</td>
                    <td className="py-3.5 px-3 text-right text-[#c59b5f] text-sm">{formatCurrency(data.summaryMetrics.spend)}</td>
                    <td className="py-3.5 px-4 text-center font-sans text-[10px] text-zinc-500">100% Controlado</td>
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEÇÃO 2: DEMOGRAFIA BÁSICA & RENDA FAMILIAR (EXATO PRINT 1 DO GOOGLE) */}
      {/* ========================================================================= */}
      {activeSubTab === 'demografia' && (
        <div className="space-y-8">
          {/* TABELA: FAIXA ETÁRIA (AGE DEMOGRAPHICS) */}
          <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
            <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <Users className="w-4 h-4 text-[#c59b5f]" />
                Segmentação Demográfica por Faixa Etária (Age Ranges)
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                Defina ajustes de lances (%) ou exclua faixas etárias específicas diretamente na conta Meta Ads.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Faixa Etária</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-center">Ajuste de Lance (%)</th>
                    <th className="py-3 px-3 text-right">Impressões</th>
                    <th className="py-3 px-3 text-right">Cliques</th>
                    <th className="py-3 px-3 text-right">CTR</th>
                    <th className="py-3 px-3 text-right">CPC Médio</th>
                    <th className="py-3 px-3 text-right">Custo Total</th>
                    <th className="py-3 px-4 text-center">Salvar / Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                  {data.ageDemographics.map((age, idx) => {
                    const localAge = editingAgeModifier[age.range] || { bidModifier: age.bidModifier || 0, status: age.status };
                    const isExcluded = localAge.status === 'EXCLUDED' || localAge.bidModifier === -100;
                    const hasChanged = localAge.bidModifier !== (age.bidModifier || 0) || localAge.status !== age.status;

                    return (
                      <tr key={idx} className={`hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors ${isExcluded ? 'opacity-60 bg-zinc-100/50 dark:bg-zinc-900/40' : ''}`}>
                        <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                          {age.range}
                        </td>
                        <td className="py-3 px-3 font-sans">
                          {isExcluded ? (
                            <Badge variant="outline" className="text-[10px] bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
                              Excluído
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                              Ativo
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center justify-center gap-1">
                            <input
                              type="number"
                              min="-100"
                              max="900"
                              step="5"
                              value={localAge.bidModifier}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setEditingAgeModifier(prev => ({
                                  ...prev,
                                  [age.range]: { ...localAge, bidModifier: val, status: val === -100 ? 'EXCLUDED' : 'ENABLED' }
                                }));
                              }}
                              className="w-16 h-6 text-center text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#c59b5f]"
                            />
                            <span className="text-zinc-500 text-xs">%</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right text-zinc-600 dark:text-zinc-300">{formatNumber(age.impressions)}</td>
                        <td className="py-3 px-3 text-right text-zinc-900 dark:text-zinc-100 font-bold">{formatNumber(age.clicks)}</td>
                        <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400">{age.ctr}%</td>
                        <td className="py-3 px-3 text-right text-zinc-600 dark:text-zinc-300">{formatCurrency(age.avgCpc)}</td>
                        <td className="py-3 px-3 text-right text-[#c59b5f] font-bold">{formatCurrency(age.cost)}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {hasChanged && (
                              <Button
                                size="sm"
                                onClick={() => promptAction(
                                  'Salvar Ajuste de Lance da Idade',
                                  `Deseja atualizar o lance para a faixa "${age.range}" para ${localAge.bidModifier}%?`,
                                  'update_age',
                                  { range: age.range, status: localAge.status, bidModifier: localAge.bidModifier },
                                  'Salvar Lance'
                                )}
                                className="h-7 px-2.5 text-[10px] bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded-lg shadow-sm"
                              >
                                Salvar
                              </Button>
                            )}

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                const newSt = isExcluded ? 'ENABLED' : 'EXCLUDED';
                                const newMod = isExcluded ? 0 : -100;
                                promptAction(
                                  isExcluded ? 'Reativar Faixa Etária' : 'Excluir Faixa Etária',
                                  `Você deseja ${isExcluded ? 'reativar a exibição para' : 'bloquear totalmente a exibição para'} a faixa "${age.range}"?`,
                                  'update_age',
                                  { range: age.range, status: newSt, bidModifier: newMod },
                                  isExcluded ? 'Reativar' : 'Excluir Faixa'
                                );
                              }}
                              className={`h-7 px-2 text-[10px] font-bold rounded-lg border ${
                                isExcluded
                                  ? 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10'
                                  : 'text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/10'
                              }`}
                            >
                              {isExcluded ? 'Reativar' : 'Excluir'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-zinc-100 dark:bg-zinc-950 font-mono font-bold text-xs border-t-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
                  <tr>
                    <td className="py-3.5 px-4 font-sans uppercase tracking-wider text-[#c59b5f]">TOTAL DE TODAS AS IDADES</td>
                    <td className="py-3.5 px-3 font-sans text-zinc-500">-</td>
                    <td className="py-3.5 px-4 text-center font-sans text-zinc-500">-</td>
                    <td className="py-3.5 px-3 text-right">{formatNumber(totalAge.impressions)}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">{formatNumber(totalAge.clicks)}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">
                      {totalAge.impressions > 0 ? ((totalAge.clicks / totalAge.impressions) * 100).toFixed(2) : 0}%
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {formatCurrency(totalAge.clicks > 0 ? totalAge.cost / totalAge.clicks : 0)}
                    </td>
                    <td className="py-3.5 px-3 text-right text-[#c59b5f] text-sm">{formatCurrency(totalAge.cost)}</td>
                    <td className="py-3.5 px-4 text-center font-sans text-[10px] text-zinc-500">100% Controlado</td>
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>

          {/* TABELA: GÊNERO & TABELA: RENDA FAMILIAR LADO A LADO */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* GÊNERO */}
            <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
              <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
                <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                  <Users className="w-4 h-4 text-[#c59b5f]" />
                  Demografia por Gênero (Gender)
                </CardTitle>
                <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                  Ajuste lances ou bloqueie exibições para direcionar a verba a revendedoras.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                  <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Gênero</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-center">Lance (%)</th>
                      <th className="py-3 px-3 text-right">Cliques</th>
                      <th className="py-3 px-3 text-right">Custo</th>
                      <th className="py-3 px-4 text-center">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                    {data.genderDemographics.map((gen, idx) => {
                      const localGen = editingGenderModifier[gen.gender] || { bidModifier: gen.bidModifier || 0, status: gen.status };
                      const hasChanged = localGen.bidModifier !== (gen.bidModifier || 0) || localGen.status !== gen.status;

                      return (
                        <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                          <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${gen.gender === 'Feminino' ? 'bg-[#c59b5f]' : gen.gender === 'Masculino' ? 'bg-blue-500' : 'bg-zinc-400'}`} />
                            <span>{gen.gender}</span>
                          </td>
                          <td className="py-3 px-3 font-sans">
                            {gen.status === 'EXCLUDED' ? (
                              <Badge variant="outline" className="text-[10px] bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
                                Excluído
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                                Ativo
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <div className="inline-flex items-center justify-center gap-1">
                              <input
                                type="number"
                                min="-100"
                                max="900"
                                step="5"
                                value={localGen.bidModifier}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setEditingGenderModifier(prev => ({
                                    ...prev,
                                    [gen.gender]: { ...localGen, bidModifier: val, status: val === -100 ? 'EXCLUDED' : 'ENABLED' }
                                  }));
                                }}
                                className="w-14 h-6 text-center text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#c59b5f]"
                              />
                              <span className="text-zinc-500 text-xs">%</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-right text-zinc-900 dark:text-zinc-100 font-bold">{formatNumber(gen.clicks)}</td>
                          <td className="py-3 px-3 text-right text-[#c59b5f] font-bold">{formatCurrency(gen.cost)}</td>
                          <td className="py-3 px-4 text-center">
                            {hasChanged ? (
                              <Button
                                size="sm"
                                onClick={() => promptAction(
                                  'Salvar Ajuste por Gênero',
                                  `Deseja atualizar o lance para ${gen.gender} para ${localGen.bidModifier}%?`,
                                  'update_gender',
                                  { gender: gen.gender, status: localGen.status, bidModifier: localGen.bidModifier },
                                  'Salvar'
                                )}
                                className="h-7 px-2.5 text-[10px] bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded-lg"
                              >
                                Salvar
                              </Button>
                            ) : (
                              <span className="text-[10px] text-zinc-500 font-sans">Pronto</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-zinc-100 dark:bg-zinc-950 font-mono font-bold text-xs border-t-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
                    <tr>
                      <td className="py-3.5 px-4 font-sans uppercase tracking-wider text-[#c59b5f]">TOTAL</td>
                      <td className="py-3.5 px-3 text-zinc-500 font-sans">-</td>
                      <td className="py-3.5 px-3 text-center text-zinc-500 font-sans">-</td>
                      <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">{formatNumber(totalGender.clicks)}</td>
                      <td className="py-3.5 px-3 text-right text-[#c59b5f] text-sm">{formatCurrency(totalGender.cost)}</td>
                      <td className="py-3.5 px-4 text-center font-sans text-[10px] text-zinc-500">100% Controlado</td>
                    </tr>
                  </tfoot>
                </table>
              </CardContent>
            </Card>

            {/* RENDA FAMILIAR */}
            <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
              <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
                <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                  <DollarSign className="w-4 h-4 text-[#c59b5f]" />
                  Renda Familiar (Household Income)
                </CardTitle>
                <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                  Ajuste de lances por percentil de poder aquisitivo no Brasil.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                  <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Faixa de Renda</th>
                      <th className="py-3 px-3 text-center">Lance (%)</th>
                      <th className="py-3 px-3 text-right">Cliques</th>
                      <th className="py-3 px-3 text-right">Custo Total</th>
                      <th className="py-3 px-4 text-center">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                    {data.incomeDemographics.map((inc, idx) => {
                      const localInc = editingIncomeModifier[inc.tier] || { bidModifier: inc.bidModifier || 0, status: inc.status };
                      const hasChanged = localInc.bidModifier !== (inc.bidModifier || 0);

                      return (
                        <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                          <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                            {inc.tier}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <div className="inline-flex items-center justify-center gap-1">
                              <input
                                type="number"
                                min="-100"
                                max="900"
                                step="5"
                                value={localInc.bidModifier}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setEditingIncomeModifier(prev => ({
                                    ...prev,
                                    [inc.tier]: { ...localInc, bidModifier: val }
                                  }));
                                }}
                                className="w-14 h-6 text-center text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#c59b5f]"
                              />
                              <span className="text-zinc-500 text-xs">%</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-right text-zinc-900 dark:text-zinc-100 font-bold">{formatNumber(inc.clicks)}</td>
                          <td className="py-3 px-3 text-right text-[#c59b5f] font-bold">{formatCurrency(inc.cost)}</td>
                          <td className="py-3 px-4 text-center">
                            {hasChanged ? (
                              <Button
                                size="sm"
                                onClick={() => promptAction(
                                  'Salvar Ajuste de Renda',
                                  `Deseja atualizar o lance para a faixa "${inc.tier}" para ${localInc.bidModifier}%?`,
                                  'update_income',
                                  { tier: inc.tier, status: localInc.status, bidModifier: localInc.bidModifier },
                                  'Salvar'
                                )}
                                className="h-7 px-2.5 text-[10px] bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded-lg"
                              >
                                Salvar
                              </Button>
                            ) : (
                              <span className="text-[10px] text-zinc-500 font-sans">Ativo</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-zinc-100 dark:bg-zinc-950 font-mono font-bold text-xs border-t-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
                    <tr>
                      <td className="py-3.5 px-4 font-sans uppercase tracking-wider text-[#c59b5f]">TOTAL</td>
                      <td className="py-3.5 px-3 text-center text-zinc-500 font-sans">-</td>
                      <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">{formatNumber(totalIncome.clicks)}</td>
                      <td className="py-3.5 px-3 text-right text-[#c59b5f] text-sm">{formatCurrency(totalIncome.cost)}</td>
                      <td className="py-3.5 px-4 text-center font-sans text-[10px] text-zinc-500">100% Ativo</td>
                    </tr>
                  </tfoot>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEÇÃO 3: LOCALIZAÇÃO GEOGRÁFICA & ESTADOS POLO */}
      {/* ========================================================================= */}
      {activeSubTab === 'geografia' && (
        <div className="space-y-8">
          <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
            <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <MapPin className="w-4 h-4 text-[#c59b5f]" />
                Segmentação Geográfica por Estados e Capitais
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                Ajuste os lances de leilão conforme o custo logístico de envio saindo de Nova Friburgo/RJ.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Localização / Região</th>
                    <th className="py-3 px-3">Tipo</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-center">Ajuste de Lance (%)</th>
                    <th className="py-3 px-3 text-right">Impressões</th>
                    <th className="py-3 px-3 text-right">Cliques</th>
                    <th className="py-3 px-3 text-right">CTR</th>
                    <th className="py-3 px-3 text-right">CPC Médio</th>
                    <th className="py-3 px-3 text-right">Custo Total</th>
                    <th className="py-3 px-4 text-center">Salvar / Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                  {data.locations.map((loc, idx) => {
                    const localLoc = editingLocationModifier[loc.name] || { bidModifier: loc.bidModifier || 0, status: loc.status };
                    const hasChanged = localLoc.bidModifier !== (loc.bidModifier || 0);

                    return (
                      <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#c59b5f]" />
                          <span>{loc.name}</span>
                        </td>
                        <td className="py-3 px-3 font-sans text-zinc-500">{loc.type}</td>
                        <td className="py-3 px-3 font-sans">
                          <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                            Ativo
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center justify-center gap-1">
                            <input
                              type="number"
                              min="-100"
                              max="900"
                              step="5"
                              value={localLoc.bidModifier}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setEditingLocationModifier(prev => ({
                                  ...prev,
                                  [loc.name]: { ...localLoc, bidModifier: val }
                                }));
                              }}
                              className="w-16 h-6 text-center text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#c59b5f]"
                            />
                            <span className="text-zinc-500 text-xs">%</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right text-zinc-600 dark:text-zinc-300">{formatNumber(loc.impressions)}</td>
                        <td className="py-3 px-3 text-right text-zinc-900 dark:text-zinc-100 font-bold">{formatNumber(loc.clicks)}</td>
                        <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400">{loc.ctr}%</td>
                        <td className="py-3 px-3 text-right text-zinc-600 dark:text-zinc-300">{formatCurrency(loc.avgCpc)}</td>
                        <td className="py-3 px-3 text-right text-[#c59b5f] font-bold">{formatCurrency(loc.cost)}</td>
                        <td className="py-3 px-4 text-center">
                          {hasChanged ? (
                            <Button
                              size="sm"
                              onClick={() => promptAction(
                                'Salvar Ajuste de Localização',
                                `Deseja atualizar o lance para "${loc.name}" para ${localLoc.bidModifier}%?`,
                                'update_location',
                                { name: loc.name, status: localLoc.status, bidModifier: localLoc.bidModifier },
                                'Salvar'
                              )}
                              className="h-7 px-2.5 text-[10px] bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded-lg"
                            >
                              Salvar
                            </Button>
                          ) : (
                            <span className="text-[10px] text-zinc-500 font-sans">Pronto</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-zinc-100 dark:bg-zinc-950 font-mono font-bold text-xs border-t-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
                  <tr>
                    <td className="py-3.5 px-4 font-sans uppercase tracking-wider text-[#c59b5f]">TOTAL DE TODAS AS REGIÕES</td>
                    <td className="py-3.5 px-3 text-zinc-500 font-sans">-</td>
                    <td className="py-3.5 px-3 text-zinc-500 font-sans">-</td>
                    <td className="py-3.5 px-4 text-center text-zinc-500 font-sans">-</td>
                    <td className="py-3.5 px-3 text-right">{formatNumber(totalLocations.impressions)}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">{formatNumber(totalLocations.clicks)}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">
                      {totalLocations.impressions > 0 ? ((totalLocations.clicks / totalLocations.impressions) * 100).toFixed(2) : 0}%
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {formatCurrency(totalLocations.clicks > 0 ? totalLocations.cost / totalLocations.clicks : 0)}
                    </td>
                    <td className="py-3.5 px-3 text-right text-[#c59b5f] text-sm">{formatCurrency(totalLocations.cost)}</td>
                    <td className="py-3.5 px-4 text-center font-sans text-[10px] text-zinc-500">100% Controlado</td>
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEÇÃO 4: POSICIONAMENTOS & DISPOSITIVOS (FEED, STORIES & REELS) */}
      {/* ========================================================================= */}
      {activeSubTab === 'dispositivos' && (
        <div className="space-y-8">
          {/* TABELA: POSICIONAMENTOS META */}
          <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
            <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <Smartphone className="w-4 h-4 text-[#c59b5f]" />
                Segmentação de Posicionamentos (Instagram vs Facebook vs WhatsApp)
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                Ajuste a entrega do algoritmo Meta entre Feed, Stories, Reels e Status.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Canal / Posicionamento</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-center">Ajuste de Lance (%)</th>
                    <th className="py-3 px-3 text-right">Impressões</th>
                    <th className="py-3 px-3 text-right">Cliques</th>
                    <th className="py-3 px-3 text-right">CTR</th>
                    <th className="py-3 px-3 text-right">CPC Médio</th>
                    <th className="py-3 px-3 text-right">Custo Total</th>
                    <th className="py-3 px-4 text-center">Salvar / Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                  {data.placements.map((plc, idx) => {
                    const localPlc = editingPlacementModifier[plc.position] || { bidModifier: plc.bidModifier || 0, status: plc.status || 'ENABLED' };
                    const hasChanged = localPlc.bidModifier !== (plc.bidModifier || 0);

                    return (
                      <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${plc.platform === 'Instagram' ? 'bg-gradient-to-r from-[#833ab4] to-[#fd1d1d]' : plc.platform === 'Facebook' ? 'bg-[#0064e0]' : 'bg-emerald-500'}`} />
                          <span className="font-bold">{plc.platform} {plc.position}</span>
                          <span className="text-[10px] text-zinc-500 font-mono">({plc.share}%)</span>
                        </td>
                        <td className="py-3 px-3 font-sans">
                          <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                            Ativo
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center justify-center gap-1">
                            <input
                              type="number"
                              min="-100"
                              max="900"
                              step="5"
                              value={localPlc.bidModifier}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setEditingPlacementModifier(prev => ({
                                  ...prev,
                                  [plc.position]: { ...localPlc, bidModifier: val }
                                }));
                              }}
                              className="w-16 h-6 text-center text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#c59b5f]"
                            />
                            <span className="text-zinc-500 text-xs">%</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right text-zinc-600 dark:text-zinc-300">{formatNumber(plc.impressions)}</td>
                        <td className="py-3 px-3 text-right text-zinc-900 dark:text-zinc-100 font-bold">{formatNumber(plc.clicks)}</td>
                        <td className={`py-3 px-3 text-right font-bold ${Number(plc.ctr) >= 4 ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-600 dark:text-zinc-300'}`}>
                          {plc.ctr}%
                        </td>
                        <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(plc.cpc)}</td>
                        <td className="py-3 px-3 text-right text-[#c59b5f] font-bold">{formatCurrency(plc.spend)}</td>
                        <td className="py-3 px-4 text-center">
                          {hasChanged ? (
                            <Button
                              size="sm"
                              onClick={() => promptAction(
                                'Salvar Ajuste de Posicionamento',
                                `Deseja atualizar o lance para "${plc.platform} ${plc.position}" para ${localPlc.bidModifier}%?`,
                                'update_placement',
                                { position: plc.position, status: localPlc.status, bidModifier: localPlc.bidModifier },
                                'Salvar'
                              )}
                              className="h-7 px-2.5 text-[10px] bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded-lg"
                            >
                              Salvar
                            </Button>
                          ) : (
                            <span className="text-[10px] text-zinc-500 font-sans">Pronto</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-zinc-100 dark:bg-zinc-950 font-mono font-bold text-xs border-t-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
                  <tr>
                    <td className="py-3.5 px-4 font-sans uppercase tracking-wider text-[#c59b5f]">TOTAL DE TODOS OS CANAIS</td>
                    <td className="py-3.5 px-3 text-zinc-500 font-sans">-</td>
                    <td className="py-3.5 px-4 text-center text-zinc-500 font-sans">-</td>
                    <td className="py-3.5 px-3 text-right">{formatNumber(totalPlacements.impressions)}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">{formatNumber(totalPlacements.clicks)}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">
                      {totalPlacements.impressions > 0 ? ((totalPlacements.clicks / totalPlacements.impressions) * 100).toFixed(2) : 0}%
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {formatCurrency(totalPlacements.clicks > 0 ? totalPlacements.cost / totalPlacements.clicks : 0)}
                    </td>
                    <td className="py-3.5 px-3 text-right text-[#c59b5f] text-sm">{formatCurrency(totalPlacements.cost)}</td>
                    <td className="py-3.5 px-4 text-center font-sans text-[10px] text-zinc-500">100% Controlado</td>
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>

          {/* TABELA: DISPOSITIVOS (SMARTPHONE VS DESKTOP) */}
          <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
            <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <Laptop className="w-4 h-4 text-[#c59b5f]" />
                Segmentação por Dispositivos (Device Breakdown)
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                Mais de 99% das vendas e cadastros da Avante ocorrem em Smartphones.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Dispositivo</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-center">Ajuste de Lance (%)</th>
                    <th className="py-3 px-3 text-right">Impressões</th>
                    <th className="py-3 px-3 text-right">Cliques</th>
                    <th className="py-3 px-3 text-right">CTR</th>
                    <th className="py-3 px-3 text-right">CPC Médio</th>
                    <th className="py-3 px-3 text-right">Custo Total</th>
                    <th className="py-3 px-4 text-center">Salvar / Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                  {data.devices.map((dev, idx) => {
                    const localDev = editingDeviceModifier[dev.type] || { bidModifier: dev.bidModifier || 0, status: dev.status };
                    const isExcluded = localDev.status === 'EXCLUDED' || localDev.bidModifier === -100;
                    const hasChanged = localDev.bidModifier !== (dev.bidModifier || 0);

                    return (
                      <tr key={idx} className={`hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors ${isExcluded ? 'opacity-60 bg-zinc-100/50 dark:bg-zinc-900/40' : ''}`}>
                        <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                          {dev.type === 'MOBILE' ? <Smartphone className="w-3.5 h-3.5 text-[#c59b5f]" /> : <Laptop className="w-3.5 h-3.5 text-blue-500" />}
                          <span>{dev.name}</span>
                        </td>
                        <td className="py-3 px-3 font-sans">
                          {isExcluded ? (
                            <Badge variant="outline" className="text-[10px] bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
                              Excluído
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                              Ativo
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center justify-center gap-1">
                            <input
                              type="number"
                              min="-100"
                              max="900"
                              step="5"
                              value={localDev.bidModifier}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setEditingDeviceModifier(prev => ({
                                  ...prev,
                                  [dev.type]: { ...localDev, bidModifier: val, status: val === -100 ? 'EXCLUDED' : 'ENABLED' }
                                }));
                              }}
                              className="w-16 h-6 text-center text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#c59b5f]"
                            />
                            <span className="text-zinc-500 text-xs">%</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right text-zinc-600 dark:text-zinc-300">{formatNumber(dev.impressions)}</td>
                        <td className="py-3 px-3 text-right text-zinc-900 dark:text-zinc-100 font-bold">{formatNumber(dev.clicks)}</td>
                        <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400">{dev.ctr}%</td>
                        <td className="py-3 px-3 text-right text-zinc-600 dark:text-zinc-300">{formatCurrency(dev.avgCpc)}</td>
                        <td className="py-3 px-3 text-right text-[#c59b5f] font-bold">{formatCurrency(dev.cost)}</td>
                        <td className="py-3 px-4 text-center">
                          {hasChanged ? (
                            <Button
                              size="sm"
                              onClick={() => promptAction(
                                'Salvar Ajuste de Dispositivo',
                                `Deseja atualizar o lance para "${dev.name}" para ${localDev.bidModifier}%?`,
                                'update_device',
                                { deviceType: dev.type, bidModifier: localDev.bidModifier },
                                'Salvar'
                              )}
                              className="h-7 px-2.5 text-[10px] bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded-lg"
                            >
                              Salvar
                            </Button>
                          ) : (
                            <span className="text-[10px] text-zinc-500 font-sans">Pronto</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEÇÃO 5: PÚBLICOS-ALVO & PIXEL CAPI (AUDIENCES & TRACKING) */}
      {/* ========================================================================= */}
      {activeSubTab === 'audiencias' && (
        <div className="space-y-8">
          {/* TABELA: PÚBLICOS-ALVO META */}
          <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
            <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <Target className="w-4 h-4 text-[#c59b5f]" />
                Segmentação de Públicos &amp; Remarketing Dinâmico
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                Ajuste os lances para quem já visitou a loja, interagiu no Instagram ou possui interesse qualificado.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Público-Alvo</th>
                    <th className="py-3 px-3">Tamanho Estimado</th>
                    <th className="py-3 px-3">Modo de Aplicação</th>
                    <th className="py-3 px-4 text-center">Ajuste de Lance (%)</th>
                    <th className="py-3 px-4 text-center">Salvar / Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                  {data.audiencesConfig.map((aud) => {
                    const localAud = editingAudienceModifier[aud.id] || { bidModifier: aud.bidModifier || 0, mode: aud.mode };
                    const hasChanged = localAud.bidModifier !== (aud.bidModifier || 0) || localAud.mode !== aud.mode;

                    return (
                      <tr key={aud.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-[#c59b5f]" />
                          <span>{aud.name}</span>
                        </td>
                        <td className="py-3 px-3 font-sans text-zinc-500">{aud.size} pessoas</td>
                        <td className="py-3 px-3 font-sans">
                          <select
                            value={localAud.mode}
                            onChange={(e) => {
                              const newMode = e.target.value;
                              setEditingAudienceModifier(prev => ({
                                ...prev,
                                [aud.id]: { ...localAud, mode: newMode }
                              }));
                            }}
                            className="bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded px-2 py-0.5 text-[10px] text-zinc-800 dark:text-zinc-200 focus:outline-none"
                          >
                            <option value="TARGETING">Segmentação Direta (Targeting)</option>
                            <option value="OBSERVATION">Observação / Lance Otimizado</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center justify-center gap-1">
                            <input
                              type="number"
                              min="-100"
                              max="900"
                              step="5"
                              value={localAud.bidModifier}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setEditingAudienceModifier(prev => ({
                                  ...prev,
                                  [aud.id]: { ...localAud, bidModifier: val }
                                }));
                              }}
                              className="w-16 h-6 text-center text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#c59b5f]"
                            />
                            <span className="text-zinc-500 text-xs">%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {hasChanged ? (
                            <Button
                              size="sm"
                              onClick={() => promptAction(
                                'Salvar Ajuste do Público',
                                `Deseja atualizar o público "${aud.name}" com lance ${localAud.bidModifier}% em modo ${localAud.mode}?`,
                                'update_audience',
                                { id: aud.id, mode: localAud.mode, bidModifier: localAud.bidModifier },
                                'Salvar'
                              )}
                              className="h-7 px-2.5 text-[10px] bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded-lg"
                            >
                              Salvar
                            </Button>
                          ) : (
                            <span className="text-[10px] text-zinc-500 font-sans">Pronto</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* TABELA: PIXEL META & CAPI SERVER-SIDE */}
          <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
            <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Saúde do Pixel Meta &amp; API de Conversões Server-side (CAPI)
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                    Rastreamento redundante via navegador e servidor VPS da Avante Lingerie (Pixel ID: 1098679468551408).
                  </CardDescription>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-bold">
                  Status: EXCELENTE (9.9/10)
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Nome do Evento</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Disparos no Período</th>
                    <th className="py-3 px-3 text-right">Qualidade Match (Event Match Quality)</th>
                    <th className="py-3 px-4 text-center">Deduplicação Browser/Server</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                  {data.pixelHealth.events.map((ev, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-bold">{ev.name}</span>
                      </td>
                      <td className="py-3 px-3 font-sans">
                        <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                          {ev.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-zinc-900 dark:text-zinc-100">{formatNumber(ev.count)}</td>
                      <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">{ev.matchQuality}</td>
                      <td className="py-3 px-4 text-center font-sans text-emerald-600 dark:text-emerald-400 font-medium">
                        Ativa (100% deduplicado)
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO SEGURA PARA MUTAÇÕES */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
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
                className="bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded-xl text-xs"
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
