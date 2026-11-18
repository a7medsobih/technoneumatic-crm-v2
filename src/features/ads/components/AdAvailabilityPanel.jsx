import { useTranslation } from "react-i18next";

import { AD_POSITIONS } from "../constants/adConstants";
import { normalizeAvailabilityDays } from "../utils/adZoneUtils";

function SlotCell({ slot, t }) {
  const isAvailable = slot?.available ?? slot?.is_available ?? false;

  return (
    <span
      className={
        isAvailable
          ? "rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
          : "rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300"
      }
    >
      {isAvailable ? t("availability.available") : t("availability.unavailable")}
      {slot?.price_per_day != null && ` · ${slot.price_per_day}`}
    </span>
  );
}

export function AdAvailabilityPanel({ data, isLoading }) {
  const { t } = useTranslation(["ads", "common"]);
  const days = normalizeAvailabilityDays(data);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-dashed border-watfil-border bg-watfil-background-light px-6 py-10 text-center text-sm text-watfil-text-secondary">
        {t("common:loading")}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-dashed border-watfil-border bg-watfil-background-light px-6 py-10 text-center text-sm text-watfil-text-secondary">
        {t("ads:availability.empty")}
      </div>
    );
  }

  if (days.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-watfil-border bg-watfil-background-light px-6 py-10 text-center text-sm text-watfil-text-secondary">
        {t("ads:availability.noDays")}
      </div>
    );
  }

  return (
    <div className="watfil-card overflow-hidden p-0">
      <div className="border-b border-watfil-border px-5 py-4">
        <h3 className="text-sm font-semibold text-watfil-text-primary">
          {t("ads:availability.title")}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-watfil-background-secondary text-watfil-text-secondary">
            <tr>
              <th className="px-4 py-3 text-start font-semibold">
                {t("ads:fields.dates")}
              </th>
              {AD_POSITIONS.map((position) => (
                <th key={position} className="px-4 py-3 text-start font-semibold">
                  {t("ads:fields.positionLabel", { position })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              const positions = day.positions ?? day.slots ?? [];

              return (
                <tr key={day.date} className="border-t border-watfil-border">
                  <td className="px-4 py-3 font-medium text-watfil-text-primary">
                    {day.date}
                  </td>
                  {AD_POSITIONS.map((position) => {
                    const slot =
                      positions.find((item) => item.position === position) ?? null;

                    return (
                      <td key={position} className="px-4 py-3">
                        <SlotCell slot={slot} t={t} />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
