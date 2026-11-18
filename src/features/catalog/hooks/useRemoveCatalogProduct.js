import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CatalogRepository } from "../api/catalogRepository";
import { catalogKeys } from "../constants/catalogQueryKeys";

export function useRemoveCatalogProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (supplierProductId) => {
      const response = await CatalogRepository.removeProduct(supplierProductId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: catalogKeys.all,
      });
    },
  });
}
