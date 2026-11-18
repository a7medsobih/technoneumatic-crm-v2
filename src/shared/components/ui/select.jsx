import { Check, ChevronDown } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/utils/cn";

/** Radix Select reserves "" for clearing; map filter "all" options internally. */
const EMPTY_OPTION_VALUE = "__select_all__";

function toRadixValue(value, options) {
  if (value === "" || value == null) {
    const hasEmptyOption = options.some(
      (option) => option.value === "" || option.value == null,
    );
    return hasEmptyOption ? EMPTY_OPTION_VALUE : undefined;
  }

  return String(value);
}

function fromRadixValue(value) {
  if (value === EMPTY_OPTION_VALUE) return "";
  return value;
}

/**
 * Accessible single-select dropdown built on Radix UI.
 *
 * Options are passed as a flat array of `{ value, label, disabled }` so the
 * component stays presentational and easy to reuse across features.
 */
export function Select({
  value,
  onValueChange,
  options = [],
  placeholder,
  disabled = false,
  ariaLabel,
  className,
  triggerClassName,
  contentClassName,
}) {
  const { i18n } = useTranslation();
  const dir = i18n.dir();

  const radixOptions = options.map((option, index) => ({
    ...option,
    radixValue:
      option.value === "" || option.value == null
        ? EMPTY_OPTION_VALUE
        : String(option.value),
    key: option.value === "" || option.value == null ? `empty-${index}` : String(option.value),
  }));

  return (
    <SelectPrimitive.Root
      dir={dir}
      value={toRadixValue(value, options)}
      onValueChange={(nextValue) => onValueChange?.(fromRadixValue(nextValue))}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        aria-label={ariaLabel ?? placeholder}
        className={cn(
          "flex h-11 w-full min-w-40 items-center justify-between gap-2 rounded-2xl border border-watfil-border bg-watfil-card-bg px-4 text-sm font-medium text-watfil-text-primary outline-none transition data-placeholder:text-watfil-text-tertiary hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60",
          triggerClassName,
          className,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="text-watfil-text-tertiary">
          <ChevronDown size={16} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className={cn(
            "z-(--watfil-z-dropdown) max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-2xl border border-watfil-border bg-watfil-card-bg shadow-(--watfil-shadow-lg)",
            contentClassName,
          )}
        >
          <SelectPrimitive.Viewport className="p-1">
            {radixOptions.map((option) => (
              <SelectPrimitive.Item
                key={option.key}
                value={option.radixValue}
                disabled={option.disabled}
                className="relative flex cursor-pointer select-none items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm text-watfil-text-secondary outline-none transition data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-watfil-background-secondary data-highlighted:text-primary data-[state=checked]:font-semibold data-[state=checked]:text-primary"
              >
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="inline-flex">
                  <Check size={14} />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
