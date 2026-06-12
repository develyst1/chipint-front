"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Cpu, Bot } from "lucide-react";
import { useCart } from "@/context/cart/CartProvider";

const NAV_LINKS = [
  { href: "/products/robots", label: "หุ่นยนต์ AI", icon: Bot },
  { href: "/products/chips", label: "ชิป & อุปกรณ์", icon: Cpu },
  { href: "/compare", label: "เปรียบเทียบ" },
];

export default function Header() {
  const { cart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 border border-indigo-500/40 group-hover:bg-indigo-500/30 transition-colors">
              <Cpu className="h-5 w-5 text-indigo-400" />
            </div>
            <span className="text-xl font-bold">
              <span className="gradient-text">Chip</span>
              <span className="text-slate-100">Int</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 hover:border-indigo-500 hover:bg-indigo-500/10 transition-all"
            >
              <ShoppingCart className="h-5 w-5 text-slate-300" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                  {cart.itemCount > 9 ? "9+" : cart.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-700"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 py-3 space-y-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
