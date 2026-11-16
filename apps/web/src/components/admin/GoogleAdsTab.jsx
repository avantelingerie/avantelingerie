// Caminho do arquivo: apps/web/src/components/admin/GoogleAdsTab.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Megaphone, Search, AlertTriangle, ShieldCheck, CheckCircle2,
  DollarSign, TrendingUp, MousePointerClick, Eye, Percent,
  Calendar, RefreshCw, Plus, Trash2, PauseCircle, PlayCircle,
  Smartphone, Laptop, Tablet, MapPin, Users, Target, Clock,
  Globe, ShieldAlert, ArrowUpRight, ArrowDownRight, Sparkles,
  HelpCircle, ChevronDown, Check, X, Filter, BarChart2, Edit2, Save
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';

export default function GoogleAdsTab({ dateRange = '30d' }) {
  // Estado principal
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState('24365539579');
  const [activeSubTab, setActiveSubTab] = useState('gatilhos'); // 'gatilhos' | 'demografia' | 'geografia' | 'dispositivos' | 'audiencias'
  const [selectedTimeRange, setSelectedTimeRange] = useState(dateRange);

  // Estados para Modal de Confirmação Segura
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    description: '',
    confirmText: 'Confirmar Alteração',
    actionType: null,
    payload: null
  });

  // Estados locais para inputs de Adição e Edição
  // 1. Palavras-chave
  const [showAddKeywordForm, setShowAddKeywordForm] = useState(false);
  const [newKeywordText, setNewKeywordText] = useState('');
  const [newKeywordMatchType, setNewKeywordMatchType] = useState('PHRASE');
  const [newKeywordMaxCpc, setNewKeywordMaxCpc] = useState('2.20');
  const [editingKeywords, setEditingKeywords] = useState({});

  // 2. Negativas
  const [newNegativeText, setNewNegativeText] = useState('');
  const [newNegativeMatchType, setNewNegativeMatchType] = useState('PHRASE');

  // 3. Demografia (Idade, Gênero, Renda)
  const [editingAgeModifier, setEditingAgeModifier] = useState({});
  const [editingGenderModifier, setEditingGenderModifier] = useState({});
  const [editingIncomeModifier, setEditingIncomeModifier] = useState({});

  // 4. Locais & Horários
  const [showAddLocationForm, setShowAddLocationForm] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationType, setNewLocationType] = useState('Estado');
  const [newLocationModifier, setNewLocationModifier] = useState('0');
  const [editingLocationModifier, setEditingLocationModifier] = useState({});
  const [editingScheduleModifier, setEditingScheduleModifier] = useState({});

  // 5. Dispositivos & Redes
  const [editingDeviceModifier, setEditingDeviceModifier] = useState({});
  const [searchPartners, setSearchPartners] = useState(true);
  const [displayNetwork, setDisplayNetwork] = useState(false);

  // 6. Públicos & DSA
  const [editingAudienceModifier, setEditingAudienceModifier] = useState({});
  const [newExcludedUrl, setNewExcludedUrl] = useState('');
  const [newTargetCategory, setNewTargetCategory] = useState('');

  // Busca de dados estruturados
  const fetchAdsData = useCallback(async (timeRange = selectedTimeRange) => {
    try {
      setRefreshing(true);
      const res = await apiServerClient.fetch(`/ads/google/data?timeRange=${timeRange}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);

          // Inicializar mapas locais de edição
          const kwMap = {};
          (json.data.keywords || []).forEach(k => {
            kwMap[k.id] = { matchType: k.matchType, maxCpc: k.maxCpc || k.avgCpc, status: k.status };
          });
          setEditingKeywords(kwMap);

          const devMap = {};
          (json.data.devices || []).forEach(d => {
            devMap[d.type] = d.bidModifier;
          });
          setEditingDeviceModifier(devMap);

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
          (json.data.householdIncome || []).forEach(i => {
            incMap[i.bracket] = { bidModifier: i.bidModifier || (i.status === 'EXCLUDED' ? -100 : 0), status: i.status };
          });
          setEditingIncomeModifier(incMap);

          const locMap = {};
          (json.data.locations || []).forEach(l => {
            locMap[l.id] = l.bidModifier || 0;
          });
          setEditingLocationModifier(locMap);

          const schedMap = {};
          (json.data.adSchedule || []).forEach(s => {
            schedMap[s.day] = { bidModifier: s.bidModifier || 0, timeSlots: s.timeSlots, status: s.status };
          });
          setEditingScheduleModifier(schedMap);

          const audMap = {};
          (json.data.audiencesConfig || []).forEach(aud => {
            audMap[aud.id] = { mode: aud.mode, bidModifier: aud.bidModifier };
          });
          setEditingAudienceModifier(audMap);

          const camp = json.data.campaigns?.find(c => c.id === selectedCampaignId) || json.data.campaigns?.[0];
          if (camp?.networkSettings) {
            setSearchPartners(camp.networkSettings.includeSearchPartners);
            setDisplayNetwork(camp.networkSettings.targetContentNetwork);
          }

          return;
        }
      }
      throw new Error('Falha na resposta do servidor');
    } catch (err) {
      console.warn('[GoogleAdsTab] Falha ao ler métricas:', err.message);
      toast.error('Não foi possível conectar ao servidor de métricas do Google Ads.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedTimeRange, selectedCampaignId]);

  useEffect(() => {
    fetchAdsData(dateRange);
  }, [fetchAdsData, dateRange]);

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
      // 1. Atualizar Palavra-chave (Correspondência, Lance ou Status)
      if (actionType === 'update_keyword') {
        const { keywordId, matchType, maxCpc, status, text } = payload;
        const res = await apiServerClient.fetch('/ads/google/keyword-update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keywordId, matchType, maxCpc, status })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setData(prev => ({
            ...prev,
            keywords: prev.keywords.map(k => k.id === keywordId ? { ...k, matchType, maxCpc, status } : k)
          }));
        } else {
          toast.error(json.error || 'Erro ao atualizar palavra-chave.');
        }
      }
      // 2. Adicionar Nova Palavra-chave
      else if (actionType === 'add_keyword') {
        const { text, matchType, maxCpc } = payload;
        const res = await apiServerClient.fetch('/ads/google/keyword-add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, matchType, maxCpc, campaignId: selectedCampaignId })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setNewKeywordText('');
          setShowAddKeywordForm(false);
          setData(prev => ({
            ...prev,
            keywords: [json.keyword, ...prev.keywords]
          }));
        } else {
          toast.error(json.error || 'Erro ao adicionar palavra-chave.');
        }
      }
      // 3. Promover Termo de Busca a Palavra-chave
      else if (actionType === 'promote_search_term') {
        const { searchTerm, matchType, maxCpc } = payload;
        const res = await apiServerClient.fetch('/ads/google/keyword-promote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ searchTerm, matchType, maxCpc })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setData(prev => ({
            ...prev,
            keywords: [json.keyword, ...prev.keywords.filter(k => k.id !== json.keyword.id)]
          }));
        } else {
          toast.error(json.error || 'Erro ao promover termo.');
        }
      }
      // 4. Negativar Termo / Adicionar Palavra Negativa
      else if (actionType === 'add_negative') {
        const { text, matchType } = payload;
        const res = await apiServerClient.fetch('/ads/google/negative-keyword', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, matchType })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setNewNegativeText('');
          setData(prev => ({
            ...prev,
            negativeKeywords: [json.negativeKeyword, ...prev.negativeKeywords.filter(nk => nk.text !== json.negativeKeyword.text)]
          }));
        } else {
          toast.error(json.error || 'Erro ao adicionar negativa.');
        }
      }
      // 5. Remover Negativa
      else if (actionType === 'remove_negative') {
        const { id, text } = payload;
        const res = await apiServerClient.fetch(`/ads/google/negative-keyword/${id}`, { method: 'DELETE' });
        const json = await res.json();
        if (json.success) {
          toast.success(`Palavra-chave negativa "${text}" removida.`);
          setData(prev => ({
            ...prev,
            negativeKeywords: prev.negativeKeywords.filter(nk => nk.id !== id)
          }));
        } else {
          toast.error(json.error || 'Erro ao remover negativa.');
        }
      }
      // 6. Atualizar Idade
      else if (actionType === 'update_age') {
        const { range, status, bidModifier } = payload;
        const res = await apiServerClient.fetch('/ads/google/age-modifier', {
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
      }
      // 7. Atualizar Gênero
      else if (actionType === 'update_gender') {
        const { gender, status, bidModifier } = payload;
        const res = await apiServerClient.fetch('/ads/google/gender-modifier', {
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
      }
      // 8. Atualizar Renda Familiar
      else if (actionType === 'update_income') {
        const { bracket, status, bidModifier } = payload;
        const res = await apiServerClient.fetch('/ads/google/income-modifier', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bracket, status, bidModifier })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setData(prev => ({
            ...prev,
            householdIncome: prev.householdIncome.map(i => i.bracket === bracket ? { ...i, status, bidModifier } : i)
          }));
        } else {
          toast.error(json.error || 'Erro ao atualizar renda.');
        }
      }
      // 9. Atualizar ou Adicionar Local
      else if (actionType === 'update_location') {
        const { id, name, type, bidModifier } = payload;
        const res = await apiServerClient.fetch('/ads/google/location-modifier', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, name, type, bidModifier })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          if (id) {
            setData(prev => ({
              ...prev,
              locations: prev.locations.map(l => l.id === id ? { ...l, bidModifier } : l)
            }));
          } else {
            setNewLocationName('');
            setShowAddLocationForm(false);
            setData(prev => ({
              ...prev,
              locations: [...prev.locations, json.item]
            }));
          }
        } else {
          toast.error(json.error || 'Erro ao atualizar localização.');
        }
      }
      // 10. Atualizar Dispositivo
      else if (actionType === 'device_modifier') {
        const { deviceType, bidModifier } = payload;
        const res = await apiServerClient.fetch('/ads/google/device-modifier', {
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
          toast.error(json.error || 'Erro ao salvar ajuste de dispositivo.');
        }
      }
      // 11. Atualizar Programação de Horários
      else if (actionType === 'update_schedule') {
        const { day, timeSlots, bidModifier } = payload;
        const res = await apiServerClient.fetch('/ads/google/schedule-update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ day, timeSlots, bidModifier })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setData(prev => ({
            ...prev,
            adSchedule: prev.adSchedule.map(s => s.day === day ? { ...s, timeSlots, bidModifier } : s)
          }));
        } else {
          toast.error(json.error || 'Erro ao atualizar programação.');
        }
      }
      // 12. Atualizar Públicos-Alvo
      else if (actionType === 'update_audience') {
        const { id, mode, bidModifier } = payload;
        const res = await apiServerClient.fetch('/ads/google/audience-modifier', {
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
      }
      // 13. Atualizar Redes da Campanha
      else if (actionType === 'update_networks') {
        const { includeSearchPartners, targetContentNetwork } = payload;
        const res = await apiServerClient.fetch('/ads/google/network-update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaignId: selectedCampaignId, includeSearchPartners, targetContentNetwork })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
        } else {
          toast.error(json.error || 'Erro ao atualizar configurações de rede.');
        }
      }
      // 14. Atualizar DSA
      else if (actionType === 'update_dsa') {
        const { action, url, category } = payload;
        const res = await apiServerClient.fetch('/ads/google/dsa-update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, url, category })
        });
        const json = await res.json();
        if (json.success) {
          toast.success(json.message);
          setData(prev => ({ ...prev, dsaConfig: json.dsaConfig }));
          setNewExcludedUrl('');
          setNewTargetCategory('');
        } else {
          toast.error(json.error || 'Erro ao atualizar DSA.');
        }
      }
    } catch (e) {
      toast.error('Erro de comunicação com o servidor: ' + e.message);
    }
  };

  // Sincronização manual com Google Ads API
  const handleManualSync = async () => {
    try {
      setRefreshing(true);
      const res = await apiServerClient.fetch('/ads/google/refresh', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        toast.success('Métricas e Segmentações do Google Ads sincronizadas com a API Oficial!');
        fetchAdsData(selectedTimeRange);
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
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Carregando central de comando do Google Ads...</p>
      </div>
    );
  }

  if (!data) return null;

  // Totalizadores
  const totalKeywords = (data.keywords || []).reduce((acc, k) => {
    acc.impressions += k.impressions || 0;
    acc.clicks += k.clicks || 0;
    acc.cost += k.cost || 0;
    acc.conversions += k.conversions || 0;
    return acc;
  }, { impressions: 0, clicks: 0, cost: 0, conversions: 0 });
  const totalKeywordsCtr = totalKeywords.impressions > 0 ? ((totalKeywords.clicks / totalKeywords.impressions) * 100).toFixed(2) : 0;
  const totalKeywordsCpc = totalKeywords.clicks > 0 ? (totalKeywords.cost / totalKeywords.clicks).toFixed(2) : 0;

  const totalSearchTerms = (data.searchTerms || []).reduce((acc, st) => {
    acc.impressions += st.impressions || 0;
    acc.clicks += st.clicks || 0;
    acc.cost += st.cost || 0;
    acc.conversions += st.conversions || 0;
    return acc;
  }, { impressions: 0, clicks: 0, cost: 0, conversions: 0 });
  const totalSearchTermsCtr = totalSearchTerms.impressions > 0 ? ((totalSearchTerms.clicks / totalSearchTerms.impressions) * 100).toFixed(2) : 0;
  const totalSearchTermsCpc = totalSearchTerms.clicks > 0 ? (totalSearchTerms.cost / totalSearchTerms.clicks).toFixed(2) : 0;

  const totalAge = (data.ageDemographics || []).reduce((acc, a) => {
    acc.impressions += a.impressions || 0;
    acc.clicks += a.clicks || 0;
    acc.cost += a.cost || 0;
    acc.conversions += a.conversions || 0;
    return acc;
  }, { impressions: 0, clicks: 0, cost: 0, conversions: 0 });

  const totalGender = (data.genderDemographics || []).reduce((acc, g) => {
    acc.impressions += g.impressions || 0;
    acc.clicks += g.clicks || 0;
    acc.cost += g.cost || 0;
    acc.conversions += g.conversions || 0;
    return acc;
  }, { impressions: 0, clicks: 0, cost: 0, conversions: 0 });

  const totalIncome = (data.householdIncome || []).reduce((acc, i) => {
    acc.impressions += i.impressions || 0;
    acc.clicks += i.clicks || 0;
    acc.cost += i.cost || 0;
    acc.conversions += i.conversions || 0;
    return acc;
  }, { impressions: 0, clicks: 0, cost: 0, conversions: 0 });

  const totalLoc = (data.locations || []).reduce((acc, l) => {
    acc.impressions += l.impressions || 0;
    acc.clicks += l.clicks || 0;
    acc.cost += l.cost || 0;
    return acc;
  }, { impressions: 0, clicks: 0, cost: 0 });

  const totalDev = (data.devices || []).reduce((acc, d) => {
    acc.impressions += d.impressions || 0;
    acc.clicks += d.clicks || 0;
    acc.cost += d.cost || 0;
    return acc;
  }, { impressions: 0, clicks: 0, cost: 0 });

  return (
    <div className="space-y-7 text-zinc-900 dark:text-zinc-100">
      {/* Top Banner da Conexão & Seletor de Campanhas */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm dark:shadow-lg backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-4">
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
                Central Executiva de Segmentações de Pesquisa (Search Engine Ads) • Modo Operacional Ativo
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
                  {c.name} ({c.channel})
                </option>
              ))}
            </select>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={handleManualSync}
            disabled={refreshing}
            className="text-xs border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 gap-2 h-9"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#c59b5f]' : ''}`} />
            <span>Sincronizar Google Ads</span>
          </Button>
        </div>
      </div>

      {/* Scorecards de KPIs Principais da Campanha */}
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
              <span className="text-[10px] text-blue-600 dark:text-blue-400/80 block font-mono">100% tráfego intencional</span>
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
              <span className="text-[10px] text-zinc-500 block">Exibições no Google Search</span>
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
              <span className="text-[10px] text-amber-600 dark:text-amber-300/80 block">Rastreamento pendente tag</span>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navegação entre as 5 Macro-Segmentações de Pesquisa */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('gatilhos')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'gatilhos'
              ? 'bg-[#c59b5f] text-black shadow-md'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>A. Gatilhos de Busca (Keywords, Termos & Negativas)</span>
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
          <span>B & C. Demografia Básica & Renda Familiar</span>
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
          <span>D. Localização Geográfica, Horários & Idiomas</span>
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
          <span>E. Tecnologia, Redes & Dispositivos</span>
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
          <span>Públicos-Alvo & DSA</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SEÇÃO 1: GATILHOS DE BUSCA (Palavras-chave, Termos Reais e Negativas) */}
      {/* ========================================================================= */}
      {activeSubTab === 'gatilhos' && (
        <div className="space-y-8">
          {/* TABELA 1: PALAVRAS-CHAVE ATIVAS */}
          <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
            <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                    <Search className="w-4 h-4 text-[#c59b5f]" />
                    Palavras-chave Configuradas (Keywords)
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Edite correspondência, lance de CPC máximo e status diretamente. Cada alteração sincroniza com a conta.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs text-zinc-600 dark:text-zinc-300 font-mono bg-zinc-100 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700">
                    {data.keywords.length} Palavras Ativas
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => setShowAddKeywordForm(!showAddKeywordForm)}
                    className="h-8 px-3 text-xs bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Nova Palavra
                  </Button>
                </div>
              </div>

              {/* Formulário Retrátil para Adicionar Nova Palavra-chave */}
              <AnimatePresence>
                {showAddKeywordForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden pt-3"
                  >
                    <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-wrap items-center gap-3">
                      <div className="flex-1 min-w-[200px]">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Palavra ou Frase</span>
                        <Input
                          placeholder="ex: fornecedores lingerie atacado"
                          value={newKeywordText}
                          onChange={(e) => setNewKeywordText(e.target.value)}
                          className="h-8 text-xs bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Correspondência</span>
                        <select
                          value={newKeywordMatchType}
                          onChange={(e) => setNewKeywordMatchType(e.target.value)}
                          className="h-8 text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md px-2 text-zinc-800 dark:text-zinc-200 focus:outline-none"
                        >
                          <option value="PHRASE">Frase " "</option>
                          <option value="EXACT">Exata [ ]</option>
                          <option value="BROAD">Ampla</option>
                        </select>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">CPC Máximo (R$)</span>
                        <Input
                          type="number"
                          step="0.10"
                          value={newKeywordMaxCpc}
                          onChange={(e) => setNewKeywordMaxCpc(e.target.value)}
                          className="h-8 w-24 text-xs font-mono bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
                        />
                      </div>
                      <div className="pt-4 flex items-center gap-2">
                        <Button
                          size="sm"
                          disabled={!newKeywordText.trim()}
                          onClick={() => promptAction(
                            'Adicionar Nova Palavra-chave',
                            `Você está prestes a adicionar a palavra-chave "${newKeywordText.trim()}" com correspondência de ${newKeywordMatchType} e lance máximo de R$ ${newKeywordMaxCpc} na campanha.`,
                            'add_keyword',
                            { text: newKeywordText.trim(), matchType: newKeywordMatchType, maxCpc: newKeywordMaxCpc },
                            'Cadastrar no Google'
                          )}
                          className="h-8 px-4 text-xs bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold"
                        >
                          Salvar Palavra
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setShowAddKeywordForm(false)}
                          className="h-8 text-xs text-zinc-500"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardHeader>

            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Palavra-chave</th>
                    <th className="py-3 px-3">Correspondência</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">CPC Máx</th>
                    <th className="py-3 px-3 text-right">Impressões</th>
                    <th className="py-3 px-3 text-right">Cliques</th>
                    <th className="py-3 px-3 text-right">CTR</th>
                    <th className="py-3 px-3 text-right">CPC Médio</th>
                    <th className="py-3 px-3 text-right">Custo Total</th>
                    <th className="py-3 px-4 text-center">Salvar / Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                  {data.keywords.map((kw) => {
                    const localState = editingKeywords[kw.id] || { matchType: kw.matchType, maxCpc: kw.maxCpc || kw.avgCpc, status: kw.status };
                    const isEnabled = localState.status === 'ENABLED';
                    const hasChanges = localState.matchType !== kw.matchType || Number(localState.maxCpc) !== Number(kw.maxCpc || kw.avgCpc);

                    return (
                      <tr key={kw.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                          <span className="text-[#c59b5f]">●</span>
                          <span>{kw.text}</span>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={localState.matchType}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditingKeywords(prev => ({ ...prev, [kw.id]: { ...localState, matchType: val } }));
                            }}
                            className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded px-2 py-1 text-[11px] font-sans text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#c59b5f]"
                          >
                            <option value="PHRASE">Frase " "</option>
                            <option value="EXACT">Exata [ ]</option>
                            <option value="BROAD">Ampla</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 font-sans">
                          {isEnabled ? (
                            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Ativa
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-zinc-500 text-[10px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" /> Pausada
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="inline-flex items-center justify-end gap-1">
                            <span className="text-zinc-500 text-[10px]">R$</span>
                            <input
                              type="number"
                              step="0.10"
                              value={localState.maxCpc}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditingKeywords(prev => ({ ...prev, [kw.id]: { ...localState, maxCpc: val } }));
                              }}
                              className="w-16 h-6 text-right px-1 text-[11px] font-mono bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#c59b5f]"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right text-zinc-600 dark:text-zinc-300">{formatNumber(kw.impressions)}</td>
                        <td className="py-3 px-3 text-right text-zinc-900 dark:text-zinc-100 font-bold">{formatNumber(kw.clicks)}</td>
                        <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400 font-semibold">{kw.ctr}%</td>
                        <td className="py-3 px-3 text-right text-zinc-600 dark:text-zinc-300">{formatCurrency(kw.avgCpc)}</td>
                        <td className="py-3 px-3 text-right text-[#c59b5f] font-bold">{formatCurrency(kw.cost)}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {hasChanges && (
                              <Button
                                size="sm"
                                onClick={() => promptAction(
                                  'Salvar Alterações da Palavra-chave',
                                  `Deseja atualizar a palavra-chave "${kw.text}" para correspondência ${localState.matchType} e CPC Máximo de R$ ${localState.maxCpc}?`,
                                  'update_keyword',
                                  { keywordId: kw.id, matchType: localState.matchType, maxCpc: localState.maxCpc, status: localState.status, text: kw.text },
                                  'Salvar na Conta'
                                )}
                                className="h-7 px-2.5 text-[10px] bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded-lg shadow-sm"
                              >
                                <Save className="w-3 h-3 mr-1" /> Salvar
                              </Button>
                            )}

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => promptAction(
                                isEnabled ? 'Pausar Palavra-chave' : 'Ativar Palavra-chave',
                                `Você deseja ${isEnabled ? 'pausar' : 'reativar'} o termo "${kw.text}"? Ela deixará de gastar na campanha imediatamente.`,
                                'update_keyword',
                                { keywordId: kw.id, matchType: localState.matchType, maxCpc: localState.maxCpc, status: isEnabled ? 'PAUSED' : 'ENABLED', text: kw.text },
                                isEnabled ? 'Sim, Pausar' : 'Sim, Ativar'
                              )}
                              className={`h-7 px-2.5 text-[10px] font-bold rounded-lg border ${
                                isEnabled 
                                  ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 border-amber-500/30'
                                  : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/30'
                              }`}
                            >
                              {isEnabled ? (
                                <>
                                  <PauseCircle className="w-3 h-3 mr-1" /> Pausar
                                </>
                              ) : (
                                <>
                                  <PlayCircle className="w-3 h-3 mr-1" /> Reativar
                                </>
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* Linha de Totalização Obrigatória */}
                <tfoot className="bg-zinc-100 dark:bg-zinc-950 font-mono font-bold text-xs border-t-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
                  <tr>
                    <td className="py-3.5 px-4 font-sans uppercase tracking-wider text-[#c59b5f]">TOTAL CONSOLIDADO</td>
                    <td className="py-3.5 px-3 font-sans text-zinc-500">-</td>
                    <td className="py-3.5 px-3 font-sans text-emerald-600 dark:text-emerald-400">Ativas</td>
                    <td className="py-3.5 px-3 text-right font-sans text-zinc-500">-</td>
                    <td className="py-3.5 px-3 text-right">{formatNumber(totalKeywords.impressions)}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">{formatNumber(totalKeywords.clicks)}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">{totalKeywordsCtr}%</td>
                    <td className="py-3.5 px-3 text-right">{formatCurrency(totalKeywordsCpc)}</td>
                    <td className="py-3.5 px-3 text-right text-[#c59b5f] text-sm">{formatCurrency(totalKeywords.cost)}</td>
                    <td className="py-3.5 px-4 text-center font-sans text-[10px] text-zinc-500">100% Auditado</td>
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>

          {/* TABELA 2: TERMOS DE BUSCA REAIS DIGITADOS PELOS CLIENTES (SEARCH TERMS VIEW) */}
          <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
            <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                    <MousePointerClick className="w-4 h-4 text-blue-500" />
                    Termos de Busca Reais dos Usuários (Search Terms View)
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    O que os clientes digitaram exatamente no Google. Bloqueie termos de concorrentes ou promova termos lucrativos com 1 clique.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-500">Destaque:</span>
                  <Badge variant="outline" className="text-[10px] bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
                    Vazamento em Lojas Físicas / Concorrentes
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Termo Pesquisado no Google</th>
                    <th className="py-3 px-3">Palavra Acionada</th>
                    <th className="py-3 px-3 text-right">Impressões</th>
                    <th className="py-3 px-3 text-right">Cliques</th>
                    <th className="py-3 px-3 text-right">CTR</th>
                    <th className="py-3 px-3 text-right">CPC Médio</th>
                    <th className="py-3 px-3 text-right">Custo Gasto</th>
                    <th className="py-3 px-4 text-center">Ações Operacionais</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                  {data.searchTerms.map((st) => (
                    <tr key={st.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        {st.isCompetitorOrIrrelevant ? (
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-bold">
                            CONCORRENTE / VAZAMENTO
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold">
                            QUALIFICADO B2B
                          </span>
                        )}
                        <span>{st.searchTerm}</span>
                      </td>
                      <td className="py-3 px-3 font-sans text-zinc-500 dark:text-zinc-400 truncate max-w-[200px]" title={st.keywordMatched}>
                        "{st.keywordMatched}"
                      </td>
                      <td className="py-3 px-3 text-right text-zinc-600 dark:text-zinc-300">{formatNumber(st.impressions)}</td>
                      <td className="py-3 px-3 text-right text-zinc-900 dark:text-zinc-100 font-bold">{formatNumber(st.clicks)}</td>
                      <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400">{st.ctr}%</td>
                      <td className="py-3 px-3 text-right text-zinc-600 dark:text-zinc-300">{formatCurrency(st.avgCpc)}</td>
                      <td className="py-3 px-3 text-right text-rose-600 dark:text-rose-400 font-bold">{formatCurrency(st.cost)}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Ação 1: Promover para Palavra-chave Oficial */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => promptAction(
                              'Promover para Palavra-chave Oficial',
                              `Deseja transformar o termo de busca "${st.searchTerm}" em uma palavra-chave oficial da campanha para controlar seus lances e anúncios?`,
                              'promote_search_term',
                              { searchTerm: st.searchTerm, matchType: 'PHRASE', maxCpc: 2.20 },
                              'Promover Palavra'
                            )}
                            className="h-7 px-2 text-[10px] font-bold rounded-lg border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                          >
                            <Sparkles className="w-3 h-3 mr-1" /> + Palavra
                          </Button>

                          {/* Ação 2: Negativar Termo Vazador */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => promptAction(
                              'Negativar Termo de Busca',
                              `Você está prestes a bloquear o termo "${st.searchTerm}". Ele entrará na lista de palavras-chave negativas da campanha e não consumirá mais orçamento.`,
                              'add_negative',
                              { text: st.searchTerm, matchType: 'PHRASE' },
                              'Confirmar e Negativar'
                            )}
                            className="h-7 px-2 text-[10px] font-bold rounded-lg border-rose-500/40 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10"
                          >
                            <Plus className="w-3 h-3 mr-1" /> Negativar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-zinc-100 dark:bg-zinc-950 font-mono font-bold text-xs border-t-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
                  <tr>
                    <td className="py-3.5 px-4 font-sans uppercase tracking-wider text-blue-600 dark:text-blue-400">TOTAL DOS TERMOS EXIBIDOS</td>
                    <td className="py-3.5 px-3 font-sans text-zinc-500">-</td>
                    <td className="py-3.5 px-3 text-right">{formatNumber(totalSearchTerms.impressions)}</td>
                    <td className="py-3.5 px-3 text-right text-blue-600 dark:text-blue-400">{formatNumber(totalSearchTerms.clicks)}</td>
                    <td className="py-3.5 px-3 text-right text-blue-600 dark:text-blue-400">{totalSearchTermsCtr}%</td>
                    <td className="py-3.5 px-3 text-right">{formatCurrency(totalSearchTermsCpc)}</td>
                    <td className="py-3.5 px-3 text-right text-rose-600 dark:text-rose-400 text-sm">{formatCurrency(totalSearchTerms.cost)}</td>
                    <td className="py-3.5 px-4 text-center font-sans text-[10px] text-zinc-500">Proteção Ativa</td>
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>

          {/* TABELA 3: PALAVRAS-CHAVE NEGATIVAS (BLOQUEIOS) */}
          <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
            <CardHeader className="pb-4 border-b border-zinc-200 dark:border-zinc-800/80">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    Palavras-chave Negativas da Campanha (Negative Keywords)
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Termos explicitamente proibidos de disparar anúncios. Altere a correspondência ou exclua com 1 clique.
                  </CardDescription>
                </div>

                {/* Formulário Rápido para Adicionar Nova Negativa */}
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Adicionar termo negativo..."
                    value={newNegativeText}
                    onChange={(e) => setNewNegativeText(e.target.value)}
                    className="h-8 text-xs bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 w-[200px] text-zinc-900 dark:text-zinc-200"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newNegativeText.trim()) {
                        promptAction(
                          'Adicionar Palavra-chave Negativa',
                          `Deseja adicionar o termo "${newNegativeText.trim()}" à lista de bloqueio da campanha?`,
                          'add_negative',
                          { text: newNegativeText.trim(), matchType: newNegativeMatchType },
                          'Adicionar Bloqueio'
                        );
                      }
                    }}
                  />
                  <select
                    value={newNegativeMatchType}
                    onChange={(e) => setNewNegativeMatchType(e.target.value)}
                    className="h-8 text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-md px-2 text-zinc-800 dark:text-zinc-300 focus:outline-none"
                  >
                    <option value="PHRASE">Frase " "</option>
                    <option value="BROAD">Ampla</option>
                    <option value="EXACT">Exata [ ]</option>
                  </select>
                  <Button
                    size="sm"
                    disabled={!newNegativeText.trim()}
                    onClick={() => promptAction(
                      'Adicionar Palavra-chave Negativa',
                      `Deseja adicionar o termo "${newNegativeText.trim()}" à lista de bloqueio da campanha?`,
                      'add_negative',
                      { text: newNegativeText.trim(), matchType: newNegativeMatchType },
                      'Adicionar Bloqueio'
                    )}
                    className="h-8 px-3 text-xs bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Bloquear
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Termo Bloqueado</th>
                    <th className="py-3 px-3">Correspondência</th>
                    <th className="py-3 px-3">Nível de Aplicação</th>
                    <th className="py-3 px-3">Data de Bloqueio</th>
                    <th className="py-3 px-4 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                  {data.negativeKeywords.map((neg) => (
                    <tr key={neg.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="py-2.5 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span className="line-through text-rose-500/80 dark:text-rose-300/80">{neg.text}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <select
                          value={neg.matchType}
                          onChange={(e) => {
                            const newMatch = e.target.value;
                            promptAction(
                              'Alterar Correspondência da Negativa',
                              `Deseja mudar o termo negativo "${neg.text}" para correspondência ${newMatch}?`,
                              'add_negative',
                              { text: neg.text, matchType: newMatch },
                              'Salvar Correspondência'
                            );
                          }}
                          className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded px-1.5 py-0.5 text-[10px] font-sans text-zinc-800 dark:text-zinc-300 focus:outline-none"
                        >
                          <option value="PHRASE">Frase</option>
                          <option value="EXACT">Exata</option>
                          <option value="BROAD">Ampla</option>
                        </select>
                      </td>
                      <td className="py-2.5 px-3 font-sans text-zinc-500 dark:text-zinc-400">{neg.level}</td>
                      <td className="py-2.5 px-3 text-zinc-500">{neg.dateAdded || 'Ativo'}</td>
                      <td className="py-2.5 px-4 text-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => promptAction(
                            'Remover Palavra Negativa',
                            `Tem certeza que deseja desbloquear o termo "${neg.text}"? O Google voltará a permitir exibições caso alguém busque por ele.`,
                            'remove_negative',
                            { id: neg.id, text: neg.text },
                            'Remover Bloqueio'
                          )}
                          className="h-7 w-7 p-0 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-zinc-100 dark:bg-zinc-950 font-mono font-bold text-xs border-t-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
                  <tr>
                    <td className="py-3 px-4 font-sans text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                      TOTAL: {data.negativeKeywords.length} TERMOS BLOQUEADOS
                    </td>
                    <td colSpan={3} className="py-3 px-3 font-sans text-zinc-500 text-[10px]">
                      Protege o orçamento diário de pesquisas irrelevantes e concorrentes locais
                    </td>
                    <td className="py-3 px-4 text-center font-sans text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">100% Protegido</td>
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEÇÃO 2: DEMOGRAFIA BÁSICA & RENDA FAMILIAR */}
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
                Defina ajustes de lances (%) ou exclua faixas etárias específicas diretamente na conta.
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
                            <Badge variant="outline" className={`text-[10px] ${localGen.status === 'EXCLUDED' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'}`}>
                              {localGen.status === 'EXCLUDED' ? 'Excluído' : 'Ativo'}
                            </Badge>
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
                            {hasChanged && (
                              <Button
                                size="sm"
                                onClick={() => promptAction(
                                  'Salvar Lance de Gênero',
                                  `Deseja atualizar o lance para ${gen.gender} para ${localGen.bidModifier}%?`,
                                  'update_gender',
                                  { gender: gen.gender, status: localGen.status, bidModifier: localGen.bidModifier },
                                  'Salvar Lance'
                                )}
                                className="h-7 px-2.5 text-[10px] bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded-lg shadow-sm"
                              >
                                Salvar
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-zinc-100 dark:bg-zinc-950 font-mono font-bold text-xs border-t-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
                    <tr>
                      <td className="py-3 px-4 font-sans uppercase text-[#c59b5f]">TOTAL</td>
                      <td colSpan={2} className="py-3 px-3 text-zinc-500 font-sans">-</td>
                      <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400">{formatNumber(totalGender.clicks)}</td>
                      <td className="py-3 px-3 text-right text-[#c59b5f]">{formatCurrency(totalGender.cost)}</td>
                      <td className="py-3 px-4 text-center font-sans text-[10px] text-zinc-500">Pronto</td>
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
                    {data.householdIncome.map((inc, idx) => {
                      const localInc = editingIncomeModifier[inc.bracket] || { bidModifier: inc.bidModifier || 0, status: inc.status };
                      const hasChanged = localInc.bidModifier !== (inc.bidModifier || 0);

                      return (
                        <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                          <td className="py-2.5 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                            {inc.bracket}
                          </td>
                          <td className="py-2.5 px-3 text-center">
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
                                    [inc.bracket]: { ...localInc, bidModifier: val, status: val === -100 ? 'EXCLUDED' : 'ENABLED' }
                                  }));
                                }}
                                className="w-14 h-6 text-center text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#c59b5f]"
                              />
                              <span className="text-zinc-500 text-xs">%</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-right text-zinc-900 dark:text-zinc-100 font-bold">{formatNumber(inc.clicks)}</td>
                          <td className="py-2.5 px-3 text-right text-[#c59b5f] font-bold">{formatCurrency(inc.cost)}</td>
                          <td className="py-2.5 px-4 text-center">
                            {hasChanged && (
                              <Button
                                size="sm"
                                onClick={() => promptAction(
                                  'Salvar Ajuste de Renda',
                                  `Deseja atualizar o lance para a faixa "${inc.bracket}" para ${localInc.bidModifier}%?`,
                                  'update_income',
                                  { bracket: inc.bracket, status: localInc.status, bidModifier: localInc.bidModifier },
                                  'Salvar Lance'
                                )}
                                className="h-6 px-2 text-[10px] bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded shadow-sm"
                              >
                                Salvar
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-zinc-100 dark:bg-zinc-950 font-mono font-bold text-xs border-t-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
                    <tr>
                      <td className="py-3 px-4 font-sans uppercase text-[#c59b5f]">TOTAL</td>
                      <td className="py-3 px-3 text-zinc-500 font-sans text-center">-</td>
                      <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400">{formatNumber(totalIncome.clicks)}</td>
                      <td className="py-3 px-3 text-right text-[#c59b5f]">{formatCurrency(totalIncome.cost)}</td>
                      <td className="py-3 px-4 text-center font-sans text-[10px] text-zinc-500">Ativo</td>
                    </tr>
                  </tfoot>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEÇÃO 3: LOCALIZAÇÃO GEOGRÁFICA, PROGRAMAÇÃO & IDIOMAS */}
      {/* ========================================================================= */}
      {activeSubTab === 'geografia' && (
        <div className="space-y-8">
          {/* TABELA: LOCALIZAÇÕES GEOGRÁFICAS ALVO */}
          <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
            <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                    <MapPin className="w-4 h-4 text-[#c59b5f]" />
                    Segmentação Geográfica (Locais e Cidades Alvo)
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                    Defina ajustes de lance em regiões com frete competitivo ou adicione novas praças à campanha.
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  onClick={() => setShowAddLocationForm(!showAddLocationForm)}
                  className="h-8 px-3 text-xs bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Adicionar Local
                </Button>
              </div>

              {/* Formulário Retrátil para Adicionar Novo Local */}
              <AnimatePresence>
                {showAddLocationForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden pt-3"
                  >
                    <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-wrap items-center gap-3">
                      <div className="flex-1 min-w-[200px]">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Nome do Estado ou Cidade</span>
                        <Input
                          placeholder="ex: Espírito Santo (Estado) ou Florianópolis"
                          value={newLocationName}
                          onChange={(e) => setNewLocationName(e.target.value)}
                          className="h-8 text-xs bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Tipo</span>
                        <select
                          value={newLocationType}
                          onChange={(e) => setNewLocationType(e.target.value)}
                          className="h-8 text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md px-2 text-zinc-800 dark:text-zinc-200 focus:outline-none"
                        >
                          <option value="Estado">Estado</option>
                          <option value="Capital">Capital</option>
                          <option value="Cidade">Cidade</option>
                        </select>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Ajuste de Lance (%)</span>
                        <Input
                          type="number"
                          value={newLocationModifier}
                          onChange={(e) => setNewLocationModifier(e.target.value)}
                          className="h-8 w-20 text-xs font-mono bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
                        />
                      </div>
                      <div className="pt-4 flex items-center gap-2">
                        <Button
                          size="sm"
                          disabled={!newLocationName.trim()}
                          onClick={() => promptAction(
                            'Adicionar Novo Local Geográfico',
                            `Deseja adicionar "${newLocationName.trim()}" à segmentação da campanha com ajuste de lance de ${newLocationModifier}%?`,
                            'update_location',
                            { name: newLocationName.trim(), type: newLocationType, bidModifier: newLocationModifier },
                            'Cadastrar Local'
                          )}
                          className="h-8 px-4 text-xs bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold"
                        >
                          Salvar Local
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setShowAddLocationForm(false)}
                          className="h-8 text-xs text-zinc-500"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Local Geográfico</th>
                    <th className="py-3 px-3">Tipo</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-center">Ajuste de Lance (%)</th>
                    <th className="py-3 px-3 text-right">Impressões</th>
                    <th className="py-3 px-3 text-right">Cliques</th>
                    <th className="py-3 px-3 text-right">CTR</th>
                    <th className="py-3 px-3 text-right">CPC Médio</th>
                    <th className="py-3 px-3 text-right">Custo Total</th>
                    <th className="py-3 px-4 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                  {data.locations.map((loc) => {
                    const localMod = editingLocationModifier[loc.id] !== undefined ? editingLocationModifier[loc.id] : (loc.bidModifier || 0);
                    const hasChanged = localMod !== (loc.bidModifier || 0);

                    return (
                      <tr key={loc.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#c59b5f]" />
                          <span>{loc.name}</span>
                        </td>
                        <td className="py-3 px-3">
                          <Badge variant="outline" className="text-[10px] font-sans bg-zinc-100 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700">
                            {loc.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 font-sans">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">● Ativo</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center justify-center gap-1">
                            <input
                              type="number"
                              min="-100"
                              max="900"
                              step="5"
                              value={localMod}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setEditingLocationModifier(prev => ({ ...prev, [loc.id]: val }));
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
                          {hasChanged && (
                            <Button
                              size="sm"
                              onClick={() => promptAction(
                                'Salvar Lance de Localização',
                                `Deseja atualizar o lance para "${loc.name}" para ${localMod}%?`,
                                'update_location',
                                { id: loc.id, bidModifier: localMod },
                                'Salvar Lance'
                              )}
                              className="h-7 px-2.5 text-[10px] bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded-lg shadow-sm"
                            >
                              Salvar
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-zinc-100 dark:bg-zinc-950 font-mono font-bold text-xs border-t-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
                  <tr>
                    <td className="py-3.5 px-4 font-sans uppercase tracking-wider text-[#c59b5f]">TOTAL BRASIL (ESTADOS & CAPITAIS)</td>
                    <td className="py-3.5 px-3 font-sans text-zinc-500">-</td>
                    <td className="py-3.5 px-3 font-sans text-emerald-600 dark:text-emerald-400">Ativos</td>
                    <td className="py-3.5 px-4 text-center font-sans text-zinc-500">-</td>
                    <td className="py-3.5 px-3 text-right">{formatNumber(totalLoc.impressions)}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">{formatNumber(totalLoc.clicks)}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">
                      {totalLoc.impressions > 0 ? ((totalLoc.clicks / totalLoc.impressions) * 100).toFixed(2) : 0}%
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {formatCurrency(totalLoc.clicks > 0 ? totalLoc.cost / totalLoc.clicks : 0)}
                    </td>
                    <td className="py-3.5 px-3 text-right text-[#c59b5f] text-sm">{formatCurrency(totalLoc.cost)}</td>
                    <td className="py-3.5 px-4 text-center font-sans text-[10px] text-zinc-500">100% Auditado</td>
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>

          {/* PROGRAMAÇÃO DE HORÁRIOS & IDIOMAS LADO A LADO */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* PROGRAMAÇÃO DE ANÚNCIOS */}
            <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
              <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
                <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                  <Clock className="w-4 h-4 text-[#c59b5f]" />
                  Programação de Anúncios (Ad Schedule)
                </CardTitle>
                <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                  Altere as janelas horárias de exibição ou lance adicional em horários nobres de compra.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                  <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Dia da Semana</th>
                      <th className="py-3 px-3">Faixas de Horários</th>
                      <th className="py-3 px-3 text-center">Lance (%)</th>
                      <th className="py-3 px-4 text-center">Salvar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                    {data.adSchedule.map((sched, idx) => {
                      const localSched = editingScheduleModifier[sched.day] || { bidModifier: sched.bidModifier || 0, timeSlots: sched.timeSlots };
                      const hasChanged = localSched.bidModifier !== (sched.bidModifier || 0) || localSched.timeSlots !== sched.timeSlots;

                      return (
                        <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                          <td className="py-2.5 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">{sched.day}</td>
                          <td className="py-2.5 px-3 font-sans">
                            <input
                              type="text"
                              value={localSched.timeSlots}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditingScheduleModifier(prev => ({ ...prev, [sched.day]: { ...localSched, timeSlots: val } }));
                              }}
                              className="w-full h-6 px-1.5 text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-800 dark:text-zinc-200 focus:outline-none"
                            />
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <div className="inline-flex items-center justify-center gap-1">
                              <input
                                type="number"
                                min="-100"
                                max="900"
                                step="5"
                                value={localSched.bidModifier}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setEditingScheduleModifier(prev => ({ ...prev, [sched.day]: { ...localSched, bidModifier: val } }));
                                }}
                                className="w-14 h-6 text-center text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none"
                              />
                              <span className="text-zinc-500 text-xs">%</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-4 text-center">
                            {hasChanged && (
                              <Button
                                size="sm"
                                onClick={() => promptAction(
                                  'Salvar Horário de Anúncios',
                                  `Deseja atualizar a programação de ${sched.day} com as janelas "${localSched.timeSlots}" e lance de ${localSched.bidModifier}%?`,
                                  'update_schedule',
                                  { day: sched.day, timeSlots: localSched.timeSlots, bidModifier: localSched.bidModifier },
                                  'Salvar Horário'
                                )}
                                className="h-6 px-2 text-[10px] bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded shadow-sm"
                              >
                                Salvar
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* IDIOMAS */}
            <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
              <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
                <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                  <Globe className="w-4 h-4 text-[#c59b5f]" />
                  Segmentação por Idiomas (Languages)
                </CardTitle>
                <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                  Configuração de idioma do navegador e conta do usuário.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                  <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Idioma</th>
                      <th className="py-3 px-3">Código</th>
                      <th className="py-3 px-3">Escopo</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                    {data.languages.map((lang, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-[#c59b5f]" />
                          <span>{lang.name}</span>
                          {lang.isDefault && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#c59b5f]/20 text-[#c59b5f] border border-[#c59b5f]/30 font-bold">
                              PRINCIPAL
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-zinc-500 dark:text-zinc-400 uppercase">{lang.code}</td>
                        <td className="py-3 px-3 font-sans text-zinc-600 dark:text-zinc-300">
                          {lang.isDefault ? 'Nativo do Brasil' : 'Dispositivos configurados em outros idiomas'}
                        </td>
                        <td className="py-3 px-4 text-center font-sans">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">● Ativo</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEÇÃO 4: TECNOLOGIA, REDES & AJUSTES DE DISPOSITIVOS */}
      {/* ========================================================================= */}
      {activeSubTab === 'dispositivos' && (
        <div className="space-y-8">
          <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
            <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <Smartphone className="w-4 h-4 text-[#c59b5f]" />
                Segmentação de Dispositivos & Modificador de Lances (Devices)
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                Você pode aumentar ou reduzir lances para Mobile vs Desktop, ou excluir totalmente Tablets (-100%).
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Dispositivo</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Impressões</th>
                    <th className="py-3 px-3 text-right">Cliques</th>
                    <th className="py-3 px-3 text-right">CTR</th>
                    <th className="py-3 px-3 text-right">CPC Médio</th>
                    <th className="py-3 px-3 text-right">Custo Total</th>
                    <th className="py-3 px-3 text-right">Participação</th>
                    <th className="py-3 px-4 text-center">Ajuste de Lance (%)</th>
                    <th className="py-3 px-4 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                  {data.devices.map((dev) => {
                    const isTablet = dev.type === 'TABLET';
                    const isDesktop = dev.type === 'DESKTOP';
                    const isMobile = dev.type === 'MOBILE';
                    const currentMod = editingDeviceModifier[dev.type] !== undefined ? editingDeviceModifier[dev.type] : dev.bidModifier;

                    return (
                      <tr key={dev.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
                          {isMobile && <Smartphone className="w-4 h-4 text-blue-500" />}
                          {isDesktop && <Laptop className="w-4 h-4 text-[#c59b5f]" />}
                          {isTablet && <Tablet className="w-4 h-4 text-zinc-400" />}
                          <span>{dev.device}</span>
                        </td>
                        <td className="py-3.5 px-3 font-sans">
                          {dev.status === 'EXCLUDED' || currentMod === -100 ? (
                            <Badge variant="outline" className="text-[10px] bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">
                              Bloqueado (-100%)
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                              Ativo
                            </Badge>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-right text-zinc-600 dark:text-zinc-300">{formatNumber(dev.impressions)}</td>
                        <td className="py-3.5 px-3 text-right text-zinc-900 dark:text-zinc-100 font-bold">{formatNumber(dev.clicks)}</td>
                        <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">{dev.ctr}%</td>
                        <td className="py-3.5 px-3 text-right text-zinc-600 dark:text-zinc-300">{formatCurrency(dev.avgCpc)}</td>
                        <td className="py-3.5 px-3 text-right text-[#c59b5f] font-bold">{formatCurrency(dev.cost)}</td>
                        <td className="py-3.5 px-3 text-right text-zinc-700 dark:text-zinc-200 font-semibold">{dev.share}%</td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="inline-flex items-center justify-center gap-1.5">
                            <input
                              type="number"
                              min="-100"
                              max="900"
                              step="5"
                              value={currentMod}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setEditingDeviceModifier(prev => ({ ...prev, [dev.type]: val }));
                              }}
                              className="w-16 h-7 text-center text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-md font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#c59b5f]"
                            />
                            <span className="text-zinc-500 text-xs">%</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <Button
                            size="sm"
                            disabled={currentMod === dev.bidModifier}
                            onClick={() => promptAction(
                              'Alterar Ajuste de Lance de Dispositivo',
                              `Deseja atualizar o lance para ${dev.device} para ${currentMod}%? Lances negativos reduzem o valor máximo pago pelo clique; -100% exclui o dispositivo.`,
                              'device_modifier',
                              { deviceType: dev.type, bidModifier: currentMod },
                              'Salvar Lance'
                            )}
                            className="h-7 px-3 text-[10px] bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded-lg disabled:opacity-30"
                          >
                            Salvar
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-zinc-100 dark:bg-zinc-950 font-mono font-bold text-xs border-t-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
                  <tr>
                    <td className="py-3.5 px-4 font-sans uppercase tracking-wider text-[#c59b5f]">TOTAL DE TODOS OS DISPOSITIVOS</td>
                    <td className="py-3.5 px-3 font-sans text-zinc-500">-</td>
                    <td className="py-3.5 px-3 text-right">{formatNumber(totalDev.impressions)}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">{formatNumber(totalDev.clicks)}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">
                      {totalDev.impressions > 0 ? ((totalDev.clicks / totalDev.impressions) * 100).toFixed(2) : 0}%
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {formatCurrency(totalDev.clicks > 0 ? totalDev.cost / totalDev.clicks : 0)}
                    </td>
                    <td className="py-3.5 px-3 text-right text-[#c59b5f] text-sm">{formatCurrency(totalDev.cost)}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">100.00%</td>
                    <td colSpan={2} className="py-3.5 px-4 text-center font-sans text-[10px] text-zinc-500">
                      Smartphones representam 72,5% do investimento
                    </td>
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>

          {/* CARD DE CONFIGURAÇÕES DE REDE (SEARCH PARTNERS & DISPLAY) */}
          <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
            <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <Globe className="w-4 h-4 text-blue-500" />
                Configurações de Rede da Campanha de Pesquisa
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                Habilite ou desabilite redes de parceiros para evitar desperdício de verba fora do Google Search.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 block">Parceiros de Pesquisa do Google</span>
                    <span className="text-xs text-zinc-500 block">Exibir anúncios em outros sites de busca além do Google.com.br</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={searchPartners}
                    onChange={(e) => setSearchPartners(e.target.checked)}
                    className="w-5 h-5 accent-[#c59b5f] cursor-pointer"
                  />
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 block">Expansão para Rede de Display</span>
                    <span className="text-xs text-zinc-500 block">Exibir anúncios de texto em banners de sites parceiros (Recomendado: Desativado em B2B)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={displayNetwork}
                    onChange={(e) => setDisplayNetwork(e.target.checked)}
                    className="w-5 h-5 accent-[#c59b5f] cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  size="sm"
                  onClick={() => promptAction(
                    'Atualizar Redes da Campanha',
                    `Deseja atualizar as configurações de rede: Parceiros de Pesquisa = ${searchPartners ? 'Ativado' : 'Desativado'}, Rede de Display = ${displayNetwork ? 'Ativado' : 'Desativado'}?`,
                    'update_networks',
                    { includeSearchPartners: searchPartners, targetContentNetwork: displayNetwork },
                    'Salvar Redes'
                  )}
                  className="h-8 px-4 text-xs bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold"
                >
                  Salvar Configurações de Rede
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEÇÃO 5: PÚBLICOS-ALVO & DSA */}
      {/* ========================================================================= */}
      {activeSubTab === 'audiencias' && (
        <div className="space-y-8">
          {/* PÚBLICOS DE REMARKETING & IN-MARKET */}
          <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
            <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <Target className="w-4 h-4 text-[#c59b5f]" />
                Segmentos de Público-Alvo na Pesquisa (Audiences & In-Market)
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                Altere o modo de aplicação (Observação vs Segmentação) ou lance adicional para clientes recorrentes.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200 border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Segmento de Público</th>
                    <th className="py-3 px-3">Tipo de Público</th>
                    <th className="py-3 px-3">Modo de Exibição</th>
                    <th className="py-3 px-3">Tamanho Estimado</th>
                    <th className="py-3 px-4 text-center">Ajuste de Lance (%)</th>
                    <th className="py-3 px-4 text-center">Salvar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 font-mono text-[11px]">
                  {data.audiencesConfig.map((aud) => {
                    const localAud = editingAudienceModifier[aud.id] || { mode: aud.mode, bidModifier: aud.bidModifier };
                    const hasChanged = localAud.mode !== aud.mode || localAud.bidModifier !== aud.bidModifier;

                    return (
                      <tr key={aud.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#c59b5f]" />
                          <span>{aud.name}</span>
                        </td>
                        <td className="py-3 px-3">
                          <Badge variant="outline" className="text-[10px] font-sans bg-zinc-100 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700">
                            {aud.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 font-sans">
                          <select
                            value={localAud.mode}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditingAudienceModifier(prev => ({ ...prev, [aud.id]: { ...localAud, mode: val } }));
                            }}
                            className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded px-2 py-0.5 text-xs text-zinc-900 dark:text-zinc-100"
                          >
                            <option value="OBSERVATION">Observação (Sem Travar)</option>
                            <option value="TARGETING">Segmentação Restrita</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-zinc-600 dark:text-zinc-300">{aud.size}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center justify-center gap-1">
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">+</span>
                            <input
                              type="number"
                              min="0"
                              max="900"
                              step="5"
                              value={localAud.bidModifier}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setEditingAudienceModifier(prev => ({ ...prev, [aud.id]: { ...localAud, bidModifier: val } }));
                              }}
                              className="w-14 h-6 text-center text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none"
                            />
                            <span className="text-zinc-500 text-xs">%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {hasChanged && (
                            <Button
                              size="sm"
                              onClick={() => promptAction(
                                'Salvar Ajuste do Público',
                                `Deseja atualizar o público "${aud.name}" para Modo ${localAud.mode} e lance +${localAud.bidModifier}%?`,
                                'update_audience',
                                { id: aud.id, mode: localAud.mode, bidModifier: localAud.bidModifier },
                                'Salvar Público'
                              )}
                              className="h-6 px-2 text-[10px] bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold rounded shadow-sm"
                            >
                              Salvar
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* CARD DE DSA (ANÚNCIOS DINÂMICOS DE PESQUISA) */}
          <Card className="bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-md">
            <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                <Globe className="w-4 h-4 text-blue-500" />
                Anúncios Dinâmicos de Pesquisa (DSA - Dynamic Search Ads)
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                Controle exatamente quais URLs do site o Google pode e não pode indexar para criar títulos dinâmicos.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Domínio Indexado</span>
                  <div className="text-sm font-bold text-[#c59b5f] font-mono">{data.dsaConfig.domain}</div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">● Status: Ativo & Rastreando</span>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">Categorias Alvo</span>
                  <div className="flex flex-wrap gap-1">
                    {data.dsaConfig.targetedCategories.map((cat, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1">
                        {cat}
                        <button
                          onClick={() => promptAction(
                            'Remover Categoria DSA',
                            `Deseja remover a categoria "${cat}" do rastreamento dinâmico?`,
                            'update_dsa',
                            { action: 'remove_category', category: cat },
                            'Remover'
                          )}
                          className="hover:text-rose-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 pt-1">
                    <Input
                      placeholder="Nova categoria..."
                      value={newTargetCategory}
                      onChange={(e) => setNewTargetCategory(e.target.value)}
                      className="h-7 text-xs bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
                    />
                    <Button
                      size="sm"
                      disabled={!newTargetCategory.trim()}
                      onClick={() => promptAction(
                        'Adicionar Categoria DSA',
                        `Deseja adicionar a categoria "${newTargetCategory.trim()}" ao DSA?`,
                        'update_dsa',
                        { action: 'add_category', category: newTargetCategory.trim() },
                        'Adicionar'
                      )}
                      className="h-7 px-2 text-xs bg-[#c59b5f] text-black font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">URLs Excluídas (Anti-Vazamento)</span>
                  <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                    {data.dsaConfig.excludedUrls.map((ex, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded text-[9px] bg-rose-500/10 text-rose-600 dark:text-rose-300 font-mono flex items-center gap-1 border border-rose-500/20">
                        {ex}
                        <button
                          onClick={() => promptAction(
                            'Remover Exclusão de URL',
                            `Deseja retirar a regra de bloqueio para "${ex}"?`,
                            'update_dsa',
                            { action: 'remove_url', url: ex },
                            'Remover Regra'
                          )}
                          className="hover:text-rose-500"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 pt-1">
                    <Input
                      placeholder="/rota-para-bloquear/*"
                      value={newExcludedUrl}
                      onChange={(e) => setNewExcludedUrl(e.target.value)}
                      className="h-7 text-xs bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
                    />
                    <Button
                      size="sm"
                      disabled={!newExcludedUrl.trim()}
                      onClick={() => promptAction(
                        'Excluir URL do DSA',
                        `Deseja bloquear a rota "${newExcludedUrl.trim()}" para impedir anúncios dinâmicos nela?`,
                        'update_dsa',
                        { action: 'add_url', url: newExcludedUrl.trim() },
                        'Bloquear URL'
                      )}
                      className="h-7 px-2 text-xs bg-rose-500 hover:bg-rose-600 text-white font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL DE CONFIRMAÇÃO SEGURA (SAFETY MODAL) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {modalConfig.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-zinc-900 dark:text-zinc-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">{modalConfig.title}</h3>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Verificação de Segurança da Conta Google Ads</span>
                </div>
              </div>

              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                {modalConfig.description}
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
                  className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 h-9"
                >
                  Cancelar
                </Button>

                <Button
                  size="sm"
                  onClick={executeModalAction}
                  className="text-xs bg-[#c59b5f] hover:bg-[#b0874e] text-black font-bold h-9 px-4 shadow-sm"
                >
                  {modalConfig.confirmText}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
