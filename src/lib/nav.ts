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
