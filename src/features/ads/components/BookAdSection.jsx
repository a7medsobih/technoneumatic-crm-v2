import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { DataTable } from "@/shared/components/data-table";
import { SearchFilterToolbar } from "@/shared/components/toolbar";
import { Button } from "@/shared/components/ui/button";
import { FormModal } from "@/shared/components/ui/formModal";
import { Select } from "@/shared/components/ui/select";
import { appToast } from "@/shared/lib/toast";

import {
  AD_POSITIONS,
  AD_SCOPES,
  CAMPAIGN_STATUSES,
} from "../constants/adConstants";
import { useAdAvailability } from "../hooks/useAdAvailability";
import { useAdCampaigns } from "../hooks/useAdCampaigns";
import { useAdZones } from "../hooks/useAdZones";
import { useBookAdDays } from "../hooks/useBookAdDays";
import { formatAdZoneLabel, getLocalizedName, getSlotPrice } from "../utils/adZoneUtils";
import { AdAvailabilityPanel } from "./AdAvailabilityPanel";
import { AdsStateMessage } from "./AdsStateMessage";

const inputClassName =
  "h-11 w-full rounded-2xl border border-watfil-border bg-watfil-card-bg px-4 text-sm text-watfil-text-primary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

function getDefaultDateRange() {
  const today = new Date();
  const from = today.toISOString().slice(0, 10);
  const end = new Date(today);
  end.setDate(end.getDate() + 26);
  const to = end.toISOString().slice(0, 10);

  return { from, to };
}

