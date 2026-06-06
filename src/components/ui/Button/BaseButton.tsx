"use client";

import { clsx } from "clsx";

interface BaseButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

const VARIANT_CLASSES = {
  primary:
    "bg-indigo-500 hover:bg-indigo-600 text-white border border-indigo-500 hover:border-indigo-600 shadow-[0_0_12px_rgba(99,102,241,0.4)] hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]",
  secondary:
    "bg-cyan-500 hover:bg-cyan-600 text-white border border-cyan-500 hover:border-cyan-600 shadow-[0_0_12px_rgba(34,211,238,0.4)]",
  outline:
    "bg-transparent hover:bg-indigo-500/10 text-indigo-400 border border-indigo-500 hover:border-indigo-400",
  ghost: "bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border border-transparent",
  danger: "bg-red-500 hover:bg-red-600 text-white border border-red-500",
};

const SIZE_CLASSES = {
  sm: "px-3 py-1.5 text-xs rounded-md",
  md: "px-5 py-2.5 text-sm rounded-lg",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

export default function BaseButton({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className,
  onClick,
  type = "button",
  fullWidth = false,
}: BaseButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer select-none",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth && "w-full",
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
