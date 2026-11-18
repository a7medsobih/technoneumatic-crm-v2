export const orderKeys = {
  all: ["orders"],

  lists: () => [...orderKeys.all, "list"],

  list: (filters) => [...orderKeys.lists(), filters],

  details: () => [...orderKeys.all, "detail"],

  detail: (orderId) => [...orderKeys.details(), String(orderId)],
};
