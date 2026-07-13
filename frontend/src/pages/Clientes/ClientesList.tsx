import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function ClientesList() {
  const { data: clientes, isLoading, refetch } = useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      const { data } = await api.get('/clientes');
      return data as any[];
    }
  });

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      await api.delete(`/clientes/${id}`);
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Clientes</h2>
          <p className="text-gray-500">Gerencie a carteira de clientes do sistema.</p>
        </div>
        <Button asChild>
          <Link to="/clientes/novo">
            <Plus className="mr-2 h-4 w-4" /> Novo Cliente
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome / Razão Social</TableHead>
              <TableHead>CPF/CNPJ</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Data Cadastro</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">Carregando...</TableCell>
              </TableRow>
            ) : !Array.isArray(clientes) || clientes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">Nenhum cliente cadastrado.</TableCell>
              </TableRow>
            ) : (
              clientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium">{cliente.nome}</TableCell>
                  <TableCell>{cliente.cpfCnpj || '-'}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{cliente.email}</span>
                      <span className="text-xs text-gray-500">{cliente.telefone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {cliente.dataCadastro ? format(new Date(cliente.dataCadastro), 'dd/MM/yyyy', { locale: ptBR }) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/clientes/${cliente.id}`}>
                          <Edit className="h-4 w-4 text-gray-500 hover:text-primary-600" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(cliente.id)}>
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
