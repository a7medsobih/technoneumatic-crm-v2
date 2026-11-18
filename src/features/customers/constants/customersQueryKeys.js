export const customerKeys = {
  all: ["customers"],

  lists: () => [...customerKeys.all, "list"],

  list: (filters) => [...customerKeys.lists(), filters],
};
