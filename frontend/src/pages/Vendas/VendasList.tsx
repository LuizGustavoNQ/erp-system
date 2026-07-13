import { Link } from 'react-router-dom';
import { useVendas } from '../../hooks/useVendas';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Plus, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function VendasList() {
  const { data: vendas, isLoading } = useVendas();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Vendas</h2>
          <p className="text-gray-500">Acompanhe e gerencie as vendas realizadas.</p>
        </div>
        <Button asChild>
          <Link to="/vendas/nova">
            <Plus className="mr-2 h-4 w-4" /> Nova Venda
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data da Venda</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Qtd. Itens</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">Carregando...</TableCell>
              </TableRow>
            ) : !Array.isArray(vendas) || vendas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">Nenhuma venda cadastrada.</TableCell>
              </TableRow>
            ) : (
              vendas.map((venda) => (
                <TableRow key={venda.id}>
                  <TableCell className="font-medium">#{venda.id}</TableCell>
                  <TableCell>
                    {venda.dataVenda ? format(new Date(venda.dataVenda), 'dd/MM/yyyy HH:mm', { locale: ptBR }) : '-'}
                  </TableCell>
                  <TableCell>{venda.cliente?.nome || 'Cliente não informado'}</TableCell>
                  <TableCell>
                    {venda.itens ? venda.itens.reduce((acc, item) => acc + item.quantidade, 0) : 0}
                  </TableCell>
                  <TableCell className="font-semibold text-green-700">
                    {formatCurrency(venda.valorTotal)}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      venda.status === 'FINALIZADA' ? 'bg-green-100 text-green-800' :
                      venda.status === 'CANCELADA' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {venda.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/vendas/${venda.id}`}>
                        <Eye className="h-4 w-4 text-gray-500 hover:text-primary-600" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
