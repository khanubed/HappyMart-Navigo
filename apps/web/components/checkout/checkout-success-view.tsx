"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  CheckCircle2,
  Package,
  Truck,
  Calendar,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"
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
    <div
      className={cn(
        "mx-auto max-w-2xl space-y-6 px-4 py-8 sm:py-12",
        className
      )}
    >
      {/* Success Badge & Heading */}
      <div className="space-y-3 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 sm:size-20 dark:text-emerald-400">
          <CheckCircle2 className="size-10 stroke-[2.2] sm:size-12" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold tracking-wider text-primary uppercase">
            {isZh ? "訂單已成功建立" : "Order Placed Successfully"}
          </span>
          <h1 className="font-heading text-2xl font-black text-foreground sm:text-3xl">
            {isZh ? "感謝您的訂購！" : "Thank you for your order!"}
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {isZh
              ? "我們已發送確認電郵及短訊給您，我們的理貨團隊將為您精心挑選最新鮮的食材。"
              : "A confirmation email & SMS has been sent. Our team is carefully packing your fresh groceries."}
          </p>
        </div>
      </div>

      {/* Order Reference Card */}
      <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-2xs sm:p-6">
        <div className="flex flex-col justify-between gap-2 border-b border-border/70 pb-4 sm:flex-row sm:items-center">
          <div>
            <span className="block text-[11px] font-medium text-muted-foreground">
              {isZh ? "訂單編號" : "Order Number"}
            </span>
            <span className="font-mono text-base font-black text-foreground sm:text-lg">
              {order.orderNumber}
            </span>
          </div>

          <div className="sm:text-right">
            <span className="block text-[11px] font-medium text-muted-foreground">
              {isZh
                ? "支付狀態 (Razorpay 測試沙盒)"
                : "Payment Status (Razorpay Test Mode)"}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="size-3.5" />
              <span>{isZh ? "已成功驗證支付" : "Payment Verified"}</span>
            </span>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
          <div className="space-y-1">
            <span className="flex items-center gap-1 font-bold text-muted-foreground">
              <Truck className="size-3.5 text-primary" />
              <span>{isZh ? "配送地址" : "Delivery Address"}</span>
            </span>
            <p className="leading-snug font-medium text-foreground">
              {addressDetails}
            </p>
          </div>

          <div className="space-y-1">
            <span className="flex items-center gap-1 font-bold text-muted-foreground">
              <Calendar className="size-3.5 text-primary" />
              <span>{isZh ? "預約配送時段" : "Scheduled Delivery Slot"}</span>
            </span>
            <p className="font-mono leading-snug font-bold text-foreground">
              {slotDetails}
            </p>
          </div>
        </div>

        {/* Ordered Items Preview */}
        <div className="space-y-2 border-t border-border/60 pt-3">
          <span className="block text-xs font-bold text-muted-foreground">
            {isZh ? "訂單商品清單" : "Items in this order"} (
            {order.items.length})
          </span>

          <div className="max-h-48 divide-y divide-border/40 overflow-y-auto pr-1">
            {order.items.map((item) => (
              <div
                key={item.variantId}
                className="flex items-center justify-between gap-3 py-2 text-xs first:pt-0"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border/60 bg-white p-0.5">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="36px"
                        className="object-coverp-0.5"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted text-[9px] font-bold">
                        HM
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 truncate">
                    <span className="block truncate font-bold text-foreground">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      Qty: {item.quantity}{" "}
                      {item.packSize && `• ${item.packSize}`}
                    </span>
                  </div>
                </div>

                <span className="shrink-0 font-mono font-bold text-foreground">
                  HK${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-baseline justify-between border-t border-border/60 pt-3 text-sm font-bold">
            <span>{isZh ? "總金額 (港幣)" : "Total Amount"}</span>
            <span className="font-mono text-lg font-black text-primary">
              HK${(order.totalCents / 100).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
        <Link href="/products" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="h-11 w-full gap-2 px-8 font-bold shadow-sm sm:w-auto"
          >
            <span>{isZh ? "繼續選購商品" : "Continue Shopping"}</span>
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
