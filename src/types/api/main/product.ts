export type ProductCategory = "ROBOT" | "CHIP" | "ACCESSORY";
export type ProductStatus = "ACTIVE" | "OUT_OF_STOCK" | "COMING_SOON" | "DISCONTINUED";
export type AiProvider = "OPENAI" | "XAI" | "DEEPSEEK" | "GEMINI" | "CUSTOM";
export type RobotTier = "STARTER" | "STANDARD" | "PRO" | "ELITE";

export interface ProductImageResponse {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductSpecResponse {
  key: string;
  label: string;
  value: string;
  unit?: string;
}

export interface RobotSkinResponse {
  id: string;
  name: string;
  nameTh: string;
  colorHex: string;
  previewImageUrl: string;
  additionalPrice: number;
  isDefault: boolean;
}

export interface AiProviderOptionResponse {
  provider: AiProvider;
  name: string;
  description: string;
  descriptionTh: string;
  monthlyFee: number;
  capabilities: string[];
}

export interface ProductResponse {
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
  images: ProductImageResponse[];
  specs: ProductSpecResponse[];
  isFeatured: boolean;
  isNew: boolean;
  rating: number;
  reviewCount: number;
  stockCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RobotProductResponse extends ProductResponse {
  tier: RobotTier;
  generation: number;
  skins: RobotSkinResponse[];
  aiProviders: AiProviderOptionResponse[];
  capabilities: string[];
  capabilitiesTh: string[];
}

export interface ChipProductResponse extends ProductResponse {
  chipModel: string;
  architecture: string;
  clockSpeed: string;
  powerConsumption: string;
  compatibleRobots: string[];
}
