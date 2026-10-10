"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, Search, ShoppingCart, User } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { openAuthModal } from "@/features/ui/uiSlice"
import { cn } from "@workspace/ui/lib/utils"

export function MobileBottomNav() {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"
  const cartItems = useAppSelector((state) => state.cart.items)
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const navItems = [
    { label: isZh ? "首頁" : "Home", href: "/", icon: Home },
    {
      label: isZh ? "分類" : "Categories",
      href: "/categories",
      icon: LayoutGrid,
    },
    {
      label: isZh ? "搜尋" : "Search",
      href: "/search",
      icon: Search,
    },
    {
      label: isZh ? "購物車" : "Cart",
      href: "/cart",
      icon: ShoppingCart,
      badge: cartItemCount > 0 ? (cartItemCount > 99 ? "99+" : cartItemCount) : null,
    },
    {
      label: isZh ? "帳戶" : "Account",
      href: "/account",
      icon: User,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        dispatch(openAuthModal("login"))
      },
    },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border px-2 py-1 shadow-lg">
      <ul className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <li key={item.label} className="flex-1">
              <Link
                href={item.href}
                onClick={item.onClick}
                className={cn(
                  "flex flex-col items-center justify-center h-full w-full py-1 text-[11px] font-semibold transition-colors",
                  isActive
                    ? "text-primary font-bold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="relative">
                  <Icon className={cn("size-5 mb-0.5", isActive && "stroke-[2.5px]")} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2.5 flex size-4 items-center justify-center rounded-full bg-accent text-[9px] font-black text-accent-foreground leading-none">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
