"use client";

import { useMemo, useState } from "react";
import { projects, tags, type Project, type Tag } from "@/data/content";
import { ArrowUpRight, Github } from "./icons";
import Reveal from "./Reveal";

function Shot({ project, priority = false }: { project: Project; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface-2">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.shot}
          alt={`Screenshot of ${project.name}`}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,var(--accent-soft),transparent_60%)]">
          <span className="font-mono text-sm text-muted">{project.name}</span>
        </div>
      )}
    </div>
  );
}

function Links({ project }: { project: Project }) {
  if (!project.live && !project.code) return <p className="font-mono text-xs text-muted">Live demo &amp; source: deploying soon</p>;
  return (
    <div className="flex flex-wrap gap-2">
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-fg px-3 py-1.5 text-sm font-medium text-bg transition hover:opacity-85"
        >
          Live demo <ArrowUpRight />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
      {project.code && (
        <a
          href={project.code}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm text-fg transition hover:bg-surface-2"
        >
          <Github /> Code
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

function StackList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
      {items.map((s) => (
        <li key={s} className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">
          {s}
        </li>
      ))}
    </ul>
  );
}

export function FeaturedProject() {
  const p = projects.find((x) => x.featured)!;
  return (
    <Reveal>
      <article id={`project-${p.slug}`} className="group grid gap-8 rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow)] sm:p-8 lg:grid-cols-[1.15fr_1fr]">
        <Shot project={p} priority />
        <div className="flex flex-col gap-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">Featured · {p.kind}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{p.name}</h3>
            <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>
          </div>
          <ul className="space-y-2.5 text-sm leading-relaxed">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <StackList items={p.stack} />
          <div className="mt-auto space-y-2">
            <Links project={p} />
            {p.note && <p className="text-xs text-muted">{p.note}</p>}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function ProjectGrid() {
  const [filter, setFilter] = useState<Tag | "All">("All");
  const rest = useMemo(() => projects.filter((p) => !p.featured), []);
  const shown = filter === "All" ? rest : rest.filter((p) => p.tags.includes(filter));
  const counts = useMemo(
    () => Object.fromEntries(tags.map((t) => [t, rest.filter((p) => p.tags.includes(t)).length])) as Record<Tag, number>,
    [rest],
  );

  return (
    <div className="mt-14">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by technology">
        {(["All", ...tags.filter((t) => counts[t] > 0)] as const).map((t) => {
          const isOn = filter === t;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={isOn}
              onClick={() => setFilter(t)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                isOn ? "border-accent bg-accent-soft text-fg" : "border-line text-muted hover:text-fg"
              }`}
            >
              {t}
              <span className="ml-1.5 font-mono text-[11px] opacity-70">{t === "All" ? rest.length : counts[t]}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} projects
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {shown.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 80}>
            <article id={`project-${p.slug}`} className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow)]">
              <Shot project={p} />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{p.kind}</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
              </div>
              <ul className="space-y-1.5 text-sm">
                {p.highlights.slice(0, 2).map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <StackList items={p.stack} />
              <div className="mt-auto pt-1">
                <Links project={p} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
