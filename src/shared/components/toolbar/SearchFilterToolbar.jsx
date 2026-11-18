import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SearchInput } from "@/shared/components/ui/searchInput";
import { Select } from "@/shared/components/ui/select";
import { cn } from "@/shared/utils/cn";

import { ViewToggle } from "./ViewToggle";

/**
 * Reusable list toolbar: a debounced search field, one or more dropdown
 * filters, an optional table/cards view toggle and a slot for custom actions.
 *
 * The search value is owned by the parent; this component only debounces the
 * `onSearchChange` callback so pages can wire it straight into a query.
 *
 * @param {object} props
 * @param {string} props.searchValue
 * @param {(value: string) => void} props.onSearchChange
 * @param {Array<{
 *   key: string,
 *   value: string,
 *   onChange: (value: string) => void,
 *   options: Array<{ value: string, label: string, disabled?: boolean }>,
 *   placeholder?: string,
 *   ariaLabel?: string,
 *   disabled?: boolean,
 * }>} [props.filters]
 * @param {"table" | "cards"} [props.view]
 * @param {(view: string) => void} [props.onViewChange]
 */
export function SearchFilterToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  searchAriaLabel,
  searchDisabled = false,
  debounceMs = 400,
  filters = [],
  view,
  onViewChange,
  views,
  actions,
  onReset,
  showReset = false,
  children,
  className,
}) {
  const { t } = useTranslation("common");
  const [localSearch, setLocalSearch] = useState(searchValue ?? "");
  const [syncedSearch, setSyncedSearch] = useState(searchValue ?? "");

  // Sync the local input when the parent value changes (e.g. on reset).
  // Adjusting state during render avoids the cascading-render effect warning.
  if (syncedSearch !== (searchValue ?? "")) {
    setSyncedSearch(searchValue ?? "");
    setLocalSearch(searchValue ?? "");
  }

  useEffect(() => {
    if (localSearch === (searchValue ?? "")) return undefined;

    const timer = window.setTimeout(() => {
      onSearchChange(localSearch);
    }, debounceMs);

    return () => window.clearTimeout(timer);
  }, [debounceMs, localSearch, onSearchChange, searchValue]);

  const showViewToggle = Boolean(view && onViewChange);
  const hasControls =
    filters.length > 0 || showViewToggle || showReset || children || actions;

  return (
    <div
      className={cn(
        "watfil-card-glass flex flex-col gap-4 rounded-2xl border border-watfil-border p-4 lg:flex-row lg:items-center",
        className,
      )}
    >
      <SearchInput
        className="min-w-0 flex-1"
        value={localSearch}
        onChange={setLocalSearch}
        placeholder={searchPlaceholder ?? t("search")}
        ariaLabel={searchAriaLabel ?? searchPlaceholder ?? t("search")}
        disabled={searchDisabled}
      />

      {hasControls && (
        <div className="flex flex-wrap items-center gap-3">
          {filters.map((filter) => (
            <Select
              key={filter.key}
              className="min-w-44"
              value={filter.value}
              onValueChange={filter.onChange}
              options={filter.options}
              placeholder={filter.placeholder ?? t("toolbar.all")}
              ariaLabel={filter.ariaLabel ?? filter.placeholder}
              disabled={filter.disabled}
            />
          ))}

          {children}

          {showReset && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-11 items-center gap-2 rounded-2xl border border-watfil-border bg-watfil-card-bg px-4 text-sm font-semibold text-watfil-text-secondary transition hover:border-primary/40 hover:text-primary"
            >
              <RotateCcw size={16} />
              <span>{t("toolbar.reset")}</span>
            </button>
          )}

          {actions}

          {showViewToggle && (
            <ViewToggle value={view} onChange={onViewChange} views={views} />
          )}
        </div>
      )}
    </div>
  );
}
