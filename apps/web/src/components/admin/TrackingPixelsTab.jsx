import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Target, Save, ShieldCheck, Loader2 } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { toast } from 'sonner';

export default function TrackingPixelsTab() {
  const [metaPixelId, setMetaPixelId] = useState('');
  const [gaId, setGaId] = useState('');
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
        if (record.chave_nome === 'google_analytics_id') {
          setGaId(record.chave_valor || '');
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

      // Helper para salvar ou criar
      const saveOrUpdate = async (chave_nome, chave_valor) => {
        const existing = records.find(r => r.chave_nome === chave_nome);
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
      await saveOrUpdate('google_analytics_id', gaId.trim());

      toast.success('Pixels de Tracking atualizados com sucesso!');
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
              Integrações de Tracking & Pixels
            </h3>
            <p className="text-xs text-zinc-400 m-0">
              Configure os IDs do Meta (Facebook/Instagram) e Google Analytics para monitoramento em tempo real de campanhas e conversões.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-[#121212] border-zinc-850">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white font-serif flex items-center gap-2">
              <span className="text-[#1877F2]">Meta</span> Pixel
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
                placeholder="Ex: 123456789012345" 
                className="bg-[#181818] border-zinc-800 text-white focus-visible:ring-[#c59b5f]" 
              />
              <p className="text-[10px] text-zinc-500">Este Pixel capturará automaticamente PageView, ViewContent, AddToCart, InitiateCheckout e Purchase.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121212] border-zinc-850">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white font-serif flex items-center gap-2">
              <span className="text-[#F4B400]">Google</span> Analytics 4
            </CardTitle>
            <CardDescription className="text-zinc-400">
              ID da Métrica de Mensuração do Google Analytics (GA4).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">ID de Métrica (GA4)</Label>
              <Input 
                value={gaId} 
                onChange={(e) => setGaId(e.target.value)} 
                placeholder="Ex: G-XXXXXXXXXX" 
                className="bg-[#181818] border-zinc-800 text-white focus-visible:ring-[#c59b5f]" 
              />
              <p className="text-[10px] text-zinc-500">Rastreio oficial de tráfego, audiência, jornadas demográficas e eventos de compra (Enhanced Ecommerce).</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-[#161616] border border-emerald-500/20 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-lg">
         <div className="flex items-center gap-3">
           <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />
           <div>
             <h4 className="text-sm font-bold text-white mb-0.5">Sincronização Ativa</h4>
             <p className="text-[10px] text-zinc-400">
               As chaves cadastradas aqui são injetadas em tempo real na vitrine (storefront) via API e protegidas no PocketBase.
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
