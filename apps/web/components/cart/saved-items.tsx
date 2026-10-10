"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bookmark, ShoppingCart, Trash2, CheckCircle2 } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import type { CartItem } from "@workspace/typescript-config/types"
import { cn } from "@workspace/ui/lib/utils"

export interface SavedItemsProps {
  savedItems: CartItem[]
  onMoveToCart: (variantId: string) => void
  onRemoveSaved: (variantId: string) => void
  isZh?: boolean
  className?: string
}

export function SavedItems({
  savedItems,
  onMoveToCart,
  onRemoveSaved,
  isZh = false,
  className,
}: SavedItemsProps) {
  if (savedItems.length === 0) return null

  return (
    <section
      aria-label={isZh ? "稍後購買的商品" : "Saved for Later"}
      className={cn("space-y-4 pt-6 border-t border-border/80", className)}
    >
      <div className="flex items-center gap-2">
        <Bookmark className="size-4 text-primary" />
        <h2 className="font-heading text-base sm:text-lg font-bold text-foreground">
          {isZh ? "稍後購買" : "Saved for Later"}
        </h2>
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
          {savedItems.length}
        </span>
      </div>

      <div className="divide-y divide-border/60">
        {savedItems.map((item) => (
          <SavedItemRow
            key={item.variantId}
            item={item}
            onMoveToCart={onMoveToCart}
            onRemoveSaved={onRemoveSaved}
            isZh={isZh}
          />
        ))}
      </div>
    </section>
  )
}

function SavedItemRow({
  item,
  onMoveToCart,
  onRemoveSaved,
  isZh,
}: {
  item: CartItem
  onMoveToCart: (variantId: string) => void
  onRemoveSaved: (variantId: string) => void
  isZh?: boolean
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-3.5 first:pt-0">
      <div className="flex items-start gap-3 min-w-0 flex-1">
        {/* Thumbnail */}
        <Link
          href={`/products/${item.productId}`}
          className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-border bg-white p-1 hover:border-primary/50 transition-colors"
        >
          {item.image && !imgError ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="56px"
              className="object-contain p-0.5"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-bold text-muted-foreground">
              {item.brand ? item.brand.slice(0, 2).toUpperCase() : "HM"}
            </div>
          )}
        </Link>

        {/* Info */}
        <div className="min-w-0 flex-1 space-y-0.5">
          {item.brand && (
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider truncate">
              {item.brand}
            </p>
          )}

          <Link
            href={`/products/${item.productId}`}
            className="font-heading text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors line-clamp-1"
          >
            {item.title}
          </Link>

          <div className="flex items-center gap-2 text-xs">
            {item.packSize && (
              <span className="text-[11px] text-muted-foreground">
                {item.packSize}
              </span>
            )}
            <span className="font-mono font-bold text-primary">
              HK${item.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pt-0.5">
            <CheckCircle2 className="size-3 shrink-0" />
            <span>{isZh ? "現貨在庫" : "In Stock"}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end pl-17 sm:pl-0">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onMoveToCart(item.variantId)}
          className="h-8 px-3 text-xs font-semibold gap-1.5 hover:border-primary hover:text-primary"
        >
          <ShoppingCart className="size-3.5" />
          <span>{isZh ? "加入購物車" : "Move to Cart"}</span>
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => onRemoveSaved(item.variantId)}
          className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          aria-label={isZh ? "刪除此保存商品" : "Remove saved item"}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}
