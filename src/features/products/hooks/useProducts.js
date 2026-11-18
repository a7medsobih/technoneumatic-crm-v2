import { useQuery } from "@tanstack/react-query";

import { ProductsRepository } from "../api/productsRepository";
import { productKeys } from "../constants/productsQueryKeys";

export function useProducts(filters = {}) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => ProductsRepository.getAll(filters),
    select: (response) => ({
      items: response.data.data ?? [],
      meta: response.data.meta ?? {},
    }),
  });
}
