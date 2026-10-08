import React from "react"
import { cn } from "@workspace/ui/lib/utils"

export interface PriceBlockProps {
  price: number // in HKD or HKD cents based on display, e.g. 128.50
  mrp?: number
  currency?: string
  size?: "sm" | "default" | "lg"
  className?: string
  showDiscountBadge?: boolean
}

export function PriceBlock({
  price,
  mrp,
  currency = "HK$",
  size = "default",
  className,
  showDiscountBadge = true,
}: PriceBlockProps) {
  const hasDiscount = mrp && mrp > price
  const discountPercent = hasDiscount
    ? Math.round(((mrp - price) / mrp) * 100)
    : 0

  const sizeClasses = {
    sm: {
      price: "text-sm font-bold",
      mrp: "text-xs",
      badge: "text-[10px] px-1 py-0.2",
    },
    default: {
      price: "text-base sm:text-lg font-bold",
      mrp: "text-xs sm:text-sm",
      badge: "text-xs px-1.5 py-0.5",
    },
    lg: {
      price: "text-xl sm:text-2xl font-extrabold",
      mrp: "text-sm sm:text-base",
      badge: "text-xs px-2 py-0.5",
    },
  }[size]

  return (
    <div className={cn("flex flex-wrap items-baseline gap-1.5", className)}>
      <span className={cn("font-mono text-primary tracking-tight", sizeClasses.price)}>
        {currency}
        {price.toFixed(2)}
      </span>

      {hasDiscount && (
        <>
          <span className={cn("font-mono text-muted-foreground line-through decoration-muted-foreground/60", sizeClasses.mrp)}>
            {currency}
            {mrp.toFixed(2)}
          </span>

          {showDiscountBadge && discountPercent > 0 && (
            <span
              className={cn(
                "rounded bg-accent/20 font-bold text-accent-foreground font-mono",
                sizeClasses.badge
              )}
            >
              {discountPercent}% OFF
            </span>
          )}
        </>
      )}
    </div>
  )
}
