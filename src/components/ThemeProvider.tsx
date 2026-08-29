"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const THEME_EVENT = "themechange";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

const getServerTheme = () => "dark" as const;

// Notify the store whenever the theme attribute changes (toggle or OS change).
function subscribe(callback: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: light)");

  const onOsChange = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored || stored === "system") {
        document.documentElement.dataset.theme = getSystemTheme();
      }
    } catch {
      // storage unavailable — keep current theme
    }
    callback();
  };

  mq.addEventListener("change", onOsChange);
  document.addEventListener(THEME_EVENT, callback);

  return () => {
    mq.removeEventListener("change", onOsChange);
    document.removeEventListener(THEME_EVENT, callback);
  };
}

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerTheme);

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable — keep in-memory only
    }
    document.dispatchEvent(new Event(THEME_EVENT));
  }, [theme]);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}