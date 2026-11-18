import { createSlice } from "@reduxjs/toolkit";

import { authStorage } from "@/shared/api";

const initialToken = authStorage.get();

const initialState = {
  token: initialToken || null,
  company: null,
  isAuthenticated: Boolean(initialToken),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { token, company } = action.payload || {};

      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }

      if (company) {
        state.company = company;
      }
    },
    setCompany(state, action) {
      state.company = action.payload || null;
    },
    clearCredentials(state) {
      state.token = null;
      state.company = null;
      state.isAuthenticated = false;
    },
  },
});

export const { clearCredentials, setCompany, setCredentials } =
  authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthCompany = (state) => state.auth.company;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
