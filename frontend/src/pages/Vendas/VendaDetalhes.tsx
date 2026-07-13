import { useParams, Link } from 'react-router-dom';
import { useVenda } from '../../hooks/useVendas';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { ArrowLeft, Package, User, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function VendaDetalhes() {
  const { id } = useParams<{ id: string }>();
  const { data: venda, isLoading, error } = useVenda(Number(id));

  if (isLoading) return <div className="p-8 text-center text-gray-500">Carregando detalhes da venda...</div>;
  if (error || !venda) return <div className="p-8 text-center text-red-500">Erro ao carregar detalhes da venda.</div>;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/vendas">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Venda #{venda.id}
            </h2>
            <p className="text-gray-500">Detalhes completos da transação</p>
          </div>
        </div>
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
          venda.status === 'FINALIZADA' ? 'bg-green-100 text-green-800' :
          venda.status === 'CANCELADA' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {venda.status}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <User className="h-5 w-5 text-gray-500" />
            <CardTitle>Dados do Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            {venda.cliente ? (
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Nome:</dt>
                  <dd className="font-medium">{venda.cliente.nome}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">CPF/CNPJ:</dt>
                  <dd className="font-medium">{venda.cliente.cpfCnpj || '-'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Email:</dt>
                  <dd className="font-medium">{venda.cliente.email || '-'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Telefone:</dt>
                  <dd className="font-medium">{venda.cliente.telefone || '-'}</dd>
                </div>
              </dl>
            ) : (
              <p className="text-sm text-gray-500">Nenhum cliente associado a esta venda.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <CardTitle>Dados da Venda</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Data e Hora:</dt>
                <dd className="font-medium">
                  {venda.dataVenda ? format(new Date(venda.dataVenda), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR }) : '-'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Total de Itens:</dt>
                <dd className="font-medium">
                  {venda.itens ? venda.itens.reduce((acc, item) => acc + item.quantidade, 0) : 0}
                </dd>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <dt className="text-gray-900 font-semibold flex items-center gap-1">
                  <DollarSign className="h-4 w-4" /> Valor Total
                </dt>
                <dd className="text-xl font-bold text-green-700">
                  {formatCurrency(venda.valorTotal)}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Package className="h-5 w-5 text-gray-500" />
          <CardTitle>Produtos Vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Qtd.</TableHead>
                  <TableHead className="text-right">Preço Unitário</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {venda.itens?.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{item.produto.nome}</TableCell>
                    <TableCell className="text-right">{item.quantidade}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.precoUnitario)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(item.subtotal)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
