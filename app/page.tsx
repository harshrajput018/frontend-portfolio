import Nav from "@/components/Nav";
import CommandPalette from "@/components/CommandPalette";
import Starfield from "@/components/Starfield";
import FloatingControls from "@/components/FloatingControls";
import RotatingText from "@/components/RotatingText";
import SkillTabs from "@/components/SkillTabs";
import ProjectGrid from "@/components/ProjectGrid";
import Reveal from "@/components/Reveal";
import { ArrowRight, ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Phone } from "@/components/icons";
import { experience, principles, profile, stats } from "@/data/content";

const roles = ["Frontend Engineer", "Real-time Collaboration", "Data-heavy Interfaces", "Accessible Components"];

function SectionHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <Reveal className="text-center">
      <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">{title}</h2>
      {intro && <p className="mx-auto mt-3 max-w-2xl text-lg text-muted">{intro}</p>}
    </Reveal>
  );
}

function Band({ id, alt = false, children }: { id: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={alt ? "bg-bg-2/80" : "bg-bg/80"}>
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">{children}</div>
    </section>
  );
}

const S = ({ children }: { children: React.ReactNode }) => <span className="text-accent-2">{children}</span>;
const K = ({ children }: { children: React.ReactNode }) => <span className="text-accent">{children}</span>;

