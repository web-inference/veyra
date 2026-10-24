import { ChevronLeft, ChevronRight } from "lucide-react";

type IconCircleProps = {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
  disabled?: boolean;
  filled?: boolean;
};

export function IconCircle({ direction, label, onClick, disabled, filled }: IconCircleProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`grid size-11 place-items-center rounded-full transition-[background-color,opacity,transform] duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 ${
        filled
          ? "bg-accent text-white hover:bg-accent-hover"
          : "border border-line text-ink hover:bg-mist"
      }`}
    >
      <Icon className="size-[18px]" strokeWidth={2} />
    </button>
  );
}
