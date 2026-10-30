import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "./icons";

/** The site's one container: up to 90rem, 16px side padding growing to 48px from 48rem. */
export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`wrap ${className}`}>{children}</div>;
}

/**
 * A full-width colour band. The page is built from these, alternating so
 * neighbouring bands differ: white, mist, blue, navy, ink. Blue, navy and ink
 * carry white text and set the focus ring to white.
 */
const GROUND = {
  surface: "bg-surface text-ink",
  mist: "bg-mist text-ink",
  blue: "bg-blue text-white [--focus:#fff]",
  brand: "bg-brand text-white [--focus:#fff]",
  ink: "bg-ink text-white [--focus:#fff]",
} as const;

export type Ground = keyof typeof GROUND;

export function Band({
  ground = "surface",
  className = "",
  children,
  ...rest
}: {
  ground?: Ground;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<"section">, "className" | "children">) {
  return (
    <section className={`${GROUND[ground]} py-16 md:py-32 ${className}`} {...rest}>
      <Container>{children}</Container>
    </section>
  );
}

/**
 * A heading with one emphasised phrase. Navy type holds 17.6:1 on white and
 * mist but only 2.0:1 on blue and 1.1:1 on ink, so a dark ground carries the
 * phrase as a navy field with white text instead — the same flag that hangs
 * under a photo. Pass `field` on blue, navy and ink.
 */
export function Accent({
  lead,
  strong,
  tail,
  field,
}: {
  lead?: string;
  strong: string;
  tail?: string;
  field?: boolean;
}) {
  return (
    <>
      {lead && <>{lead} </>}
      <span className={field ? "flag" : "text-brand"}>{strong}</span>
      {tail && <> {tail}</>}
    </>
  );
}

/** A line icon on a solid navy tile. Marks a service row or a unit. */
export function IconTile({
  icon: Icon,
  size = "md",
  className = "",
}: {
  icon: (p: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const box = { sm: "size-11", md: "size-12", lg: "size-12 md:size-20" }[size];
  const glyph = { sm: "size-5", md: "size-6", lg: "size-6 md:size-10" }[size];
  return (
    <span className={`grid shrink-0 place-items-center rounded-md bg-brand text-white ${box} ${className}`}>
      <Icon aria-hidden className={glyph} />
    </span>
  );
}

/**
 * The circle that ends a row or a card. It fills navy when the row or card
 * around it is hovered; on a dark ground it is white-bordered and fills white.
 */
export function ArrowDisc({
  size = "size-11",
  onDark = false,
  icon: Icon = ArrowUpRight,
}: {
  size?: string;
  onDark?: boolean;
  icon?: (p: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}) {
  const tone = onDark
    ? "border-white text-white group-hover:bg-white group-hover:text-ink"
    : "border-line text-brand group-hover:border-brand group-hover:bg-brand group-hover:text-white";
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-full border transition-colors ${size} ${tone}`}
    >
      <Icon className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
    </span>
  );
}

/** Ink button: the default action on white and mist. */
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
    <Link href={href} className={`btn btn-dark ${className}`}>
      {children}
      {withArrow && <ArrowRight className="size-4" />}
    </Link>
  );
}

/**
 * Maroon button, or white on a dark ground. Reserved for the one moment per
 * page that has to be loudest.
 */
export function AccentButton({
  href,
  children,
  onNavy = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  /** On a blue, navy or ink ground, where the navy would disappear. */
  onNavy?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`btn ${onNavy ? "btn-light" : "btn-brand"} ${className}`}>
      {children}
      <ArrowRight className="size-4" />
    </Link>
  );
}

/** The hairline-bordered button: the secondary path out of a section. */
export function GhostButton({
  href,
  children,
  onNavy = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  onNavy?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`btn ${onNavy ? "btn-light" : "btn-outline"} ${className}`}>
      {children}
      <ArrowRight className="size-4" />
    </Link>
  );
}

/** The switcher that opens the work index and the service pages. */
export function Pills({
  label,
  items,
}: {
  label: string;
  items: { href: string; label: string; current: boolean; count?: number }[];
}) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={`btn ${item.current ? "btn-dark" : "btn-outline"}`}
            >
              {item.label}
              {item.count !== undefined && (
                <span dir="ltr" className={item.current ? "text-white/70" : "text-dim"}>
                  {item.count}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** The closing call on every page but home, which closes on the brief form itself. */
export function CtaPanel({
  heading,
  body,
  cta,
  href,
}: {
  heading: string;
  body: string;
  cta: string;
  href: string;
}) {
  return (
    <section className="bg-blue text-white [--focus:#fff]">
      <div className="wrap flex flex-wrap items-end justify-between gap-8 py-16 md:py-24">
        <div className="max-w-3xl">
          <h2 data-reveal className="display text-head leading-[1.08]">
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-lead">{body}</p>
        </div>
        <AccentButton href={href} onNavy>
          {cta}
        </AccentButton>
      </div>
    </section>
  );
}
