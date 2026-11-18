import { Search } from "lucide-react";

import { cn } from "@/shared/utils/cn";

/**
 * Presentational search field with a leading icon. Direction aware: the icon
 * sits at the start (right in RTL, left in LTR) using logical properties.
 */
export function SearchInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
  disabled = false,
  className,
}) {
  return (
    <label className={cn("relative flex items-center", className)}>
      <Search
        size={18}
        className="pointer-events-none absolute start-3 text-watfil-text-tertiary"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        disabled={disabled}
        className="h-11 w-full rounded-2xl border border-watfil-border bg-watfil-card-bg px-10 text-sm text-watfil-text-primary outline-none transition placeholder:text-watfil-text-tertiary hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </label>
  );
}
