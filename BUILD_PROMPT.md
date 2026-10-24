Build a production-ready, fully responsive hotel-booking landing page for a brand called "Veyra" (a premium "find your perfect stay" booking site). It recreates the look and motion of a reference design: cinematic night-architecture photography, a giant translucent wordmark behind the hero house, calm white editorial sections, one orange accent, and one signature scroll animation per section. It must look hand-crafted and award-level, never like a template.

==================================================
0. SKILLS — load these first and follow them
==================================================
- frontend-design + taste-skill: art direction and anti-template rules
- gsap-core, gsap-timeline, gsap-scrolltrigger, gsap-plugins (SplitText, Draggable/Observer), gsap-react: all animation
- gsap-performance: transform/opacity only, no layout thrash
- ui-ux-pro-max + impeccable: hover/focus/empty/error states, spacing, final polish pass
- webapp-testing (Playwright): screenshot every section at 1440, 1024, 768 and 390 px, look at them, fix, repeat until clean
- Use the motion-reviewer agent at the end to audit animation performance.

==================================================
1. STACK
==================================================
- Next.js 15 (App Router) + TypeScript (strict) + Tailwind CSS v4
- GSAP 3 + @gsap/react (useGSAP) + ScrollTrigger + SplitText
- Lenis smooth scroll, synced to ScrollTrigger (lenis.on('scroll', ScrollTrigger.update); gsap.ticker drives lenis.raf)
- next/image for every image, next/font for fonts, lucide-react for icons
- Structure: app/page.tsx composes components/sections/{Navbar,Hero,Story,Destinations,Discover,Trusted,Community,Testimonials,Faq,FooterCta}.tsx; shared UI in components/ui (ArrowPill, IconCircle, SectionLabel); all copy and data in lib/content.ts; tokens in app/globals.css (@theme).

==================================================
2. IMAGES (already in /public/images — use these exact names)
==================================================
hero-villa-night.jpg          16:9   hero background
hero-foreground.png           16:9   transparent cutout of the house + trees (sits IN FRONT of the wordmark)
dest-vista-grand-suites.jpg   6:5    bento large card
dest-mountain-peak-lodge.jpg  4:3    bento small card top
dest-ocean-view-resort.jpg    4:3    bento small card bottom
stay-city-center.jpg          1:1    carousel card 1
stay-tropical-paradise.jpg    1:1    carousel card 2
stay-pinecone-lodge.jpg       1:1    carousel card 3
stay-lakeside-retreat.jpg     1:1    carousel card 4
stay-desert-dune-camp.jpg     1:1    carousel card 5
float-forest-cabin.jpg        1:1    community floating image left
float-jungle-hut.jpg          1:1    community floating image right
float-edge-misty-lake.jpg     3:4    community edge tile, cropped by left viewport edge
float-edge-glacier.jpg        3:4    community edge tile, cropped by right viewport edge
avatar-sarah.jpg              1:1    testimonial 1
avatar-daniel.jpg             1:1    testimonial 2
avatar-mei.jpg                1:1    testimonial 3
faq-infinity-pool.jpg         5:4    FAQ side image
footer-cabin-night.jpg        16:9   footer CTA background
og-image.jpg                  1.91:1 Open Graph / social share
Rules: next/image with fill + object-cover + correct sizes; priority only on the hero; descriptive alt text. If a file is missing, render a teal-to-black gradient box of the same aspect ratio so layout never breaks. Never use remote placeholder URLs.

==================================================
3. DESIGN TOKENS
==================================================
Colors:
  night-900 #071A20   footer, dark card
  night-700 #0F2F38   hero teal
  ink       #121414   headings
  ink-muted #6B7072   body text
  ink-faint #B4B9BB   un-revealed scroll text, quote marks
  paper     #FFFFFF   main sections
  mist      #F5F6F5   alternate sections (destinations, testimonial)
  line      #E6E8E7   dividers, FAQ rules, pill borders
  accent    #EC8A2E   orange — buttons, arrows, stars, active carousel button (hover #D97818)
Typography: Geist Sans via next/font (fallback Inter, system-ui). Headings weight 500, letter-spacing -0.03em, line-height 1.05, text-wrap balance.
  Hero H1 clamp(44px, 6vw, 88px) · Section H2 clamp(32px, 3.6vw, 52px) · Story statement clamp(26px, 2.6vw, 40px) · Body 15–16px · Micro labels 13px ink-muted, sentence case (no uppercase) · Giant wordmark clamp(160px, 24vw, 420px) weight 600 letter-spacing -0.05em.
