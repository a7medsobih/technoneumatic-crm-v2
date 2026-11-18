import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CatalogRepository } from "../api/catalogRepository";
import { catalogKeys } from "../constants/catalogQueryKeys";

export function useAddCatalogProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (supplierProductId) => {
      const response = await CatalogRepository.addProduct(supplierProductId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: catalogKeys.all,
      });
    },
  });
}
