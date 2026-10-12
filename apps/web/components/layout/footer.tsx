"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Globe, CreditCard } from "lucide-react"
import { parentCategories, categories, countries } from "@workspace/mock-data"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { setLanguage } from "@/features/ui/localeSlice"
import { getThemeLogo } from "@/config/themes"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"
import { cn } from "@workspace/ui/lib/utils"

export function Footer() {
  const dispatch = useAppDispatch()
  const themeId = useAppSelector((state) => state.theme.themeId)
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  return (
    <footer className="mt-4 border-t border-border bg-card pt-4 pb-24 text-foreground transition-colors lg:pb-12">
      <div className="max-w-8xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Top Links Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Column 1: Brand & Direct Contact */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-xl border border-border/50 shadow-xs">
                <Image
                  src={getThemeLogo(themeId)}
                  alt="Happymart Supermarket Logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-heading text-2xl font-black tracking-tight">
                Happy<span className="text-accent">mart</span>
              </span>
            </Link>

            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
              {isZh
                ? "香港最具規模的南亞進口食品線上超級市場。匯聚印度、巴基斯坦、孟加拉、尼泊爾、斯里蘭卡及阿聯酋 4,000+ 道地調味料、香米、全麥麵粉、零食及冷凍食品，全港直達。"
                : "Hong Kong's premier specialist online supermarket for South Asian groceries. 4,000+ authentic imported staples delivered territory-wide across HK Island, Kowloon, and New Territories."}
            </p>

            <div className="space-y-2 pt-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span>Unit 802, Kwai Chung Logistics Centre, Hong Kong</span>
              </div>
              <a
                href="https://wa.me/85251234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-medium transition-colors hover:text-[#25D366]"
              >
                <WhatsAppIcon className="size-4 shrink-0 text-[#25D366]" />
                <span>+852 5123 4567 (WhatsApp / Support)</span>
              </a>
              <div className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-primary" />
                <span>support@happymart.hk</span>
              </div>
            </div>
          </div>

          {/* Column 2: Shop by Department */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold tracking-wider text-foreground uppercase">
              {isZh ? "熱門專區" : "Departments"}
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {parentCategories.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/categories/${p.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {isZh ? p.nameZh : p.nameEn}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/brands"
                  className="font-semibold text-primary transition-colors hover:underline"
                >
                  {isZh ? "★ 瀏覽全部品牌" : "★ Browse All Brands"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Sourced Countries */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold tracking-wider text-foreground uppercase">
              {isZh ? "進口國家" : "Import Origins"}
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {countries.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/countries/${c.code.toLowerCase()}`}
                    className="flex items-center gap-1.5 transition-colors hover:text-primary"
                  >
                    <span>{c.flag}</span>
                    <span>{isZh ? c.nameZh : c.nameEn}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Customer Support & Policies */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold tracking-wider text-foreground uppercase">
              {isZh ? "顧客服務與條款" : "Help & Policies"}
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/help/faq"
                  className="transition-colors hover:text-primary"
                >
                  {isZh ? "常見問題 (FAQ)" : "Delivery FAQs"}
                </Link>
              </li>
              <li>
                <Link
                  href="/help/shipping"
                  className="transition-colors hover:text-primary"
                >
                  {isZh ? "配送時間與收費" : "Shipping Policy"}
                </Link>
              </li>
              <li>
                <Link
                  href="/help/returns"
                  className="transition-colors hover:text-primary"
                >
                  {isZh ? "退款與換貨保障" : "Refund Policy"}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-primary"
                >
                  {isZh ? "私隱政策 (PDPO)" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-primary"
                >
                  {isZh ? "服務條款" : "Terms & Conditions"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Accepted Payment Badges & Localization */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          {/* Payment Methods */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 flex items-center gap-1 font-medium text-foreground">
              <CreditCard className="size-4 text-primary" />
              {isZh ? "安全支付方式:" : "Accepted Payments:"}
            </span>
            {[
              "Visa",
              "Mastercard",
              "Apple Pay",
              "PayMe by HSBC",
              "AlipayHK",
              "WeChat Pay HK",
            ].map((method) => (
              <span
                key={method}
                className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-[11px] font-bold text-foreground"
              >
                {method}
              </span>
            ))}
          </div>

          {/* Region & Language Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1">
              <Globe className="size-3.5 text-primary" />
              <span className="font-bold text-foreground">Hong Kong (HKD)</span>
            </div>

            <div className="flex items-center overflow-hidden rounded-lg border border-border bg-background">
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => dispatch(setLanguage("en"))}
                className={cn(
                  "px-2.5 py-1 font-bold transition-colors",
                  !isZh
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                EN
              </button>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => dispatch(setLanguage("zh-HK"))}
                className={cn(
                  "px-2.5 py-1 font-bold transition-colors",
                  isZh
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                繁中
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-border/60 pt-6 text-center text-[11px] text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Happymart Hong Kong Limited. All rights
            reserved. Specialist South Asian Supermarket Platform.
          </p>
        </div>
      </div>
    </footer>
  )
}
