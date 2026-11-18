import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AdRepository } from "../api/adsRepository";
import { adKeys } from "../constants/adsQueryKeys";

export function useCreateAdCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await AdRepository.createCampaign(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adKeys.campaigns(),
      });
    },
  });
}
