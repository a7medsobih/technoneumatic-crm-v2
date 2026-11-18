import { useEffect, useState } from "react";

import { ThemeContext } from "./themeContext";

export function ThemeProvider({ children, defaultTheme = "light" }) {
  const [theme, setThemeState] = useState(() => {
    const savedTheme = localStorage.getItem("watfil-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    return systemPrefersDark ? "dark" : defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("watfil-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
