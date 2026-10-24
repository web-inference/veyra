"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, nav } from "@/lib/content";

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight - 80 : 600;
      const isSolid = y > threshold;
      setSolid(isSolid);
      setHidden(isSolid && y > lastY + 2);
      if (y < lastY - 2 || !isSolid) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,padding] duration-500 ease-out ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${solid ? "bg-white/80 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "text-white md:pt-3"}`}
    >
      <div className={`container-x ${solid ? "" : "md:px-[60px]"}`}>
        <div
          className={`flex h-16 items-center justify-between gap-6 ${solid ? "" : "border-b border-white/15"}`}
        >
          <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-[13px] transition-colors ${solid ? "text-ink-muted hover:text-ink" : "text-white/80 hover:text-white"}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#hero" className="text-lg font-semibold tracking-[-0.04em] md:hidden">
            {brand.name}
          </a>
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="inline-flex min-h-9 items-center rounded-full bg-accent px-5 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Sign In
            </a>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center md:hidden"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 flex flex-col bg-night-700 text-white transition-[opacity,visibility] duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="container-x flex h-16 items-center justify-between">
          <span className="text-lg font-semibold tracking-[-0.04em]">{brand.name}</span>
          <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="grid size-11 place-items-center">
            <X className="size-6" />
          </button>
        </div>
        <nav aria-label="Mobile" className="container-x mt-10 flex flex-col gap-2">
          {[...nav, { label: "Sign In", href: "#" }].map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
              className={`py-2 text-[40px] font-medium tracking-[-0.03em] transition-[opacity,transform] duration-700 ease-out ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
