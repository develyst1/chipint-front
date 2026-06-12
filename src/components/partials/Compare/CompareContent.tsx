"use client";

import { Check, X } from "lucide-react";
import { BaseBadge } from "@/components/ui/Badge";
import { BaseButton } from "@/components/ui/Button";
import { ROBOT_TIER_LABEL, AI_PROVIDER_LABEL } from "@/types/app/product";
import type { RobotTier, AiProvider } from "@/types/app/product";
import Link from "next/link";

interface TierSpec {
  tier: RobotTier;
  price: string;
  aiProviders: AiProvider[];
  skinCount: string;
  features: Record<string, boolean | string>;
}

const COMPARE_TIERS: TierSpec[] = [
  {
    tier: "STARTER",
    price: "1,990",
    aiProviders: ["OPENAI"],
    skinCount: "1",
    features: {
      "ถามตอบ AI": true,
      "สั่งงานด้วยเสียง": false,
      "รู้จำใบหน้า": false,
      "เชื่อมสมาร์ทโฮม": false,
      "ควบคุม IoT": false,
      "Edge AI": false,
      "API เปิด": false,
      "การรับประกัน": "1 ปี",
    },
  },
  {
    tier: "STANDARD",
    price: "3,990",
    aiProviders: ["OPENAI", "GEMINI"],
    skinCount: "5",
    features: {
      "ถามตอบ AI": true,
      "สั่งงานด้วยเสียง": true,
      "รู้จำใบหน้า": false,
      "เชื่อมสมาร์ทโฮม": true,
      "ควบคุม IoT": false,
      "Edge AI": false,
      "API เปิด": false,
      "การรับประกัน": "1 ปี",
    },
  },
  {
    tier: "PRO",
    price: "7,990",
    aiProviders: ["OPENAI", "XAI", "DEEPSEEK"],
    skinCount: "15",
    features: {
      "ถามตอบ AI": true,
      "สั่งงานด้วยเสียง": true,
      "รู้จำใบหน้า": true,
      "เชื่อมสมาร์ทโฮม": true,
      "ควบคุม IoT": true,
      "Edge AI": false,
      "API เปิด": true,
      "การรับประกัน": "2 ปี",
    },
  },
  {
    tier: "ELITE",
    price: "14,990",
    aiProviders: ["OPENAI", "XAI", "DEEPSEEK", "GEMINI"],
    skinCount: "ไม่จำกัด",
    features: {
      "ถามตอบ AI": true,
      "สั่งงานด้วยเสียง": true,
      "รู้จำใบหน้า": true,
      "เชื่อมสมาร์ทโฮม": true,
      "ควบคุม IoT": true,
      "Edge AI": true,
      "API เปิด": true,
      "การรับประกัน": "3 ปี",
    },
  },
];

const FEATURE_ROWS = [
  "ถามตอบ AI",
  "สั่งงานด้วยเสียง",
  "รู้จำใบหน้า",
  "เชื่อมสมาร์ทโฮม",
  "ควบคุม IoT",
  "Edge AI",
  "API เปิด",
  "การรับประกัน",
];

export default function CompareContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          เปรียบเทียบ<span className="gradient-text">ทุกรุ่น</span>
        </h1>
        <p className="text-slate-400">เลือกระดับที่เหมาะสมกับการใช้งานของคุณ</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-700">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-5 text-left text-sm font-semibold text-slate-400 bg-slate-900/60 w-40">
                คุณสมบัติ
              </th>
              {COMPARE_TIERS.map(({ tier, price }) => {
                const meta = ROBOT_TIER_LABEL[tier];
                const isPopular = tier === "PRO";
                return (
                  <th
                    key={tier}
                    className={`p-5 text-center bg-slate-900/60 ${isPopular ? "border-x border-indigo-500/40" : ""}`}
                  >
                    {isPopular && (
                      <div className="mb-2">
                        <BaseBadge label="ยอดนิยม" variant="glow" />
                      </div>
                    )}
                    <BaseBadge label={meta.th} color={meta.color} size="md" />
                    <div className="mt-2 text-xl font-extrabold text-white">฿{price}</div>
                    <div className="text-xs text-slate-500">/ตัว</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {/* AI Providers row */}
            <tr className="border-b border-slate-800">
              <td className="p-4 text-sm text-slate-400 bg-slate-900/20">AI Providers</td>
              {COMPARE_TIERS.map(({ tier, aiProviders }) => (
                <td key={tier} className={`p-4 text-center ${tier === "PRO" ? "border-x border-indigo-500/20" : ""}`}>
                  <div className="flex flex-wrap justify-center gap-1">
                    {aiProviders.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                        style={{
                          backgroundColor: `${AI_PROVIDER_LABEL[p].color}20`,
                          color: AI_PROVIDER_LABEL[p].color,
                        }}
                      >
                        {AI_PROVIDER_LABEL[p].name}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Skin row */}
            <tr className="border-b border-slate-800">
              <td className="p-4 text-sm text-slate-400 bg-slate-900/20">สกิน</td>
              {COMPARE_TIERS.map(({ tier, skinCount }) => (
                <td key={tier} className={`p-4 text-center text-sm font-semibold text-white ${tier === "PRO" ? "border-x border-indigo-500/20" : ""}`}>
                  {skinCount}
                </td>
              ))}
            </tr>

            {/* Feature rows */}
            {FEATURE_ROWS.map((feature, idx) => (
              <tr key={feature} className={idx < FEATURE_ROWS.length - 1 ? "border-b border-slate-800" : ""}>
                <td className="p-4 text-sm text-slate-400 bg-slate-900/20">{feature}</td>
                {COMPARE_TIERS.map(({ tier, features }) => {
                  const val = features[feature];
                  return (
                    <td key={tier} className={`p-4 text-center ${tier === "PRO" ? "border-x border-indigo-500/20" : ""}`}>
                      {typeof val === "boolean" ? (
                        val ? (
                          <Check className="h-5 w-5 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-white">{val}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* CTA row */}
            <tr>
              <td className="p-4 bg-slate-900/20" />
              {COMPARE_TIERS.map(({ tier }) => {
                const meta = ROBOT_TIER_LABEL[tier];
                return (
                  <td key={tier} className={`p-4 text-center ${tier === "PRO" ? "border-x border-indigo-500/20 bg-indigo-500/5" : ""}`}>
                    <Link href={`/products/robots?tier=${tier}`}>
                      <BaseButton variant={tier === "PRO" ? "primary" : "outline"} size="sm" fullWidth>
                        เลือก {meta.th}
                      </BaseButton>
                    </Link>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
