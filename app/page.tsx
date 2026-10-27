import Nav from "@/components/Nav";
import CommandPalette from "@/components/CommandPalette";
import ThemeToggle from "@/components/ThemeToggle";
import ProjectList, { LeadProject } from "@/components/ProjectGrid";
import { experience, principles, profile, skills, stats } from "@/data/content";

const year = new Date().getFullYear();

export default function Home() {
  return (
    <>
      <CommandPalette />
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 lg:grid-cols-12 lg:gap-x-5 lg:px-8">
        <div className="lg:col-span-3">
          <Nav />
        </div>

        <main id="main" className="px-5 lg:col-span-9 lg:px-0">
          {/* Opening: left-aligned, one sentence carries it */}
          <section id="top" className="pb-24 pt-14 lg:pt-24">
            <p className="font-mono text-meta text-ink-3">currently frontend at primus softech · open to new roles</p>
            <h1 className="mt-5 max-w-[15ch] font-serif text-display-sm sm:text-display">
              I build the parts of an interface that usually come from a library.
            </h1>
            <p className="mt-8 max-w-[34rem] text-lead text-ink-2">{profile.tagline}</p>
            <p className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-body">
              <a href="#work" className="link text-accent">
                see the work ↓
              </a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="link">
                resume, one page (pdf)
              </a>
            </p>
            <dl className="mt-14 grid max-w-[40rem] grid-cols-3 gap-5 border-t border-rule pt-5">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-serif text-h3">{s.value}</dd>
                  <dd className="mt-1 text-small text-ink-2">{s.label}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Work: the widest section; one project dominates */}
          <section id="work" className="border-t border-rule pb-24 pt-14">
            <div className="flex items-baseline justify-between gap-5">
              <h2 className="font-serif text-h2">Work</h2>
              <p className="max-w-[22rem] text-right text-small text-ink-2">Four things I built without the library you&apos;d normally reach for.</p>
            </div>
            <div className="mt-14">
              <LeadProject />
            </div>
            <div className="mt-24">
              <ProjectList />
            </div>
          </section>

          {/* Experience: the quiet one. Text only, narrow measure, no accent. */}
          <section id="experience" className="border-t border-rule pb-24 pt-14">
            <h2 className="font-serif text-h2">Experience</h2>
            <ol className="mt-14 max-w-[44rem] space-y-14">
              {experience.map((job) => (
                <li key={job.company} className="grid gap-x-8 gap-y-2 sm:grid-cols-[11rem_1fr]">
                  <p className="font-mono text-meta text-ink-3 sm:pt-1">
                    {job.period.replace("—", "–")}
                    <br />
                    {job.place}
                  </p>
                  <div>
                    <h3 className="text-body font-medium">
                      {job.role}, {job.company}
                    </h3>
                    <ul className="mt-3 space-y-3 text-body text-ink-2">
                      {job.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Toolkit: dense reference table, set small */}
          <section id="skills" className="border-t border-rule pb-24 pt-14">
            <div className="grid grid-cols-12 gap-x-5">
              <h2 className="col-span-12 font-serif text-h2 md:col-span-4">Toolkit</h2>
              <dl className="col-span-12 mt-8 md:col-span-8 md:mt-3">
                {skills.map((g) => (
                  <div key={g.group} className="grid grid-cols-[9rem_1fr] gap-x-5 border-b border-rule py-3 first:border-t">
                    <dt className="font-mono text-meta text-ink-3 lowercase">{g.group}</dt>
                    <dd className="text-small">{g.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Notes: opinions, set like a column of an essay */}
          <section id="notes" className="border-t border-rule pb-24 pt-14">
            <h2 className="font-serif text-h2">Notes on how I work</h2>
            <ol className="mt-14 grid grid-cols-12 gap-x-5 gap-y-12">
              {principles.map((p, i) => (
                <li key={p.title} className={`col-span-12 ${i === 0 ? "md:col-span-7" : "md:col-span-5"} ${i === 2 ? "md:col-start-6" : ""}`}>
                  <h3 className="font-serif text-h3 italic">{p.title}</h3>
                  <p className="mt-3 max-w-[30rem] text-body text-ink-2">{p.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Contact: the address is the headline */}
          <section id="contact" className="border-t border-rule pb-14 pt-14">
            <p className="text-lead text-ink-2">If you&apos;re hiring for a frontend role where the UI is the hard part, write to me.</p>
            <a href={`mailto:${profile.email}`} className="link mt-5 inline-block font-serif text-h3 sm:text-h2 lg:text-display">
              {profile.email}
            </a>
            <p className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-small text-ink-2">
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="link">
                {profile.phone}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                linkedin
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link">
                github
              </a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="link">
                resume (pdf)
              </a>
              <ThemeToggle className="lg:hidden" />
            </p>
          </section>

          <footer className="flex flex-wrap justify-between gap-3 border-t border-rule py-8 font-mono text-meta text-ink-3">
            <p>© {year} harsh rajput</p>
            <p>
              set in newsreader and ibm plex. built by hand in next.js.{" "}
              <a href={profile.source} target="_blank" rel="noopener noreferrer" className="link">
                source
              </a>
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
