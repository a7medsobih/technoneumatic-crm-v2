import { useQuery } from "@tanstack/react-query";

import { AdRepository } from "../api/adsRepository";
import { adKeys } from "../constants/adsQueryKeys";

export function useAdZones(filters = {}) {
  return useQuery({
    queryKey: adKeys.zoneList(filters),
    queryFn: () => AdRepository.getZones(filters),
    select: (response) => ({
      items: response.data.data ?? [],
      meta: response.data.meta ?? {},
    }),
  });
}
