import { useQuery } from "@tanstack/react-query";

import { AdRepository } from "../api/adsRepository";
import { adKeys } from "../constants/adsQueryKeys";

export function useAdCampaigns(filters = {}) {
  return useQuery({
    queryKey: adKeys.campaignList(filters),
    queryFn: () => AdRepository.getCampaigns(filters),
    select: (response) => ({
      items: response.data.data ?? [],
      meta: response.data.meta ?? {},
    }),
  });
}
