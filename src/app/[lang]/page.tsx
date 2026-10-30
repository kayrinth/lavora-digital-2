import { notFound } from "next/navigation";
import {
  About,
  Clients,
  Cta,
  Footer,
  Hero,
  Intro,
  Navbar,
  Process,
  Services,
  Stats,
  Work,
} from "@/components/sections";
import { getDictionary, isLocale } from "@/lib/dictionaries";

export default async function Home(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Navbar lang={lang} t={t} />
      {/* The film → who we are → how we work → who trusts us → the proof → what we do → the work → the process → the brief. */}
      <main id="main">
        <Hero t={t} />
        <Intro lang={lang} t={t} />
        <About t={t} />
        <Clients t={t} />
        <Stats t={t} />
        <Services lang={lang} t={t} />
        <Work lang={lang} t={t} />
        <Process lang={lang} t={t} />
        <Cta t={t} />
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
