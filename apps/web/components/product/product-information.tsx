"use client"

import React, { useState } from "react"
import { Star, ShieldCheck, Truck, RefreshCcw } from "lucide-react"
import type { Product, ProductVariant } from "@workspace/typescript-config/types"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

interface ProductInformationProps {
  product: Product
  activeVariant: ProductVariant
  className?: string
}

export function ProductInformation({
  product,
  activeVariant,
  className,
}: ProductInformationProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const [activeTab, setActiveTab] = useState<"about" | "specs" | "nutrition" | "usage" | "reviews">("about")

  const description =
    isZh && product.descriptionZh ? product.descriptionZh : product.descriptionEn

  const hasNutrition = Boolean(product.nutrition)
  const hasUsage = Boolean(product.usageInstructions || product.storageInstructions)
  const reviews = product.reviews || []

  return (
    <div id="product-details" className={cn("rounded-3xl border border-border/80 bg-card p-4 sm:p-6 lg:p-8 shadow-2xs space-y-6", className)}>
      {/* Navigation Tabs Header */}
      <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto border-b border-border/70 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("about")}
          className={cn(
            "rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all",
            activeTab === "about"
              ? "bg-primary text-primary-foreground shadow-2xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {isZh ? "商品介紹" : "About Product"}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("specs")}
          className={cn(
            "rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all",
            activeTab === "specs"
              ? "bg-primary text-primary-foreground shadow-2xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {isZh ? "規格與參數" : "Specifications"}
        </button>

        {hasNutrition && (
          <button
            type="button"
            onClick={() => setActiveTab("nutrition")}
            className={cn(
              "rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all",
              activeTab === "nutrition"
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {isZh ? "成分與營養" : "Ingredients & Nutrition"}
          </button>
        )}

        {hasUsage && (
          <button
            type="button"
            onClick={() => setActiveTab("usage")}
            className={cn(
              "rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all",
              activeTab === "usage"
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {isZh ? "食用與儲存指南" : "Cooking & Storage"}
          </button>
        )}

        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          id="reviews"
          className={cn(
            "rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all",
            activeTab === "reviews"
              ? "bg-primary text-primary-foreground shadow-2xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {isZh ? `顧客評價 (${reviews.length})` : `Customer Reviews (${reviews.length})`}
        </button>
      </div>

      {/* Tab 1: About This Product */}
      {activeTab === "about" && (
        <div className="space-y-4 max-w-4xl text-xs sm:text-sm leading-relaxed text-foreground/90">
          <p>{description}</p>

          <div className="rounded-2xl bg-muted/30 p-4 border border-border/60 space-y-2">
            <h4 className="font-bold text-foreground">
              {isZh ? "產品特色與亮點" : "Key Characteristics"}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
              <li>
                {isZh
                  ? `原產地保證：直接自 ${product.originCountry} 優質原廠採購進口，品質純正無添加。`
                  : `Authentic Origin: Sourced directly from certified master producers in ${product.originCountry}.`}
              </li>
              <li>
                {isZh
                  ? "專屬香港標準：符合香港食物安全標準及進口檢驗，批批新鮮有保證。"
                  : "Certified Standards: Compliant with Hong Kong Food Safety regulations and packaging controls."}
              </li>
              {product.isVeg && (
                <li>
                  {isZh
                    ? "純素 / 素食友善：100% 植物成分，適合素食主義者安心享用。"
                    : "Vegetarian Certified: 100% plant-based formulation, certified pure vegetarian."}
                </li>
              )}
              {product.isHalal && (
                <li>
                  {isZh
                    ? "清真認證：嚴格符合國際清真標準（Halal Certified）。"
                    : "Halal Certified: Adheres strictly to international Halal preparation standards."}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: Specifications Table */}
      {activeTab === "specs" && (
        <div className="max-w-3xl overflow-hidden rounded-2xl border border-border/80">
          <table className="w-full text-left text-xs sm:text-sm">
            <tbody className="divide-y divide-border/70">
              <tr className="bg-muted/20">
                <th className="w-1/3 p-3 font-semibold text-muted-foreground">
                  {isZh ? "品牌" : "Brand"}
                </th>
                <td className="p-3 font-bold text-foreground">{product.brandName}</td>
              </tr>
              <tr>
                <th className="p-3 font-semibold text-muted-foreground">
                  {isZh ? "規格 / 淨重" : "Net Quantity / Pack"}
                </th>
                <td className="p-3 text-foreground">{activeVariant.packSize}</td>
              </tr>
              <tr className="bg-muted/20">
                <th className="p-3 font-semibold text-muted-foreground">
                  {isZh ? "原產國" : "Country of Origin"}
                </th>
                <td className="p-3 text-foreground">{product.originCountry}</td>
              </tr>
              <tr>
                <th className="p-3 font-semibold text-muted-foreground">
                  {isZh ? "商品貨號 (SKU)" : "SKU Identifier"}
                </th>
                <td className="p-3 font-mono text-xs text-foreground">
                  {activeVariant.sku || product.id}
                </td>
              </tr>
              <tr className="bg-muted/20">
                <th className="p-3 font-semibold text-muted-foreground">
                  {isZh ? "食品類別" : "Category"}
                </th>
                <td className="p-3 text-foreground">{product.categoryId}</td>
              </tr>
              <tr>
                <th className="p-3 font-semibold text-muted-foreground">
                  {isZh ? "儲存條件" : "Storage"}
                </th>
                <td className="p-3 text-foreground">
                  {product.storageInstructions ||
                    (isZh ? "請存放於陰涼乾燥處，避免高溫及陽光直射。" : "Store in a cool, dry place away from direct sunlight.")}
                </td>
              </tr>
              <tr className="bg-muted/20">
                <th className="p-3 font-semibold text-muted-foreground">
                  {isZh ? "進口代理" : "Importer / Distributor"}
                </th>
                <td className="p-3 text-foreground">Happymart Logistics HK Ltd.</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Nutrition & Ingredients */}
      {activeTab === "nutrition" && (
        <div className="space-y-6 max-w-3xl">
          {product.ingredients && (
            <div className="space-y-1.5">
              <h4 className="font-bold text-sm text-foreground">
                {isZh ? "原材料成分" : "Ingredients List"}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed rounded-xl bg-muted/20 p-3 border border-border/60">
                {product.ingredients}
              </p>
            </div>
          )}

          {product.allergens && (
            <div className="space-y-1.5">
              <h4 className="font-bold text-sm text-foreground">
                {isZh ? "致敏原提示" : "Allergen Information"}
              </h4>
              <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                {product.allergens}
              </p>
            </div>
          )}

          {product.nutrition && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-foreground">
                  {isZh ? "營養資料標籤" : "Nutrition Facts"}
                </h4>
                {product.nutrition.servingSize && (
                  <span className="text-xs text-muted-foreground">
                    {isZh ? "每份量：" : "Per: "} {product.nutrition.servingSize}
                  </span>
                )}
              </div>

              <div className="overflow-hidden rounded-2xl border border-border/80">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody className="divide-y divide-border/60">
                    {product.nutrition.energy && (
                      <tr className="bg-muted/20">
                        <th className="p-2.5 font-semibold text-muted-foreground">
                          {isZh ? "能量 / 熱量" : "Energy"}
                        </th>
                        <td className="p-2.5 font-bold text-foreground">
                          {product.nutrition.energy}
                        </td>
                      </tr>
                    )}
                    {product.nutrition.protein && (
                      <tr>
                        <th className="p-2.5 font-semibold text-muted-foreground">
                          {isZh ? "蛋白質" : "Protein"}
                        </th>
                        <td className="p-2.5 text-foreground">{product.nutrition.protein}</td>
                      </tr>
                    )}
                    {product.nutrition.fat && (
                      <tr className="bg-muted/20">
                        <th className="p-2.5 font-semibold text-muted-foreground">
                          {isZh ? "總脂肪" : "Total Fat"}
                        </th>
                        <td className="p-2.5 text-foreground">{product.nutrition.fat}</td>
                      </tr>
                    )}
                    {product.nutrition.carbohydrates && (
                      <tr>
                        <th className="p-2.5 font-semibold text-muted-foreground">
                          {isZh ? "碳水化合物" : "Carbohydrates"}
                        </th>
                        <td className="p-2.5 text-foreground">
                          {product.nutrition.carbohydrates}
                        </td>
                      </tr>
                    )}
                    {product.nutrition.fiber && (
                      <tr className="bg-muted/20">
                        <th className="p-2.5 font-semibold text-muted-foreground">
                          {isZh ? "膳食纖維" : "Dietary Fiber"}
                        </th>
                        <td className="p-2.5 text-foreground">{product.nutrition.fiber}</td>
                      </tr>
                    )}
                    {product.nutrition.sodium && (
                      <tr>
                        <th className="p-2.5 font-semibold text-muted-foreground">
                          {isZh ? "鈉" : "Sodium"}
                        </th>
                        <td className="p-2.5 text-foreground">{product.nutrition.sodium}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Cooking & Usage Guide */}
      {activeTab === "usage" && (
        <div className="space-y-4 max-w-3xl text-xs sm:text-sm leading-relaxed">
          {product.usageInstructions && (
            <div className="rounded-2xl border border-border/70 bg-muted/20 p-4 space-y-2">
              <h4 className="font-bold text-foreground">
                {isZh ? "烹飪與食用方法" : "Preparation & Cooking Instructions"}
              </h4>
              <p className="text-muted-foreground">{product.usageInstructions}</p>
            </div>
          )}

          {product.storageInstructions && (
            <div className="rounded-2xl border border-border/70 bg-muted/20 p-4 space-y-2">
              <h4 className="font-bold text-foreground">
                {isZh ? "儲存條件與保質建議" : "Storage Guidelines"}
              </h4>
              <p className="text-muted-foreground">{product.storageInstructions}</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Customer Reviews */}
      {activeTab === "reviews" && (
        <div className="space-y-6 max-w-3xl">
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-2xl border border-border/70 bg-card p-4 space-y-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-foreground">
                        {rev.author}
                      </span>
                      {rev.verifiedPurchase && (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          {isZh ? "已驗證購買" : "Verified Purchase"}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground">{rev.date}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "size-3.5",
                          i < rev.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        )}
                      />
                    ))}
                    <span className="ml-1 text-xs font-semibold text-foreground">
                      {rev.title}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
              {isZh
                ? "此商品目前暫未有顧客留下評價。歡迎購買後分享您的真實使用心得！"
                : "No customer reviews yet. Be the first to try this product and share your feedback!"}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
