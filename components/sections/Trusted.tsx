"use client";

import { useRef } from "react";
import { ShieldCheck } from "lucide-react";
import { ArrowPill } from "@/components/ui/ArrowPill";
import { SectionLabel } from "@/components/ui/bits";
import { trusted } from "@/lib/content";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** Invented partner wordmarks, set as type so no real brand marks are used. */
function PartnerMarks() {
  return (
    <>
      <span className="font-serif text-[19px] tracking-[0.38em]">AURELIA</span>
      <span className="font-serif text-[26px] font-bold">
        <span className="font-light">|</span> Halden <span className="font-light">|</span>
      </span>
      <span className="flex flex-col items-center font-serif leading-none">
        <span className="text-[20px] tracking-[0.06em]">ROSEMONT</span>
        <span className="mt-1 text-[8px] tracking-[0.3em]">HOTELS &amp; RESORTS</span>
      </span>
      <span className="font-serif text-[30px] italic">Juniper</span>
      <span className="text-[20px] font-extralight tracking-[0.32em]">KESTREL</span>
      <span className="flex flex-col items-center leading-none">
        <span className="font-serif text-[24px] italic">Maison Ombre</span>
        <span className="mt-1 text-[8px] tracking-[0.35em]">PARIS · LISBOA</span>
      </span>
      <span className="text-[19px] font-semibold tracking-[0.16em]">NORDLYS</span>
    </>
  );
}

export function Trusted() {
  const root = useRef<HTMLElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const loop = gsap.to(".marquee-track", { xPercent: -50, duration: 32, ease: "none", repeat: -1 });
        gsap.from(".trusted-in", {
          y: 24,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
        return () => loop.kill();
      });
    },
    { scope: root },
  );

  const setSpeed = contextSafe((scale: number) => {
    const tween = gsap.getTweensOf(root.current?.querySelector(".marquee-track") ?? null)[0];
    if (tween) gsap.to(tween, { timeScale: scale, duration: 0.6, ease: "power2.out" });
  });

  return (
    <section id="trusted" ref={root} aria-labelledby="trusted-title" className="bg-paper pt-[72px] md:pt-[120px]">
      <div className="container-x flex flex-col items-center text-center">
        <SectionLabel className="trusted-in">{trusted.label}</SectionLabel>
        <h2 id="trusted-title" className="h2 trusted-in mt-4">
          {trusted.titleLines[0]}
          <br />
          {trusted.titleLines[1]}
        </h2>
        <p className="trusted-in mt-5 max-w-[46ch] text-[15px] text-ink-muted">{trusted.sub}</p>
        <div className="trusted-in mt-8">
          <ArrowPill href="#discover" variant="solid">
            Get Started
          </ArrowPill>
        </div>
        <p className="trusted-in mt-3 inline-flex items-center gap-1.5 text-xs text-ink-muted">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          {trusted.note}
        </p>
      </div>

      <div
        className="marquee mt-14 overflow-hidden text-ink/55 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)] md:mt-16"
        onMouseEnter={() => setSpeed(0)}
        onMouseLeave={() => setSpeed(1)}
        aria-label="Partner hotel groups"
        role="group"
      >
        <div className="marquee-track flex w-max items-center">
          <div className="flex items-center gap-16 px-8 md:gap-24 md:px-12">
            <PartnerMarks />
          </div>
          <div className="flex items-center gap-16 px-8 md:gap-24 md:px-12" aria-hidden="true">
            <PartnerMarks />
          </div>
        </div>
      </div>
    </section>
  );
}
