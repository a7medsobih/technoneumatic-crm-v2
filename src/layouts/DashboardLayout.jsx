import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardHeader from "@/shared/components/layout/DashboardHeader";
import DashboardSidebar from "@/shared/components/layout/DashboardSidebar";

const SIDEBAR_COLLAPSED_KEY = "watfil-sidebar-collapsed";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
  }, [collapsed]);

  return (
    <div className="min-h-screen bg-watfil-background-gray text-watfil-foreground">
      <div className="flex min-h-screen">
        <DashboardSidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
          onToggleCollapsed={() => setCollapsed((current) => !current)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader onOpenMobileMenu={() => setMobileOpen(true)} />
          <main className="flex-1 p-(--watfil-content-padding)">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
