"use client";

import Link from "next/link";
import { ShoppingCart, Star, PackageSearch } from "lucide-react";
import { BaseBadge } from "@/components/ui/Badge";
import { BaseButton } from "@/components/ui/Button";
import { ProductImagePlaceholder } from "@/components/common";
import { useRobotList } from "@/hooks/products";
import { ROBOT_TIER_LABEL, AI_PROVIDER_LABEL } from "@/types/app/product";
import type { RobotTier } from "@/types/app/product";
import type { AiProviderOptionResponse } from "@/types/api/main/product";

interface Filters {
  tier: string;
  search: string;
  sort?: string;
}

interface RobotCatalogGridProps {
  filters: Filters;
}

export default function RobotCatalogGrid({ filters }: RobotCatalogGridProps) {
  const { robots, isLoading } = useRobotList({
    tier: (filters.tier as RobotTier) || undefined,
    search: filters.search || undefined,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-72 rounded-2xl bg-slate-800/60 border border-slate-700 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!robots.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <PackageSearch strokeWidth={1.25} className="h-16 w-16 text-slate-600 mb-4" />
        <p className="text-slate-400">ไม่พบหุ่นยนต์ที่ตรงกับเงื่อนไข</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {robots.map((robot) => {
        const tier = ROBOT_TIER_LABEL[robot.tier];
        const price = robot.discountedPrice ?? robot.basePrice;

        return (
          <div
            key={robot.id}
            className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 flex flex-col card-hover hover:border-indigo-500/40 group"
          >
            <Link href={`/products/robots/${robot.slug}`}>
              <div className="relative mb-4 flex h-44 items-center justify-center rounded-xl bg-slate-900/60 border border-slate-700">
                {robot.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={robot.images[0].url} alt={robot.images[0].alt} className="h-full w-full object-contain p-4" />
                ) : (
                  <ProductImagePlaceholder size="lg" />
                )}
                <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
                  <BaseBadge label={tier.th} color={tier.color} />
                  {robot.isNew && <BaseBadge label="ใหม่" color="#22c55e" />}
                </div>
              </div>

              <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                {robot.nameTh}
              </h3>
            </Link>

            <div className="flex flex-wrap gap-1 mb-3">
              {robot.aiProviders.slice(0, 3).map((p: AiProviderOptionResponse) => (
                <span
                  key={p.provider}
                  className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                  style={{
                    backgroundColor: `${AI_PROVIDER_LABEL[p.provider]?.color}20`,
                    color: AI_PROVIDER_LABEL[p.provider]?.color,
                  }}
                >
                  {AI_PROVIDER_LABEL[p.provider]?.name ?? p.provider}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1 mb-3 text-xs text-amber-400">
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              <span>{robot.rating.toFixed(1)}</span>
              <span className="text-slate-500">({robot.reviewCount})</span>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div>
                <span className="text-lg font-extrabold text-white">฿{price.toLocaleString()}</span>
                {robot.discountedPrice && (
                  <span className="ml-2 text-sm text-slate-500 line-through">
                    ฿{robot.basePrice.toLocaleString()}
                  </span>
                )}
              </div>
              <BaseButton size="sm" variant="outline">
                <ShoppingCart className="h-3.5 w-3.5" />
              </BaseButton>
            </div>
          </div>
        );
      })}
    </div>
  );
}
