import { useQuery } from "@tanstack/react-query";

import { OrdersRepository } from "../api/ordersRepository";
import { orderKeys } from "../constants/ordersQueryKeys";

export function useOrders(filters = {}) {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: () => OrdersRepository.getAll(filters),
    select: (response) => ({
      items: response.data.data ?? [],
      meta: response.data.meta ?? {},
    }),
  });
}
