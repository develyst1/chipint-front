import type { Metadata } from "next";
import { MemoryStick } from "lucide-react";

export const metadata: Metadata = {
  title: "ชิปและอุปกรณ์",
  description: "เลือกซื้อชิปและอุปกรณ์เสริมสำหรับหุ่นยนต์ ChipInt",
};

export default function ChipsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-white mb-2">
        ชิป <span className="gradient-text">& อุปกรณ์</span>
      </h1>
      <p className="text-slate-400 mb-8">อัพเกรดหุ่นยนต์ของคุณด้วยชิปประสิทธิภาพสูง</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 card-hover">
            <div className="h-40 rounded-xl bg-slate-900/60 border border-slate-700 flex items-center justify-center mb-4">
              <MemoryStick strokeWidth={1.25} className="h-16 w-16 text-indigo-400/60" />
            </div>
            <div className="h-4 rounded bg-slate-700/60 mb-2 w-3/4" />
            <div className="h-3 rounded bg-slate-700/40 mb-4 w-1/2" />
            <div className="h-6 rounded bg-indigo-500/20 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
