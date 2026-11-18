import { api } from "@/shared/api";

const CUSTOMERS_BASE_URL = "/company/customers";

export const CustomersRepository = {
  getAll: (params) => api.get(CUSTOMERS_BASE_URL, { params }),
};
