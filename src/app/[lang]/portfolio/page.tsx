import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Band, Container, CtaPanel, Eyebrow, Pills } from "@/components/ui";
import { Footer, Navbar } from "@/components/sections";
import { PortfolioIndex, type IndexItem } from "@/components/portfolio-index";
import { DEFAULT_LOCALE, getDictionary, isLocale, type Locale } from "@/lib/dictionaries";
import { PROJECTS, pick, portfolioIntros, type ServiceKey } from "@/lib/portfolio";

/** Which categories actually have projects, in the order they first appear. */
const CATEGORIES = PROJECTS.map((p) => p.service).filter((s, i, all) => all.indexOf(s) === i);

/** No "all" view: an unknown or missing ?service= lands on the first category. */
function readService(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw && (CATEGORIES as string[]).includes(raw) ? (raw as ServiceKey) : CATEGORIES[0];
}

function heading(lang: Locale, service: ServiceKey) {
  const t = getDictionary(lang);
  const doc = portfolioIntros[lang][service];
  return (
    doc ?? {
      eyebrow: "",
      title: `${t.portfolio.titleLead} ${t.portfolio.titleStrong}`.trim(),
      intro: [t.portfolio.intro],
      closing: undefined,
    }
  );
}

export async function generateMetadata(props: PageProps<"/[lang]/portfolio">): Promise<Metadata> {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const { service } = await props.searchParams;
  const page = heading(locale, readService(service));
  return { title: page.title, description: page.intro[0] };
}

export default async function Portfolio(props: PageProps<"/[lang]/portfolio">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  const { service } = await props.searchParams;
  const active = readService(service);
  const page = heading(lang, active);

  const shown = PROJECTS.filter((p) => p.service === active);

  const items: IndexItem[] = shown.map((p) => ({
    slug: p.slug,
    href: `/${lang}/portfolio/${p.slug}`,
    service: p.service,
    serviceLabel: t.portfolio.services[p.service],
    title: p.title,
    subtitle: pick(p.subtitle, lang),
    image: p.thumb ?? p.gallery?.[0],
    summary: pick(p.summary, lang),
  }));

  return (
    <>
      <Navbar lang={lang} t={t} />
      <main id="main">
        <section className="pt-12 pb-12 md:pt-24 md:pb-20">
          <Container>
            <div className="grid gap-6 md:gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <span aria-hidden className="block h-1.5 w-20 bg-brand" />
                <h1 className="display mt-6 text-title">{page.title}</h1>
              </div>
              <div className="lg:col-span-5">
                {page.eyebrow && <Eyebrow className="mb-4 text-brand">{page.eyebrow}</Eyebrow>}
                <div className="space-y-4 text-lead text-dim">
                  {page.intro.map((para: string) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 md:mt-12">
              <Pills
                label={t.portfolio.filterLabel}
                items={CATEGORIES.map((key) => ({
                  href: `/${lang}/portfolio?service=${key}`,
                  label: t.portfolio.services[key],
                  current: key === active,
                  count: PROJECTS.filter((p) => p.service === key).length,
                }))}
              />
            </div>
          </Container>
        </section>

        {/* The unit bar: the category and how much of it there is. */}
        <div className="bg-brand text-white">
          <div className="wrap flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-6 md:py-10">
            <h2 data-reveal className="display text-head">
              {t.portfolio.services[active]}
            </h2>
            <p className="text-base font-semibold md:text-lg">
              {shown.length}
              <span className="sr-only"> {t.nav.work}</span>
            </p>
          </div>
        </div>

        <Container className="py-12 md:py-20">
          {items.length > 0 ? (
            <PortfolioIndex items={items} viewLabel={t.portfolio.view} />
          ) : (
            <p className="text-lead text-dim">{t.portfolio.empty}</p>
          )}
        </Container>

        {page.closing && (
          <Band ground="mist">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 data-reveal className="display text-head">
                  {page.closing.heading}
                </h2>
                <p className="mt-6 text-lg/snug font-semibold md:text-xl/snug">{page.closing.lead}</p>
              </div>

              <div className="space-y-5 text-lead text-dim lg:col-span-7">
                {page.closing.paragraphs.map((para: string) => (
                  <p key={para}>{para}</p>
                ))}

                {page.closing.items && (
                  <ul data-reveal="list" className="border-t-2 border-ink">
                    {page.closing.items.map((item: { title: string; desc: string }) => (
                      <li key={item.title} className="border-b border-line py-5">
                        <h3 className="text-base font-extrabold text-ink uppercase md:text-xl">
                          {item.title}
                        </h3>
                        <p className="mt-2">{item.desc}</p>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="text-lg/snug font-semibold text-brand md:text-xl/snug">
                  {page.closing.kicker}
                </p>
                {page.closing.kickerBody && <p>{page.closing.kickerBody}</p>}
              </div>
            </div>
          </Band>
        )}

        <CtaPanel
          heading={t.portfolio.ctaTitle}
          body={t.cta.body}
          cta={t.portfolio.cta}
          href={`/${lang}#contact`}
        />
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
