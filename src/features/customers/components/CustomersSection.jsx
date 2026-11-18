import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { DataTable } from "@/shared/components/data-table";
import {
  getPaginationFromMeta,
  Pagination,
} from "@/shared/components/pagination";
import { SearchFilterToolbar } from "@/shared/components/toolbar";

import {
  DEFAULT_CUSTOMERS_PAGE_SIZE,
  LINK_STATUSES,
} from "../constants/customerConstants";
import { useCustomers } from "../hooks/useCustomers";
import { CustomersStateMessage } from "./CustomersStateMessage";

function getGovernorateName(governorate, language) {
  if (!governorate) return "—";
  return language === "ar" ? governorate.name_ar : governorate.name_en;
}

export function CustomersSection() {
  const { t, i18n } = useTranslation(["customers", "common"]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const filters = useMemo(
    () => ({
      per_page: DEFAULT_CUSTOMERS_PAGE_SIZE,
      page,
      ...(status ? { status } : {}),
      ...(search ? { search } : {}),
    }),
    [page, search, status],
  );

  const { data, isLoading, isError } = useCustomers(filters);
  const items = data?.items ?? [];
  const pagination = getPaginationFromMeta(data?.meta);

  const statusOptions = [
    { value: "", label: t("customers:filters.allStatuses") },
    ...Object.values(LINK_STATUSES).map((value) => ({
      value,
      label: t(`customers:statuses.${value}`),
    })),
  ];

  const columns = useMemo(
    () => [
      {
        header: t("customers:table.name"),
        accessor: (item) => item.customer?.profile?.full_name ?? "—",
      },
      {
        header: t("customers:table.phone"),
        accessor: (item) => item.customer?.phone ?? "—",
      },
      {
        header: t("customers:table.email"),
        accessor: (item) => item.customer?.email ?? "—",
      },
      {
        header: t("customers:table.governorate"),
        accessor: (item) =>
          getGovernorateName(
            item.customer?.profile?.governorate,
            i18n.language,
          ),
      },
      {
        header: t("customers:table.status"),
        accessor: (item) => (
          <span className="rounded-full bg-watfil-background-secondary px-3 py-1 text-xs font-semibold text-watfil-text-secondary">
            {t(`customers:statuses.${item.status}`, {
              defaultValue: item.status,
            })}
          </span>
        ),
      },
      {
        header: t("customers:table.linkedAt"),
        accessor: (item) => item.linked_at ?? "—",
      },
      {
        header: t("customers:table.riskFlag"),
        accessor: (item) => {
          const hasRisk = item.customer?.profile?.risk_flag;

          return (
            <span
              className={
                hasRisk
                  ? "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-200"
                  : "rounded-full bg-watfil-background-secondary px-3 py-1 text-xs font-semibold text-watfil-text-secondary"
              }
            >
              {hasRisk
                ? t("customers:fields.riskYes")
                : t("customers:fields.riskNo")}
            </span>
          );
        },
      },
    ],
    [i18n.language, t],
  );

  return (
    <div className="space-y-4">
      <SearchFilterToolbar
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        searchPlaceholder={t("customers:filters.search")}
        filters={[
          {
            key: "status",
            value: status,
            onChange: (value) => {
              setStatus(value);
              setPage(1);
            },
            options: statusOptions,
            placeholder: t("customers:filters.status"),
          },
        ]}
        showReset
        onReset={() => {
          setSearch("");
          setStatus("");
          setPage(1);
        }}
      />

      <CustomersStateMessage isLoading={isLoading} isError={isError}>
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
      </CustomersStateMessage>
    </div>
  );
}
