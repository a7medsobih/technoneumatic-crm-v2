import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { authStorage } from "@/shared/api";

import { AuthRepository } from "../api/authRepository";
import { authKeys } from "../constants/authQueryKeys";
import { clearCredentials } from "../store/authSlice";

export function useCompanyLogout() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async () => {
      const response = await AuthRepository.logout();
      return response.data;
    },
    onSettled: () => {
      authStorage.remove();
      dispatch(clearCredentials());

      queryClient.removeQueries({
        queryKey: authKeys.all,
      });
    },
  });
}
