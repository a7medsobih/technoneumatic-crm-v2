export function getLocalizedName(entity, language) {
  if (!entity) return null;

  const isArabic = language?.startsWith("ar");
  return isArabic ? entity.name_ar ?? entity.name_en : entity.name_en ?? entity.name_ar;
}

export function formatAdZoneLabel(zone, language, t) {
  if (!zone) return "";

  const scopeLabel = t(`scopes.${zone.scope}`, { defaultValue: zone.scope });

  if (zone.scope === "homepage") {
    return `${scopeLabel} #${zone.id}`;
  }

  const locationName =
    getLocalizedName(zone.city, language) ??
    getLocalizedName(zone.governorate, language);

  return locationName ? `${scopeLabel} — ${locationName}` : `${scopeLabel} #${zone.id}`;
}

export function getSlotPrice(zone, position) {
  return zone?.slot_prices?.find((slot) => slot.position === position)?.price_per_day;
}

export function normalizeAvailabilityDays(data) {
  if (!data) return [];

  if (Array.isArray(data.days)) return data.days;
  if (Array.isArray(data)) return data;

  return [];
}
