import { LoaderCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/utils/cn";

export function CustomersStateMessage({ isLoading, isError, children, className }) {
  const { t } = useTranslation(["customers", "common"]);

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-watfil-border bg-watfil-background-light",
          className,
        )}
      >
        <div className="flex items-center gap-3 text-sm text-watfil-text-secondary">
          <LoaderCircle className="animate-spin text-primary" size={18} />
          <span>{t("common:loading")}</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200",
          className,
        )}
      >
        {t("customers:messages.loadError")}
      </div>
    );
  }

  return children;
}
