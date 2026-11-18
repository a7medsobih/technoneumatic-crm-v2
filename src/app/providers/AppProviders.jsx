import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { queryClient } from "../queryClient";
import { persistor, store } from "../store";
import { ThemeProvider } from "./ThemeProvider";
import ToastProvider from "@/app/providers/ToastProvider";

export function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>{children}</ThemeProvider>
          <ReactQueryDevtools />
          <ToastProvider />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
