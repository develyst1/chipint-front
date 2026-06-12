import type { Metadata } from "next";
import { RobotDetailContent } from "@/components/partials/RobotDetail";

export const metadata: Metadata = {
  title: "รายละเอียดหุ่นยนต์",
};

export default async function RobotDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <RobotDetailContent slug={slug} />;
}
