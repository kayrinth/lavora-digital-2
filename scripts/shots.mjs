/**
 * Refreshes the website previews: one screenshot of each live client site,
 * taken by thum.io and stored as webp under public/preview. Run it with
 * `npm run shots` whenever a client site is redesigned.
 *
 * The shots are fetched here rather than at request time because Next's image
 * optimiser gives up on an upstream after 7 seconds, and a cold thum.io render
 * takes 10 to 22 — long enough that a visitor would meet a broken image.
 */
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { PROJECTS } from "../src/lib/portfolio.ts";

const OUT = new URL("../public/preview/", import.meta.url);

/**
 * `wait` gives a host's "checking your browser" page time to clear — two of
 * these sites answer a screenshotter with one — and `noanimate` holds the
 * response until the shot is real rather than thum.io's loading GIF.
 *
 * The stamp is what forces a fresh capture: thum.io caches by target URL and
 * ignores `maxAge`, so a refresh has to ask for a URL it has not seen. The
 * sites themselves ignore the extra parameter.
 */
const shot = (url) =>
  `https://image.thum.io/get/width/1440/crop/750/noanimate/wait/15/` +
  `${url}${url.includes("?") ? "&" : "?"}shot=${Date.now()}`;

await mkdir(OUT, { recursive: true });

for (const { slug, url } of PROJECTS.filter((p) => p.url)) {
  try {
    const res = await fetch(shot(url), { signal: AbortSignal.timeout(150_000) });
    if (!res.ok) throw new Error(`thum.io answered ${res.status}`);
    const png = Buffer.from(await res.arrayBuffer());

    /* A real screenshot of any of these sites runs from half a megabyte up; a
       bot check or a loading GIF is a tenth of that. Anything that small is
       not the site, so the file already on disk is left alone. */
    if (png.length < 150_000) throw new Error(`${png.length} B — not the site`);

    const webp = await sharp(png).webp({ quality: 80 }).toBuffer();
    await writeFile(new URL(`${slug}.webp`, OUT), webp);
    console.log(`  ${slug}  ${(webp.length / 1024).toFixed(0)} KB`);
  } catch (err) {
    console.error(`  ${slug}  FAILED: ${err.message}`);
    process.exitCode = 1;
  }
}
