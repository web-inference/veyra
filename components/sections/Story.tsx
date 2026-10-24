"use client";

import { useRef } from "react";
import { ArrowPill } from "@/components/ui/ArrowPill";
import { SectionLabel } from "@/components/ui/bits";
import { story } from "@/lib/content";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";

export function Story() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const split = SplitText.create(".story-statement", { type: "words,chars" });
        gsap.fromTo(
          split.chars,
          { color: "#b4b9bb" },
          {
            color: "#121414",
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: ".story-statement", start: "top 75%", end: "bottom 50%", scrub: true },
          },
        );
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="story-title" className="section-y bg-paper">
      <div className="container-x grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col justify-between gap-8 md:col-span-4">
          <SectionLabel>
            <span id="story-title">{story.label}</span>
          </SectionLabel>
          <p className="order-last max-w-[34ch] text-[13px] leading-relaxed text-ink-muted md:order-none">
            Trusted by over <strong className="font-semibold text-ink">10 million travelers</strong> worldwide, we&apos;re
            proud to deliver top-rated stays with an average <strong className="font-semibold text-ink">rating of 4.8★</strong>.
            Your comfort and satisfaction are always our top priority.
          </p>
        </div>
        <div className="md:col-span-8">
          <p className="story-statement text-[clamp(26px,2.6vw,40px)] leading-[1.2] font-medium tracking-[-0.02em] text-ink">
            {story.statement}
          </p>
          <ArrowPill href="#destinations" className="mt-10">
            Learn More
          </ArrowPill>
        </div>
      </div>
    </section>
  );
}
