"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { profile } from "@/data/content";

export const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Toolkit" },
  { id: "notes", label: "Notes" },
  { id: "contact", label: "Contact" },
];

export const OPEN_PALETTE = "open-palette";

/**
 * The page's navigation is an index, not a bar: a sticky left column on wide screens
 * (name, numbered sections, contact) and a plain header block on small ones.
 */
export default function Nav() {
  const [active, setActive] = useState("");
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    const onScroll = () => window.scrollY < 240 && setActive("");
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="flex flex-col border-b border-rule px-5 pb-5 pt-8 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:px-0 lg:py-14">
      <a href="#top" className="font-serif text-h3 text-ink">
        {profile.name}
      </a>
      <p className="mt-1 text-small text-ink-2">frontend engineer, new delhi</p>

      <nav aria-label="Sections" className="mt-5 lg:mt-14">
        <ol className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-meta lg:flex-col">
          {sections.map((s, i) => {
            const on = active === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  aria-current={on ? "true" : undefined}
                  className={`group flex items-baseline gap-3 py-1 transition-colors duration-150 ease-out ${on ? "text-ink" : "text-ink-3 hover:text-ink"}`}
                >
                  <span className={on ? "text-accent" : ""}>0{i + 1}</span>
                  <span className="lowercase">{s.label}</span>
                  <span
                    className={`hidden h-px bg-accent transition-[width] duration-200 ease-out lg:block ${on ? "w-8" : "w-0"}`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mt-auto hidden space-y-3 pt-14 text-small lg:block">
        <ul className="space-y-1 text-ink-2">
          <li>
            <a href={`mailto:${profile.email}`} className="link">
              {profile.email}
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link">
              github
            </a>
            <span className="text-ink-3"> · </span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link">
              linkedin
            </a>
            <span className="text-ink-3"> · </span>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="link">
              resume
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-5 font-mono text-meta text-ink-3">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE))}
            className="transition-colors duration-150 ease-out hover:text-ink"
            aria-label="Open command palette"
          >
            {isMac ? "⌘K" : "ctrl K"} to jump
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
