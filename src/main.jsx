import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { AppProviders } from "./app/providers/AppProviders.jsx";
import "./styles/globals.css";
import "./app/i18n/i18n.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
