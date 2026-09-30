import Link from "next/link";
import { ArrowRight } from "./icons";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

/** Small uppercase label. A leading accent dot ties it to the accent system. */
export function Eyebrow({
  children,
  className = "",
  dot = true,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <p className={`eyebrow flex items-center gap-2 text-muted ${className}`}>
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-primary" />}
      {children}
    </p>
  );
}

const PILL =
  "group/btn inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[13px] font-medium transition duration-300";

/** Black pill. The default call to action everywhere on the site. */
export function PrimaryButton({
  href,
  children,
  withArrow = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  withArrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`${PILL} bg-ink text-white hover:bg-dark ${className}`}>
      {children}
      {withArrow && (
        <ArrowRight className="size-4 transition duration-300 group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
      )}
    </Link>
  );
}

/** Accent pill, reserved for the one moment per page that has to be loudest. */
export function AccentButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${PILL} bg-primary text-ink hover:bg-ink hover:text-white ${className}`}
    >
      {children}
      <ArrowRight className="size-4 transition duration-300 group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
    </Link>
  );
}

/** Outlined pill for the secondary path out of a section. */
export function GhostButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${PILL} border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white ${className}`}
    >
      {children}
      <ArrowRight className="size-4 transition duration-300 group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
    </Link>
  );
}

/**
 * The hand-drawn accent stroke that sits under a display word, as in the
 * reference. Decorative: it carries no meaning a screen reader needs.
 */
export function AccentUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 24"
      preserveAspectRatio="none"
      fill="none"
      className={`pointer-events-none absolute text-primary ${className}`}
    >
      <path
        d="M4 17C46 7 118 3 216 9"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}
