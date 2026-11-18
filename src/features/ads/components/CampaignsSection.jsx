import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { DataTable } from "@/shared/components/data-table";
import {
  getPaginationFromMeta,
  Pagination,
} from "@/shared/components/pagination";
import { SearchFilterToolbar } from "@/shared/components/toolbar";
import { Button } from "@/shared/components/ui/button";
import { FormModal } from "@/shared/components/ui/formModal";
import { appToast } from "@/shared/lib/toast";

import {
  CAMPAIGN_STATUSES,
  DEFAULT_ADS_PAGE_SIZE,
} from "../constants/adConstants";
import { useAdCampaigns } from "../hooks/useAdCampaigns";
import { useCreateAdCampaign } from "../hooks/useCreateAdCampaign";
import { useUpdateAdCampaign } from "../hooks/useUpdateAdCampaign";
import { AdsStateMessage } from "./AdsStateMessage";
import { CampaignForm } from "./CampaignForm";

const CAMPAIGN_FORM_ID = "campaign-form";

export function CampaignsSection() {
  const { t } = useTranslation("ads");
  const { t: tCommon } = useTranslation("common");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

  const filters = useMemo(
    () => ({
      per_page: DEFAULT_ADS_PAGE_SIZE,
      page,
      ...(status ? { status } : {}),
      ...(search ? { search } : {}),
    }),
    [page, search, status],
  );

  const { data, isLoading, isError } = useAdCampaigns(filters);
  const createCampaign = useCreateAdCampaign();
  const updateCampaign = useUpdateAdCampaign();

  const items = data?.items ?? [];
  const pagination = getPaginationFromMeta(data?.meta);
  const isSaving = createCampaign.isPending || updateCampaign.isPending;

  const statusOptions = [
    { value: "", label: t("filters.allStatuses") },
    ...Object.values(CAMPAIGN_STATUSES).map((value) => ({
      value,
      label: t(`statuses.${value}`),
    })),
  ];

  const columns = useMemo(
    () => [
      {
        header: t("table.campaigns.title"),
        accessor: "title",
        sortable: true,
      },
      {
        header: t("table.campaigns.status"),
        accessor: (item) => (
          <span className="rounded-full bg-watfil-background-secondary px-3 py-1 text-xs font-semibold text-watfil-text-secondary">
            {t(`statuses.${item.status}`, { defaultValue: item.status })}
          </span>
        ),
      },
      {
        header: t("table.campaigns.commission"),
        accessor: (item) =>
          item.commission_type === "percentage"
            ? `${item.commission_amount}%`
            : `${item.commission_amount}`,
      },
      {
        header: t("table.campaigns.targetUrl"),
        accessor: (item) => (
          <a
            href={item.target_url}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
            onClick={(event) => event.stopPropagation()}
          >
            {item.target_url}
          </a>
        ),
      },
      {
        header: t("table.campaigns.actions"),
        variant: "actions",
        accessor: (item) => (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              setEditingCampaign(item);
              setModalOpen(true);
            }}
          >
            {t("actions.editCampaign")}
          </Button>
        ),
      },
    ],
    [t],
  );

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingCampaign(null);
  };

  const handleSubmit = async (values) => {
    try {
      if (editingCampaign?.id) {
        await updateCampaign.mutateAsync({
          campaignId: editingCampaign.id,
          data: values,
        });
        appToast.success(t("messages.campaignUpdated"));
      } else {
        await createCampaign.mutateAsync(values);
        appToast.success(t("messages.campaignCreated"));
      }

      handleCloseModal();
    } catch {
      appToast.error(t("messages.saveError"));
    }
  };

  return (
    <div className="space-y-4">
      <SearchFilterToolbar
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        searchPlaceholder={t("table.campaigns.title")}
        filters={[
          {
            key: "status",
            value: status,
            onChange: (value) => {
              setStatus(value);
              setPage(1);
            },
            options: statusOptions,
            placeholder: t("filters.status"),
          },
        ]}
        showReset
        onReset={() => {
          setSearch("");
          setStatus("");
          setPage(1);
        }}
        actions={
          <Button
            type="button"
            onClick={() => {
              setEditingCampaign(null);
              setModalOpen(true);
            }}
          >
            {t("actions.createCampaign")}
          </Button>
        }
      />

      <AdsStateMessage isLoading={isLoading} isError={isError}>
        <DataTable
          data={items}
          columns={columns}
          keyExtractor={(item) => item.id}
          emptyMessage={tCommon("noData")}
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

      <FormModal
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseModal();
        }}
        title={
          editingCampaign
            ? t("actions.editCampaign")
            : t("actions.createCampaign")
        }
        formId={CAMPAIGN_FORM_ID}
        loading={isSaving}
      >
        <CampaignForm
          key={editingCampaign?.id ?? "new"}
          formId={CAMPAIGN_FORM_ID}
          defaultValues={editingCampaign ?? undefined}
          onSubmit={handleSubmit}
        />
      </FormModal>
    </div>
  );
}
