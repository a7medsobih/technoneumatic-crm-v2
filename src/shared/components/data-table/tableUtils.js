import { ACTIONS_COL_CLASSES } from "./tableConstants";

export function getColumnKey(column, index) {
  return typeof column.accessor === "string" ? column.accessor : `col-${index}`;
}

export function isActionsColumn(column) {
  return column.variant === "actions";
}

export function getColumnAlign(column) {
  if (column.align) return column.align;
  if (isActionsColumn(column)) return "center";
  return "start";
}

export function getColWidth(column) {
  if (column.width) return column.width;
  if (isActionsColumn(column)) return ACTIONS_COL_CLASSES;
  return undefined;
}

export function getCellValue(column, item) {
  return typeof column.accessor === "function"
    ? column.accessor(item)
    : item[column.accessor];
}

export function getRowKey(item, index, keyExtractor) {
  if (keyExtractor) return keyExtractor(item);
  if (item.id !== undefined) return item.id;
  return index;
}

export function filterTableData(data, filterValues) {
  if (!filterValues || Object.keys(filterValues).length === 0) {
    return data;
  }

  return data.filter((item) =>
    Object.entries(filterValues).every(([key, value]) => {
      if (
        !value ||
        value === "" ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" &&
          value !== null &&
          !("start" in value || "end" in value || "min" in value || "max" in value))
      ) {
        return true;
      }

      const itemValue = item[key];

      if (typeof value === "string") {
        return String(itemValue).toLowerCase().includes(value.toLowerCase());
      }

      if (typeof value === "object" && value !== null) {
        if ("start" in value || "end" in value) {
          const itemDate = new Date(itemValue);
          if (Number.isNaN(itemDate.getTime())) return false;

          const startDate = value.start ? new Date(value.start) : undefined;
          const endDate = value.end ? new Date(value.end) : undefined;

          if (startDate && !Number.isNaN(startDate.getTime()) && itemDate < startDate) {
            return false;
          }

          if (endDate && !Number.isNaN(endDate.getTime())) {
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            if (itemDate > end) return false;
          }

          return true;
        }

        if ("min" in value || "max" in value) {
          const num = Number(itemValue);
          if (Number.isNaN(num)) return false;

          const min =
            value.min !== undefined && value.min !== ""
              ? Number(value.min)
              : undefined;
          const max =
            value.max !== undefined && value.max !== ""
              ? Number(value.max)
              : undefined;

          if (min !== undefined && num < min) return false;
          if (max !== undefined && num > max) return false;
          return true;
        }
      }

      return String(itemValue) === String(value);
    }),
  );
}

export function sortTableData(data, columns, sortColumn, sortDirection) {
  if (!sortColumn || !sortDirection) return data;

  const columnIndex = columns.findIndex(
    (col, index) => getColumnKey(col, index) === sortColumn,
  );
  const column = columns[columnIndex];

  if (!column || typeof column.accessor === "function") return data;

  return [...data].sort((a, b) => {
    const aValue = a[column.accessor];
    const bValue = b[column.accessor];

    if (aValue === bValue) return 0;

    const comparison = aValue < bValue ? -1 : 1;
    return sortDirection === "asc" ? comparison : -comparison;
  });
}

export function getNextSortState(sortColumn, sortDirection, columnKey) {
  if (sortColumn !== columnKey) {
    return { sortColumn: columnKey, sortDirection: "asc" };
  }

  if (sortDirection === "asc") {
    return { sortColumn: columnKey, sortDirection: "desc" };
  }

  if (sortDirection === "desc") {
    return { sortColumn: null, sortDirection: null };
  }

  return { sortColumn: columnKey, sortDirection: "asc" };
}
