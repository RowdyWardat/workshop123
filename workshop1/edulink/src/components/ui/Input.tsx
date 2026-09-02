import { cn } from "../core/utils";
import { tokens } from "../../tokens";
import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, className, ...props }, ref) {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            className="text-sm font-medium"
            style={{ color: tokens.color.text }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-xl border px-4 py-3 text-base transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-1",
            className,
          )}
          style={{
            backgroundColor: tokens.color.background,
            borderColor: error ? tokens.color.destructive : tokens.color.border,
            color: tokens.color.text,
          }}
          {...props}
        />
        {error && (
          <span className="text-sm" style={{ color: tokens.color.destructive }}>
            {error}
          </span>
        )}
      </div>
    );
  },
);
