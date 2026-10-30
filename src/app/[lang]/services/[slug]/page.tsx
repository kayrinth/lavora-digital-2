import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Container,
  CtaPanel,
  PrimaryButton,
} from "@/components/ui";
import { Footer, Navbar, ProjectCard } from "@/components/sections";
import { ArrowDown, ArrowUpRight } from "@/components/icons";
import { DEFAULT_LOCALE, LOCALES, getDictionary, isLocale } from "@/lib/dictionaries";
import {
  SERVICE_PAGE_SLUGS,
  SERVICE_SLUGS,
  getServiceDoc,
  type ServiceDoc,
} from "@/lib/services";
import { PROJECTS, type ServiceKey } from "@/lib/portfolio";

/** Anchor prefix shared by the masthead index and the rows it jumps to. */
const OFFER_ID = "offering-";

/** Page slug back to the portfolio's category key, so a service can show its own work. */
const SERVICE_KEY: Record<string, ServiceKey> = {
  [SERVICE_SLUGS[0]]: "ads",
  [SERVICE_SLUGS[1]]: "web",
  [SERVICE_SLUGS[2]]: "marketing",
};

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => SERVICE_PAGE_SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata(
  props: PageProps<"/[lang]/services/[slug]">,
): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const doc = getServiceDoc(isLocale(lang) ? lang : DEFAULT_LOCALE, slug);
  if (!doc) return {};
  return { title: `${doc.eyebrow} | ${doc.title}`, description: doc.intro[0] };
}

