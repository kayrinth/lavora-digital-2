import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AccentButton, Container, Eyebrow } from "@/components/ui";
import { Footer, Navbar, ProjectCard } from "@/components/sections";
import { ArrowDown } from "@/components/icons";
import { DEFAULT_LOCALE, LOCALES, getDictionary, isLocale } from "@/lib/dictionaries";
import { SERVICE_PAGE_SLUGS, SERVICE_SLUGS, getServiceDoc } from "@/lib/services";
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

export default async function ServicePage(
  props: PageProps<"/[lang]/services/[slug]">,
) {
  const { lang, slug } = await props.params;
  if (!isLocale(lang)) notFound();
  const doc = getServiceDoc(lang, slug);
  if (!doc) notFound();

  const t = getDictionary(lang);

  // The three services, so every service page is one tap from its siblings.
  const siblings = SERVICE_SLUGS.map((s, i) => ({
    slug: s,
    label: t.services.items[i].title,
  }));

  const key = SERVICE_KEY[slug];
  const work = PROJECTS.filter((p) => p.service === key && (p.thumb ?? p.gallery?.[0])).slice(0, 3);

  return (
    <div className="bg-background">
      <Navbar lang={lang} t={t} />
      <main>
        {/*
         * Masthead: the switcher doubles as the label, so the title needs no
         * kicker. A panel inset in the page rather than a band bled to the
         * edges, because the navbar is a pill floating on the page ground: run
         * the navy to the top and it opens on a seam under the bar, and the
         * bar's own frosted white turns to mud over it. Inset, the grey above
         * is plainly the page margin — and it is what the home page does with
         * its own opening panel.
         */}
        <header className="pt-3 pb-7 sm:pt-4 lg:pb-10">
          <Container>
            <div className="on-navy rounded-[24px] bg-primary px-6 py-14 text-white sm:rounded-[32px] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
              <nav aria-label={t.footer.servicesTitle}>
                <ul className="flex flex-wrap gap-2">
                  {siblings.map((s) => {
                    const on = s.slug === slug;
                    return (
                      <li key={s.slug}>
                        <Link
                          href={`/${lang}/services/${s.slug}`}
                          aria-current={on ? "page" : undefined}
                          className={`inline-flex rounded-full px-4 py-2.5 text-[12.5px] transition ${
                            on
                              ? "bg-surface font-medium text-primary"
                              : "border border-white/25 text-onnavy hover:border-white hover:text-white"
                          }`}
                        >
                          {s.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <h1 className="t-display mt-12 max-w-[16ch] lg:mt-16">{doc.title}</h1>

              {/* Set in columns, so the intro holds the masthead's full width
                  instead of leaving the half beside it empty. */}
              <div className="mt-12 text-[15.5px] leading-[1.7] text-onnavy lg:columns-2 lg:gap-14">
                {doc.intro.map((para) => (
                  <p key={para} className="mb-5 break-inside-avoid last:mb-0">
                    {para}
                  </p>
                ))}
              </div>

              <AccentButton href={`/${lang}#contact`} onNavy className="mt-10">
                {doc.closing.cta}
              </AccentButton>

              {/*
               * What the service actually contains, as the base of the masthead:
               * the page is long, and this is both its summary and the way down
               * to the row that answers the visitor's question. Flexed rather
               * than a fixed grid, so two offerings fill the width as evenly as
               * four do.
               */}
              <nav aria-label={doc.whatWeDo.heading} className="mt-14 lg:mt-20">
                <ul className="flex flex-col sm:flex-row sm:gap-8 lg:gap-14">
                  {doc.whatWeDo.blocks.map((block, i) => (
                    <li key={block.title} className="sm:flex-1">
                      <a
                        href={`#${OFFER_ID}${i + 1}`}
                        className="group relative flex items-center justify-between gap-5 border-t border-white/20 py-5 text-white last:border-b sm:last:border-b-0"
                      >
                        {/* The rule draws itself in, as it does on the work index. */}
                        <span
                          aria-hidden
                          className="absolute -top-px start-0 h-px w-0 bg-onnavy-accent transition-all duration-700 ease-out group-hover:w-full"
                        />
                        <span className="text-[17px] leading-snug font-medium text-balance">
                          {block.title}
                        </span>
                        <ArrowDown
                          aria-hidden
                          className="size-4 shrink-0 text-onnavy transition duration-300 group-hover:translate-y-0.5 group-hover:text-onnavy-accent"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Container>
        </header>

        {/*
         * What we do: the page's substance, so it gets its own ground. A white
         * band against the grey page is the change of pace the scroll needs,
         * and the rows inside it stay editorial rather than becoming cards.
         */}
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
                  {/* Held in place while its own copy scrolls past it. */}
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    {doc.whatWeDo.numbered && (
                      <span
                        dir="ltr"
                        className="block text-[13px] font-semibold text-secondary tabular-nums"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}
                    <h3 className="t-title mt-4 max-w-[15ch] text-balance">{block.title}</h3>
                    {block.tagline && (
                      <p className="mt-5 max-w-sm text-[17px] leading-[1.45] text-muted">
                        {block.tagline}
                      </p>
                    )}
                  </div>

                  <div>
                    {/* Set to the column, so the row has no dead third to its end. */}
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

        {/* Process: the order is the information, so the steps carry their number. */}
        <Container className="pb-20 lg:pb-28">
          <div className="on-navy rounded-[24px] bg-primary px-6 py-14 text-white sm:rounded-[32px] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <h2 className="reveal t-display max-w-[13ch]">{doc.process.heading}</h2>

            {/* The step number is the one thing here the reader navigates by, so
                it is set at display scale rather than tucked above the title. */}
            <ol className="reveal-stagger mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {doc.process.steps.map((step, i) => (
                <li key={step.title} className="reveal bg-primary px-7 py-9 sm:px-8 sm:py-10">
                  <span
                    dir="ltr"
                    className="block text-[40px] leading-none font-bold tracking-[-0.04em] text-onnavy-accent tabular-nums lg:text-[46px]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-7 text-[20px] leading-snug font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3.5 text-[14px] leading-[1.7] text-onnavy">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>

        {doc.why && (
          <Container className="pb-20 lg:pb-28">
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="reveal t-display max-w-[11ch]">{doc.why.heading}</h2>
                <div className="reveal relative mt-10 hidden aspect-[4/3] rounded-[24px] bg-surface lg:block">
                  <Image
                    src="/report.webp"
                    alt={t.banner.imageAlt}
                    fill
                    sizes="460px"
                    className="object-contain p-6"
                  />
                </div>
              </div>

              <ul className="reveal-stagger">
                {doc.why.items.map((item) => (
                  <li key={item.title} className="reveal relative border-t border-line py-7 last:border-b">
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
              <div className="reveal-stagger mt-12 grid gap-8 lg:grid-cols-3 lg:gap-10">
                {doc.outro.paragraphs.map((para) => (
                  <p
                    key={para}
                    className="reveal border-t border-line pt-6 text-[14.5px] leading-[1.7] text-muted"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </Container>
        )}

        {/* The service's own case studies, so the claims above have evidence under them. */}
        {work.length > 0 && (
          <Container className="pb-20 lg:pb-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Eyebrow className="reveal">{t.portfolio.related}</Eyebrow>
              <Link
                href={`/${lang}/portfolio?service=${key}`}
                className="text-[13px] font-medium text-secondary underline transition hover:text-primary"
              >
                {t.services.seeMore}
              </Link>
            </div>
            <ul className="reveal-stagger mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {work.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} lang={lang} t={t} />
                </li>
              ))}
            </ul>
          </Container>
        )}

        <Container className="pb-24 lg:pb-32">
          <div className="rounded-[24px] bg-surface px-6 py-16 text-center sm:rounded-[32px] sm:px-10 lg:py-20">
            <h2 className="reveal t-display mx-auto max-w-[16ch]">{doc.closing.heading}</h2>
            <p className="reveal mx-auto mt-6 max-w-xl text-[14.5px] leading-[1.6] text-muted">
              {doc.closing.body}
            </p>
            <div className="mt-9 flex justify-center">
              <AccentButton href={`/${lang}#contact`}>{doc.closing.cta}</AccentButton>
            </div>
          </div>
        </Container>
      </main>
      <Footer lang={lang} t={t} />
    </div>
  );
}
