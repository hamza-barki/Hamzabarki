import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "success" | "accent" | "tech" | "outline";
}

export function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    neutral: "bg-surface-muted text-ink-secondary border-border-subtle",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    accent: "bg-amber-50 text-amber-900 border-amber-200",
    tech: "bg-brand-navy-50 text-brand-navy-700 border-brand-navy-100",
    outline: "bg-transparent text-ink-secondary border-border-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
