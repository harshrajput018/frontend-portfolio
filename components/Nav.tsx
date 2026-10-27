"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Search } from "./icons";
import { profile } from "@/data/content";

export const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const OPEN_PALETTE = "open-palette";

export default function Nav() {
  const [active, setActive] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div
        className="absolute left-0 top-0 h-0.5 bg-accent transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6" aria-label="Main">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          {profile.name.split(" ")[0].toLowerCase()}
          <span className="text-accent">.dev</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={`rounded-md px-3 py-2 text-sm transition ${
                  active === s.id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE))}
            className="flex h-9 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-muted transition hover:text-fg"
            aria-label="Open command palette"
          >
            <Search />
            <span className="hidden sm:inline">Jump to…</span>
            <kbd className="hidden rounded border border-line px-1.5 font-mono text-[11px] sm:inline">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
