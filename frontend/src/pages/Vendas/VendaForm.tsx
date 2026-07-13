import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { useRealizarVenda } from '../../hooks/useVendas';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { ArrowLeft, Trash2, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { Cliente, Produto } from '../../types/venda';

export function VendaForm() {
  const navigate = useNavigate();
  const realizarVenda = useRealizarVenda();

  const [clienteId, setClienteId] = useState<number | ''>('');
  const [produtoSelecionado, setProdutoSelecionado] = useState<number | ''>('');
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState<number>(1);
  const [itensVenda, setItensVenda] = useState<Array<{ produto: Produto; quantidade: number; subtotal: number }>>([]);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch Clientes
  const { data: clientes = [], isLoading: isLoadingClientes } = useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      const { data } = await api.get('/clientes');
      return data as Cliente[];
    }
  });

  // Fetch Produtos
  const { data: produtos = [], isLoading: isLoadingProdutos } = useQuery({
    queryKey: ['produtos'],
    queryFn: async () => {
      const { data } = await api.get('/produtos');
      return data as Produto[];
    }
  });

  const handleAdicionarItem = () => {
    setErrorMsg('');
    if (!produtoSelecionado) return setErrorMsg('Selecione um produto.');
    if (quantidadeSelecionada <= 0) return setErrorMsg('A quantidade deve ser maior que zero.');

    const produto = produtos.find(p => p.id === Number(produtoSelecionado));
    if (!produto) return;

    if (produto.quantidadeEstoque < quantidadeSelecionada) {
      return setErrorMsg(`Estoque insuficiente. Disponível: ${produto.quantidadeEstoque}`);
    }

    const itemExistente = itensVenda.find(item => item.produto.id === produto.id);
    if (itemExistente) {
      const novaQuantidade = itemExistente.quantidade + Number(quantidadeSelecionada);
      if (produto.quantidadeEstoque < novaQuantidade) {
        return setErrorMsg(`Estoque insuficiente para a quantidade total (${novaQuantidade}). Disponível: ${produto.quantidadeEstoque}`);
      }
      
      setItensVenda(itensVenda.map(item => 
        item.produto.id === produto.id 
          ? { ...item, quantidade: novaQuantidade, subtotal: novaQuantidade * item.produto.preco } 
          : item
      ));
    } else {
      setItensVenda([...itensVenda, {
        produto,
        quantidade: Number(quantidadeSelecionada),
        subtotal: Number(quantidadeSelecionada) * produto.preco
      }]);
    }

    setProdutoSelecionado('');
    setQuantidadeSelecionada(1);
  };

  const handleRemoverItem = (produtoId: number) => {
    setItensVenda(itensVenda.filter(item => item.produto.id !== produtoId));
  };

  const calcularTotal = () => {
    return itensVenda.reduce((acc, item) => acc + item.subtotal, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!clienteId) return setErrorMsg('Selecione um cliente.');
    if (itensVenda.length === 0) return setErrorMsg('Adicione pelo menos um item à venda.');

    realizarVenda.mutate({
      clienteId: Number(clienteId),
      itens: itensVenda.map(item => ({
        produtoId: item.produto.id,
        quantidade: item.quantidade
      }))
    }, {
      onSuccess: (data) => {
        navigate(`/vendas/${data.id}`);
      },
      onError: (err: any) => {
        setErrorMsg(err.response?.data?.message || 'Erro ao realizar venda.');
      }
    });
  };

  const formatSelectClass = "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/vendas"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Nova Venda</h2>
          <p className="text-gray-500">Registre uma nova transação comercial.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados Básicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Selecione o Cliente *</label>
                <select 
                  className={formatSelectClass}
                  value={clienteId}
                  onChange={(e) => setClienteId(e.target.value === '' ? '' : Number(e.target.value))}
                  disabled={isLoadingClientes}
                >
                  <option value="">Selecione...</option>
                  {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>{cliente.nome} (CPF/CNPJ: {cliente.cpfCnpj || '-'})</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adicionar Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium text-gray-900">Produto</label>
                  <select 
                    className={formatSelectClass}
                    value={produtoSelecionado}
                    onChange={(e) => setProdutoSelecionado(e.target.value === '' ? '' : Number(e.target.value))}
                    disabled={isLoadingProdutos}
                  >
                    <option value="">Selecione o produto...</option>
                    {produtos.filter(p => p.ativo).map(produto => (
                      <option key={produto.id} value={produto.id}>
                        {produto.nome} - {formatCurrency(produto.preco)} (Estoque: {produto.quantidadeEstoque})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-24 space-y-2">
                  <label className="text-sm font-medium text-gray-900">Qtd.</label>
                  <Input 
                    type="number" 
                    min="1" 
                    value={quantidadeSelecionada} 
                    onChange={(e) => setQuantidadeSelecionada(Number(e.target.value))} 
                  />
                </div>
                <Button type="button" onClick={handleAdicionarItem} variant="secondary">
                  <Plus className="h-4 w-4 mr-2" /> Adicionar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Itens da Venda</CardTitle>
            </CardHeader>
            <CardContent>
              {itensVenda.length === 0 ? (
                <div className="text-center py-6 text-gray-500 text-sm">
                  Nenhum item adicionado à venda.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead className="text-right">Qtd.</TableHead>
                      <TableHead className="text-right">Unid.</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itensVenda.map((item) => (
                      <TableRow key={item.produto.id}>
                        <TableCell className="font-medium">{item.produto.nome}</TableCell>
                        <TableCell className="text-right">{item.quantidade}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.produto.preco)}</TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(item.subtotal)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleRemoverItem(item.produto.id)}>
                            <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo da Venda</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <dt className="text-gray-500">Total de Itens:</dt>
                  <dd className="font-medium">{itensVenda.reduce((acc, item) => acc + item.quantidade, 0)}</dd>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <dt className="text-base font-semibold text-gray-900">Total:</dt>
                  <dd className="text-2xl font-bold text-green-700">{formatCurrency(calcularTotal())}</dd>
                </div>
              </dl>

              {errorMsg && (
                <div className="mt-4 flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p>{errorMsg}</p>
                </div>
              )}

              {realizarVenda.isSuccess && (
                <div className="mt-4 flex items-start gap-2 text-sm text-green-700 bg-green-50 p-3 rounded-md">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <p>Venda realizada com sucesso!</p>
                </div>
              )}

              <Button 
                className="w-full mt-6" 
                size="lg" 
                onClick={handleSubmit}
                disabled={itensVenda.length === 0 || !clienteId || realizarVenda.isPending}
              >
                {realizarVenda.isPending ? 'Finalizando...' : 'Finalizar Venda'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
