import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/shared/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="group relative flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-border bg-accent text-watfil-text-secondary shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-watfil-background-secondary hover:text-primary hover:shadow-md active:scale-95"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span className="absolute inset-0 scale-0 rounded-full bg-primary opacity-10 transition-transform duration-300 group-hover:scale-100" />
      {theme === "light" ? (
        <Moon
          size={18}
          className="relative z-10 transition-transform duration-200 group-hover:rotate-12"
        />
      ) : (
        <Sun
          size={18}
          className="relative z-10 transition-transform duration-200 group-hover:rotate-12"
        />
      )}
    </button>
  );
}
