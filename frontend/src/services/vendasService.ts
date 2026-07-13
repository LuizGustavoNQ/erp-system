import { api } from '../lib/api';
import type { Venda, VendaDTO } from '../types/venda';

export const vendasService = {
  listarTodas: async (): Promise<Venda[]> => {
    const { data } = await api.get('/vendas');
    return data;
  },

  buscarPorId: async (id: number): Promise<Venda> => {
    const { data } = await api.get(`/vendas/${id}`);
    return data;
  },

  realizarVenda: async (dto: VendaDTO): Promise<Venda> => {
    const { data } = await api.post('/vendas', dto);
    return data;
  },
};
