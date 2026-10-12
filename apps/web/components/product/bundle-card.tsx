"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Plus, Check, ShoppingCart, Sparkles } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import type { Product } from "@workspace/typescript-config/types"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { addToCart, setLastAddedItem } from "@/features/cart/cartSlice"
import { cn } from "@workspace/ui/lib/utils"

interface BundleCardProps {
  currentProduct: Product
  bundleProducts: Product[]
  className?: string
}

export function BundleCard({
  currentProduct,
  bundleProducts,
  className,
}: BundleCardProps) {
  const dispatch = useAppDispatch()
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const allItems = [currentProduct, ...bundleProducts]
  const [selectedIds, setSelectedIds] = useState<string[]>(
    allItems.map((p) => p.id)
  )

  if (bundleProducts.length === 0) return null

  const toggleItem = (id: string) => {
    // Keep at least current product selected
    if (id === currentProduct.id && selectedIds.includes(id)) {
      return
    }
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const selectedItems = allItems.filter((p) => selectedIds.includes(p.id))

  // Calculate prices
  const totalCents = selectedItems.reduce((acc, p) => {
    const v = p.variants[0]
    return acc + (v?.priceCents ?? 0)
  }, 0)

  // Bundle discount: extra 10% off when all items selected
  const bundleDiscountMultiplier = selectedItems.length > 1 ? 0.9 : 1.0
  const effectiveBundleTotalCents = Math.round(totalCents * bundleDiscountMultiplier)
  const savingsCents = totalCents - effectiveBundleTotalCents

  const handleAddBundleToCart = () => {
    selectedItems.forEach((p) => {
      const v = p.variants[0]
      if (v) {
        const title = isZh && p.titleZh ? p.titleZh : p.titleEn
        dispatch(
          addToCart({
            variantId: v.id,
            productId: p.id,
            title,
            brand: p.brandName,
            packSize: v.packSize,
            price: (v.priceCents ?? 0) / 100,
            mrp: v.mrpCents ? v.mrpCents / 100 : undefined,
            quantity: 1,
            image: p.images?.[0] || "",
            originCountry: p.originCountry,
          })
        )
      }
    })
  }

  return (
    <section
      aria-label="Frequently bought together"
      className={cn(
        "rounded-3xl border border-border/80 bg-card p-4 sm:p-6 lg:p-7 shadow-2xs space-y-6",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/70 pb-3">
        <Sparkles className="size-4 text-accent" />
        <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">
          {isZh ? "常購組合推薦 (組合立省 10%)" : "Frequently Bought Together"}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Product Visuals with Plus Badges */}
        <div className="lg:col-span-8 flex flex-col sm:flex-row sm:flex-wrap items-center gap-2.5 sm:gap-4 w-full">
          {allItems.map((prod, idx) => {
            const isSelected = selectedIds.includes(prod.id)
            const isCurrent = prod.id === currentProduct.id
            const price = ((prod.variants[0]?.priceCents ?? 0) / 100).toFixed(2)

            return (
              <React.Fragment key={prod.id}>
                <div
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => toggleItem(prod.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      toggleItem(prod.id)
                    }
                  }}
                  className={cn(
                    "group relative flex w-full sm:w-36 lg:w-44 flex-row sm:flex-col items-center rounded-2xl border p-3 sm:p-3 transition-all cursor-pointer select-none gap-3 sm:gap-0",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-2xs"
                      : "border-border/60 bg-muted/20 opacity-60 hover:opacity-100"
                  )}
                >
                  {/* Checkbox indicator */}
                  <div
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-md border text-white transition-colors sm:absolute sm:top-2 sm:left-2",
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-border bg-background"
                    )}
                  >
                    {isSelected && <Check className="size-3.5 stroke-[3]" />}
                  </div>

                  {/* Thumbnail */}
                  <div className="relative size-16 sm:size-20 lg:size-24 shrink-0 overflow-hidden rounded-xl border border-border/50 bg-muted/30 my-0 sm:my-2">
                    <Image
                      src={prod.images?.[0] || "/images/categories/snacks.png"}
                      alt={prod.titleEn}
                      fill
                      sizes="(max-width: 640px) 64px, 96px"
                      className="object-cover transition-transform group-hover:scale-105"
                      unoptimized
                    />
                  </div>

                  {/* Text & Price (Right of image on mobile, below image on desktop) */}
                  <div className="flex flex-1 flex-col justify-center min-w-0 text-left sm:text-center sm:w-full">
                    {isCurrent && (
                      <span className="w-fit mb-1 rounded-full bg-accent/20 px-1.5 py-0.5 text-[9px] font-extrabold text-accent shrink-0 sm:absolute sm:top-2 sm:right-2 sm:mb-0">
                        {isZh ? "本商品" : "This Item"}
                      </span>
                    )}

                    <span className="line-clamp-2 text-xs sm:text-[11px] font-semibold text-foreground leading-tight">
                      {isZh && prod.titleZh ? prod.titleZh : prod.titleEn}
                    </span>
                    <span className="mt-1 font-heading text-sm sm:text-xs font-bold text-primary">
                      HK${price}
                    </span>
                  </div>
                </div>

                {/* Plus connector icon (Between products vertically on mobile, horizontally on desktop) */}
                {idx < allItems.length - 1 && (
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted/80 text-muted-foreground my-0.5 sm:my-0 shadow-2xs">
                    <Plus className="size-4" />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Right Column: Total & Add All CTA */}
        <div className="lg:col-span-4 rounded-2xl border border-border/70 bg-muted/20 p-4 sm:p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">
              {isZh
                ? `已選取 ${selectedItems.length} 件商品總價：`
                : `Total for ${selectedItems.length} selected items:`}
            </span>

            <div className="flex items-baseline gap-2">
              <span className="font-heading text-2xl font-black text-foreground">
                HK${(effectiveBundleTotalCents / 100).toFixed(2)}
              </span>

              {savingsCents > 0 && (
                <span className="text-xs font-semibold text-muted-foreground line-through">
                  HK${(totalCents / 100).toFixed(2)}
                </span>
              )}
            </div>

            {savingsCents > 0 && (
              <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                {isZh
                  ? `組合優惠立減 HK$${(savingsCents / 100).toFixed(2)} (節省 10%)`
                  : `Bundle Savings: HK$${(savingsCents / 100).toFixed(2)} (10% OFF)`}
              </p>
            )}
          </div>

          <Button
            type="button"
            size="lg"
            onClick={handleAddBundleToCart}
            disabled={selectedItems.length === 0}
            className="w-full gap-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs cursor-pointer"
          >
            <ShoppingCart className="size-4" />
            <span>
              {isZh
                ? `一鍵全選加入購物車 (${selectedItems.length}件)`
                : `Add All ${selectedItems.length} Items to Cart`}
            </span>
          </Button>
        </div>
      </div>
    </section>
  )
}