Shape: card radius 20px, small image radius 16px, pills fully rounded. Container max-width 1280px; gutter 20px mobile / 48px desktop. Section padding 120px desktop / 72px mobile.
Components:
  ArrowPill — white bg, 1px line border, label text + 32px orange circle with an up-right arrow (↗). Hover: circle rotates 45°, background tints mist. Variant "solid": orange pill with white circle.
  IconCircle — 40px round button; ghost (line border, ink chevron) or filled orange (white chevron).
  Stars — orange star icon + "(4.9 out of 5)" in 12px.

==================================================
4. SECTIONS (in this order)
==================================================
[1] NAVBAR — transparent, overlaid on the hero. Left links "Explore Hotels · Deals & Offers · Destinations" (13px, white/80). Right: orange "Sign In" pill. 1px white/15 rule under the bar. After the hero: becomes a sticky white/80 backdrop-blur bar with dark text; hides on scroll down, shows on scroll up. Mobile: menu button opens a full-screen night-700 overlay with large links that stagger in.

[2] HERO — on desktop the hero sits inside a rounded 28px frame inset 12px from the viewport (like the reference); full-bleed on mobile. Height ~92svh, min 640px.
  Layer order (bottom→top): hero-villa-night.jpg → giant wordmark "Veyra" (white, 22% opacity, centered horizontally, top ~8%) → hero-foreground.png (house and trees in front of the letters for a depth effect) → bottom gradient (transparent → #071A20 at 75%) → content. If the cutout is missing, mask the wordmark with a linear-gradient so it fades out toward the roofline, exactly like the reference.
  Content: bottom-left H1 in two lines "Find Your Perfect Stay / at the Best Price" (white). Bottom-right glass search bar, 360×52px: bg white/10, backdrop-blur 12px, border white/20, placeholder "Search hotel", orange "Search" pill inside on the right. Mobile: search bar goes full width under the H1.
  Motion — load timeline: image from scale 1.15 + blur(24px) + brightness(0.6) to normal over 1.6s (expo.out); wordmark letters rise from yPercent 60 with opacity, stagger 0.06; H1 lines mask-reveal (SplitText lines, yPercent 100 → 0, stagger 0.12); search bar fades up last. Scroll (scrub): background yPercent 0→12 and scale 1→1.08; wordmark moves up faster (yPercent -35) and fades; foreground cutout moves slower than the wordmark (parallax depth); H1 drifts up 40px.

[3] OUR STORY — paper bg. 12-col grid, 4/8 split.
  Left column: label "Our Story" at top; at the bottom, a 13px paragraph: "Trusted by over **10 million travelers** worldwide, we're proud to deliver top-rated stays with an average **rating of 4.8★**. Your comfort and satisfaction are always our top priority." (bold parts in ink).
  Right column: statement "From city escapes to beachside retreats, we connect you with hotels that fit your lifestyle wherever the journey takes you." then ArrowPill "Learn More".
  Signature motion: SplitText the statement into characters; start every char at ink-faint; ScrollTrigger scrub from "top 75%" to "bottom 50%" animates color to ink with a stagger so the sentence inks in left-to-right as you scroll.

[4] OUR MOST AMAZING DESTINATION — mist bg. Header row: H2 "Our most Amazing / Destination" left, ArrowPill "Explore Now" right.
  Bento grid: large card spans ~62% width and two rows (6:5); right column has two stacked 4:3 cards. Each card: cover image, radius 20, bottom gradient black/65, title (32px large card, 22px small) in white, meta row with map-pin icon + location · orange star + rating, bottom-right 36px glass circle with ↗.
  Data: Vista Grand Suites — Phuket, Thailand — 5 out of 5 · Mountain Peak Lodge — Aspen, Colorado — 4.9 out of 5 · Ocean View Resort — Bali, Indonesia — 4.8 out of 5.
  Motion: cards reveal with clip-path inset(100% 0 0 0) → inset(0) staggered 0.15 while the inner image scales 1.2 → 1. Hover: image scale 1.06 over 0.8s, arrow circle turns orange and rotates 45°. Mobile: single column.

[5] DISCOVER YOUR IDEAL DESTINATION — paper bg. H2 "Discover Your / Ideal Destination" left; right: ghost IconCircle (‹) and orange IconCircle (›).
  Horizontal carousel that bleeds off the right edge of the viewport (about 4.3 cards visible on desktop, 1.2 on mobile). Native scroll-snap + pointer drag; arrows scroll by one card with a GSAP tween; arrows disable at the ends.
  Card: 1:1 image radius 16; below: name (15px ink) with price right-aligned (18px, weight 500) and "/ night" in muted 12px; then map-pin + location (12px muted).
  Data: City Center Apartments — $150 — New York, USA · Tropical Paradise Resort — $110 — Maui, Hawaii · Pinecone Lodge — $85 — Lake Tahoe, California · Lakeside Retreat — $95 — Lake Bled, Slovenia · Desert Dune Camp — $120 — Wadi Rum, Jordan.
  Motion: cards slide in from x 80 + opacity, stagger 0.08. Hover: image zoom 1.05.

[6] TRUSTED STAYS + PARTNERS — paper bg, centered. Label "Explore Hotels"; H2 "Trusted Stays, Seamless / Booking Explore Now!"; sub "Discover top hotels near you with just a tap — effortless booking, ultimate comfort."; solid ArrowPill "Get Started"; under it a 12px line with a shield icon: "Pause or cancel anytime".
  Partner marquee: infinite horizontal loop (GSAP, seamless duplicate track, pauses on hover) of 7 invented hotel wordmarks set as styled text in mixed letterforms — e.g. "AURELIA" (wide-spaced serif), "| Halden |" (bold serif with bars), "ROSEMONT · Hotels & Resorts" (small-caps serif), "Juniper" (script-like italic), "KESTREL" (thin sans), "Maison Ombre", "NORDLYS". Grey, opacity 0.55, edges faded with mask-image. Do NOT use real hotel brand names or logos.

[7] COMMUNITY / NEWSLETTER — continues on paper bg. Center: dark card (night-900 / #0B0E0F, radius 20, ~400×290) with the centered white line "Join our community of travelers and experience unforgettable stays." and an email pill (bg white/10, border white/15, placeholder "you@email.com") with a white circular ↗ submit button.
  Floating images around it: float-forest-cabin (≈210px square, radius 16) left of the card and slightly lower; float-jungle-hut (≈200px) right of the card and further down; float-edge-misty-lake and float-edge-glacier as tall 3:4 tiles half-cropped by the left and right viewport edges, near card height.
  Motion: each floating image gets its own scrub parallax speed (between y -80 and +80) and a 1–2° rotation drift; the card scales 0.92 → 1 on enter. Form: client-side email validation, inline error "Enter a valid email, like name@example.com", success state "You're on the list ✓" (no network call). Mobile: hide the edge tiles, put the two floating images in a row above the card.

[8] TESTIMONIALS — mist bg. 5/7 grid.
  Left: label "Testimonial"; 20px text "Here's what people have to say about working together. Real moments, real experiences, real feedback."; at the bottom a ghost (‹) and orange (›) IconCircle.
  Right: big quote mark (two ink-faint rounded quote glyphs, 72px) to the left of the quote column; H3 (40px) quote title; 14px muted body; author row: 36px round avatar + name + stars.
  Data:
   1. Sarah Ahmed — "Exactly What We Needed — Smooth & Stress-Free!" — "The booking process was incredibly smooth, and the hotel was exactly as shown. Clean, comfortable, and located right where we needed. This platform made our vacation stress-free!" — 5 out of 5
   2. Daniel Okafor — "Found Our Dream Cabin in Ten Minutes" — "We searched by lake and forest, compared three cabins side by side and booked in minutes. The photos matched reality and check-in was effortless." — 5 out of 5
   3. Mei Lin — "The Best Rate We've Ever Booked" — "Same resort, same dates, and noticeably cheaper than anywhere else we checked. Support answered within minutes when we changed our flight." — 4.9 out of 5
  Motion: on change, the outgoing quote fades up with blur(8px); incoming title words rise via SplitText (stagger 0.04). Auto-advance every 7s, pause on hover/focus, arrow keys work when focused.

[9] FAQ — paper bg. Top row: label "FAQs", H2 "Got Questions? / We're Here to Help." left; right-aligned 13px muted paragraph (max 44ch): "Find quick answers to common questions about booking, cancellations, payments, and more — so you can travel with confidence."
  Below: accordion (left, ~48%) + faq-infinity-pool.jpg (right, radius 20, sticky top 120px on desktop).
  Accordion: 1px line separators, question 15px ink, chevron rotates 180° when open, answer height animates smoothly (grid-template-rows 0fr → 1fr or GSAP height auto), one item open at a time, the first open by default, proper aria-expanded/aria-controls.
  Q&A:
   - How do I find the best deals on Veyra? — We compare prices from hundreds of trusted travel sites in real time to help you find the best deal for your ideal stay, whether it's a luxury resort or a cozy cabin.
   - Is it safe to book through Veyra? — Yes. Payments are encrypted and processed by certified providers, and every property is verified before it is listed.
   - Can I cancel or change my reservation? — Most stays offer free cancellation up to 48 hours before check-in. Your booking page shows the exact policy and a one-click change option.
   - Do I need an account to book? — No. You can book as a guest with just your email. An account lets you save favorites and manage trips in one place.
   - Are taxes and fees included in the prices shown? — The final price, including taxes and fees, is shown before you pay. Toggle "Show total price" to see it on every card.
   - How do I contact customer support? — Our team is available 24/7 by chat and at support@veyra.com, with an average reply time under five minutes.
  Motion: image clip-path reveal from the bottom + scale 1.15 → 1; accordion rows fade up staggered.

[10] FOOTER CTA — full-bleed, footer-cabin-night.jpg with an overlay (night-900 at 60%, darker at the top).
  Centered: H2 "Discover Places You'll / Never Want to Leave" (white, 56px), sub (white/60, max 60ch) "Your next great stay is waiting. Explore a wide range of handpicked hotels and cozy stays, all tailored to make your journey smooth and memorable. Booking has never been this easy.", orange pill "Plan Your Stay".
  Lower-left contact block (13px, white/80): "Veyra HQ / 45 Greenview Avenue, / New York, NY 10001, USA / Email: support@veyra.com / Phone: +1 (212) 555-0134". Right, same baseline: Facebook · Instagram · YouTube · Twitter · LinkedIn (13px white/70, hover white with underline slide).
  Giant wordmark "Veyra" in white, weight 600, sized to span the full container width (compute with vw / fit-text), sitting above the legal row.
  Legal row: "©2025 Veyra. All Rights Reserved" left; "Privacy Policy · Terms of Use · Legal Disclaimer · Cookie Policy" right.
  Motion: heading words blur in (blur 12px → 0, y 20 → 0, stagger 0.06) when the section enters; giant wordmark letters rise from yPercent 100 with stagger, scrubbed as the footer scrolls into view; background image scales 1.1 → 1.

==================================================
5. MOTION RULES
==================================================
- Every animation lives in useGSAP with a scope ref, so it cleans up on unmount; register plugins once in a client-only lib/gsap.ts.
- Animate only transform, opacity, clip-path (and filter for the hero intro and blur-ins).
- Text and images must be visible without JavaScript: render real HTML server-side; set initial hidden states with gsap.set inside useGSAP, never with CSS opacity: 0.
- gsap.matchMedia: under prefers-reduced-motion, skip all motion and show everything in its final state; below 768px, turn off heavy scrub parallax and keep only simple fade-ups.
- Eases: expo.out / power3.out for reveals, none for scrubs. Durations 0.8–1.2s. Never bouncy.
- Call ScrollTrigger.refresh() after fonts and images load.

==================================================
6. RESPONSIVE, ACCESSIBILITY, SEO
==================================================
- Breakpoints 390 / 768 / 1024 / 1440. No horizontal page scroll at any width. Touch targets ≥ 44px.
- Semantic landmarks (header, main, section with aria-labelledby, footer), one H1, logical heading order, visible orange focus rings (2px, offset 2px), keyboard-operable carousel, testimonial slider and accordion.
- Metadata: title "Veyra — Find Your Perfect Stay at the Best Price", description, Open Graph + Twitter card using og-image.jpg, favicon (a simple "V" in the orange accent).
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Images in AVIF/WebP via next/image, fonts with display swap, no layout shift on load.

==================================================
7. DONE MEANS
==================================================
1. npm run dev works; npm run build passes with zero TypeScript and ESLint errors.
2. With Playwright, take full-page and per-section screenshots at 1440, 1024, 768 and 390 px; review each one against this brief (spacing, alignment, cropping, text contrast over images) and fix every issue before finishing.
3. Scroll through the whole page and confirm each signature animation: hero intro, wordmark depth, story ink-in, bento reveal, carousel, marquee, floating parallax, testimonial change, accordion, footer wordmark rise.
4. Give me a short summary of what was built and anything I should replace (brand name, copy, images).
