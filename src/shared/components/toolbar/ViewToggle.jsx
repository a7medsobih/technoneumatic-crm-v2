import { LayoutGrid, Table2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/utils/cn";

export const VIEW_TABLE = "table";
export const VIEW_CARDS = "cards";

const DEFAULT_VIEWS = [
  { value: VIEW_TABLE, labelKey: "toolbar.viewTable", icon: Table2 },
  { value: VIEW_CARDS, labelKey: "toolbar.viewCards", icon: LayoutGrid },
];

/**
 * Segmented control to switch between table and cards layouts.
 *
 * Controlled by the page so each domain decides its own default view.
 * Pass a custom `views` array to override the available layouts.
 */
export function ViewToggle({ value, onChange, views = DEFAULT_VIEWS, className }) {
  const { t } = useTranslation("common");

  return (
    <div
      role="group"
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-2xl border border-watfil-border bg-watfil-background-secondary p-1",
        className,
      )}
    >
      {views.map((view) => {
        const Icon = view.icon;
        const isActive = value === view.value;
        const label = view.label ?? (view.labelKey ? t(view.labelKey) : view.value);

        return (
          <button
            key={view.value}
            type="button"
            onClick={() => onChange?.(view.value)}
            aria-pressed={isActive}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
              isActive
                ? "bg-primary text-white shadow-(--watfil-shadow-button)"
                : "text-watfil-text-secondary hover:text-primary",
            )}
          >
            {Icon && <Icon size={16} className="shrink-0" />}
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
