import { useQuery } from "@tanstack/react-query";

import { AdRepository } from "../api/adsRepository";
import { adKeys } from "../constants/adsQueryKeys";

export function useAdAvailability(filters = {}) {
  return useQuery({
    queryKey: adKeys.availability(filters),
    queryFn: () => AdRepository.getAvailability(filters),
    enabled: Boolean(filters.ad_zone_id && filters.from && filters.to),
    select: (response) => response.data.data,
  });
}
