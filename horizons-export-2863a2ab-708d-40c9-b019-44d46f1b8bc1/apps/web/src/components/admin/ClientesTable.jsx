import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { Eye, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

export default function ClientesTable({ clientes, isLoading }) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="border rounded-xl overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Criado Em</TableHead>
              <TableHead className="text-right">Total Compras</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-5 w-12 ml-auto" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!clientes || clientes.length === 0) {
    return (
      <div className="border rounded-xl bg-card p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Ban className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">Nenhum cliente encontrado</h3>
        <p className="text-muted-foreground">Tente ajustar os filtros de busca ou verifique se há clientes cadastrados.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Nome</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Tipo</TableHead>
            <TableHead className="font-semibold">CPF</TableHead>
            <TableHead className="font-semibold">Telefone</TableHead>
            <TableHead className="font-semibold">Criado Em</TableHead>
            <TableHead className="text-right font-semibold">Total Compras</TableHead>
            <TableHead className="text-right font-semibold">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow
              key={cliente.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => navigate(`/admin/clientes/${cliente.id}`)}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {cliente.name || cliente.nome || 'Sem nome'}
                  {cliente.bloqueado && <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4">Bloqueado</Badge>}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{cliente.email}</TableCell>
              <TableCell>
                {cliente.tipo_cliente === 'revendedor' && !cliente.cadastro_completo ? (
                  <Badge variant="secondary" className="capitalize text-muted-foreground bg-muted">Pendente</Badge>
                ) : (
                  <Badge variant={cliente.tipo_cliente === 'revendedor' ? 'default' : 'outline'} className="capitalize">
                    {cliente.tipo_cliente || 'Varejo'}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{cliente.cpf || '-'}</TableCell>
              <TableCell>{cliente.whatsapp || cliente.telefone || '-'}</TableCell>
              <TableCell>
                {cliente.created || cliente.criado_em ? new Date(cliente.created || cliente.criado_em).toLocaleDateString('pt-BR') : '-'}
              </TableCell>
              <TableCell className="text-right font-medium">{cliente.total_compras || 0}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); navigate(`/admin/clientes/${cliente.id}`); }}>
                  <Eye className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}