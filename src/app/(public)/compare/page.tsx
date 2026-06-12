import type { Metadata } from "next";
import { CompareContent } from "@/components/partials/Compare";

export const metadata: Metadata = {
  title: "เปรียบเทียบรุ่น",
  description: "เปรียบเทียบหุ่นยนต์ ChipInt ทุกระดับ Starter, Standard, Pro, Elite",
};

export default function ComparePage() {
  return <CompareContent />;
}
