"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ChevronDown, ArrowRight } from "lucide-react"
import { categories } from "@workspace/mock-data"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

export function MegaMenu() {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const activeCategory = categories.find((c) => c.id === hoveredCategory)

  return (
    <nav
      className="relative z-30 hidden border-b border-border bg-background lg:block"
      onMouseLeave={() => setHoveredCategory(null)}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="no-scrollbar flex items-center justify-between gap-1 overflow-x-auto py-1.5 text-xs font-semibold">
          {/* All Categories Link */}
          <li className="shrink-0">
            <Link
              href="/categories"
              className="inline-flex cursor-pointer items-center gap-1 px-2 py-2 whitespace-nowrap text-foreground/80 transition-colors hover:text-primary hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-primary"
            >
              <span>{isZh ? "全部 4,000+ 商品" : "All 4,000+ Items"}</span>
            </Link>
          </li>

          {categories.map((category) => {
            const isActive = hoveredCategory === category.id
            return (
              <li key={category.id}>
                <Link
                  href={`/categories/${category.slug}`}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-1 px-2 py-2 whitespace-nowrap text-foreground/80 transition-colors hover:text-primary hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-primary",
                    isActive &&
                      "font-bold text-primary underline underline-offset-4 decoration-2 decoration-primary"
                  )}
                >
                  <span>{isZh ? category.nameZh : category.nameEn}</span>
                  <ChevronDown
                    className={cn(
                      "size-3 opacity-60 transition-transform",
                      isActive && "rotate-180 text-primary opacity-100"
                    )}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Mega Menu Dropdown Flyout Panel */}
      {hoveredCategory && activeCategory && (
        <div
          className="absolute top-full right-0 left-0 animate-in border-b border-border bg-background shadow-xl duration-150 fade-in-0 slide-in-from-top-1"
          onMouseEnter={() => setHoveredCategory(activeCategory.id)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <div className="max-w-8xl mx-auto grid grid-cols-12 gap-8 px-4 py-8 sm:px-6 lg:px-8">
            {/* Column 1 & 2: Subcategories List */}
            <div className="col-span-4 space-y-4 border-r border-border pr-6">
              <div className="flex items-center justify-between">
                <h4 className="flex items-center gap-2 font-heading text-sm font-bold text-foreground">
                  <span className="size-2 rounded-full bg-primary" />
                  {isZh ? activeCategory.nameZh : activeCategory.nameEn}
                </h4>
                <Link
                  href={`/categories/${activeCategory.slug}`}
                  className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  {isZh ? "瀏覽全部" : "View All"}{" "}
                  <ArrowRight className="size-3" />
                </Link>
              </div>

              <ul className="grid grid-cols-2 gap-1.5 text-xs">
                {activeCategory.subcategories?.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      href={`/categories/${activeCategory.slug}/${sub.slug}`}
                      className="block px-1.5 py-1.5 font-medium text-foreground/80 transition-colors hover:text-primary hover:underline hover:underline-offset-4 hover:decoration-primary"
                    >
                      {isZh ? sub.nameZh : sub.nameEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Featured Brands in this category */}
            <div className="col-span-4 space-y-4 border-r border-border pr-6">
              <h5 className="font-heading text-xs font-bold tracking-wider text-muted-foreground uppercase">
                {isZh ? "熱門品牌" : "Featured Brands"}
              </h5>
              <div className="grid grid-cols-2 gap-2.5">
                {activeCategory.featuredBrands?.map((brandName) => (
                  <Link
                    key={brandName}
                    href={`/brands/${brandName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-card p-2 text-xs font-semibold text-foreground transition-all hover:border-primary hover:text-primary hover:underline hover:underline-offset-2"
                  >
                    <div className="flex size-7 items-center justify-center rounded bg-muted text-[10px] font-bold text-primary">
                      {brandName.charAt(0)}
                    </div>
                    <span className="truncate">{brandName}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 4: Category Hero Banner Card */}
            <div className="col-span-4 flex flex-col justify-between rounded-xl border border-border bg-gradient-to-br from-secondary via-background to-secondary/40 p-5">
              <div className="space-y-2">
                <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-primary uppercase">
                  {isZh ? "100% 正品進口" : "Imported Authentic"}
                </span>
                <h4 className="font-heading text-base font-extrabold text-foreground">
                  {isZh ? activeCategory.nameZh : activeCategory.nameEn}
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {isZh
                    ? "由南亞精選原產地空運與海運直達香港，確保新鮮正宗。"
                    : "Directly imported from origin farms and producers across South Asia to Hong Kong homes."}
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href={`/categories/${activeCategory.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:text-primary/80"
                >
                  <span>{isZh ? "立即選購本類別" : "Shop This Category"}</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
