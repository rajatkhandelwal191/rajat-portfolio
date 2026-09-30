"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { logUiEvent } from "../lib/frontendLogger";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    // Check if the current page load is a reload (F5 / browser refresh)
    const navEntries = typeof window !== "undefined" && window.performance?.getEntriesByType?.("navigation");
    const isReload =
      (navEntries && navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === "reload") ||
      (typeof window !== "undefined" &&
        (window.performance as unknown as { navigation?: { type?: number } })?.navigation?.type === 1);

    if (isReload) {
      // User explicitly reloaded the page -> Reset to default "dark"
      try {
        sessionStorage.removeItem("portfolio_session_theme");
      } catch {
        // ignore storage errors
      }
      setThemeState("dark");
    } else {
      // User navigated / switched page -> preserve selected theme across page switches
      try {
        const savedTheme = sessionStorage.getItem("portfolio_session_theme") as Theme | null;
        if (savedTheme === "light" || savedTheme === "dark") {
          setThemeState(savedTheme);
        }
      } catch {
        // ignore storage errors
      }
    }
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    try {
      sessionStorage.setItem("portfolio_session_theme", next);
    } catch {
      // ignore storage errors
    }
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    logUiEvent("theme_toggle_clicked", { from: theme, to: next });
  };

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
