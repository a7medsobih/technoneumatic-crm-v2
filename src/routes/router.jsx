import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import FeaturePlaceholderPage from "@/pages/FeaturePlaceholderPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RouteError from "./RouteError";
import { LoginPage } from "@/features/auth";
import { AdsPage } from "@/features/ads";
import { CustomersPage } from "@/features/customers";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    errorElement: <RouteError />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <RouteError />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/ads",
            element: <AdsPage />,
          },
          {
            path: "/customers",
            element: <CustomersPage />,
          },
          {
            path: "/:featureKey",
            element: <FeaturePlaceholderPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
