"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Bookmark, AlertCircle, Loader2 } from "lucide-react"
import { QuantityStepper } from "@/components/commerce/quantity-stepper"
import type { CartItem } from "@workspace/typescript-config/types"
import { cn } from "@workspace/ui/lib/utils"

export interface CartLineItemProps {
  item: CartItem
  onUpdateQuantity: (variantId: string, quantity: number) => void
  onRemove: (variantId: string) => void
  onSaveForLater: (variantId: string) => void
  isPending?: boolean
  isZh?: boolean
  className?: string
}

export function CartLineItem({
  item,
  onUpdateQuantity,
  onRemove,
  onSaveForLater,
  isPending = false,
  isZh = false,
  className,
}: CartLineItemProps) {
  const [imgError, setImgError] = useState(false)
  const lineTotal = item.price * item.quantity

  // Derive unit price presentation if pack size is present
  const unitPriceDisplay = (() => {
    if (!item.packSize) return `HK$${item.price.toFixed(2)} / ea`
    const pack = item.packSize.toLowerCase()
    if (pack.includes("5 kg")) return `HK$${(item.price / 5).toFixed(2)} / kg`
    if (pack.includes("10 kg")) return `HK$${(item.price / 10).toFixed(2)} / kg`
    if (pack.includes("1 kg") || pack.includes("1000 g"))
      return `HK$${item.price.toFixed(2)} / kg`
    if (pack.includes("500 g")) return `HK$${(item.price * 2).toFixed(2)} / kg`
    if (pack.includes("1 l") || pack.includes("1000 ml"))
      return `HK$${item.price.toFixed(2)} / L`
    return `HK$${item.price.toFixed(2)} / ea`
  })()

  // Simulated stock warning threshold (if applicable)
  const isLowStock = item.variantId === "var-ash-10kg"

  return (
    <div
      className={cn(
        "group relative flex flex-col items-start justify-between gap-3 border-b border-border/80 py-4 transition-colors sm:flex-row sm:items-center sm:gap-4",
        isPending && "pointer-events-none opacity-60",
        className
      )}
    >
      {/* Left side: Image + Product Info */}
      <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
        {/* Product Image */}
        <Link
          href={`/products/${item.productId}`}
          className="relative size-18 shrink-0 overflow-hidden rounded-lg border border-border bg-white p-1 transition-colors hover:border-primary/50 sm:size-20"
        >
          {item.image && !imgError ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="80px"
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

        {/* Product Details */}
        <div className="min-w-0 flex-1 space-y-1">
          {item.brand && (
            <p className="truncate text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
              {item.brand}
            </p>
          )}

          <Link
            href={`/products/${item.productId}`}
            className="line-clamp-2 font-heading text-sm leading-tight font-bold text-foreground transition-colors hover:text-primary sm:text-base"
          >
            {item.title}
          </Link>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {item.packSize && (
              <span className="rounded bg-muted/60 px-1.5 py-0.5 text-[11px] font-medium">
                {item.packSize}
              </span>
            )}
            <span className="font-mono text-muted-foreground">
              {unitPriceDisplay}
            </span>
          </div>

          {/* Availability / Low stock warning */}
          {isLowStock && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
              <AlertCircle className="size-3 shrink-0" />
              <span>
                {isZh
                  ? "庫存僅剩最後 3 件"
                  : "Only 3 left in stock - order soon"}
              </span>
            </div>
          )}

          {/* Action links on mobile / compact */}
          <div className="flex items-center gap-3 pt-1 text-xs">
            <button
              type="button"
              onClick={() => onSaveForLater(item.variantId)}
              className="inline-flex cursor-pointer items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Bookmark className="size-3.5" />
              <span>{isZh ? "稍後購買" : "Save for Later"}</span>
            </button>

            <span className="text-border">•</span>

            <button
              type="button"
              onClick={() => onRemove(item.variantId)}
              className="inline-flex cursor-pointer items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-destructive"
            >
              <Trash2 className="size-3.5" />
              <span>{isZh ? "移除" : "Remove"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right side: Quantity Stepper + Line Total */}
      <div className="flex w-full shrink-0 items-center justify-between gap-4 pl-21 sm:w-auto sm:justify-end sm:self-center sm:pl-0">
        <div className="flex items-center gap-2">
          {isPending && (
            <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
          )}
          <QuantityStepper
            value={item.quantity}
            min={0}
            max={99}
            onChange={(newQty) => onUpdateQuantity(item.variantId, newQty)}
            size="sm"
            showDeleteAtMin={true}
          />
        </div>

        {/* Line Total */}
        <div className="min-w-[5rem] text-right">
          <span className="block font-mono text-base font-black text-foreground">
            HK${lineTotal.toFixed(2)}
          </span>
          {item.mrp && item.mrp * item.quantity > lineTotal && (
            <span className="block font-mono text-xs text-muted-foreground line-through">
              HK${(item.mrp * item.quantity).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
