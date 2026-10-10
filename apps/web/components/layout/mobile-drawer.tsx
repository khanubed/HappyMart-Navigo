"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ChevronRight, Phone, Globe, Sparkles, LayoutGrid } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { parentCategories, categories, countries, brands } from "@workspace/mock-data"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { toggleMobileMenu, toggleFilterSheet } from "@/features/ui/uiSlice"
import { setLanguage } from "@/features/ui/localeSlice"
import { cn } from "@workspace/ui/lib/utils"

export function MobileDrawer() {
  const dispatch = useAppDispatch()
  const isMenuOpen = useAppSelector((state) => state.ui.isMobileMenuOpen)
  const isFilterSheetOpen = useAppSelector((state) => state.ui.isFilterSheetOpen)
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const isOpen = isMenuOpen || isFilterSheetOpen

  if (!isOpen) return null

  const handleClose = () => {
    if (isMenuOpen) dispatch(toggleMobileMenu())
    if (isFilterSheetOpen) dispatch(toggleFilterSheet())
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-background border-r border-border p-5 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-left duration-200">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="relative size-8 rounded-lg overflow-hidden shrink-0 border border-border/50">
                <Image
                  src="/images/brand/Happymartlogo.png"
                  alt="Happymart Supermarket Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-heading font-black text-lg">
                Happy<span className="text-accent">mart</span>
              </span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full"
              onClick={handleClose}
              aria-label="Close menu"
            >
              <X className="size-4" />
            </Button>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-muted text-xs font-bold">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Globe className="size-3.5" /> Language:
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => dispatch(setLanguage("en"))}
                className={cn(
                  "px-2 py-1 rounded-md transition-colors",
                  !isZh ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                )}
              >
                English
              </button>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => dispatch(setLanguage("zh-HK"))}
                className={cn(
                  "px-2 py-1 rounded-md transition-colors",
                  isZh ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                )}
              >
                繁體中文
              </button>
            </div>
          </div>

          {/* Browse All Products */}
          <Link
            href="/products"
            onClick={handleClose}
            className="flex items-center justify-between p-2.5 rounded-xl bg-primary/10 border border-primary/25 text-primary font-bold text-xs hover:bg-primary/20 transition-all active:scale-98"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="size-4 text-accent" />
              <span>{isZh ? "全部商品庫 (瀏覽全部)" : "All Products Catalog"}</span>
            </span>
            <ChevronRight className="size-4" />
          </Link>

          {/* Browse All Categories */}
          <Link
            href="/categories"
            onClick={handleClose}
            className="flex items-center justify-between p-2.5 rounded-xl bg-muted/60 border border-border/80 text-foreground font-bold text-xs hover:bg-muted transition-all active:scale-98"
          >
            <span className="flex items-center gap-2">
              <LayoutGrid className="size-4 text-primary" />
              <span>{isZh ? "全館專區分類" : "All Categories"}</span>
            </span>
            <ChevronRight className="size-4" />
          </Link>

          {/* Shop By Country */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {isZh ? "國家專區" : "Shop By Country"}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {countries.map((c) => (
                <Link
                  key={c.id}
                  href={`/countries/${c.code.toLowerCase()}`}
                  onClick={handleClose}
                  className="flex items-center gap-1.5 p-2 rounded-lg border border-border/80 bg-card hover:bg-muted font-semibold text-foreground truncate"
                >
                  <span>{c.flag}</span>
                  <span className="truncate">{isZh ? c.nameZh : c.nameEn}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Brands */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {isZh ? "熱門品牌" : "Featured Brands"}
              </h4>
              <Link
                href="/brands"
                onClick={handleClose}
                className="text-[11px] font-bold text-primary hover:underline"
              >
                {isZh ? "查看全部" : "View All"}
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {brands
                .filter((b) => b.featured)
                .slice(0, 6)
                .map((b) => (
                  <Link
                    key={b.id}
                    href={`/brands/${b.slug}`}
                    onClick={handleClose}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-lg border border-border/80 bg-card hover:bg-muted text-center"
                  >
                    <div className="relative size-8 shrink-0 overflow-hidden rounded border border-border/60 bg-white p-0.5">
                      <Image
                        src={b.logoUrl}
                        alt={b.name}
                        fill
                        sizes="32px"
                        className="object-contain p-0.5"
                        unoptimized
                      />
                    </div>
                    <span className="truncate w-full text-[11px] font-medium text-foreground">
                      {b.name}
                    </span>
                  </Link>
                ))}
            </div>
          </div>

          {/* Parent Departments */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {isZh ? "全館專區分類" : "Shop By Department"}
            </h4>
            <ul className="space-y-1 text-xs font-medium">
              {parentCategories.map((parent) => (
                <li key={parent.id}>
                  <Link
                    href={`/categories/${parent.slug}`}
                    onClick={handleClose}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted text-foreground transition-colors font-semibold"
                  >
                    <span>{isZh ? parent.nameZh : parent.nameEn}</span>
                    <ChevronRight className="size-3.5 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* WhatsApp Footer */}
        <div className="pt-6 border-t border-border mt-6">
          <a
            href="https://wa.me/85251234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-xl bg-success/15 border border-success/30 text-success text-xs font-bold"
          >
            <Phone className="size-4" />
            <span>WhatsApp: +852 5123 4567</span>
          </a>
        </div>
      </div>
    </div>
  )
}
