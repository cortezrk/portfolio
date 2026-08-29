"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      data-hover
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className="rounded-full p-2 text-muted transition-colors hover:text-neon"
    >
      {theme === "dark" ? <Sun size={20} weight="duotone" /> : <Moon size={20} weight="duotone" />}
    </button>
  );
}