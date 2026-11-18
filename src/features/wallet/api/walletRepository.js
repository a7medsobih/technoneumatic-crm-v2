import { api } from "@/shared/api";

const WALLET_BASE_URL = "/company/wallet";
const TOP_UP_REQUESTS_URL = `${WALLET_BASE_URL}/top-up-requests`;

export const WalletRepository = {
  getTransactions: (params) =>
    api.get(`${WALLET_BASE_URL}/transactions`, { params }),

  createWithdrawal: (data) =>
    api.post(`${WALLET_BASE_URL}/withdrawals`, data),

  getTopups: (params) => api.get(`${WALLET_BASE_URL}/topups`, { params }),

  createTopup: (data) => api.post(`${WALLET_BASE_URL}/topups`, data),

  getTopUpRequests: (params) => api.get(TOP_UP_REQUESTS_URL, { params }),

  getTopUpRequestById: (topUpRequestId) =>
    api.get(`${TOP_UP_REQUESTS_URL}/${topUpRequestId}`),

  createTopUpRequest: (data) => api.post(TOP_UP_REQUESTS_URL, data),
};
