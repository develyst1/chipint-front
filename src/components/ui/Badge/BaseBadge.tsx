"use client";

import { clsx } from "clsx";

interface BaseBadgeProps {
  label: string;
  color?: string;
  variant?: "solid" | "outline" | "glow";
  size?: "sm" | "md";
  className?: string;
}

export default function BaseBadge({
  label,
  color,
  variant = "solid",
  size = "sm",
  className,
}: BaseBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center font-semibold rounded-full",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        !color && variant === "solid" && "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
        !color && variant === "outline" && "bg-transparent text-indigo-400 border border-indigo-500",
        !color && variant === "glow" && "bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 shadow-[0_0_8px_rgba(99,102,241,0.4)]",
        className,
      )}
      style={
        color
          ? {
              backgroundColor: `${color}20`,
              color: color,
              borderColor: `${color}40`,
              border: "1px solid",
            }
          : undefined
      }
    >
      {label}
    </span>
  );
}
