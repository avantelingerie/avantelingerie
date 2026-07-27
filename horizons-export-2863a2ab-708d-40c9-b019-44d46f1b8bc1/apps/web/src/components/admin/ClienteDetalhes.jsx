import React, { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { User, Mail, Phone, CreditCard, Calendar, Edit2, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { clientesService } from '@/services/clientesService.js';

export default function ClienteDetalhes({ cliente, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cpf: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setFormData({
      nome: cliente.nome || '',
      telefone: cliente.telefone || '',
      cpf: cliente.cpf || ''
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await clientesService.updateCliente(cliente.id, formData);
      toast.success('Dados atualizados com sucesso!');
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      toast.error('Erro ao atualizar dados.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Dados Cadastrais
        </CardTitle>
        {!isEditing ? (
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            <Edit2 className="w-4 h-4 mr-2" /> Editar
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleCancel} disabled={isLoading}>
              <X className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" /> Salvar
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <Label className="text-muted-foreground flex items-center gap-2">
              <User className="w-3.5 h-3.5" /> Nome Completo
            </Label>
            {isEditing ? (
              <Input name="nome" value={formData.nome} onChange={handleChange} className="mt-1" />
            ) : (
              <p className="font-medium text-foreground">{cliente.nome || 'Não informado'}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> Email
            </Label>
            <p className="font-medium text-foreground">{cliente.email}</p>
            {isEditing && <p className="text-xs text-muted-foreground mt-1">O email não pode ser alterado por aqui.</p>}
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5" /> CPF
            </Label>
            {isEditing ? (
              <Input name="cpf" value={formData.cpf} onChange={handleChange} className="mt-1" />
            ) : (
              <p className="font-medium text-foreground">{cliente.cpf || 'Não informado'}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" /> Telefone
            </Label>
            {isEditing ? (
              <Input name="telefone" value={formData.telefone} onChange={handleChange} className="mt-1" />
            ) : (
              <p className="font-medium text-foreground">{cliente.telefone || 'Não informado'}</p>
            )}
          </div>

          <div className="space-y-1 md:col-span-2">
            <Label className="text-muted-foreground flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Cliente desde
            </Label>
            <p className="font-medium text-foreground">
              {cliente.criado_em ? (() => {
                try {
                  const cleanStr = cliente.criado_em.replace(' ', 'T');
                  const date = new Date(cleanStr);
                  if (isNaN(date.getTime())) return 'Data não disponível';
                  return date.toLocaleDateString('pt-BR');
                } catch (e) {
                  return 'Data não disponível';
                }
              })() : 'Data não disponível'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}