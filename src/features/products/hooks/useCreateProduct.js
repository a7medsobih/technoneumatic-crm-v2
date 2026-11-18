import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ProductsRepository } from "../api/productsRepository";
import { productKeys } from "../constants/productsQueryKeys";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await ProductsRepository.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });
}
