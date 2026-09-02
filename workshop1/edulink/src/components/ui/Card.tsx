import { cn } from "../core/utils";
import { tokens } from "../../tokens";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl border p-6 lg:p-8 transition-all duration-200",
        hover && "hover:shadow-xl hover:-translate-y-1",
        onClick && "cursor-pointer",
        className,
      )}
      style={{
        backgroundColor: tokens.color.surface,
        borderColor: tokens.color.border,
        color: tokens.color.cardForeground,
      }}
    >
      {children}
    </div>
  );
}
