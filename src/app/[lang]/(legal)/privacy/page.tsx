import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalArticle } from "@/components/legal-doc";
import { DEFAULT_LOCALE, isLocale } from "@/lib/dictionaries";
import { legal } from "@/lib/legal";

export async function generateMetadata(
  props: PageProps<"/[lang]/privacy">,
): Promise<Metadata> {
  const { lang } = await props.params;
  const doc = legal.privacy[isLocale(lang) ? lang : DEFAULT_LOCALE];
  return { title: `${doc.title} | La Vora Digital`, description: doc.intro };
}

export default async function Privacy(props: PageProps<"/[lang]/privacy">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  return <LegalArticle doc={legal.privacy[lang]} />;
}
