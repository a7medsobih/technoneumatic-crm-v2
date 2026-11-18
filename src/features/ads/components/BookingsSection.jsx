import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { DataTable } from "@/shared/components/data-table";
import {
  getPaginationFromMeta,
  Pagination,
} from "@/shared/components/pagination";
import { SearchFilterToolbar } from "@/shared/components/toolbar";

import {
  BOOKING_STATUSES,
  DEFAULT_ADS_PAGE_SIZE,
} from "../constants/adConstants";
import { useAdBookings } from "../hooks/useAdBookings";
import { AdsStateMessage } from "./AdsStateMessage";

export function BookingsSection() {
  const { t } = useTranslation(["ads", "common"]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const filters = useMemo(
    () => ({
      per_page: DEFAULT_ADS_PAGE_SIZE,
      page,
      ...(status ? { status } : {}),
    }),
    [page, status],
  );

  const { data, isLoading, isError } = useAdBookings(filters);
  const items = data?.items ?? [];
  const pagination = getPaginationFromMeta(data?.meta);

  const statusOptions = [
    { value: "", label: t("ads:filters.allStatuses") },
    ...Object.values(BOOKING_STATUSES).map((value) => ({
      value,
      label: t(`ads:statuses.${value}`),
    })),
  ];

  const columns = useMemo(
    () => [
      {
        header: t("ads:table.bookings.zone"),
        accessor: (item) => item.ad_zone?.id ?? item.ad_zone_id ?? "—",
      },
      {
        header: t("ads:table.bookings.position"),
        accessor: "position",
      },
      {
        header: t("ads:table.bookings.dates"),
        accessor: (item) => {
          const dates = item.dates ?? item.booked_dates ?? [];
          return Array.isArray(dates) ? dates.join(", ") : "—";
        },
      },
      {
        header: t("ads:table.bookings.status"),
        accessor: (item) => (
          <span className="rounded-full bg-watfil-background-secondary px-3 py-1 text-xs font-semibold text-watfil-text-secondary">
            {t(`ads:statuses.${item.status}`, { defaultValue: item.status })}
          </span>
        ),
      },
      {
        header: t("ads:table.bookings.campaign"),
        accessor: (item) => item.ad_campaign?.title ?? item.campaign_title ?? "—",
      },
    ],
    [t],
  );

  return (
    <div className="space-y-4">
      <SearchFilterToolbar
        searchValue=""
        onSearchChange={() => {}}
        searchDisabled
        filters={[
          {
            key: "status",
            value: status,
            onChange: (value) => {
              setStatus(value);
              setPage(1);
            },
            options: statusOptions,
            placeholder: t("ads:filters.status"),
          },
        ]}
        showReset
        onReset={() => {
          setStatus("");
          setPage(1);
        }}
      />

      <AdsStateMessage isLoading={isLoading} isError={isError}>
        <DataTable
          data={items}
          columns={columns}
          keyExtractor={(item) => item.id}
          emptyMessage={t("common:noData")}
        />

        <Pagination
          className="mt-6"
          currentPage={page}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          onPageChange={setPage}
        />
      </AdsStateMessage>
    </div>
  );
}
