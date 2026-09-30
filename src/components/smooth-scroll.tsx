"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Lenis handles same-page anchors itself. A route change is ours to handle:
 * without this the new page keeps the previous page's scroll position.
 */
function ScrollOnRouteChange() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    const target = hash && document.querySelector(hash) ? hash : 0;
    lenis.scrollTo(target, { offset: target === 0 ? 0 : -64, immediate: true });
  }, [lenis, pathname]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (reduced) return children;

  // offset clears the 64px sticky navbar, matching the scroll-mt-16 on sections
  return (
    <ReactLenis root options={{ anchors: { offset: -64 }, stopInertiaOnNavigate: true }}>
      <ScrollOnRouteChange />
      {children}
    </ReactLenis>
  );
}
