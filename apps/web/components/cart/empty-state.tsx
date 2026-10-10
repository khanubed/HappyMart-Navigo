"use client"

import React from "react"
import Link from "next/link"
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export interface EmptyStateProps {
  isZh?: boolean
  className?: string
}

export function EmptyState({ isZh = false, className }: EmptyStateProps) {
  const quickCategories = [
    {
      titleEn: "Rice & Grains",
      titleZh: "米糧與穀物",
      href: "/categories/rice-grains",
    },
    {
      titleEn: "Spices & Masalas",
      titleZh: "頂級香料與調味料",
      href: "/categories/spices-seasonings",
    },
    {
      titleEn: "Tea & Beverages",
      titleZh: "名茶與特色飲品",
      href: "/categories/tea-coffee",
    },
    {
      titleEn: "Snacks & Sweets",
      titleZh: "零食與傳統甜點",
      href: "/categories/snacks-sweets",
    },
    {
      titleEn: "Flours & Atta",
      titleZh: "全麥粉與各類麵粉",
      href: "/categories/flours-meals",
    },
  ]

  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-border bg-card/60 p-8 sm:p-12 text-center max-w-2xl mx-auto my-6 space-y-6",
        className
      )}
    >
      {/* Icon / Illustration */}
      <div className="mx-auto flex size-16 sm:size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <ShoppingBag className="size-8 sm:size-10 stroke-[1.75]" />
      </div>

      {/* Copy */}
      <div className="space-y-2">
        <h2 className="font-heading text-xl sm:text-2xl font-black text-foreground">
          {isZh ? "購物車是空的" : "Your cart is empty"}
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {isZh
            ? "瀏覽我們的優質南亞及進口雜貨、日常必需品開始選購。"
            : "Browse our groceries and everyday essentials to get started."}
        </p>
      </div>

      {/* Primary Action */}
      <div className="pt-2">
        <Link href="/categories">
          <Button size="lg" className="h-11 px-6 font-bold gap-2 shadow-sm">
            <span>{isZh ? "瀏覽商品分類" : "Shop Categories"}</span>
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>

      {/* Popular Categories Quick Links */}
      <div className="pt-4 border-t border-border/60 space-y-2.5">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
          {isZh ? "熱門商品分類" : "Popular Categories"}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {quickCategories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-background text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Sparkles className="size-3 text-accent" />
              <span>{isZh ? cat.titleZh : cat.titleEn}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
