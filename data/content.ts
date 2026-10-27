export const profile = {
  name: "Harsh Rajput",
  role: "Frontend Engineer",
  stackLine: "React · TypeScript · Next.js",
  tagline:
    "I build fast, accessible product interfaces — dashboards, real-time collaboration and data-heavy screens — and I'm comfortable going down the stack when the UI needs it.",
  email: "harshrajput18@gmail.com",
  phone: "+91 7827960243",
  location: "New Delhi, India",
  github: "https://github.com/harshrajput018",
  linkedin: "https://www.linkedin.com/in/harsh-rajput-0542a4185/",
  resume: "/resume-harsh.pdf",
  source: "https://github.com/harshrajput018",
};

export const stats = [
  { value: "2 yrs", label: "building production software" },
  { value: "4", label: "frontend systems built from scratch" },
  { value: "50", label: "tests across those projects" },
];

export type Project = {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  highlights: string[];
  stack: string[];
  tags: Tag[];
  live?: string;
  code?: string;
  shot: string;
  note?: string;
  featured?: boolean;
};

export type Tag = "Real-time" | "Performance" | "Canvas" | "Editor" | "Accessibility" | "Testing";

export const tags: Tag[] = ["Real-time", "Performance", "Canvas", "Editor", "Accessibility", "Testing"];

export const projects: Project[] = [
  {
    slug: "inkboard",
    name: "Inkboard",
    kind: "Multiplayer whiteboard",
    summary:
      "An Excalidraw-style whiteboard on Canvas 2D and Yjs CRDTs: shapes, pressure-sensitive ink, text and sticky notes, with live cursors and edits that merge without conflicts.",
    highlights: [
      "Custom canvas renderer: DPR-aware, viewport culling, zoom at the cursor from 10% to 800%, pinch-zoom on touch",
      "Yjs document synced across tabs by a small BroadcastChannel provider I wrote, with presence for live cursors and teammates' selections",
      "Per-user undo: ⌘Z only reverts your own changes, and a whole drag is a single undo step",
      "Select, marquee, 8-handle group resize, 15° snapping, z-order, PNG export, IndexedDB persistence",
    ],
    stack: ["React", "TypeScript", "Canvas 2D", "Yjs", "IndexedDB", "Vitest"],
    tags: ["Real-time", "Canvas", "Testing"],
    shot: "/shots/inkboard.webp",
    note: "Open it in two tabs to see multiplayer. Tests cover CRDT convergence, per-user undo and geometry.",
    featured: true,
  },
  {
    slug: "gridline",
    name: "Gridline",
    kind: "100,000-row data grid",
    summary:
      "A spreadsheet-grade grid with no table library. It scrolls 100k rows at 60 fps, sorts and filters in a Web Worker, and is fully keyboard-driven.",
    highlights: [
      "Row and column virtualisation: about 300 cells in the DOM out of 1.2 million",
      "Filter and multi-sort run in a Web Worker and return a transferable Int32Array, so nothing is copied",
      "ARIA grid with arrow-key navigation, inline editing, range selection, ⌘C as TSV and CSV export",
    ],
    stack: ["React", "TypeScript", "Web Workers", "Tailwind", "Vitest"],
    tags: ["Performance", "Accessibility", "Testing"],
    shot: "/shots/gridline.webp",
  },
  {
    slug: "stanza",
    name: "Stanza",
    kind: "Notion-style block editor",
    summary:
      "A block editor with no ProseMirror, Slate or TipTap: slash commands, markdown shortcuts, drag to reorder, and undo that works across splits and merges.",
    highlights: [
      "Each block is its own contentEditable; the DOM is never rewritten while typing, so the caret never jumps",
      "Enter splits at the caret and keeps formatting on both sides; ↑/↓ cross blocks and keep the caret's x position",
      "Paste sanitised to an allow-list; multi-line Markdown becomes real blocks; Markdown import and export",
    ],
    stack: ["React", "TypeScript", "contentEditable", "Selection API", "Vitest"],
    tags: ["Editor", "Testing"],
    shot: "/shots/stanza.webp",
  },
  {
    slug: "halo-ui",
    name: "Halo UI",
    kind: "Accessible component library",
    summary:
      "Nine React components built from scratch on the WAI-ARIA patterns, with a docs site, live theming and 19 behaviour and axe tests.",
    highlights: [
      "Dialog focus trap and restore, roving-tabindex Tabs, a Menu with typeahead, and a Combobox using aria-activedescendant",
      "Themed entirely with CSS variables and color-mix(): one --halo-accent re-themes everything, dark mode included",
      "Ships as a 7 kB ESM package with type declarations; tests use Testing Library, user-event and axe-core",
    ],
    stack: ["React", "TypeScript", "WAI-ARIA", "CSS variables", "Testing Library", "axe-core"],
    tags: ["Accessibility", "Testing"],
    shot: "/shots/halo.webp",
  },
];

