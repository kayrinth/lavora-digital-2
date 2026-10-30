import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "./icons";
import type { ServiceKey } from "@/lib/portfolio";

/** Already resolved for the current locale on the server. */
export type IndexItem = {
  slug: string;
  href: string;
  service: ServiceKey;
  serviceLabel: string;
  title: string;
  subtitle: string;
  image?: string;
  summary: string;
};

/**
 * Website work is a screenshot and fills its frame. Advertising and marketing
 * work is a 4:5 social creative whose message lives in the whole frame, so it
 * is contained on a white plate instead of being cropped to fit.
 */
function frame(service: ServiceKey) {
  return service === "web"
    ? {
        ratio: "aspect-[16/10]",
        fit: "object-cover object-top",
        plate: "bg-[#0c0d18] border border-line/80 shadow-md",
      }
    : {
        ratio: "aspect-[4/3]",
        fit: "object-contain p-5 sm:p-7 drop-shadow-[0_12px_20px_rgba(0,0,0,0.12)] group-hover:drop-shadow-[0_18px_28px_rgba(0,0,0,0.18)]",
        plate: "bg-gradient-to-br from-surface to-background border border-line/70 shadow-md",
      };
}

export function PortfolioIndex({
  items,
  viewLabel,
}: {
  /** Already filtered on the server; the masthead owns the switcher. */
  items: IndexItem[];
  viewLabel: string;
}) {
  return (
    <>
      {/*
       * An index, not a card grid: hairlines carry the structure, the work is
       * shown uncovered, and the side the image sits on alternates so the eye
       * has a rhythm to follow down the page.
       */}
      <ol className="reveal-stagger">
        {items.map((item, i) => {
          const { ratio, fit, plate } = frame(item.service);
          const imageFirst = i % 2 === 1;

          return (
            <li key={item.slug} className="reveal group relative border-t border-line last:border-b">
              {/* The row's own rule draws itself in on hover — the accent device the
                  stats and the service list already use, put to work as feedback. */}
              <span
                aria-hidden
                className="absolute -top-px start-0 h-px w-0 bg-secondary transition-[width] duration-700 ease-out group-hover:w-full"
              />

              <Link
                href={item.href}
                className="grid items-center gap-8 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16"
              >
                <div
                  className={`relative overflow-hidden rounded-[20px] sm:rounded-[24px] ${ratio} ${plate} ${
                    imageFirst ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Floating category pill */}
                  <div className="absolute top-3.5 start-3.5 z-10 sm:top-4 sm:start-4">
                    <span className="eyebrow inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1 text-onnavy-accent border border-white/15 backdrop-blur-md shadow-sm text-[11px]">
                      <span className="size-1.5 rounded-full bg-onnavy-accent" />
                      {item.serviceLabel}
                    </span>
                  </div>

                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 660px, 100vw"
                      className={`${fit} transition duration-700 ease-out group-hover:scale-[1.03]`}
                    />
                  )}
                </div>

                <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                  <div className="flex items-baseline gap-6">
                    <span
                      dir="ltr"
                      className="text-[clamp(38px,4vw,56px)] leading-[0.85] font-bold tracking-[-0.05em] text-faint tabular-nums transition duration-500 group-hover:text-secondary"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow text-muted">{item.subtitle}</span>
                  </div>

                  <h3 className="t-title mt-7 max-w-[14ch] text-balance transition duration-500 group-hover:text-secondary">
                    {item.title}
                  </h3>

                  <p className="mt-6 max-w-[44ch] text-[14.5px] leading-[1.65] text-muted">
                    {item.summary}
                  </p>

                  <span className="mt-8 inline-flex items-center gap-3 text-[13px] font-medium">
                    {viewLabel}
                    <span className="grid size-11 place-items-center rounded-full border border-line text-primary transition duration-300 group-hover:border-secondary group-hover:bg-secondary group-hover:text-white">
                      <ArrowUpRight aria-hidden className="size-4.5" />
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </>
  );
}
