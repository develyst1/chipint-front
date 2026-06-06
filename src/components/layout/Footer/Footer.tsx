import Link from "next/link";
import { Cpu, Github, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/50 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 border border-indigo-500/40">
                <Cpu className="h-4 w-4 text-indigo-400" />
              </div>
              <span className="text-lg font-bold">
                <span className="gradient-text">Chip</span>
                <span className="text-slate-100">Int</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              จำหน่ายหุ่นยนต์ AI ขนาดเล็กและชิปอัจฉริยะ รองรับ AI หลายผู้ให้บริการ ทั้ง OpenAI, xAI, DeepSeek และ Gemini
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-3">สินค้า</h3>
            <ul className="space-y-2">
              {[
                { href: "/products/robots", label: "หุ่นยนต์ AI" },
                { href: "/products/chips", label: "ชิปและอุปกรณ์" },
                { href: "/compare", label: "เปรียบเทียบรุ่น" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-3">ช่วยเหลือ</h3>
            <ul className="space-y-2">
              {[
                { href: "/shipping", label: "การจัดส่ง" },
                { href: "/warranty", label: "การรับประกัน" },
                { href: "/contact", label: "ติดต่อเรา" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© 2025 ChipInt. สงวนลิขสิทธิ์</p>
          <div className="flex items-center gap-3">
            <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
