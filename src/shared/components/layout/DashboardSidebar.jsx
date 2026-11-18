import {
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  LogOut,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useCompanyLogout } from "@/features/auth";
import { dashboardNavigationItems } from "@/shared/constants/dashboardNavigation";
import { cn } from "@/shared/utils/cn";

export default function DashboardSidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
  onToggleCollapsed,
}) {
  const { t, i18n } = useTranslation(["common", "dashboard"]);
  const location = useLocation();
  const navigate = useNavigate();
  const logoutMutation = useCompanyLogout();

  const isRTL = i18n.dir() === "rtl";
  const showLeftArrow = collapsed ? isRTL : !isRTL;

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      onCloseMobile?.();
      navigate("/login", { replace: true });
    }
  };

  const sidebarContent = (
    <div className="watfil-sidebar relative flex h-full flex-col">
      <button
        type="button"
        onClick={onToggleCollapsed}
        className="absolute -end-4 top-5 z-(--watfil-z-fixed) hidden size-8 items-center justify-center rounded-full border border-watfil-border bg-watfil-card-bg text-watfil-text-secondary shadow-(--watfil-shadow-card) transition hover:border-primary/40 hover:text-primary lg:inline-flex"
        aria-label={collapsed ? t("expandSidebar") : t("collapseSidebar")}
      >
        {showLeftArrow ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      <div className="flex h-(--watfil-header-height) items-center justify-between border-b border-watfil-border-light px-4">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3"
          onClick={onCloseMobile}
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-(image:--watfil-gradient-primary) text-lg font-black text-white shadow-(--watfil-shadow-button)">
            W
          </span>
          {!collapsed && (
            <span className="min-w-0">
              <span className="block truncate text-lg font-bold text-watfil-text-primary">
                {t("auth:brand")}
              </span>
              <span className="block truncate text-xs text-watfil-text-secondary">
                {t("dashboard:title")}
              </span>
            </span>
          )}
        </Link>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-xl border border-watfil-border bg-watfil-card-bg text-watfil-text-secondary transition hover:text-primary lg:hidden"
          onClick={onCloseMobile}
          aria-label={t("closeMenu")}
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-5">
        {dashboardNavigationItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <Link
              key={item.key}
              to={item.path}
              onClick={onCloseMobile}
              title={collapsed ? t(`dashboard:menu.${item.key}`) : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition-all",
                collapsed && "justify-center",
                isActive
                  ? "bg-(--watfil-sidebar-active-bg) text-(--watfil-sidebar-active-text) shadow-sm"
                  : "text-watfil-text-secondary hover:bg-watfil-background-secondary hover:text-primary",
              )}
            >
              <Icon size={20} className="shrink-0" />
              {!collapsed && (
                <span className="truncate">
                  {t(`dashboard:menu.${item.key}`)}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-watfil-border-light p-3">
        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className={cn(
            "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-watfil-text-secondary transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-70 dark:hover:bg-red-950/30 dark:hover:text-red-300",
            collapsed && "justify-center",
          )}
          aria-label={t("auth:logout")}
          title={collapsed ? t("auth:logout") : undefined}
        >
          {logoutMutation.isPending ? (
            <LoaderCircle size={20} className="animate-spin" />
          ) : (
            <LogOut size={20} />
          )}
          {!collapsed && (
            <span>
              {logoutMutation.isPending
                ? t("auth:signingOut")
                : t("auth:logout")}
            </span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={cn(
          "hidden h-screen shrink-0 border-watfil-border bg-watfil-card-bg shadow-(--watfil-shadow-card) transition-[width] duration-300 lg:sticky lg:top-0 lg:z-(--watfil-z-fixed) lg:flex lg:flex-col",
          collapsed
            ? "w-(--watfil-sidebar-width-collapsed)"
            : "w-(--watfil-sidebar-width)",
        )}
      >
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-(--watfil-z-modal) lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/50"
            onClick={onCloseMobile}
            aria-label={t("closeMenu")}
          />
          <aside className="absolute inset-y-0 start-0 w-[min(86vw,var(--watfil-sidebar-width))] overflow-hidden rounded-e-3xl border-e border-watfil-border bg-watfil-card-bg shadow-(--watfil-shadow-2xl)">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
