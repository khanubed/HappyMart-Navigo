"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, Flame, Sparkles } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { festivalCollections, products } from "@workspace/mock-data"
import { ProductCard } from "@/components/commerce/product-card"
import { useAppSelector } from "@/hooks/store"

export interface FestivalCollectionsProps {
  quantities?: Record<string, number>
  wishlist?: Record<string, boolean>
  onQuantityChange?: (productId: string, qty: number) => void
  onWishlistToggle?: (productId: string) => void
}

export function FestivalCollections({
  quantities = {},
  wishlist = {},
  onQuantityChange,
  onWishlistToggle,
}: FestivalCollectionsProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  // Show 2 highlighted collections on homepage
  const activeCollections = festivalCollections.slice(0, 2)

  return (
    <section className="max-w-8xl mx-auto space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-accent uppercase">
          <Flame className="size-3.5 fill-current" />
          <span>
            {isZh ? "節慶與主題專區" : "Seasonal & Festive Curations"}
          </span>
        </div>
        <h2 className="font-heading text-xl font-extrabold text-foreground sm:text-2xl">
          {isZh ? "主題節慶食材特輯" : "Featured Festival Collections"}
        </h2>
        <p className="text-xs text-muted-foreground sm:text-sm">
          {isZh
            ? "為特別節日與日常盛宴精心挑選的正宗食材組合"
            : "Hand-selected bundles and staples for cultural celebrations across Hong Kong"}
        </p>
      </div>

      <div className="space-y-10">
        {activeCollections.map((col, idx) => {
          const colProducts = products.filter((p) =>
            col.productIds.includes(p.id)
          )

          return (
            <div
              key={col.id}
              className="space-y-6 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-xs sm:p-8"
            >
              {/* Collection Header Banner Strip */}
              <div
                className={`flex flex-col items-start justify-between gap-4 rounded-xl border border-border/80 p-6 sm:flex-row sm:items-center sm:p-8 ${
                  idx === 0
                    ? "bg-gradient-to-r from-accent/20 via-background to-secondary"
                    : "bg-gradient-to-r from-primary/15 via-background to-secondary"
                }`}
              >
                <div className="max-w-xl space-y-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] font-bold text-primary">
                    <Sparkles className="size-3 text-accent" />
                    {isZh ? col.badgeZh : col.badgeEn}
                  </span>
                  <h3 className="font-heading text-xl font-black text-foreground sm:text-2xl">
                    {isZh ? col.titleZh : col.titleEn}
                  </h3>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    {isZh ? col.subtitleZh : col.subtitleEn}
                  </p>
                </div>

                <Link href={`/collections/${col.slug}`} className="shrink-0">
                  <Button className="gap-2 rounded-xl font-bold shadow-xs">
                    {isZh ? "選購全系列" : "Shop Collection"}
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>

              {/* Collection Products Grid */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {colProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={quantities[product.id] ?? 0}
                    isWishlisted={wishlist[product.id] ?? false}
                    onQuantityChange={(qty) =>
                      onQuantityChange?.(product.id, qty)
                    }
                    onWishlistToggle={() => onWishlistToggle?.(product.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
