import { LoaderCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/components/ui/button";
import { Modal } from "@/shared/components/ui/dialog";

/**
 * Modal shell for create / update forms. The page owns the form (React Hook
 * Form + Zod) and passes it as children. Wire submit via `formId` or `onSubmit`.
 */
export function FormModal({
  open,
  isOpen,
  onOpenChange,
  onClose,
  title,
  description,
  size = "md",
  children,
  onSubmit,
  onCancel,
  submitLabel,
  cancelLabel,
  loading = false,
  loadingLabel,
  submitIcon,
  formId,
}) {
  const { t } = useTranslation("common");

  const resolvedOpen = open ?? isOpen ?? false;

  const handleOpenChange = (nextOpen) => {
    onOpenChange?.(nextOpen);
    if (!nextOpen) {
      onClose?.();
    }
  };

  const handleClose = () => {
    handleOpenChange(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }
    handleClose();
  };

  const resolvedSubmitLabel = submitLabel ?? t("save");
  const resolvedCancelLabel = cancelLabel ?? t("cancel");
  const resolvedLoadingLabel = loadingLabel ?? t("modal.saving");

  return (
    <Modal
      open={resolvedOpen}
      onOpenChange={handleOpenChange}
      title={title}
      description={description}
      size={size}
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
          >
            {resolvedCancelLabel}
          </Button>
          <Button
            type={formId ? "submit" : "button"}
            form={formId}
            onClick={formId ? undefined : onSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" size={16} />
                {resolvedLoadingLabel}
              </>
            ) : (
              <>
                {submitIcon}
                {resolvedSubmitLabel}
              </>
            )}
          </Button>
        </>
      }
    >
      {children}
    </Modal>
  );
}
