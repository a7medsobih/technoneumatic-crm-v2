import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Select } from "@/shared/components/ui/select";

import {
  CAMPAIGN_STATUSES,
  COMMISSION_TYPES,
} from "../constants/adConstants";
import { createCampaignSchema } from "../schemas/campaign.schema";

const inputClassName =
  "h-11 w-full rounded-2xl border border-watfil-border bg-watfil-card-bg px-4 text-sm text-watfil-text-primary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

export function CampaignForm({ formId, defaultValues, onSubmit }) {
  const { t } = useTranslation("ads");
  const campaignSchema = useMemo(() => createCampaignSchema(t), [t]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: "",
      target_url: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      commission_type: COMMISSION_TYPES.PERCENTAGE,
      commission_amount: 1,
      status: CAMPAIGN_STATUSES.ACTIVE,
      ...defaultValues,
    },
  });

  const commissionType = watch("commission_type");
  const status = watch("status");

  const commissionTypeOptions = Object.values(COMMISSION_TYPES).map((value) => ({
    value,
    label: t(`commissionTypes.${value}`),
  }));

  const statusOptions = Object.values(CAMPAIGN_STATUSES).map((value) => ({
    value,
    label: t(`statuses.${value}`),
  }));

  return (
    <form
      id={formId}
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="space-y-2">
        <label className="text-sm font-semibold text-watfil-text-primary">
          {t("fields.title")}
        </label>
        <input className={inputClassName} {...register("title")} />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-watfil-text-primary">
          {t("fields.targetUrl")}
        </label>
        <input className={inputClassName} type="url" {...register("target_url")} />
        {errors.target_url && (
          <p className="text-sm text-red-600">{errors.target_url.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-watfil-text-primary">
            {t("fields.utmSource")}
          </label>
          <input className={inputClassName} {...register("utm_source")} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-watfil-text-primary">
            {t("fields.utmMedium")}
          </label>
          <input className={inputClassName} {...register("utm_medium")} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-watfil-text-primary">
            {t("fields.utmCampaign")}
          </label>
          <input className={inputClassName} {...register("utm_campaign")} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-watfil-text-primary">
            {t("fields.commissionType")}
          </label>
          <Select
            value={commissionType}
            onValueChange={(value) => setValue("commission_type", value)}
            options={commissionTypeOptions}
          />
          {errors.commission_type && (
            <p className="text-sm text-red-600">{errors.commission_type.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-watfil-text-primary">
            {t("fields.commissionAmount")}
          </label>
          <input
            className={inputClassName}
            type="number"
            min="0"
            step="0.01"
            {...register("commission_amount")}
          />
          {errors.commission_amount && (
            <p className="text-sm text-red-600">
              {errors.commission_amount.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-watfil-text-primary">
          {t("fields.status")}
        </label>
        <Select
          value={status}
          onValueChange={(value) => setValue("status", value)}
          options={statusOptions}
        />
        {errors.status && (
          <p className="text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>
    </form>
  );
}
