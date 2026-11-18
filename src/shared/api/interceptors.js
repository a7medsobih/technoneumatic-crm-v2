import { authStorage } from "./authStorage";
import { refreshToken } from "./refreshToken";

const ENABLE_AUTH_REFRESH = import.meta.env.VITE_ENABLE_AUTH_REFRESH === "true";

function handleRequest(config) {
  const token = authStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else if (config.data && typeof config.data === "object") {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
}

function handleResponseError(api) {
  return async (error) => {
    const originalRequest = error.config;

    if (
      ENABLE_AUTH_REFRESH &&
      error?.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return refreshToken(originalRequest, api);
    }

    return Promise.reject(error);
  };
}

export function applyInterceptors(api) {
  api.interceptors.request.use(handleRequest);
  api.interceptors.response.use((res) => res, handleResponseError(api));
}
