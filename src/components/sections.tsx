import Image from "next/image";
import Link from "next/link";
import {
  Accent,
  AccentButton,
  ArrowDisc,
  Band,
  Container,
  IconTile,
  PrimaryButton,
} from "./ui";
import { ContactForm } from "./contact-form";
import { HeroVideo } from "./hero-video";
import { SiteHeader, type MenuItem } from "./site-header";
import type { Dictionary, Locale } from "@/lib/dictionaries";
import { PROJECTS } from "@/lib/portfolio";
import { SERVICE_SLUGS } from "@/lib/services";
import {
  ArrowRight,
  ChevronRight,
  Cursor,
  Document,
  Gauge,
  Instagram,
  Linkedin,
  Mail,
  Megaphone,
  Sparkle,
  Target,
  TrendUp,
  Youtube,
} from "./icons";

type P = { lang: Locale; t: Dictionary };

/**
 * The footer's social row. These still point at the contact section: swap each
 * href for the real profile URL once the accounts exist.
 */
const SOCIALS = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Youtube, label: "YouTube" },
];

/** Every in-app link carries the locale, so /ar never falls back to /en. */
const href = (lang: Locale, path: string) => `/${lang}${path}`;

/* Icon lists, each one running parallel to its list in the dictionary. */
const FEATURE_ICONS = [Target, Gauge, TrendUp, Document];
const SERVICE_ICONS = [Megaphone, Cursor, TrendUp];
const STEP_ICONS = [Sparkle, Target, Megaphone, TrendUp];

/** High-resolution artwork per service, in the order of t.services.items. */
const SERVICE_ART = ["/services/ads.webp", "/services/web.webp", "/services/digital-marketing.webp"];

/* ------------------------------------------------------------------ Navbar */

export function Navbar({ lang, t }: P) {
  const services = t.services.items.map((s, i) => {
    const slug = SERVICE_SLUGS[i];
    const path = slug ? `/services/${slug}` : "#services";
    return {
      label: s.title,
      href: href(lang, path),
      match: slug ? `/${lang}${path}` : undefined,
    };
  });

  // Only the categories that actually have projects reach the Project dropdown.
  const projectCategories = PROJECTS.map((p) => p.service)
    .filter((s, i, all) => all.indexOf(s) === i)
    .map((key) => ({
      label: t.portfolio.services[key],
      href: href(lang, `/portfolio?service=${key}`),
    }));

  const menu: MenuItem[] = [
    { key: "home", label: t.nav.home, href: href(lang, "#top"), match: `/${lang}`, exact: true },
    { key: "service", label: t.nav.service, match: `/${lang}/services`, children: services },
    {
      key: "work",
      label: t.nav.work,
      href: href(lang, "/portfolio"),
      match: `/${lang}/portfolio`,
      children: projectCategories,
    },
    { key: "about", label: t.nav.about, href: href(lang, "/about"), match: `/${lang}/about` },
  ];

  return (
    <SiteHeader
      brand={t.brand}
      items={menu}
      home={`/${lang}`}
      cta={t.nav.cta}
      ctaHref={href(lang, "#contact")}
      otherLocale={lang === "en" ? "ar" : "en"}
      otherLocaleLabel={t.nav.switchTo}
      openLabel={t.nav.openMenu}
      closeLabel={t.nav.closeMenu}
    />
  );
}

/* -------------------------------------------------------------------- Hero */

/** The showreel, full-bleed under the transparent header. */
export function Hero({ t }: { t: Dictionary }) {
  return (
    <HeroVideo
      alt={t.hero.imageAlt}
      poster="/hero-poster.webp"
      src="/lavora-hero-1080.webm"
      headline={t.hero.headline}
      tagline={t.hero.eyebrow}
      label={t.a11y.showreel}
      pauseLabel={t.a11y.pause}
      playLabel={t.a11y.play}
    />
  );
}

/* ------------------------------------------------------------------- Intro */

