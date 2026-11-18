import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import {
  clearCredentials,
  selectAuthToken,
  setCompany,
  useCompanyMe,
} from "@/features/auth";
import { authStorage } from "@/shared/api";

export default function ProtectedRoute() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation("common");
  const token = useSelector(selectAuthToken);
  const storedToken = authStorage.get();
  const companyQuery = useCompanyMe();

  useEffect(() => {
    if (companyQuery.data) {
      dispatch(setCompany(companyQuery.data));
    }
  }, [companyQuery.data, dispatch]);

  useEffect(() => {
    if (companyQuery.isError) {
      dispatch(clearCredentials());
    }
  }, [companyQuery.isError, dispatch]);

  useEffect(() => {
    if (token && !storedToken) {
      dispatch(clearCredentials());
    }
  }, [dispatch, storedToken, token]);

  if (!token || !storedToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (companyQuery.isLoading || companyQuery.isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-watfil-background-gray text-sm font-semibold text-watfil-text-secondary">
        {t("loading")}
      </div>
    );
  }

  if (companyQuery.isError) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
