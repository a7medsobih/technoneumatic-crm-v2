import { api } from "@/shared/api";

const PRODUCTS_BASE_URL = "/company/products";

export const ProductsRepository = {
  getAll: (params) => api.get(PRODUCTS_BASE_URL, { params }),

  getById: (productId) => api.get(`${PRODUCTS_BASE_URL}/${productId}`),

  create: (data) => api.post(PRODUCTS_BASE_URL, data),

  update: ({ productId, data }) =>
    api.post(`${PRODUCTS_BASE_URL}/${productId}`, data),

  delete: (productId) => api.delete(`${PRODUCTS_BASE_URL}/${productId}`),
};
