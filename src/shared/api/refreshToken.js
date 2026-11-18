import axios from "axios";

import { API_ENDPOINTS, API_URL } from "./endpoints";
import { authStorage } from "./authStorage";

export async function refreshToken(originalRequest, client) {
  try {
    const res = await axios.post(
      `${API_URL}${API_ENDPOINTS.auth.refresh}`,
      {},
      { withCredentials: true },
    );

    const newToken = res.data?.accessToken;
    if (!newToken) throw new Error("No token");

    authStorage.set(newToken);
    originalRequest.headers.Authorization = `Bearer ${newToken}`;

    return client(originalRequest);
  } catch (err) {
    authStorage.remove();
    return Promise.reject(err);
  }
}
