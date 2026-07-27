import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Send } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { toast } from 'sonner';
import { pedidosService } from '@/services/pedidosService.js';
import { blingService } from '@/services/blingService.js';

export default function NovoPedidoPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Basic form state for manual order creation
  const [clienteNome, setClienteNome] = useState('');
  const [clienteEmail, setClienteEmail] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [metodoPagamento, setMetodoPagamento] = useState('pix');
  const [status, setStatus] = useState('pendente');
  const [observacoes, setObservacoes] = useState('');

  const handleSave = async (sendToBling = false) => {
    if (!clienteNome || !valorTotal) {
      toast.error('Preencha os campos obrigatórios (Nome e Valor Total).');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        cliente_nome: clienteNome,
        cliente_email: clienteEmail,
        valor_total: parseFloat(valorTotal),
        metodo_pagamento: metodoPagamento,
        status,
        observacoes,
        itens: [] // Simplified for manual entry
      };

      const novoPedido = await pedidosService.createPedido(payload);
      toast.success('Pedido criado com sucesso!');

      if (sendToBling) {
        try {
          await blingService.sendPedidoToBling(novoPedido);
          toast.success('Enviado para o Bling!');
        } catch (err) {
          toast.error('Criado, mas falhou ao enviar para o Bling.');
        }
      }

      navigate(`/admin/pedidos/${novoPedido.id}`);
    } catch (err) {
      toast.error('Erro ao criar pedido.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4 mb-6 border-b pb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/pedidos')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Novo Pedido Manual</h1>
          <p className="text-sm text-muted-foreground">Crie um pedido manualmente no sistema.</p>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Nome do Cliente *</Label>
            <Input value={clienteNome} onChange={e => setClienteNome(e.target.value)} placeholder="Ex: João Silva" />
          </div>
          <div className="space-y-2">
            <Label>Email do Cliente</Label>
            <Input type="email" value={clienteEmail} onChange={e => setClienteEmail(e.target.value)} placeholder="joao@email.com" />
          </div>
          <div className="space-y-2">
            <Label>Valor Total (R$) *</Label>
            <Input type="number" step="0.01" min="0" value={valorTotal} onChange={e => setValorTotal(e.target.value)} placeholder="0.00" />
          </div>
          <div className="space-y-2">
            <Label>Método de Pagamento</Label>
            <Select value={metodoPagamento} onValueChange={setMetodoPagamento}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="credito">Cartão de Crédito</SelectItem>
                <SelectItem value="boleto">Boleto</SelectItem>
                <SelectItem value="transferencia">Transferência</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status Inicial</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="pago">Pago</SelectItem>
                <SelectItem value="confirmado">Confirmado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Observações</Label>
          <Input value={observacoes} onChange={e => setObservacoes(e.target.value)} placeholder="Anotações internas..." />
        </div>

        <div className="pt-6 border-t flex justify-end gap-3">
          <Button variant="outline" onClick={() => navigate('/admin/pedidos')} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button variant="secondary" onClick={() => handleSave(false)} disabled={isSubmitting}>
            <Save className="w-4 h-4 mr-2" /> Salvar Apenas
          </Button>
          <Button onClick={() => handleSave(true)} disabled={isSubmitting}>
            <Send className="w-4 h-4 mr-2" /> Salvar e Enviar p/ Bling
          </Button>
        </div>
      </div>
    </div>
  );
}