export function BookAdSection() {
  const { t: tAds, i18n } = useTranslation("ads");
  const { t: tCommon } = useTranslation("common");
  const defaultRange = useMemo(() => getDefaultDateRange(), []);
  const [scope, setScope] = useState("");
  const [selectedZone, setSelectedZone] = useState(null);
  const [fromDate, setFromDate] = useState(defaultRange.from);
  const [toDate, setToDate] = useState(defaultRange.to);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [position, setPosition] = useState(String(AD_POSITIONS[0]));
  const [campaignId, setCampaignId] = useState("");
  const [selectedDates, setSelectedDates] = useState("");

  const zoneFilters = useMemo(
    () => ({
      per_page: 50,
      ...(scope ? { scope } : {}),
      is_active: true,
    }),
    [scope],
  );

  const { data: zonesData, isLoading: zonesLoading, isError: zonesError } =
    useAdZones(zoneFilters);
  const zones = zonesData?.items ?? [];

  const availabilityFilters = useMemo(
    () => ({
      ad_zone_id: selectedZone?.id,
      from: fromDate,
      to: toDate,
    }),
    [selectedZone?.id, fromDate, toDate],
  );

  const {
    data: availabilityData,
    isLoading: availabilityLoading,
    isFetching: availabilityFetching,
  } = useAdAvailability(availabilityFilters);

  const { data: campaignsData } = useAdCampaigns({
    per_page: 50,
    status: CAMPAIGN_STATUSES.ACTIVE,
  });
  const bookAdDays = useBookAdDays();

  const campaignOptions = (campaignsData?.items ?? []).map((campaign) => ({
    value: String(campaign.id),
    label: campaign.title,
  }));

  const scopeOptions = [
    { value: "", label: tAds("filters.allScopes") },
    ...Object.values(AD_SCOPES).map((value) => ({
      value,
      label: tAds(`scopes.${value}`),
    })),
  ];

  const positionOptions = AD_POSITIONS.map((value) => ({
    value: String(value),
    label: tAds("fields.positionLabel", { position: value }),
  }));

  const columns = useMemo(
    () => [
      {
        header: tAds("table.zones.zone"),
        accessor: (zone) => formatAdZoneLabel(zone, i18n.language, tAds),
        sortable: true,
      },
      {
        header: tAds("table.zones.scope"),
        accessor: (zone) => tAds(`scopes.${zone.scope}`, { defaultValue: zone.scope }),
      },
      {
        header: tAds("table.zones.location"),
        accessor: (zone) =>
          getLocalizedName(zone.city, i18n.language) ??
          getLocalizedName(zone.governorate, i18n.language) ??
          "—",
      },
      {
        header: tAds("table.zones.prices"),
        accessor: (zone) =>
          AD_POSITIONS.map((pos) => {
            const price = getSlotPrice(zone, pos);
            return price != null
              ? tAds("fields.pricePerDay", { price })
              : null;
          })
            .filter(Boolean)
            .join(" · "),
      },
      {
        header: tAds("table.zones.status"),
        accessor: (zone) => (
          <span className="rounded-full bg-watfil-background-secondary px-3 py-1 text-xs font-semibold text-watfil-text-secondary">
            {zone.is_active ? tAds("fields.active") : tAds("fields.inactive")}
          </span>
        ),
      },
    ],
    [i18n.language, tAds],
  );

  const handleBook = async () => {
    if (!selectedZone?.id || !campaignId) {
      appToast.error(tAds("messages.saveError"));
      return;
    }

    const dates = selectedDates
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    if (dates.length === 0) {
      appToast.error(tAds("validation.datesRequired"));
      return;
    }

    try {
      await bookAdDays.mutateAsync({
        ad_zone_id: selectedZone.id,
        position: Number(position),
        dates,
        ad_campaign_id: Number(campaignId),
        idempotency_key: `ad-book-${selectedZone.id}-${Date.now()}`,
      });

      appToast.success(tAds("messages.bookingCreated"));
      setBookingOpen(false);
      setSelectedDates("");
    } catch {
      appToast.error(tAds("messages.saveError"));
    }
  };

  return (
    <div className="space-y-6">
      <SearchFilterToolbar
        searchValue=""
        onSearchChange={() => {}}
        searchDisabled
        filters={[
          {
            key: "scope",
            value: scope,
            onChange: setScope,
            options: scopeOptions,
            placeholder: tAds("filters.scope"),
          },
        ]}
        actions={
          <Button
            type="button"
            disabled={!selectedZone}
            onClick={() => setBookingOpen(true)}
          >
            {tAds("actions.bookDays")}
          </Button>
        }
      />

      <AdsStateMessage isLoading={zonesLoading} isError={zonesError}>
        <DataTable
          data={zones}
          columns={columns}
          keyExtractor={(zone) => zone.id}
          onRowClick={(zone) => setSelectedZone(zone)}
          emptyMessage={tCommon("noData")}
        />
      </AdsStateMessage>

      <div className="watfil-card space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-watfil-text-primary">
              {tAds("fields.zone")}
            </label>
            <input
              className={inputClassName}
              readOnly
              value={
                selectedZone
                  ? formatAdZoneLabel(selectedZone, i18n.language, tAds)
                  : ""
              }
              placeholder={tAds("validation.zoneRequired")}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-watfil-text-primary">
              {tAds("fields.fromDate")}
            </label>
            <input
              className={inputClassName}
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-watfil-text-primary">
              {tAds("fields.toDate")}
            </label>
            <input
              className={inputClassName}
              type="date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
            />
          </div>
        </div>
      </div>

      <AdAvailabilityPanel
        data={availabilityData}
        isLoading={availabilityLoading || availabilityFetching}
      />

      <FormModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        title={tAds("actions.bookDays")}
        onSubmit={handleBook}
        loading={bookAdDays.isPending}
        submitLabel={tAds("actions.bookDays")}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-watfil-text-primary">
              {tAds("fields.position")}
            </label>
            <Select
              value={position}
              onValueChange={setPosition}
              options={positionOptions}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-watfil-text-primary">
              {tAds("fields.campaign")}
            </label>
            <Select
              value={campaignId}
              onValueChange={setCampaignId}
              options={campaignOptions}
              placeholder={tAds("validation.campaignRequired")}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-watfil-text-primary">
              {tAds("fields.dates")}
            </label>
            <input
              className={inputClassName}
              value={selectedDates}
              onChange={(event) => setSelectedDates(event.target.value)}
              placeholder="2026-07-01, 2026-07-02"
            />
            <p className="text-xs text-watfil-text-tertiary">
              {tAds("validation.datesRequired")}
            </p>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
