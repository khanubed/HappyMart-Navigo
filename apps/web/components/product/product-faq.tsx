"use client"

import React, { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import type { Product } from "@workspace/typescript-config/types"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

interface ProductFaqProps {
  product: Product
  className?: string
}

export function ProductFaq({ product, className }: ProductFaqProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = isZh
    ? [
        {
          q: `這款 ${product.titleZh || product.titleEn} 是否保證為正品原裝進口？`,
          a: `是的，Happymart 直接對接 ${product.originCountry} 原廠認證經銷商，所有商品均具備正規海關檢驗證書與合法標籤，確保正品正貨直送香港。`,
        },
        {
          q: "在香港潮濕炎熱天氣下，應如何妥善存放此商品？",
          a:
            product.storageInstructions ||
            "建議存放於乾燥陰涼處，遠離陽光直射與爐灶高溫。開封後請務必密封放置於密閉保鮮盒內，避免受潮。",
        },
        {
          q: "下單後幾時可以收到？有免運費優惠嗎？",
          a: "全單買滿 HK$500 即享港九新界全免運費！每日下午 4:00 前確認訂單，最快翌日經專屬溫控車隊送達指定地址。",
        },
        {
          q: "商品如在送貨途中受損或有質量問題，如何申請退換？",
          a: "Happymart 提供 7 天品質問題保障。若送抵時包裝受損或品質異常，只需拍照並透過右下角 WhatsApp 客服聯絡我們，我們將在 24 小時內安排補送或退款。",
        },
      ]
    : [
        {
          q: `Is ${product.titleEn} 100% authentic imported from ${product.originCountry}?`,
          a: `Yes. Happymart partners directly with authorized manufacturers and certified distributors in ${product.originCountry}. All imports adhere to Hong Kong Food Safety regulations.`,
        },
        {
          q: "How should I store this product in Hong Kong's humid climate?",
          a:
            product.storageInstructions ||
            "Store in a cool, dry pantry away from heat and direct sunlight. Keep in an airtight container once opened to preserve freshness.",
        },
        {
          q: "What is the delivery timeline and free shipping threshold?",
          a: "Orders over HK$500 qualify for free territory-wide delivery across HK Island, Kowloon, and NT. Orders placed by 4:00 PM are delivered as early as the next day.",
        },
        {
          q: "What is the return policy if the packaging is damaged upon arrival?",
          a: "We offer a 7-day quality guarantee. If an item arrives damaged or compromised, send photos to our WhatsApp support team for an immediate replacement or full refund.",
        },
      ]

  return (
    <div className={cn("rounded-3xl border border-border/80 bg-card p-4 sm:p-6 lg:p-8 shadow-2xs space-y-4", className)}>
      <div className="flex items-center gap-2 border-b border-border/70 pb-3">
        <HelpCircle className="size-4 text-primary" />
        <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">
          {isZh ? "商品常見問題解答" : "Frequently Asked Questions"}
        </h3>
      </div>

      <div className="divide-y divide-border/60">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx
          return (
            <div key={idx} className="py-3">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between text-left text-xs sm:text-sm font-semibold text-foreground transition-colors hover:text-primary"
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180 text-primary"
                  )}
                />
              </button>
              {isOpen && (
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
