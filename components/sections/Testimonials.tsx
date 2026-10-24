"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconCircle } from "@/components/ui/IconCircle";
import { SectionLabel, Stars } from "@/components/ui/bits";
import { testimonials } from "@/lib/content";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";

function QuoteMark() {
  return (
    <svg viewBox="0 0 72 56" className="h-14 w-[72px] text-ink-faint" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0h18a6 6 0 0 1 6 6v20c0 14-8 26-22 30a3 3 0 0 1-3-4c5-5 7-10 7-16H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8Zm40 0h18a6 6 0 0 1 6 6v20c0 14-8 26-22 30a3 3 0 0 1-3-4c5-5 7-10 7-16h-6a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8Z"
      />
    </svg>
  );
}

export function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const quote = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const busy = useRef(false);
  const first = useRef(true);
  const t = testimonials[index];

  const { contextSafe } = useGSAP({ scope: root });

  const go = useCallback(
    (dir: 1 | -1) => {
      const next = (index + dir + testimonials.length) % testimonials.length;
      if (busy.current) return;
      if (prefersReducedMotion() || !quote.current) {
        setIndex(next);
        return;
      }
      busy.current = true;
      contextSafe(() => {
        gsap.to(quote.current, {
          y: -16,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => setIndex(next),
        });
      })();
    },
    [index, contextSafe],
  );

  // Incoming quote: title words rise, body and author fade up.
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      gsap.set(quote.current, { y: 0, opacity: 1, filter: "none" });
      if (prefersReducedMotion()) {
        busy.current = false;
        return;
      }
      const split = SplitText.create(".quote-title", { type: "words", mask: "words" });
      const tl = gsap.timeline({ onComplete: () => void (busy.current = false) });
      tl.from(split.words, { yPercent: 100, duration: 0.7, stagger: 0.04, ease: "power3.out" }).from(
        ".quote-rest",
        { y: 14, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" },
        0.15,
      );
      return () => split.revert();
    },
    { scope: root, dependencies: [index], revertOnUpdate: true },
  );

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = window.setTimeout(() => go(1), 7000);
    return () => window.clearTimeout(id);
  }, [paused, go, index]);

  return (
    <section
      ref={root}
      aria-labelledby="testimonial-title"
      aria-roledescription="carousel"
      className="section-y bg-mist"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="container-x grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col justify-between gap-10 md:col-span-5">
          <div>
            <SectionLabel>
              <span id="testimonial-title">Testimonial</span>
            </SectionLabel>
            <p className="mt-4 max-w-[30ch] text-xl leading-snug text-ink-muted">
              Here&apos;s what people have to say about working together. Real moments, real experiences, real feedback.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IconCircle direction="prev" label="Previous testimonial" onClick={() => go(-1)} />
            <IconCircle direction="next" label="Next testimonial" onClick={() => go(1)} filled />
            <span className="ml-3 text-xs tabular-nums text-ink-muted" aria-hidden="true">
              {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="flex gap-6 md:col-span-7 md:gap-10">
          <div className="hidden shrink-0 pt-2 sm:block">
            <QuoteMark />
          </div>
          <div ref={quote} aria-live="polite" className="min-h-[300px] min-w-0">
            <h3 key={`t-${index}`} className="quote-title text-[clamp(30px,3vw,40px)]">
              {t.title}
            </h3>
            <p className="quote-rest mt-5 max-w-[56ch] text-sm leading-relaxed text-ink-muted">{t.body}</p>
            <div className="quote-rest mt-6 flex items-center gap-3">
              <span className="relative size-9 overflow-hidden rounded-full bg-line">
                <Image src={t.avatar} alt={t.name} fill sizes="36px" className="object-cover" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium">{t.name}</span>
                <Stars rating={t.rating} className="text-ink-muted" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
