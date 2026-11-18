import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/utils/cn";

import { getPageRange } from "./paginationUtils";

const paginationStyles = {
  root:
    "flex flex-wrap items-center justify-between gap-4 border-t border-watfil-border-light pt-4",
  info: "text-sm text-watfil-text-secondary",
  controls: "flex items-center gap-2",
  pageButton:
    "inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-watfil-border bg-watfil-card-bg px-4 py-2 text-sm text-watfil-text-primary transition-colors hover:border-primary hover:bg-watfil-primary-light hover:text-primary disabled:cursor-not-allowed disabled:opacity-50",
  pageInfo: "min-w-28 text-center text-sm text-watfil-text-secondary",
};

/**
 * Reusable pagination for server-driven lists (Laravel `meta` shape).
 *
 * @param {object} props
 * @param {number} props.currentPage
 * @param {number} props.totalPages
 * @param {(page: number) => void} props.onPageChange
 * @param {number} [props.totalItems] - When provided with `pageSize`, shows a range summary.
 * @param {number} [props.pageSize]
 * @param {string} [props.className]
 * @param {boolean} [props.hideOnSinglePage=true]
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  className,
  hideOnSinglePage = true,
}) {
  const { t } = useTranslation("common");

  if (hideOnSinglePage && totalPages <= 1) {
    return null;
  }

  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);
  const showRange =
    typeof totalItems === "number" &&
    typeof pageSize === "number" &&
    totalItems > 0;
  const range = showRange
    ? getPageRange(safeCurrentPage, pageSize, totalItems)
    : null;

  const goToPage = (page) => {
    const nextPage = Math.min(Math.max(1, page), safeTotalPages);
    if (nextPage !== safeCurrentPage) {
      onPageChange(nextPage);
    }
  };

  return (
    <nav
      className={cn(paginationStyles.root, className)}
      aria-label={t("pagination.label")}
    >
      {showRange ? (
        <p className={paginationStyles.info}>
          {t("pagination.showingRange", {
            from: range.from,
            to: range.to,
            total: totalItems,
          })}
        </p>
      ) : (
        <span aria-hidden />
      )}

      <div className={paginationStyles.controls}>
        <button
          type="button"
          className={paginationStyles.pageButton}
          disabled={safeCurrentPage <= 1}
          onClick={() => goToPage(safeCurrentPage - 1)}
          aria-label={t("pagination.previous")}
        >
          <ChevronLeft size={16} aria-hidden />
          <span>{t("pagination.previous")}</span>
        </button>

        <span className={paginationStyles.pageInfo}>
          {t("pagination.pageInfo", {
            current: safeCurrentPage,
            total: safeTotalPages,
          })}
        </span>

        <button
          type="button"
          className={paginationStyles.pageButton}
          disabled={safeCurrentPage >= safeTotalPages}
          onClick={() => goToPage(safeCurrentPage + 1)}
          aria-label={t("pagination.next")}
        >
          <span>{t("pagination.next")}</span>
          <ChevronRight size={16} aria-hidden />
        </button>
      </div>
    </nav>
  );
}
