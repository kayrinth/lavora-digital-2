"use client";

import { useEffect, useRef } from "react";

export function HeroVideo({
  alt,
  poster,
  src,
}: {
  alt: string;
  poster: string;
  src: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return () => {};
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.05 },
    );

    io.observe(video);

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      aria-label={alt}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 size-full object-cover"
    >
      <source
        src={src}
        type="video/webm"
        media="(prefers-reduced-motion: no-preference)"
      />
    </video>
  );
}
