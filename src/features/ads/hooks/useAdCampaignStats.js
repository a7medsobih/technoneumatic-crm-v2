import { useQuery } from "@tanstack/react-query";

import { AdRepository } from "../api/adsRepository";
import { adKeys } from "../constants/adsQueryKeys";

export function useAdCampaignStats(campaignId) {
  return useQuery({
    queryKey: adKeys.campaignStats(campaignId),
    queryFn: () => AdRepository.getCampaignStats(campaignId),
    enabled: Boolean(campaignId),
    select: (response) => response.data.data ?? response.data,
  });
}
