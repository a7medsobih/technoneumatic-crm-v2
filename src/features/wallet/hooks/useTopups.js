import { useQuery } from "@tanstack/react-query";

import { WalletRepository } from "../api/walletRepository";
import { walletKeys } from "../constants/walletQueryKeys";

export function useTopups(filters = {}) {
  return useQuery({
    queryKey: walletKeys.topupList(filters),
    queryFn: () => WalletRepository.getTopups(filters),
    select: (response) => ({
      items: response.data.data ?? [],
      meta: response.data.meta ?? {},
    }),
  });
}
