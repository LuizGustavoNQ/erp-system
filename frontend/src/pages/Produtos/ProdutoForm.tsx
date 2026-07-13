import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { ArrowLeft } from 'lucide-react';

export function ProdutoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidadeEstoque: '0',
    ativo: true,
  });

  // O backend expõe buscar um produto específico? Sim, mas não notei /produtos/{id} explícito no GET,
  // mas assumindo REST padrão e listagem no front, se o endpoint faltar a gente resolve localmente, 
  // mas foi verificado na controller: listagem GET e PUT /produtos/{id}. Mas faltava GET /produtos/{id}?
  // Observação: Na ProdutoController visualizada anteriormente, não havia um GET /produtos/{id} explícito listado, apenas GET. 
  // Vamos buscar na listagem todos os produtos e filtrar localmente como fallback para o edit.
  
  const { data: produtos } = useQuery({
    queryKey: ['produtos'],
    queryFn: async () => {
      const { data } = await api.get('/produtos');
      return data as any[];
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (isEditing && produtos) {
      const produto = produtos.find(p => p.id === Number(id));
      if (produto) {
        setFormData({
          nome: produto.nome || '',
          descricao: produto.descricao || '',
          preco: produto.preco.toString(),
          quantidadeEstoque: produto.quantidadeEstoque.toString(),
          ativo: produto.ativo,
        });
      }
    }
  }, [produtos, id, isEditing]);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const payload = {
        ...data,
        preco: Number(data.preco),
        quantidadeEstoque: Number(data.quantidadeEstoque),
      };
      if (isEditing) {
        return api.put(`/produtos/${id}`, payload);
      }
      return api.post('/produtos', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos'] });
      navigate('/produtos');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/produtos"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {isEditing ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <p className="text-gray-500">Dados do produto e informações de estoque.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-900">Nome do Produto *</label>
                <Input
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Nome"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Preço de Venda (R$) *</label>
                <Input
                  name="preco"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={formData.preco}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Quantidade em Estoque *</label>
                <Input
                  name="quantidadeEstoque"
                  type="number"
                  min="0"
                  step="1"
                  required
                  value={formData.quantidadeEstoque}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-900">Descrição</label>
                <Input
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  placeholder="Detalhes adicionais do produto..."
                />
              </div>
              {isEditing && (
                 <div className="flex items-center gap-2 md:col-span-2 mt-2">
                  <input
                    type="checkbox"
                    id="ativo"
                    name="ativo"
                    checked={formData.ativo}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                  />
                  <label htmlFor="ativo" className="text-sm font-medium text-gray-900">
                    Produto ativo (disponível para venda)
                  </label>
                </div>
              )}
            </div>

            {mutation.isError && (
              <p className="text-sm text-red-500">Ocorreu um erro ao salvar o produto.</p>
            )}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" asChild>
                <Link to="/produtos">Cancelar</Link>
              </Button>
              <Button type="submit" isLoading={mutation.isPending}>
                Salvar Produto
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
