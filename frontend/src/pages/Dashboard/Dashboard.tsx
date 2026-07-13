import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Users, ShoppingBag, TrendingUp, Package } from 'lucide-react';

export function Dashboard() {
  const { data: clientes } = useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      const { data } = await api.get('/clientes');
      return data as any[];
    }
  });

  const { data: produtos } = useQuery({
    queryKey: ['produtos'],
    queryFn: async () => {
      const { data } = await api.get('/produtos');
      return data as any[];
    }
  });

  const safeClientes = Array.isArray(clientes) ? clientes : [];
  const safeProdutos = Array.isArray(produtos) ? produtos : [];

  const totalClientes = safeClientes.length;
  const totalProdutos = safeProdutos.length;
  const estoqueTotal = safeProdutos.reduce((acc, curr) => acc + (curr.quantidadeEstoque || 0), 0);
  const produtosAtivos = safeProdutos.filter(p => p.ativo).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Geral</h2>
        <p className="text-gray-500">Visão consolidada da operação.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Clientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalClientes}</div>
            <p className="text-xs text-gray-500">Cadastrados no sistema</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Produtos no Catálogo</CardTitle>
            <ShoppingBag className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalProdutos}</div>
            <p className="text-xs text-gray-500">Total de itens</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Itens em Estoque</CardTitle>
            <Package className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{estoqueTotal}</div>
            <p className="text-xs text-gray-500">Unidades disponíveis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Produtos Ativos</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{produtosAtivos}</div>
            <p className="text-xs text-gray-500">Prontos para venda</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
