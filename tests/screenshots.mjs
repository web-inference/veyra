// Screenshots every section at 1440 / 1024 / 768 / 390 px and reports horizontal overflow.
// Usage: start the dev server, then  node tests/screenshots.mjs [baseUrl]
// Runs with reduced motion so every element is in its final, resting state.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const base = process.argv[2] ?? "http://localhost:3000";
const out = join(dirname(fileURLToPath(import.meta.url)), "screenshots");
mkdirSync(out, { recursive: true });

const widths = [1440, 1024, 768, 390];
const browser = await chromium.launch();

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    // Walk the page so lazy images load.
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
    await document.fonts.ready;
  });
  await page.waitForTimeout(800);

  const overflow = await page.evaluate(() => {
    const w = document.documentElement.clientWidth;
    const wide = [...document.querySelectorAll("body *")]
      .filter((el) => el.getBoundingClientRect().right > w + 1 && !el.closest("[role=region], .marquee, section.overflow-hidden, footer"))
      .slice(0, 5)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
    return { scrollWidth: document.documentElement.scrollWidth, clientWidth: w, wide };
  });
  console.log(`${width}px  scrollWidth=${overflow.scrollWidth} clientWidth=${overflow.clientWidth}`, overflow.wide.length ? overflow.wide : "");

  await page.screenshot({ path: join(out, `${width}-full.png`), fullPage: true });
  const blocks = await page.locator("main > section, body > footer").all();
  for (const [i, block] of blocks.entries()) {
    const name = (await block.getAttribute("id")) ?? (await block.getAttribute("aria-labelledby")) ?? `block-${i}`;
    await block.scrollIntoViewIfNeeded();
    await block.screenshot({ path: join(out, `${width}-${String(i + 1).padStart(2, "0")}-${name}.png`) });
  }
  await page.close();
}

await browser.close();
console.log(`Saved to ${out}`);
