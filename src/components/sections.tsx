import Image from "next/image";
import Link from "next/link";
import {
  AccentButton,
  AccentUnderline,
  Container,
  Eyebrow,
  GhostButton,
  PrimaryButton,
} from "./ui";
import { ContactForm } from "./contact-form";
import { DesktopNav } from "./desktop-nav";
import { MobileMenu } from "./mobile-menu";
import type { Dictionary, Locale } from "@/lib/dictionaries";
import { PROJECTS } from "@/lib/portfolio";
import { SERVICE_SLUGS } from "@/lib/services";
import {
  ArrowRight,
  ArrowUpRight,
  Cursor,
  Instagram,
  Linkedin,
  Megaphone,
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

  const menu = [
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

  const other: Locale = lang === "en" ? "ar" : "en";

  return (
    /*
     * Sticky rather than fixed: the bar floats inside its own padded strip, so
     * it reads as a detached pill without the page needing a top offset to
     * compensate. `relative` anchors the mobile sheet that drops out of it.
     */
    <header className="sticky top-0 z-50 pt-3 sm:pt-4">
      <Container>
        <div className="relative flex h-14 items-center justify-between gap-6 rounded-full border border-line bg-surface/80 ps-5 pe-2 backdrop-blur-xl sm:h-16 sm:ps-6">
          <Link href={href(lang, "#top")} className="flex shrink-0 items-center gap-2.5">
            <Image
              src="/lavora-logo.webp"
              alt={t.brand}
              width={32}
              height={32}
              priority
              className="size-8 object-contain"
            />
            <span className="text-[15px] font-semibold tracking-tight">{t.brand}</span>
          </Link>

          <DesktopNav items={menu} />

          <div className="flex items-center gap-1">
            {/* Same page, other language. hreflang lets crawlers pair the two. */}
            <Link
              href={`/${other}`}
              hrefLang={other}
              lang={other}
              className="hidden rounded-full px-3 py-2 text-[12px] text-muted transition hover:text-ink sm:inline-block"
            >
              {t.nav.switchTo}
            </Link>
            <span className="hidden lg:inline-flex">
              <PrimaryButton href={href(lang, "#contact")} className="px-5 py-3 text-[12.5px]">
                {t.nav.cta}
              </PrimaryButton>
            </span>
            <MobileMenu
              items={menu}
              otherLocale={other}
              otherLocaleLabel={t.nav.switchTo}
              openLabel={t.nav.openMenu}
              closeLabel={t.nav.closeMenu}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}

/* -------------------------------------------------------------------- Hero */

export function Hero({ lang, t }: P) {
  const last = t.hero.headline.length - 1;

  return (
    <section id="top" className="pt-10 pb-6 sm:pt-16 lg:pt-20">
      <Container>
        {/*
         * Asymmetric: a narrow column of supporting copy on the left, the
         * headline taking the rest. They stack into reading order on mobile.
         */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,17rem)_1fr] lg:items-end lg:gap-14">
          <div
            className="rise order-2 lg:order-1 lg:pb-3"
            style={{ "--d": "260ms" } as React.CSSProperties}
          >
            <Eyebrow>{t.hero.eyebrow}</Eyebrow>
            <p className="mt-5 max-w-sm text-[14.5px] leading-[1.6] text-muted">{t.hero.lead}</p>
            <PrimaryButton href={href(lang, "#contact")} withArrow className="mt-7">
              {t.nav.cta}
            </PrimaryButton>
          </div>

          <h1 className="t-hero order-1 lg:order-2 lg:text-end">
            {t.hero.headline.map((line, i) => (
              <span
                key={line.strong}
                className="rise block"
                style={{ "--d": `${i * 110}ms` } as React.CSSProperties}
              >
                <span className="font-medium text-faint">{line.lead}</span>{" "}
                {i === last ? (
                  <span className="relative inline-block">
                    {line.strong}
                    <AccentUnderline className="start-0 -bottom-[0.02em] h-[0.16em] w-full" />
                  </span>
                ) : (
                  line.strong
                )}
              </span>
            ))}
          </h1>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------- Hero image */

export function HeroImage({ lang, t }: P) {
  return (
    <section className="pb-20 sm:pb-24 lg:pb-32">
      <Container>
        <div
          className="rise relative overflow-hidden rounded-[24px] bg-dark sm:rounded-[32px]"
          style={{ "--d": "420ms" } as React.CSSProperties}
        >
          <div className="relative aspect-[3/4] sm:aspect-[16/10] lg:aspect-[2.3/1]">
            <Image
              src="/hero1.webp"
              alt={t.hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1440px) 1392px, 100vw"
              className="object-cover object-[55%_50%]"
            />
          </div>

          {/* Numbered service chips, the reference's bottom-left index row. */}
          <ul className="absolute bottom-6 start-6 hidden gap-2 lg:flex">
            {t.services.items.map((s, i) => (
              <li key={s.title}>
                <Link
                  href={href(lang, `/services/${SERVICE_SLUGS[i]}`)}
                  className="flex items-center gap-2 rounded-full bg-ink/45 px-4 py-2.5 text-[12px] text-white backdrop-blur-md transition hover:bg-ink"
                >
                  <span dir="ltr" className="text-primary tabular-nums">
                    0{i + 1}
                  </span>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Floating information card. Full width on phones, a panel on desktop. */}
          <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-surface p-5 sm:inset-x-auto sm:bottom-6 sm:end-6 sm:max-w-[19rem] sm:p-6">
            <p className="text-[17px] leading-[1.3] font-medium tracking-tight sm:text-[19px]">
              {t.banner.titleLead} {t.banner.titleStrong}
            </p>
            <p className="mt-2.5 hidden text-[13px] leading-relaxed text-muted sm:block">
              {t.banner.body}
            </p>
            <Link
              href={href(lang, "#process")}
              className="group mt-4 inline-flex items-center gap-2 text-[12.5px] font-medium"
            >
              {t.services.learnMore}
              <span className="grid size-7 place-items-center rounded-full bg-primary text-ink transition group-hover:bg-ink group-hover:text-white">
                <ArrowRight className="size-3.5 rtl:rotate-180" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------- About */

/**
 * In the order of public/client. Four of these logos ship on a solid white
 * background, so every one sits on a white tile rather than straight on the page.
 */
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

export function About({ t }: { t: Dictionary }) {
  return (
    <section id="collaboration" className="scroll-mt-24 pb-24 lg:pb-32">
      <Container>
        <Eyebrow className="reveal">{t.nav.about}</Eyebrow>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <h2 className="reveal t-display max-w-[16ch]">
            {t.collaboration.titleLead}{" "}
            <span className="text-faint">{t.collaboration.titleStrong}</span>
          </h2>

          <div className="reveal lg:pb-2">
            {/* Overlapping marks: a compact proof line rather than another logo grid. */}
            <ul className="flex items-center">
              {CLIENTS.slice(0, 4).map((c, i) => (
                <li
                  key={c.file}
                  className={`relative size-14 overflow-hidden rounded-full border-2 border-background bg-surface sm:size-16 ${
                    i > 0 ? "-ms-4" : ""
                  }`}
                >
                  <Image
                    src={`/client/${encodeURIComponent(c.file)}`}
                    alt={c.name}
                    fill
                    sizes="64px"
                    className="object-contain p-2.5"
                  />
                </li>
              ))}
              <li className="-ms-4 grid size-14 place-items-center rounded-full border-2 border-background bg-ink text-[12px] font-medium text-white sm:size-16">
                +{CLIENTS.length - 4}
              </li>
            </ul>
            <p className="mt-5 max-w-sm text-[14.5px] leading-[1.6] text-muted">
              {t.collaboration.body}
            </p>
          </div>
        </div>

        {/* Thin rules instead of cards: the grid line is the only container needed. */}
        <ul className="reveal-stagger mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {t.collaboration.features.map((f, i) => (
            <li key={f.title} className="reveal border-t border-line pt-6">
              <span dir="ltr" className="eyebrow block text-muted tabular-nums">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-[17px] leading-snug font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{f.desc}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------- Stats */

export function Stats({ t }: { t: Dictionary }) {
  return (
    <section className="pb-24 lg:pb-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-[24px] bg-surface">
            {/* Transparent WebP: the white frame is what the screenshot sits on. */}
            <Image
              src="/report.webp"
              alt={t.banner.imageAlt}
              fill
              sizes="(min-width: 1024px) 620px, 100vw"
              className="object-contain p-6"
            />
          </div>

          <div className="reveal">
            <p className="max-w-md text-[14.5px] leading-[1.6] text-muted">{t.banner.body}</p>

            <dl className="mt-10 grid gap-10 sm:grid-cols-2">
              {t.hero.stats.map((s) => (
                <div key={s.l} className="relative border-t border-line pt-6">
                  <span aria-hidden className="absolute -top-px start-0 h-px w-12 bg-primary" />
                  <dt className="sr-only">{s.l}</dt>
                  <dd>
                    <span dir="ltr" className="t-stat block">
                      {s.n}
                    </span>
                    <span className="mt-4 block text-[13.5px] text-muted">{s.l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- Services */

/** One mark per service, in the order of t.services.items. */
const SERVICE_ICONS = [Megaphone, Cursor, TrendUp];

export function Services({ lang, t }: P) {
  return (
    <section id="services" className="scroll-mt-24 pb-24 lg:pb-32">
      <Container>
        <div className="rounded-[24px] bg-ink px-6 py-14 text-white sm:rounded-[32px] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <div className="reveal">
              <span className="eyebrow inline-flex rounded-full bg-primary px-4 py-2 text-ink">
                {t.services.titleStrong}
              </span>
              <h2 className="t-display mt-7 max-w-[11ch]">
                {t.services.titleLead} {t.services.titleStrong}
              </h2>
              <p className="mt-6 max-w-sm text-[14.5px] leading-[1.6] text-white/65">
                {t.collaboration.body}
              </p>
              <GhostButton
                href={href(lang, "/portfolio")}
                className="mt-8 border-white/25 text-white hover:border-white hover:bg-white hover:text-ink"
              >
                {t.services.seeMore}
              </GhostButton>
            </div>

            {/* A hairline grid, drawn by the gap rather than by borders per card. */}
            <ul className="reveal-stagger grid gap-px overflow-hidden rounded-2xl bg-white/12 sm:grid-cols-2">
              {t.services.items.map((s, i) => {
                const Icon = SERVICE_ICONS[i];
                return (
                  <li key={s.title} className="reveal bg-ink">
                    <Link
                      href={href(lang, `/services/${SERVICE_SLUGS[i]}`)}
                      className="group flex h-full flex-col p-7 transition duration-300 hover:bg-dark sm:p-8"
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="size-6 text-primary" />
                        <span dir="ltr" className="eyebrow text-white/50 tabular-nums">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="mt-8 text-[18px] leading-snug font-semibold tracking-tight">
                        {s.title}
                      </h3>
                      <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/60">{s.desc}</p>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white/80 transition group-hover:text-primary">
                        {t.services.learnMore}
                        <ArrowUpRight className="size-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                );
              })}

              {/* The empty fourth cell becomes the way out of the section. */}
              <li className="bg-ink">
                <Link
                  href={href(lang, "#contact")}
                  className="group flex h-full flex-col justify-end p-7 transition duration-300 hover:bg-dark sm:p-8"
                >
                  <span className="text-[18px] leading-snug font-semibold tracking-tight">
                    {t.portfolio.ctaTitle}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 text-[12.5px] font-medium text-primary">
                    {t.portfolio.cta}
                    <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------- Selected work */

function pickThumb(p: (typeof PROJECTS)[number]) {
  return p.thumb ?? p.gallery?.[0];
}

/** Projects that actually ship an image, since the layout is image-led. */
const FEATURED = PROJECTS.filter(pickThumb).slice(0, 3);

export function Work({ lang, t }: P) {
  const [lead, ...rest] = FEATURED;
  if (!lead) return null;

  return (
    <section className="pb-24 lg:pb-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <h2 className="reveal t-display max-w-[9ch]">
            {t.portfolio.titleLead}{" "}
            <span className="relative inline-block text-faint">
              {t.portfolio.titleStrong}
              <AccentUnderline className="start-0 -bottom-[0.02em] h-[0.16em] w-full" />
            </span>
          </h2>
          <p className="reveal max-w-sm text-[14.5px] leading-[1.6] text-muted lg:justify-self-end lg:pb-3">
            {t.portfolio.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.45fr_1fr] lg:gap-6">
          <ProjectCard project={lead} lang={lang} t={t} featured />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} lang={lang} t={t} />
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <GhostButton href={href(lang, "/portfolio")}>{t.services.seeMore}</GhostButton>
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({
  project,
  lang,
  t,
  featured = false,
}: {
  project: (typeof PROJECTS)[number];
  lang: Locale;
  t: Dictionary;
  featured?: boolean;
}) {
  const src = pickThumb(project);
  const subtitle = project.subtitle[lang] ?? project.subtitle.en;

  return (
    <Link
      href={href(lang, `/portfolio/${project.slug}`)}
      className={`group reveal relative block overflow-hidden rounded-[20px] bg-dark sm:rounded-[24px] ${
        featured ? "aspect-[4/3] lg:aspect-auto lg:h-full" : "aspect-[16/10] lg:aspect-[16/9]"
      }`}
    >
      <Image
        src={src!}
        alt=""
        fill
        sizes={featured ? "(min-width: 1024px) 800px, 100vw" : "(min-width: 1024px) 520px, 50vw"}
        className="object-cover transition duration-700 group-hover:scale-[1.04]"
      />
      {/* Enough of a wash for white type to clear the photo underneath it. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <div className="min-w-0">
          <p className="eyebrow text-primary">{t.portfolio.services[project.service]}</p>
          <h3
            className={`mt-2 leading-tight font-semibold tracking-tight text-white ${
              featured ? "text-[24px] sm:text-[30px]" : "text-[18px]"
            }`}
          >
            {project.title}
          </h3>
          {featured && <p className="mt-1.5 truncate text-[13.5px] text-white/70">{subtitle}</p>}
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface text-ink transition duration-300 group-hover:bg-primary">
          <ArrowUpRight className="size-4.5" />
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------ Work process */

export function Process({ lang, t }: P) {
  return (
    <section id="process" className="scroll-mt-24 pb-24 lg:pb-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{t.process.eyebrow}</Eyebrow>
          <h2 className="t-display mt-7 max-w-[9ch]">
            {t.process.titleLead} <span className="text-faint">{t.process.titleStrong}</span>
          </h2>
          <p className="mt-6 max-w-sm text-[14.5px] leading-[1.6] text-muted">{t.process.body}</p>
          <AccentButton href={href(lang, "#contact")} className="mt-8">
            {t.process.cta}
          </AccentButton>
        </div>

        <ol className="reveal-stagger border-t border-line">
          {t.process.steps.map((s, i) => (
            <li key={s.title} className="reveal group border-b border-line">
              <div className="flex items-start gap-6 py-8 transition duration-300 group-hover:ps-2 sm:gap-10">
                <span
                  dir="ltr"
                  className="w-10 shrink-0 text-[15px] font-semibold tabular-nums"
                >
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-[20px] leading-snug font-semibold tracking-tight sm:text-[24px]">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 max-w-lg text-[13.5px] leading-relaxed text-muted">
                    {s.desc}
                  </p>
                </div>
                <ArrowRight
                  aria-hidden
                  className="mt-1.5 size-5 shrink-0 text-faint transition duration-300 group-hover:translate-x-1 group-hover:text-primary rtl:rotate-180 rtl:group-hover:-translate-x-1"
                />
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------- Clients */

/** Grey by default so the row stays quiet; colour returns on hover. */
function LogoTile({ file }: { file: string }) {
  return (
    <li className="relative h-20 w-36 shrink-0 rounded-2xl bg-surface transition duration-300 hover:-translate-y-1 sm:h-24 sm:w-44">
      <Image
        src={`/client/${encodeURIComponent(file)}`}
        alt=""
        fill
        sizes="176px"
        className="object-contain p-4 grayscale transition duration-500 group-hover/clients:grayscale-0 sm:p-5"
      />
    </li>
  );
}

/**
 * Four copies of the group: the keyframes shift the track by -50%, so each half
 * has to be identical and wider than the viewport for the loop to be seamless.
 */
function ClientTrack({
  items,
  reverse = false,
  duration,
}: {
  items: typeof CLIENTS;
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div
      className={`flex w-max animate-marquee ${reverse ? "[animation-direction:reverse]" : ""}`}
      style={{ animationDuration: duration }}
    >
      {[0, 1, 2, 3].map((copy) => (
        <ul key={copy} aria-hidden className="flex shrink-0 items-center gap-4 pe-4">
          {items.map((c) => (
            <LogoTile key={c.file} file={c.file} />
          ))}
        </ul>
      ))}
    </div>
  );
}

export function Clients({ t }: { t: Dictionary }) {
  const half = Math.ceil(CLIENTS.length / 2);

  return (
    <section
      aria-label={`${t.clients.titleLead} ${t.clients.titleStrong}`.trim()}
      className="clients group/clients overflow-hidden pb-24 lg:pb-32"
    >
      <Container>
        <Eyebrow className="reveal justify-center">
          {t.clients.titleLead} {t.clients.titleStrong}
        </Eyebrow>
      </Container>

      {/* Two rows at different speeds and directions, so the strip has some depth. */}
      <div className="marquee-fade mt-10 space-y-4 motion-reduce:hidden">
        <ClientTrack items={CLIENTS.slice(0, half)} duration="42s" />
        <ClientTrack items={CLIENTS.slice(half)} reverse duration="56s" />
      </div>

      {/* Nothing moves when reduced motion is asked for, so the logos sit still. */}
      <Container className="mt-10 hidden motion-reduce:block">
        <ul className="flex flex-wrap items-center justify-center gap-4">
          {CLIENTS.map((c) => (
            <LogoTile key={c.file} file={c.file} />
          ))}
        </ul>
      </Container>

      {/* The rows above are decorative; this keeps the names available to a screen reader. */}
      <p className="sr-only">{CLIENTS.map((c) => c.name).join(", ")}</p>
    </section>
  );
}

/* --------------------------------------------------------------------- CTA */

export function Cta({ t }: { t: Dictionary }) {
  return (
    <section id="contact" className="scroll-mt-24 pb-24 lg:pb-32">
      <Container>
        <div className="relative overflow-hidden rounded-[24px] bg-surface px-6 py-16 sm:rounded-[32px] sm:px-10 sm:py-20 lg:px-14">
          {/*
           * Two small plates flanking the headline, the reference's editorial
           * composition. Desktop only: on a phone they would crowd the form.
           */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <div className="absolute top-20 start-6 size-40 -rotate-6 overflow-hidden rounded-[20px] xl:size-48">
              <Image
                src="/hero1.webp"
                alt=""
                fill
                sizes="192px"
                className="object-cover object-[55%_50%]"
              />
            </div>
            <div className="absolute top-36 end-6 size-40 rotate-6 overflow-hidden rounded-[20px] xl:size-48">
              <Image
                src="/thumbnail-website/natasolusi.webp"
                alt=""
                fill
                sizes="192px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <Eyebrow className="reveal justify-center">{t.nav.contact}</Eyebrow>
            <h2 className="reveal t-display mt-7">
              {t.cta.titleLead}{" "}
              <span className="relative inline-block">
                {t.cta.titleStrong}
                <AccentUnderline className="start-0 -bottom-[0.02em] h-[0.16em] w-full" />
              </span>{" "}
              <span className="text-faint">{t.cta.titleTail}</span>
            </h2>
            <p className="reveal mx-auto mt-6 max-w-md text-[14.5px] leading-[1.6] text-muted">
              {t.cta.body}
            </p>
          </div>

          <div className="relative mt-12">
            <ContactForm t={t.form} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ Footer */

export function Footer({ lang, t }: P) {
  const columns = [
    {
      title: t.footer.servicesTitle,
      items: t.services.items.map((s, i) => {
        const slug = SERVICE_SLUGS[i];
        return {
          label: s.title,
          href: slug ? href(lang, `/services/${slug}`) : href(lang, "#services"),
        };
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
    <footer className="overflow-hidden border-t border-line">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:py-20">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <Image
              src="/lavora-logo.webp"
              alt=""
              width={32}
              height={32}
              className="size-8 object-contain"
            />
            <span className="text-[16px] font-semibold tracking-tight">{t.brand}</span>
          </div>

          <p className="mt-5 text-[13.5px] leading-relaxed text-muted">{t.footer.blurb}</p>

          <ul className="mt-6 flex items-center gap-2">
            {SOCIALS.map(({ Icon, label }) => (
              <li key={label}>
                <Link
                  href={href(lang, "#contact")}
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-full border border-line text-ink transition hover:border-ink hover:bg-ink hover:text-white"
                >
                  <Icon className="size-[18px]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:justify-self-end">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow text-muted">{col.title}</h3>
              <ul className="mt-4">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-[40px] items-center text-[14px] text-muted transition hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <div className="flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-muted">{t.footer.rights}</p>
          <div className="flex gap-6">
            <Link
              href={href(lang, "/terms")}
              className="text-[12.5px] text-muted transition hover:text-ink"
            >
              {t.footer.terms}
            </Link>
            <Link
              href={href(lang, "/privacy")}
              className="text-[12.5px] text-muted transition hover:text-ink"
            >
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </Container>

      {/*
       * Oversized wordmark bled off the bottom edge. Decorative only, and the
       * brand name is latin in both locales, so it stays LTR.
       */}
      <div aria-hidden dir="ltr" className="select-none px-5 sm:px-8 lg:px-12">
        <p className="-mb-[0.17em] text-center text-[min(19vw,280px)] leading-[0.8] font-extrabold tracking-[-0.055em] text-line">
          LA VORA
        </p>
      </div>
    </footer>
  );
}
