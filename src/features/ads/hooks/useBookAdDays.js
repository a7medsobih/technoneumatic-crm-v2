import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AdRepository } from "../api/adsRepository";
import { adKeys } from "../constants/adsQueryKeys";

export function useBookAdDays() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await AdRepository.bookDays(data);
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: adKeys.bookings(),
      });

      queryClient.invalidateQueries({
        queryKey: adKeys.availabilityQueries(),
      });

      queryClient.invalidateQueries({
        queryKey: adKeys.campaignStats(variables.ad_campaign_id),
      });
    },
  });
}
