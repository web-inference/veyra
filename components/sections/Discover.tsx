"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IconCircle } from "@/components/ui/IconCircle";
import { Place } from "@/components/ui/bits";
import { Photo } from "@/components/ui/Photo";
import { stays } from "@/lib/content";
import { gsap, MQ, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export function Discover() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEnds = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    updateEnds();
    el.addEventListener("scroll", updateEnds, { passive: true });
    window.addEventListener("resize", updateEnds);

    // Mouse drag (touch already scrolls natively).
    let down = false;
    let startX = 0;
    let startLeft = 0;
    let moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.style.cursor = "";
      el.style.scrollSnapType = "";
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("scroll", updateEnds);
      window.removeEventListener("resize", updateEnds);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, [updateEnds]);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(".stay-card", {
          x: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: track.current, start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  const step = contextSafe((dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>(".stay-card");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el.firstElementChild as HTMLElement).columnGap) || 20;
    const target = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, el.scrollLeft + dir * (card.offsetWidth + gap)));
    if (prefersReducedMotion()) {
      el.scrollLeft = target;
      return;
    }
    el.style.scrollSnapType = "none";
    gsap.to(el, {
      scrollLeft: target,
      duration: 0.7,
      ease: "power3.out",
      overwrite: true,
      onComplete: () => {
        el.style.scrollSnapType = "";
      },
    });
  });

  return (
    <section id="discover" ref={root} aria-labelledby="discover-title" className="section-y overflow-hidden bg-paper">
      <div className="container-x mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
        <h2 id="discover-title" className="h2">
          Discover Your
          <br />
          Ideal Destination
        </h2>
        <div className="flex gap-2">
          <IconCircle direction="prev" label="Previous stays" onClick={() => step(-1)} disabled={atStart} />
          <IconCircle direction="next" label="Next stays" onClick={() => step(1)} disabled={atEnd} filled />
        </div>
      </div>

      <div
        ref={track}
        role="region"
        aria-label="Featured stays, scroll horizontally"
        tabIndex={0}
        className="no-scrollbar bleed-start cursor-grab snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
      >
        <ul className="flex w-max gap-5 pr-5 md:pr-12">
          {stays.map((s) => (
            <li key={s.name} className="stay-card w-[78vw] max-w-[320px] shrink-0 snap-start md:w-[clamp(240px,21vw,300px)]">
              <a href="#" className="group block select-none" draggable={false}>
                <div className="relative aspect-square overflow-hidden rounded-[16px] bg-night-700">
                  <Photo
                    src={s.image}
                    alt={s.alt}
                    sizes="(min-width: 768px) 300px, 78vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h3 className="text-[15px] font-normal tracking-normal text-ink">{s.name}</h3>
                  <p className="shrink-0 text-lg font-medium tabular-nums text-ink">
                    ${s.price}
                    <span className="ml-1 text-xs font-normal text-ink-muted">/ night</span>
                  </p>
                </div>
                <Place className="mt-1 text-ink-muted">{s.location}</Place>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
