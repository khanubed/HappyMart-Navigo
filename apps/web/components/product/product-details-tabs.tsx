"use client"

import React, { useState } from "react"
import {
  FileText,
  ListOrdered,
  Activity,
  Box,
  Globe2,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react"
import type { Product, ProductVariant } from "@workspace/typescript-config/types"
import { NutritionTable } from "./nutrition-table"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

interface ProductDetailsTabsProps {
  product: Product
  activeVariant: ProductVariant
  className?: string
}

type TabKey = "description" | "ingredients" | "nutrition" | "storage" | "origin" | "policies"

export function ProductDetailsTabs({
  product,
  activeVariant,
  className,
}: ProductDetailsTabsProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const [activeTab, setActiveTab] = useState<TabKey>("description")

  const tabs: { key: TabKey; labelEn: string; labelZh: string; icon: React.ElementType }[] = [
    { key: "description", labelEn: "Description", labelZh: "詳細介紹", icon: FileText },
    { key: "ingredients", labelEn: "Ingredients & Allergens", labelZh: "原材料與致敏原", icon: ListOrdered },
    { key: "nutrition", labelEn: "Nutrition Table", labelZh: "營養資料表", icon: Activity },
    { key: "storage", labelEn: "Storage & Usage", labelZh: "儲存與食用方法", icon: Box },
    { key: "origin", labelEn: "Origin & Importer", labelZh: "原產地與進口商", icon: Globe2 },
    { key: "policies", labelEn: "Policies & Safety", labelZh: "食品安全與退換條款", icon: ShieldAlert },
  ]

  const description = isZh && product.descriptionZh ? product.descriptionZh : product.descriptionEn

  return (
    <div
      className={cn(
        "rounded-3xl border border-border/80 bg-card p-4 sm:p-6 lg:p-8 shadow-2xs space-y-6",
        className
      )}
    >
      {/* Tab Navigation Header */}
      <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto border-b border-border/70 pb-3">
        {tabs.map((t) => {
          const Icon = t.icon
          const isActive = activeTab === t.key
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveTab(t.key)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer",
                isActive
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-3.5" />
              <span>{isZh ? t.labelZh : t.labelEn}</span>
            </button>
          )
        })}
      </div>

      {/* Tab 1: Description */}
      {activeTab === "description" && (
        <div className="space-y-5 max-w-4xl text-xs sm:text-sm leading-relaxed text-foreground/90 animate-in fade-in-50 duration-150">
          <p className="text-sm sm:text-base leading-relaxed text-foreground font-medium">
            {description}
          </p>

          <div className="rounded-2xl bg-muted/20 p-4 sm:p-5 border border-border/70 space-y-3">
            <h4 className="font-heading text-sm font-bold text-foreground">
              {isZh ? "主要特色與風味特點" : "Key Product Highlights"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  {isZh
                    ? `100% 正宗原產：由 ${product.originCountry} 優質原產地認證直採進口。`
                    : `Authentic Direct Import: Genuine certified master grade sourced from ${product.originCountry}.`}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  {isZh
                    ? "香港衛生檢驗標準：符合香港食物環境衛生署進口標準。"
                    : "FEHD Compliant: Inspected under Hong Kong food safety and import guidelines."}
                </span>
              </div>
              {product.isVeg && (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    {isZh
                      ? "純素 / 素食友善：全天然植物成分，素食者安心享用。"
                      : "Vegetarian Certified: Pure 100% plant-based recipe suitable for vegetarian diets."}
                  </span>
                </div>
              )}
              {product.isHalal && (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    {isZh
                      ? "清真認證：嚴格符合國際 Halal 食物認證規範。"
                      : "Halal Certified: Formulated and packaged in compliance with international Halal standards."}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Ingredients & Allergens */}
      {activeTab === "ingredients" && (
        <div className="space-y-5 max-w-3xl text-xs sm:text-sm animate-in fade-in-50 duration-150">
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-foreground">
              {isZh ? "原裝食材原料清單" : "Ingredients Statement"}
            </h4>
            <p className="text-muted-foreground leading-relaxed rounded-xl bg-muted/20 p-4 border border-border/60">
              {product.ingredients ||
                (isZh
                  ? "100% 單一天然原料，不含人工香料、防腐劑或色素。"
                  : "100% Natural pure ingredient. Contains no artificial preservatives, additives, or synthetic colors.")}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-sm text-foreground">
              {isZh ? "致敏原警告標示" : "Allergen Advisory"}
            </h4>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-800 dark:text-amber-300">
              <p className="font-medium">
                {product.allergens ||
                  (isZh
                    ? "生產廠房亦處理含有小麥、麩質、花生、木本堅果、大豆、芝麻或芥末之產品。"
                    : "Manufactured in a certified facility that also processes wheat, gluten, peanuts, tree nuts, soy, sesame, and mustard seeds.")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Nutrition Table */}
      {activeTab === "nutrition" && (
        <div className="animate-in fade-in-50 duration-150">
          <NutritionTable nutrition={product.nutrition} />
        </div>
      )}

      {/* Tab 4: Storage & Usage */}
      {activeTab === "storage" && (
        <div className="space-y-5 max-w-3xl text-xs sm:text-sm animate-in fade-in-50 duration-150">
          <div className="rounded-2xl border border-border/70 bg-muted/20 p-4 sm:p-5 space-y-2">
            <h4 className="font-bold text-foreground">
              {isZh ? "儲存條件與保質建議" : "Recommended Storage Conditions"}
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {product.storageInstructions ||
                (isZh
                  ? "請存放在陰涼乾燥處，避免高溫及陽光直射。開封後請密封或放入密實罐，並於最佳賞味期內盡快食用完畢。"
                  : "Store in a cool, dry place away from direct sunlight and moisture. Once opened, transfer contents to an airtight container to preserve maximum aroma and freshness.")}
            </p>
          </div>

          {product.usageInstructions && (
            <div className="rounded-2xl border border-border/70 bg-card p-4 sm:p-5 space-y-2 shadow-2xs">
              <h4 className="font-bold text-foreground">
                {isZh ? "食用及烹調建議" : "Cooking & Serving Directions"}
              </h4>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.usageInstructions}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Origin & Importer */}
      {activeTab === "origin" && (
        <div className="max-w-2xl overflow-hidden rounded-2xl border border-border/80 animate-in fade-in-50 duration-150">
          <table className="w-full text-left text-xs sm:text-sm">
            <tbody className="divide-y divide-border/60">
              <tr className="bg-muted/20">
                <th className="w-1/3 p-3.5 font-semibold text-muted-foreground">
                  {isZh ? "原產國" : "Country of Origin"}
                </th>
                <td className="p-3.5 font-bold text-foreground">{product.originCountry}</td>
              </tr>
              <tr>
                <th className="p-3.5 font-semibold text-muted-foreground">
                  {isZh ? "出品製造商 / 品牌" : "Manufacturer / Brand"}
                </th>
                <td className="p-3.5 text-foreground">{product.brandName}</td>
              </tr>
              <tr className="bg-muted/20">
                <th className="p-3.5 font-semibold text-muted-foreground">
                  {isZh ? "香港總代理 / 進口商" : "HK Sole Importer / Agent"}
                </th>
                <td className="p-3.5 text-foreground">Happymart Logistics (HK) Ltd.</td>
              </tr>
              <tr>
                <th className="p-3.5 font-semibold text-muted-foreground">
                  {isZh ? "進口商地址" : "Importer Address"}
                </th>
                <td className="p-3.5 text-foreground">
                  Unit 12B, Kowloon Bay Cargo Terminal, Kwun Tong, Hong Kong
                </td>
              </tr>
              <tr className="bg-muted/20">
                <th className="p-3.5 font-semibold text-muted-foreground">
                  {isZh ? "食品商登記號碼" : "Food Importer Registration"}
                </th>
                <td className="p-3.5 font-mono text-xs text-foreground">HK-FEHD-IMP-882941</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 6: Policies & Safety */}
      {activeTab === "policies" && (
        <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-muted-foreground leading-relaxed animate-in fade-in-50 duration-150">
          <div className="rounded-2xl border border-border/70 bg-muted/20 p-4 space-y-2">
            <h4 className="font-bold text-foreground">
              {isZh ? "香港食品安全及溯源保證" : "Food Safety & Quality Compliance"}
            </h4>
            <p>
              {isZh
                ? "Happymart 全線進口食品皆獲原廠批次檢測報告，進口香港前經過嚴格檢驗，確保完全無重金屬超標、無違禁添加劑，符合香港法例第 132 章《公眾衞生及市政條例》。"
                : "All items distributed by Happymart comply rigorously with the Hong Kong Public Health and Municipal Services Ordinance (Cap. 132) and Food and Drugs (Composition and Labelling) Regulations."}
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-muted/20 p-4 space-y-2">
            <h4 className="font-bold text-foreground">
              {isZh ? "退貨及破損理賠政策" : "Returns & Damage Claim Policy"}
            </h4>
            <p>
              {isZh
                ? "如您收貨時發現商品有包裝漏氣、破損、變質或缺件問題，請於收到貨品後 7 天內透過 WhatsApp 或顧客服務電郵聯絡我們。我們將於 24 小時內為您安排全額退款或免費補送新件。"
                : "Should you experience any package seal breakage, transit damage, or quality discrepancy upon delivery, contact our Hong Kong customer support within 7 days. We provide immediate free replacement or full refund."}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
