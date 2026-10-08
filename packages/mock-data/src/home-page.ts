export interface TrustBadge {
  id: string
  titleEn: string
  titleZh: string
  descriptionEn: string
  descriptionZh: string
  icon: string
}

export const trustBadges: TrustBadge[] = [
  {
    id: "trust-authentic",
    titleEn: "100% Authentic Imports",
    titleZh: "100% 正品原產地進口",
    descriptionEn: "Directly sourced from trusted South Asian producers with full certification.",
    descriptionZh: "由印度、巴基斯坦等原產地直接採購，合格進口檢驗有保障。",
    icon: "ShieldCheck",
  },
  {
    id: "trust-secure",
    titleEn: "Secure Hong Kong Payments",
    titleZh: "安全多元支付方式",
    descriptionEn: "Supports Visa, Mastercard, Apple Pay, PayMe & AlipayHK with 256-bit encryption.",
    descriptionZh: "支援信用卡、Apple Pay、PayMe 及支付寶香港，交易全加密。",
    icon: "Lock",
  },
  {
    id: "trust-delivery",
    titleEn: "Territory-Wide HK Delivery",
    titleZh: "全香港島九龍新界配送",
    descriptionEn: "Same-day, next-day and scheduled evening slots. Free shipping above HK$500.",
    descriptionZh: "即日達、次日達及自選晚間時段，滿 HK$500 即享免運費。",
    icon: "Truck",
  },
  {
    id: "trust-support",
    titleEn: "Dedicated Customer Support",
    titleZh: "本地親切即時客服",
    descriptionEn: "English, Cantonese, Hindi and Urdu customer support via WhatsApp & phone.",
    descriptionZh: "透過 WhatsApp 即時協助，提供中英雙語及南亞母語溝通支援。",
    icon: "Headphones",
  },
]
