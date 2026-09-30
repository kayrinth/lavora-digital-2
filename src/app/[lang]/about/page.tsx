import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, PrimaryButton } from "@/components/ui";
import { Footer, Navbar } from "@/components/sections";
import { DEFAULT_LOCALE, getDictionary, isLocale } from "@/lib/dictionaries";
import { about } from "@/lib/about";

/** Existing project artwork, reused rather than adding new assets. */
const EXPERTISE_ART = [
  "/services/ads.webp",
  "/services/web.webp",
  "/services/digital-marketing.webp",
];

export async function generateMetadata(
  props: PageProps<"/[lang]/about">,
): Promise<Metadata> {
  const { lang } = await props.params;
  const doc = about[isLocale(lang) ? lang : DEFAULT_LOCALE];
  return { title: `${doc.eyebrow} | ${doc.title}`, description: doc.intro[0] };
}

export default async function About(props: PageProps<"/[lang]/about">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const doc = about[lang];

  return (
    <div className="bg-background">
      <Navbar lang={lang} t={t} />
      <main>
        {/* Intro: copy on one side, the studio shot on the other. */}
        <Container className="grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
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

          <div className="reveal relative aspect-[4/3] self-start overflow-hidden rounded-2xl lg:sticky lg:top-24">
            <Image
              src="/hero1.webp"
              alt={t.hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>

        {/* Advertising: the dashboard leads, so the order flips. */}
        <section className="border-y border-line bg-surface">
          <Container className="grid items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-24">
            <div className="reveal relative aspect-[16/10] lg:order-2">
              <Image
                src="/report.webp"
                alt={t.banner.imageAlt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-contain"
              />
            </div>

            <div className="lg:order-1">
              <h2 className="reveal max-w-md text-[30px] leading-[1.15] font-light tracking-tight sm:text-[38px]">
                {doc.advertising.heading}
              </h2>
              <div className="mt-7 max-w-lg space-y-5 text-[14.5px] leading-relaxed text-muted">
                {doc.advertising.paragraphs.map((para) => (
                  <p key={para} className="reveal">
                    {para}
                  </p>
                ))}
              </div>
              <p className="reveal mt-8 max-w-md border-s border-secondary ps-5 text-[17px] leading-relaxed font-medium text-ink">
                {doc.advertising.quote}
              </p>
            </div>
          </Container>
        </section>

        {/* Expertise: one card per service, using the service artwork. */}
        <Container className="py-16 lg:py-24">
          <h2 className="reveal text-center text-[30px] leading-tight font-light tracking-tight sm:text-[38px]">
            {doc.expertise.heading}
          </h2>

          <ul className="reveal-stagger mt-12 grid gap-8 md:grid-cols-3">
            {doc.expertise.items.map((item, i) => (
              <li
                key={item.title}
                className="reveal overflow-hidden rounded-2xl border border-line bg-surface"
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-primary-soft to-secondary-soft">
                  <Image
                    src={EXPERTISE_ART[i]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 336px, 100vw"
                    className="object-contain p-5"
                  />
                </div>
                <div className="px-6 py-7">
                  <h3 className="text-[18px] font-semibold">{item.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>

        {/* Closing. */}
        <section className="border-t border-line bg-surface">
          <Container className="py-16 text-center lg:py-24">
            <h2 className="reveal text-[30px] leading-tight font-light tracking-tight sm:text-[38px]">
              {doc.closing.heading}
            </h2>
            <div className="mx-auto mt-7 max-w-2xl space-y-5 text-[14.5px] leading-relaxed text-muted">
              {doc.closing.paragraphs.map((para) => (
                <p key={para} className="reveal">
                  {para}
                </p>
              ))}
            </div>
            <p className="reveal mt-10 text-[22px] font-light tracking-tight sm:text-[26px]">
              {doc.closing.kicker}
            </p>
            <PrimaryButton href={`/${lang}#contact`} withArrow className="mt-7">
              {doc.closing.cta}
            </PrimaryButton>
          </Container>
        </section>
      </main>
      <Footer lang={lang} t={t} />
    </div>
  );
}
