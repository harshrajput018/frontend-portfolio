import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: `${profile.role} building fast, accessible interfaces with ${profile.stackLine}. Real-time collaboration, dashboards and data-heavy UIs.`,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: `Frontend engineer · ${profile.stackLine}`,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0916" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0916" },
  ],
};

const themeScript = `(function(){document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
