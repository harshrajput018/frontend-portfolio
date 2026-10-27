"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/content";

function Shot({ project, eager = false, className = "" }: { project: Project; eager?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`overflow-hidden rounded-soft border border-rule bg-paper-2 ${className}`}>
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.shot}
          alt={`Screenshot of ${project.name}`}
          loading={eager ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className="block h-full w-full object-cover object-top"
        />
      ) : (
        <div className="grid h-full min-h-40 place-items-center font-serif text-h3 text-ink-3">{project.name}</div>
      )}
    </div>
  );
}

function Links({ p }: { p: Project }) {
  return (
    <p className="flex gap-5 text-small">
      {p.live && (
        <a href={p.live} target="_blank" rel="noopener noreferrer" className="link text-accent">
          open the demo<span className="sr-only"> of {p.name} (new tab)</span> ↗
        </a>
      )}
      {p.code && (
        <a href={p.code} target="_blank" rel="noopener noreferrer" className="link text-ink-2">
          source<span className="sr-only"> of {p.name} on GitHub (new tab)</span>
        </a>
      )}
    </p>
  );
}

const Stack = ({ items }: { items: string[] }) => <p className="font-mono text-meta text-ink-3">{items.join(" / ")}</p>;

/** The lead project gets the room: a wide screenshot, then text split unevenly beneath it. */
export function LeadProject() {
  const p = projects.find((x) => x.featured)!;
  return (
    <article id={`project-${p.slug}`} className="grid grid-cols-12 gap-x-5">
      <Shot project={p} eager className="col-span-12 aspect-[16/9]" />
      <div className="col-span-12 mt-5 md:col-span-4">
        <h3 className="font-serif text-h3">{p.name}</h3>
        <p className="mt-1 text-small text-ink-2">{p.kind}</p>
        <div className="mt-3">
          <Stack items={p.stack} />
        </div>
      </div>
      <div className="col-span-12 mt-3 md:col-span-7 md:col-start-6 md:mt-5">
        <p className="text-lead text-ink">{p.summary}</p>
        <ul className="mt-5 space-y-2 text-small text-ink-2">
          {p.highlights.map((h) => (
            <li key={h} className="grid grid-cols-[20px_1fr]">
              <span className="text-ink-3" aria-hidden="true">
                –
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
        {p.note && <p className="mt-3 text-small italic text-ink-2">{p.note}</p>}
        <div className="mt-5">
          <Links p={p} />
        </div>
      </div>
    </article>
  );
}

/** Everything else as a ruled list: number, name, the point, a small picture off to the side. */
export default function ProjectList() {
  const rest = projects.filter((p) => !p.featured);
  return (
    <ol className="border-t border-rule">
      {rest.map((p, i) => (
        <li key={p.slug} id={`project-${p.slug}`} className="grid grid-cols-12 gap-x-5 gap-y-3 border-b border-rule py-8 last:border-b-0">
          <span className="col-span-12 font-mono text-meta text-ink-3 md:col-span-1 md:pt-2">0{i + 2}</span>
          <div className="col-span-12 md:col-span-3">
            <h3 className="font-serif text-h3">{p.name}</h3>
            <p className="mt-1 text-small text-ink-2">{p.kind}</p>
          </div>
          <div className="col-span-12 md:col-span-5">
            <p className="text-body">{p.summary}</p>
            <p className="mt-3 text-small text-ink-2">{p.highlights[0]}</p>
            <div className="mt-3">
              <Stack items={p.stack} />
            </div>
            <div className="mt-3">
              <Links p={p} />
            </div>
          </div>
          <Shot project={p} className="col-span-12 aspect-[4/3] md:col-span-3" />
        </li>
      ))}
    </ol>
  );
}
