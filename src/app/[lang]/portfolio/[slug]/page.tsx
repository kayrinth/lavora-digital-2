import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PrimaryButton } from "@/components/ui";
import { Footer, Navbar } from "@/components/sections";
import { ArrowRight } from "@/components/icons";
import { DEFAULT_LOCALE, LOCALES, getDictionary, isLocale } from "@/lib/dictionaries";
import { PROJECTS, getProject, pick } from "@/lib/portfolio";

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
  const body = pick(project.body, lang);
  const meta = pick(project.meta, lang);

  return (
    <div className="bg-background">
      <Navbar lang={lang} t={t} />
      <main>
        <Container className="py-12 lg:py-20">
          <Link
            href={`/${lang}/portfolio`}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-[13px] text-muted transition hover:text-ink"
          >
            <ArrowRight className="size-3.5 rotate-180 rtl:rotate-0" />
            {t.portfolio.back}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            {project.logo && (
              <span className="relative block h-16 w-36 shrink-0 rounded-xl border border-line bg-white">
                <Image
                  src={project.logo}
                  alt=""
                  fill
                  sizes="144px"
                  priority
                  className="object-contain p-3"
                />
              </span>
            )}
            <p className="eyebrow text-muted">{pick(project.subtitle, lang)}</p>
          </div>

          <h1 className="mt-6 max-w-2xl text-[34px] leading-[1.1] font-light tracking-tight sm:text-[46px]">
            {project.title}
          </h1>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
            <dl className="space-y-6 text-[13px]">
              {meta.map((row) => (
                <div key={row.label}>
                  <dt className="text-muted">{row.label}</dt>
                  <dd className="mt-1 font-medium">{row.value}</dd>
                </div>
              ))}
              <div>
                <dt className="text-muted">{t.portfolio.metaService}</dt>
                <dd className="mt-1 font-medium">
                  {t.portfolio.services[project.service]}
                </dd>
              </div>
            </dl>

            <div className="max-w-[62ch] space-y-5 text-[15px] leading-relaxed text-muted">
              {body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>

          {project.gallery && (
            <ul
              className={`mt-14 grid gap-4 ${
                project.service === "web" ? "lg:grid-cols-1" : "sm:grid-cols-2"
              }`}
            >
              {project.gallery.map((src) => (
                <li
                  key={src}
                  /* Ads run 4:5 social creatives, website work is wide screenshots. */
                  style={{
                    aspectRatio:
                      project.ratio ?? (project.service === "web" ? "16 / 9" : "4 / 5"),
                  }}
                  className="relative overflow-hidden rounded-2xl border border-line bg-surface"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    /* Contained, not cropped: a few creatives are square, and an ad
                       loses its message when 20% of it is cut off. */
                    className={project.service === "web" ? "object-cover" : "object-contain"}
                  />
                </li>
              ))}
            </ul>
          )}
        </Container>

        <section className="border-t border-line">
          <Container className="py-16 text-center lg:py-24">
            <h2 className="text-[28px] leading-tight font-light tracking-tight sm:text-[36px]">
              {t.portfolio.ctaTitle}
            </h2>
            <PrimaryButton href={`/${lang}#contact`} className="mt-8">
              {t.portfolio.cta}
            </PrimaryButton>
          </Container>
        </section>
      </main>
      <Footer lang={lang} t={t} />
    </div>
  );
}
