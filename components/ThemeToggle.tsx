"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "./icons";
import { THEME_EVENT, getTheme, toggleTheme, type Theme } from "./theme";

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    setThemeState(getTheme());
    const onChange = (e: Event) => setThemeState((e as CustomEvent<Theme>).detail);
    window.addEventListener(THEME_EVENT, onChange);
    return () => window.removeEventListener(THEME_EVENT, onChange);
  }, []);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme ? `Switch to ${next} theme` : "Toggle theme"}
      className="grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-fg"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}
