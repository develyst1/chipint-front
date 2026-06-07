"use client";

import { Button } from "antd";
import type { ButtonProps } from "antd";
import { clsx } from "clsx";

export type AppButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type AppButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps extends Omit<ButtonProps, "size" | "type" | "color" | "variant"> {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  fullWidth?: boolean;
}

/**
 * Maps the project's domain-level variant names onto Ant Design's
 * `color` + `variant` button API (antd 6).
 */
const VARIANT_TO_ANTD: Record<AppButtonVariant, Pick<ButtonProps, "type" | "color" | "variant">> = {
  primary: { type: "primary", color: "primary", variant: "solid" },
  secondary: { type: "primary", color: "cyan", variant: "solid" },
  outline: { type: "default", color: "primary", variant: "outlined" },
  ghost: { type: "text", color: "default", variant: "text" },
  danger: { type: "primary", color: "danger", variant: "solid" },
};

const ANTD_SIZE: Record<AppButtonSize, ButtonProps["size"]> = {
  sm: "small",
  md: "middle",
  lg: "large",
};

const SIZE_CLASSES: Record<AppButtonSize, string> = {
  sm: "h-8! px-3! text-xs! rounded-md!",
  md: "h-10! px-5! text-sm! rounded-lg!",
  lg: "h-12! px-7! text-base! rounded-xl!",
};

const VARIANT_GLOW_CLASSES: Record<AppButtonVariant, string> = {
  primary: "shadow-[0_0_12px_rgba(99,102,241,0.4)]! hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]!",
  secondary: "shadow-[0_0_12px_rgba(34,211,238,0.4)]!",
  outline: "",
  ghost: "",
  danger: "",
};

export default function BaseButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: BaseButtonProps) {
  return (
    <Button
      {...VARIANT_TO_ANTD[variant]}
      size={ANTD_SIZE[size]}
      block={fullWidth}
      className={clsx(
        "font-semibold! transition-all! duration-200!",
        SIZE_CLASSES[size],
        VARIANT_GLOW_CLASSES[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
