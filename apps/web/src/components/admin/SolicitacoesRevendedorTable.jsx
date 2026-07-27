import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

export default function SolicitacoesRevendedorTable({ solicitacoes, isLoading, onAprovar, onRejeitar }) {
  if (isLoading) {
    return (
      <div className="border rounded-xl overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>CPF/CNPJ</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Já Revende?</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!solicitacoes || solicitacoes.length === 0) {
    return (
      <div className="border rounded-xl bg-card p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">Tudo limpo por aqui!</h3>
        <p className="text-muted-foreground">Não há novas solicitações de revenda no momento.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Nome</TableHead>
            <TableHead className="font-semibold">WhatsApp</TableHead>
            <TableHead className="font-semibold">CPF/CNPJ</TableHead>
            <TableHead className="font-semibold">Localização</TableHead>
            <TableHead className="font-semibold text-center">Já Revende?</TableHead>
            <TableHead className="font-semibold">Data</TableHead>
            <TableHead className="text-right font-semibold">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {solicitacoes.map((solicitacao) => (
            <TableRow
              key={solicitacao.id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium">
                {solicitacao.nome || (solicitacao.expand?.user_id?.name || 'Sem nome')}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {solicitacao.whatsapp || (solicitacao.expand?.user_id?.whatsapp || '-')}
              </TableCell>
              <TableCell>{solicitacao.cpf_cnpj || '-'}</TableCell>
              <TableCell>{solicitacao.cidade_estado || '-'}</TableCell>
              <TableCell className="text-center">
                <Badge variant={solicitacao.ja_revende === 'sim' || solicitacao.ja_revende === 'Sim' ? 'default' : 'secondary'}>
                  {solicitacao.ja_revende || 'Não informado'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <Clock className="w-3.5 h-3.5" />
                  {solicitacao.created ? new Date(solicitacao.created).toLocaleDateString('pt-BR') : '-'}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {(solicitacao.cpf_cnpj && (solicitacao.whatsapp || solicitacao.expand?.user_id?.whatsapp) && solicitacao.nome) && (
                    <div className="flex items-center text-green-500 text-xs font-medium mr-2" title="Cadastro Completo para Aprovação">
                      <span className="relative flex h-2.5 w-2.5 mr-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                      Completo
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    onClick={() => onRejeitar(solicitacao.id)}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Rejeitar
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => onAprovar(solicitacao.id, solicitacao.user_id)}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Aprovar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}