"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "./icons";
import { still } from "./motion";

// The opening plays once per visit, not every time the visitor comes back to the home page.
let opened = false;
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

/**
 * The showreel, full-bleed under the transparent header. Plays muted on load
 * unless the visitor prefers less motion.
 *
 * The film is a 16:9 cut that composes its own lettering inside the frame.
 * Landscape fills the screen with it. A portrait screen cannot: cover-cropping
 * it there throws away over half the width, so portrait runs the film whole at
 * its own ratio and spends the rest of the opening screen on the headline, set
 * in type that can be read, selected and translated.
 */
export function HeroVideo({
  alt,
  poster,
  src,
  headline,
  tagline,
  label,
  pauseLabel,
  playLabel,
}: {
  alt: string;
  poster: string;
  src: string;
  headline: { lead: string; strong: string }[];
  tagline: string;
  label: string;
  pauseLabel: string;
  playLabel: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // Fixed for this mount, so a re-render can't cut the opening off half-way.
  const [open] = useState(() => !opened);
  // Set when the visitor pauses the film, so scrolling back up doesn't start it again behind their back.
  const held = useRef(false);

  useEffect(() => {
    const v = ref.current!;
    v.muted = true;
    opened = true;
    if (still()) return;
    // Plays while on screen and rests once scrolled past: a loop nobody sees shouldn't keep decoding.
    const io = new IntersectionObserver(([e]) =>
      e.isIntersecting ? !held.current && v.play().catch(() => {}) : v.pause(),
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const last = headline.length - 1;

  return (
    <section
      id="top"
      aria-label={label}
      className="relative -mt-20 overflow-hidden bg-ink pt-20 landscape:h-svh landscape:pt-0"
    >
      <div className="relative landscape:h-full">
        <video
          ref={ref}
          muted
          loop
          playsInline
          // play() fetches the film; visitors who prefer less motion only download its header.
          preload="metadata"
          poster={poster}
          aria-label={alt}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          // The reel opens from a scope letterbox to full frame, then on portrait the headline rises in beneath it.
          className={`aspect-video w-full object-cover landscape:aspect-auto landscape:size-full ${
            open ? "reel-open" : ""
          }`}
        >
          <source src={src} type="video/webm" />
        </video>
        <button
          type="button"
          onClick={() => {
            held.current = playing;
            if (playing) ref.current?.pause();
            else ref.current?.play();
          }}
          aria-label={playing ? pauseLabel : playLabel}
          className="absolute end-4 bottom-4 grid size-12 cursor-pointer place-items-center rounded-full border border-white/60 bg-black/40 text-white transition-colors [--focus:#fff] hover:bg-black/70 md:end-12 md:bottom-10"
        >
          {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
        </button>
      </div>

      {/* Portrait only: in landscape the film fills the screen and carries the lettering itself. */}
      <div className="wrap py-12 landscape:hidden">
        <p className="display text-head leading-[0.95] text-white md:text-title">
          {headline.map((line, i) => (
            <span key={line.strong} className={`block ${open ? "reel-rise" : ""}`} style={delay(700 + i * 120)}>
              {line.lead}{" "}
              {i === last ? (
                <span
                  // Blue, not navy: this block sits on the ink hero, where the navy holds only 1.6:1.
                  className={`mt-[0.1em] inline-block bg-blue px-[0.18em] pt-[0.08em] pb-[0.04em] ${
                    open ? "reel-wipe" : ""
                  }`}
                  style={delay(950 + i * 120)}
                >
                  {line.strong}
                </span>
              ) : (
                line.strong
              )}
            </span>
          ))}
        </p>
        <p
          className={`mt-7 text-xs font-bold tracking-[0.1em] text-white/70 uppercase sm:text-sm ${
            open ? "reel-rise" : ""
          }`}
          style={delay(1150 + last * 120)}
        >
          {tagline}
        </p>
      </div>
    </section>
  );
}
