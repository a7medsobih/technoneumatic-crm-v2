import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useCompanyLogin } from "../hooks/useCompanyLogin";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const loginMutation = useCompanyLogin();

  const handleLogin = async (values, { setError }) => {
    try {
      await loginMutation.mutateAsync(values);
      navigate("/", { replace: true });
    } catch {
      setError("root", {
        type: "server",
        message: t("loginFailed"),
      });
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}
