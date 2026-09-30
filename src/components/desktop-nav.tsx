"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Chevron } from "./icons";

export type NavItem = {
  key: string;
  label: string;
  /** Omitted for a dropdown that is only a trigger, like Service. */
  href?: string;
  /** Path this item owns. Exact for the home page, a prefix for the rest. */
  match: string;
  exact?: boolean;
};

export type NavService = { label: string; href: string; match?: string };

/**
 * Marks the item whose section you are actually in. Home only wins on the home
 * page itself, so it stops looking permanently selected.
 */
export function isActive(pathname: string, match: string, exact = false) {
  return exact ? pathname === match : pathname === match || pathname.startsWith(`${match}/`);
}

const LINK = "text-[13.5px] transition";
const ON = "font-semibold text-ink";
const OFF = "text-muted hover:text-ink";

export function DesktopNav({
  items,
}: {
  /** A dropdown renders when an item has children; an item without an href is a button. */
  items: (NavItem & { children?: NavService[] })[];
}) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-7 lg:flex lg:gap-9">
      {items.map((item) => {
        const on = isActive(pathname, item.match, item.exact);
        const label = item.href ? (
          <Link
            href={item.href}
            aria-current={on ? "page" : undefined}
            className={`${LINK} ${on ? ON : OFF}`}
          >
            {item.label}
          </Link>
        ) : (
          <button
            aria-current={on ? "page" : undefined}
            className={`flex items-center gap-1 ${LINK} ${
              on ? ON : "text-muted group-hover:text-ink"
            }`}
          >
            {item.label}
            <Chevron className="size-3.5 transition group-hover:rotate-180" />
          </button>
        );

        if (!item.children) return <span key={item.key}>{label}</span>;

        return (
          <div key={item.key} className="group relative">
            <span className="flex items-center gap-1">
              {label}
              {item.href && (
                <Chevron className="size-3.5 text-muted transition group-hover:rotate-180" />
              )}
            </span>

            <div className="invisible absolute top-full left-1/2 w-60 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <ul className="rounded-2xl border border-line bg-surface p-2">
                {item.children.map((c) => {
                  const childOn = c.match ? isActive(pathname, c.match, true) : false;
                  return (
                    <li key={c.label}>
                      <Link
                        href={c.href}
                        aria-current={childOn ? "page" : undefined}
                        className={`block rounded-full px-4 py-2.5 text-start text-[13px] transition ${
                          childOn
                            ? "bg-background font-medium text-ink"
                            : "text-muted hover:bg-background hover:text-ink"
                        }`}
                      >
                        {c.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
