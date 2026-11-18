import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ProductsRepository } from "../api/productsRepository";
import { productKeys } from "../constants/productsQueryKeys";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const response = await ProductsRepository.delete(productId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });
}
