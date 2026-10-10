"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, Package, Truck, Calendar, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import type { Order } from "@workspace/typescript-config/types"
import { cn } from "@workspace/ui/lib/utils"

export interface CheckoutSuccessViewProps {
  order: Order
  addressDetails: string
  slotDetails: string
  isZh?: boolean
  className?: string
}

export function CheckoutSuccessView({
  order,
  addressDetails,
  slotDetails,
  isZh = false,
  className,
}: CheckoutSuccessViewProps) {
  return (
    <div className={cn("max-w-2xl mx-auto py-8 sm:py-12 px-4 space-y-6", className)}>
      {/* Success Badge & Heading */}
      <div className="text-center space-y-3">
        <div className="mx-auto flex size-16 sm:size-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-10 sm:size-12 stroke-[2.2]" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            {isZh ? "訂單已成功建立" : "Order Placed Successfully"}
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-foreground">
            {isZh ? "感謝您的訂購！" : "Thank you for your order!"}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {isZh
              ? "我們已發送確認電郵及短訊給您，我們的理貨團隊將為您精心挑選最新鮮的食材。"
              : "A confirmation email & SMS has been sent. Our team is carefully packing your fresh groceries."}
          </p>
        </div>
      </div>

      {/* Order Reference Card */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/70 gap-2">
          <div>
            <span className="text-[11px] text-muted-foreground block font-medium">
              {isZh ? "訂單編號" : "Order Number"}
            </span>
            <span className="font-mono text-base sm:text-lg font-black text-foreground">
              {order.orderNumber}
            </span>
          </div>

          <div className="sm:text-right">
            <span className="text-[11px] text-muted-foreground block font-medium">
              {isZh ? "支付狀態 (Razorpay 測試沙盒)" : "Payment Status (Razorpay Test Mode)"}
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-xs text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="size-3.5" />
              <span>{isZh ? "已成功驗證支付" : "Payment Verified"}</span>
            </span>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-muted-foreground flex items-center gap-1">
              <Truck className="size-3.5 text-primary" />
              <span>{isZh ? "配送地址" : "Delivery Address"}</span>
            </span>
            <p className="text-foreground leading-snug font-medium">
              {addressDetails}
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-muted-foreground flex items-center gap-1">
              <Calendar className="size-3.5 text-primary" />
              <span>{isZh ? "預約配送時段" : "Scheduled Delivery Slot"}</span>
            </span>
            <p className="text-foreground leading-snug font-mono font-bold">
              {slotDetails}
            </p>
          </div>
        </div>

        {/* Ordered Items Preview */}
        <div className="pt-3 border-t border-border/60 space-y-2">
          <span className="text-xs font-bold text-muted-foreground block">
            {isZh ? "訂單商品清單" : "Items in this order"} ({order.items.length})
          </span>

          <div className="max-h-48 overflow-y-auto divide-y divide-border/40 pr-1">
            {order.items.map((item) => (
              <div key={item.variantId} className="py-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative size-9 rounded-md border border-border/60 bg-white p-0.5 shrink-0 overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="36px"
                        className="object-contain p-0.5"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted text-[9px] font-bold">
                        HM
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 truncate">
                    <span className="font-bold text-foreground block truncate">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      Qty: {item.quantity} {item.packSize && `• ${item.packSize}`}
                    </span>
                  </div>
                </div>

                <span className="font-mono font-bold text-foreground shrink-0">
                  HK${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 flex items-baseline justify-between border-t border-border/60 font-bold text-sm">
            <span>{isZh ? "總金額 (港幣)" : "Total Amount"}</span>
            <span className="font-mono text-lg font-black text-primary">
              HK${(order.totalCents / 100).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link href="/products" className="w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto h-11 px-8 font-bold gap-2 shadow-sm">
            <span>{isZh ? "繼續選購商品" : "Continue Shopping"}</span>
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
