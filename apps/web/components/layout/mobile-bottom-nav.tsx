"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, Search, Heart, User } from "lucide-react"
import { useAppDispatch } from "@/hooks/store"
import { toggleFilterSheet, openAuthModal } from "@/features/ui/uiSlice"
import { cn } from "@workspace/ui/lib/utils"

export function MobileBottomNav() {
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    {
      label: "Categories",
      href: "/categories",
      icon: LayoutGrid,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        dispatch(toggleFilterSheet())
      },
    },
    {
      label: "Search",
      href: "/search",
      icon: Search,
    },
    {
      label: "Wishlist",
      href: "/wishlist",
      icon: Heart,
    },
    {
      label: "Account",
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
                <Icon className={cn("size-5 mb-0.5", isActive && "stroke-[2.5px]")} />
                <span>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
