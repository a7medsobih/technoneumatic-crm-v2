import { useMutation, useQueryClient } from "@tanstack/react-query";

import { OrdersRepository } from "../api/ordersRepository";
import { orderKeys } from "../constants/ordersQueryKeys";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await OrdersRepository.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orderKeys.all,
      });
    },
  });
}
