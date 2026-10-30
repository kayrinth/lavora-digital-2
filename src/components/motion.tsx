"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

/* The reel's cuts. Every frame opens the way the film does, heads rise out of their own baseline, the maroon field
   sweeps in under a head's one coloured phrase, and lists come in one after another. The HTML ships everything
   visible: this only holds back what is still below the fold, so a failed script, a printout or a visitor who
   prefers less motion gets the page exactly as it was built. */

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
export const still = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Plays one element's entrance: `rise` for heads, `frame` for a photo's box (overflow-hidden, on ink), `wipe` for a
    flag, `list` for its children. */
function play(el: HTMLElement, kind: string, delay = 0) {
  const o = { duration: 900, easing: ease, delay, fill: "backwards" } as const;
  if (kind === "list") {
    // Capped, so the twelfth client logo doesn't wait a second behind the first.
    [...el.children].forEach((c, i) =>
      c.animate(
        { opacity: [0, 1], translate: ["0 1.5rem", "0 0"] },
        { ...o, duration: 800, delay: delay + Math.min(i, 6) * 70 },
      ),
    );
  } else if (kind === "frame") {
    // The photo opens inside its box rather than the box itself, so the box's ink ground reads as the letterbox bars.
    el.querySelector("img")?.animate(
      { clipPath: ["inset(50% 0)", "inset(0% 0)"], scale: [1.15, 1] },
      { ...o, duration: 1300 },
    );
  } else if (kind === "wipe") {
    el.animate({ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] }, o);
  } else {
    // The window reaches past the box so heavy capitals that overhang a 0.98 line aren't trimmed while it moves.
    el.animate(
      {
        clipPath: ["inset(-0.2em -0.2em 100% -0.2em)", "inset(-0.2em -0.2em -0.2em -0.2em)"],
        translate: ["0 0.5em", "0 0"],
      },
      o,
    );
    el.querySelectorAll(".flag").forEach((f) =>
      f.animate({ backgroundSize: ["0% 100%", "100% 100%"] }, { ...o, duration: 800, delay: delay + 300 }),
    );
  }
}

/** In the root layout: fades each new page in on navigation and plays `data-reveal` entrances as they scroll into view. */
export function Motion() {
  const path = usePathname();
  const shown = useRef(path);

  // Before paint, so the new page never flashes in at full strength first. The first load has nothing to continue from.
  useLayoutEffect(() => {
    if (shown.current === path) return;
    shown.current = path;
    if (!still())
      document
        .getElementById("main")
        ?.animate({ opacity: [0, 1], translate: ["0 0.75rem", "0 0"] }, { duration: 500, easing: ease });
  }, [path]);

  useEffect(() => {
    if (still()) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting) return;
          const el = target as HTMLElement;
          io.unobserve(el);
          delete el.dataset.hold;
          play(el, el.dataset.reveal!);
        }),
      { rootMargin: "0px 0px -12% 0px" },
    );
    // A frame later, once the router has scrolled the new page into place.
    const id = requestAnimationFrame(() =>
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top < innerHeight) return; // already on screen, or scrolled past: leave it be
        el.dataset.hold = "";
        io.observe(el);
      }),
    );
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
      document.querySelectorAll<HTMLElement>("[data-hold]").forEach((el) => delete el.dataset.hold);
    };
  }, [path]);

  return null;
}
