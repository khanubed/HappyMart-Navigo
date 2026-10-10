"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ArrowRight, Sparkles, LayoutGrid } from "lucide-react"
import { parentCategories, categories, getBrandLogo } from "@workspace/mock-data"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

function BrandIcon({ name }: { name: string }) {
  const [hasError, setHasError] = useState(false)
  const logoUrl = getBrandLogo(name)

  if (!logoUrl || hasError) {
    return (
      <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-[10px] font-bold text-primary shadow-2xs">
        {name.charAt(0)}
      </div>
    )
  }

  return (
    <div className="relative flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/70 bg-white p-0.5 shadow-2xs transition-transform group-hover:scale-105">
      <Image
        src={logoUrl}
        alt={name}
        fill
        sizes="28px"
        className="object-contain p-0.5"
        onError={() => setHasError(true)}
        unoptimized
      />
    </div>
  )
}

export function MegaMenu() {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"
  const [hoveredParent, setHoveredParent] = useState<string | null>(null)

  const activeParent = parentCategories.find((p) => p.id === hoveredParent)
  const activeSubcategories = activeParent?.subcategories ?? []

  return (
    <nav
      className="relative z-30 hidden border-b border-border bg-background lg:block"
      onMouseLeave={() => setHoveredParent(null)}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="no-scrollbar flex items-center justify-between gap-1 overflow-x-auto py-1 text-xs font-semibold">
          <li className="shrink-0">
            <Link
              href="/products"
              onMouseEnter={() => setHoveredParent(null)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 whitespace-nowrap font-bold text-primary hover:bg-primary/10 transition-colors"
            >
              <Sparkles className="size-3.5 text-accent" />
              <span>{isZh ? "全部商品" : "All Products"}</span>
            </Link>
          </li>
          <li className="shrink-0">
            <Link
              href="/categories"
              onMouseEnter={() => setHoveredParent(null)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 whitespace-nowrap font-bold text-foreground/90 hover:bg-muted transition-colors"
            >
              <LayoutGrid className="size-3.5 text-primary" />
              <span>{isZh ? "全館分類" : "Categories"}</span>
            </Link>
          </li>
          {parentCategories.map((parent) => {
            const isActive = hoveredParent === parent.id
            return (
              <li key={parent.id} className="shrink-0">
                <Link
                  href={`/categories/${parent.slug}`}
                  onMouseEnter={() => setHoveredParent(parent.id)}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-1 px-2.5 py-2 whitespace-nowrap text-foreground/80 transition-colors hover:text-primary hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-primary",
                    isActive &&
                      "font-bold text-primary underline underline-offset-4 decoration-2 decoration-primary"
                  )}
                >
                  <span>{isZh ? parent.nameZh : parent.nameEn}</span>
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
      {hoveredParent && activeParent && (
        <div
          className="absolute top-full right-0 left-0 animate-in border-b border-border bg-background shadow-xl duration-150 fade-in-0 slide-in-from-top-1"
          onMouseEnter={() => setHoveredParent(activeParent.id)}
          onMouseLeave={() => setHoveredParent(null)}
        >
          <div className="max-w-8xl mx-auto grid grid-cols-12 gap-8 px-4 py-8 sm:px-6 lg:px-8">
            {/* Column 1 & 2: Subcategories in this category */}
            <div className="col-span-8 space-y-3.5 border-r border-border pr-6">
              <div className="flex items-center justify-between">
                <h4 className="flex items-center gap-2 font-heading text-sm font-bold text-foreground">
                  <span className="size-2 rounded-full bg-primary" />
                  {isZh ? activeParent.nameZh : activeParent.nameEn}
                </h4>
                <Link
                  href={`/categories/${activeParent.slug}`}
                  className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  {isZh ? "瀏覽全部" : "View All"}{" "}
                  <ArrowRight className="size-3" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {activeSubcategories.slice(0, 9).map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/categories/${activeParent.slug}/${sub.slug}`}
                    className="group flex items-center gap-2.5 rounded-lg border border-border/40 bg-card/60 p-2 transition-all hover:border-primary/50 hover:bg-muted hover:shadow-2xs"
                  >
                    <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/60 bg-muted/40 p-0.5 transition-transform group-hover:scale-105">
                      <Image
                        src={sub.imageUrl || activeParent.imageUrl || "/images/categories/snacks.png"}
                        alt={isZh ? sub.nameZh : sub.nameEn}
                        fill
                        sizes="36px"
                        className="object-contain p-0.5"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-semibold text-foreground/90 transition-colors group-hover:text-primary">
                        {isZh ? sub.nameZh : sub.nameEn}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: Featured Brands in this department */}
            <div className="col-span-4 space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-heading text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  {isZh ? "熱門品牌" : "Featured Brands"}
                </h5>
                <Link
                  href="/brands"
                  className="text-xs font-semibold text-primary transition-colors hover:underline"
                >
                  {isZh ? "全部品牌 →" : "All Brands →"}
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {(activeParent.featuredBrands || []).slice(0, 8).map((brandName) => (
                  <Link
                    key={brandName}
                    href={`/brands/${brandName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    className="group flex items-center gap-2 rounded-lg border border-border/60 bg-card p-2 text-xs font-semibold text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-2xs"
                  >
                    <BrandIcon name={brandName} />
                    <span className="truncate">{brandName}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 4: Department Hero Banner Card */}
            {/* <div className="col-span-2 flex flex-col justify-between rounded-xl border border-border bg-gradient-to-br from-secondary via-background to-secondary/40 p-4">
              <div className="space-y-2">
                <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-primary uppercase">
                  {isZh ? "100% 正品進口" : "Authentic Origin Imports"}
                </span>
                <h4 className="font-heading text-sm font-extrabold text-foreground">
                  {isZh ? activeParent.nameZh : activeParent.nameEn}
                </h4>
                <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                  {isZh
                    ? (activeParent.descriptionZh || "由精選原產地空運與海運直達香港，確保新鮮正宗與品質承諾。")
                    : (activeParent.descriptionEn || "Directly imported from origin farms and master producers to Hong Kong homes.")}
                </p>
              </div>

              <div className="pt-3">
                <Link
                  href={`/departments/${activeParent.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary transition-colors hover:text-primary/80"
                >
                  <span>{isZh ? "選購全部" : "Shop All"}</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </nav>
  )
}
