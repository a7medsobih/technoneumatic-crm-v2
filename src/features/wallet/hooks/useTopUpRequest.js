import { useQuery } from "@tanstack/react-query";

import { WalletRepository } from "../api/walletRepository";
import { walletKeys } from "../constants/walletQueryKeys";

export function useTopUpRequest(topUpRequestId) {
  return useQuery({
    queryKey: walletKeys.topUpRequestDetail(topUpRequestId),
    queryFn: () => WalletRepository.getTopUpRequestById(topUpRequestId),
    enabled: Boolean(topUpRequestId),
    select: (response) => response.data.data,
  });
}
