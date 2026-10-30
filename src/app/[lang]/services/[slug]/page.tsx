import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AccentButton, ArrowDisc, Band, Container, CtaPanel, IconTile } from "@/components/ui";
import { Footer, Navbar, ProjectCard } from "@/components/sections";
import {
  ArrowRight,
  Cursor,
  Document,
  Gauge,
  Megaphone,
  Sparkle,
  Target,
  TrendUp,
} from "@/components/icons";
import { DEFAULT_LOCALE, LOCALES, getDictionary, isLocale } from "@/lib/dictionaries";
import { SERVICE_PAGE_SLUGS, SERVICE_SLUGS, getServiceDoc, type ServiceDoc } from "@/lib/services";
import { PROJECTS, type ServiceKey } from "@/lib/portfolio";

/** Anchor prefix shared by the head's index and the rows it jumps to. */
const OFFER_ID = "offering-";

/** Page slug back to the portfolio's category key, so a service can show its own work. */
const SERVICE_KEY: Record<string, ServiceKey> = {
  [SERVICE_SLUGS[0]]: "ads",
  [SERVICE_SLUGS[1]]: "web",
  [SERVICE_SLUGS[2]]: "marketing",
};

/** One mark per service page, and one per process step. */
const SERVICE_ICONS = [Megaphone, Cursor, TrendUp];
const STEP_ICONS = [Sparkle, Target, Megaphone, Gauge, TrendUp, Document];

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

