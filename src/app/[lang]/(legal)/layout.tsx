import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { Footer, Navbar } from "@/components/sections";
import { getDictionary, isLocale } from "@/lib/dictionaries";

export default async function LegalLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <div className="bg-background">
      <Navbar lang={lang} t={t} />
      <main>
        <Container className="py-20 lg:py-28">
          {/* Narrow measure: legal text is read line by line, not scanned. */}
          <article className="max-w-[68ch] text-[14px] leading-relaxed text-muted [&_a]:text-ink [&_a]:underline [&_h1]:mb-3 [&_h1]:text-[34px] [&_h1]:leading-tight [&_h1]:font-light [&_h1]:tracking-tight [&_h1]:text-ink sm:[&_h1]:text-[42px] [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:text-[18px] [&_h2]:font-medium [&_h2]:text-ink [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:ps-5">
            {props.children}
          </article>
        </Container>
      </main>
      <Footer lang={lang} t={t} />
    </div>
  );
}
