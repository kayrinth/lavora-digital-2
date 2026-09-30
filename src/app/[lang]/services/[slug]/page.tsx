import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, PrimaryButton } from "@/components/ui";
import { Footer, Navbar } from "@/components/sections";
import { DEFAULT_LOCALE, LOCALES, getDictionary, isLocale } from "@/lib/dictionaries";
import { SERVICE_PAGE_SLUGS, getServiceDoc } from "@/lib/services";

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
  const wide = doc.whatWeDo.blocks.length > 2;

  return (
    <div className="bg-background">
      <Navbar lang={lang} t={t} />
      <main>
        {/* Intro: copy left, the service illustration right. */}
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div>
            <p className="reveal eyebrow text-muted">{doc.eyebrow}</p>
            <h1 className="reveal mt-4 max-w-xl text-[34px] leading-[1.12] font-light tracking-tight sm:text-[44px]">
              {doc.title}
            </h1>
            <div className="mt-8 max-w-xl space-y-5 text-[14.5px] leading-relaxed text-muted">
              {doc.intro.map((para) => (
                <p key={para} className="reveal">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="reveal relative aspect-square rounded-2xl bg-gradient-to-br from-primary-soft to-secondary-soft">
            <Image
              src={doc.image}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 500px, 100vw"
              className="object-contain p-6"
            />
          </div>
        </Container>

        {/* What we do: one panel per offering. */}
        <section className="border-y border-line bg-surface">
          <Container className="py-16 lg:py-24">
            <h2 className="reveal text-[30px] leading-tight font-light tracking-tight sm:text-[38px]">
              {doc.whatWeDo.heading}
            </h2>

            <ul className="reveal-stagger mt-12 grid gap-8 md:grid-cols-2">
              {doc.whatWeDo.blocks.map((block, i) => (
                <li
                  key={block.title}
                  className="reveal flex flex-col rounded-2xl border border-line bg-background px-7 py-8"
                >
                  {doc.whatWeDo.numbered && (
                    <span dir="ltr" className="eyebrow text-muted tabular-nums">
                      0{i + 1}
                    </span>
                  )}
                  <h3 className={`text-[20px] font-semibold ${wide ? "mt-3" : ""}`}>
                    {block.title}
                  </h3>
                  {block.tagline && (
                    <p className="mt-2 text-[14px] font-medium text-ink">
                      {block.tagline}
                    </p>
                  )}

                  <div className="mt-4 space-y-4 text-[13.5px] leading-relaxed text-muted">
                    {block.paragraphs.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>

                  {block.idealFor && (
                    <div className="mt-6 border-t border-line pt-5">
                      <p className="text-[12px] text-muted">{doc.idealForLabel}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {block.idealFor.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full bg-primary-soft px-3 py-1 text-[12px] text-ink"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Process: numbered steps. */}
        <Container className="py-16 lg:py-24">
          <h2 className="reveal text-[30px] leading-tight font-light tracking-tight sm:text-[38px]">
            {doc.process.heading}
          </h2>

          <ol className="reveal-stagger mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {doc.process.steps.map((step, i) => (
              <li
                key={step.title}
                className="reveal bg-background px-7 py-8 transition hover:bg-primary-soft/50"
              >
                <span dir="ltr" className="eyebrow block text-muted tabular-nums">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-[17px] font-semibold">{step.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </Container>

        {doc.why && (
          <section className="border-y border-line bg-surface">
            <Container className="grid gap-12 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-24">
              <div>
                <h2 className="reveal text-[30px] leading-[1.15] font-light tracking-tight sm:text-[38px]">
                  {doc.why.heading}
                </h2>
                <div className="reveal relative mt-10 hidden aspect-[16/10] lg:block">
                  <Image
                    src="/report.webp"
                    alt={t.banner.imageAlt}
                    fill
                    sizes="420px"
                    className="object-contain"
                  />
                </div>
              </div>

              <ul className="reveal-stagger">
                {doc.why.items.map((item) => (
                  <li
                    key={item.title}
                    className="reveal border-t border-line py-6 last:border-b"
                  >
                    <h3 className="text-[17px] font-semibold">{item.title}</h3>
                    <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-muted">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}

        {doc.outro && (
          <section className="border-y border-line bg-surface">
            <Container className="py-16 lg:py-24">
              <h2 className="reveal max-w-lg text-[30px] leading-[1.15] font-light tracking-tight sm:text-[38px]">
                {doc.outro.heading}
              </h2>
              <div className="mt-8 grid gap-6 text-[14.5px] leading-relaxed text-muted lg:grid-cols-3">
                {doc.outro.paragraphs.map((para) => (
                  <p key={para} className="reveal">
                    {para}
                  </p>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Closing. */}
        <Container className="py-16 text-center lg:py-24">
          <h2 className="reveal mx-auto max-w-2xl text-[30px] leading-tight font-light tracking-tight sm:text-[38px]">
            {doc.closing.heading}
          </h2>
          <p className="reveal mx-auto mt-6 max-w-xl text-[14.5px] leading-relaxed text-muted">
            {doc.closing.body}
          </p>
          <PrimaryButton href={`/${lang}#contact`} withArrow className="mt-8">
            {doc.closing.cta}
          </PrimaryButton>
        </Container>
      </main>
      <Footer lang={lang} t={t} />
    </div>
  );
}
