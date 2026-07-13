export type StatusVenda = 'PENDENTE' | 'FINALIZADA' | 'CANCELADA';

export interface Cliente {
  id: number;
  nome: string;
  email?: string;
  cpfCnpj?: string;
  telefone?: string;
}

export interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  quantidadeEstoque: number;
  ativo: boolean;
}

export interface ItemVenda {
  id?: number;
  produto: Produto;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface Venda {
  id: number;
  dataVenda: string;
  valorTotal: number;
  status: StatusVenda;
  cliente?: Cliente;
  vendedor?: any;
  itens: ItemVenda[];
}

export interface ItemVendaDTO {
  produtoId: number;
  quantidade: number;
}

export interface VendaDTO {
  clienteId: number;
  itens: ItemVendaDTO[];
}