/** What the service covers: one row per offering, under a 2px rule. */
function WhatWeDo({ doc }: { doc: ServiceDoc }) {
  return (
    <Band ground="mist">
      <h2 data-reveal className="display text-head">
        {doc.whatWeDo.heading}
      </h2>

      <ul data-reveal="list" className="mt-10 border-t-2 border-ink md:mt-16">
        {doc.whatWeDo.blocks.map((block, i) => (
          <li
            key={block.title}
            id={`${OFFER_ID}${i + 1}`}
            className="grid scroll-mt-20 grid-cols-[auto_1fr] gap-x-5 gap-y-4 border-b border-line py-8 md:grid-cols-[auto_20rem_1fr] md:gap-x-8 md:py-10"
          >
            <IconTile icon={STEP_ICONS[i % STEP_ICONS.length]} size="sm" className="row-span-2 md:row-span-1" />
            <div>
              <h3 className="text-base font-extrabold uppercase md:text-xl">{block.title}</h3>
              {block.tagline && <p className="mt-2 text-dim">{block.tagline}</p>}
            </div>
            <div className="col-start-2 md:col-start-3">
              <div className="space-y-4 text-lead text-dim">
                {block.paragraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              {block.idealFor && (
                <div className="mt-6 border-t border-line pt-5">
                  <p className="text-sm font-bold tracking-[0.06em] text-brand uppercase">
                    {doc.idealForLabel}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {block.idealFor.map((tag) => (
                      <li key={tag} className="border border-line bg-surface px-4 py-2 text-sm">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Band>
  );
}

/** How a project runs, in two columns read top to bottom. */
function Process({ doc }: { doc: ServiceDoc }) {
  const rows = Math.ceil(doc.process.steps.length / 2);
  return (
    <Band>
      <h2 data-reveal className="display text-center text-head">
        {doc.process.heading}
      </h2>
      <ol
        data-reveal="list"
        className="mx-auto mt-10 grid max-w-6xl gap-x-16 gap-y-8 md:mt-20 md:grid-flow-col md:grid-cols-2 md:gap-y-10"
        style={{ gridTemplateRows: `repeat(${rows}, auto)` }}
      >
        {doc.process.steps.map((step, i) => {
          const Icon = STEP_ICONS[i % STEP_ICONS.length];
          return (
            <li key={step.title} className="flex gap-4 md:gap-7">
              <span className="grid size-16 shrink-0 place-items-center bg-blue text-white md:size-28">
                <Icon aria-hidden className="size-7 md:size-11" strokeWidth={1.25} />
              </span>
              <div className="md:pt-1">
                <h3 className="text-base font-extrabold text-brand uppercase md:text-xl">{step.title}</h3>
                <p className="mt-2 text-ink/80">{step.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Band>
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
    slug: s,
    href: `/${lang}/services/${s}`,
    label: t.services.items[i].title,
    icon: SERVICE_ICONS[i],
    current: s === slug,
  }));

  return (
    <>
      <Navbar lang={lang} t={t} />
      <main id="main">
        <section className="pt-12 pb-16 md:pt-24 md:pb-28">
          <Container>
            {/* Top-aligned: with the bottoms matched, the three service tiles sank to the foot of a
                column twice their height and left the space beside the title empty. */}
            <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <span aria-hidden className="block h-1.5 w-20 bg-brand" />
                <h1 className="display mt-6 text-title">{doc.title}</h1>
                <div className="mt-6 max-w-xl space-y-4 text-lead text-dim md:mt-8">
                  {doc.intro.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
                  <AccentButton href={`/${lang}#contact`}>{doc.closing.cta}</AccentButton>
                  <a href={`#${OFFER_ID}1`} className="btn btn-outline">
                    {doc.whatWeDo.heading}
                  </a>
                </div>
              </div>

              <ul className="grid gap-3 lg:col-span-5">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={s.href}
                      aria-current={s.current ? "page" : undefined}
                      className="group flex items-center gap-5 rounded-lg border border-line p-4 transition-colors hover:border-brand aria-[current=page]:border-brand aria-[current=page]:bg-brand/5"
                    >
                      <IconTile icon={s.icon} />
                      <span className="flex-1 text-base font-extrabold uppercase md:text-lg">
                        {s.label}
                      </span>
                      <ArrowRight className="size-5 text-brand transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 7:5 at a capped width: the three artworks run 1.34 to 1.50, so a full-width 16:9 plate
                was more mist than picture. */}
            <div data-reveal="frame" className="mx-auto mt-12 max-w-3xl overflow-hidden bg-mist md:mt-20">
              <Image
                src={doc.image}
                alt={doc.title}
                width={1400}
                height={1000}
                priority
                className="aspect-[7/5] w-full object-contain p-4 md:p-8"
              />
            </div>
          </Container>
        </section>

        <WhatWeDo doc={doc} />

        <Process doc={doc} />

        {doc.why && (
          <Band ground="mist">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 data-reveal className="display text-head">
                  {doc.why.heading}
                </h2>
                <dl className="mt-10 grid gap-8 border-t-2 border-ink pt-8 sm:grid-cols-2">
                  {t.hero.stats.map((stat) => (
                    <div key={stat.l} className="flex flex-col-reverse">
                      <dt className="mt-3 text-dim">{stat.l}</dt>
                      <dd dir="ltr" className="display text-title text-brand">
                        {stat.n}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <ul data-reveal="list" className="border-t-2 border-ink lg:col-span-7">
                {doc.why.items.map((item) => (
                  <li key={item.title} className="border-b border-line py-5">
                    <h3 className="text-base/snug font-bold md:text-lg/snug">{item.title}</h3>
                    <p className="mt-2 text-dim">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Band>
        )}

        {doc.outro && (
          <Band ground="ink">
            <h2 data-reveal className="display text-head">
              {doc.outro.heading}
            </h2>
            <p className="mt-8 max-w-3xl text-lg/snug font-semibold md:mt-10 md:text-xl/snug">
              {doc.outro.paragraphs[0]}
            </p>
            {doc.outro.paragraphs.length > 1 && (
              <div className="mt-10 grid gap-6 border-t border-white/15 pt-8 text-lead text-white/85 md:grid-cols-2 md:gap-12">
                {doc.outro.paragraphs.slice(1).map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            )}
          </Band>
        )}

        {/* The service's own case studies, so the claims above have evidence under them. */}
        {work.length > 0 && (
          <Band>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <h2 data-reveal className="display text-head">
                {t.portfolio.related}
                <span dir="ltr" className="ms-4 text-brand">
                  {delivered.length}
                </span>
              </h2>
              <Link
                href={`/${lang}/portfolio?service=${key}`}
                className="group inline-flex items-center gap-4 text-sm font-bold tracking-[0.06em] uppercase"
              >
                {t.services.seeMore}
                <ArrowDisc />
              </Link>
            </div>
            <ul
              data-reveal="list"
              className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-16 md:gap-y-12 lg:grid-cols-3"
            >
              {work.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} lang={lang} t={t} />
                </li>
              ))}
            </ul>
          </Band>
        )}

        <CtaPanel
          heading={doc.closing.heading}
          body={doc.closing.body}
          cta={doc.closing.cta}
          href={`/${lang}#contact`}
        />
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
