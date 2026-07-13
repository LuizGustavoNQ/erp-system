import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Plus, Edit, Trash2 } from 'lucide-react';

export function ProdutosList() {
  const { data: produtos, isLoading, refetch } = useQuery({
    queryKey: ['produtos'],
    queryFn: async () => {
      const { data } = await api.get('/produtos');
      return data as any[];
    }
  });

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      await api.delete(`/produtos/${id}`);
      refetch();
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Produtos</h2>
          <p className="text-gray-500">Catálogo e gestão de estoque.</p>
        </div>
        <Button asChild>
          <Link to="/produtos/novo">
            <Plus className="mr-2 h-4 w-4" /> Novo Produto
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">Carregando...</TableCell>
              </TableRow>
            ) : !Array.isArray(produtos) || produtos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">Nenhum produto cadastrado.</TableCell>
              </TableRow>
            ) : (
              produtos.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell>
                    <div className="font-medium">{produto.nome}</div>
                    <div className="text-xs text-gray-500 line-clamp-1">{produto.descricao}</div>
                  </TableCell>
                  <TableCell>{formatCurrency(produto.preco)}</TableCell>
                  <TableCell>
                    <span className={produto.quantidadeEstoque <= 5 ? 'text-red-600 font-medium' : ''}>
                      {produto.quantidadeEstoque} un.
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={produto.ativo ? 'success' : 'secondary'}>
                      {produto.ativo ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/produtos/${produto.id}`}>
                          <Edit className="h-4 w-4 text-gray-500 hover:text-primary-600" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(produto.id)}>
                        <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-600" />
                      </Button>
                    </div>
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
