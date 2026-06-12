"use client";

import Link from "next/link";
import { ArrowRight, Star, Bot, CircuitBoard, Zap, Gem } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BaseBadge } from "@/components/ui/Badge";
import { ROBOT_TIER_LABEL, AI_PROVIDER_LABEL } from "@/types/app/product";
import type { RobotTier, AiProvider } from "@/types/app/product";

interface MockRobot {
  id: string;
  slug: string;
  nameTh: string;
  tier: RobotTier;
  basePrice: number;
  discountedPrice?: number;
  rating: number;
  aiProviders: AiProvider[];
  icon: LucideIcon;
  isNew: boolean;
}

const MOCK_ROBOTS: MockRobot[] = [
  {
    id: "1",
    slug: "chipint-alpha",
    nameTh: "ChipInt Alpha",
    tier: "STARTER",
    basePrice: 1990,
    rating: 4.5,
    aiProviders: ["OPENAI"],
    icon: Bot,
    isNew: false,
  },
  {
    id: "2",
    slug: "chipint-nova",
    nameTh: "ChipInt Nova",
    tier: "STANDARD",
    basePrice: 4990,
    discountedPrice: 3990,
    rating: 4.7,
    aiProviders: ["OPENAI", "GEMINI"],
    icon: CircuitBoard,
    isNew: true,
  },
  {
    id: "3",
    slug: "chipint-pro-x",
    nameTh: "ChipInt Pro X",
    tier: "PRO",
    basePrice: 7990,
    rating: 4.9,
    aiProviders: ["OPENAI", "XAI", "DEEPSEEK"],
    icon: Zap,
    isNew: true,
  },
  {
    id: "4",
    slug: "chipint-elite",
    nameTh: "ChipInt Elite",
    tier: "ELITE",
    basePrice: 14990,
    rating: 5.0,
    aiProviders: ["OPENAI", "XAI", "DEEPSEEK", "GEMINI"],
    icon: Gem,
    isNew: false,
  },
];

export default function HomeFeaturedRobots() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              หุ่นยนต์ <span className="gradient-text">แนะนำ</span>
            </h2>
            <p className="text-slate-400">คัดสรรรุ่นยอดนิยมสำหรับทุกระดับ</p>
          </div>
          <Link
            href="/products/robots"
            className="hidden sm:flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            ดูทั้งหมด <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_ROBOTS.map((robot) => {
            const tier = ROBOT_TIER_LABEL[robot.tier];
            const price = robot.discountedPrice ?? robot.basePrice;
            const RobotIcon = robot.icon;

            return (
              <Link
                key={robot.id}
                href={`/products/robots/${robot.slug}`}
                className="group rounded-2xl border border-slate-700 bg-slate-800/60 p-5 flex flex-col card-hover hover:border-indigo-500/50"
              >
                {/* Image placeholder */}
                <div className="relative mb-4 flex h-40 items-center justify-center rounded-xl bg-slate-900/60 border border-slate-700">
                  <RobotIcon strokeWidth={1.25} className="h-20 w-20 text-indigo-400/70" />
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    <BaseBadge label={tier.th} color={tier.color} size="sm" />
                    {robot.isNew && <BaseBadge label="ใหม่" color="#22c55e" size="sm" />}
                  </div>
                </div>

                <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">
                  {robot.nameTh}
                </h3>

                {/* AI badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {robot.aiProviders.map((p) => (
                    <span
                      key={p}
                      className="text-[10px] px-1.5 py-0.5 rounded-md font-mono"
                      style={{
                        backgroundColor: `${AI_PROVIDER_LABEL[p].color}20`,
                        color: AI_PROVIDER_LABEL[p].color,
                      }}
                    >
                      {AI_PROVIDER_LABEL[p].name}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 mb-3 text-xs text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-amber-400" />
                  <span>{robot.rating.toFixed(1)}</span>
                </div>

                <div className="mt-auto flex items-baseline gap-2">
                  <span className="text-lg font-extrabold text-white">
                    ฿{price.toLocaleString()}
                  </span>
                  {robot.discountedPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      ฿{robot.basePrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
