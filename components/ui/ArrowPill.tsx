import { ArrowUpRight } from "lucide-react";

type ArrowPillProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "outline" | "solid";
  type?: "button" | "submit";
  className?: string;
};

export function ArrowPill({ children, href, variant = "outline", type = "button", className = "" }: ArrowPillProps) {
  const solid = variant === "solid";
  const classes = `group inline-flex min-h-11 items-center gap-3 rounded-full py-1 pl-5 pr-1 text-sm font-medium transition-colors duration-300 ${
    solid
      ? "bg-accent text-white hover:bg-accent-hover"
      : "border border-line bg-paper text-ink hover:bg-mist"
  } ${className}`;

  const inner = (
    <>
      {children}
      <span
        aria-hidden="true"
        className={`grid size-8 place-items-center rounded-full transition-transform duration-500 ease-out group-hover:rotate-45 ${
          solid ? "bg-white text-accent" : "bg-accent text-white"
        }`}
      >
        <ArrowUpRight className="size-4" strokeWidth={2} />
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={classes}>
      {inner}
    </button>
  );
}
