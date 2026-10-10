"use client"

import React from "react"
import type { ProductVariant } from "@workspace/typescript-config/types"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

interface ProductVariantSelectorProps {
  variants: ProductVariant[]
  selectedVariantId: string
  onSelectVariant: (variant: ProductVariant) => void
  className?: string
}

export function ProductVariantSelector({
  variants,
  selectedVariantId,
  onSelectVariant,
  className,
}: ProductVariantSelectorProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  if (!variants || variants.length <= 1) return null

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-foreground">
          {isZh ? "選擇規格 / 包裝" : "Pack Size / Variant"}
        </span>
        <span className="text-muted-foreground text-[11px]">
          {isZh ? `${variants.length} 種可選` : `${variants.length} available`}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const isSelected = v.id === selectedVariantId
          const inStock = v.stockQuantity > 0
          const price = (v.priceCents / 100).toFixed(2)

          return (
            <button
              key={v.id}
              type="button"
              disabled={!inStock}
              onClick={() => onSelectVariant(v)}
              className={cn(
                "group relative flex flex-col items-start rounded-xl border px-3 py-2 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/5 ring-1.5 ring-primary"
                  : inStock
                    ? "border-border bg-card hover:border-primary/50 hover:bg-muted/40"
                    : "cursor-not-allowed border-border/40 bg-muted/20 opacity-50"
              )}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-foreground">
                  {v.packSize}
                </span>
                {!inStock && (
                  <span className="text-[10px] text-destructive">
                    {isZh ? "缺貨" : "Out of stock"}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-semibold text-muted-foreground group-hover:text-primary">
                HK${price}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
