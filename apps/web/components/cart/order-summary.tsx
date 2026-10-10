"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, ShieldCheck, Truck, Loader2 } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export interface OrderSummaryProps {
  subtotal: number
  productDiscount: number
  couponDiscount: number
  deliveryFee: number
  total: number
  isCartEmpty?: boolean
  isZh?: boolean
  className?: string
}

export function OrderSummary({
  subtotal,
  productDiscount,
  couponDiscount,
  deliveryFee,
  total,
  isCartEmpty = false,
  isZh = false,
  className,
}: OrderSummaryProps) {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleCheckout = () => {
    if (isCartEmpty) return
    setIsNavigating(true)
    router.push("/checkout")
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4 sm:p-5 shadow-2xs space-y-4",
        className
      )}
    >
      <h3 className="font-heading text-base font-bold text-foreground">
        {isZh ? "訂單摘要" : "Order Summary"}
      </h3>

      {/* Summary lines */}
      <div className="space-y-2 text-xs sm:text-sm">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-muted-foreground">
          <span>{isZh ? "商品小計" : "Subtotal"}</span>
          <span className="font-mono font-bold text-foreground">
            HK${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Product discounts */}
        {productDiscount > 0 && (
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span>{isZh ? "商品立減優惠" : "Product Discounts"}</span>
            <span className="font-mono font-bold">
              -HK${productDiscount.toFixed(2)}
            </span>
          </div>
        )}

        {/* Coupon discount */}
        {couponDiscount > 0 && (
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span>{isZh ? "優惠碼折扣" : "Coupon Discount"}</span>
            <span className="font-mono font-bold">
              -HK${couponDiscount.toFixed(2)}
            </span>
          </div>
        )}

        {/* Estimated delivery fee */}
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Truck className="size-3.5" />
            <span>{isZh ? "預估送貨費" : "Estimated Delivery"}</span>
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

        {/* Divider */}
        <div className="border-t border-border/80 pt-2" />

        {/* Estimated Total */}
        <div className="flex items-baseline justify-between font-bold text-base sm:text-lg text-foreground">
          <div className="flex flex-col">
            <span>{isZh ? "預計總額" : "Estimated Total"}</span>
            <span className="text-[10px] font-normal text-muted-foreground">
              {isZh ? "包含所有適用稅項及費用" : "Includes all applicable fees"}
            </span>
          </div>
          <span className="font-mono text-xl sm:text-2xl font-black text-primary">
            HK${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Checkout CTA */}
      <Button
        onClick={handleCheckout}
        disabled={isCartEmpty || isNavigating}
        className="w-full h-11 text-sm font-bold shadow-sm gap-2"
        size="lg"
      >
        {isNavigating ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>{isZh ? "處理中..." : "Processing..."}</span>
          </>
        ) : (
          <>
            <span>{isZh ? "前往結帳" : "Proceed to Checkout"}</span>
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>

      {/* Trust & Guarantee points */}
      <div className="space-y-1.5 pt-1 border-t border-border/60 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-success shrink-0" />
          <span>{isZh ? "256位元 SSL 安全加密結帳" : "256-bit SSL encrypted checkout"}</span>
        </div>
        <p className="text-[10px] leading-tight text-muted-foreground/80">
          {isZh
            ? "支援 Visa、Mastercard、PayMe、AlipayHK 及 WeChat Pay"
            : "Accepts Visa, Mastercard, PayMe, AlipayHK & WeChat Pay"}
        </p>
      </div>
    </div>
  )
}
