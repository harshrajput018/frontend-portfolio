"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile, projects } from "@/data/content";
import { OPEN_PALETTE, sections } from "./Nav";
import { toggleTheme } from "./theme";
import { ArrowUpRight, Copy, Download, Github, Hash, Linkedin, Moon } from "./icons";

type Action = {
  id: string;
  label: string;
  hint: string;
  group: "Navigate" | "Projects" | "Actions";
  icon: React.ReactNode;
  run: () => void;
};

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: "start" });
  history.replaceState(null, "", `#${id}`);
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 1800);
  };

  const actions = useMemo<Action[]>(
    () => [
      ...sections.map((s) => ({
        id: `nav-${s.id}`,
        label: s.label,
        hint: "Section",
        group: "Navigate" as const,
        icon: <Hash />,
        run: () => go(s.id),
      })),
      ...projects.map((p) => ({
        id: `proj-${p.slug}`,
        label: p.name,
        hint: p.kind,
        group: "Projects" as const,
        icon: <ArrowUpRight />,
        run: () => go(`project-${p.slug}`),
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        icon: <Copy />,
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(
            () => notify("Email copied"),
            () => notify(profile.email),
          );
        },
      },
      { id: "resume", label: "Download resume", hint: "PDF", group: "Actions", icon: <Download />, run: () => window.open(profile.resume, "_blank") },
      { id: "github", label: "Open GitHub", hint: "harshrajput018", group: "Actions", icon: <Github />, run: () => window.open(profile.github, "_blank", "noopener") },
      { id: "linkedin", label: "Open LinkedIn", hint: "Profile", group: "Actions", icon: <Linkedin />, run: () => window.open(profile.linkedin, "_blank", "noopener") },
      { id: "theme", label: "Toggle light / dark theme", hint: "Appearance", group: "Actions", icon: <Moon />, run: toggleTheme },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.label} ${a.hint} ${a.group}`.toLowerCase().includes(q));
  }, [actions, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
    restoreFocus.current?.focus();
  }, []);

  const openPalette = useCallback(() => {
    restoreFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open ? close() : openPalette();
      }
    };
    const onOpen = () => openPalette();
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE, onOpen);
    };
  }, [open, close, openPalette]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  const run = (a: Action | undefined) => {
    if (!a) return;
    close();
    window.setTimeout(a.run, 0);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[index]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  let lastGroup = "";

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[14vh] backdrop-blur-sm" onMouseDown={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow)]"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKey}
              placeholder="Search sections, projects, actions…"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={filtered[index] ? `opt-${filtered[index].id}` : undefined}
              className="w-full border-b border-line bg-transparent px-4 py-3.5 text-[15px] outline-none placeholder:text-muted"
            />
            <ul id="palette-list" role="listbox" className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No matches for “{query}”</li>}
              {filtered.map((a, i) => {
                const header = a.group !== lastGroup ? a.group : null;
                lastGroup = a.group;
                return (
                  <li key={a.id} role="presentation">
                    {header && <div className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-wider text-muted">{header}</div>}
                    <div
                      id={`opt-${a.id}`}
                      role="option"
                      aria-selected={i === index}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => run(a)}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                        i === index ? "bg-accent-soft text-fg" : "text-muted"
                      }`}
                    >
                      <span className={i === index ? "text-accent" : ""}>{a.icon}</span>
                      <span className="text-fg">{a.label}</span>
                      <span className="ml-auto truncate text-xs text-muted">{a.hint}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex gap-4 border-t border-line px-4 py-2 font-mono text-[11px] text-muted">
              <span>↑↓ move</span>
              <span>↵ open</span>
              <span>esc close</span>
            </div>
          </div>
        </div>
      )}
      <div role="status" aria-live="polite" className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        {toast && <div className="rounded-lg border border-line bg-surface px-4 py-2 text-sm shadow-[var(--shadow)]">{toast}</div>}
      </div>
    </>
  );
}
