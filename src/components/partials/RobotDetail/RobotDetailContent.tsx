"use client";

import { useState } from "react";
import { ShoppingCart, Star, Check, ChevronLeft, PackageX } from "lucide-react";
import Link from "next/link";
import { BaseButton } from "@/components/ui/Button";
import { BaseBadge } from "@/components/ui/Badge";
import { ProductImagePlaceholder } from "@/components/common";
import { useRobotDetail } from "@/hooks/products";
import { useCart } from "@/context/cart/CartProvider";
import { ROBOT_TIER_LABEL, AI_PROVIDER_LABEL } from "@/types/app/product";
import type { AiProvider } from "@/types/app/product";

interface RobotDetailContentProps {
  slug: string;
}

export default function RobotDetailContent({ slug }: RobotDetailContentProps) {
  const { robot, isLoading } = useRobotDetail(slug);
  const { addItem } = useCart();
  const [selectedSkin, setSelectedSkin] = useState<string | null>(null);
  const [selectedAi, setSelectedAi] = useState<AiProvider | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="h-96 rounded-2xl bg-slate-800 animate-pulse" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 rounded bg-slate-800 animate-pulse" style={{ width: `${80 - i * 10}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!robot) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <PackageX strokeWidth={1.25} className="h-16 w-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400">ไม่พบสินค้าที่ต้องการ</p>
        <Link href="/products/robots">
          <BaseButton variant="outline" className="mt-6">กลับไปเลือกหุ่นยนต์</BaseButton>
        </Link>
      </div>
    );
  }

  const tier = ROBOT_TIER_LABEL[robot.tier];
  const price = robot.discountedPrice ?? robot.basePrice;
  const activeSkin = robot.skins.find((s) => s.id === selectedSkin) ?? robot.skins[0];

  const handleAddToCart = () => {
    addItem({
      productId: robot.id,
      quantity: qty,
      selectedSkinId: activeSkin?.id,
      selectedAiProvider: selectedAi ?? undefined,
      product: {
        productId: robot.id,
        productName: robot.name,
        productNameTh: robot.nameTh,
        productSlug: robot.slug,
        imageUrl: robot.images[0]?.url ?? "",
        sku: robot.sku,
        unitPrice: price + (activeSkin?.additionalPrice ?? 0),
        selectedSkinName: activeSkin?.nameTh,
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/products/robots"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-8 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        กลับหน้าหุ่นยนต์
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-8 flex items-center justify-center min-h-80">
          {robot.images[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={robot.images[0].url} alt={robot.images[0].alt} className="max-h-80 object-contain" />
          ) : (
            <ProductImagePlaceholder size="xl" />
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BaseBadge label={tier.th} color={tier.color} />
            {robot.isNew && <BaseBadge label="ใหม่" color="#22c55e" />}
            <span className="text-xs text-slate-500 font-mono">Gen {robot.generation}</span>
          </div>

          <h1 className="text-3xl font-extrabold text-white mb-2">{robot.nameTh}</h1>

          <div className="flex items-center gap-2 mb-4 text-sm text-amber-400">
            <Star className="h-4 w-4 fill-amber-400" />
            <span>{robot.rating.toFixed(1)}</span>
            <span className="text-slate-500">({robot.reviewCount} รีวิว)</span>
          </div>

          <p className="text-slate-400 leading-relaxed mb-6">{robot.descriptionTh}</p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-4xl font-extrabold gradient-text">฿{price.toLocaleString()}</span>
            {robot.discountedPrice && (
              <>
                <span className="text-xl text-slate-500 line-through">฿{robot.basePrice.toLocaleString()}</span>
                <BaseBadge label={`-${robot.discountPercent}%`} color="#22c55e" />
              </>
            )}
          </div>

          {/* Skin selector */}
          {robot.skins.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-300 mb-2">
                สกิน: <span className="text-indigo-300">{activeSkin?.nameTh}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {robot.skins.map((skin) => (
                  <button
                    key={skin.id}
                    onClick={() => setSelectedSkin(skin.id)}
                    className={`h-9 w-9 rounded-full border-2 transition-all ${
                      (selectedSkin ?? robot.skins[0]?.id) === skin.id
                        ? "border-white scale-110"
                        : "border-transparent hover:border-slate-500"
                    }`}
                    style={{ backgroundColor: skin.colorHex }}
                    title={skin.nameTh}
                  />
                ))}
              </div>
              {activeSkin?.additionalPrice > 0 && (
                <p className="text-xs text-slate-500 mt-1">+฿{activeSkin.additionalPrice.toLocaleString()}</p>
              )}
            </div>
          )}

          {/* AI provider selector */}
          {robot.aiProviders.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-300 mb-2">เลือก AI Provider</p>
              <div className="flex flex-wrap gap-2">
                {robot.aiProviders.map((p) => {
                  const meta = AI_PROVIDER_LABEL[p.provider];
                  const isSelected = selectedAi === p.provider;
                  return (
                    <button
                      key={p.provider}
                      onClick={() => setSelectedAi(p.provider)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        isSelected
                          ? "text-white"
                          : "border-slate-700 text-slate-400 hover:border-slate-500"
                      }`}
                      style={
                        isSelected
                          ? { backgroundColor: `${meta.color}30`, borderColor: meta.color, color: meta.color }
                          : undefined
                      }
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                      {meta.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Qty + Add to cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-slate-700 bg-slate-800">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-2 text-slate-400 hover:text-white transition-colors"
              >
                −
              </button>
              <span className="w-10 text-center text-white font-semibold">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-2 text-slate-400 hover:text-white transition-colors"
              >
                +
              </button>
            </div>

            <BaseButton
              onClick={handleAddToCart}
              variant={added ? "secondary" : "primary"}
              size="lg"
              className="flex-1"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> เพิ่มแล้ว!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" /> เพิ่มลงตะกร้า
                </>
              )}
            </BaseButton>
          </div>

          {/* Capabilities */}
          {robot.capabilitiesTh.length > 0 && (
            <div className="mt-8 p-4 rounded-xl border border-slate-700 bg-slate-800/40">
              <p className="text-sm font-semibold text-slate-300 mb-3">ความสามารถ</p>
              <ul className="space-y-1.5">
                {robot.capabilitiesTh.map((cap) => (
                  <li key={cap} className="flex items-center gap-2 text-sm text-slate-400">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
