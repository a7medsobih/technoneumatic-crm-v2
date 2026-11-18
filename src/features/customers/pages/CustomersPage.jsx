import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";

import { CustomersSection } from "../components/CustomersSection";

export default function CustomersPage() {
  const { t } = useTranslation(["customers", "dashboard"]);

  return (
    <section className="space-y-6">
      <div className="watfil-card bg-(--watfil-gradient-card)">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">
              {t("dashboard:menu.customers")}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-watfil-text-primary">
              {t("customers:title")}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-watfil-text-secondary">
              {t("customers:subtitle")}
            </p>
          </div>
          <span className="flex size-14 items-center justify-center rounded-3xl bg-watfil-background-secondary text-primary">
            <Users size={24} />
          </span>
        </div>
      </div>

      <CustomersSection />
    </section>
  );
}
