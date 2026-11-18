import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
} from "lucide-react";

import { cn } from "@/shared/utils/cn";

import {
  ACTIONS_COL_CLASSES,
  CELL_PADDING,
  alignClasses,
  alignFlexClasses,
  tableStyles,
} from "./tableConstants";
import {
  getCellValue,
  getColumnAlign,
  getColumnKey,
  isActionsColumn,
} from "./tableUtils";

function TableCellInner({ align, variant = "default", children }) {
  if (variant === "actions") {
    return (
      <div
        className={cn(
          "flex w-max max-w-none shrink-0 items-center gap-2",
          alignFlexClasses[align],
        )}
      >
        {children}
      </div>
    );
  }

  if (variant === "header-sortable") {
    return (
      <div
        className={cn(
          "flex w-full min-w-0 items-center gap-1",
          alignFlexClasses[align],
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn("flex w-full min-w-0 items-center", alignFlexClasses[align])}
    >
      {children}
    </div>
  );
}

export function TableHeaderCell({
  column,
  columnIndex,
  sortColumn,
  sortDirection,
  onSort,
}) {
  const columnKey = getColumnKey(column, columnIndex);
  const align = getColumnAlign(column);
  const isActions = isActionsColumn(column);
  const isSorted = sortColumn === columnKey;
  const isSortable = column.sortable && typeof column.accessor !== "function";

  return (
    <th
      scope="col"
      className={cn(
        CELL_PADDING,
        tableStyles.headerCell,
        alignClasses[align],
        isActions && !column.width && ACTIONS_COL_CLASSES,
        isSortable && tableStyles.headerSortable,
        column.className,
      )}
      onClick={isSortable ? () => onSort(columnIndex) : undefined}
      aria-sort={
        isSortable && isSorted
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : undefined
      }
    >
      {isSortable ? (
        <TableCellInner align={align} variant="header-sortable">
          <span className="min-w-0 truncate">{column.header}</span>
          <span className={tableStyles.sortIcon} aria-hidden>
            {isSorted ? (
              sortDirection === "asc" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )
            ) : (
              <ChevronsUpDown size={16} />
            )}
          </span>
        </TableCellInner>
      ) : (
        <TableCellInner align={align} variant={isActions ? "actions" : "default"}>
          {column.header}
        </TableCellInner>
      )}
    </th>
  );
}

export function TableDataCell({ column, item }) {
  const align = getColumnAlign(column);
  const isActions = isActionsColumn(column);

  return (
    <td
      className={cn(
        CELL_PADDING,
        tableStyles.bodyCell,
        alignClasses[align],
        isActions && !column.width && ACTIONS_COL_CLASSES,
        column.className,
      )}
    >
      <TableCellInner align={align} variant={isActions ? "actions" : "default"}>
        {getCellValue(column, item)}
      </TableCellInner>
    </td>
  );
}

export function TableCheckboxCell({
  checked,
  onChange,
  label,
  isHeader = false,
  stopPropagation = false,
}) {
  const Tag = isHeader ? "th" : "td";

  return (
    <Tag
      scope={isHeader ? "col" : undefined}
      className={cn(
        CELL_PADDING,
        "w-12 min-w-12 max-w-12 align-middle text-center",
        isHeader && tableStyles.headerCell,
      )}
    >
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => {
            if (stopPropagation) event.stopPropagation();
            onChange(event.target.checked);
          }}
          onClick={(event) => stopPropagation && event.stopPropagation()}
          className={tableStyles.checkbox}
          aria-label={label}
        />
      </div>
    </Tag>
  );
}

export function TableRow({ selected, clickable, onClick, children }) {
  return (
    <tr
      className={cn(
        tableStyles.bodyRow,
        selected && tableStyles.bodyRowSelected,
        clickable && tableStyles.bodyRowClickable,
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

/** @deprecated Prefer `Pagination` from `@/shared/components/pagination`. */
export { Pagination as TablePagination } from "@/shared/components/pagination";
