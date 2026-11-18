import { useMutation, useQueryClient } from "@tanstack/react-query";

import { WalletRepository } from "../api/walletRepository";
import { walletKeys } from "../constants/walletQueryKeys";

export function useCreateTopup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await WalletRepository.createTopup(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: walletKeys.topups(),
      });

      queryClient.invalidateQueries({
        queryKey: walletKeys.topUpRequests(),
      });
    },
  });
}
