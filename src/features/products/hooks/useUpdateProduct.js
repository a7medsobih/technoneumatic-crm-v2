import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ProductsRepository } from "../api/productsRepository";
import { productKeys } from "../constants/productsQueryKeys";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, data }) => {
      const response = await ProductsRepository.update({ productId, data });
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.productId),
      });
    },
  });
}
