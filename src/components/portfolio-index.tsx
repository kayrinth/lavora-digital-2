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
    ? { ratio: "aspect-[16/10]", fit: "object-cover", plate: "bg-ink" }
    : { ratio: "aspect-[4/3]", fit: "object-contain p-4 sm:p-6", plate: "bg-surface" };
}

export function PortfolioIndex({
  items,
  filters,
  active,
  basePath,
  filterLabel,
  viewLabel,
}: {
  /** Already filtered on the server. */
  items: IndexItem[];
  filters: { key: ServiceKey; label: string; count: number }[];
  active: ServiceKey;
  basePath: string;
  filterLabel: string;
  viewLabel: string;
}) {
  return (
    <>
      {filters.length > 1 && (
        <nav aria-label={filterLabel} className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const on = active === f.key;
            return (
              <Link
                key={f.key}
                href={`${basePath}?service=${f.key}`}
                aria-current={on ? "page" : undefined}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 text-[13px] transition ${
                  on
                    ? "border-primary bg-primary text-white"
                    : "border-line text-muted hover:border-ink/40 hover:text-ink"
                }`}
              >
                {f.label}
                <span
                  dir="ltr"
                  className={`text-[11px] tabular-nums ${on ? "text-onnavy" : "text-faint"}`}
                >
                  {f.count}
                </span>
              </Link>
            );
          })}
        </nav>
      )}

      {/*
       * An index, not a card grid: hairlines carry the structure, the work is
       * shown uncovered, and the side the image sits on alternates so the eye
       * has a rhythm to follow down the page.
       */}
      <ol className="reveal-stagger mt-12 lg:mt-16">
        {items.map((item, i) => {
          const { ratio, fit, plate } = frame(item.service);
          const imageFirst = i % 2 === 1;

          return (
            <li key={item.slug} className="reveal group relative border-t border-line last:border-b">
              {/* The row's own rule draws itself in on hover — the accent device the
                  stats and the service list already use, put to work as feedback. */}
              <span
                aria-hidden
                className="absolute -top-px start-0 h-px w-0 bg-secondary transition-all duration-700 ease-out group-hover:w-full"
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
                  {item.image && (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 660px, 100vw"
                      className={`${fit} transition duration-700 ease-out group-hover:scale-[1.03]`}
                    />
                  )}
                </div>

                <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                  <div className="flex items-baseline gap-5">
                    <span
                      dir="ltr"
                      className="text-[clamp(26px,2.8vw,38px)] leading-none font-bold text-faint tabular-nums transition duration-500 group-hover:text-secondary"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow text-muted">{item.subtitle}</span>
                  </div>

                  <h3 className="t-title mt-6 max-w-[14ch] text-balance">{item.title}</h3>

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
