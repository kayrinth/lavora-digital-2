import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { Footer, Navbar } from "@/components/sections";
import { PortfolioGrid, type GridItem } from "@/components/portfolio-grid";
import { DEFAULT_LOCALE, getDictionary, isLocale, type Locale } from "@/lib/dictionaries";
import { PROJECTS, pick, portfolioIntros, type ServiceKey } from "@/lib/portfolio";

/** Which categories actually have projects, in the order they first appear. */
const CATEGORIES = PROJECTS.map((p) => p.service).filter(
  (s, i, all) => all.indexOf(s) === i,
);

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

export async function generateMetadata(
  props: PageProps<"/[lang]/portfolio">,
): Promise<Metadata> {
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

  const items: GridItem[] = shown.map((p) => ({
    slug: p.slug,
    href: `/${lang}/portfolio/${p.slug}`,
    service: p.service,
    serviceLabel: t.portfolio.services[p.service],
    title: p.title,
    subtitle: pick(p.subtitle, lang),
    logo: p.logo,
    image: p.thumb ?? p.gallery?.[0],
    summary: pick(p.summary, lang),
  }));

  return (
    <div className="bg-background">
      <Navbar lang={lang} t={t} />
      <main>
        <Container className="py-16 lg:py-24">
          {page.eyebrow && (
            <p className="reveal eyebrow text-muted">{page.eyebrow}</p>
          )}
          <h1 className="reveal mt-4 max-w-2xl text-[34px] leading-[1.12] font-light tracking-tight sm:text-[44px]">
            {page.title}
          </h1>
          <div className="mt-8 max-w-2xl space-y-5 text-[14.5px] leading-relaxed text-muted">
            {page.intro.map((para: string) => (
              <p key={para} className="reveal">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-14">
            <PortfolioGrid
              items={items}
              filters={CATEGORIES.map((key) => ({
                key,
                label: t.portfolio.services[key],
              }))}
              active={active}
              basePath={`/${lang}/portfolio`}
              filterLabel={t.portfolio.filterLabel}
              viewLabel={t.portfolio.view}
            />
          </div>
        </Container>

        {page.closing && (
          <section className="border-t border-line bg-surface">
            <Container className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24">
              <div>
                <h2 className="reveal text-[30px] leading-[1.15] font-light tracking-tight sm:text-[38px]">
                  {page.closing.heading}
                </h2>
                <p className="reveal mt-5 text-[17px] leading-relaxed font-medium text-ink">
                  {page.closing.lead}
                </p>
              </div>

              <div className="space-y-5 text-[14.5px] leading-relaxed text-muted">
                {page.closing.paragraphs.map((para: string) => (
                  <p key={para} className="reveal">
                    {para}
                  </p>
                ))}
                {page.closing.items && (
                  <ul className="reveal-stagger grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
                    {page.closing.items.map((item: { title: string; desc: string }) => (
                      <li key={item.title} className="reveal bg-background px-6 py-5">
                        <h3 className="text-[15px] font-semibold text-ink">{item.title}</h3>
                        <p className="mt-2 text-[13px] leading-relaxed">{item.desc}</p>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="reveal border-s border-secondary ps-5 text-[15px] font-medium text-ink">
                  {page.closing.kicker}
                </p>
                {page.closing.kickerBody && (
                  <p className="reveal">{page.closing.kickerBody}</p>
                )}
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer lang={lang} t={t} />
    </div>
  );
}
