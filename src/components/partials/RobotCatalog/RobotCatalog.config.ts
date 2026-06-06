import type { RobotTier } from "@/types/app/product";

export const ROBOT_CATALOG_STORAGE_KEY = "robot-catalog-filters";

export const DEFAULT_ROBOT_FILTERS = {
  tier: "",
  aiProvider: "",
  minPrice: "",
  maxPrice: "",
  search: "",
};

export const TIER_OPTIONS: { value: RobotTier | ""; label: string }[] = [
  { value: "", label: "ทุกระดับ" },
  { value: "STARTER", label: "Starter — เริ่มต้น" },
  { value: "STANDARD", label: "Standard — มาตรฐาน" },
  { value: "PRO", label: "Pro — โปร" },
  { value: "ELITE", label: "Elite — สูงสุด" },
];

export const SORT_OPTIONS = [
  { value: "price_asc", label: "ราคา: ต่ำ → สูง" },
  { value: "price_desc", label: "ราคา: สูง → ต่ำ" },
  { value: "rating_desc", label: "คะแนนสูงสุด" },
  { value: "newest", label: "ใหม่ล่าสุด" },
];
