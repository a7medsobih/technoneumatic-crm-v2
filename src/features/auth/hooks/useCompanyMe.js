import { useQuery } from "@tanstack/react-query";

import { authStorage } from "@/shared/api";

import { AuthRepository } from "../api/authRepository";
import { authKeys } from "../constants/authQueryKeys";

export function useCompanyMe() {
  return useQuery({
    queryKey: authKeys.company(),
    queryFn: () => AuthRepository.getCompany(),
    enabled: Boolean(authStorage.get()),
    select: (response) => response.data.data ?? response.data,
  });
}
