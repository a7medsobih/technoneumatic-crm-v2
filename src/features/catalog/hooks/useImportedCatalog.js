import { useQuery } from "@tanstack/react-query";

import { CatalogRepository } from "../api/catalogRepository";
import { catalogKeys } from "../constants/catalogQueryKeys";

export function useImportedCatalog(filters = {}) {
  return useQuery({
    queryKey: catalogKeys.importedList(filters),
    queryFn: () => CatalogRepository.getMine(filters),
    select: (response) => ({
      items: response.data.data ?? [],
      meta: response.data.meta ?? {},
    }),
  });
}
