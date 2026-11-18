import { useQuery } from "@tanstack/react-query";

import { WalletRepository } from "../api/walletRepository";
import { walletKeys } from "../constants/walletQueryKeys";

export function useTopUpRequests(filters = {}) {
  return useQuery({
    queryKey: walletKeys.topUpRequestList(filters),
    queryFn: () => WalletRepository.getTopUpRequests(filters),
    select: (response) => ({
      items: response.data.data ?? [],
      meta: response.data.meta ?? {},
    }),
  });
}