export const experience = [
  {
    company: "Agile Receivables",
    role: "Full-Stack Developer",
    period: "Oct 2026 — Present",
    place: "Remote",
    points: [
      "Building patient-reply review screens for a healthcare collections platform in Next.js and TypeScript: a tabbed review queue, slide-over review panel, live count cards and an override dialog.",
      "Wiring screens to FastAPI with RTK Query and tag-based cache invalidation, using shadcn/Radix UI and Tailwind CSS behind a feature flag.",
    ],
    stack: ["Next.js", "TypeScript", "RTK Query", "Tailwind", "Radix UI"],
  },
  {
    company: "Primus Softech Solutions",
    role: "Full-Stack Developer",
    period: "Jan 2026 — Oct 2026",
    place: "New Delhi",
    points: [
      "Built a production cross-platform app (Ionic React, TypeScript, Capacitor) for real-time monitoring and control of AC, lighting, CCTV, fault diagnostics and emergency alarms on Vande Bharat trainsets.",
      "Automated Android build, signing, versioning and deployment with GitHub Actions, and built the Node.js/Express APIs the app consumes.",
    ],
    stack: ["Ionic React", "TypeScript", "Capacitor", "Node.js", "GitHub Actions"],
  },
  {
    company: "Infosys",
    role: "Specialist Programmer",
    period: "Nov 2024 — Nov 2025",
    place: "Bengaluru / Remote",
    points: [
      "Developed Python services and REST APIs for an enterprise RAG platform, owning API contracts and PostgreSQL/MySQL schema design.",
      "Built hybrid keyword + vector search and citation-backed LLM answers over enterprise documents.",
    ],
    stack: ["Python", "Django", "Flask", "PostgreSQL"],
  },
];

export const skills = [
  { group: "Core", items: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "React", "Next.js (App Router)"] },
  { group: "State & data", items: ["Redux Toolkit", "RTK Query", "TanStack Query", "REST", "GraphQL", "WebSockets", "CRDTs (Yjs)"] },
  { group: "Browser APIs", items: ["Canvas 2D", "Web Workers", "Selection & Range", "Pointer Events", "IndexedDB", "BroadcastChannel"] },
  { group: "UI", items: ["Tailwind CSS", "WAI-ARIA patterns", "Radix UI", "shadcn/ui", "Responsive design", "Ionic + Capacitor"] },
  { group: "Quality & delivery", items: ["Vitest", "Jest", "Testing Library", "axe-core", "GitHub Actions", "Vercel"] },
  { group: "Across the stack", items: ["Node.js", "Express", "FastAPI", "PostgreSQL", "Redis", "AWS"] },
];

export const principles = [
  { title: "Fast by default", body: "Cache what the server already told you, keep interactions instant, and never block the UI on a spinner you could have avoided." },
  { title: "Accessible, not afterthought", body: "Real buttons, visible focus, keyboard paths and reduced-motion support — this site included. Try ⌘K." },
  { title: "Own the whole feature", body: "From the API contract to the empty state and the error toast — I'd rather ship one complete thing than three half-done ones." },
];
