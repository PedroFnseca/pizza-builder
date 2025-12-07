import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IngredientsService, PizzasService, SizesService } from '../../service';
import { CACHE_TIMES } from './queryClient';

export const queryKeys = {
  ingredients: ['ingredients'],
  sizes: ['sizes'],
  pizzas: ['pizzas'],
  pizzasList: (filters) => ['pizzas', 'list', filters],
  pizza: (id) => ['pizzas', 'detail', id],
};

export const useIngredientsQuery = () =>
  useQuery({
    queryKey: queryKeys.ingredients,
    queryFn: () => IngredientsService.list(),
    staleTime: CACHE_TIMES.longStaleTime,
    gcTime: CACHE_TIMES.longGcTime,
  });

export const useSizesQuery = () =>
  useQuery({
    queryKey: queryKeys.sizes,
    queryFn: () => SizesService.list(),
    staleTime: CACHE_TIMES.longStaleTime,
    gcTime: CACHE_TIMES.longGcTime,
  });

export const usePizzasQuery = (filters, options = {}) =>
  useQuery({
    queryKey: queryKeys.pizzasList(filters),
    queryFn: () => PizzasService.list(filters),
    staleTime: CACHE_TIMES.shortStaleTime,
    gcTime: CACHE_TIMES.shortGcTime,
    keepPreviousData: true,
    ...options,
  });

export const usePizzaQuery = (id, options = {}) =>
  useQuery({
    queryKey: queryKeys.pizza(id),
    queryFn: () => PizzasService.get(id),
    staleTime: CACHE_TIMES.shortStaleTime,
    gcTime: CACHE_TIMES.shortGcTime,
    enabled: Boolean(id),
    ...options,
  });

export const useCreatePizzaMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => PizzasService.create(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pizzas });
      if (data?.id) {
        queryClient.setQueryData(queryKeys.pizza(data.id), data);
      }
    },
  });
};
