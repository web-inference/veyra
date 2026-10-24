"use client";

import { useRef } from "react";
import { Photo } from "@/components/ui/Photo";
import { brand, footer } from "@/lib/content";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";

export function FooterCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const split = SplitText.create(".footer-title", { type: "words" });
        gsap.from(split.words, {
          y: 20,
          opacity: 0,
          filter: "blur(12px)",
          duration: 1,
          stagger: 0.06,
          ease: "power3.out",
          clearProps: "filter",
          scrollTrigger: { trigger: ".footer-title", start: "top 85%" },
        });
        gsap.from(".footer-in", {
          y: 16,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: { trigger: ".footer-title", start: "top 85%" },
        });
        gsap.from(".footer-letter", {
          yPercent: 100,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".footer-wordmark", start: "top bottom", end: "bottom 95%", scrub: true },
        });
        return () => split.revert();
      });
      mm.add(MQ.desktop, () => {
        gsap.fromTo(
          ".footer-bg",
          { scale: 1.1 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} aria-labelledby="footer-title" className="relative isolate overflow-hidden bg-night-900 text-white">
      <div className="footer-bg absolute inset-0 -z-10">
        <Photo
          src="/images/footer-cabin-night.jpg"
          alt="A glass cabin glowing amber deep in a dark pine forest at night"
          sizes="100vw"
          className="object-[50%_70%]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,26,32,0.85)_0%,rgba(7,26,32,0.55)_45%,rgba(7,26,32,0.7)_100%)]" />

      <div className="container-x flex flex-col items-center pt-24 text-center md:pt-32">
        <h2 id="footer-title" className="footer-title text-[clamp(36px,4.4vw,56px)]">
          {footer.titleLines[0]}
          <br />
          {footer.titleLines[1]}
        </h2>
        <p className="footer-in mt-5 max-w-[60ch] text-[14px] text-white/60">{footer.sub}</p>
        <a
          href="#hero"
          className="footer-in mt-8 inline-flex min-h-11 items-center rounded-full bg-accent px-7 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Plan Your Stay
        </a>
      </div>

      <div className="container-x mt-24 md:mt-40">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <address className="text-[13px] not-italic leading-relaxed text-white/80">
            {brand.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block">Email: {brand.email}</span>
            <span className="block">Phone: {brand.phone}</span>
          </address>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/70">
            {footer.socials.map((s) => (
              <li key={s}>
                <a
                  href="#"
                  className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size,color] duration-500 hover:bg-[length:100%_1px] hover:text-white"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p
          className="footer-wordmark @container mt-6 overflow-hidden text-center leading-[0.8] font-semibold text-white"
          aria-hidden="true"
        >
          <span className="inline-flex text-[37.8cqi] tracking-[-0.05em]">
            {brand.name.split("").map((ch, i) => (
              <span key={i} className="footer-letter inline-block pb-[0.2em]">
                {ch}
              </span>
            ))}
          </span>
        </p>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>©2025 {brand.name}. All Rights Reserved</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.legal.map((l) => (
              <li key={l}>
                <a href="#" className="transition-colors hover:text-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
