import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AccentButton, Container, Eyebrow } from "@/components/ui";
import { Footer, Navbar, ProjectCard } from "@/components/sections";
import { DEFAULT_LOCALE, LOCALES, getDictionary, isLocale } from "@/lib/dictionaries";
import { SERVICE_PAGE_SLUGS, SERVICE_SLUGS, getServiceDoc } from "@/lib/services";
import { PROJECTS, type ServiceKey } from "@/lib/portfolio";

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
        {/* Masthead: the switcher doubles as the label, so the title needs no kicker. */}
        <header className="on-navy bg-primary text-white">
          <Container className="pt-10 pb-16 lg:pt-14 lg:pb-24">
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

            <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
              <div>
                <h1 className="t-display max-w-[14ch]">{doc.title}</h1>
                <div className="mt-8 max-w-xl space-y-5 text-[15px] leading-[1.65] text-onnavy">
                  {doc.intro.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
                <AccentButton href={`/${lang}#contact`} onNavy className="mt-9">
                  {doc.closing.cta}
                </AccentButton>
              </div>

              {/* The illustration is transparent, so it needs a plate to sit on. */}
              <div className="relative aspect-square rounded-[24px] bg-surface sm:rounded-[32px]">
                <Image
                  src={doc.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-contain p-8"
                />
              </div>
            </div>
          </Container>
        </header>

        {/* What we do: full-width editorial rows, one per offering. */}
        <Container className="py-20 lg:py-28">
          <h2 className="reveal t-display max-w-[14ch]">{doc.whatWeDo.heading}</h2>

          <div className="mt-14 lg:mt-20">
            {doc.whatWeDo.blocks.map((block, i) => (
              <article
                key={block.title}
                className="reveal grid gap-8 border-t border-line py-12 last:border-b lg:grid-cols-[0.38fr_0.62fr] lg:gap-16 lg:py-16"
              >
                <div>
                  {doc.whatWeDo.numbered && (
                    <span
                      dir="ltr"
                      className="block text-[13px] font-semibold text-secondary tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                  <h3 className="mt-4 text-[26px] leading-[1.1] font-semibold tracking-tight text-balance sm:text-[32px]">
                    {block.title}
                  </h3>
                  {block.tagline && (
                    <p className="mt-4 max-w-sm text-[16px] leading-[1.45] text-muted">
                      {block.tagline}
                    </p>
                  )}
                </div>

                <div>
                  <div className="max-w-[64ch] space-y-4 text-[14.5px] leading-[1.7] text-muted">
                    {block.paragraphs.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>

                  {block.idealFor && (
                    <div className="mt-8">
                      <p className="eyebrow text-muted">{doc.idealForLabel}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {block.idealFor.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full bg-secondary-soft px-3.5 py-1.5 text-[12.5px] text-primary"
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

        {/* Process: the order is the information, so the steps carry their number. */}
        <Container className="pb-20 lg:pb-28">
          <div className="on-navy rounded-[24px] bg-primary px-6 py-14 text-white sm:rounded-[32px] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <h2 className="reveal t-display max-w-[13ch]">{doc.process.heading}</h2>

            <ol className="reveal-stagger mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {doc.process.steps.map((step, i) => (
                <li key={step.title} className="reveal bg-primary px-7 py-8 sm:px-8 sm:py-9">
                  <span
                    dir="ltr"
                    className="eyebrow block text-onnavy-accent tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-[19px] leading-snug font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-[1.65] text-onnavy">{step.desc}</p>
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
