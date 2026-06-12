"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { BaseBadge } from "@/components/ui/Badge";
import { BaseButton } from "@/components/ui/Button";
import { TIER_FEATURES } from "./Home.config";
import { ROBOT_TIER_LABEL } from "@/types/app/product";
import type { RobotTier } from "@/types/app/product";

const TIERS: RobotTier[] = ["STARTER", "STANDARD", "PRO", "ELITE"];

const TIER_PRICE: Record<RobotTier, string> = {
  STARTER: "1,990",
  STANDARD: "3,990",
  PRO: "7,990",
  ELITE: "14,990",
};

export default function HomeTierSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            เลือกระดับที่ <span className="gradient-text">ใช่สำหรับคุณ</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            หุ่นยนต์ ChipInt มี 4 ระดับ ตั้งแต่ Starter สำหรับผู้เริ่มต้น จนถึง Elite สำหรับผู้ต้องการขีดสุด
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((tier) => {
            const meta = ROBOT_TIER_LABEL[tier];
            const info = TIER_FEATURES[tier];
            const isPopular = tier === "PRO";

            return (
              <div
                key={tier}
                className={`relative rounded-2xl border p-6 flex flex-col card-hover ${
                  isPopular
                    ? "border-indigo-500/60 bg-indigo-500/5 glow-primary"
                    : "border-slate-700 bg-slate-800/50"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <BaseBadge label="ยอดนิยม" variant="glow" />
                  </div>
                )}

                <div className="mb-4">
                  <BaseBadge label={meta.th} color={meta.color} />
                </div>

                <div className="mb-1 text-xs text-slate-500 font-mono">{meta.en}</div>
                <div className="text-2xl font-extrabold text-white mb-1">
                  ฿{TIER_PRICE[tier]}
                </div>
                <div className="text-xs text-slate-500 mb-6">เริ่มต้น / ตัว</div>

                <p className="text-sm text-indigo-300 font-medium mb-4">{info.highlight}</p>

                <ul className="space-y-2.5 flex-1">
                  {info.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Link href={`/products/robots?tier=${tier}`}>
                    <BaseButton
                      variant={isPopular ? "primary" : "outline"}
                      size="md"
                      fullWidth
                    >
                      ดูรุ่น {meta.th}
                    </BaseButton>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
