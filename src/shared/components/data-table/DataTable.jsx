import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { CHECKBOX_COL_WIDTH, tableStyles } from "./tableConstants";
import { Pagination } from "@/shared/components/pagination";

import {
  TableCheckboxCell,
  TableDataCell,
  TableHeaderCell,
  TableRow,
} from "./TableParts";
import {
  filterTableData,
  getColWidth,
  getNextSortState,
  getRowKey,
  sortTableData,
} from "./tableUtils";

/**
 * Reusable data table with optional sorting, selection, client-side filters,
 * and pagination. For server-driven lists, pass pre-filtered `data` and omit
 * `filterValues`; wire pagination to your API in the parent.
 *
 * @param {object} props
 * @param {Array<object>} props.data
 * @param {Array<{
 *   header: string,
 *   accessor: string | ((item: object) => React.ReactNode),
 *   width?: string,
 *   sortable?: boolean,
 *   align?: 'start' | 'center' | 'end',
 *   variant?: 'default' | 'actions',
 *   className?: string,
 * }>} props.columns
 */
export function DataTable({
  data = [],
  columns = [],
  keyExtractor,
  selectable = false,
  onSelectionChange,
  onRowClick,
  pagination,
  filterValues = {},
  emptyMessage,
  className,
}) {
  const { t } = useTranslation("common");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const handleSort = (columnIndex) => {
    const column = columns[columnIndex];
    if (!column?.sortable || typeof column.accessor === "function") return;

    const columnKey =
      typeof column.accessor === "string" ? column.accessor : `col-${columnIndex}`;
    const nextSort = getNextSortState(sortColumn, sortDirection, columnKey);

    setSortColumn(nextSort.sortColumn);
    setSortDirection(nextSort.sortDirection);
  };

  const filteredData = useMemo(
    () => filterTableData(data, filterValues),
    [data, filterValues],
  );

  const sortedData = useMemo(
    () => sortTableData(filteredData, columns, sortColumn, sortDirection),
    [filteredData, columns, sortColumn, sortDirection],
  );

  const paginatedData = pagination
    ? sortedData.slice(
        (pagination.currentPage - 1) * pagination.pageSize,
        pagination.currentPage * pagination.pageSize,
      )
    : sortedData;

  const totalPages = pagination
    ? Math.max(1, Math.ceil(sortedData.length / pagination.pageSize))
    : 1;

  const columnCount = columns.length + (selectable ? 1 : 0);

  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = new Set(
        sortedData.map((item, index) => getRowKey(item, index, keyExtractor)),
      );
      setSelectedIds(allIds);
      onSelectionChange?.(Array.from(allIds));
      return;
    }

    setSelectedIds(new Set());
    onSelectionChange?.([]);
  };

  const handleSelectRow = (item, index, checked) => {
    const key = getRowKey(item, index, keyExtractor);
    const nextSelected = new Set(selectedIds);

    if (checked) {
      nextSelected.add(key);
    } else {
      nextSelected.delete(key);
    }

    setSelectedIds(nextSelected);
    onSelectionChange?.(Array.from(nextSelected));
  };

  return (
    <div className={className ?? tableStyles.root}>
      <div className={tableStyles.scroll}>
        <table className={tableStyles.table}>
          <colgroup>
            {selectable && <col className={CHECKBOX_COL_WIDTH} />}
            {columns.map((column, index) => (
              <col key={getColWidth(column) ?? index} className={getColWidth(column)} />
            ))}
          </colgroup>

          <thead className={tableStyles.thead}>
            <tr>
              {selectable && (
                <TableCheckboxCell
                  isHeader
                  checked={
                    selectedIds.size === sortedData.length && sortedData.length > 0
                  }
                  onChange={handleSelectAll}
                  label={t("table.selectAllRows")}
                />
              )}

              {columns.map((column, index) => (
                <TableHeaderCell
                  key={typeof column.accessor === "string" ? column.accessor : index}
                  column={column}
                  columnIndex={index}
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columnCount} className={tableStyles.emptyCell}>
                  <div className={tableStyles.emptyState}>
                    <p>{emptyMessage ?? t("noData")}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => {
                const key = getRowKey(item, index, keyExtractor);
                const isSelected = selectedIds.has(key);

                return (
                  <TableRow
                    key={key}
                    selected={isSelected}
                    clickable={Boolean(onRowClick)}
                    onClick={() => onRowClick?.(item)}
                  >
                    {selectable && (
                      <TableCheckboxCell
                        checked={isSelected}
                        stopPropagation
                        onChange={(checked) =>
                          handleSelectRow(item, index, checked)
                        }
                        label={t("table.selectRow")}
                      />
                    )}

                    {columns.map((column, colIndex) => (
                      <TableDataCell
                        key={colIndex}
                        column={column}
                        item={item}
                      />
                    ))}
                  </TableRow>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <Pagination
          className="mt-6"
          currentPage={pagination.currentPage}
          totalPages={totalPages}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
}
