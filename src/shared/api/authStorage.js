import Cookies from "js-cookie";

const STORAGE_TYPE = import.meta.env.VITE_AUTH_STORAGE || "cookie";
const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || "token";

export const authStorage = {
  get() {
    return STORAGE_TYPE === "cookie"
      ? Cookies.get(TOKEN_KEY)
      : localStorage.getItem(TOKEN_KEY);
  },

  set(token) {
    if (!token) return;

    if (STORAGE_TYPE === "cookie") {
      Cookies.set(TOKEN_KEY, token);
      return;
    }

    localStorage.setItem(TOKEN_KEY, token);
  },

  remove() {
    if (STORAGE_TYPE === "cookie") {
      Cookies.remove(TOKEN_KEY);
      return;
    }

    localStorage.removeItem(TOKEN_KEY);
  },
};
