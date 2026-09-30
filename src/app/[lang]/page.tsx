import { notFound } from "next/navigation";
import {
  About,
  Clients,
  Cta,
  Footer,
  Hero,
  HeroImage,
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
    <div className="bg-background">
      <Navbar lang={lang} t={t} />
      <main>
        {/* Who we are → who trusts us → what we do → proof → how → talk to us. */}
        <Hero lang={lang} t={t} />
        <HeroImage lang={lang} t={t} />
        <About t={t} />
        <Clients t={t} />
        <Stats t={t} />
        <Services lang={lang} t={t} />
        <Work lang={lang} t={t} />
        <Process lang={lang} t={t} />
        <Cta t={t} />
      </main>
      <Footer lang={lang} t={t} />
    </div>
  );
}
