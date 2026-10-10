"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, ShoppingBag, Truck, Tag, ShieldCheck } from "lucide-react"
import type { CartItem, CouponData } from "@/features/cart/cartSlice"
import { cn } from "@workspace/ui/lib/utils"

export interface CheckoutOrderSummaryProps {
  items: CartItem[]
  subtotal: number
  productDiscounts: number
  appliedCoupon: CouponData | null
  deliveryFee: number
  total: number
  isZh?: boolean
  className?: string
}

export function CheckoutOrderSummary({
  items,
  subtotal,
  productDiscounts,
  appliedCoupon,
  deliveryFee,
  total,
  isZh = false,
  className,
}: CheckoutOrderSummaryProps) {
  const [isItemsExpanded, setIsItemsExpanded] = useState(true)
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const couponDiscount = appliedCoupon ? appliedCoupon.discountCents / 100 : 0

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-2xs space-y-4",
        className
      )}
    >
      {/* Header with Collapsible Toggle */}
      <div className="flex items-center justify-between pb-3 border-b border-border/80">
        <div className="flex items-center gap-2">
          <ShoppingBag className="size-4 text-primary" />
          <h3 className="font-heading text-base font-bold text-foreground">
            {isZh ? "訂單摘要" : "Order Summary"}
          </h3>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            {totalItemsCount} {isZh ? "件" : totalItemsCount === 1 ? "item" : "items"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsItemsExpanded(!isItemsExpanded)}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium cursor-pointer"
          aria-expanded={isItemsExpanded}
        >
          <span>{isItemsExpanded ? (isZh ? "收起清單" : "Hide Items") : (isZh ? "查看商品" : "Show Items")}</span>
          {isItemsExpanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
        </button>
      </div>

      {/* Collapsible Items List */}
      {isItemsExpanded && (
        <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-border/50">
          {items.map((item) => (
            <div key={item.variantId} className="pt-3 first:pt-0 flex items-start gap-3">
              <div className="relative size-12 rounded-lg border border-border/80 bg-white p-0.5 shrink-0 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="48px"
                    className="object-contain p-0.5"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-[10px] font-bold text-muted-foreground">
                    {item.brand ? item.brand.slice(0, 2).toUpperCase() : "HM"}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <h4 className="text-xs font-bold text-foreground line-clamp-1">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>
                    {item.packSize && `${item.packSize} • `}Qty: {item.quantity}
                  </span>
                  <span className="font-mono font-bold text-foreground">
                    HK${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Itemized Price Calculations */}
      <div className="space-y-2 pt-2 border-t border-border/70 text-xs sm:text-sm">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>{isZh ? "商品小計" : "Subtotal"}</span>
          <span className="font-mono font-bold text-foreground">
            HK${subtotal.toFixed(2)}
          </span>
        </div>

        {productDiscounts > 0 && (
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span>{isZh ? "商品立減優惠" : "Product Savings"}</span>
            <span className="font-mono font-bold">-HK${productDiscounts.toFixed(2)}</span>
          </div>
        )}

        {appliedCoupon && (
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="flex items-center gap-1">
              <Tag className="size-3" />
              <span>{isZh ? `優惠碼 (${appliedCoupon.code})` : `Coupon (${appliedCoupon.code})`}</span>
            </span>
            <span className="font-mono font-bold">-HK${couponDiscount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Truck className="size-3.5" />
            <span>{isZh ? "配送費用" : "Delivery Fee"}</span>
          </span>
          <span className="font-mono font-bold">
            {deliveryFee === 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold uppercase">
                {isZh ? "免費" : "FREE"}
              </span>
            ) : (
              <span className="text-foreground">HK${deliveryFee.toFixed(2)}</span>
            )}
          </span>
        </div>

        {/* Taxes in Hong Kong */}
        <div className="flex items-center justify-between text-muted-foreground text-[11px]">
          <span>{isZh ? "營業稅 / 增值稅 (香港 0%)" : "Sales Tax / GST (HK 0%)"}</span>
          <span className="font-mono">HK$0.00</span>
        </div>

        <div className="border-t border-border/80 pt-2" />

        {/* Final Payable Total */}
        <div className="flex items-baseline justify-between font-bold text-base sm:text-lg text-foreground">
          <div className="flex flex-col">
            <span>{isZh ? "應付總額" : "Total Amount"}</span>
            <span className="text-[10px] font-normal text-muted-foreground">
              {isZh ? "港幣結算 (HKD)" : "Charged in HKD"}
            </span>
          </div>
          <span className="font-mono text-xl sm:text-2xl font-black text-primary">
            HK${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Trust Notice */}
      <div className="pt-2 border-t border-border/50 flex items-center gap-2 text-[11px] text-muted-foreground">
        <ShieldCheck className="size-3.5 text-primary shrink-0" />
        <span>{isZh ? "香港全境配送保證 • 新鮮食材滿意保證" : "Territory-wide delivery • Quality grocery guarantee"}</span>
      </div>
    </div>
  )
}
