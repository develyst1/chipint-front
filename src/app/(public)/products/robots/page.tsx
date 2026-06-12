import type { Metadata } from "next";
import { RobotCatalogContent } from "@/components/partials/RobotCatalog";
import type { RobotTier } from "@/types/app/product";

export const metadata: Metadata = {
  title: "หุ่นยนต์ AI",
  description: "เลือกซื้อหุ่นยนต์ AI ขนาดเล็กหลากหลายรุ่น รองรับ OpenAI, xAI, DeepSeek, Gemini",
};

export default async function RobotsPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const { tier } = await searchParams;
  return <RobotCatalogContent initialTier={tier as RobotTier | undefined} />;
}
