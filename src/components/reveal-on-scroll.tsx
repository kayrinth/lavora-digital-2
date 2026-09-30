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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

    const observe = (scope: ParentNode) => {
      for (const el of scope.querySelectorAll(".reveal")) {
        if (!el.classList.contains("is-in")) io.observe(el);
      }
    };

    observe(document);

    /*
     * Some navigation changes the content without changing the pathname: the
     * portfolio filter only swaps ?service=. This effect does not re-run for
     * that, so newly mounted elements are picked up as they are added instead.
     * Without it they keep the hidden starting state and the grid looks empty.
     */
    const mo = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.classList.contains("reveal")) io.observe(node);
          observe(node);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      root.classList.remove("js-reveal");
      for (const el of document.querySelectorAll(".reveal")) el.classList.remove("is-in");
    };
  }, [pathname]);

  return null;
}
