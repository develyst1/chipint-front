import type { RobotProduct, ChipProduct, ProductListParams } from "@/types/app/product";
import type { ProductResponse, RobotProductResponse } from "@/types/api/main/product";
import {
  getRobotListApi,
  getRobotDetailApi,
  getChipListApi,
  getChipDetailApi,
  getFeaturedProductsApi,
} from "@/lib/api/api-main";

const mapProduct = (p: ProductResponse) => ({
  id: p.id,
  sku: p.sku,
  name: p.name,
  nameTh: p.nameTh,
  slug: p.slug,
  description: p.description,
  descriptionTh: p.descriptionTh,
  category: p.category,
  status: p.status,
  basePrice: p.basePrice,
  discountedPrice: p.discountedPrice,
  discountPercent: p.discountPercent,
  images: p.images,
  specs: p.specs,
  isFeatured: p.isFeatured,
  isNew: p.isNew,
  rating: p.rating,
  reviewCount: p.reviewCount,
  stockCount: p.stockCount,
});

export const getRobotList = async (params?: ProductListParams) => {
  const res = await getRobotListApi(params as Record<string, unknown>);
  const page = res.data?.data;
  return {
    items: (page?.content ?? []).map((r: RobotProductResponse): RobotProduct => ({
      ...mapProduct(r),
      tier: r.tier,
      generation: r.generation,
      skins: r.skins,
      aiProviders: r.aiProviders,
      capabilities: r.capabilities,
      capabilitiesTh: r.capabilitiesTh,
    })),
    total: page?.totalElements ?? 0,
    totalPages: page?.totalPages ?? 0,
  };
};

export const getRobotDetail = async (slug: string): Promise<RobotProduct | null> => {
  const res = await getRobotDetailApi(slug);
  const r = res.data?.data;
  if (!r) return null;
  return {
    ...mapProduct(r),
    tier: r.tier,
    generation: r.generation,
    skins: r.skins,
    aiProviders: r.aiProviders,
    capabilities: r.capabilities,
    capabilitiesTh: r.capabilitiesTh,
  };
};

export const getChipList = async (params?: ProductListParams) => {
  const res = await getChipListApi(params as Record<string, unknown>);
  const page = res.data?.data;
  return {
    items: (page?.content ?? []).map((c) => ({
      ...mapProduct(c),
      chipModel: c.chipModel,
      architecture: c.architecture,
      clockSpeed: c.clockSpeed,
      powerConsumption: c.powerConsumption,
      compatibleRobots: c.compatibleRobots,
    })) as ChipProduct[],
    total: page?.totalElements ?? 0,
    totalPages: page?.totalPages ?? 0,
  };
};

export const getChipDetail = async (slug: string): Promise<ChipProduct | null> => {
  const res = await getChipDetailApi(slug);
  const c = res.data?.data;
  if (!c) return null;
  return {
    ...mapProduct(c),
    chipModel: c.chipModel,
    architecture: c.architecture,
    clockSpeed: c.clockSpeed,
    powerConsumption: c.powerConsumption,
    compatibleRobots: c.compatibleRobots,
  };
};

export const getFeaturedProducts = async () => {
  const res = await getFeaturedProductsApi();
  return (res.data?.data ?? []).map(mapProduct);
};
