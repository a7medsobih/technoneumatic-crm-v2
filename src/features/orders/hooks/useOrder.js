import { useQuery } from "@tanstack/react-query";

import { OrdersRepository } from "../api/ordersRepository";
import { orderKeys } from "../constants/ordersQueryKeys";

export function useOrder(orderId) {
  return useQuery({
    queryKey: orderKeys.detail(orderId),
    queryFn: () => OrdersRepository.getById(orderId),
    enabled: Boolean(orderId),
    select: (response) => response.data.data,
  });
}
