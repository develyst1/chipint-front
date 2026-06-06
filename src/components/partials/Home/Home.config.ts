import type { AiProvider, RobotTier } from "@/types/app/product";

export const HERO_TAGLINE = "หุ่นยนต์ AI แห่งอนาคต";
export const HERO_SUBTITLE = "เลือกสรรหุ่นยนต์อัจฉริยะพร้อม AI ระดับโลก ทั้ง OpenAI, xAI, DeepSeek และ Gemini";

export const TIER_FEATURES: Record<RobotTier, { features: string[]; highlight: string }> = {
  STARTER: {
    highlight: "เริ่มต้นสู่โลก AI",
    features: ["ถามตอบด้วย AI", "เชื่อมต่อ Wi-Fi", "อัพเดทผ่านแอพ"],
  },
  STANDARD: {
    highlight: "ประสิทธิภาพสูงขึ้น",
    features: ["AI หลายโมเดล", "สกิน 5 แบบ", "สั่งงานด้วยเสียง", "เชื่อมต่อสมาร์ทโฮม"],
  },
  PRO: {
    highlight: "สำหรับมืออาชีพ",
    features: ["AI แบบกำหนดเอง", "สกิน 15 แบบ", "รู้จำใบหน้า", "ควบคุมอุปกรณ์ IoT", "API เปิด"],
  },
  ELITE: {
    highlight: "ระดับสูงสุด",
    features: [
      "AI ไม่จำกัด",
      "สกินไม่จำกัด",
      "ประมวลผลขอบ Edge AI",
      "ทำงานหลายภาษา",
      "โปรแกรมได้เอง",
      "ซัพพอร์ตพิเศษ",
    ],
  },
};

export const AI_PROVIDERS_SHOWCASE: AiProvider[] = ["OPENAI", "XAI", "DEEPSEEK", "GEMINI"];
