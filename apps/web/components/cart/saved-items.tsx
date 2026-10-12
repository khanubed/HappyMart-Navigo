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
      className={cn("space-y-4 border-t border-border/80 pt-6", className)}
    >
      <div className="flex items-center gap-2">
        <Bookmark className="size-4 text-primary" />
        <h2 className="font-heading text-base font-bold text-foreground sm:text-lg">
          {isZh ? "稍後購買" : "Saved for Later"}
        </h2>
        <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-xs font-bold text-muted-foreground">
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
    <div className="flex flex-col items-start justify-between gap-3 py-3.5 first:pt-0 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        {/* Thumbnail */}
        <Link
          href={`/products/${item.productId}`}
          className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-border bg-white p-1 transition-colors hover:border-primary/50"
        >
          {item.image && !imgError ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="56px"
              className="object-coverp-0.5"
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
            <p className="truncate text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              {item.brand}
            </p>
          )}

          <Link
            href={`/products/${item.productId}`}
            className="line-clamp-1 font-heading text-xs font-bold text-foreground transition-colors hover:text-primary sm:text-sm"
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

          <div className="flex items-center gap-1 pt-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-3 shrink-0" />
            <span>{isZh ? "現貨在庫" : "In Stock"}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full items-center justify-end gap-2 pl-17 sm:w-auto sm:pl-0">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onMoveToCart(item.variantId)}
          className="h-8 gap-1.5 px-3 text-xs font-semibold hover:border-primary hover:text-primary"
        >
          <ShoppingCart className="size-3.5" />
          <span>{isZh ? "加入購物車" : "Move to Cart"}</span>
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => onRemoveSaved(item.variantId)}
          className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          aria-label={isZh ? "刪除此保存商品" : "Remove saved item"}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}
