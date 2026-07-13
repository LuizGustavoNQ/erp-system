import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vendasService } from '../services/vendasService';
import type { VendaDTO } from '../types/venda';

export function useVendas() {
  return useQuery({
    queryKey: ['vendas'],
    queryFn: vendasService.listarTodas,
  });
}

export function useVenda(id?: number) {
  return useQuery({
    queryKey: ['vendas', id],
    queryFn: () => (id ? vendasService.buscarPorId(id) : Promise.reject('ID não fornecido')),
    enabled: !!id,
  });
}

export function useRealizarVenda() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: VendaDTO) => vendasService.realizarVenda(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendas'] });
    },
  });
}
