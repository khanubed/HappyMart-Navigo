"use client"

import React from "react"
import { X, ShoppingBag, ArrowRight, Truck } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { QuantityStepper } from "./quantity-stepper"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { closeCartDrawer } from "@/features/cart/cartSlice"

export function CartDrawer() {
  const dispatch = useAppDispatch()
  const isDrawerOpen = useAppSelector((state) => state.cart.isDrawerOpen)
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  if (!isDrawerOpen) return null

  // Sample active cart data for demonstration
  const sampleItems = [
    {
      id: "var-ig-5kg",
      title: "India Gate Classic Aged Basmati Rice",
      brand: "India Gate",
      packSize: "5 kg",
      price: 128.0,
      quantity: 1,
      image: "/images/products/india-gate-5kg.jpg",
    },
    {
      id: "var-sh-bb-60g",
      title: "Shan Special Bombay Biryani Mix",
      brand: "Shan Foods",
      packSize: "60 g",
      price: 14.5,
      quantity: 2,
      image: "/images/products/shan-biryani.jpg",
    },
    {
      id: "var-ash-10kg",
      title: "Aashirvaad 100% Whole Wheat Chakki Atta",
      brand: "Aashirvaad",
      packSize: "10 kg",
      price: 98.0,
      quantity: 1,
      image: "/images/products/aashirvaad-10kg.jpg",
    },
  ]

  const subtotal = 128.0 + 14.5 * 2 + 98.0 // HK$255.00
  const freeShippingThreshold = 500
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100)

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => dispatch(closeCartDrawer())}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-background border-l border-border flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-5 text-primary" />
              <h3 className="font-heading font-black text-base sm:text-lg text-foreground">
                {isZh ? "我的購物車" : "Your Shopping Cart"}
              </h3>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                3 {isZh ? "件商品" : "items"}
              </span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full"
              onClick={() => dispatch(closeCartDrawer())}
              aria-label="Close cart"
            >
              <X className="size-4" />
            </Button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-3 rounded-xl bg-secondary/60 border border-border/80 space-y-1.5 text-xs">
            <div className="flex items-center justify-between font-medium">
              <span className="flex items-center gap-1.5 text-primary font-bold">
                <Truck className="size-3.5" />
                {remainingForFreeShipping > 0
                  ? (isZh
                      ? `還差 HK$${remainingForFreeShipping.toFixed(2)} 即享免運費`
                      : `Add HK$${remainingForFreeShipping.toFixed(2)} more for FREE Delivery`)
                  : (isZh ? "🎉 恭喜！您已獲得免運費優惠！" : "🎉 Congratulations! You unlocked FREE Delivery!")}
              </span>
              <span className="font-mono text-[11px] font-bold text-muted-foreground">
                {progressPercent.toFixed(0)}%
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Line Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-border/60">
          {sampleItems.map((item) => (
            <div key={item.id} className="pt-4 first:pt-0 flex items-start gap-3">
              <div className="size-16 rounded-lg bg-muted flex items-center justify-center font-bold text-sm text-primary shrink-0 border border-border/60">
                {item.brand.charAt(0)}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block truncate">
                  {item.brand}
                </span>
                <h4 className="text-xs font-bold text-foreground line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-muted-foreground">Pack: {item.packSize}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono font-bold text-sm text-primary">
                    HK${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <QuantityStepper
                    value={item.quantity}
                    onChange={() => {}}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer & Checkout CTA */}
        <div className="p-4 sm:p-5 border-t border-border bg-card/60 space-y-3">
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>{isZh ? "商品小計" : "Subtotal"}</span>
              <span className="font-mono font-bold text-foreground">HK${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>{isZh ? "預估運費" : "Estimated Delivery"}</span>
              <span className="font-mono text-success font-bold">
                {remainingForFreeShipping === 0 ? "FREE" : "HK$45.00"}
              </span>
            </div>
            <div className="flex items-center justify-between font-bold text-sm text-foreground pt-1 border-t border-border/60">
              <span>{isZh ? "總金額 (港幣)" : "Estimated Total"}</span>
              <span className="font-mono text-base text-primary">HK${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <Button className="w-full h-11 rounded-xl font-bold shadow-md gap-2">
            <span>{isZh ? "前往安全結帳" : "Proceed to Checkout"}</span>
            <ArrowRight className="size-4" />
          </Button>

          <p className="text-[10px] text-center text-muted-foreground">
            🔒 {isZh ? "支援 Visa、Mastercard、PayMe 及支付寶" : "Encrypted SSL Checkout • Hong Kong Territory-Wide Delivery"}
          </p>
        </div>
      </div>
    </div>
  )
}
