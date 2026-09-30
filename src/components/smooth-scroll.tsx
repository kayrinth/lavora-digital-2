"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Clears the floating navbar: the pill is 56–64px tall inside a 12–16px strip,
 * and every anchored section carries `scroll-mt-24`. One constant, so the two
 * cannot drift apart.
 */
const ANCHOR_OFFSET = -96;

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
    lenis.scrollTo(target, {
      offset: target === 0 ? 0 : ANCHOR_OFFSET,
      immediate: true,
    });
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

  return (
    <ReactLenis
      root
      options={{
        /*
         * `lerp` is frame-rate independent in Lenis 1.x, so this reads the same
         * at 60 and 120Hz. 0.08 glides a little longer than the 0.1 default —
         * enough to feel deliberate, short of the floaty lag that makes a
         * smooth-scroll page feel like it is fighting the wheel.
         */
        lerp: 0.08,
        wheelMultiplier: 0.9,
        /*
         * Touch is left on the platform's own scrolling. Synthesising it costs
         * the native fling curve and the pull-to-refresh gesture, and phones
         * already scroll smoothly.
         */
        syncTouch: false,
        anchors: { offset: ANCHOR_OFFSET },
        stopInertiaOnNavigate: true,
      }}
    >
      <ScrollOnRouteChange />
      {children}
    </ReactLenis>
  );
}
