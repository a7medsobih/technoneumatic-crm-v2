import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Building2,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { createLoginSchema } from "../schemas/login.schema";

export default function LoginForm({ onSubmit }) {
  const { t } = useTranslation("auth");
  const { t: tCommon } = useTranslation("common");
  const [showPassword, setShowPassword] = useState(false);
  const loginSchema = useMemo(() => createLoginSchema(t), [t]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      tax_number: "",
      password: "",
      rememberMe: false,
    },
  });

  const firstError =
    errors.tax_number?.message ||
    errors.password?.message ||
    errors.root?.message;

  return (
    <div className="watfil-card watfil-card-glass w-full p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-3xl bg-(--watfil-gradient-primary) text-2xl font-black text-white shadow-(--watfil-shadow-button)">
          W
        </div>
        <p className="text-sm font-semibold text-primary">{t("brand")}</p>
        <h1 className="mt-2 text-3xl font-bold text-watfil-text-primary">
          {t("welcomeBack")}
        </h1>
        <p className="mt-3 text-sm leading-6 text-watfil-text-secondary">
          {t("loginDescription")}
        </p>
      </div>

      {firstError && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{firstError}</span>
        </div>
      )}

      <form
        className="space-y-5"
        onSubmit={handleSubmit((values) => onSubmit(values, { setError }))}
        noValidate
      >
        <div className="space-y-2">
          <label
            htmlFor="tax_number"
            className="text-sm font-semibold text-watfil-text-primary"
          >
            {t("taxNumber")}
          </label>
          <div className="relative">
            <Building2
              size={18}
              className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-watfil-text-tertiary"
            />
            <input
              id="tax_number"
              type="text"
              autoComplete="username"
              className="h-12 w-full rounded-2xl border border-watfil-border bg-watfil-card-bg px-11 text-sm text-watfil-text-primary outline-none transition placeholder:text-watfil-text-tertiary focus:border-primary focus:ring-4 focus:ring-primary/10"
              placeholder={t("taxNumberPlaceholder")}
              {...register("tax_number")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-watfil-text-primary"
          >
            {t("password")}
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-watfil-text-tertiary"
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="h-12 w-full rounded-2xl border border-watfil-border bg-watfil-card-bg px-11 text-sm text-watfil-text-primary outline-none transition placeholder:text-watfil-text-tertiary focus:border-primary focus:ring-4 focus:ring-primary/10"
              placeholder={t("passwordPlaceholder")}
              {...register("password")}
            />
            <button
              type="button"
              className="absolute end-3 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-xl text-watfil-text-secondary transition hover:bg-watfil-background-secondary hover:text-primary"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={
                showPassword ? tCommon("hidePassword") : tCommon("showPassword")
              }
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-3 text-sm font-medium text-watfil-text-secondary">
          <input
            type="checkbox"
            className="size-4 rounded border-watfil-border text-primary focus:ring-primary"
            {...register("rememberMe")}
          />
          <span>{t("rememberMe")}</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="watfil-button-primary flex h-12 w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting && <LoaderCircle size={18} className="animate-spin" />}
          <span>{isSubmitting ? t("signingIn") : t("loginCta")}</span>
        </button>
      </form>
    </div>
  );
}