function ServiceWhatWeDo({ doc }: { doc: ServiceDoc }) {
  return (
    <section className="border-y border-line bg-surface">
      <Container className="py-20 lg:py-28">
        <h2 className="reveal t-display max-w-[14ch]">{doc.whatWeDo.heading}</h2>

        <div className="mt-14 lg:mt-20">
          {doc.whatWeDo.blocks.map((block, i) => (
            <article
              key={block.title}
              id={`${OFFER_ID}${i + 1}`}
              className="reveal grid scroll-mt-28 gap-8 border-t border-line py-14 lg:grid-cols-[0.42fr_0.58fr] lg:gap-14 lg:py-20"
            >
              <div className="lg:sticky lg:top-28 lg:self-start">
                {doc.whatWeDo.numbered && (
                  <span
                    dir="ltr"
                    className="block text-[clamp(26px,2.8vw,38px)] leading-none font-bold text-faint tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                <h3 className="t-title mt-5 max-w-[15ch] text-balance">{block.title}</h3>
                {block.tagline && (
                  <p className="mt-5 max-w-sm text-[17px] leading-[1.45] text-muted">
                    {block.tagline}
                  </p>
                )}
              </div>

              <div>
                <div className="max-w-[70ch] space-y-5 text-[16px] leading-[1.75] text-muted">
                  {block.paragraphs.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>

                {block.idealFor && (
                  <div className="mt-10 border-t border-line pt-6">
                    <p className="eyebrow text-muted">{doc.idealForLabel}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {block.idealFor.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-secondary-soft px-4 py-2 text-[13px] text-primary"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceProcess({ doc }: { doc: ServiceDoc }) {
  return (
    <Container className="pb-20 lg:pb-28">
      <div className="rounded-[28px] border border-line/80 bg-surface px-6 py-12 shadow-xs sm:rounded-[36px] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <span className="eyebrow inline-flex items-center gap-2 text-secondary">
          <span className="size-1.5 rounded-full bg-secondary" />
          {doc.process.heading}
        </span>
        <h2 className="reveal t-display text-ink mt-4 max-w-[14ch]">{doc.process.heading}</h2>

        <ol className="reveal-stagger mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {doc.process.steps.map((step, i) => (
            <li
              key={step.title}
              className="group reveal relative rounded-2xl border border-line/80 bg-background/50 px-7 pt-9 pb-10 transition duration-300 hover:border-secondary/50 hover:bg-surface hover:shadow-md sm:px-8"
            >
              <span
                aria-hidden
                className="absolute top-0 start-0 h-0.5 w-12 bg-secondary"
              />
              <span
                dir="ltr"
                className="block text-[clamp(44px,5vw,64px)] leading-[0.82] font-bold tracking-[-0.05em] text-secondary tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-7 text-[20px] leading-snug font-semibold text-ink tracking-tight text-balance group-hover:text-secondary transition-colors">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-muted">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  );
}

function ServiceMasthead({
  doc,
  lang,
  t,
  siblings,
}: {
  doc: ServiceDoc;
  lang: string;
  t: ReturnType<typeof getDictionary>;
  siblings: { href: string; label: string; current: boolean }[];
}) {
  return (
    <header className="pt-3 pb-7 sm:pt-4 lg:pb-10">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-line/80 bg-surface px-6 py-12 shadow-[0_12px_44px_rgba(3,1,100,0.04)] sm:rounded-[36px] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          {/* Luminous atmospheric lighting layers — bright, airy, and pristine */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-36 -start-20 size-[480px] rounded-full bg-secondary-soft/70 blur-[100px] opacity-80"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/4 -end-24 size-[440px] rounded-full bg-primary-soft/60 blur-[110px] opacity-75"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 start-1/3 size-96 rounded-full bg-secondary-soft/50 blur-[90px] opacity-60"
          />

          {/* Header Navigation Switcher & Badge */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <nav aria-label={t.footer.servicesTitle}>
              <ul className="flex flex-wrap gap-2">
                {siblings.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={`inline-flex min-h-[44px] items-center gap-2.5 rounded-full px-5 text-[13px] font-medium transition duration-300 ${
                        item.current
                          ? "bg-primary text-white shadow-xs"
                          : "border border-line bg-surface text-muted hover:border-ink/40 hover:text-ink hover:bg-background"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <span className="eyebrow hidden items-center gap-2 rounded-full border border-secondary/25 bg-secondary-soft/80 px-3.5 py-1.5 text-secondary sm:inline-flex">
              <span className="size-1.5 rounded-full bg-secondary" />
              {doc.eyebrow}
            </span>
          </div>

          {/* Two-Column Grid: Copy & Actions on Left, 3D Hero Artwork on Right */}
          <div className="relative z-10 mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 xl:gap-20">
            <div>
              <h1 className="t-display text-ink max-w-[14ch] leading-[1.08]">
                {doc.title}
              </h1>

              <div className="mt-8 max-w-xl space-y-4 text-[15.5px] leading-[1.7] text-muted">
                {doc.intro.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <PrimaryButton href={`/${lang}#contact`} withArrow>
                  {doc.closing.cta}
                </PrimaryButton>
                <a
                  href={`#${OFFER_ID}1`}
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3.5 text-[13px] font-medium text-ink shadow-2xs transition duration-300 hover:border-secondary hover:text-secondary hover:bg-surface"
                >
                  <span>{doc.whatWeDo.heading}</span>
                  <ArrowDown className="size-3.5 text-secondary transition duration-300 group-hover:translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Right Column: 3D Artwork Showcase Stage */}
            <div className="relative mx-auto w-full max-w-[460px] lg:ms-auto">
              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line/80 bg-gradient-to-br from-white via-primary-soft/30 to-secondary-soft/40 p-6 shadow-md transition duration-500 hover:shadow-xl sm:aspect-[16/11]">
                {/* Soft ambient light glow */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-radial from-secondary/15 via-primary/5 to-transparent opacity-70 transition duration-700 group-hover:opacity-100"
                />

                {/* Service 3D transparent artwork */}
                <Image
                  src={doc.image}
                  alt={doc.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, (min-width: 640px) 400px, 100vw"
                  className="object-contain p-4 drop-shadow-[0_16px_28px_rgba(3,1,100,0.12)] transition duration-700 ease-out group-hover:scale-105"
                />

                {/* Floating corner indicator pill */}
                <div className="absolute top-4 start-4 z-10 flex items-center gap-2 rounded-full border border-line/80 bg-surface/90 px-3.5 py-1.5 shadow-xs backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-secondary" />
                  <span className="text-[12px] font-semibold text-ink">
                    {doc.eyebrow}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Offering Jump Navigation Cards */}
          <nav aria-label={doc.whatWeDo.heading} className="relative z-10 mt-14 border-t border-line/80 pt-8 lg:mt-18">
            <ul className="grid gap-4 sm:grid-cols-2 lg:gap-6">
              {doc.whatWeDo.blocks.map((block, i) => (
                <li key={block.title}>
                  <a
                    href={`#${OFFER_ID}${i + 1}`}
                    className="group relative flex items-center justify-between gap-6 rounded-2xl border border-line bg-background/50 p-5 transition duration-300 hover:border-secondary/60 hover:bg-surface hover:shadow-md sm:p-6"
                  >
                    <span
                      aria-hidden
                      className="absolute top-0 start-0 h-0.5 w-0 bg-secondary transition-[width] duration-500 ease-out group-hover:w-full"
                    />
                    <div className="min-w-0">
                      <p className="eyebrow text-secondary text-[11px] font-semibold">
                        {String(i + 1).padStart(2, "0")} • {doc.whatWeDo.heading}
                      </p>
                      <h2 className="mt-1.5 text-[18px] font-semibold text-ink tracking-tight transition-colors duration-300 group-hover:text-secondary sm:text-[20px]">
                        {block.title}
                      </h2>
                      {block.tagline && (
                        <p className="mt-1 truncate text-[13.5px] text-muted">
                          {block.tagline}
                        </p>
                      )}
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink shadow-2xs transition duration-300 group-hover:border-secondary group-hover:bg-secondary group-hover:text-white">
                      <ArrowDown className="size-4 transition duration-300 group-hover:translate-y-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}

export default async function ServicePage(props: PageProps<"/[lang]/services/[slug]">) {
  const { lang, slug } = await props.params;
  if (!isLocale(lang)) notFound();
  const doc = getServiceDoc(lang, slug);
  if (!doc) notFound();

  const t = getDictionary(lang);

  const key = SERVICE_KEY[slug];
  const delivered = PROJECTS.filter((p) => p.service === key);
  const work = delivered.filter((p) => p.thumb ?? p.gallery?.[0]).slice(0, 3);

  // The three services, so every service page is one tap from its siblings.
  const siblings = SERVICE_SLUGS.map((s, i) => ({
    href: `/${lang}/services/${s}`,
    label: t.services.items[i].title,
    current: s === slug,
  }));

  return (
    <div className="bg-background">
      <Navbar lang={lang} t={t} />
      <main>
        <ServiceMasthead doc={doc} lang={lang} t={t} siblings={siblings} />

        <ServiceWhatWeDo doc={doc} />

        <ServiceProcess doc={doc} />

        {doc.why && (
          <Container className="pb-20 lg:pb-28">
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="reveal t-display max-w-[11ch]">{doc.why.heading}</h2>

                {/*
                 * The page's one numeric moment, under the heading that makes
                 * the claim. It replaces a stock illustration of a dashboard:
                 * the work itself is the better argument, and the numbers are
                 * the site's own.
                 */}
                <dl className="reveal mt-12 grid gap-8 sm:grid-cols-2 lg:gap-10">
                  {/* Column-reversed, so the figure reads first while the term
                      still precedes its value in the markup and a screen reader
                      hears the label once rather than twice. */}
                  {t.hero.stats.map((stat) => (
                    <div
                      key={stat.l}
                      className="relative flex flex-col-reverse border-t border-line pt-6"
                    >
                      <span
                        aria-hidden
                        className="absolute -top-px start-0 h-px w-12 bg-secondary"
                      />
                      <dt className="mt-4 text-[13.5px] leading-snug text-muted">{stat.l}</dt>
                      <dd
                        dir="ltr"
                        className="text-[clamp(40px,4.4vw,60px)] leading-[0.85] font-bold tracking-[-0.05em] tabular-nums"
                      >
                        {stat.n}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <ul className="reveal-stagger">
                {doc.why.items.map((item) => (
                  <li
                    key={item.title}
                    className="reveal relative border-t border-line py-7 last:border-b"
                  >
                    <span aria-hidden className="absolute -top-px start-0 h-px w-10 bg-secondary" />
                    <h3 className="text-[19px] leading-snug font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 max-w-[62ch] text-[14px] leading-[1.7] text-muted">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        )}

        {doc.outro && (
          <Container className="pb-20 lg:pb-28">
            <div className="rounded-[24px] bg-surface px-6 py-14 sm:rounded-[32px] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
              <h2 className="reveal t-display max-w-[13ch]">{doc.outro.heading}</h2>

              {/* The first paragraph carries the argument, so it is set as a
                  standfirst and the rest run under it as columns. Three equal
                  grey columns read as a footnote, whatever they say. */}
              <p className="reveal mt-10 max-w-[32ch] text-[21px] leading-[1.4] font-medium text-balance sm:text-[26px]">
                {doc.outro.paragraphs[0]}
              </p>
              {doc.outro.paragraphs.length > 1 && (
                <div className="reveal-stagger mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:gap-14">
                  {doc.outro.paragraphs.slice(1).map((para) => (
                    <p key={para} className="reveal text-[14.5px] leading-[1.7] text-muted">
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </Container>
        )}

        {/* The service's own case studies, so the claims above have evidence under them. */}
        {work.length > 0 && (
          <Container className="pb-20 lg:pb-28">
            {/* The claims above are argued; this is the evidence, so it gets a
                heading at the weight of one rather than a label. The count is
                what the visitor is actually being told. */}
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="reveal t-title flex items-baseline gap-4">
                {t.portfolio.related}
                {/* A count, not a section number: unpadded, and set at a size
                    that clears AA rather than scaling with the heading. */}
                <span dir="ltr" className="text-[15px] font-semibold text-muted tabular-nums">
                  {delivered.length}
                </span>
              </h2>
              <Link
                href={`/${lang}/portfolio?service=${key}`}
                className="group/more inline-flex items-center gap-3 text-[13px] font-medium transition hover:text-secondary"
              >
                {t.services.seeMore}
                <span className="grid size-11 place-items-center rounded-full border border-line text-primary transition duration-300 group-hover/more:border-secondary group-hover/more:bg-secondary group-hover/more:text-white">
                  <ArrowUpRight aria-hidden className="size-4.5" />
                </span>
              </Link>
            </div>
            <ul className="reveal-stagger mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {work.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} lang={lang} t={t} />
                </li>
              ))}
            </ul>
          </Container>
        )}

        <Container className="pb-24 lg:pb-32">
          <CtaPanel
            heading={doc.closing.heading}
            body={doc.closing.body}
            cta={doc.closing.cta}
            href={`/${lang}#contact`}
          />
        </Container>
      </main>
      <Footer lang={lang} t={t} />
    </div>
  );
}
