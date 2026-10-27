"use client";

import { useId, useRef, useState } from "react";
import { skills } from "@/data/content";

/** WAI-ARIA tabs: arrow keys move between groups, Home/End jump to the ends. */
export default function SkillTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const focus = (i: number) => {
    const n = (i + skills.length) % skills.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: skills.length - 1 };
    if (e.key in keys) {
      e.preventDefault();
      focus(keys[e.key]);
    }
  };

  const group = skills[active];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex justify-center">
        <div role="tablist" aria-label="Skill groups" onKeyDown={onKeyDown} className="flex max-w-full gap-1 overflow-x-auto rounded-xl border border-line bg-surface/70 p-1">
          {skills.map((g, i) => (
            <button
              key={g.group}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition ${
                i === active ? "bg-surface-2 text-fg shadow-sm" : "text-muted hover:text-fg"
              }`}
            >
              {g.group}
            </button>
          ))}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="mt-6 rounded-2xl border border-line bg-surface/60 p-6 sm:p-8"
      >
        <ul key={active} className="rise flex flex-wrap justify-center gap-2.5">
          {group.items.map((s) => (
            <li key={s} className="flex items-center gap-2 rounded-lg border border-line bg-surface-2/70 px-3 py-1.5 text-sm">
              <span className="font-mono text-[11px] text-accent" aria-hidden="true">
                &lt;/&gt;
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
