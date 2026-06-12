"use client";

import Link from "next/link";
import { ArrowRight, Zap, Shield, Cpu, Bot } from "lucide-react";
import { BaseButton } from "@/components/ui/Button";
import { HERO_TAGLINE, HERO_SUBTITLE } from "./Home.config";

const STATS = [
  { value: "4+", label: "AI Providers" },
  { value: "20+", label: "สกินที่เลือกได้" },
  { value: "4", label: "ระดับรุ่น" },
  { value: "24/7", label: "ซัพพอร์ต" },
];

export default function HomeHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-grid">
      {/* Ambient blobs */}
      <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300">
              <Zap className="h-3.5 w-3.5" />
              เปิดตัวรุ่นใหม่ Generation 3
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
              <span className="text-white">{HERO_TAGLINE}</span>
              <br />
              <span className="gradient-text text-glow">ในมือคุณ</span>
            </h1>

            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">{HERO_SUBTITLE}</p>

            <div className="flex flex-wrap gap-3">
              <Link href="/products/robots">
                <BaseButton size="lg" variant="primary">
                  ดูหุ่นยนต์ทั้งหมด
                  <ArrowRight className="h-4 w-4" />
                </BaseButton>
              </Link>
              <Link href="/compare">
                <BaseButton size="lg" variant="outline">
                  เปรียบเทียบรุ่น
                </BaseButton>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-4 gap-4">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-extrabold gradient-text">{value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Robot visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-pulse" />
              <div className="h-80 w-80 rounded-full bg-gradient-to-br from-indigo-900/40 to-slate-800/60 border border-indigo-500/30 flex items-center justify-center glow-primary">
                {/* Placeholder visual — replace with actual 3D render / product image */}
                <div className="text-center">
                  <Bot strokeWidth={1.25} className="h-28 w-28 mx-auto mb-2 text-indigo-300 text-glow" />
                  <div className="text-xs text-indigo-300 font-mono">CHIPINT-G3</div>
                </div>
              </div>

              {/* Floating chips */}
              {[
                { icon: <Cpu className="h-4 w-4 text-indigo-400" />, label: "AI Chip", pos: "-top-4 left-4" },
                { icon: <Shield className="h-4 w-4 text-cyan-400" />, label: "Secure", pos: "-bottom-4 right-4" },
                { icon: <Zap className="h-4 w-4 text-yellow-400" />, label: "Fast", pos: "top-1/2 -right-10" },
              ].map(({ icon, label, pos }) => (
                <div
                  key={label}
                  className={`absolute ${pos} flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/90 px-3 py-1.5 text-xs text-slate-300 backdrop-blur-sm`}
                >
                  {icon}
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
