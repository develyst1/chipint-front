import type { Metadata } from "next";
import { CartContent } from "@/components/partials/Cart";

export const metadata: Metadata = {
  title: "ตะกร้าสินค้า",
};

export default function CartPage() {
  return <CartContent />;
}
