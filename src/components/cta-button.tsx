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
    "border border-transparent bg-[var(--button-primary)] text-white hover:bg-[var(--button-primary-hover)]",
  secondary:
    "border border-[var(--button-primary)] bg-white text-[var(--button-primary)] hover:bg-[#7C3AED]/10 active:bg-[#7C3AED]/15",
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  consultationStyle = "primary",
  className = "",
}: CtaButtonProps) {
  const tone = variant === "consultation" ? consultationStyle : variant;
  const classes = `inline-flex h-10 items-center justify-center rounded-xl px-6 text-sm font-semibold shadow-sm transition-colors hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-primary)]/30 ${toneClasses[tone]} ${className}`;

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
