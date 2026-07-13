import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { ArrowLeft } from 'lucide-react';

export function ClienteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    nome: '',
    cpfCnpj: '',
    telefone: '',
    email: '',
    endereco: '',
  });

  const { data: cliente } = useQuery({
    queryKey: ['cliente', id],
    queryFn: async () => {
      const { data } = await api.get(`/clientes/${id}`);
      return data;
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        nome: cliente.nome || '',
        cpfCnpj: cliente.cpfCnpj || '',
        telefone: cliente.telefone || '',
        email: cliente.email || '',
        endereco: cliente.endereco || '',
      });
    }
  }, [cliente]);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (isEditing) {
        return api.put(`/clientes/${id}`, data);
      }
      return api.post('/clientes', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      navigate('/clientes');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/clientes"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {isEditing ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>
          <p className="text-gray-500">Preencha os dados do cliente abaixo.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Nome / Razão Social *</label>
                <Input
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Nome do cliente"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">CPF / CNPJ</label>
                <Input
                  name="cpfCnpj"
                  value={formData.cpfCnpj}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">E-mail</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Telefone</label>
                <Input
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-900">Endereço Completo</label>
                <Input
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  placeholder="Rua, Número, Bairro, Cidade - Estado"
                />
              </div>
            </div>

            {mutation.isError && (
              <p className="text-sm text-red-500">Ocorreu um erro ao salvar os dados.</p>
            )}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" asChild>
                <Link to="/clientes">Cancelar</Link>
              </Button>
              <Button type="submit" isLoading={mutation.isPending}>
                Salvar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
