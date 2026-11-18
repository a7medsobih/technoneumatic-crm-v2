import { Building2, ShoppingCart, Users, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation("dashboard");

  const stats = [
    {
      key: "companies",
      value: "0",
      icon: Building2,
    },
    {
      key: "customers",
      value: "0",
      icon: Users,
    },
    {
      key: "orders",
      value: "0",
      icon: ShoppingCart,
    },
    {
      key: "wallet",
      value: "0",
      icon: Wallet,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="watfil-card bg-(--watfil-gradient-card)">
        <p className="text-sm font-semibold text-primary">{t("welcome")}</p>
        <h2 className="mt-2 text-3xl font-bold text-watfil-text-primary">
          {t("pages.dashboard.title")}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-watfil-text-secondary">
          {t("pages.dashboard.description")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article key={stat.key} className="watfil-card">
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-watfil-text-secondary">
                  {t(`stats.${stat.key}`)}
                </span>
                <span className="flex size-11 items-center justify-center rounded-2xl bg-watfil-background-secondary text-primary">
                  <Icon size={20} />
                </span>
              </div>
              <strong className="text-3xl font-bold text-watfil-text-primary">
                {stat.value}
              </strong>
            </article>
          );
        })}
      </div>

      <div className="watfil-card">
        <h3 className="text-xl font-bold text-watfil-text-primary">
          {t("recentActivity")}
        </h3>
        <div className="mt-6 rounded-2xl border border-dashed border-watfil-border bg-watfil-background-light px-6 py-12 text-center text-sm text-watfil-text-secondary">
          {t("emptyFeature")}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
