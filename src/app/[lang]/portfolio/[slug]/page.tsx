import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, CtaPanel, NavyPanel } from "@/components/ui";
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

export default async function ProjectPage(props: PageProps<"/[lang]/portfolio/[slug]">) {
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

  const nextThumb = next.thumb ?? next.gallery?.[0];

  const related = PROJECTS.filter(
    (p) =>
      p.service === project.service &&
      p.slug !== project.slug &&
      p.slug !== next.slug &&
      (p.thumb ?? p.gallery?.[0]),
  ).slice(0, 3);

  const galleryRatio = project.ratio ?? (project.service === "web" ? "16 / 9" : "4 / 5");

  return (
    <div className="bg-background">
      <Navbar lang={lang} t={t} />
      <main>
        {/*
         * Masthead. The case study opens on the brand ground, inset in the page
         * rather than bled to the edges: the navbar is a pill floating on the
         * page ground, and navy run to the top opens on a seam under it and
         * turns the bar's frosted white to mud. This is what the service pages
         * and the home page already do with their own opening panels.
         */}
        <header className="pt-3 pb-7 sm:pt-4 lg:pb-10">
          <Container>
            <NavyPanel>
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
            </NavyPanel>
          </Container>
        </header>

        {/* Website work is shown live, scrolled inside its own frame, instead of
            as flat screenshots; everything else keeps the image gallery. */}
        {project.url ? (
          <Container className="pb-14 lg:pb-20">
            <div className="reveal overflow-hidden rounded-[20px] border border-line">
              <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-3">
                <span aria-hidden className="flex shrink-0 gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-2.5 rounded-full bg-line" />
                  ))}
                </span>
                <span
                  dir="ltr"
                  className="truncate rounded-full bg-background px-3 py-1 text-[12px] text-muted"
                >
                  {project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </span>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-auto inline-flex shrink-0 items-center gap-2 text-[12.5px] font-medium text-primary transition hover:text-secondary"
                >
                  <span className="hidden sm:inline">{t.portfolio.visit}</span>
                  <ArrowUpRight aria-hidden className="size-4" />
                </a>
              </div>
              <div className="relative aspect-[16/11] bg-surface sm:aspect-[16/10]">
                <Image
                  src={project.thumb!}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 1280px, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </Container>
        ) : (
          project.gallery && (
            <Container className="pb-14 lg:pb-20">
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
                    className="reveal group relative overflow-hidden rounded-[20px] border border-line bg-surface transition duration-500 hover:border-secondary"
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
          )
        )}

        {/*
         * The write-up, under the work rather than above it: the visitor
         * arrived by clicking a picture of this project, so the project is
         * what the page owes them first and the account of it second.
         * The lead paragraph is set as a standfirst, the rest as body.
         */}
        <Container className="pb-16 lg:pb-24">
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-20">
            {/* The summary is the page's thesis, not a caption: set at reading
                size with the accent rule the rest of the site uses to open a
                column. */}
            <p className="reveal relative border-t border-line pt-7 text-[15px] leading-[1.65] text-muted lg:sticky lg:top-28 lg:self-start">
              <span aria-hidden className="absolute -top-px start-0 h-px w-12 bg-secondary" />
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

        {related.length > 0 && (
          <Container className="pb-16 lg:pb-24">
            <h2 className="reveal t-title">{t.portfolio.related}</h2>
            <ul className="reveal-stagger mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
            className="group reveal relative flex flex-col gap-7 border-y border-line py-10 transition sm:flex-row sm:items-center sm:justify-between sm:gap-10 lg:py-14"
          >
            {/* The rule draws itself in, as it does on the work index. */}
            <span
              aria-hidden
              className="absolute -top-px start-0 h-px w-0 bg-secondary transition-[width] duration-700 ease-out group-hover:w-full"
            />
            <span className="flex min-w-0 items-center gap-6 sm:gap-8">
              {/* The step shows what it leads to. A row that only names the
                  next client asks the visitor to click on trust. */}
              {nextThumb && (
                <span className="relative hidden aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-2xl bg-surface sm:block lg:w-40">
                  <Image
                    src={nextThumb}
                    alt=""
                    fill
                    sizes="160px"
                    className={`transition duration-700 ease-out group-hover:scale-[1.04] ${
                      next.service === "web" ? "object-cover object-top" : "object-contain p-3"
                    }`}
                  />
                </span>
              )}
              <span className="min-w-0">
                <span className="eyebrow block text-secondary">{t.portfolio.next}</span>
                {/* A client name is a proper noun of unknown length: at display
                    scale the longest of them takes the row three lines deep. */}
                <span className="t-title mt-3 block transition duration-500 group-hover:text-secondary">
                  {next.title}
                </span>
              </span>
            </span>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line text-primary transition duration-300 group-hover:border-secondary group-hover:bg-secondary group-hover:text-white lg:size-16">
              <ArrowUpRight className="size-5" />
            </span>
          </Link>
        </Container>

        <Container className="pb-24 lg:pb-32">
          <CtaPanel
            heading={t.portfolio.ctaTitle}
            body={t.cta.body}
            cta={t.portfolio.cta}
            href={`/${lang}#contact`}
          />
        </Container>
      </main>
      <Footer lang={lang} t={t} />
    </div>
  );
}
