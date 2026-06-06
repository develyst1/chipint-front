import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/context/query/QueryProvider";
import { CartProvider } from "@/context/cart/CartProvider";

export const metadata: Metadata = {
  title: {
    default: "ChipInt — หุ่นยนต์ AI และชิปอัจฉริยะ",
    template: "%s | ChipInt",
  },
  description:
    "จำหน่ายหุ่นยนต์ AI ขนาดเล็กและชิปอัจฉริยะ รองรับ OpenAI, xAI, DeepSeek, Gemini หลากหลายสกินและระดับ",
  keywords: ["หุ่นยนต์ AI", "ชิป", "OpenAI", "Gemini", "DeepSeek", "xAI", "robot"],
  openGraph: {
    title: "ChipInt — หุ่นยนต์ AI และชิปอัจฉริยะ",
    description: "จำหน่ายหุ่นยนต์ AI ขนาดเล็กและชิปอัจฉริยะ",
    type: "website",
    locale: "th_TH",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <QueryProvider>
          <CartProvider>{children}</CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
