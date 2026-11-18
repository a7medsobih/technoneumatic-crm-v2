import { useQuery } from "@tanstack/react-query";

import { ProductsRepository } from "../api/productsRepository";
import { productKeys } from "../constants/productsQueryKeys";

export function useProduct(productId) {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => ProductsRepository.getById(productId),
    enabled: Boolean(productId),
    select: (response) => response.data.data,
  });
}
