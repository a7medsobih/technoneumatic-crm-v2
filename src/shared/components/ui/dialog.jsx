import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/utils/cn";

const SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[calc(100vw-2rem)]",
};

/**
 * Accessible modal built on Radix Dialog. Use for confirmations, details,
 * or as the shell for FormModal.
 */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  showClose = true,
  className,
  contentClassName,
}) {
  const { t } = useTranslation("common");

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-(--watfil-z-modal-backdrop) bg-slate-950/50 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content
          className={cn(
            "fixed top-1/2 left-1/2 z-(--watfil-z-modal) flex max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border border-watfil-border bg-watfil-card-bg shadow-(--watfil-shadow-2xl) outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            SIZE_CLASSES[size],
            contentClassName,
          )}
        >
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col gap-4 p-6",
              className,
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 space-y-1">
                <DialogPrimitive.Title className="text-lg font-bold text-watfil-text-primary">
                  {title}
                </DialogPrimitive.Title>
                {description && (
                  <DialogPrimitive.Description className="text-sm text-watfil-text-secondary">
                    {description}
                  </DialogPrimitive.Description>
                )}
              </div>

              {showClose && (
                <DialogPrimitive.Close
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-watfil-border bg-watfil-background-secondary text-watfil-text-secondary transition hover:text-primary"
                  aria-label={t("close")}
                >
                  <X size={18} />
                </DialogPrimitive.Close>
              )}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>

            {footer && (
              <div className="flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-watfil-border-light pt-4">
                {footer}
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
