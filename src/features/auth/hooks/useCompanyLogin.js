import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { authStorage } from "@/shared/api";

import { AuthRepository } from "../api/authRepository";
import { authKeys } from "../constants/authQueryKeys";
import { setCredentials } from "../store/authSlice";

function getAuthToken(data) {
  return (
    data?.token ||
    data?.accessToken ||
    data?.data?.token ||
    data?.data?.accessToken ||
    null
  );
}

function getCompany(data) {
  return data?.company || data?.data?.company || data?.data || null;
}

export function useCompanyLogin() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await AuthRepository.login(credentials);
      return response.data;
    },
    onSuccess: (data) => {
      const token = getAuthToken(data);
      const company = getCompany(data);

      if (token) {
        authStorage.set(token);
        dispatch(setCredentials({ token, company }));
      }

      queryClient.invalidateQueries({
        queryKey: authKeys.company(),
      });
    },
  });
}
