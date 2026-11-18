import { z } from "zod";

export function createLoginSchema(t) {
  return z.object({
    tax_number: z.string().min(1, t("validation.taxNumberRequired")),
    password: z
      .string()
      .min(1, t("validation.passwordRequired"))
      .min(6, t("validation.passwordMin")),
    rememberMe: z.boolean().optional(),
  });
}
