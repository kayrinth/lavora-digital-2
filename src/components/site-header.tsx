"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Close, Menu } from "./icons";
import { isActive, type NavItem, type NavService } from "@/lib/nav";

export type MenuItem = NavItem & { children?: NavService[] };

/**
 * 80px tall and sticky. Transparent over the home page's film, solid white
 * everywhere else and once the page scrolls past 24px.
 */
export function SiteHeader({
  brand,
  items,
  home,
  cta,
  ctaHref,
  otherLocale,
  otherLocaleLabel,
  openLabel,
  closeLabel,
}: {
  brand: string;
  items: MenuItem[];
  /** The home path for this locale: the one page the header starts transparent on. */
  home: string;
  cta: string;
  ctaHref: string;
  otherLocale: string;
  otherLocaleLabel: string;
  openLabel: string;
  closeLabel: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 24);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const over = pathname === home && !scrolled && !open;
  // Full white over the film: at 85% the links drop under 4.5:1 on its light frames.
  const item = over
    ? "text-white decoration-2 underline-offset-8 hover:underline"
    : "text-dim hover:text-ink aria-[current=page]:text-brand";

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color] duration-300 ${
        over ? "text-white [--focus:#fff]" : "border-b border-line bg-surface text-ink"
      }`}
    >
      {/* Deep enough for white links over the film's light frames. It cross-fades with the header's ground rather
          than snapping when the page scrolls. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-black/70 via-black/35 to-transparent transition-opacity duration-300 ${
          over ? "" : "opacity-0"
        }`}
      />
      <div className="wrap flex h-20 items-center justify-between gap-3 sm:gap-6">
        <Link href={home} onClick={close} className="flex min-h-11 shrink-0 items-center gap-0 sm:gap-2.5">
          {/* Two marks cross-fading, not one flattened with a filter: the light version keeps the
              artwork's navy-to-white sweep instead of going flat. */}
          <span className="grid shrink-0 *:col-start-1 *:row-start-1 *:size-8 *:object-contain *:transition-opacity *:duration-300 sm:*:size-9">
            <Image
              src="/lavora-mark-light.webp"
              alt=""
              width={48}
              height={48}
              priority
              className={over ? "" : "opacity-0"}
            />
            <Image
              src="/lavora-mark.webp"
              alt=""
              width={48}
              height={48}
              priority
              className={over ? "opacity-0" : ""}
            />
          </span>
          {/* The wordmark is the logo's own lettering rather than Archivo set to look like it. It
              drops below 40rem, where the row has to hold the menu and the brief button too; the
              name stays in the accessibility tree either way, in the page's own language. */}
          <span className="hidden h-7 *:col-start-1 *:row-start-1 *:h-full *:w-auto *:transition-opacity *:duration-300 sm:grid sm:h-8">
            <Image
              src="/lavora-wordmark-light.webp"
              alt=""
              width={768}
              height={167}
              sizes="160px"
              priority
              className={over ? "" : "opacity-0"}
            />
            <Image
              src="/lavora-wordmark.webp"
              alt=""
              width={768}
              height={167}
              sizes="160px"
              priority
              className={over ? "opacity-0" : ""}
            />
          </span>
          <span className="sr-only">{brand}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
          {items.map((n) => {
            const on = isActive(pathname, n.match, n.exact);
            const label = `py-3 text-[0.8125rem] font-bold tracking-[0.08em] uppercase transition-colors ${item}`;

            if (!n.children)
              return (
                <Link
                  key={n.key}
                  href={n.href ?? home}
                  aria-current={on ? "page" : undefined}
                  className={label}
                >
                  {n.label}
                </Link>
              );

            return (
              <div key={n.key} className="group relative">
                {n.href ? (
                  <Link href={n.href} aria-current={on ? "page" : undefined} className={label}>
                    {n.label}
                  </Link>
                ) : (
                  <span aria-current={on ? "page" : undefined} className={`${label} block cursor-default`}>
                    {n.label}
                  </span>
                )}
                {/* Flat: a hairline-bordered white card, no shadow. */}
                <div className="invisible absolute start-1/2 top-full z-10 w-64 -translate-x-1/2 pt-2 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 rtl:translate-x-1/2">
                  <ul className="border border-line bg-surface py-1">
                    {n.children.map((c) => (
                      <li key={c.label}>
                        <Link
                          href={c.href}
                          aria-current={c.match && isActive(pathname, c.match, true) ? "page" : undefined}
                          className="block px-4 py-3 text-sm font-semibold text-dim transition-colors hover:bg-mist hover:text-ink aria-[current=page]:text-brand"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`/${otherLocale}`}
            hrefLang={otherLocale}
            lang={otherLocale}
            className={`hidden min-h-11 items-center px-2 text-[0.8125rem] font-bold tracking-[0.08em] uppercase transition-colors sm:inline-flex ${item}`}
          >
            {otherLocaleLabel}
          </Link>
          {/* In the header from 360px, so a brief is one tap away on phones too; narrower phones get it in the menu. */}
          <Link
            href={ctaHref}
            onClick={close}
            className="btn btn-brand hidden h-11 px-4 text-xs min-[22.5rem]:inline-flex sm:h-12 sm:px-6 sm:text-sm"
          >
            {cta}
          </Link>
          <button
            type="button"
            className={`grid size-11 cursor-pointer place-items-center rounded-md border transition-colors duration-300 sm:size-12 lg:hidden ${
              over ? "border-white/50" : "border-line"
            }`}
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? closeLabel : openLabel}
            onClick={() => setOpen(!open)}
          >
            {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="menu"
          aria-label="Main"
          className="wrap pb-4 transition-[opacity,translate] duration-300 ease-out-expo starting:-translate-y-2 starting:opacity-0 motion-reduce:starting:translate-y-0 lg:hidden"
        >
          <ul className="border-t border-line pt-2">
            {items.map((n) => {
              const on = isActive(pathname, n.match, n.exact);
              return (
                <li key={n.key}>
                  {n.href ? (
                    <Link
                      href={n.href}
                      onClick={close}
                      aria-current={on ? "page" : undefined}
                      className="block rounded-md px-3 py-3 text-lg font-bold uppercase transition-colors hover:bg-mist aria-[current=page]:text-brand"
                    >
                      {n.label}
                    </Link>
                  ) : (
                    <p className="px-3 py-3 text-lg font-bold text-dim uppercase">{n.label}</p>
                  )}
                  {n.children && (
                    <ul className="pb-1 ps-3">
                      {n.children.map((c) => (
                        <li key={c.label}>
                          <Link
                            href={c.href}
                            onClick={close}
                            className="block rounded-md px-3 py-2.5 text-base font-semibold text-dim transition-colors hover:bg-mist hover:text-ink"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
            <li>
              <Link
                href={`/${otherLocale}`}
                hrefLang={otherLocale}
                lang={otherLocale}
                onClick={close}
                className="block rounded-md px-3 py-3 text-lg font-bold uppercase transition-colors hover:bg-mist"
              >
                {otherLocaleLabel}
              </Link>
            </li>
          </ul>
          <Link href={ctaHref} onClick={close} className="btn btn-brand mt-2 w-full min-[22.5rem]:hidden">
            {cta}
          </Link>
        </nav>
      )}
    </header>
  );
}
