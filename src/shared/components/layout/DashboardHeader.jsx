import { Bell, Menu, Search, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";

import ThemeToggle from "@/shared/components/layout/ThemeToggle";

export default function DashboardHeader({ onOpenMobileMenu }) {
  const { t, i18n } = useTranslation(["common", "dashboard"]);
  const currentLanguage = i18n.resolvedLanguage || i18n.language || "ar";
  const nextLanguage = currentLanguage.startsWith("ar") ? "en" : "ar";

  const handleToggleLanguage = () => {
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <header className="sticky top-0 z-(--watfil-z-sticky) flex min-h-(--watfil-header-height) items-center gap-4 border-b border-watfil-border bg-(--watfil-gradient-header) px-4 shadow-(--watfil-shadow-header) backdrop-blur-md lg:px-6">
      <button
        type="button"
        className="inline-flex size-10 items-center justify-center rounded-xl border border-watfil-border bg-watfil-card-bg text-watfil-text-secondary transition hover:text-primary lg:hidden"
        onClick={onOpenMobileMenu}
        aria-label={t("openMenu")}
      >
        <Menu size={20} />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-bold text-watfil-text-primary lg:text-xl">
          {t("dashboard:title")}
        </h1>
        <p className="hidden truncate text-sm text-watfil-text-secondary sm:block">
          {t("dashboard:subtitle")}
        </p>
      </div>

      <label className="relative hidden w-full max-w-xs items-center md:flex">
        <Search
          size={18}
          className="pointer-events-none absolute start-3 text-watfil-text-tertiary"
        />
        <input
          type="search"
          className="h-11 w-full rounded-2xl border border-watfil-border bg-watfil-card-bg px-10 text-sm text-watfil-text-primary outline-none transition placeholder:text-watfil-text-tertiary focus:border-primary focus:ring-4 focus:ring-primary/10"
          placeholder={t("searchPlaceholder")}
        />
      </label>

      <button
        type="button"
        onClick={handleToggleLanguage}
        className="hidden h-10 items-center rounded-xl border border-watfil-border bg-watfil-card-bg px-3 text-sm font-semibold text-watfil-text-secondary transition hover:text-primary sm:inline-flex"
        aria-label={t("language")}
      >
        {nextLanguage === "ar" ? t("arabic") : t("english")}
      </button>

      <ThemeToggle />

      <button
        type="button"
        className="relative inline-flex size-10 items-center justify-center rounded-xl border border-watfil-border bg-watfil-card-bg text-watfil-text-secondary transition hover:text-primary"
        aria-label={t("notifications")}
      >
        <Bell size={18} />
        <span className="absolute end-2 top-2 size-2 rounded-full bg-watfil-error" />
      </button>

      <button
        type="button"
        className="hidden items-center gap-3 rounded-2xl border border-watfil-border bg-watfil-card-bg px-3 py-2 text-start transition hover:border-primary/40 lg:flex"
        aria-label={t("profile")}
      >
        <span className="flex size-9 items-center justify-center rounded-xl bg-watfil-background-secondary text-primary">
          <UserRound size={18} />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-watfil-text-primary">
            {t("dashboard:adminName")}
          </span>
          <span className="block truncate text-xs text-watfil-text-secondary">
            {t("dashboard:adminRole")}
          </span>
        </span>
      </button>
    </header>
  );
}
