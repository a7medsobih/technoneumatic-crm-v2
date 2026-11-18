import { useMutation, useQueryClient } from "@tanstack/react-query";

import { OrdersRepository } from "../api/ordersRepository";
import { orderKeys } from "../constants/ordersQueryKeys";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, data }) => {
      const response = await OrdersRepository.updateStatus({ orderId, data });
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: orderKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: orderKeys.detail(variables.orderId),
      });
    },
  });
}
