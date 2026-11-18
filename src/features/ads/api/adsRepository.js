import { api } from "@/shared/api";

const ADS_BASE_URL = "/company/ads";

export const AdRepository = {
  getZones: (params) => api.get(`${ADS_BASE_URL}/zones`, { params }),

  getAvailability: (params) => api.get(`${ADS_BASE_URL}/availability`, { params }),

  getCampaigns: (params) => api.get(`${ADS_BASE_URL}/campaigns`, { params }),

  getCampaignById: (campaignId) =>
    api.get(`${ADS_BASE_URL}/campaigns/${campaignId}`),

  createCampaign: (data) => api.post(`${ADS_BASE_URL}/campaigns`, data),

  updateCampaign: ({ campaignId, data }) =>
    api.post(`${ADS_BASE_URL}/campaigns/${campaignId}`, data),

  getBookings: (params) => api.get(`${ADS_BASE_URL}/bookings`, { params }),

  bookDays: (data) => api.post(`${ADS_BASE_URL}/bookings`, data),

  getCampaignStats: (campaignId) =>
    api.get(`${ADS_BASE_URL}/campaigns/${campaignId}/stats`),
};
