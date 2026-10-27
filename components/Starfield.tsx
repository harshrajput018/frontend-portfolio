"use client";

import { useEffect, useRef } from "react";
import { THEME_EVENT } from "./theme";

type Star = { x: number; y: number; r: number; base: number; speed: number; phase: number; accent: boolean };

/** Fixed, twinkling star background on a single canvas. Static when the user prefers reduced motion. */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let colors = { star: "220,218,240", accent: "200,120,255" };
    let raf = 0;
    let w = 0;
    let h = 0;

    const readColors = () => {
      const css = getComputedStyle(document.documentElement);
      colors = { star: css.getPropertyValue("--star").trim(), accent: css.getPropertyValue("--star-accent").trim() };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 3800);
      stars = Array.from({ length: count }, () => {
        const accent = Math.random() < 0.06;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: accent ? 1 + Math.random() * 1.4 : 0.3 + Math.random() * 0.9,
          base: 0.25 + Math.random() * 0.55,
          speed: 0.4 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
          accent,
        };
      });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const time = t / 1000;
      for (const s of stars) {
        const twinkle = still ? 1 : 0.55 + 0.45 * Math.sin(time * s.speed + s.phase);
        // Very slow upward drift so the field feels alive without pulling focus
        const y = still ? s.y : (s.y - time * s.speed * 1.5 + h) % h;
        ctx.fillStyle = `rgba(${s.accent ? colors.accent : colors.star},${s.base * twinkle})`;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !still) raf = requestAnimationFrame(loop);
    };
    const onResize = () => {
      resize();
      if (still) draw(0);
    };
    const onTheme = () => {
      readColors();
      if (still) draw(0);
    };

    readColors();
    resize();
    if (still) draw(0);
    else raf = requestAnimationFrame(loop);

    window.addEventListener("resize", onResize);
    window.addEventListener(THEME_EVENT, onTheme);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener(THEME_EVENT, onTheme);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10 h-full w-full" aria-hidden="true" />;
}
