import { useQuery } from "@tanstack/react-query";

import { WalletRepository } from "../api/walletRepository";
import { walletKeys } from "../constants/walletQueryKeys";

export function useWalletTransactions(filters = {}) {
  return useQuery({
    queryKey: walletKeys.transactionList(filters),
    queryFn: () => WalletRepository.getTransactions(filters),
    select: (response) => ({
      items: response.data.data ?? [],
      meta: response.data.meta ?? {},
    }),
  });
}
