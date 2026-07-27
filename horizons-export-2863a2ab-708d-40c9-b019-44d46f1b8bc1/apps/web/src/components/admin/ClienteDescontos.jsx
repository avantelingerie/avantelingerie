import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { BadgePercent, ShoppingBag, TrendingUp, Settings2 } from 'lucide-react';
import AjusteDescontoModal from './AjusteDescontoModal.jsx';

export default function ClienteDescontos({ cliente, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="shadow-sm h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <BadgePercent className="w-5 h-5 text-primary" />
            Fidelidade e Descontos
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
            <Settings2 className="w-4 h-4 mr-2" /> Ajustar
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-muted/50 p-4 rounded-xl border flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground mb-1">Nível Atual</span>
              <span className="text-2xl font-bold text-foreground">{cliente.nivel_desconto || 0}</span>
            </div>

            <div className="bg-muted/50 p-4 rounded-xl border flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center mb-3">
                <BadgePercent className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-muted-foreground mb-1">Desconto Ativo</span>
              <span className="text-2xl font-bold text-green-600">{cliente.desconto_pct || 0}%</span>
            </div>

            <div className="bg-muted/50 p-4 rounded-xl border flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-muted-foreground mb-1">Total de Compras</span>
              <span className="text-2xl font-bold text-blue-600">{cliente.total_compras || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <AjusteDescontoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        cliente={cliente} 
        onSave={onUpdate} 
      />
    </>
  );
}