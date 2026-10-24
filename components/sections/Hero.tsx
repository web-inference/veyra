"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import heroBg from "@/public/images/hero-villa-night.jpg";
import heroFg from "@/public/images/hero-foreground.png";
import { brand, hero } from "@/lib/content";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";

const imgPosition = "object-[62%_50%] md:object-center";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  // Hold the intro until both photo layers are decoded, so they reveal together
  // instead of popping in over an empty frame. Gives up waiting after 4s.
  useEffect(() => {
    const imgs = Array.from(root.current?.querySelectorAll<HTMLImageElement>(".hero-img img") ?? []);
    const loaded = imgs.map((img) =>
      img.complete
        ? img.decode().catch(() => undefined)
        : new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          }),
    );
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        setReady(true);
      }
    };
    Promise.all(loaded).then(finish);
    const timeout = window.setTimeout(finish, 4000);
    return () => window.clearTimeout(timeout);
  }, []);

  useGSAP(
    () => {
      if (!ready) return;
      root.current?.classList.remove("hero-pending");
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const split = SplitText.create(".hero-title", { type: "lines", mask: "lines" });
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(
          ".hero-img",
          { opacity: 0, scale: 1.08, filter: "blur(12px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out", clearProps: "filter" },
        )
          .fromTo(".wm-letter", { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.06, duration: 1.2 }, 0.35)
          .from(split.lines, { yPercent: 100, stagger: 0.12, duration: 1 }, 0.5)
          .fromTo(".hero-search", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.9);
        return () => split.revert();
      });

      mm.add(MQ.desktop, () => {
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        // Photo and cutout move together; only the wordmark moves faster, which sells the depth.
        gsap.to(".hero-layer", { yPercent: 12, scale: 1.08, ease: "none", scrollTrigger: st });
        gsap.to(".hero-wm", { yPercent: -40, ease: "none", scrollTrigger: st });
        gsap.to(".hero-content", { y: -40, ease: "none", scrollTrigger: st });
      });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section id="hero" ref={root} aria-labelledby="hero-title" className="hero-pending md:p-3">
      <div className="relative isolate h-[92svh] min-h-[640px] overflow-hidden bg-night-700 md:rounded-[28px]">
        <div className="hero-layer absolute inset-0 will-change-transform">
          {/* Tiny blurred preview of the photo, painted on first frame so the hero never opens on a blank block. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 scale-110 bg-cover bg-[62%_50%] blur-2xl md:bg-center"
            style={{ backgroundImage: `url(${heroBg.blurDataURL})` }}
          />
          <div className="hero-img absolute inset-0">
            <Image
              src={heroBg}
              alt="Modern glass villa glowing at blue hour on the edge of a still lake"
              fill
              sizes="100vw"
              priority
              draggable={false}
              className={`object-cover ${imgPosition}`}
            />
          </div>
        </div>

        {/* Wordmark sits in the open sky, top-left; the cutout below hides its lower edge behind the treeline. */}
        <div className="hero-wm pointer-events-none absolute inset-x-0 top-[11%]" aria-hidden="true">
          <div className="container-x md:px-[60px]">
            <span className="flex select-none text-[clamp(88px,17vw,300px)] leading-[0.8] font-semibold tracking-[-0.05em] text-white/25">
              {brand.name.split("").map((ch, i) => (
                <span key={i} className="wm-letter inline-block">
                  {ch}
                </span>
              ))}
            </span>
          </div>
        </div>

        <div className="hero-layer absolute inset-0 will-change-transform">
          <div className="hero-img absolute inset-0">
            <Image
              src={heroFg}
              alt=""
              fill
              sizes="100vw"
              priority
              draggable={false}
              className={`object-cover ${imgPosition}`}
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,32,0.4)_0%,transparent_18%,transparent_42%,rgba(7,26,32,0.55)_62%,rgba(7,26,32,0.88)_100%)]" />

        <div className="hero-content absolute inset-x-0 bottom-0 pb-8 md:pb-12">
          <div className="container-x flex flex-col gap-6 md:px-[60px] xl:flex-row xl:items-end xl:justify-between">
            <h1 id="hero-title" className="hero-title text-[clamp(38px,calc(4.6vw+12px),84px)] text-white">
              {hero.titleLines.map((line) => (
                <span key={line} className="block sm:whitespace-nowrap">
                  {line}
                </span>
              ))}
            </h1>
            <form
              role="search"
              onSubmit={(e) => e.preventDefault()}
              className="hero-search flex h-[52px] w-full items-center rounded-full border border-white/20 bg-white/10 pl-5 pr-1.5 backdrop-blur-md md:max-w-[420px] xl:w-[360px] xl:shrink-0"
            >
              <label htmlFor="hero-search" className="sr-only">
                Search hotel
              </label>
              <input
                id="hero-search"
                type="search"
                placeholder={hero.searchPlaceholder}
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/70 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-10 items-center rounded-full bg-accent px-5 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
