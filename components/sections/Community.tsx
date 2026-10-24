"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { community } from "@/lib/content";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Floating({
  src,
  alt,
  speed,
  rotate,
  className,
}: {
  src: string;
  alt: string;
  speed: number;
  rotate: number;
  className: string;
}) {
  return (
    <div data-speed={speed} data-rotate={rotate} className={`float-img overflow-hidden rounded-[16px] bg-night-700 ${className}`}>
      <div className="relative h-full w-full">
        <Photo src={src} alt={alt} sizes="220px" />
      </div>
    </div>
  );
}

export function Community() {
  const root = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        gsap.utils.toArray<HTMLElement>(".float-img").forEach((el) => {
          const speed = Number(el.dataset.speed);
          const rot = Number(el.dataset.rotate);
          gsap.fromTo(
            el,
            { y: -speed, rotation: -rot },
            { y: speed, rotation: rot, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
      });
      mm.add(MQ.motion, () => {
        gsap.from(".community-card", {
          scale: 0.92,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".community-card", start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState(EMAIL.test(email.trim()) ? "done" : "error");
  };

  return (
    <section ref={root} aria-labelledby="community-title" className="relative overflow-hidden bg-paper pb-[72px] pt-14 md:pb-[120px] md:pt-16">
      <Floating
        src="/images/float-edge-misty-lake.jpg"
        alt=""
        speed={40}
        rotate={0}
        className="absolute -left-[110px] top-[60px] hidden h-[240px] w-[180px] md:block"
      />
      <Floating
        src="/images/float-edge-glacier.jpg"
        alt=""
        speed={-50}
        rotate={0}
        className="absolute -right-[110px] top-[40px] hidden h-[240px] w-[180px] md:block"
      />

      <div className="container-x relative flex flex-col items-center gap-5 md:block md:h-[420px]">
        <div className="flex w-full max-w-[420px] gap-4 md:contents">
          <Floating
            src="/images/float-forest-cabin.jpg"
            alt="Black timber cabin with glowing windows above a forest pond"
            speed={-70}
            rotate={1.5}
            className="aspect-square flex-1 md:absolute md:left-[12%] md:top-[110px] md:size-[210px] md:flex-none lg:left-[16%]"
          />
          <Floating
            src="/images/float-jungle-hut.jpg"
            alt="Thatched stilt hut on a misty jungle river"
            speed={80}
            rotate={-2}
            className="aspect-square flex-1 md:absolute md:right-[12%] md:top-[170px] md:size-[200px] md:flex-none lg:right-[16%]"
          />
        </div>

        <div className="community-card relative z-10 flex w-full max-w-[400px] flex-col justify-between gap-8 rounded-[20px] bg-[#0b0e0f] p-7 text-white md:absolute md:left-1/2 md:top-10 md:h-[290px] md:-translate-x-1/2">
          <p id="community-title" className="text-center text-lg leading-snug">
            {community.line}
          </p>

          {state === "done" ? (
            <p role="status" className="flex h-[52px] items-center justify-center gap-2 rounded-full bg-white/10 text-sm">
              <Check className="size-4 text-accent" aria-hidden="true" />
              You&apos;re on the list
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div
                className={`flex h-[52px] items-center rounded-full border bg-white/10 pl-5 pr-1.5 transition-colors ${
                  state === "error" ? "border-accent" : "border-white/15 focus-within:border-white/40"
                }`}
              >
                <label htmlFor="community-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="community-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  value={email}
                  aria-invalid={state === "error"}
                  aria-describedby={state === "error" ? "community-error" : undefined}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error") setState("idle");
                  }}
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Join the community"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-500 hover:rotate-45"
                >
                  <ArrowUpRight className="size-[18px]" />
                </button>
              </div>
              {state === "error" && (
                <p id="community-error" role="alert" className="mt-2 pl-5 text-xs text-accent">
                  Enter a valid email, like name@example.com
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
