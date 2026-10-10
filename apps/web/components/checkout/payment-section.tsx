"use client"

import React, { useState } from "react"
import { CreditCard, Banknote, ShieldCheck, Check, AlertCircle, Copy, CheckCheck } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export interface PaymentSectionProps {
  paymentMethod: "razorpay" | "cod"
  onSelectPaymentMethod: (method: "razorpay" | "cod") => void
  isZh?: boolean
  className?: string
}

export function PaymentSection({
  paymentMethod,
  onSelectPaymentMethod,
  isZh = false,
  className,
}: PaymentSectionProps) {
  const [copiedCard, setCopiedCard] = useState(false)

  const handleCopyTestCard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("4111222233334444")
      setCopiedCard(true)
      setTimeout(() => setCopiedCard(false), 2000)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Test Mode Badge */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs">
        <ShieldCheck className="size-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold block">
            {isZh ? "Razorpay 測試環境 (Test Sandbox Mode)" : "Razorpay Sandbox Test Mode Active"}
          </span>
          <p className="text-[11px] opacity-90 leading-relaxed">
            {isZh
              ? "本系統目前處於安全沙盒測試環境，不會產生任何實際扣款。可使用下方測試信用卡號完成下單體驗。"
              : "This checkout runs in Razorpay Test Mode. No real charges will be made. You can use the provided test card numbers to simulate payment."}
          </p>
        </div>
      </div>

      {/* Payment Method Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Razorpay Online Payment */}
        <div
          onClick={() => onSelectPaymentMethod("razorpay")}
          className={cn(
            "p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between",
            paymentMethod === "razorpay"
              ? "border-primary bg-primary/5 ring-1 ring-primary shadow-2xs"
              : "border-border hover:border-primary/40 bg-card"
          )}
        >
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-bold text-foreground text-sm">
                <CreditCard className="size-4 text-primary" />
                <span>{isZh ? "Razorpay 網上支付" : "Razorpay Online Payment"}</span>
              </span>
              {paymentMethod === "razorpay" && (
                <span className="flex size-4 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="size-2.5" />
                </span>
              )}
            </div>

            <p className="text-[11px] text-muted-foreground leading-snug">
              {isZh
                ? "支援 Visa、Mastercard、PayMe、AlipayHK 及 WeChat Pay (港幣 HKD)"
                : "Visa, Mastercard, PayMe, AlipayHK & WeChat Pay (HKD)"}
            </p>
          </div>

          <div className="pt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
            <span>🔒 256-bit SSL Encrypted</span>
          </div>
        </div>

        {/* Cash on Delivery (COD) */}
        <div
          onClick={() => onSelectPaymentMethod("cod")}
          className={cn(
            "p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between",
            paymentMethod === "cod"
              ? "border-primary bg-primary/5 ring-1 ring-primary shadow-2xs"
              : "border-border hover:border-primary/40 bg-card"
          )}
        >
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-bold text-foreground text-sm">
                <Banknote className="size-4 text-primary" />
                <span>{isZh ? "貨到付款 (COD)" : "Cash on Delivery (COD)"}</span>
              </span>
              {paymentMethod === "cod" && (
                <span className="flex size-4 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="size-2.5" />
                </span>
              )}
            </div>

            <p className="text-[11px] text-muted-foreground leading-snug">
              {isZh
                ? "送貨員送達時當面以現金或 PayMe 二維碼支付"
                : "Pay cash or instant PayMe QR to courier upon doorstep arrival"}
            </p>
          </div>

          <div className="pt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
            <span>💵 Exact change appreciated</span>
          </div>
        </div>
      </div>

      {/* Razorpay Test Card Helpers Helper Box */}
      {paymentMethod === "razorpay" && (
        <div className="rounded-xl border border-border/80 bg-muted/40 p-3 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-foreground text-[11px]">
              {isZh ? "測試環境信用卡資料：" : "Test Environment Card Details:"}
            </span>
            <button
              type="button"
              onClick={handleCopyTestCard}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline cursor-pointer"
            >
              {copiedCard ? <CheckCheck className="size-3 text-success" /> : <Copy className="size-3" />}
              <span>{copiedCard ? (isZh ? "已複製" : "Copied!") : (isZh ? "複製卡號" : "Copy Card")}</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono text-[11px] bg-background p-2 rounded-lg border border-border/60">
            <div>
              <span className="text-[10px] text-muted-foreground block">Card Number</span>
              <strong className="text-foreground">4111 2222 3333 4444</strong>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block">Expiry</span>
              <strong className="text-foreground">12 / 28</strong>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block">CVV</span>
              <strong className="text-foreground">123</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
