import { z } from "zod";

import { AD_POSITIONS } from "../constants/adConstants";

export function createBookingSchema(t) {
  return z.object({
    ad_zone_id: z.coerce
      .number({ invalid_type_error: t("validation.zoneRequired") })
      .int()
      .positive(t("validation.zoneRequired")),
    position: z.coerce
      .number({ invalid_type_error: t("validation.positionRequired") })
      .refine((value) => AD_POSITIONS.includes(value), {
        message: t("validation.positionInvalid"),
      }),
    ad_campaign_id: z.coerce
      .number({ invalid_type_error: t("validation.campaignRequired") })
      .int()
      .positive(t("validation.campaignRequired")),
    dates: z
      .array(z.string().min(1))
      .min(1, t("validation.datesRequired")),
  });
}
