import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { Footer, Navbar } from "@/components/sections";
import { getDictionary, isLocale } from "@/lib/dictionaries";

export default async function LegalLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Navbar lang={lang} t={t} />
      <main id="main">
        <Container className="py-16 md:py-28">
          {/* Narrow measure: legal text is read line by line, not scanned. */}
          <article className="mx-auto max-w-[68ch] text-lead text-dim [&_a]:text-ink [&_a]:underline [&_h1]:mb-4 [&_h1]:text-title [&_h1]:text-ink [&_h1]:display [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-extrabold [&_h2]:text-ink [&_h2]:uppercase md:[&_h2]:text-xl [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:ps-5">
            {props.children}
          </article>
        </Container>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
