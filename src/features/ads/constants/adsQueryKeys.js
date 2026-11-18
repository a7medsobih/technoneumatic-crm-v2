export const adKeys = {
  all: ["ads"],

  zones: () => [...adKeys.all, "zones"],

  zoneList: (filters) => [...adKeys.zones(), "list", filters],

  availabilityQueries: () => [...adKeys.all, "availability"],

  availability: (filters) => [...adKeys.availabilityQueries(), filters],

  campaigns: () => [...adKeys.all, "campaigns"],

  campaignList: (filters) => [...adKeys.campaigns(), "list", filters],

  campaignDetails: () => [...adKeys.campaigns(), "detail"],

  campaignDetail: (campaignId) => [
    ...adKeys.campaignDetails(),
    String(campaignId),
  ],

  campaignStats: (campaignId) => [
    ...adKeys.campaignDetail(campaignId),
    "stats",
  ],

  bookings: () => [...adKeys.all, "bookings"],

  bookingList: (filters) => [...adKeys.bookings(), "list", filters],
};
