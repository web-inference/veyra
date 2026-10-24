"use client";

import Image from "next/image";
import { useState } from "react";
import { asset } from "@/lib/asset";

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** next/image in fill mode; a missing file degrades to a teal-to-black block of the same box. */
export function Photo({ src, alt, sizes, priority, className = "" }: PhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`absolute inset-0 bg-[linear-gradient(135deg,#0f2f38,#000)] ${className}`}
      />
    );
  }

  return (
    <Image
      src={asset(src)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      draggable={false}
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
