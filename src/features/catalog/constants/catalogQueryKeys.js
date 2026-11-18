export const catalogKeys = {
  all: ["catalog"],

  available: () => [...catalogKeys.all, "available"],

  availableList: (filters) => [...catalogKeys.available(), filters],

  imported: () => [...catalogKeys.all, "imported"],

  importedList: (filters) => [...catalogKeys.imported(), filters],
};
