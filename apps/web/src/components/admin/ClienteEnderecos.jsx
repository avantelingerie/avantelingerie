import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { MapPin, Plus, Edit2, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';
import { clientesService } from '@/services/clientesService.js';
import EnderecoModal from './EnderecoModal.jsx';

export default function ClienteEnderecos({ enderecos, usuarioId, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEndereco, setSelectedEndereco] = useState(null);

  const handleAdd = () => {
    setSelectedEndereco(null);
    setIsModalOpen(true);
  };

  const handleEdit = (endereco) => {
    setSelectedEndereco(endereco);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este endereço?')) return;
    
    try {
      await clientesService.deleteEndereco(id);
      toast.success('Endereço excluído com sucesso!');
      onUpdate();
    } catch (error) {
      toast.error('Erro ao excluir endereço.');
    }
  };

  const handleSetPrincipal = async (id) => {
    try {
      await clientesService.setEnderecoAsPrincipal(id, usuarioId);
      toast.success('Endereço definido como principal!');
      onUpdate();
    } catch (error) {
      toast.error('Erro ao definir endereço principal.');
    }
  };

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Endereços
          </CardTitle>
          <Button size="sm" onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" /> Adicionar
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          {enderecos.length === 0 ? (
            <div className="text-center py-8 bg-muted/30 rounded-xl border border-dashed">
              <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">Nenhum endereço cadastrado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enderecos.map((end) => (
                <div key={end.id} className={`p-4 rounded-xl border relative transition-all ${end.principal ? 'border-primary/50 bg-primary/5' : 'bg-card hover:border-border/80'}`}>
                  {end.principal && (
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                      Principal
                    </Badge>
                  )}
                  
                  <div className="pr-20">
                    <p className="font-medium text-foreground mb-1">
                      {end.logradouro}, {end.numero}
                      {end.complemento && ` - ${end.complemento}`}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">{end.bairro}</p>
                    <p className="text-sm text-muted-foreground mb-3">{end.cidade} - {end.estado}, {end.cep}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t mt-auto">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground" onClick={() => handleEdit(end)}>
                      <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(end.id)}>
                      <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Excluir
                    </Button>
                    {!end.principal && (
                      <Button variant="ghost" size="sm" className="h-8 px-2 ml-auto text-primary hover:text-primary hover:bg-primary/10" onClick={() => handleSetPrincipal(end.id)}>
                        <Star className="w-3.5 h-3.5 mr-1.5" /> Tornar Principal
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <EnderecoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        endereco={selectedEndereco} 
        usuarioId={usuarioId}
        onSave={onUpdate} 
      />
    </>
  );
}