"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

/** gsap.matchMedia conditions shared by every section. */
export const MQ = {
  /** any motion at all */
  motion: "(prefers-reduced-motion: no-preference)",
  /** heavy scrub/parallax: desktop and tablet only */
  desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
} as const;

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
