"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionLabel } from "@/components/ui/bits";
import { Photo } from "@/components/ui/Photo";
import { faqs } from "@/lib/content";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

export function Faq() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          ".faq-media",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.3,
            ease: "expo.out",
            clearProps: "clipPath",
            scrollTrigger: { trigger: ".faq-media", start: "top 80%" },
          },
        );
        gsap.from(".faq-media-inner", {
          scale: 1.15,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: { trigger: ".faq-media", start: "top 80%" },
        });
        gsap.from(".faq-row", {
          y: 24,
          opacity: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-list", start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="faq" ref={root} aria-labelledby="faq-title" className="section-y bg-paper">
      <div className="container-x">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div>
            <SectionLabel>FAQs</SectionLabel>
            <h2 id="faq-title" className="h2 mt-4">
              Got Questions?
              <br />
              We&apos;re Here to Help.
            </h2>
          </div>
          <p className="max-w-[44ch] text-[13px] leading-relaxed text-ink-muted md:text-right">
            Find quick answers to common questions about booking, cancellations, payments, and more — so you can travel
            with confidence.
          </p>
        </div>

        <div className="grid items-start gap-10 md:grid-cols-[1fr_1.08fr] md:gap-12">
          <ul className="faq-list border-t border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="faq-row border-b border-line">
                  <h3 className="text-[15px] font-normal tracking-normal">
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex min-h-[60px] w-full items-center justify-between gap-6 py-4 text-left text-ink"
                    >
                      <span className={isOpen ? "font-medium" : ""}>{f.q}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`size-4 shrink-0 text-ink-muted transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden" inert={!isOpen}>
                      <p className="max-w-[54ch] pb-5 text-[13px] leading-relaxed text-ink-muted">{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="faq-media relative aspect-[5/4] overflow-hidden rounded-[20px] bg-night-700 md:sticky md:top-[120px]">
            <div className="faq-media-inner absolute inset-0">
              <Photo
                src="/images/faq-infinity-pool.jpg"
                alt="A couple relaxing in a sunken lounge in an infinity pool at sunset, palm trees behind"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
