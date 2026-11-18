import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectIsAuthenticated } from "@/features/auth";
import { authStorage } from "@/shared/api";

export default function PublicRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated && authStorage.get()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