/** Hero visual: the profile written as a TypeScript object in an editor window. */
function CodeCard() {
  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-accent-soft blur-3xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-[var(--shadow)] backdrop-blur">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 rounded-md bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">harsh.ts</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:p-6 sm:text-sm" aria-label="Profile summary written as code">
          <code>
            <K>const</K> harsh = {"{\n"}
            {"  "}role: <S>&quot;Frontend Engineer&quot;</S>,{"\n"}
            {"  "}stack: [<S>&quot;React&quot;</S>, <S>&quot;TypeScript&quot;</S>, <S>&quot;Next.js&quot;</S>],{"\n"}
            {"  "}built: [<S>&quot;Inkboard&quot;</S>, <S>&quot;Gridline&quot;</S>,{"\n"}
            {"          "}<S>&quot;Stanza&quot;</S>, <S>&quot;Halo UI&quot;</S>],{"\n"}
            {"  "}loves: [<S>&quot;real-time UIs&quot;</S>, <S>&quot;canvas&quot;</S>, <S>&quot;a11y&quot;</S>],{"\n"}
            {"  "}alsoShips: [<S>&quot;Node.js&quot;</S>, <S>&quot;Python&quot;</S>, <S>&quot;Ionic&quot;</S>],{"\n"}
            {"  "}based: <S>&quot;New Delhi, IN&quot;</S>,{"\n"}
            {"  "}openToWork: <K>true</K>,{"\n"}
            {"}"};<span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent" aria-hidden="true" />
          </code>
        </pre>
      </div>
      {[
        { label: "React", pos: "-left-4 top-[18%] sm:-left-10" },
        { label: "TypeScript", pos: "-right-3 top-[46%] sm:-right-8" },
        { label: "Next.js", pos: "-bottom-4 left-[12%]" },
      ].map((c, i) => (
        <span
          key={c.label}
          className={`float absolute hidden sm:block ${c.pos} rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium shadow-[var(--shadow)]`}
          style={{ animationDelay: `${i * 0.8}s` }}
          aria-hidden="true"
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

const iconBtn =
  "grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/70 text-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-accent";

export default function Home() {
  return (
    <>
      <Starfield />
      <Nav />
      <CommandPalette />
      <FloatingControls />

      <main id="main">
        {/* Hero */}
        <section id="top" className="relative overflow-x-clip">
          <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-14 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:pt-24">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs text-muted backdrop-blur">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
                </span>
                Open to frontend roles · <MapPin className="h-3.5 w-3.5" /> {profile.location}
              </p>
              <h1 className="mt-6 text-5xl font-bold leading-[1.02] tracking-tighter sm:text-6xl xl:text-[4.25rem]">Hi, I&apos;m {profile.name}</h1>
              <p className="mt-4 h-9 text-2xl font-semibold tracking-tight text-accent sm:text-3xl">
                <RotatingText items={roles} />
              </p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{profile.tagline}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#work" className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition hover:opacity-90">
                  View my work <ArrowRight />
                </a>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface/70 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-surface-2"
                >
                  <Download /> Resume
                </a>
              </div>

              <ul className="mt-7 flex gap-3" aria-label="Contact links">
                <li>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className={iconBtn}>
                    <Github />
                  </a>
                </li>
                <li>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className={iconBtn}>
                    <Linkedin />
                  </a>
                </li>
                <li>
                  <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} className={iconBtn}>
                    <Mail />
                  </a>
                </li>
                <li>
                  <a href={`tel:${profile.phone.replace(/\s/g, "")}`} aria-label={`Call ${profile.phone}`} className={iconBtn}>
                    <Phone />
                  </a>
                </li>
              </ul>

              <dl className="mt-10 flex max-w-md gap-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-2xl font-bold tracking-tight">{s.value}</dd>
                    <dd className="mt-0.5 text-xs leading-snug text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Reveal delay={120}>
              <CodeCard />
            </Reveal>
          </div>
        </section>

        <Band id="work" alt>
          <SectionHeading title="Featured Projects" intro="Four hard UI problems, each built without the library you'd normally reach for." />
          <div className="mt-14">
            <ProjectGrid />
          </div>
        </Band>

        <Band id="experience">
          <SectionHeading title="Experience" intro="Where I've built software so far." />
          <ol className="relative mx-auto mt-14 max-w-4xl space-y-6 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-line sm:before:left-[9px]">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 70}>
                <li className="relative pl-9 sm:pl-12">
                  <span className="absolute left-0 top-6 h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg sm:h-[19px] sm:w-[19px]" aria-hidden="true" />
                  <div className="rounded-2xl border border-line bg-surface/80 p-6 backdrop-blur-sm">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {job.role} <span className="text-accent">@ {job.company}</span>
                      </h3>
                      <p className="text-sm text-muted">
                        {job.period} · {job.place}
                      </p>
                    </div>
                    <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-muted">
                      {job.points.map((pt) => (
                        <li key={pt} className="flex gap-2.5">
                          <ArrowRight className="mt-[5px] h-4 w-4 shrink-0 text-accent" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech used">
                      {job.stack.map((s) => (
                        <li key={s} className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Band>

        <Band id="skills" alt>
          <SectionHeading title="Technical Skills" intro="What I reach for, grouped by where it fits." />
          <Reveal className="mt-12">
            <SkillTabs />
          </Reveal>

          <div className="mt-24">
            <SectionHeading title="How I Build" intro="A few things I care about on every project." />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 80} className="h-full">
                  <div className="h-full rounded-2xl border border-line bg-surface/80 p-6 backdrop-blur-sm transition hover:border-accent/50">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft font-mono text-sm font-semibold text-accent">0{i + 1}</span>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Band>

        <Band id="contact">
          <Reveal>
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-line bg-surface/80 px-6 py-14 text-center backdrop-blur-sm sm:px-14">
              <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent-soft blur-3xl" aria-hidden="true" />
              <h2 className="relative text-4xl font-bold tracking-tighter sm:text-5xl">Let&apos;s build something</h2>
              <p className="relative mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
                I&apos;m looking for frontend roles where the UI is the hard part. The fastest way to reach me is email.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition hover:opacity-90">
                  <Mail /> {profile.email}
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-semibold transition hover:bg-surface-2"
                >
                  <Linkedin /> LinkedIn <ArrowUpRight />
                </a>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-semibold transition hover:bg-surface-2"
                >
                  <Download /> Resume
                </a>
              </div>
            </div>
          </Reveal>
        </Band>
      </main>

      <footer className="border-t border-line bg-bg-2/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>
            Built with Next.js, TypeScript &amp; Tailwind CSS.{" "}
            <a href={profile.source} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:text-fg">
              View source
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
