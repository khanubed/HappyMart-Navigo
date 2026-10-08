"use client"

import React, { useState } from "react"
import { RotateCcw, ShoppingBag, Check } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { sampleOrderHistory } from "@workspace/mock-data"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { openCartDrawer } from "@/features/cart/cartSlice"

export function ReorderSection() {
  const dispatch = useAppDispatch()
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"
  const [reordered, setReordered] = useState(false)

  const pastOrder = sampleOrderHistory[0]
  if (!pastOrder || !pastOrder.items.length) return null

  const handleReorderAll = () => {
    setReordered(true)
    dispatch(openCartDrawer())
    setTimeout(() => setReordered(false), 3000)
  }

  return (
    <section className="max-w-8xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-4 rounded-2xl border border-primary/20 bg-gradient-to-r from-secondary/50 via-background to-secondary/30 p-5 shadow-2xs sm:p-7">
        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
              <RotateCcw className="size-3.5" />
              <span>{isZh ? "智慧再次購買" : "Quick Reorder"}</span>
            </div>
            <h2 className="font-heading text-lg font-extrabold text-foreground sm:text-xl">
              {isZh
                ? "再次購買 (上次訂單商品)"
                : "Buy Again — Last Order Essentials"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {isZh
                ? `已送達 • 訂單編號 ${pastOrder.orderNumber}`
                : `Delivered • Order ${pastOrder.orderNumber}`}
            </p>
          </div>

          <Button
            onClick={handleReorderAll}
            className="shrink-0 gap-2 self-start rounded-xl font-bold shadow-xs sm:self-auto"
          >
            {reordered ? (
              <>
                <Check className="size-4 text-accent" />
                <span>{isZh ? "已加入購物車" : "Added to Cart!"}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="size-4" />
                <span>{isZh ? "一鍵全部加入購物車" : "Add All To Cart"}</span>
              </>
            )}
          </Button>
        </div>

        {/* Dense past items row */}
        <div className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-4">
          {pastOrder.items.map((item) => (
            <div
              key={item.variantId}
              className="flex items-center gap-3 rounded-xl border border-border/80 bg-background/80 p-2.5 transition-colors hover:border-primary/40"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-primary">
                {item.brand ? item.brand.charAt(0) : "P"}
              </div>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-[10px] font-bold text-muted-foreground uppercase">
                  {item.brand}
                </span>
                <p className="line-clamp-1 text-xs font-semibold text-foreground">
                  {item.title}
                </p>
                <div className="flex items-center gap-1 font-mono text-xs font-bold text-primary">
                  <span>HK${item.price.toFixed(2)}</span>
                  <span className="text-[10px] font-normal text-muted-foreground">
                    ({item.packSize})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
