"use client"

import {
  BadgeCheck,
  Truck,
  CreditCard,
  Headphones,
  type LucideIcon,
} from "lucide-react"

import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

type TrustItem = {
  icon: LucideIcon
  titleEn: string
  titleZh: string
  descriptionEn: string
  descriptionZh: string
}

const trustItems: TrustItem[] = [
  {
    icon: BadgeCheck,
    titleEn: "Authentic Imports",
    titleZh: "正品進口",
    descriptionEn: "Trusted South Asian brands",
    descriptionZh: "精選南亞品牌",
  },
  {
    icon: Truck,
    titleEn: "Hong Kong Delivery",
    titleZh: "全港配送",
    descriptionEn: "Free delivery over HK$500",
    descriptionZh: "滿 HK$500 免運",
  },
  {
    icon: CreditCard,
    titleEn: "Secure Payment",
    titleZh: "安全付款",
    descriptionEn: "Cards, PayMe and more",
    descriptionZh: "信用卡、PayMe 等",
  },
  {
    icon: Headphones,
    titleEn: "Local Support",
    titleZh: "本地客服",
    descriptionEn: "Here when you need help",
    descriptionZh: "隨時為你提供協助",
  },
]

export function TrustStrip() {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  return (
    <section className="border-y border-border bg-muted/30">
      <div className="max-w-8xl mx-auto grid grid-cols-4 px-2 sm:px-6 lg:px-8">
        {trustItems.map((item, index) => {
          const Icon = item.icon

          return (
            <div
              key={item.titleEn}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-center sm:flex-row sm:gap-3 sm:py-4 sm:text-left lg:py-5",
                index > 0 && "border-l border-border pl-1.5 sm:pl-4 lg:pl-6"
              )}
            >
              <Icon
                className="size-4 shrink-0 text-primary sm:size-5"
                strokeWidth={1.8}
              />

              <div className="min-w-0">
                <p className="text-[10px] leading-tight font-semibold text-foreground sm:text-xs sm:leading-snug lg:text-sm">
                  {isZh ? item.titleZh : item.titleEn}
                </p>

                <p className="mt-0.5 line-clamp-1 text-[9px] leading-tight text-muted-foreground sm:line-clamp-none sm:text-[11px] sm:leading-snug lg:text-xs">
                  {isZh ? item.descriptionZh : item.descriptionEn}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
