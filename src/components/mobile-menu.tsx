"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Close, Menu } from "./icons";
import { isActive, type NavItem, type NavService } from "./desktop-nav";

type Item = NavItem & { children?: NavService[] };

export function MobileMenu({
  items,
  otherLocale,
  otherLocaleLabel,
  openLabel,
  closeLabel,
}: {
  items: Item[];
  otherLocale: string;
  otherLocaleLabel: string;
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? closeLabel : openLabel}
        className="grid size-11 place-items-center rounded-full text-ink lg:hidden"
      >
        {open ? <Close className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <nav
          id="mobile-menu"
          className="absolute inset-x-0 top-full mt-2 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-[24px] border border-line bg-surface lg:hidden"
        >
          <ul className="px-6 py-2">
            {items.map((item) => {
              const on = isActive(pathname, item.match, item.exact);
              return (
                <li key={item.key} className="border-b border-line">
                  {/* A dropdown trigger has no page of its own, so it becomes a heading here. */}
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={on ? "page" : undefined}
                      className={`flex min-h-[48px] items-center text-[14px] ${
                        on ? "font-semibold text-ink" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <p
                      className={`eyebrow flex min-h-[44px] items-center ${
                        on ? "text-ink" : "text-muted"
                      }`}
                    >
                      {item.label}
                    </p>
                  )}

                  {item.children && (
                    <ul className="pb-2">
                      {item.children.map((c) => {
                        const childOn = c.match ? isActive(pathname, c.match, true) : false;
                        return (
                          <li key={c.label}>
                            <Link
                              href={c.href}
                              onClick={() => setOpen(false)}
                              aria-current={childOn ? "page" : undefined}
                              className={`flex min-h-[44px] items-center ps-4 text-[13.5px] ${
                                childOn ? "font-semibold text-ink" : "text-muted"
                              }`}
                            >
                              {c.label}
                            </Link>
                          </li>
                        );
                      })}
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
                onClick={() => setOpen(false)}
                className="flex min-h-[48px] items-center text-[14px]"
              >
                {otherLocaleLabel}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
