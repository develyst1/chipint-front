"use client";

import { Bot } from "lucide-react";
import { clsx } from "clsx";

export type PlaceholderSize = "sm" | "md" | "lg" | "xl";

interface ProductImagePlaceholderProps {
  size?: PlaceholderSize;
  className?: string;
}

const SIZE_CLASSES: Record<PlaceholderSize, string> = {
  sm: "h-8 w-8",
  md: "h-16 w-16",
  lg: "h-20 w-20",
  xl: "h-28 w-28",
};

/**
 * Generic icon-based placeholder rendered when a product has no image yet.
 * Used across catalog grids, detail pages, and the cart so the "no image"
 * state stays visually consistent (and avoids emoji, which render
 * inconsistently across platforms/fonts).
 */
export default function ProductImagePlaceholder({ size = "md", className }: ProductImagePlaceholderProps) {
  return (
    <Bot
      strokeWidth={1.25}
      className={clsx(SIZE_CLASSES[size], "text-indigo-400/60", className)}
    />
  );
}
