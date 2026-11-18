import { useEffect, useState } from "react";

import { cn } from "@/shared/utils/cn";

/**
 * Tab bar used to switch between sections of a page (e.g. main / regional /
 * city listings). Works either controlled (`value` + `onChange`) or
 * uncontrolled (`defaultTab`). When items provide `content`, the active
 * panel is rendered below the bar; otherwise it acts as a pure selector.
 *
 * @param {object} props
 * @param {Array<{
 *   id: string,
 *   label: string,
 *   icon?: React.ReactNode,
 *   content?: React.ReactNode,
 *   disabled?: boolean,
 * }>} props.items
 * @param {string} [props.value] - Controlled active tab id.
 * @param {string} [props.defaultTab] - Initial tab id when uncontrolled.
 * @param {(tabId: string) => void} [props.onChange]
 * @param {"line" | "pills"} [props.variant]
 */
export function FilterTabs({
  items = [],
  value,
  defaultTab,
  onChange,
  variant = "line",
  className,
  listClassName,
}) {
  const isControlled = value !== undefined;
  const [internalTab, setInternalTab] = useState(defaultTab ?? items[0]?.id);

  useEffect(() => {
    if (!isControlled && defaultTab) {
      setInternalTab(defaultTab);
    }
  }, [defaultTab, isControlled]);

  const activeTab = isControlled ? value : internalTab;

  const handleTabChange = (tabId) => {
    if (!isControlled) {
      setInternalTab(tabId);
    }
    onChange?.(tabId);
  };

  const activeItem = items.find((item) => item.id === activeTab);

  return (
    <div className={className}>
      <div
        role="tablist"
        className={cn(
          "flex overflow-x-auto",
          variant === "pills" ? "gap-2" : "border-b border-watfil-border",
          listClassName,
        )}
      >
        {items.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={item.disabled}
              onClick={() => !item.disabled && handleTabChange(item.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                variant === "pills"
                  ? "rounded-2xl px-4 py-2"
                  : "border-b-2 px-5 py-3",
                variant === "pills" &&
                  (isActive
                    ? "bg-primary font-semibold text-white"
                    : "text-watfil-text-secondary hover:bg-watfil-background-secondary"),
                variant === "line" &&
                  (isActive
                    ? "border-primary font-semibold text-primary"
                    : "border-transparent text-watfil-text-secondary hover:text-primary"),
              )}
            >
              {item.icon && (
                <span className="inline-flex items-center">{item.icon}</span>
              )}
              {item.label}
            </button>
          );
        })}
      </div>

      {activeItem?.content !== undefined && (
        <div role="tabpanel" className="mt-6">
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
