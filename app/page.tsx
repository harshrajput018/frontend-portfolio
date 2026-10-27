import Nav from "@/components/Nav";
import CommandPalette from "@/components/CommandPalette";
import ProjectGrid, { FeaturedProject } from "@/components/ProjectGrid";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "@/components/icons";
import { experience, principles, profile, skills, stats } from "@/data/content";

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <Reveal>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 max-w-2xl leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}

function CodeCard() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-1 shadow-[var(--shadow)]">
      <div className="flex items-center gap-1.5 px-4 py-3" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted">harsh.ts</span>
      </div>
      <pre className="overflow-x-auto rounded-xl bg-surface-2 p-5 font-mono text-[13px] leading-6" aria-label="Profile summary as code">
        <code>
          <span className="text-accent">const</span> harsh = {"{\n"}
          {"  "}role: <span className="text-accent-2">&quot;Frontend Engineer&quot;</span>,{"\n"}
          {"  "}stack: [<span className="text-accent-2">&quot;React&quot;</span>, <span className="text-accent-2">&quot;TypeScript&quot;</span>, <span className="text-accent-2">&quot;Next.js&quot;</span>],{"\n"}
          {"  "}loves: [<span className="text-accent-2">&quot;real-time UIs&quot;</span>, <span className="text-accent-2">&quot;canvas&quot;</span>, <span className="text-accent-2">&quot;a11y&quot;</span>],{"\n"}
          {"  "}alsoShips: [<span className="text-accent-2">&quot;Node&quot;</span>, <span className="text-accent-2">&quot;FastAPI&quot;</span>, <span className="text-accent-2">&quot;Ionic&quot;</span>],{"\n"}
          {"  "}based: <span className="text-accent-2">&quot;New Delhi, IN&quot;</span>,{"\n"}
          {"}"};
        </code>
      </pre>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <CommandPalette />

      <main id="main">
        {/* Hero */}
        <section id="top" className="relative overflow-hidden">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <div>
              <p className="font-mono text-sm text-muted">
                Hi, I&apos;m <span className="text-fg">{profile.name}</span> 👋
              </p>
              <h1 className="mt-4 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
                {profile.role}
                <span className="mt-3 block text-2xl font-medium tracking-tight text-muted sm:text-3xl">{profile.stackLine}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.tagline}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#work" className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-bg transition hover:opacity-90">
                  See my work
                </a>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-medium transition hover:bg-surface-2"
                >
                  <Download /> Resume
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface text-muted transition hover:text-fg"
                >
                  <Github />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface text-muted transition hover:text-fg"
                >
                  <Linkedin />
                </a>
              </div>

              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-2xl font-semibold tracking-tight">{s.value}</dd>
                    <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Reveal delay={120}>
              <CodeCard />
            </Reveal>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Things I've built"
            intro="Four hard UI problems, each built without the library you'd normally reach for. Filter by what you care about, or press ⌘K to jump straight to one."
          />
          <div className="mt-10">
            <FeaturedProject />
          </div>
          <ProjectGrid />
        </section>

        {/* Experience */}
        <section id="experience" className="border-y border-line bg-surface/50">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <SectionHeading eyebrow="Experience" title="Where I've worked" />
            <ol className="mt-12 space-y-4">
              {experience.map((job, i) => (
                <Reveal key={job.company} delay={i * 60}>
                  <li className="grid gap-4 rounded-2xl border border-line bg-surface p-6 sm:grid-cols-[200px_1fr] sm:gap-8">
                    <div>
                      <p className="font-mono text-xs text-muted">{job.period}</p>
                      <p className="mt-1 text-xs text-muted">{job.place}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {job.role} <span className="text-muted">· {job.company}</span>
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                        {job.points.map((pt) => (
                          <li key={pt} className="flex gap-2.5">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech used">
                        {job.stack.map((s) => (
                          <li key={s} className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Skills + principles */}
        <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading eyebrow="Toolkit" title="What I work with" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((g, i) => (
              <Reveal key={g.group} delay={(i % 3) * 60}>
                <div className="h-full rounded-2xl border border-line bg-surface p-6">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-muted">{g.group}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li key={s} className="rounded-lg border border-line px-2.5 py-1 text-sm">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-20">
            <SectionHeading eyebrow="How I build" title="A few things I care about" />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-line bg-surface p-6">
                    <p className="font-mono text-sm text-accent">0{i + 1}</p>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-14">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-soft blur-3xl" aria-hidden="true" />
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Contact</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Let&apos;s build something people enjoy using.</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">
                The fastest way to reach me is email — or grab my resume below.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-bg transition hover:opacity-90">
                  <Mail /> {profile.email}
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium transition hover:bg-surface-2"
                >
                  <Linkedin /> LinkedIn <ArrowUpRight />
                </a>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium transition hover:bg-surface-2"
                >
                  <Download /> Resume (PDF)
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>
            Built with Next.js, TypeScript &amp; Tailwind CSS — no UI libraries.{" "}
            <a href={profile.source} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:text-fg">
              View source
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
