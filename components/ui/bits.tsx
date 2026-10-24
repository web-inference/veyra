import { MapPin, Star } from "lucide-react";

export function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[13px] text-ink-muted ${className}`}>{children}</p>;
}

export function Stars({ rating, className = "" }: { rating: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs ${className}`}>
      <Star className="size-3.5 fill-accent text-accent" aria-hidden="true" />
      <span>({rating})</span>
    </span>
  );
}

export function Place({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs ${className}`}>
      <MapPin className="size-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}
