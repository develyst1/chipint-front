import type {
  ProductCategory,
  ProductStatus,
  AiProvider,
  RobotTier,
  ProductImageResponse,
  RobotSkinResponse,
  AiProviderOptionResponse,
} from "@/types/api/main/product";

export type { ProductCategory, ProductStatus, AiProvider, RobotTier };

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductSpec {
  key: string;
  label: string;
  value: string;
  unit?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  nameTh: string;
  slug: string;
  description: string;
  descriptionTh: string;
  category: ProductCategory;
  status: ProductStatus;
  basePrice: number;
  discountedPrice?: number;
  discountPercent?: number;
  images: ProductImage[];
  specs: ProductSpec[];
  isFeatured: boolean;
  isNew: boolean;
  rating: number;
  reviewCount: number;
  stockCount: number;
}

export interface RobotProduct extends Product {
  tier: RobotTier;
  generation: number;
  skins: RobotSkinResponse[];
  aiProviders: AiProviderOptionResponse[];
  capabilities: string[];
  capabilitiesTh: string[];
}

export interface ChipProduct extends Product {
  chipModel: string;
  architecture: string;
  clockSpeed: string;
  powerConsumption: string;
  compatibleRobots: string[];
}

export interface ProductListParams {
  category?: ProductCategory;
  tier?: RobotTier;
  status?: ProductStatus;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
}

export const ROBOT_TIER_LABEL: Record<RobotTier, { en: string; th: string; color: string }> = {
  STARTER: { en: "Starter", th: "เริ่มต้น", color: "#64748b" },
  STANDARD: { en: "Standard", th: "มาตรฐาน", color: "#6366f1" },
  PRO: { en: "Pro", th: "โปร", color: "#8b5cf6" },
  ELITE: { en: "Elite", th: "สูงสุด", color: "#22d3ee" },
};

export const AI_PROVIDER_LABEL: Record<AiProvider, { name: string; color: string }> = {
  OPENAI: { name: "OpenAI", color: "#10a37f" },
  XAI: { name: "xAI (Grok)", color: "#1da1f2" },
  DEEPSEEK: { name: "DeepSeek", color: "#4f46e5" },
  GEMINI: { name: "Google Gemini", color: "#f59e0b" },
  CUSTOM: { name: "Custom API", color: "#94a3b8" },
};
