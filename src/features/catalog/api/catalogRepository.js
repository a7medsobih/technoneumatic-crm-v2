import { api } from "@/shared/api";

const CATALOG_BASE_URL = "/company/catalog";

export const CatalogRepository = {
  getAvailable: (params) =>
    api.get(`${CATALOG_BASE_URL}/available`, { params }),

  getMine: (params) => api.get(`${CATALOG_BASE_URL}/mine`, { params }),

  addProducts: (data) => api.post(`${CATALOG_BASE_URL}/add`, data),

  removeProducts: (data) => api.post(`${CATALOG_BASE_URL}/remove`, data),

  addProduct: (supplierProductId) =>
    api.post(`${CATALOG_BASE_URL}/${supplierProductId}`),

  removeProduct: (supplierProductId) =>
    api.delete(`${CATALOG_BASE_URL}/${supplierProductId}`),
};
