"use client";

import { useEffect, useState } from "react";

/** Cycles through phrases visually; screen readers get the full list once instead of a changing string. */
export default function RotatingText({ items, interval = 2600, className = "" }: { items: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % items.length), interval);
    return () => window.clearInterval(t);
  }, [items.length, interval]);

  return (
    <span className={className}>
      <span className="sr-only">{items.join(", ")}</span>
      <span key={i} className="rise inline-block" aria-hidden="true">
        {items[i]}
      </span>
    </span>
  );
}
