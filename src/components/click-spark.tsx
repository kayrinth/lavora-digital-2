"use client";

import { useEffect, useRef } from "react";

/**
 * Click feedback, from the React Bits ClickSpark recipe
 * (`npx shadcn@latest add @react-bits/ClickSpark-JS-CSS`), rebuilt for this site:
 *
 *  - one fixed viewport-sized canvas instead of a wrapper sized to the whole
 *    document, which on a long page allocates a canvas several screens tall;
 *  - the loop only runs while a spark is alive, so an idle page costs nothing;
 *  - device pixel ratio, so the strokes are not soft on a retina screen;
 *  - the spark takes its colour from the palette, and switches to the light
 *    accent inside a `.on-navy` region where the brand blue would disappear;
 *  - reduced motion renders nothing at all.
 */

type Spark = {
  x: number;
  y: number;
  angle: number;
  start: number;
  color: string;
};

export function ClickSpark({
  count = 8,
  radius = 18,
  length = 12,
  duration = 420,
  width = 2,
}: {
  count?: number;
  radius?: number;
  length?: number;
  duration?: number;
  width?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparks = useRef<Spark[]>([]);
  const frame = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const palette = getComputedStyle(document.documentElement);
    const onLight = palette.getPropertyValue("--color-secondary").trim() || "#006199";
    const onNavy = palette.getPropertyValue("--color-onnavy-accent").trim() || "#58b6e8";

    // Capped: a 3x buffer on a large display costs more than it shows.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = width;
      ctx.lineCap = "round";

      sparks.current = sparks.current.filter((spark) => {
        const t = (now - spark.start) / duration;
        if (t >= 1) return false;

        // Ease-out: the spark leaves fast and settles, the shape of a released spring.
        const eased = t * (2 - t);
        const distance = eased * radius;
        const tail = length * (1 - eased);
        const cos = Math.cos(spark.angle);
        const sin = Math.sin(spark.angle);

        ctx.globalAlpha = 1 - eased;
        ctx.strokeStyle = spark.color;
        ctx.beginPath();
        ctx.moveTo(spark.x + distance * cos, spark.y + distance * sin);
        ctx.lineTo(spark.x + (distance + tail) * cos, spark.y + (distance + tail) * sin);
        ctx.stroke();

        return true;
      });

      ctx.globalAlpha = 1;

      // The loop ends with the last spark rather than idling at 60fps forever.
      frame.current = sparks.current.length ? requestAnimationFrame(draw) : 0;
    };

    const onClick = (e: MouseEvent) => {
      // Activating a link with the keyboard fires a click with no coordinates,
      // which would otherwise spark in the top-left corner of the screen.
      if (e.detail === 0) return;

      const target = e.target as Element | null;
      const color = target?.closest?.(".on-navy") ? onNavy : onLight;
      const start = performance.now();

      for (let i = 0; i < count; i++) {
        sparks.current.push({
          x: e.clientX,
          y: e.clientY,
          angle: (2 * Math.PI * i) / count,
          start,
          color,
        });
      }

      if (!frame.current) frame.current = requestAnimationFrame(draw);
    };

    /* Nothing should keep animating in a tab the reader has left. */
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame.current);
        frame.current = 0;
        sparks.current = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      sparks.current = [];
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count, radius, length, duration, width]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] motion-reduce:hidden"
    />
  );
}
