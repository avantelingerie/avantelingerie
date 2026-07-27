import React, { useState, useEffect } from 'react';
import { Store, Save, Loader2, MapPin, Phone, Mail, FileText, Download, Users } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';

export default function ConfiguracoesLoja() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [leads, setLeads] = useState([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  
  const [config, setConfig] = useState({
    nome_loja: '',
    cnpj: '',
    email_contato: '',
    whatsapp: '',
    endereco_completo: '',
    cep_origem: '',
    limite_alerta_global: 10,
    retirada_ativo: false,
    retirada_endereco: '',
    retirada_horario: '',
    retirada_prazo_mensagem: '',
    retirada_instrucoes: '',
    modo_em_breve: false,
    data_lancamento: '',
    instagram_url: '',
    facebook_url: '',
    whatsapp_url: '',
    tiktok_url: ''
  });

  useEffect(() => {
    fetchConfig();
    fetchLeads();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await apiServerClient.fetch('/configuracoes/loja');
      if (res.ok) {
        const data = await res.json();
        if (data) {
          // Format date for input type="date" if it exists
          let formattedDate = '';
          if (data.data_lancamento) {
            formattedDate = new Date(data.data_lancamento).toISOString().split('T')[0];
          }
          
          setConfig(prev => ({ 
            ...prev, 
            ...data,
            data_lancamento: formattedDate
          }));
        }
      }
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
      toast.error('Não foi possível carregar as configurações da loja.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await apiServerClient.fetch('/coming-soon/leads-prelancamento');
      if (res.ok) {
        const data = await res.json();
        setLeads(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const handleChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Convert empty date string to null for backend
      const payload = { ...config };
      if (!payload.data_lancamento) {
        payload.data_lancamento = null;
      } else {
        // Ensure it's a valid ISO string for PocketBase
        payload.data_lancamento = new Date(payload.data_lancamento).toISOString();
      }

      const res = await apiServerClient.fetch('/configuracoes/loja', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Falha ao salvar');
      
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar configurações.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      toast.error('Não há leads para exportar.');
      return;
    }

    const headers = ['Email', 'Data de Cadastro', 'Origem'];
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        lead.email,
        new Date(lead.created).toLocaleString('pt-BR'),
        lead.origem || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_prelancamento_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Store className="w-8 h-8 text-primary" />
          Configurações da Loja
        </h1>
        <p className="text-muted-foreground mt-2">Gerencie as informações públicas da sua loja, opções de retirada e modo em breve.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Modo Em Breve Section */}
        <Card className="shadow-sm border-amber-200 dark:border-amber-900/50">
          <CardHeader className="bg-amber-50/50 dark:bg-amber-900/10 border-b border-amber-100 dark:border-amber-900/30">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-amber-800 dark:text-amber-500">Modo Em Breve</CardTitle>
                <CardDescription>
                  Quando ativo, a loja fica oculta para visitantes. O admin continua acessível.
                </CardDescription>
              </div>
              <Switch 
                checked={config.modo_em_breve} 
                onCheckedChange={c => handleChange('modo_em_breve', c)} 
              />
            </div>
          </CardHeader>
          {config.modo_em_breve && (
            <CardContent className="space-y-4 pt-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data_lancamento">Data de Lançamento (Opcional)</Label>
                  <Input 
                    id="data_lancamento" 
                    type="date"
                    value={config.data_lancamento || ''} 
                    onChange={e => handleChange('data_lancamento', e.target.value)} 
                  />
                  <p className="text-xs text-muted-foreground">Usado para o contador na página.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram_url">Instagram URL</Label>
                  <Input 
                    id="instagram_url" 
                    type="url"
                    value={config.instagram_url || ''} 
                    onChange={e => handleChange('instagram_url', e.target.value)} 
                    placeholder="https://instagram.com/suamarca"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook_url">URL do Facebook</Label>
                  <Input 
                    id="facebook_url" 
                    type="url"
                    value={config.facebook_url || ''} 
                    onChange={e => handleChange('facebook_url', e.target.value)} 
                    placeholder="https://facebook.com/suamarca"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp_url">WhatsApp URL</Label>
                  <Input 
                    id="whatsapp_url" 
                    type="url"
                    value={config.whatsapp_url || ''} 
                    onChange={e => handleChange('whatsapp_url', e.target.value)} 
                    placeholder="https://wa.me/5511999999999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tiktok_url">TikTok URL</Label>
                  <Input 
                    id="tiktok_url" 
                    type="url"
                    value={config.tiktok_url || ''} 
                    onChange={e => handleChange('tiktok_url', e.target.value)} 
                    placeholder="https://tiktok.com/@suamarca"
                  />
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Informações Gerais</CardTitle>
            <CardDescription>Dados que aparecerão no rodapé e nos e-mails para os clientes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome_loja">Nome da Loja</Label>
                <Input 
                  id="nome_loja" 
                  value={config.nome_loja || ''} 
                  onChange={e => handleChange('nome_loja', e.target.value)} 
                  placeholder="Ex: Minha Loja Oficial"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="cnpj" 
                    className="pl-9"
                    value={config.cnpj || ''} 
                    onChange={e => handleChange('cnpj', e.target.value)} 
                    placeholder="00.000.000/0001-00"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email_contato">E-mail de Contato</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email_contato" 
                    type="email"
                    className="pl-9"
                    value={config.email_contato || ''} 
                    onChange={e => handleChange('email_contato', e.target.value)} 
                    placeholder="contato@minhaloja.com.br"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp de Atendimento</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="whatsapp" 
                    className="pl-9"
                    value={config.whatsapp || ''} 
                    onChange={e => handleChange('whatsapp', e.target.value)} 
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label htmlFor="endereco_completo">Endereço Completo</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Textarea 
                  id="endereco_completo" 
                  className="pl-9 min-h-[80px]"
                  value={config.endereco_completo || ''} 
                  onChange={e => handleChange('endereco_completo', e.target.value)} 
                  placeholder="Rua Exemplo, 123 - Bairro, Cidade - UF"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="cep_origem">CEP de Origem (Para cálculo de frete)</Label>
                <Input 
                  id="cep_origem" 
                  value={config.cep_origem || ''} 
                  onChange={e => handleChange('cep_origem', e.target.value)} 
                  placeholder="00000-000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="limite_alerta_global">Limite de Alerta de Estoque Baixo</Label>
                <Input 
                  id="limite_alerta_global" 
                  type="number"
                  min="0"
                  value={config.limite_alerta_global || 10} 
                  onChange={e => handleChange('limite_alerta_global', parseInt(e.target.value))} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="space-y-1">
              <CardTitle>Retirada no Local</CardTitle>
              <CardDescription>Permita que os clientes retirem os pedidos fisicamente.</CardDescription>
            </div>
            <Switch 
              checked={config.retirada_ativo} 
              onCheckedChange={c => handleChange('retirada_ativo', c)} 
            />
          </CardHeader>
          {config.retirada_ativo && (
            <CardContent className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="space-y-2">
                <Label htmlFor="retirada_endereco">Endereço de Retirada</Label>
                <Input 
                  id="retirada_endereco" 
                  value={config.retirada_endereco || ''} 
                  onChange={e => handleChange('retirada_endereco', e.target.value)} 
                  placeholder="Rua da Loja, 123 - Centro"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="retirada_horario">Horário de Funcionamento</Label>
                  <Input 
                    id="retirada_horario" 
                    value={config.retirada_horario || ''} 
                    onChange={e => handleChange('retirada_horario', e.target.value)} 
                    placeholder="Seg a Sex das 09h às 18h"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retirada_prazo_mensagem">Prazo para Retirada</Label>
                  <Input 
                    id="retirada_prazo_mensagem" 
                    value={config.retirada_prazo_mensagem || ''} 
                    onChange={e => handleChange('retirada_prazo_mensagem', e.target.value)} 
                    placeholder="Disponível em até 1 dia útil"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="retirada_instrucoes">Instruções Adicionais</Label>
                <Textarea 
                  id="retirada_instrucoes" 
                  value={config.retirada_instrucoes || ''} 
                  onChange={e => handleChange('retirada_instrucoes', e.target.value)} 
                  placeholder="Apresente um documento com foto e o número do pedido."
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          )}
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSaving} className="w-full sm:w-auto">
            {isSaving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
            Salvar Configurações
          </Button>
        </div>
      </form>

      {/* Leads Capturados Section */}
      <Card className="shadow-sm mt-12">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Leads Capturados
            </CardTitle>
            <CardDescription>
              Total de {leads.length} e-mails cadastrados na página "Em Breve".
            </CardDescription>
          </div>
          <Button variant="outline" onClick={handleExportCSV} disabled={leads.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingLeads ? (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : leads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
                      Nenhum lead capturado ainda.
                    </TableCell>
                  </TableRow>
                ) : (
                  leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.email}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(lead.created).toLocaleString('pt-BR')}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}