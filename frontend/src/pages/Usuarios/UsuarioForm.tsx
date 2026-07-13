import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '../../lib/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { ArrowLeft } from 'lucide-react';

export function UsuarioForm() {
  const navigate = useNavigate();
  
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    cargo: 'VENDEDOR',
  });

  const [senhaErro, setSenhaErro] = useState('');

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      // POST /usuarios está implementado na API!
      return api.post('/usuarios', data);
    },
    onSuccess: () => {
      navigate('/usuarios');
    },
    onError: (error: AxiosError<Record<string, string> | { message?: string }>) => {
      const data = error.response?.data;
      const backendMessage = data && typeof data === 'object'
        ? ('senha' in data ? data.senha : data.message)
        : undefined;

      if (backendMessage) {
        setSenhaErro(backendMessage);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { senha } = formData;
    if (!passwordPattern.test(senha)) {
      setSenhaErro(passwordErrorMessage);
      return;
    }
    setSenhaErro('');

    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'senha') {
      setSenhaErro('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/usuarios"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Novo Usuário</h2>
          <p className="text-gray-500">Crie um credencial de acesso ao sistema ERP.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Nome Completo *</label>
                <Input
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Nome do usuário"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">E-mail corporativo *</label>
                <Input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="usuario@empresa.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Senha temporária *</label>
                <Input
                  name="senha"
                  type="password"
                  required
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="••••••••"
                  error={senhaErro}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Cargo / Permissão *</label>
                <div className="w-full">
                  <select
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    <option value="ADMIN">Administrador Geral</option>
                    <option value="GERENTE">Gerente</option>
                    <option value="VENDEDOR">Vendedor</option>
                    <option value="ESTOQUISTA">Estoquista</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" asChild>
                <Link to="/usuarios">Cancelar</Link>
              </Button>
              <Button type="submit" isLoading={mutation.isPending}>
                Criar Acesso
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
