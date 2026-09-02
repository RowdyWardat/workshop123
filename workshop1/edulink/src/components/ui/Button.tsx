import { cn } from "../core/utils";
import { tokens } from "../../tokens";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary: "text-white shadow-lg hover:shadow-xl",
    secondary: "text-slate-900 shadow-md hover:shadow-lg",
    outline: "border-2 bg-transparent hover:bg-opacity-10",
    ghost: "bg-transparent hover:bg-opacity-10",
    destructive: "text-white shadow-md hover:shadow-lg",
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: tokens.color.primary },
    secondary: { backgroundColor: tokens.color.secondary },
    outline: { borderColor: tokens.color.primary, color: tokens.color.primary },
    ghost: { color: tokens.color.primary },
    destructive: { backgroundColor: tokens.color.destructive },
  };

  return (
    <button
      className={cn(base, sizeClasses[size], variants[variant], className)}
      style={variantStyles[variant]}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
