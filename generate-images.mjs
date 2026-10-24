#!/usr/bin/env node
// Generates every image in image-prompts.json with the Gemini API and saves it,
// resized to its exact pixel size, into public/images/.
//
// Usage:
//   node generate-images.mjs                 generate all missing images
//   node generate-images.mjs --only 01,03    only these image numbers
//   node generate-images.mjs --force         regenerate even if the file exists
//   node generate-images.mjs --model gemini-3-pro-image   higher quality, slower, pricier
//   node generate-images.mjs --dry-run       show what would be sent, call nothing
//
// Needs: Node 18+, ffmpeg on PATH, GEMINI_API_KEY (env var) with billing enabled.

import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PROMPTS = join(ROOT, "image-prompts.json");
const OUT_DIR = join(ROOT, "public", "images");
const RAW_DIR = join(ROOT, ".raw-images");

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const MODEL = opt("--model", "gemini-3.1-flash-image");
const ONLY = opt("--only", "").split(",").map((s) => s.trim().padStart(2, "0")).filter((s) => s !== "00");
const FORCE = flag("--force");
const DRY = flag("--dry-run");

// Ratios Gemini accepts; anything else is generated at the nearest one and cropped by ffmpeg.
const GEMINI_RATIOS = ["1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9"];
const ratioValue = (r) => { const [w, h] = r.split(":").map(Number); return w / h; };
const nearestRatio = (r) =>
  GEMINI_RATIOS.includes(r) ? r
    : GEMINI_RATIOS.reduce((a, b) => Math.abs(ratioValue(b) - ratioValue(r)) < Math.abs(ratioValue(a) - ratioValue(r)) ? b : a);

function apiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  // setx only reaches new terminals; read the saved user variable directly on Windows.
  if (process.platform === "win32") {
    try {
      const out = execFileSync("reg", ["query", "HKCU\\Environment", "/v", "GEMINI_API_KEY"], { encoding: "utf8" });
      const m = out.match(/GEMINI_API_KEY\s+REG_\w+\s+(\S+)/);
      if (m) return m[1];
    } catch {}
  }
  return null;
}

function buildPrompt(im) {
  const orient = im.aspectRatio === "1:1" ? "square" : ratioValue(im.aspectRatio) < 1 ? "portrait" : "landscape";
  return `Generate a ${im.aspectRatio} ${orient} image. ${im.prompt}\n\nStyle: ${im.style}\n\nDo not include: ${im.avoid}.`;
}

async function callGemini(key, parts, aspectRatio) {
  const imageConfig = { aspectRatio };
  if (!MODEL.startsWith("gemini-2.5")) imageConfig.imageSize = "2K";
  const body = { contents: [{ parts }], generationConfig: { responseModalities: ["IMAGE"], imageConfig } };
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const json = await res.json();
      const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
      if (part) return Buffer.from(part.inlineData.data, "base64");
      const reason = json.candidates?.[0]?.finishReason || json.promptFeedback?.blockReason || "no image returned";
      throw new Error(`Gemini returned no image (${reason}). Try rewording the prompt.`);
    }
    const text = await res.text();
    if (res.status === 429 && /limit: 0/.test(text))
      throw new Error("Quota is 0 for this model. Billing is not active on this key's project yet.");
    if ((res.status === 429 || res.status >= 500) && attempt < 4) {
      const wait = 5 * 2 ** attempt;
      console.log(`   ${res.status} from Gemini, retrying in ${wait}s…`);
      await new Promise((r) => setTimeout(r, wait * 1000));
      continue;
    }
    throw new Error(`Gemini error ${res.status}: ${text.slice(0, 300)}`);
  }
}

// Scale to cover the target size, centre-crop, and save as JPG (or PNG for .png files).
function finish(rawPath, outPath, size, extraFilter = "") {
  const [w, h] = size.split("×").map(Number);
  const vf = `scale=${w}:${h}:force_original_aspect_ratio=increase:flags=lanczos,crop=${w}:${h}${extraFilter}`;
  const quality = outPath.endsWith(".jpg") ? ["-q:v", "3"] : [];
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", rawPath, "-vf", vf, ...quality, outPath]);
}

async function main() {
  const images = JSON.parse(readFileSync(PROMPTS, "utf8"));
  const todo = images.filter((im) => !ONLY.length || ONLY.includes(im.id));
  const key = apiKey();
  if (!key && !DRY) {
    console.error("GEMINI_API_KEY is not set. Run:  setx GEMINI_API_KEY \"your-key\"  then open a new terminal.");
    process.exit(1);
  }
  try { execFileSync("ffmpeg", ["-version"], { stdio: "ignore" }); }
  catch { console.error("ffmpeg was not found on PATH. Install it (winget install Gyan.FFmpeg) and retry."); process.exit(1); }

  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(RAW_DIR, { recursive: true });
  console.log(`Model: ${MODEL} · ${todo.length} image(s) · output: ${OUT_DIR}\n`);

  const failed = [];
  for (const im of todo) {
    const outPath = join(OUT_DIR, im.file);
    const label = `[${im.id}] ${im.name} (${im.aspectRatio}, ${im.size})`;
    if (existsSync(outPath) && !FORCE) { console.log(`${label} — exists, skipped`); continue; }
    const genRatio = nearestRatio(im.aspectRatio);

    if (DRY) {
      console.log(`${label}\n   → ${im.file}, generated at ${genRatio}${genRatio !== im.aspectRatio ? " then cropped" : ""}${im.edit ? ", edit of " + im.source : ""}`);
      continue;
    }

    try {
      console.log(`${label} — generating…`);
      const rawPath = join(RAW_DIR, `${im.id}.png`);

      if (im.edit) {
        // Gemini can't output transparency: ask for a flat green sky, then key it out with ffmpeg.
        const src = join(OUT_DIR, im.source);
        if (!existsSync(src)) throw new Error(`needs ${im.source} first — generate image 01 before 02`);
        const editPrompt = "Edit this exact photo. Replace ONLY the sky with a perfectly flat, solid, pure green colour (#00FF00), like a green screen. Keep the house, trees, branches, water and reflections pixel-identical, with crisp natural edges and no green spill on them. Same framing, same size.";
        const buf = await callGemini(key, [
          { inlineData: { mimeType: "image/jpeg", data: readFileSync(src).toString("base64") } },
          { text: editPrompt },
        ], genRatio);
        writeFileSync(rawPath, buf);
        finish(rawPath, outPath, im.size, ",chromakey=0x00FF00:0.16:0.06,despill=type=green,format=rgba");
        console.log(`   saved ${im.file} (sky keyed to transparent — check the tree edges; clean up in Photopea if needed)`);
      } else {
        const buf = await callGemini(key, [{ text: buildPrompt(im) }], genRatio);
        writeFileSync(rawPath, buf);
        finish(rawPath, outPath, im.size);
        console.log(`   saved ${im.file}`);
      }
    } catch (e) {
      console.log(`   FAILED: ${e.message}`);
      failed.push(im.id);
      if (/Quota is 0/.test(e.message)) break;
    }
  }

  if (!DRY) rmSync(RAW_DIR, { recursive: true, force: true });
  console.log(failed.length
    ? `\nDone with ${failed.length} failure(s). Retry with:  node generate-images.mjs --only ${failed.join(",")}`
    : "\nDone. All images are in public/images/.");
}

main();
