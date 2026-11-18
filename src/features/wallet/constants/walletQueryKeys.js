export const walletKeys = {
  all: ["wallet"],

  transactions: () => [...walletKeys.all, "transactions"],

  transactionList: (filters) => [...walletKeys.transactions(), filters],

  topups: () => [...walletKeys.all, "topups"],

  topupList: (filters) => [...walletKeys.topups(), filters],

  topUpRequests: () => [...walletKeys.all, "topUpRequests"],

  topUpRequestList: (filters) => [...walletKeys.topUpRequests(), filters],

  topUpRequestDetails: () => [...walletKeys.topUpRequests(), "detail"],

  topUpRequestDetail: (topUpRequestId) => [
    ...walletKeys.topUpRequestDetails(),
    String(topUpRequestId),
  ],
};
