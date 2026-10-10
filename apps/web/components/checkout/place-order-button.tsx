"use client"

import React from "react"
import Link from "next/link"
import { Lock, Loader2, ArrowRight, AlertCircle } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export interface PlaceOrderButtonProps {
  termsAccepted: boolean
  onToggleTerms: (accepted: boolean) => void
  onPlaceOrder: () => void
  isProcessing: boolean
  validationError: string | null
  total: number
  isZh?: boolean
  className?: string
}

export function PlaceOrderButton({
  termsAccepted,
  onToggleTerms,
  onPlaceOrder,
  isProcessing,
  validationError,
  total,
  isZh = false,
  className,
}: PlaceOrderButtonProps) {
  return (
    <div className={cn("space-y-4 pt-2", className)}>
      {/* Terms and conditions agreement checkbox */}
      <label className="flex items-start gap-2.5 text-xs text-muted-foreground select-none cursor-pointer">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => onToggleTerms(e.target.checked)}
          className="mt-0.5 size-4 rounded border-border text-primary focus:ring-primary accent-primary"
        />
        <span className="leading-snug">
          {isZh ? (
            <>
              我已閱讀並同意 Happymart 的{" "}
              <Link href="/terms" className="text-primary font-bold hover:underline">
                服務條款
              </Link>{" "}
              及{" "}
              <Link href="/privacy" className="text-primary font-bold hover:underline">
                私隱政策
              </Link>
              。
            </>
          ) : (
            <>
              I agree to the Happymart{" "}
              <Link href="/terms" className="text-primary font-bold hover:underline">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary font-bold hover:underline">
                Privacy Policy
              </Link>
              .
            </>
          )}
        </span>
      </label>

      {/* Validation error announcement if any */}
      {validationError && (
        <div className="flex items-center gap-2 p-3 rounded-xl border border-destructive/30 bg-destructive/10 text-xs text-destructive font-medium animate-in fade-in duration-200">
          <AlertCircle className="size-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="button"
        size="lg"
        disabled={isProcessing}
        onClick={onPlaceOrder}
        className="w-full h-12 text-sm font-bold shadow-md gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="size-4.5 animate-spin" />
            <span>{isZh ? "正在建立訂單並連接支付系統..." : "Processing Order & Connecting Payment..."}</span>
          </>
        ) : (
          <>
            <Lock className="size-4" />
            <span>
              {isZh ? `確認下單並支付 (HK$${total.toFixed(2)})` : `Place Order (HK$${total.toFixed(2)})`}
            </span>
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>

      <p className="text-[11px] text-center text-muted-foreground leading-tight">
        🔒{" "}
        {isZh
          ? "點擊下單即透過 Razorpay 測試安全沙盒驗證訂單，不會產生實際扣款。"
          : "Clicking Place Order initiates secure Razorpay Test Mode checkout. No real charges are made."}
      </p>
    </div>
  )
}
