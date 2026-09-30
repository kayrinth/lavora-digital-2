import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./icons";
import type { ServiceKey } from "@/lib/portfolio";

/** Already resolved for the current locale on the server. */
export type GridItem = {
  slug: string;
  href: string;
  service: ServiceKey;
  serviceLabel: string;
  title: string;
  subtitle: string;
  logo?: string;
  /** Optional cover photo. Without one the card is a flat dark panel. */
  image?: string;
  summary: string;
};

export function PortfolioGrid({
  items,
  filters,
  active,
  basePath,
  filterLabel,
  viewLabel,
}: {
  /** Already filtered on the server. */
  items: GridItem[];
  filters: { key: ServiceKey; label: string }[];
  active: ServiceKey;
  basePath: string;
  filterLabel: string;
  viewLabel: string;
}) {
  return (
    <>
      {filters.length > 1 && (
        <nav aria-label={filterLabel} className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Link
              key={f.key}
              href={`${basePath}?service=${f.key}`}
              aria-current={active === f.key ? "page" : undefined}
              className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-[13px] transition ${
                active === f.key
                  ? "border-ink bg-ink text-white"
                  : "border-line text-muted hover:border-ink/40 hover:text-ink"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </nav>
      )}

      <ul className="reveal-stagger mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.slug} className="reveal">
            <Link
              href={item.href}
              className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-2xl bg-ink p-7 text-white"
            >
              {item.image && (
                <>
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 368px, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  {/*
                    A flat 65% ink wash rather than a gradient: it is the only value
                    that holds white text above 4.5:1 even where the photo is white.
                  */}
                  <span aria-hidden className="absolute inset-0 bg-ink/65" />
                </>
              )}

              <div className="relative">
                {/* The logos are drawn for light backgrounds, so they keep a white tile. */}
                {item.logo && (
                  <span className="relative block h-14 w-32 rounded-xl bg-white">
                    <Image
                      src={item.logo}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-contain p-3"
                    />
                  </span>
                )}

                <p className={`${item.logo ? "mt-6" : ""}  text-[11px] tracking-[0.1em] text-white/90 uppercase`}>
                  {String(i + 1).padStart(2, "0")} · {item.subtitle}
                </p>
                <h3 className="mt-2 max-w-[14ch] text-[22px] leading-[1.15] font-medium uppercase">
                  {item.title}
                </h3>
              </div>

              <div className="relative">
                <p className="max-w-[34ch] text-[13px] leading-relaxed text-white/90">
                  {item.summary}
                </p>
                <span className="mt-6 grid size-12 place-items-center rounded-full border border-white/50 transition duration-300 group-hover:border-white group-hover:bg-white group-hover:text-ink">
                  <span className="sr-only">{viewLabel}</span>
                  <ArrowRight aria-hidden className="size-5 -rotate-45" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
