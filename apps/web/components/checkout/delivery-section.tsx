"use client"

import React, { useState } from "react"
import { Truck, Zap, PackageCheck, Calendar, Clock, Check } from "lucide-react"
import type { DeliveryType } from "@workspace/typescript-config/types"
import { cn } from "@workspace/ui/lib/utils"

export interface DeliverySectionProps {
  selectedType: DeliveryType | null
  selectedSlotId: string | null
  selectedDate: string
  selectedTime: string
  subtotal: number
  onSelectMethod: (type: DeliveryType, feeCents: number) => void
  onSelectSlot: (slotId: string, date: string, time: string) => void
  isZh?: boolean
  className?: string
}

export function DeliverySection({
  selectedType = "scheduled",
  selectedSlotId = "slot-sched-1",
  selectedDate = "Tomorrow",
  selectedTime = "10:00 AM – 1:00 PM",
  subtotal,
  onSelectMethod,
  onSelectSlot,
  isZh = false,
  className,
}: DeliverySectionProps) {
  const isFreeStandard = subtotal >= 500

  const deliveryMethods = [
    {
      id: "scheduled" as DeliveryType,
      nameEn: "Standard Scheduled Delivery",
      nameZh: "標準溫控專車送貨",
      descEn: "Temperature-controlled delivery in Hong Kong",
      descZh: "香港全境冷熱分區專車配送",
      feeDisplay: isFreeStandard ? (isZh ? "免費 (滿HK$500)" : "FREE (Over HK$500)") : "HK$30.00",
      feeCents: isFreeStandard ? 0 : 3000,
      icon: Truck,
      available: true,
    },
    {
      id: "same_day" as DeliveryType,
      nameEn: "Same-Day 3-Hour Express",
      nameZh: "即日 3 小時極速直送",
      descEn: "Dispatched from Kwun Tong fulfillment hub",
      descZh: "觀塘倉庫專人極速直配",
      feeDisplay: "HK$50.00",
      feeCents: 5000,
      icon: Zap,
      available: true,
    },
    {
      id: "instant" as DeliveryType,
      nameEn: "SF Locker / SF Store Pickup",
      nameZh: "順豐智能櫃 / 順豐站自取",
      descEn: "Pick up at over 1,000 locations in HK",
      descZh: "全港超過 1,000 個順豐網點隨時自取",
      feeDisplay: "HK$15.00",
      feeCents: 1500,
      icon: PackageCheck,
      available: true,
    },
  ]

  // Date tabs
  const dates = [
    { labelEn: "Tomorrow", labelZh: "翌日 (推薦)", value: "Tomorrow", dateStr: "11 Oct (Sun)" },
    { labelEn: "Monday", labelZh: "星期一", value: "Monday", dateStr: "12 Oct (Mon)" },
    { labelEn: "Tuesday", labelZh: "星期二", value: "Tuesday", dateStr: "13 Oct (Tue)" },
    { labelEn: "Wednesday", labelZh: "星期三", value: "Wednesday", dateStr: "14 Oct (Wed)" },
  ]

  // Time slots
  const slots = [
    { id: "slot-sched-1", timeEn: "10:00 AM – 1:00 PM", timeZh: "上午 10:00 – 下午 1:00", available: true },
    { id: "slot-sched-2", timeEn: "2:00 PM – 6:00 PM", timeZh: "下午 2:00 – 晚上 6:00", available: true },
    { id: "slot-sched-3", timeEn: "6:00 PM – 9:00 PM", timeZh: "晚上 6:00 – 晚上 9:00", available: true },
  ]

  const activeMethod = deliveryMethods.find((m) => m.id === selectedType) || deliveryMethods[0]

  return (
    <div className={cn("space-y-5", className)}>
      {/* 1. Delivery Methods Radio Cards */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground block">
          {isZh ? "選擇配送方式" : "Select Delivery Method"}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {deliveryMethods.map((m) => {
            const isSelected = selectedType === m.id
            const Icon = m.icon

            return (
              <div
                key={m.id}
                onClick={() => onSelectMethod(m.id, m.feeCents)}
                className={cn(
                  "p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between",
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary shadow-2xs"
                    : "border-border hover:border-primary/40 bg-card"
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Icon className={cn("size-4", isSelected ? "text-primary" : "text-muted-foreground")} />
                    <span className="font-mono font-bold text-primary text-xs">
                      {m.feeDisplay}
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground line-clamp-1 pt-1">
                    {isZh ? m.nameZh : m.nameEn}
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                    {isZh ? m.descZh : m.descEn}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-end">
                  {isSelected && (
                    <span className="flex size-4 items-center justify-center rounded-full bg-primary text-white">
                      <Check className="size-2.5" />
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. Slot Picker (Date Tabs + Time Slot Chips) */}
      <div className="rounded-xl border border-border/80 bg-muted/20 p-3.5 sm:p-4 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
          <Calendar className="size-3.5 text-primary" />
          <span>{isZh ? "選擇預約配送時段" : "Select Scheduled Delivery Slot"}</span>
        </div>

        {/* Date Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {dates.map((d) => {
            const isDateSelected = selectedDate === d.value

            return (
              <button
                type="button"
                key={d.value}
                onClick={() => onSelectSlot(selectedSlotId || "slot-sched-1", d.value, selectedTime)}
                className={cn(
                  "py-2 px-2.5 rounded-lg border text-center transition-all cursor-pointer",
                  isDateSelected
                    ? "border-primary bg-primary text-primary-foreground font-bold shadow-xs"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                )}
              >
                <span className="text-xs block font-bold leading-tight">
                  {isZh ? d.labelZh : d.labelEn}
                </span>
                <span className={cn("text-[10px] block opacity-80", isDateSelected ? "text-primary-foreground" : "text-muted-foreground")}>
                  {d.dateStr}
                </span>
              </button>
            )
          })}
        </div>

        {/* Time Slot Chips */}
        <div className="pt-1 space-y-1.5">
          <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
            <Clock className="size-3" />
            <span>{isZh ? "配送時間窗口" : "Delivery Time Window"}</span>
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {slots.map((s) => {
              const isSlotSelected = selectedSlotId === s.id

              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => onSelectSlot(s.id, selectedDate, s.timeEn)}
                  className={cn(
                    "py-2.5 px-3 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer flex items-center justify-between",
                    isSlotSelected
                      ? "border-primary bg-primary/10 text-primary font-bold ring-1 ring-primary"
                      : "border-border bg-card text-foreground hover:border-primary/40"
                  )}
                >
                  <span className="font-mono">{isZh ? s.timeZh : s.timeEn}</span>
                  {isSlotSelected && <Check className="size-3 text-primary" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
