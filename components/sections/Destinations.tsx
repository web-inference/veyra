"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ArrowPill } from "@/components/ui/ArrowPill";
import { Place, Stars } from "@/components/ui/bits";
import { Photo } from "@/components/ui/Photo";
import { destinations, type Destination } from "@/lib/content";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

function DestinationCard({ d, large }: { d: Destination; large?: boolean }) {
  return (
    <a
      href="#discover"
      className={`dest-card group relative block overflow-hidden rounded-[20px] bg-night-700 ${
        large ? "aspect-[6/5] md:aspect-auto md:h-full" : "aspect-[4/3]"
      }`}
    >
      <div className="dest-media absolute inset-0">
        <Photo
          src={d.image}
          alt={d.alt}
          sizes={large ? "(min-width: 768px) 62vw, 100vw" : "(min-width: 768px) 38vw, 100vw"}
          className="transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
        <div className="text-white">
          <h3 className={large ? "text-[clamp(24px,2.4vw,32px)]" : "text-[22px]"}>{d.name}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-white/85">
            <Place>{d.location}</Place>
            <Stars rating={d.rating} />
          </div>
        </div>
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition-[background-color,transform,border-color] duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </a>
  );
}

export function Destinations() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const st = { trigger: ".dest-grid", start: "top 80%" };
        gsap.fromTo(
          ".dest-card",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, stagger: 0.15, ease: "expo.out", clearProps: "clipPath", scrollTrigger: st },
        );
        gsap.from(".dest-media", { scale: 1.2, duration: 1.4, stagger: 0.15, ease: "expo.out", scrollTrigger: st });
      });
    },
    { scope: root },
  );

  const [large, ...small] = destinations;

  return (
    <section id="destinations" ref={root} aria-labelledby="dest-title" className="section-y bg-mist">
      <div className="container-x">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <h2 id="dest-title" className="h2">
            Our most Amazing
            <br />
            Destination
          </h2>
          <ArrowPill href="#discover">Explore Now</ArrowPill>
        </div>
        <div className="dest-grid grid gap-4 md:grid-cols-[1.62fr_1fr] md:gap-5">
          <div className="md:row-span-2">
            <DestinationCard d={large} large />
          </div>
          {small.map((d) => (
            <DestinationCard key={d.name} d={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
