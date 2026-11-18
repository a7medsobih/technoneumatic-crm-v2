import { api } from "@/shared/api";

export const AuthRepository = {
  login: (data) => api.post("/company/login", data),

  logout: () => api.post("/company/logout"),

  getCompany: () => api.get("/company/me"),
};
