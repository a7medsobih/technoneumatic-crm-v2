export const CHECKBOX_COL_WIDTH = "w-12 min-w-12 max-w-12";

export const ACTIONS_COL_CLASSES =
  "w-[1%] min-w-64 shrink-0 whitespace-nowrap overflow-visible max-md:min-w-48";

export const CELL_PADDING = "px-4 py-4 max-md:px-2 max-md:py-2";

export const alignClasses = {
  start: "text-start",
  center: "text-center",
  end: "text-end",
};

export const alignFlexClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
};

export const tableStyles = {
  root: "w-full",
  scroll: "w-full overflow-x-auto max-md:overflow-x-scroll",
  table:
    "w-full min-w-full table-auto border-collapse bg-watfil-card-bg text-sm leading-normal",
  thead: "bg-watfil-background-gray",
  headerCell:
    "sticky top-0 z-10 border-b-2 border-watfil-border-light bg-watfil-background-gray font-semibold text-watfil-text-secondary transition-colors duration-200",
  headerSortable:
    "cursor-pointer select-none hover:bg-watfil-background-secondary",
  bodyRow:
    "border-b border-watfil-border-light transition-colors duration-200 hover:bg-watfil-background-gray",
  bodyRowSelected: "bg-watfil-primary-light",
  bodyRowClickable: "cursor-pointer",
  bodyCell: "text-watfil-text-primary align-middle",
  checkbox: "size-4 cursor-pointer accent-primary",
  sortIcon: "inline-flex shrink-0 items-center text-watfil-text-tertiary",
  emptyCell: "p-12 text-center",
  emptyState: "text-watfil-text-secondary",
  pagination:
    "mt-6 flex items-center justify-center gap-4 border-t border-watfil-border-light pt-4",
  pageButton:
    "cursor-pointer rounded-xl border border-watfil-border bg-watfil-card-bg px-4 py-2 text-sm text-watfil-text-primary transition-colors hover:border-primary hover:bg-watfil-primary-light hover:text-primary disabled:cursor-not-allowed disabled:opacity-50",
  pageInfo: "text-sm text-watfil-text-secondary",
};
