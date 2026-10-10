"use client"

import React, { useState } from "react"
import { ChevronDown, ShieldCheck, Truck, Sparkles } from "lucide-react"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

export function BrandSeoSection() {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const faqs = isZh
    ? [
        {
          q: "Happymart 銷售的南亞品牌是否保證為原裝正品？",
          a: "是的。Happymart 與印度、巴基斯坦、孟加拉、斯里蘭卡及阿聯酋之原廠官方分銷商及認證進口商直接合作，所有品牌商品均具備完整進口檢驗證書及合法標籤，絕不銷售平行偽冒產品。",
        },
        {
          q: "如何在眾多品牌中找到適合特定菜餚的香料或香米？",
          a: "您可以點擊任何品牌（如 India Gate 印度香米、Shan 清真香料配方或 Haldiram's 小食）進入其專區，瀏覽詳細的產品介紹、烹飪配方及香港本地烹飪建議。您亦可使用頁頂搜尋欄直接輸入菜式名稱（如 Biryani 或 Chai）。",
        },
        {
          q: "如果想購買的南亞傳統品牌在網站上沒有陳列，可以如何反饋？",
          a: "我們持續每週空運與海運更新商品品類。如果您尋找特定的南亞地域品牌或草本護理產品，歡迎透過右下角 WhatsApp 即時客服聯繫我們的採購專員進行專屬訂購諮詢。",
        },
      ]
    : [
        {
          q: "Are all brands sold on Happymart guaranteed authentic?",
          a: "Yes. Happymart partners directly with authorized brand manufacturers and certified Hong Kong importers from India, Pakistan, Bangladesh, Nepal, Sri Lanka, and the UAE. All items carry valid certifications and origin guarantees.",
        },
        {
          q: "How can I choose the best brand for biryani or regional curries?",
          a: "Each brand's landing page features curated selections and cooking advice. For biryani, we recommend India Gate and Daawat aged basmati rice combined with Shan or National spice blends. Check the brand page filters for dietary badges like Halal and Vegetarian.",
        },
        {
          q: "Can I request a specific regional brand that is not yet listed?",
          a: "Absolutely! We expand our catalog weekly. If you are looking for a specialized regional brand, pulse, or Ayurvedic remedy, message our customer support team directly via WhatsApp.",
        },
      ]

  return (
    <section className="mt-12 rounded-3xl border border-border/70 bg-card/60 p-6 sm:p-8">
      {/* Brand Trust Badges Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 border-b border-border/60 pb-8">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">
              {isZh ? "100% 正品原產保證" : "100% Certified Origin"}
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {isZh
                ? "直接對接原產地各大老字號與認證製造商，每批貨品經嚴格質檢。"
                : "Sourced directly from origin heritage producers and official distributors."}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Truck className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">
              {isZh ? "全港溫控直送" : "Temperature-Controlled Delivery"}
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {isZh
                ? "空運新鮮香料與乾貨經標準溫控倉儲，最快即日或翌日直送全港。"
                : "Air and sea freight stored under controlled conditions and delivered territory-wide."}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">
              {isZh ? "純素與清真嚴格標註" : "Veg & Halal Transparent"}
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {isZh
                ? "所有品牌商品均清楚註明素食、純素或清真認證，符合不同家庭需求。"
                : "Clear ingredient auditing and certification labels for peace of mind."}
            </p>
          </div>
        </div>
      </div>

      {/* Brand FAQs Accordion */}
      <div className="pt-8">
        <h3 className="font-heading text-lg font-bold text-foreground">
          {isZh ? "品牌選購常見問題" : "Frequently Asked Questions About Brands"}
        </h3>
        <div className="mt-4 divide-y divide-border/60">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index
            return (
              <div key={faq.q} className="py-3">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
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
                {isOpen ? (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
