export const productKeys = {
  all: ["products"],

  lists: () => [...productKeys.all, "list"],

  list: (filters) => [...productKeys.lists(), filters],

  details: () => [...productKeys.all, "detail"],

  detail: (productId) => [...productKeys.details(), String(productId)],
};
