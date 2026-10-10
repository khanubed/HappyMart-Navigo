"use client"

import React from "react"
import { ShieldCheck, CalendarCheck, Lock, RotateCcw } from "lucide-react"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

interface TrustPointsProps {
  className?: string
}

export function TrustPoints({ className }: TrustPointsProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const points = [
    {
      icon: ShieldCheck,
      color: "text-emerald-500",
      titleEn: "100% Authentic Import",
      titleZh: "100% 正品直採進口",
      descEn: "Directly sourced from certified master producers in South Asia.",
      descZh: "原廠授權正貨直送，源頭直採無中間商。",
    },
    {
      icon: CalendarCheck,
      color: "text-primary",
      titleEn: "Freshness & Expiry Policy",
      titleZh: "新鮮保質期承諾",
      descEn: "Guaranteed minimum 6 months fresh shelf-life on all dry goods.",
      descZh: "全線乾貨保證至少 6 個月以上最佳賞味期。",
    },
    {
      icon: Lock,
      color: "text-amber-500",
      titleEn: "100% Secure Payment",
      titleZh: "安全加密付款",
      descEn: "Bank-grade 256-bit encryption with FPS, PayMe, Visa & WeChat Pay.",
      descZh: "支援轉數快、PayMe、信用卡及電子錢包安全支付。",
    },
    {
      icon: RotateCcw,
      color: "text-blue-500",
      titleEn: "Hassle-Free 7-Day Returns",
      titleZh: "7 天無憂品質售後",
      descEn: "Immediate replacement or refund for any broken packaging or defect.",
      descZh: "運輸破損或品質問題，承諾 7 天內快速補發或全額退款。",
    },
  ]

  return (
    <div
      className={cn(
        "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-2xs",
        className
      )}
    >
      {points.map((p, idx) => {
        const Icon = p.icon
        return (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3 p-2 rounded-xl transition-colors"
          >
            <div className={cn("rounded-xl bg-muted/60 p-2 shrink-0", p.color)}>
              <Icon className="size-4 sm:size-5" />
            </div>
            <div className="space-y-0.5">
              <h5 className="font-heading text-xs font-bold text-foreground">
                {isZh ? p.titleZh : p.titleEn}
              </h5>
              <p className="text-[11px] text-muted-foreground leading-snug">
                {isZh ? p.descZh : p.descEn}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
