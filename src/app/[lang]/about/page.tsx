import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AccentButton, Band, Container } from "@/components/ui";
import { Footer, Navbar } from "@/components/sections";
import { Cursor, Megaphone, TrendUp } from "@/components/icons";
import { DEFAULT_LOCALE, getDictionary, isLocale } from "@/lib/dictionaries";
import { about } from "@/lib/about";

/** One mark per expertise, in the order of doc.expertise.items. */
const EXPERTISE_ICONS = [Megaphone, Cursor, TrendUp];

export async function generateMetadata(props: PageProps<"/[lang]/about">): Promise<Metadata> {
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
    <>
      <Navbar lang={lang} t={t} />
      <main id="main">
        {/* The company on ink: the mark, the claim, and the story under a hairline. */}
        <section className="bg-ink py-14 text-white [--focus:#fff] md:py-28">
          <Container>
            {/* The mark and the name as one lockup. The mark alone in its own column was a small square
                with a third of the band empty on either side of it. */}
            <div className="flex items-center gap-3">
              <Image
                src="/lavora-logo.webp"
                alt=""
                width={64}
                height={64}
                priority
                className="size-12 brightness-0 invert md:size-14"
              />
              <span className="display text-lg md:text-xl">{t.brand}</span>
            </div>
            <div className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-12 lg:items-start lg:gap-16">
              <h1 className="display text-title lg:col-span-7">{doc.title}</h1>
              <p className="text-lead text-white/85 lg:col-span-5">{doc.intro[0]}</p>
            </div>

            <div className="mt-12 grid gap-6 border-t border-white/15 pt-8 text-lead text-white/85 md:grid-cols-2 md:gap-12">
              {doc.intro.slice(1).map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Container>
        </section>

        {/* What the agency actually does, with the claim hung under the picture. */}
        <Band>
          <div className="grid gap-12 md:gap-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <h2 data-reveal className="display text-head">
                {doc.advertising.heading}
              </h2>
              <div className="mt-6 space-y-5 text-lead text-dim md:mt-8">
                {doc.advertising.paragraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <div data-reveal="frame" className="overflow-hidden bg-mist">
                <Image
                  src="/report.webp"
                  alt={t.banner.imageAlt}
                  width={1709}
                  height={920}
                  className="aspect-video w-full object-contain p-4"
                />
              </div>
              <p
                data-reveal="wipe"
                className="absolute -bottom-6 start-4 max-w-[85%] bg-brand px-5 py-3 text-lg font-extrabold text-white italic md:start-6 md:px-6 md:py-4 md:text-xl"
              >
                {doc.advertising.quote}
              </p>
            </div>
          </div>
        </Band>

        {/* The three disciplines, as cards on mist. */}
        <Band ground="mist">
          <h2 data-reveal className="display text-head">
            {doc.expertise.heading}
          </h2>

          <ul data-reveal="list" className="mt-10 grid border-t-2 border-ink md:mt-16 lg:grid-cols-3 lg:gap-6 lg:border-t-0">
            {doc.expertise.items.map((item, i) => {
              const Icon = EXPERTISE_ICONS[i];
              return (
                <li
                  key={item.title}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-5 md:gap-x-6 lg:flex lg:flex-col lg:items-center lg:rounded-lg lg:border-0 lg:bg-surface lg:px-6 lg:pt-8 lg:pb-10 lg:text-center"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-brand text-white lg:size-16">
                    <Icon aria-hidden className="size-5 lg:size-7" />
                  </span>
                  <h3 className="text-base font-extrabold uppercase md:text-xl lg:mt-6">{item.title}</h3>
                  <span aria-hidden className="mt-4 hidden h-0.5 w-8 bg-brand lg:block" />
                  <p className="col-start-2 mt-1 text-dim lg:mt-4">{item.desc}</p>
                </li>
              );
            })}
          </ul>
        </Band>

        {/* The sign-off. */}
        <Band ground="ink">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <h2 data-reveal className="display text-head lg:col-span-5">
              {doc.closing.heading}
            </h2>
            <div className="space-y-5 text-lead text-white/85 lg:col-span-7">
              {doc.closing.paragraphs.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>

          {/* On ink the flag takes the blue: the navy would sink into the ground. */}
          <p className="display mt-12 text-head [--flag:var(--color-blue)] md:mt-16">
            <span className="flag">{doc.closing.kicker}</span>
          </p>
          <AccentButton href={`/${lang}#contact`} onNavy className="mt-8 md:mt-10">
            {doc.closing.cta}
          </AccentButton>
        </Band>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
