"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  Phone,
  Sparkles,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { setLanguage } from "@/features/ui/localeSlice"
import { openCartDrawer } from "@/features/cart/cartSlice"
import { openAuthModal, toggleMobileMenu } from "@/features/ui/uiSlice"
import { cn } from "@workspace/ui/lib/utils"

export function Header() {
  const dispatch = useAppDispatch()
  const locale = useAppSelector((state) => state.locale.language)
  const user = useAppSelector((state) => state.auth.user)
  const [searchQuery, setSearchQuery] = useState("")

  const isZh = locale === "zh-HK"

  const toggleLang = () => {
    dispatch(setLanguage(isZh ? "en" : "zh-HK"))
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 shadow-xs backdrop-blur-md transition-colors supports-[backdrop-filter]:bg-background/90">
      {/* Top Utility Bar (Desktop only) */}
      <div className="hidden border-b border-border/60 bg-muted/30 px-4 py-1.5 text-xs text-muted-foreground sm:px-6 lg:block lg:px-8">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="inline-block size-2 rounded-full bg-success" />
              Hong Kong Wide Delivery (Island, Kowloon & NT)
            </span>
            <span className="text-border">|</span>
            <span>
              Free delivery on orders over <strong>HK$500</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/85251234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-medium text-foreground transition-colors hover:text-primary"
            >
              <Phone className="size-3 text-success" />
              <span>WhatsApp Order Support: +852 5123 4567</span>
            </a>
            <span className="text-border">|</span>
            <button
              onClick={toggleLang}
              className="cursor-pointer font-medium transition-colors hover:text-primary"
            >
              {isZh ? "English" : "繁體中文"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-8xl mx-auto flex h-18 items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:gap-8 lg:px-8">
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground lg:hidden"
            onClick={() => dispatch(toggleMobileMenu())}
            aria-label="Open navigation menu"
          >
            <Menu className="size-6" />
          </Button>

          <Link
            href="/"
            className="group flex items-center gap-2.5 select-none"
          >
            <div className="relative size-11 shrink-0 overflow-hidden rounded-xl border border-border/50 shadow-xs transition-transform group-hover:scale-105">
              <Image
                src="/images/brand/Happymartlogo.png"
                alt="Happymart Supermarket Logo"
                width={44}
                height={44}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl leading-tight font-black tracking-tight text-foreground">
                Happy<span className="text-accent">mart</span>
              </span>
              <span className="-mt-1 hidden text-[10px] font-bold tracking-widest text-muted-foreground uppercase sm:block">
                Supermarket HK
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Large Dominant Search Bar (Occupies Most Width) */}
        <div className="hidden max-w-2xl flex-1 md:block">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (searchQuery.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
              }
            }}
            className="relative flex w-full items-center"
          >
            <div className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground">
              <Search className="size-4" />
            </div>

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isZh
                  ? "搜尋印度香米、全麥麵粉、香料、品牌..."
                  : "Search rice, atta, spices, brands, lentils..."
              }
              className="h-11 w-full rounded-full border border-border bg-muted/40 pr-24 pl-10 text-sm shadow-2xs transition-all placeholder:text-muted-foreground/80 focus:border-transparent focus:bg-background focus:ring-2 focus:ring-primary focus:outline-none"
            />

            <Button
              type="submit"
              size="sm"
              className="absolute top-1/2 right-1.5 h-8 -translate-y-1/2 rounded-full px-4 font-semibold shadow-xs"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Right: Actions (Language, Theme, Wishlist, Account, Cart) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Lang switcher (Mobile/tablet) */}
          <button
            onClick={toggleLang}
            className="rounded-md border border-border bg-muted/50 px-2 py-1 text-xs font-bold text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            {isZh ? "EN" : "繁中"}
          </button>

          <ThemeToggle className="text-foreground" />

          {/* Wishlist Link */}
          <Link
            href="/wishlist"
            className="relative hidden rounded-lg p-2 text-foreground transition-colors hover:bg-muted sm:inline-flex"
            aria-label="Wishlist"
          >
            <Heart className="size-5" />
            <span className="absolute top-1 right-1 size-2 rounded-full bg-accent" />
          </Link>

          {/* Account Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(openAuthModal("login"))}
            className="hidden h-10 items-center gap-2 px-2.5 text-sm font-semibold text-foreground hover:bg-muted sm:inline-flex"
          >
            <User className="size-4 text-muted-foreground" />
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[10px] font-normal text-muted-foreground">
                {user ? "Hello," : "Sign in /"}
              </span>
              <span className="text-xs font-bold">
                {user ? user.name : "My Account"}
              </span>
            </div>
          </Button>

          {/* Cart Button */}
          <Button
            variant="default"
            onClick={() => dispatch(openCartDrawer())}
            className="group flex h-10 items-center gap-2 rounded-xl px-3.5 font-bold shadow-xs"
          >
            <div className="relative">
              <ShoppingCart className="size-4 transition-transform group-hover:scale-110" />
              <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] leading-none font-extrabold text-accent-foreground">
                3
              </span>
            </div>
            <span className="hidden font-mono text-sm sm:inline-block">
              HK$240.50
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar Row (Shown on small screens below main header) */}
      <div className="px-4 pb-3 md:hidden">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (searchQuery.trim()) {
              window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
            }
          }}
          className="relative w-full"
        >
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isZh
                ? "搜尋印度香米、全麥麵粉、香料..."
                : "Search rice, atta, spices, brands..."
            }
            className="h-10 w-full rounded-lg border border-border bg-muted/50 pr-4 pl-9 text-sm transition-all placeholder:text-muted-foreground focus:border-transparent focus:bg-background focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </form>
      </div>
    </header>
  )
}
