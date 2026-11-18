import { api } from "@/shared/api";

const ORDERS_BASE_URL = "/company/orders";

export const OrdersRepository = {
  getAll: (params) => api.get(ORDERS_BASE_URL, { params }),

  getById: (orderId) => api.get(`${ORDERS_BASE_URL}/${orderId}`),

  create: (data) => api.post(ORDERS_BASE_URL, data),

  updateStatus: ({ orderId, data }) =>
    api.patch(`${ORDERS_BASE_URL}/${orderId}/status`, data),
};
