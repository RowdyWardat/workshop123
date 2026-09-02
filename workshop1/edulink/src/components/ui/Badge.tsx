import { cn } from "../core/utils";
import { tokens } from "../../tokens";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "outline";
  className?: string;
}

export function Badge({ children, variant = "primary", className }: BadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: tokens.color.primary, color: tokens.color.onPrimary },
    secondary: { backgroundColor: tokens.color.secondary, color: tokens.color.onSecondary },
    accent: { backgroundColor: tokens.color.accent, color: tokens.color.onAccent },
    outline: { borderColor: tokens.color.primary, color: tokens.color.primary, backgroundColor: "transparent" },
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide border",
        className,
      )}
      style={styles[variant]}
    >
      {children}
    </span>
  );
}
