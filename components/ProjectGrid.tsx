"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/content";
import { ArrowRight, ArrowUpRight, Github } from "./icons";
import Reveal from "./Reveal";

const VISIBLE_TAGS = 4;

function Shot({ project, priority = false }: { project: Project; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-surface-2">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.shot}
          alt={`Screenshot of ${project.name}`}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,var(--accent-soft),transparent_60%)]">
          <span className="text-2xl font-semibold tracking-tight text-muted">{project.name}</span>
        </div>
      )}
      {project.featured && (
        <span className="absolute left-3 top-3 rounded-full border border-line bg-bg/80 px-2.5 py-1 text-[11px] font-medium text-accent backdrop-blur">
          Featured
        </span>
      )}
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  const shown = items.slice(0, VISIBLE_TAGS);
  const extra = items.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
      {shown.map((s) => (
        <li key={s} className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs">
          {s}
        </li>
      ))}
      {extra > 0 && (
        <li className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs text-muted" title={items.slice(VISIBLE_TAGS).join(", ")}>
          +{extra}
          <span className="sr-only"> more: {items.slice(VISIBLE_TAGS).join(", ")}</span>
        </li>
      )}
    </ul>
  );
}

function Card({ p, priority }: { p: Project; priority: boolean }) {
  return (
    <article
      id={`project-${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/80 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[var(--shadow)]"
    >
      <Shot project={p} priority={priority} />
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
          <p className="mt-0.5 text-xs uppercase tracking-wider text-accent">{p.kind}</p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.summary}</p>
        </div>
        <Tags items={p.stack} />
        <ul className="space-y-2.5 text-sm leading-relaxed text-muted">
          {p.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2.5">
              <ArrowRight className="mt-[3px] h-4 w-4 shrink-0 text-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        {p.note && <p className="text-xs text-muted">{p.note}</p>}

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          {p.live ? (
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition hover:opacity-90"
            >
              Live demo <ArrowRight />
              <span className="sr-only">of {p.name} (opens in a new tab)</span>
            </a>
          ) : (
            <span className="text-xs text-muted">Live demo coming soon</span>
          )}
          <div className="flex items-center gap-1">
            {p.code && (
              <a
                href={p.code}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} source code on GitHub (opens in a new tab)`}
                className="grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-fg"
              >
                <Github />
              </a>
            )}
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${p.name} (opens in a new tab)`}
                className="grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-fg"
              >
                <ArrowUpRight />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 2) * 90} className="h-full">
          <Card p={p} priority={i < 2} />
        </Reveal>
      ))}
    </div>
  );
}
