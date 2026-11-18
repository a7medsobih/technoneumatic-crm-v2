import axios from "axios";

import { API_URL } from "./endpoints";
import { applyInterceptors } from "./interceptors";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
  },
});

applyInterceptors(api);

export default api;