/** Who the agency is: the claim on white, the studio on a navy field. */
export function Intro({ lang, t }: P) {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-4 py-16 text-center md:px-16 md:py-28">
        <h1 data-reveal className="display max-w-lg text-head">
          <Accent lead={t.collaboration.titleLead} strong={t.collaboration.titleStrong} />
        </h1>
        <p className="mt-6 max-w-md text-lead text-dim">{t.hero.lead}</p>
        <PrimaryButton href={href(lang, "#contact")} withArrow className="mt-8 md:mt-10">
          {t.nav.cta}
        </PrimaryButton>
      </div>
      <div className="flex items-center justify-center bg-brand p-6 md:p-20">
        <div data-reveal="frame" className="relative w-full max-w-md overflow-hidden bg-ink">
          <Image
            src="/hero1.webp"
            alt={t.hero.imageAlt}
            width={1200}
            height={900}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- About */

/** How the agency works, as an index of four rows under a 2px rule. */
export function About({ t }: { t: Dictionary }) {
  return (
    <Band ground="mist" id="collaboration" className="scroll-mt-20">
      <div className="grid gap-6 md:gap-8 lg:grid-cols-12 lg:items-end">
        <h2 data-reveal className="display text-head lg:col-span-7">
          {t.nav.about}
        </h2>
        <p className="max-w-md text-lead text-dim lg:col-span-4 lg:col-start-9">
          {t.collaboration.body}
        </p>
      </div>

      <ul data-reveal="list" className="mt-10 border-t-2 border-ink md:mt-16">
        {t.collaboration.features.map((f, i) => {
          const Icon = FEATURE_ICONS[i];
          return (
            <li
              key={f.title}
              className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 border-b border-line py-5 md:grid-cols-[auto_18rem_1fr] md:items-center md:gap-x-8"
            >
              <IconTile icon={Icon} size="sm" className="row-span-2 md:row-span-1" />
              <h3 className="text-base/snug font-bold md:text-lg/snug">{f.title}</h3>
              <p className="text-dim">{f.desc}</p>
            </li>
          );
        })}
      </ul>
    </Band>
  );
}

/* ------------------------------------------------------------------- Stats */

export function Stats({ t }: { t: Dictionary }) {
  return (
    <Band>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div data-reveal="frame" className="overflow-hidden bg-mist">
          {/* Transparent WebP: the mist plate is what the screenshot sits on. */}
          <Image
            src="/report.webp"
            alt={t.banner.imageAlt}
            width={1709}
            height={920}
            className="aspect-video w-full object-contain p-4"
          />
        </div>

        <div>
          <h2 data-reveal className="display text-head">
            <Accent lead={t.banner.titleLead} strong={t.banner.titleStrong} />
          </h2>
          <p className="mt-6 max-w-md text-lead text-dim">{t.banner.body}</p>

          <dl data-reveal="list" className="mt-10 grid gap-8 border-t-2 border-ink pt-8 sm:grid-cols-2">
            {t.hero.stats.map((s) => (
              /* Column-reversed, so the figure reads first while the term still precedes its value in the
                 markup and a screen reader hears the label once rather than twice. */
              <div key={s.l} className="flex flex-col-reverse">
                <dt className="mt-3 text-dim">{s.l}</dt>
                <dd dir="ltr" className="display text-title text-brand">
                  {s.n}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Band>
  );
}

/* ---------------------------------------------------------------- Services */

export function Services({ lang, t }: P) {
  return (
    <Band ground="blue" id="services" className="scroll-mt-20">
      <h2 data-reveal className="display text-head leading-[1.08]">
        <Accent lead={t.services.titleLead} strong={t.services.titleStrong} field />
      </h2>

      <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-14 lg:grid-cols-3 lg:gap-8">
        {t.services.items.map((s, i) => {
          const Icon = SERVICE_ICONS[i];
          return (
            // A flex column, so three descriptions of different lengths still land their arrows on one line.
            <article key={s.title} className="group relative flex flex-col">
              <div data-reveal="frame" className="aspect-[6/5] overflow-hidden bg-mist">
                <Image
                  src={SERVICE_ART[i]}
                  alt={s.title}
                  width={900}
                  height={750}
                  className="size-full object-contain p-5 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-6 flex items-center gap-4">
                <IconTile icon={Icon} size="sm" />
                <h3 className="text-base font-extrabold uppercase md:text-xl">{s.title}</h3>
              </div>
              <p className="mt-3 max-w-sm">{s.desc}</p>
              <div className="mt-auto pt-6">
                <Link
                  href={href(lang, `/services/${SERVICE_SLUGS[i]}`)}
                  aria-label={`${s.title} — ${t.services.learnMore}`}
                  className="grid size-12 place-items-center rounded-full border border-white transition-colors group-hover:bg-white group-hover:text-ink after:absolute after:inset-0"
                >
                  <ChevronRight className="size-5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* The way out of the section, as one rule-wide row. */}
      <Link
        href={href(lang, "#contact")}
        className="group mt-12 flex flex-col gap-5 border-t-2 border-white pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-16"
      >
        <span className="display text-row max-w-[20ch]">{t.portfolio.ctaTitle}</span>
        <span className="inline-flex shrink-0 items-center gap-4 text-sm font-bold tracking-[0.06em] uppercase">
          {t.portfolio.cta}
          <ArrowDisc size="size-12" onDark icon={ArrowRight} />
        </span>
      </Link>
    </Band>
  );
}

/* --------------------------------------------------------- Selected work */

function pickThumb(p: (typeof PROJECTS)[number]) {
  return p.thumb ?? p.gallery?.[0];
}

/**
 * Curates one flagship project per discipline (ads, web, marketing) so the
 * home page shows the agency's full spectrum.
 */
function getFeaturedProjects() {
  const ads =
    PROJECTS.find((p) => p.slug === "unilever-indonesia") ??
    PROJECTS.find((p) => p.service === "ads" && pickThumb(p));
  const web =
    PROJECTS.find((p) => p.slug === "borch-and-co") ??
    PROJECTS.find((p) => p.service === "web" && pickThumb(p));
  const mkt =
    PROJECTS.find((p) => p.slug === "make-over") ??
    PROJECTS.find((p) => p.service === "marketing" && pickThumb(p));

  const list = [ads, web, mkt].filter(Boolean) as (typeof PROJECTS)[number][];
  return list.length === 3 ? list : PROJECTS.filter(pickThumb).slice(0, 3);
}

const FEATURED = getFeaturedProjects();

/** A run of projects as an index: a square thumbnail, the title, the service and the client. */
export function Work({ lang, t }: P) {
  return (
    <Band>
      <div className="grid gap-6 md:gap-8 lg:grid-cols-12 lg:items-end">
        <h2 data-reveal className="display text-head lg:col-span-7">
          <Accent lead={t.portfolio.titleLead} strong={t.portfolio.titleStrong} />
        </h2>
        <p className="max-w-md text-lead text-dim lg:col-span-4 lg:col-start-9">{t.portfolio.intro}</p>
      </div>

      <ul data-reveal="list" className="mt-10 border-t-2 border-ink md:mt-16">
        {FEATURED.map((p) => {
          const subtitle = p.subtitle[lang] ?? p.subtitle.en;
          return (
            <li key={p.slug} className="border-b border-line">
              <Link
                href={href(lang, `/portfolio/${p.slug}`)}
                className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-5 py-4 md:grid-cols-[6rem_1fr_auto] md:gap-8 md:py-5 xl:grid-cols-[7rem_1fr_13rem_18rem_auto]"
              >
                <span className="block aspect-square overflow-hidden bg-mist">
                  {pickThumb(p) && (
                    <Image
                      src={pickThumb(p)!}
                      alt=""
                      width={240}
                      height={240}
                      className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                    />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="display block text-row transition-colors group-hover:text-brand">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-sm text-dim xl:hidden">
                    {t.portfolio.services[p.service]} · {subtitle}
                  </span>
                </span>
                <span className="hidden font-semibold xl:block">{t.portfolio.services[p.service]}</span>
                <span className="hidden truncate text-dim xl:block">{subtitle}</span>
                <ArrowDisc />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-10">
        <PrimaryButton href={href(lang, "/portfolio")} withArrow>
          {t.services.seeMore}
        </PrimaryButton>
      </div>
    </Band>
  );
}

/** A project as a card: its image, title and service, and an arrow to its page. */
export function ProjectCard({
  project,
  lang,
  t,
  compact,
}: {
  project: (typeof PROJECTS)[number];
  lang: Locale;
  t: Dictionary;
  /** Two up on phones, where the arrow is dropped: the whole card is the link. */
  compact?: boolean;
}) {
  const src = pickThumb(project);
  const subtitle = project.subtitle[lang] ?? project.subtitle.en;
  const web = project.service === "web";

  return (
    <Link href={href(lang, `/portfolio/${project.slug}`)} className="group block">
      <span className={`block overflow-hidden bg-mist ${web ? "aspect-video" : "aspect-[4/5]"}`}>
        {src && (
          <Image
            src={src}
            alt=""
            width={900}
            height={1125}
            className={`size-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] ${
              web ? "object-cover object-top" : "object-contain p-4"
            }`}
          />
        )}
      </span>
      <span className={`flex items-start justify-between gap-4 ${compact ? "mt-3 sm:mt-4" : "mt-4"}`}>
        <span>
          <span className="block text-base font-extrabold uppercase md:text-xl">{project.title}</span>
          <span className="mt-1 block text-sm text-dim">
            {t.portfolio.services[project.service]} · {subtitle}
          </span>
        </span>
        <span className={compact ? "hidden sm:block" : ""}>
          <ArrowDisc size="size-10" />
        </span>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------ Work process */

export function Process({ lang, t }: P) {
  return (
    <Band ground="mist" id="process" className="scroll-mt-20">
      <div className="grid gap-6 md:gap-8 lg:grid-cols-12 lg:items-end">
        <h2 data-reveal className="display text-head lg:col-span-7">
          <Accent lead={t.process.titleLead} strong={t.process.titleStrong} tail={t.process.titleTail} />
        </h2>
        <p className="max-w-md text-lead text-dim lg:col-span-4 lg:col-start-9">{t.process.body}</p>
      </div>

      <ol
        data-reveal="list"
        className="mt-10 grid gap-x-16 gap-y-8 md:mt-16 md:grid-flow-col md:grid-cols-2 md:grid-rows-2 md:gap-y-10"
      >
        {t.process.steps.map((s, i) => {
          const Icon = STEP_ICONS[i];
          return (
            <li key={s.title} className="flex gap-4 md:gap-7">
              <span className="grid size-16 shrink-0 place-items-center bg-blue text-white md:size-28">
                <Icon aria-hidden className="size-7 md:size-11" strokeWidth={1.25} />
              </span>
              <div className="md:pt-1">
                <h3 className="text-base font-extrabold text-brand uppercase md:text-xl">{s.title}</h3>
                <p className="mt-2 text-ink/80">{s.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 md:mt-14">
        <AccentButton href={href(lang, "#contact")}>{t.process.cta}</AccentButton>
      </div>
    </Band>
  );
}

/* ----------------------------------------------------------------- Clients */

/** In the order of public/client. */
const CLIENTS = [
  { file: "01. Unilever.png", name: "Unilever" },
  { file: "02. LOGO VASELINE.png", name: "Vaseline" },
  { file: "03. LOGO DOVE.png", name: "Dove" },
  { file: "04. LOGO PEPSODENT.webp", name: "Pepsodent" },
  { file: "05. LOGO RINSO.webp", name: "Rinso" },
  { file: "06. LOGO ADIDAS.png", name: "Adidas" },
  { file: "07. LOGO KALBE.webp", name: "Kalbe" },
  { file: "08. LOGO PROMAG.png", name: "Promag" },
  { file: "09. LOGO WAROENG STEAK.jpg", name: "Waroeng Steak" },
  { file: "10. LOGO SPRINGHILL.jpeg", name: "Springhill" },
  { file: "11. LOGO NATA SOLUSI.jpg", name: "Nata Solusi" },
  { file: "12. LOGO CHINESERD.png", name: "Chinese RD" },
  { file: "13. LOGO BARBURGER.png", name: "Barburger" },
  { file: "14. LOGO SENSWELL.webp", name: "Senswell" },
];

/** The client list under its navy bar. */
export function Clients({ t }: { t: Dictionary }) {
  return (
    <section aria-labelledby="clients">
      <div className="bg-brand py-5 text-white md:py-6">
        <div className="wrap flex items-center gap-6 md:gap-10">
          <span aria-hidden className="h-0.5 flex-1 bg-white" />
          <h2 id="clients" data-reveal className="display text-head">
            {`${t.clients.titleLead} ${t.clients.titleStrong}`.trim()}
          </h2>
          <span aria-hidden className="h-0.5 flex-1 bg-white" />
        </div>
      </div>
      <Container className="py-12 md:py-20">
        {/* 14 logos divide flush by 2 and by 7, so the phone and the desktop both end on a full row;
            six columns left four empty ruled cells hanging off the end. */}
        <ul data-reveal="list" className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-7">
          {CLIENTS.map((c) => (
            <li
              key={c.file}
              className="relative grid h-20 place-items-center border-r border-b border-line px-2 sm:h-24 sm:px-3 md:h-32 md:px-4"
            >
              <Image
                src={`/client/${encodeURIComponent(c.file)}`}
                alt={c.name}
                width={176}
                height={88}
                className="max-h-11 w-auto max-w-full object-contain sm:max-h-14"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------------- CTA */

export function Cta({ t }: { t: Dictionary }) {
  return (
    <Band ground="blue" id="contact" className="scroll-mt-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 data-reveal className="display text-head leading-[1.08]">
          <Accent lead={t.cta.titleLead} strong={t.cta.titleStrong} tail={t.cta.titleTail} field />
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lead">{t.cta.body}</p>
      </div>
      <div className="mx-auto mt-10 max-w-3xl rounded-md bg-surface p-6 text-ink [--focus:var(--color-brand)] md:p-10">
        <ContactForm t={t.form} />
      </div>
    </Band>
  );
}

/* ------------------------------------------------------------------ Footer */

export function Footer({ lang, t }: P) {
  const heading = "text-sm font-bold tracking-[0.08em] uppercase";

  const columns = [
    {
      title: t.footer.servicesTitle,
      items: t.services.items.map((s, i) => {
        const slug = SERVICE_SLUGS[i];
        return { label: s.title, href: href(lang, slug ? `/services/${slug}` : "#services") };
      }),
    },
    {
      title: t.footer.companyTitle,
      items: [
        { label: t.nav.about, href: href(lang, "/about") },
        { label: t.nav.work, href: href(lang, "/portfolio") },
        { label: t.nav.contact, href: href(lang, "#contact") },
      ],
    },
  ];

  return (
    <footer className="bg-ink text-white [--focus:#fff]">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <Image
              src="/lavora-logo.webp"
              alt=""
              width={40}
              height={40}
              className="size-10 object-contain brightness-0 invert"
            />
            <span className="display text-lg">{t.brand}</span>
          </div>
          <p className="mt-6 max-w-sm text-base/relaxed text-white/70">{t.footer.blurb}</p>

          <ul className="mt-6 flex items-center gap-2">
            {SOCIALS.map(({ Icon, label }) => (
              <li key={label}>
                <Link
                  href={href(lang, "#contact")}
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-md border border-white/25 transition-colors hover:border-white hover:bg-white hover:text-ink"
                >
                  <Icon className="size-[18px]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col, i) => (
          <div key={col.title} className={i === 0 ? "md:col-span-4" : "md:col-span-3"}>
            <h2 className={heading}>{col.title}</h2>
            <ul className="mt-2">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-base text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {i === 1 && (
              <Link
                href={href(lang, "#contact")}
                className="link mt-2 inline-flex min-h-11 items-center gap-2 text-base"
              >
                <Mail className="size-4" />
                {t.nav.contact}
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-2 border-t border-white/15 py-8 text-sm text-white/60">
          <p>{t.footer.rights}</p>
          <div className="flex gap-6">
            <Link href={href(lang, "/terms")} className="transition-colors hover:text-white">
              {t.footer.terms}
            </Link>
            <Link href={href(lang, "/privacy")} className="transition-colors hover:text-white">
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
