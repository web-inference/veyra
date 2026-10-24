# Veyra

A hotel-booking landing page for "Veyra": cinematic night-architecture photography, a giant wordmark that tucks behind the hero house, calm editorial sections and one orange accent.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, GSAP (ScrollTrigger, SplitText) and Lenis smooth scroll.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Live site: https://web-inference.github.io/veyra/ (deployed by `.github/workflows/pages.yml` on every push to `main`).

## Sections

Navbar · Hero · Our Story · Destinations · Discover carousel · Trusted partners · Community newsletter · Testimonials · FAQ · Footer CTA

## Project layout

- `app/` layout, page, global styles and design tokens
- `components/sections/` one file per section
- `components/ui/` shared buttons, icons and image wrapper
- `lib/content.ts` all copy and data
- `lib/gsap.ts` GSAP plugin registration and motion media queries
- `public/images/` site photography
- `tests/screenshots.mjs` Playwright screenshots at 1440 / 1024 / 768 / 390 px (`node tests/screenshots.mjs http://localhost:3000`)
- `generate-images.mjs` + `image-prompts.json` regenerate the photos with the Gemini API (needs `GEMINI_API_KEY` with billing)
- `BUILD_PROMPT.md` the full design brief this site was built from

The brand, copy and partner names are invented placeholders.
