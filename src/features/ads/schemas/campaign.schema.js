import { z } from "zod";

import {
  CAMPAIGN_STATUSES,
  COMMISSION_TYPES,
} from "../constants/adConstants";

export function createCampaignSchema(t) {
  return z.object({
    title: z.string().trim().min(1, t("validation.titleRequired")),
    target_url: z
      .string()
      .trim()
      .url(t("validation.targetUrlInvalid"))
      .min(1, t("validation.targetUrlRequired")),
    utm_source: z.string().trim().optional().or(z.literal("")),
    utm_medium: z.string().trim().optional().or(z.literal("")),
    utm_campaign: z.string().trim().optional().or(z.literal("")),
    commission_type: z.enum(
      [COMMISSION_TYPES.PERCENTAGE, COMMISSION_TYPES.FIXED],
      { message: t("validation.commissionTypeRequired") },
    ),
    commission_amount: z.coerce
      .number({ invalid_type_error: t("validation.commissionAmountRequired") })
      .positive(t("validation.commissionAmountPositive")),
    status: z.enum(
      [CAMPAIGN_STATUSES.ACTIVE, CAMPAIGN_STATUSES.PAUSED, CAMPAIGN_STATUSES.DRAFT],
      { message: t("validation.statusRequired") },
    ),
  });
}
