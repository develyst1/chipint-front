"use client";

import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from "lucide-react";
import { BaseButton } from "@/components/ui/Button";
import { useCart } from "@/context/cart/CartProvider";

export default function CartContent() {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <ShoppingBag className="h-16 w-16 text-slate-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-300 mb-2">ตะกร้าว่างเปล่า</h2>
        <p className="text-slate-500 mb-8">เพิ่มสินค้าที่คุณชื่นชอบลงในตะกร้า</p>
        <Link href="/products/robots">
          <BaseButton variant="primary">เลือกซื้อสินค้า</BaseButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-white">
          ตะกร้าสินค้า <span className="text-slate-500 font-normal text-lg">({cart.itemCount} ชิ้น)</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1.5"
        >
          <Trash2 className="h-4 w-4" /> ล้างทั้งหมด
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl border border-slate-700 bg-slate-800/60 p-4"
            >
              <div className="h-20 w-20 shrink-0 rounded-xl border border-slate-700 bg-slate-900 flex items-center justify-center">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt={item.productNameTh} className="h-full w-full object-contain p-2" />
                ) : (
                  <span className="text-3xl">🤖</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/robots/${item.productSlug}`}
                  className="font-semibold text-white hover:text-indigo-300 transition-colors"
                >
                  {item.productNameTh}
                </Link>
                <div className="text-xs text-slate-500 mt-0.5">
                  {item.selectedSkinName && <span>สกิน: {item.selectedSkinName} · </span>}
                  {item.selectedAiProvider && <span>AI: {item.selectedAiProvider}</span>}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-slate-700 bg-slate-900">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 text-slate-400 hover:text-white transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 text-slate-400 hover:text-white transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white">฿{item.subtotal.toLocaleString()}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-600 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6 h-fit sticky top-24">
          <h2 className="text-lg font-bold text-white mb-5">สรุปคำสั่งซื้อ</h2>

          <div className="space-y-3 text-sm mb-5">
            <div className="flex justify-between text-slate-400">
              <span>ยอดรวมสินค้า</span>
              <span className="text-white">฿{cart.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>ค่าจัดส่ง</span>
              <span className={cart.shippingFee === 0 ? "text-emerald-400" : "text-white"}>
                {cart.shippingFee === 0 ? "ฟรี!" : `฿${cart.shippingFee}`}
              </span>
            </div>
            {cart.shippingFee > 0 && (
              <p className="text-xs text-slate-500">สั่งซื้อครบ ฿5,000 จัดส่งฟรี</p>
            )}
            <div className="border-t border-slate-700 pt-3 flex justify-between font-bold text-base">
              <span className="text-white">ยอดรวมทั้งหมด</span>
              <span className="gradient-text text-lg">฿{cart.total.toLocaleString()}</span>
            </div>
          </div>

          <BaseButton variant="primary" size="lg" fullWidth>
            ดำเนินการสั่งซื้อ <ArrowRight className="h-4 w-4" />
          </BaseButton>

          <Link href="/products/robots" className="block text-center mt-3 text-sm text-slate-500 hover:text-slate-300 transition-colors">
            เลือกซื้อสินค้าเพิ่ม
          </Link>
        </div>
      </div>
    </div>
  );
}
