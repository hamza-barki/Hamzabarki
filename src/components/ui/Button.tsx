import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none rounded-lg active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-brand-navy text-white hover:bg-brand-navy-700 shadow-subtle border border-brand-navy-700",
      secondary:
        "bg-surface-card text-brand-navy hover:bg-surface-muted border border-border-subtle shadow-subtle",
      outline:
        "border border-border-medium text-ink hover:bg-surface-muted hover:border-brand-navy",
      ghost:
        "text-ink-secondary hover:text-brand-navy hover:bg-brand-navy-50",
      accent:
        "bg-brand-yellow text-brand-navy font-semibold hover:bg-brand-yellow-hover shadow-subtle",
    };

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs tracking-wide",
      md: "h-11 px-5 text-sm tracking-wide",
      lg: "h-12 px-7 text-base tracking-wide",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
