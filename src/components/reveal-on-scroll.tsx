"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One observer for every `.reveal` on the page, rather than a wrapper component
 * per element. It adds `js-reveal` to <html> itself, so the hidden starting state
 * only ever applies when this is actually running.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  // react-doctor-disable-next-line react-doctor/effect-needs-cleanup
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {};
    }

    const root = document.documentElement;
    root.classList.add("js-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      // Fires a little before the element reaches the bottom edge, so the motion
      // finishes about when the reader gets there.
      { rootMargin: "0px 0px -12% 0px" },
    );

    const scan = (scope: ParentNode) => {
      const elements = scope.querySelectorAll(".reveal");
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (!el.classList.contains("is-in")) io.observe(el);
      }
    };

    scan(document);

    /*
     * Efficient mutation observer scoped to main content to pick up client-side
     * filtering without thrashing CPU across the entire body. Debounced with RAF.
     */
    let rafId: number | null = null;
    const target = document.querySelector("main") ?? document.body;
    const mo = new MutationObserver(() => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        scan(target);
      });
    });

    mo.observe(target, { childList: true, subtree: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      mo.disconnect();
      io.disconnect();
      root.classList.remove("js-reveal");
      const inElements = document.querySelectorAll(".reveal.is-in");
      for (let i = 0; i < inElements.length; i++) {
        inElements[i].classList.remove("is-in");
      }
    };
  }, [pathname]);

  return null;
}
