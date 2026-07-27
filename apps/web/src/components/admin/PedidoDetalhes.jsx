import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { User, MapPin, Phone, Mail } from 'lucide-react';

export default function PedidoDetalhes({ pedido }) {
  if (!pedido) return null;

  let endereco = null;
  if (pedido.endereco_entrega) {
    if (typeof pedido.endereco_entrega === 'string') {
      try {
        endereco = JSON.parse(pedido.endereco_entrega);
      } catch (e) {
        // Safe split logic for plain text formatted address string: "Rua, Numero - Complemento, Bairro"
        const parts = pedido.endereco_entrega.split(',').map(s => s.trim());
        let logradouro = parts[0] || '';
        let numero = '';
        let complemento = '';
        let bairro = '';
        
        if (parts[1]) {
          const numParts = parts[1].split('-').map(s => s.trim());
          numero = numParts[0] || '';
          complemento = numParts[1] || '';
        }
        
        if (parts[2]) {
          bairro = parts[2] || '';
        }
        
        endereco = {
          logradouro,
          numero,
          complemento,
          bairro,
          cidade: pedido.cidade || '',
          estado: pedido.estado || '',
          cep: pedido.cep || ''
        };
      }
    } else {
      endereco = pedido.endereco_entrega;
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Dados do Cliente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="text-muted-foreground">Nome</p>
            <p className="font-medium">{pedido.cliente_nome || 'Não informado'}</p>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{pedido.cliente_email || 'Não informado'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{pedido.cliente_telefone || 'Não informado'}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Endereço de Entrega
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          {endereco ? (
            <>
              <p className="font-medium">{endereco.logradouro}, {endereco.numero} {endereco.complemento && `- ${endereco.complemento}`}</p>
              <p>{endereco.bairro}</p>
              <p>{endereco.cidade} - {endereco.estado}</p>
              <p>CEP: {endereco.cep}</p>
            </>
          ) : (
            <p className="text-muted-foreground">Endereço não informado ou formato inválido.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}