import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AccentButton, Container, Eyebrow } from "@/components/ui";
import { Footer, Navbar, ProjectCard } from "@/components/sections";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { DEFAULT_LOCALE, LOCALES, getDictionary, isLocale } from "@/lib/dictionaries";
import { PROJECTS, getProject, pick } from "@/lib/portfolio";
import { SERVICE_SLUGS } from "@/lib/services";

/** Homepage service order, so a case study can link back to the service it belongs to. */
const SERVICE_PAGE: Record<string, string> = {
  ads: SERVICE_SLUGS[0],
  web: SERVICE_SLUGS[1],
  marketing: SERVICE_SLUGS[2],
};

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => PROJECTS.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata(
  props: PageProps<"/[lang]/portfolio/[slug]">,
): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | ${getDictionary(locale).brand}`,
    description: pick(project.summary, locale),
  };
}

export default async function ProjectPage(
  props: PageProps<"/[lang]/portfolio/[slug]">,
) {
  const { lang, slug } = await props.params;
  if (!isLocale(lang)) notFound();
  const project = getProject(slug);
  if (!project) notFound();

  const t = getDictionary(lang);
  const [lead, ...rest] = pick(project.body, lang);
  const meta = pick(project.meta, lang);
  const serviceLabel = t.portfolio.services[project.service];

  // Wraps, so the last case study still offers somewhere to go next.
  const index = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  const related = PROJECTS.filter(
    (p) =>
      p.service === project.service &&
      p.slug !== project.slug &&
      p.slug !== next.slug &&
      (p.thumb ?? p.gallery?.[0]),
  ).slice(0, 3);

  const galleryRatio =
    project.ratio ?? (project.service === "web" ? "16 / 9" : "4 / 5");

  return (
    <div className="bg-background">
      <Navbar lang={lang} t={t} />
      <main>
        {/* Masthead. The case study opens on the brand ground, not on a bare page. */}
        <header className="on-navy bg-primary text-white">
          <Container className="pt-10 pb-14 lg:pt-14 lg:pb-20">
            <Link
              href={`/${lang}/portfolio`}
              className="inline-flex min-h-[44px] items-center gap-2 text-[13px] text-onnavy transition hover:text-white"
            >
              <ArrowRight className="size-4 rotate-180 rtl:rotate-0" />
              {t.portfolio.back}
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
              <div>
                <Link
                  href={`/${lang}/services/${SERVICE_PAGE[project.service]}`}
                  className="eyebrow inline-flex items-center gap-2 text-onnavy-accent transition hover:text-white"
                >
                  <span aria-hidden className="size-1.5 rounded-full bg-onnavy-accent" />
                  {serviceLabel}
                </Link>
                <h1 className="t-display mt-5 max-w-[14ch]">{project.title}</h1>
                <p className="mt-6 max-w-lg text-[16px] leading-[1.55] text-onnavy">
                  {pick(project.subtitle, lang)}
                </p>
              </div>

              {project.logo && (
                <span className="relative block h-24 w-44 shrink-0 rounded-2xl bg-surface lg:h-28 lg:w-52">
                  <Image
                    src={project.logo}
                    alt=""
                    fill
                    sizes="208px"
                    priority
                    className="object-contain p-5"
                  />
                </span>
              )}
            </div>

            {/* Spec row: the facts as a masthead strip rather than a sidebar list. */}
            <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
              {meta.map((row) => (
                <div key={row.label} className="bg-primary px-6 py-6">
                  <dt className="eyebrow text-onnavy">{row.label}</dt>
                  <dd className="mt-2.5 text-[15px] leading-snug font-medium">{row.value}</dd>
                </div>
              ))}
              <div className="bg-primary px-6 py-6">
                <dt className="eyebrow text-onnavy">{t.portfolio.metaService}</dt>
                <dd className="mt-2.5 text-[15px] leading-snug font-medium">{serviceLabel}</dd>
              </div>
            </dl>
          </Container>
        </header>

        {/* The write-up. The lead paragraph is set as a standfirst, the rest as body. */}
        <Container className="py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-20">
            <p className="reveal text-[13px] leading-relaxed text-muted lg:sticky lg:top-28 lg:self-start">
              {pick(project.summary, lang)}
            </p>

            <div className="max-w-[68ch]">
              {lead && (
                <p className="reveal text-[19px] leading-[1.5] font-medium text-balance sm:text-[22px]">
                  {lead}
                </p>
              )}
              {rest.length > 0 && (
                <div className="mt-8 space-y-5 border-t border-line pt-8 text-[15px] leading-[1.7] text-muted">
                  {rest.map((para) => (
                    <p key={para} className="reveal">
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>

        {project.gallery && (
          <Container className="pb-16 lg:pb-24">
            <ul
              className={`reveal-stagger grid gap-4 lg:gap-6 ${
                project.service === "web" ? "grid-cols-1" : "sm:grid-cols-2"
              }`}
            >
              {project.gallery.map((src, i) => (
                <li
                  key={src}
                  /* Ads run 4:5 social creatives, website work is wide screenshots. */
                  style={{ aspectRatio: galleryRatio }}
                  className="reveal group relative overflow-hidden rounded-[20px] border border-line bg-surface"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 700px, 100vw"
                    /* Contained, not cropped: a few creatives are square, and an ad
                       loses its message when 20% of it is cut off. */
                    className={`transition duration-700 group-hover:scale-[1.02] ${
                      project.service === "web" ? "object-cover" : "object-contain"
                    }`}
                  />
                  <span
                    dir="ltr"
                    aria-hidden
                    className="eyebrow absolute top-4 start-4 rounded-full bg-background/90 px-2.5 py-1 text-muted tabular-nums backdrop-blur"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </Container>
        )}

        {related.length > 0 && (
          <Container className="pb-16 lg:pb-24">
            <Eyebrow className="reveal">{t.portfolio.related}</Eyebrow>
            <ul className="reveal-stagger mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} lang={lang} t={t} />
                </li>
              ))}
            </ul>
          </Container>
        )}

        {/* Next project: a full-width step to the following case study. */}
        <Container className="pb-16 lg:pb-24">
          <Link
            href={`/${lang}/portfolio/${next.slug}`}
            className="group reveal flex flex-col gap-6 border-y border-line py-10 transition sm:flex-row sm:items-center sm:justify-between lg:py-14"
          >
            <span>
              <span className="eyebrow block text-secondary">{t.portfolio.next}</span>
              <span className="t-display mt-3 block transition duration-500 group-hover:text-secondary">
                {next.title}
              </span>
            </span>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line text-primary transition duration-300 group-hover:border-secondary group-hover:bg-secondary group-hover:text-white lg:size-16">
              <ArrowUpRight className="size-5" />
            </span>
          </Link>
        </Container>

        <Container className="pb-24 lg:pb-32">
          <div className="rounded-[24px] bg-surface px-6 py-16 text-center sm:rounded-[32px] sm:px-10 lg:py-20">
            <h2 className="reveal t-display mx-auto max-w-[16ch]">{t.portfolio.ctaTitle}</h2>
            <p className="reveal mx-auto mt-6 max-w-md text-[14.5px] leading-[1.6] text-muted">
              {t.cta.body}
            </p>
            <div className="mt-9 flex justify-center">
              <AccentButton href={`/${lang}#contact`}>{t.portfolio.cta}</AccentButton>
            </div>
          </div>
        </Container>
      </main>
      <Footer lang={lang} t={t} />
    </div>
  );
}
