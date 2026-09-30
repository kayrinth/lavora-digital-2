import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import "lenis/dist/lenis.css";
import "../globals.css";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SmoothScroll } from "@/components/smooth-scroll";
import { DEFAULT_LOCALE, LOCALES, dir, getDictionary, isLocale } from "@/lib/dictionaries";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

// Inter has no Arabic glyphs; without this the Arabic build falls back to a system font.
const arabic = Noto_Sans_Arabic({ variable: "--font-arabic", subsets: ["arabic"] });

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(
  props: LayoutProps<"/[lang]">,
): Promise<Metadata> {
  const { lang } = await props.params;
  const t = getDictionary(isLocale(lang) ? lang : DEFAULT_LOCALE);
  return { title: t.meta.title, description: t.meta.description };
}

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      dir={dir(lang)}
      className={`${inter.variable} ${arabic.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <RevealOnScroll />
        <SmoothScroll>{props.children}</SmoothScroll>
      </body>
    </html>
  );
}
