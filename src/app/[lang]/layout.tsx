import type { Metadata, Viewport } from "next";
import { Archivo, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Motion } from "@/components/motion";
import { DEFAULT_LOCALE, LOCALES, dir, getDictionary, isLocale } from "@/lib/dictionaries";

// The width axis carries the heads: 800 weight at 110% width, like the wordmark.
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });

// Archivo has no Arabic glyphs; without this the Arabic build falls back to a system font.
const arabic = Noto_Sans_Arabic({ variable: "--font-arabic", subsets: ["arabic"] });

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(props: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  const t = getDictionary(isLocale(lang) ? lang : DEFAULT_LOCALE);
  return { title: t.meta.title, description: t.meta.description };
}

export const viewport: Viewport = { themeColor: "#ffffff" };

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html
      lang={lang}
      dir={dir(lang)}
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${arabic.variable} h-full`}
    >
      <body className="min-h-full">
        <a href="#main" className="skip">
          {t.a11y.skip}
        </a>
        {props.children}
        <Motion />
      </body>
    </html>
  );
}
