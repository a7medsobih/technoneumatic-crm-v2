import { useQuery } from "@tanstack/react-query";

import { AdRepository } from "../api/adsRepository";
import { adKeys } from "../constants/adsQueryKeys";

export function useAdCampaign(campaignId) {
  return useQuery({
    queryKey: adKeys.campaignDetail(campaignId),
    queryFn: () => AdRepository.getCampaignById(campaignId),
    enabled: Boolean(campaignId),
    select: (response) => response.data.data,
  });
}
