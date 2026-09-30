import type { LegalDoc } from "@/lib/legal";

/** Renders either legal document, so the two pages hold content and nothing else. */
export function LegalArticle({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <h1>{doc.title}</h1>
      <p className="text-[13px]">{doc.updated}</p>
      <p>{doc.intro}</p>

      {doc.sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          {s.ul && (
            <ul>
              {s.ul.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          )}
          {s.p.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </section>
      ))}
    </>
  );
}
