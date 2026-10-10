"use client"

import React, { useState } from "react"
import { Tag, Check, X, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import type { CouponData } from "@/features/cart/cartSlice"
import { validateCoupon } from "@/lib/coupons"
import { cn } from "@workspace/ui/lib/utils"

export interface CouponInputProps {
  appliedCoupon: CouponData | null
  subtotal: number
  deliveryFee?: number
  onApply: (coupon: CouponData) => void
  onRemove: () => void
  isZh?: boolean
  className?: string
}

export function CouponInput({
  appliedCoupon,
  subtotal,
  deliveryFee = 30,
  onApply,
  onRemove,
  isZh = false,
  className,
}: CouponInputProps) {
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!code.trim()) {
      setError(isZh ? "請輸入優惠碼" : "Please enter a promo code")
      return
    }

    setIsLoading(true)

    // Simulate server-side coupon validation
    setTimeout(() => {
      setIsLoading(false)
      const result = validateCoupon(code, subtotal, deliveryFee)

      if (!result.isValid) {
        setError(isZh ? result.errorZh || "優惠碼無效" : result.errorEn || "Invalid promo code")
        return
      }

      onApply({
        code: result.code || code.trim().toUpperCase(),
        discountCents: result.discountCents,
        descriptionEn: result.descriptionEn || "Promotional Discount",
        descriptionZh: result.descriptionZh || "優惠折扣",
      })

      setCode("")
    }, 250)
  }

  const handleRemove = () => {
    setError(null)
    onRemove()
  }

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
        <Tag className="size-3.5 text-primary" />
        <span>{isZh ? "優惠碼 / 折扣券" : "Promo Code"}</span>
      </label>

      {appliedCoupon ? (
        // Applied state
        <div className="flex items-center justify-between p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-full bg-emerald-600 text-white">
              <Check className="size-3" />
            </span>
            <div>
              <span className="font-mono font-bold text-foreground uppercase tracking-wider block">
                {appliedCoupon.code}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {isZh ? appliedCoupon.descriptionZh : appliedCoupon.descriptionEn}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              -HK${(appliedCoupon.discountCents / 100).toFixed(2)}
            </span>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              aria-label={isZh ? "移除優惠碼" : "Remove promo code"}
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      ) : (
        // Input state
        <form onSubmit={handleApply} className="space-y-1.5">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder={isZh ? "輸入 HAPPY10 或 WELCOME20" : "e.g. HAPPY10 or WELCOME20"}
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase())
                if (error) setError(null)
              }}
              className="h-9 text-xs uppercase font-mono tracking-wider"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="sm"
              disabled={isLoading || !code.trim()}
              className="h-9 px-3 text-xs font-bold shrink-0"
            >
              {isLoading ? <Loader2 className="size-3.5 animate-spin" /> : isZh ? "套用" : "Apply"}
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-destructive pt-0.5">
              <AlertCircle className="size-3 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </form>
      )}
    </div>
  )
}
