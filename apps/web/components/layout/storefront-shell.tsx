"use client"

import React, { createContext, useContext, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Header } from "./header"
import { MegaMenu } from "./mega-menu"
import { Footer } from "./footer"
import { MobileBottomNav } from "./mobile-bottom-nav"
import { MobileDrawer } from "./mobile-drawer"
import { CartToast } from "../cart/cart-toast"
import { AnnouncementBar } from "../common/announcement-bar"
import { CheckoutHeader } from "../checkout/checkout-header"
import { CheckoutFooter } from "../checkout/checkout-footer"
import { useAppSelector } from "@/hooks/store"

const StorefrontShellContext = createContext(false)

export interface StorefrontShellProps {
  children: ReactNode
}

export function StorefrontShell({ children }: StorefrontShellProps) {
  const pathname = usePathname()
  const isNested = useContext(StorefrontShellContext)
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"
  const isCheckout = pathname?.startsWith("/checkout")

  // Prevent double wrapping if already inside layout shell
  if (isNested) {
    return <>{children}</>
  }

  // Dedicated minimal shell for /checkout
  if (isCheckout) {
    return (
      <StorefrontShellContext.Provider value={true}>
        <div className="flex min-h-screen flex-col bg-muted/20 text-foreground transition-colors selection:bg-primary/20">
          <CheckoutHeader />
          <main className="w-full flex-1">{children}</main>
          <CheckoutFooter />
          <CartToast />
        </div>
      </StorefrontShellContext.Provider>
    )
  }

  return (
    <StorefrontShellContext.Provider value={true}>
      <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors selection:bg-primary/20">
        {/* 1. Global Announcement Bar */}
        <AnnouncementBar
          id="hk-free-delivery-500"
          message={
            isZh
              ? "全港配送：買滿 HK$500 享免費送貨到府！2026 齋戒月及排燈節各國食材專區熱賣中"
              : "Hong Kong Wide Delivery: FREE shipping on orders over HK$500! Ramadan & Festive Essentials now in stock."
          }
          actionLabel={isZh ? "立即查看" : "Shop Deals"}
          className="h-10 text-xs shrink-0"
        />

        {/* 2. Sticky Supermarket Header */}
        <Header />

        {/* 3. Image-Supported Mega Menu Navigation */}
        <MegaMenu />

        {/* 4. Page Main Content */}
        <main className="w-full flex-1 pb-16 lg:pb-0">{children}</main>

        {/* 5. Storefront Footer */}
        <Footer />

        {/* 6. Mobile Overlays & Notifications */}
        <MobileBottomNav />
        <MobileDrawer />
        <CartToast />
      </div>
    </StorefrontShellContext.Provider>
  )
}
