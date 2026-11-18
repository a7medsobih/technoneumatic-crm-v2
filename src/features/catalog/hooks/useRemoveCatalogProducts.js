import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CatalogRepository } from "../api/catalogRepository";
import { catalogKeys } from "../constants/catalogQueryKeys";

export function useRemoveCatalogProducts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await CatalogRepository.removeProducts(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: catalogKeys.all,
      });
    },
  });
}
