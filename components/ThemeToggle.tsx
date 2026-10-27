"use client";

import { useEffect, useState } from "react";
import { THEME_EVENT, getTheme, toggleTheme, type Theme } from "./theme";

/** A word, not an icon: says which theme you'd switch to. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
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
      aria-label={`Switch to ${next} theme`}
      className={`font-mono text-meta text-ink-3 transition-colors duration-150 ease-out hover:text-ink ${className}`}
    >
      {next} mode
    </button>
  );
}
