import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Clock } from 'lucide-react';

export default function PedidoHistorico({ historico }) {
  let parsedHistorico = [];
  if (historico) {
    if (typeof historico === 'string') {
      try {
        parsedHistorico = JSON.parse(historico);
      } catch (e) {
        console.error('Error parsing historico JSON:', e);
      }
    } else {
      parsedHistorico = historico;
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Histórico de Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        {parsedHistorico.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum histórico registrado.</p>
        ) : (
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted before:to-transparent">
            {parsedHistorico.map((evento, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-background bg-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow z-10"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border bg-card shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm capitalize">{evento.status}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(evento.data).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  {evento.observacao && (
                    <p className="text-xs text-muted-foreground mt-1">{evento.observacao}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}