import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend"; // if we load translation files from backend
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "ar",
    supportedLngs: ["ar", "en"],
    ns: ["common", "auth", "dashboard", "ads", "customers", "errors"],
    defaultNS: "common",
    detection: {
      order: ["localStorage", "cookie", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
