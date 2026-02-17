import Link from "next/link";
import type { ReactNode } from "react";
import { brandConfig } from "@/config/brand";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "consultation";
  consultationStyle?: "primary" | "secondary";
  className?: string;
};

const toneClasses: Record<"primary" | "secondary", string> = {
  primary:
    "bg-[var(--brand-accent)] text-white hover:bg-[var(--brand-accent-strong)]",
  secondary:
    "bg-white text-[var(--brand-accent)] ring-1 ring-[var(--brand-accent)]/25 hover:bg-[var(--brand-accent-soft)]",
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  consultationStyle = "primary",
  className = "",
}: CtaButtonProps) {
  const tone = variant === "consultation" ? consultationStyle : variant;
  const classes = `inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${toneClasses[tone]} ${className}`;

  if (variant === "consultation") {
    return (
      <a
        href={brandConfig.consultationFormUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classes}
    >
      {children}
    </Link>
  );
}
