import type { ThemeId } from "@workspace/typescript-config/types"

export type { ThemeId }

export interface ThemeConfig {
  id: ThemeId
  name: string
  nameZh: string
  description: string
  descriptionZh: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  logoSrc: string
}

export const THEME_LOGOS: Record<ThemeId, string> = {
  "fresh-market": "/images/brand/Happymartlogo-fresh-market.png",
  "market-red": "/images/brand/Happymartlogo-market-red.png",
  "urban-blue": "/images/brand/Happymartlogo-urban-blue.png",
  "pantry-earth": "/images/brand/Happymartlogo-pantry-earth.png",
  "modern-plum": "/images/brand/Happymartlogo-modern-plum.png",
}

export const THEMES: ThemeConfig[] = [
  {
    id: "fresh-market",
    name: "Fresh Market",
    nameZh: "鮮綠市集",
    description: "Deep grocery green with saffron accents and fresh supermarket clarity.",
    descriptionZh: "自然生鮮綠為主調，搭配暖橙點綴，打造清新信賴的超市氛圍。",
    primaryColor: "#1F6F54",
    secondaryColor: "#EAF2EE",
    accentColor: "#E8A33D",
    logoSrc: THEME_LOGOS["fresh-market"],
  },
  {
    id: "market-red",
    name: "Market Red",
    nameZh: "熱情市集紅",
    description: "Retail-red branding with warm surfaces, ideal for weekly promotions.",
    descriptionZh: "醒目熱情的促銷紅，搭配溫和暖灰底色，主打超值折扣活動感。",
    primaryColor: "#B83232",
    secondaryColor: "#F8EAE8",
    accentColor: "#E9B949",
    logoSrc: THEME_LOGOS["market-red"],
  },
  {
    id: "urban-blue",
    name: "Urban Blue",
    nameZh: "都會蔚藍",
    description: "Contemporary blue with crisp surfaces and structured retail clarity.",
    descriptionZh: "現代都會藍調，清爽明快，契合香港現代零售美學。",
    primaryColor: "#2457A7",
    secondaryColor: "#E9F0FB",
    accentColor: "#E6B655",
    logoSrc: THEME_LOGOS["urban-blue"],
  },
  {
    id: "pantry-earth",
    name: "Pantry Earth",
    nameZh: "豐收大地褐",
    description: "Warm cream surfaces, rich earthy brown, and clay accents for pantry staples.",
    descriptionZh: "溫暖奶油底色與大地香料棕，演繹穀物與傳統進口食材的醇厚質感。",
    primaryColor: "#8A5A35",
    secondaryColor: "#F4E9D7",
    accentColor: "#B86B4B",
    logoSrc: THEME_LOGOS["pantry-earth"],
  },
  {
    id: "modern-plum",
    name: "Modern Plum",
    nameZh: "典雅紫李",
    description: "Muted plum-purple with lavender surfaces and warm gold highlights.",
    descriptionZh: "低調優雅的李紫色調與薰衣草淡雅底色，營造高級精緻市集質感。",
    primaryColor: "#6552A3",
    secondaryColor: "#EFEAF9",
    accentColor: "#D4A85B",
    logoSrc: THEME_LOGOS["modern-plum"],
  },
]

export const DEFAULT_THEME_ID: ThemeId = "fresh-market"

export function isValidThemeId(themeId: string | null | undefined): themeId is ThemeId {
  return THEMES.some((t) => t.id === themeId)
}

export function getThemeLogo(themeId: string | null | undefined): string {
  if (isValidThemeId(themeId)) {
    return THEME_LOGOS[themeId]
  }
  return THEME_LOGOS[DEFAULT_THEME_ID]
}
