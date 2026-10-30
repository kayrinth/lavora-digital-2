import Image from "next/image";
import Link from "next/link";
import { ArrowDisc } from "./ui";
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
 * An index, not a card grid: a 2px ink rule on top, hairlines between rows, a
 * square thumbnail, the title in row size and an arrow disc. Website work is a
 * screenshot and fills its frame; advertising and marketing work is a social
 * creative whose message lives in the whole frame, so it is shown contained.
 */
export function PortfolioIndex({ items, viewLabel }: { items: IndexItem[]; viewLabel: string }) {
  return (
    <ol data-reveal="list" className="border-t-2 border-ink">
      {items.map((item) => {
        const web = item.service === "web";
        return (
          <li key={item.slug} className="border-b border-line">
            <Link
              href={item.href}
              aria-label={`${item.title} — ${viewLabel}`}
              className="group grid grid-cols-[5rem_1fr_auto] items-center gap-5 py-5 md:grid-cols-[8rem_1fr_auto] md:gap-8 md:py-6 xl:grid-cols-[9rem_22rem_1fr_auto]"
            >
              <span className="block aspect-square overflow-hidden bg-mist">
                {item.image && (
                  <Image
                    src={item.image}
                    alt=""
                    width={288}
                    height={288}
                    className={`size-full transition-transform duration-700 ease-out-expo group-hover:scale-110 ${
                      web ? "object-cover object-top" : "object-contain p-2"
                    }`}
                  />
                )}
              </span>

              <span className="min-w-0">
                <span className="display block text-row transition-colors group-hover:text-brand">
                  {item.title}
                </span>
                <span className="mt-1 block text-sm text-dim">
                  {item.serviceLabel} · {item.subtitle}
                </span>
                <span className="mt-2 block text-dim xl:hidden">{item.summary}</span>
              </span>

              <span className="hidden max-w-xl text-dim xl:block">{item.summary}</span>

              <ArrowDisc />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
