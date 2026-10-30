import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDisc, Band, Container, CtaPanel } from "@/components/ui";
import { Footer, Navbar, ProjectCard } from "@/components/sections";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";
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
  const web = project.service === "web";

  const facts: { label: string; value: string; href?: string }[] = [
    ...meta,
    {
      label: t.portfolio.metaService,
      value: serviceLabel,
      href: `/${lang}/services/${SERVICE_PAGE[project.service]}`,
    },
  ];

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

  const galleryRatio = project.ratio ?? (web ? "16 / 9" : "4 / 5");

  return (
    <>
      <Navbar lang={lang} t={t} />
      <main id="main">
        <section className="pt-8 pb-16 md:pt-16 md:pb-32">
          <Container>
            <Link
              href={`/${lang}/portfolio?service=${project.service}`}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold tracking-[0.06em] text-dim uppercase transition-colors hover:text-brand"
            >
              <ArrowLeft className="size-4 rtl:rotate-180" /> {t.portfolio.back}
            </Link>

            {/* Top-aligned, so the facts' rule starts level with the title instead of floating in the
                middle of a half-empty column. */}
            <div className="mt-6 grid gap-8 md:mt-8 md:gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                {/* The client's mark opens the column: it was an orphan tile below the facts. */}
                {project.logo && (
                  <div className="mb-6 grid h-20 w-36 place-items-center border border-line bg-surface p-3 md:h-24 md:w-44 md:p-4">
                    <Image
                      src={project.logo}
                      alt=""
                      width={208}
                      height={112}
                      priority
                      className="max-h-full w-auto max-w-full object-contain"
                    />
                  </div>
                )}
                <h1 className="display text-title">{project.title}</h1>
                <p className="mt-6 max-w-lg text-lead text-dim">{pick(project.subtitle, lang)}</p>
              </div>

              <dl className="grid grid-cols-2 gap-6 border-t-2 border-ink pt-6 sm:grid-cols-3 lg:col-span-5">
                {facts.map((row) => (
                  <div key={row.label}>
                    <dt className="text-sm text-dim">{row.label}</dt>
                    <dd className="mt-1 text-base/snug font-semibold md:text-lg/snug">
                      {/* The service was a label above the title; it belongs with the other facts,
                          and it is the only one that leads anywhere. */}
                      {row.href ? (
                        <Link href={row.href} className="link text-brand">
                          {row.value}
                        </Link>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* The write-up: the summary opens the column, the lead paragraph carries the argument. */}
            <div className="mt-10 grid gap-8 border-t border-line pt-8 md:mt-20 md:grid-cols-2 md:gap-16 md:pt-10">
              <p className="text-lead text-dim">{pick(project.summary, lang)}</p>
              <div>
                {lead && <p className="text-lg/snug font-semibold md:text-xl/snug">{lead}</p>}
                {rest.length > 0 && (
                  <div className="mt-6 space-y-5 text-lead text-dim">
                    {rest.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Website work is shown in its own browser frame; everything else keeps the image list. */}
            {project.url ? (
              <div className="mt-10 md:mt-20">
                <div className="border border-line">
                  <div className="flex items-center gap-3 border-b border-line bg-mist px-4 py-3">
                    <span aria-hidden className="flex shrink-0 gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="size-2.5 rounded-full bg-line" />
                      ))}
                    </span>
                    <span dir="ltr" className="truncate text-sm text-dim">
                      {project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link ms-auto inline-flex shrink-0 items-center gap-2 text-sm text-brand"
                    >
                      <span className="hidden sm:inline">{t.portfolio.visit}</span>
                      <ArrowUpRight aria-hidden className="size-4" />
                    </a>
                  </div>
                  <div data-reveal="frame" className="overflow-hidden bg-ink">
                    <Image
                      src={project.thumb!}
                      alt={project.title}
                      width={1600}
                      height={1000}
                      className="aspect-[16/11] w-full object-cover object-top sm:aspect-[16/10]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              project.gallery && (
                <ul data-reveal="list" className="mt-10 grid gap-4 md:mt-20 md:grid-cols-2 md:items-start">
                  {project.gallery.map((src, n) => (
                    <li key={src} className="bg-mist">
                      <Image
                        src={src}
                        alt={`${project.title} ${n + 1}`}
                        width={1200}
                        height={1500}
                        loading={n < 2 ? undefined : "lazy"}
                        // A fixed box, so the page doesn't jump as images load. Creatives come in
                        // several ratios, so show them whole.
                        style={{ aspectRatio: galleryRatio }}
                        className={`w-full ${web ? "object-cover" : "object-contain"}`}
                      />
                    </li>
                  ))}
                </ul>
              )
            )}
          </Container>
        </section>

        {related.length > 0 && (
          <Band ground="mist">
            <h2 data-reveal className="display text-head">
              {t.portfolio.related}
            </h2>
            <ul
              data-reveal="list"
              className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:gap-y-12 md:mt-16 lg:grid-cols-3"
            >
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} lang={lang} t={t} />
                </li>
              ))}
            </ul>
          </Band>
        )}

        {/* Next project: a full-width step to the following case study. */}
        <Container className="py-16 md:py-24">
          <Link
            href={`/${lang}/portfolio/${next.slug}`}
            className="group flex items-center justify-between gap-6 border-y border-line py-6 md:py-10"
          >
            <span className="min-w-0">
              <span className="block text-sm font-bold tracking-[0.06em] text-brand uppercase">
                {t.portfolio.next}
              </span>
              <span className="display mt-3 block text-row transition-colors group-hover:text-brand">
                {next.title}
              </span>
            </span>
            <ArrowDisc size="size-12 md:size-14" icon={ArrowRight} />
          </Link>
        </Container>

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
