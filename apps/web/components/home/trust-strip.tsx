"use client"

import {
  BadgeCheck,
  Truck,
  CreditCard,
  Headphones,
  type LucideIcon,
} from "lucide-react"

import { useAppSelector } from "@/hooks/store"

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
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {trustItems.map((item, index) => {
          const Icon = item.icon

          return (
            <div
              key={item.titleEn}
              className={[
                "flex items-center gap-3 py-4 sm:py-5",
                index % 2 === 1 ? "border-l border-border pl-4 sm:pl-6" : "",
                index >= 2 ? "border-t border-border lg:border-t-0" : "",
                index > 0 ? "lg:border-l lg:border-border lg:pl-6" : "",
              ].join(" ")}
            >
              <Icon
                className="size-5 shrink-0 text-primary"
                strokeWidth={1.8}
              />

              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {isZh ? item.titleZh : item.titleEn}
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
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