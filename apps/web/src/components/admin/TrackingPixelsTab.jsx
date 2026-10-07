import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Target, Save, ShieldCheck, Loader2, Eye, EyeOff, Server } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { toast } from 'sonner';

export default function TrackingPixelsTab() {
  const [metaPixelId, setMetaPixelId] = useState('');
  const [metaCapiToken, setMetaCapiToken] = useState('');
  const [metaTestCode, setMetaTestCode] = useState('');
  const [showCapiToken, setShowCapiToken] = useState(false);
  
  const [gaId, setGaId] = useState('');
  const [googleAdsId, setGoogleAdsId] = useState('');
  const [googleAdsLabel, setGoogleAdsLabel] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPixels();
  }, []);

  const fetchPixels = async () => {
    try {
      setLoading(true);
      const records = await pb.collection('integracoes_config').getFullList({
        filter: 'servico = "marketing"',
      });

      records.forEach((record) => {
        if (record.chave_nome === 'meta_pixel_id') {
          setMetaPixelId(record.chave_valor || '');
        }
        if (record.chave_nome === 'meta_capi_token') {
          setMetaCapiToken(record.chave_valor || '');
        }
        if (record.chave_nome === 'meta_test_event_code') {
          setMetaTestCode(record.chave_valor || '');
        }
        if (record.chave_nome === 'google_analytics_id') {
          setGaId(record.chave_valor || '');
        }
        if (record.chave_nome === 'google_ads_tag_id') {
          setGoogleAdsId(record.chave_valor || '');
        }
        if (record.chave_nome === 'google_ads_conversion_label') {
          setGoogleAdsLabel(record.chave_valor || '');
        }
      });
    } catch (error) {
      console.error('Erro ao buscar pixels:', error);
      toast.error('Não foi possível carregar as configurações de tracking.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const records = await pb.collection('integracoes_config').getFullList({
        filter: 'servico = "marketing"',
      });

      // Helper para salvar, atualizar ou deletar se estiver vazio
      const saveOrUpdate = async (chave_nome, chave_valor) => {
        const existing = records.find(r => r.chave_nome === chave_nome);
        
        if (!chave_valor) {
          if (existing) {
            await pb.collection('integracoes_config').delete(existing.id);
          }
          return;
        }

        if (existing) {
          if (existing.chave_valor !== chave_valor) {
             await pb.collection('integracoes_config').update(existing.id, {
               chave_valor,
               ativo: true
             });
          }
        } else {
          await pb.collection('integracoes_config').create({
            servico: 'marketing',
            chave_nome,
            chave_valor,
            ambiente: 'producao',
            ativo: true,
            status_conexao: 'conectado'
          });
        }
      };

      await saveOrUpdate('meta_pixel_id', metaPixelId.trim());
      await saveOrUpdate('meta_capi_token', metaCapiToken.trim());
      await saveOrUpdate('meta_test_event_code', metaTestCode.trim());
      await saveOrUpdate('google_analytics_id', gaId.trim());
      await saveOrUpdate('google_ads_tag_id', googleAdsId.trim());
      await saveOrUpdate('google_ads_conversion_label', googleAdsLabel.trim());

      toast.success('Configurações de Tracking & Anúncios atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar pixels:', error);
      toast.error('Ocorreu um erro ao salvar as configurações.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-[#c59b5f] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#121212] border border-zinc-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
            <Target className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white m-0 flex items-center gap-2 font-serif">
              Integrações de Tracking & Pixels (Meta & Google)
            </h3>
            <p className="text-xs text-zinc-400 m-0">
              Configure os IDs do Meta Ads (Navegador e Servidor CAPI) e Google (Analytics GA4 e Google Ads) para conversões em tempo real.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1. Meta Pixel (Navegador) */}
        <Card className="bg-[#121212] border-zinc-850">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white font-serif flex items-center gap-2">
              <span className="text-[#1877F2]">Meta</span> Pixel (Navegador)
            </CardTitle>
            <CardDescription className="text-zinc-400">
              ID do Conjunto de Dados (Pixel) do Gerenciador de Anúncios.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">ID do Meta Pixel</Label>
              <Input 
                value={metaPixelId} 
                onChange={(e) => setMetaPixelId(e.target.value)} 
                placeholder="Ex: 981595838258999" 
                className="bg-[#181818] border-zinc-800 text-white focus-visible:ring-[#c59b5f]" 
              />
              <p className="text-[10px] text-zinc-500">Captura no navegador: PageView, ViewContent, AddToCart, InitiateCheckout e Purchase.</p>
            </div>
          </CardContent>
        </Card>

        {/* 2. Meta Conversions API (CAPI - Servidor) */}
        <Card className="bg-[#121212] border-zinc-850">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white font-serif flex items-center gap-2">
              <span className="text-[#1877F2] flex items-center gap-1.5">
                <Server className="w-4 h-4 text-blue-400 inline" /> Meta
              </span> CAPI (Servidor)
            </CardTitle>
            <CardDescription className="text-zinc-400">
              API de Conversões via Servidor (blindagem contra iOS e Adblockers).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-zinc-300">Token de Acesso da Graph API (CAPI)</Label>
                <button
                  type="button"
                  onClick={() => setShowCapiToken(!showCapiToken)}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {showCapiToken ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {showCapiToken ? 'Ocultar' : 'Ver'}
                </button>
              </div>
              <Input 
                type={showCapiToken ? 'text' : 'password'}
                value={metaCapiToken} 
                onChange={(e) => setMetaCapiToken(e.target.value)} 
                placeholder="Ex: EAAB..." 
                className="bg-[#181818] border-zinc-800 text-white font-mono text-xs focus-visible:ring-[#c59b5f]" 
              />
              <p className="text-[10px] text-zinc-500">Gerado no Gerenciador de Eventos da Meta &gt; Configurações &gt; Gerar Token de Acesso.</p>
            </div>

            <div className="space-y-2 pt-1 border-t border-zinc-800/60">
              <Label className="text-zinc-300 text-xs">Código de Teste de Evento (Opcional)</Label>
              <Input 
                value={metaTestCode} 
                onChange={(e) => setMetaTestCode(e.target.value)} 
                placeholder="Ex: TEST12345 (apenas para depuração)" 
                className="bg-[#181818] border-zinc-800 text-white font-mono text-xs focus-visible:ring-[#c59b5f]" 
              />
              <p className="text-[10px] text-zinc-500">Preencha apenas para testar na aba "Testar Eventos" do Facebook.</p>
            </div>
          </CardContent>
        </Card>

        {/* 3. Google Analytics 4 */}
        <Card className="bg-[#121212] border-zinc-850">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white font-serif flex items-center gap-2">
              <span className="text-[#F4B400]">Google</span> Analytics 4 (GA4)
            </CardTitle>
            <CardDescription className="text-zinc-400">
              ID da Métrica de Mensuração do Google Analytics.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">ID de Métrica (GA4)</Label>
              <Input 
                value={gaId} 
                onChange={(e) => setGaId(e.target.value)} 
                placeholder="Ex: G-E2FS36FRG1" 
                className="bg-[#181818] border-zinc-800 text-white focus-visible:ring-[#c59b5f]" 
              />
              <p className="text-[10px] text-zinc-500">Rastreio global de tráfego, audiência, jornadas e eventos de e-commerce.</p>
            </div>
          </CardContent>
        </Card>

        {/* 4. Google Ads (Tag de Conversão Direta) */}
        <Card className="bg-[#121212] border-zinc-850">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white font-serif flex items-center gap-2">
              <span className="text-[#4285F4]">Google</span> Ads (Conversões)
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Otimização em tempo real para Performance Max e Shopping.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">ID da Tag do Google Ads (AW-)</Label>
              <Input 
                value={googleAdsId} 
                onChange={(e) => setGoogleAdsId(e.target.value)} 
                placeholder="Ex: AW-1234567890" 
                className="bg-[#181818] border-zinc-800 text-white font-mono text-xs focus-visible:ring-[#c59b5f]" 
              />
              <p className="text-[10px] text-zinc-500">Encontrado na Tag do Google Ads (Tools &gt; Conversões &gt; Tag do Google).</p>
            </div>

            <div className="space-y-2 pt-1 border-t border-zinc-800/60">
              <Label className="text-zinc-300 text-xs">Rótulo de Conversão de Compra (Conversion Label)</Label>
              <Input 
                value={googleAdsLabel} 
                onChange={(e) => setGoogleAdsLabel(e.target.value)} 
                placeholder="Ex: AbCdEfGhIjKlMnOp" 
                className="bg-[#181818] border-zinc-800 text-white font-mono text-xs focus-visible:ring-[#c59b5f]" 
              />
              <p className="text-[10px] text-zinc-500">Dispara o evento direto de compra (Purchase) para otimização de lances com IA no Google.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-[#161616] border border-emerald-500/20 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-lg">
         <div className="flex items-center gap-3">
           <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />
           <div>
             <h4 className="text-sm font-bold text-white mb-0.5">Sincronização Ativa &amp; Segura</h4>
             <p className="text-[10px] text-zinc-400">
               As chaves salvas aqui são criptografadas, injetadas dinamicamente na loja vitrine via API e sincronizadas com o backend.
             </p>
           </div>
         </div>
         <Button 
           onClick={handleSave} 
           disabled={saving}
           className="w-full sm:w-auto bg-[#c59b5f] hover:bg-[#b08955] text-black font-bold shadow-[0_0_15px_rgba(197,155,95,0.2)] whitespace-nowrap"
         >
           {saving ? (
             <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Salvando...</>
           ) : (
             <><Save className="w-4 h-4 mr-2" /> Salvar Integrações</>
           )}
         </Button>
      </div>

    </div>
  );
}

