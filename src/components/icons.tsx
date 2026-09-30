type P = React.SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Target = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const TrendUp = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 19h18" />
    <path d="m6 15 4-4.5 3.2 3 5-6.5" />
    <path d="M14.4 7h3.8v3.8" />
  </svg>
);

export const Megaphone = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 10.5v3a2 2 0 0 0 2 2h1.5l9 4.5V4L7.5 8.5H6a2 2 0 0 0-2 2Z" />
    <path d="M7.5 15.5V8.5" />
    <path d="M20 9.5a3 3 0 0 1 0 5" />
  </svg>
);

export const Gauge = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 18a8.5 8.5 0 1 1 16 0" />
    <path d="m12 14 4-4" />
    <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const Cursor = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 4.5 18.5 11 13 12.8l-2.2 5.4z" />
    <path d="m13.2 13.2 5 5" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 12h15m-5.5-5.5L19 12l-5.5 5.5" />
  </svg>
);

export const ArrowDown = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 4.5v15m5.5-5.5L12 19.5 6.5 14" />
  </svg>
);

export const Chevron = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 9.5 6 5.5 6-5.5" />
  </svg>
);

export const Play = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M8.5 5.6a1 1 0 0 1 1.5-.9l8 6.4a1 1 0 0 1 0 1.8l-8 6.4a1 1 0 0 1-1.5-.9z" />
  </svg>
);

export const Instagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17" cy="7" r=".8" fill="currentColor" />
  </svg>
);

export const Youtube = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="m10.5 9.5 4.5 2.5-4.5 2.5z" />
  </svg>
);

export const Linkedin = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
    <path d="M8 10.5v6M8 7.6v.1" />
    <path d="M12 16.5v-6m0 1.6a2.6 2.6 0 0 1 4.5 1.8v2.6" />
  </svg>
);

export const Menu = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7m-8.5 0H17v8.5" />
  </svg>
);
