"use client";

import { AI_PROVIDERS_SHOWCASE } from "./Home.config";
import { AI_PROVIDER_LABEL } from "@/types/app/product";

const AI_DESCRIPTIONS: Record<string, string> = {
  OPENAI: "GPT-4o, o1 — ภาษาธรรมชาติขั้นสูง สำหรับการสนทนาและวิเคราะห์",
  XAI: "Grok 3 — ข้อมูลเรียลไทม์จาก X (Twitter) และ Web",
  DEEPSEEK: "DeepSeek R2 — ต้นทุนต่ำ ประสิทธิภาพสูง เหมาะโค้ดและตรรกะ",
  GEMINI: "Gemini 2.0 Flash — มัลติโมดัลจาก Google รู้จำรูปและเสียง",
};

export default function HomeAiSection() {
  return (
    <section className="py-24 bg-slate-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            รองรับ <span className="gradient-text">AI ทุกผู้ให้บริการ</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            สลับ AI ได้ตามต้องการ ไม่ถูกล็อคกับผู้ให้บริการรายเดียว
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {AI_PROVIDERS_SHOWCASE.map((provider) => {
            const meta = AI_PROVIDER_LABEL[provider];
            return (
              <div
                key={provider}
                className="rounded-xl border border-slate-700 bg-slate-800/60 p-6 hover:border-slate-600 transition-colors card-hover"
              >
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold text-sm"
                  style={{ backgroundColor: `${meta.color}30`, border: `1px solid ${meta.color}50`, color: meta.color }}
                >
                  {meta.name.slice(0, 2).toUpperCase()}
                </div>
                <h3 className="font-semibold text-white mb-2">{meta.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {AI_DESCRIPTIONS[provider]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
