import { Megaphone } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { FilterTabs } from "@/shared/components/toolbar";

import { BookAdSection } from "../components/BookAdSection";
import { BookingsSection } from "../components/BookingsSection";
import { CampaignsSection } from "../components/CampaignsSection";

export default function AdsPage() {
  const { t } = useTranslation(["ads", "dashboard"]);
  const [activeTab, setActiveTab] = useState("campaigns");

  const tabs = [
    {
      id: "campaigns",
      label: t("ads:tabs.campaigns"),
      content: <CampaignsSection />,
    },
    {
      id: "bookings",
      label: t("ads:tabs.bookings"),
      content: <BookingsSection />,
    },
    {
      id: "book",
      label: t("ads:tabs.book"),
      content: <BookAdSection />,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="watfil-card bg-(--watfil-gradient-card)">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">
              {t("dashboard:menu.ads")}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-watfil-text-primary">
              {t("ads:title")}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-watfil-text-secondary">
              {t("ads:subtitle")}
            </p>
          </div>
          <span className="flex size-14 items-center justify-center rounded-3xl bg-watfil-background-secondary text-primary">
            <Megaphone size={24} />
          </span>
        </div>
      </div>

      <FilterTabs items={tabs} value={activeTab} onChange={setActiveTab} />
    </section>
  );
}
