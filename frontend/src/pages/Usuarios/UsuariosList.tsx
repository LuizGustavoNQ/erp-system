import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Plus, AlertTriangle } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

// Como o backend apenas possui POST /usuarios e falta listagem (GET),
// faremos um mock inteligente para mostrar a interface solicitada, 
// ou utilizaremos os usuários temporários se houver um store local futuramente.
const MOCK_USUARIOS = [
  { id: 1, nome: 'Administrador', email: 'admin@erp.com', cargo: 'ADMIN', ativo: true },
  { id: 2, nome: 'João Silva', email: 'joao.silva@erp.com', cargo: 'VENDEDOR', ativo: true },
  { id: 3, nome: 'Maria Souza', email: 'maria@erp.com', cargo: 'GERENTE', ativo: false },
];

export function UsuariosList() {
  const [usuarios] = useState(MOCK_USUARIOS);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Usuários</h2>
          <p className="text-gray-500">Controle de acesso e permissões.</p>
        </div>
        <Button asChild>
          <Link to="/usuarios/novo">
            <Plus className="mr-2 h-4 w-4" /> Novo Usuário
          </Link>
        </Button>
      </div>

      <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Limitação da API</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>O back-end atual suporta apenas o cadastro (POST) de usuários. A listagem, edição e exclusão estão operando com dados de demonstração (mock) até que as rotas sejam implementadas na API.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Cargo / Permissão</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell className="font-medium">{usuario.nome}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{usuario.cargo}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={usuario.ativo ? 'success' : 'secondary'}>
                    {usuario.ativo ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
