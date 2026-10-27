"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/content";
import { ArrowUp, Github, Linkedin, Mail } from "./icons";

const rail = [
  { href: profile.github, label: "GitHub", icon: <Github />, external: true },
  { href: profile.linkedin, label: "LinkedIn", icon: <Linkedin />, external: true },
  { href: `mailto:${profile.email}`, label: "Email", icon: <Mail />, external: false },
];

/** Social links pinned to the right edge on wide screens, plus a back-to-top button once you've scrolled. */
export default function FloatingControls() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ul className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex" aria-label="Social links">
        {rail.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={l.external ? `${l.label} (opens in a new tab)` : l.label}
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/80 text-muted backdrop-blur transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              {l.icon}
            </a>
          </li>
        ))}
        <li className="h-20 w-px bg-line" aria-hidden="true" />
      </ul>

      <a
        href="#top"
        aria-label="Back to top"
        tabIndex={scrolled ? 0 : -1}
        aria-hidden={!scrolled}
        className={`fixed bottom-5 right-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-accent text-bg shadow-[var(--shadow)] transition hover:-translate-y-0.5 ${
          scrolled ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp />
      </a>
    </>
  );
}
