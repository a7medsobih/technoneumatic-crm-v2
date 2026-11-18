import { useQuery } from "@tanstack/react-query";

import { CatalogRepository } from "../api/catalogRepository";
import { catalogKeys } from "../constants/catalogQueryKeys";

export function useAvailableCatalog(filters = {}) {
  return useQuery({
    queryKey: catalogKeys.availableList(filters),
    queryFn: () => CatalogRepository.getAvailable(filters),
    select: (response) => ({
      items: response.data.data ?? [],
      meta: response.data.meta ?? {},
    }),
  });
}
