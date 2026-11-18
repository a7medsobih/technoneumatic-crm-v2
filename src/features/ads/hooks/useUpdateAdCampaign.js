import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AdRepository } from "../api/adsRepository";
import { adKeys } from "../constants/adsQueryKeys";

export function useUpdateAdCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ campaignId, data }) => {
      const response = await AdRepository.updateCampaign({ campaignId, data });
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: adKeys.campaigns(),
      });

      queryClient.invalidateQueries({
        queryKey: adKeys.campaignDetail(variables.campaignId),
      });
    },
  });
}
