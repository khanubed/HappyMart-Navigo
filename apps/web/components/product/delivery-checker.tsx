"use client"

import React, { useState } from "react"
import {
  Truck,
  Zap,
  MapPin,
  Clock,
  CheckCircle2,
  Package,
  ChevronDown,
} from "lucide-react"
import {
  hongKongDistricts,
  checkDeliveryAvailability,
  type DistrictInfo,
} from "@workspace/mock-data"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

interface DeliveryCheckerProps {
  className?: string
}

export function DeliveryChecker({ className }: DeliveryCheckerProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const [selectedDistrictId, setSelectedDistrictId] = useState("wan-chai")
  const availability = checkDeliveryAvailability(selectedDistrictId)

  // Quick chips for prominent regions
  const quickDistricts = ["wan-chai", "central-western", "yau-tsim-mong", "sha-tin"]

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-muted/20 p-4 sm:p-5 space-y-4 text-xs shadow-2xs",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Truck className="size-4 text-primary" />
          <h4 className="font-heading text-sm font-bold text-foreground">
            {isZh ? "配送時效與運費查詢" : "Delivery Availability & Timeslots"}
          </h4>
        </div>

        {/* District Selector Dropdown */}
        <div className="relative inline-block">
          <div className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            <MapPin className="size-3.5 text-primary" />
          </div>
          <select
            value={selectedDistrictId}
            onChange={(e) => setSelectedDistrictId(e.target.value)}
            className="h-8 rounded-lg border border-border/80 bg-background pl-8 pr-7 text-xs font-semibold text-foreground hover:border-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
          >
            {hongKongDistricts.map((d) => (
              <option key={d.id} value={d.id}>
                {isZh ? `${d.regionZh} - ${d.nameZh}` : `${d.regionEn} - ${d.nameEn}`}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
        </div>
      </div>

      {/* Quick Select Buttons */}
      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
        <span className="text-[11px] font-semibold text-muted-foreground mr-1">
          {isZh ? "熱門地區：" : "Popular:"}
        </span>
        {quickDistricts.map((dId) => {
          const d = hongKongDistricts.find((item) => item.id === dId)
          if (!d) return null
          const active = selectedDistrictId === dId
          return (
            <button
              key={dId}
              type="button"
              onClick={() => setSelectedDistrictId(dId)}
              className={cn(
                "rounded-md border px-2 py-0.5 text-[11px] font-medium transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground font-bold shadow-2xs"
                  : "border-border/70 bg-background hover:border-primary/50 text-foreground"
              )}
            >
              {isZh ? d.nameZh : d.nameEn}
            </button>
          )
        })}
      </div>

      {/* Delivery Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {availability.options.map((opt) => {
          const isStandard = opt.type === "standard"
          const isExpress = opt.type === "express"
          const isPickup = opt.type === "pickup"

          const feeText = opt.feeCents === 0 ? (isZh ? "免運費" : "FREE") : `HK$${(opt.feeCents / 100).toFixed(0)}`

          return (
            <div
              key={opt.type}
              className={cn(
                "rounded-xl border p-3 flex flex-col justify-between space-y-2 transition-all",
                opt.available
                  ? "border-border/70 bg-card/70 hover:border-primary/40"
                  : "border-border/40 bg-muted/30 opacity-60"
              )}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold text-foreground">
                    {isStandard && <Truck className="size-3.5 text-primary" />}
                    {isExpress && <Zap className="size-3.5 text-primary" />}
                    {isPickup && <Package className="size-3.5 text-primary" />}
                    <span>{isZh ? opt.nameZh : opt.nameEn}</span>
                  </span>
                </div>

                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3 text-primary" />
                  <span>{isZh ? opt.earliestSlotZh : opt.earliestSlotEn}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">{feeText}</span>
                {opt.freeThresholdCents && (
                  <span className="text-[10px] text-primary font-semibold">
                    {isZh
                      ? `滿 HK$${opt.freeThresholdCents / 100} 免運`
                      : `Free over HK$${opt.freeThresholdCents / 100}`}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Delivery Guarantee Notice */}
      <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 border border-primary/20 text-foreground text-[11px] font-medium">
        <CheckCircle2 className="size-3.5 text-primary shrink-0" />
        <span>
          {isZh
            ? `下午 4:00 前下單，全港即享最快翌日送達。全單滿 HK$500 即享免運費直送！`
            : `Order by 4:00 PM for next-day dispatch. Free standard home delivery on orders over HK$500!`}
        </span>
      </div>
    </div>
  )
}
