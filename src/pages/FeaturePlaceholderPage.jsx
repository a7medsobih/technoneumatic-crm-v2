import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { dashboardNavigationItems } from "@/shared/constants/dashboardNavigation";

export default function FeaturePlaceholderPage() {
  const { featureKey } = useParams();
  const { t } = useTranslation("dashboard");
  const currentFeature = dashboardNavigationItems.find(
    (item) => item.key === featureKey,
  );
  const pageKey = currentFeature?.key || "dashboard";
  const Icon = currentFeature?.icon;

  return (
    <section className="space-y-6">
      <div className="watfil-card bg-(--watfil-gradient-card)">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">{t("title")}</p>
            <h2 className="mt-2 text-3xl font-bold text-watfil-text-primary">
              {t(`pages.${pageKey}.title`)}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-watfil-text-secondary">
              {t(`pages.${pageKey}.description`)}
            </p>
          </div>
          {Icon && (
            <span className="flex size-14 items-center justify-center rounded-3xl bg-watfil-background-secondary text-primary">
              <Icon size={24} />
            </span>
          )}
        </div>
      </div>

      <div className="watfil-card">
        <div className="rounded-2xl border border-dashed border-watfil-border bg-watfil-background-light px-6 py-16 text-center">
          <p className="text-sm font-semibold text-watfil-text-primary">
            {t(`pages.${pageKey}.title`)}
          </p>
          <p className="mt-2 text-sm text-watfil-text-secondary">
            {t("emptyFeature")}
          </p>
        </div>
      </div>
    </section>
  );
}
