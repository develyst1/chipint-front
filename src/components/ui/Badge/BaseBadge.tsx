"use client";

import { Tag } from "antd";
import { clsx } from "clsx";

export type AppBadgeVariant = "solid" | "outline" | "glow";
export type AppBadgeSize = "sm" | "md";

interface BaseBadgeProps {
  label: string;
  color?: string;
  variant?: AppBadgeVariant;
  size?: AppBadgeSize;
  className?: string;
}

const DEFAULT_COLOR = "#6366f1";

const SIZE_CLASSES: Record<AppBadgeSize, string> = {
  sm: "text-xs! px-2.5! py-0.5! leading-4!",
  md: "text-sm! px-3! py-1! leading-5!",
};

/**
 * Thin wrapper around Ant Design's `Tag`, applying the project's
 * hex-based color tokens (tier colors, AI provider colors, status
 * colors) with solid / outline / glow presentation styles.
 */
export default function BaseBadge({
  label,
  color = DEFAULT_COLOR,
  variant = "solid",
  size = "sm",
  className,
}: BaseBadgeProps) {
  return (
    <Tag
      bordered
      className={clsx(
        "rounded-full! m-0! font-semibold! border! inline-flex! items-center!",
        SIZE_CLASSES[size],
        className,
      )}
      style={{
        backgroundColor: variant === "outline" ? "transparent" : `${color}20`,
        color,
        borderColor: variant === "glow" ? `${color}90` : `${color}40`,
        boxShadow: variant === "glow" ? `0 0 8px ${color}66` : undefined,
      }}
    >
      {label}
    </Tag>
  );
}
