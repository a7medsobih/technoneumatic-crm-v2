import { RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import router from "./routes/router.jsx";

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const language = i18n.resolvedLanguage || i18n.language || "ar";
    document.documentElement.lang = language;
    document.documentElement.dir = language.startsWith("ar") ? "rtl" : "ltr";
  }, [i18n.language, i18n.resolvedLanguage]);

  return <RouterProvider router={router} />;
}
