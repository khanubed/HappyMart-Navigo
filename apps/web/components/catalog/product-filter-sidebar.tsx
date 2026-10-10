"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Search,
  ChevronDown,
  ChevronUp,
  Tag,
  Check,
  ShieldCheck,
  RotateCcw,
} from "lucide-react"
import type { AvailableFacets, FilterState } from "@workspace/mock-data"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

export interface ProductFilterSidebarProps {
  facets: AvailableFacets
  filters: FilterState
  onFilterChange: (newFilters: FilterState) => void
  onClearAll: () => void
  className?: string
}

export function ProductFilterSidebar({
  facets,
  filters,
  onFilterChange,
  onClearAll,
  className,
}: ProductFilterSidebarProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const [brandSearch, setBrandSearch] = useState("")
  const [showAllBrands, setShowAllBrands] = useState(false)
  const [minPriceInput, setMinPriceInput] = useState<string>(
    filters.minPrice !== undefined ? String(filters.minPrice) : ""
  )
  const [maxPriceInput, setMaxPriceInput] = useState<string>(
    filters.maxPrice !== undefined ? String(filters.maxPrice) : ""
  )

  // Filter brands based on search
  const filteredBrands = facets.brands.filter((b) =>
    b.name.toLowerCase().includes(brandSearch.toLowerCase().trim())
  )
  const visibleBrands = showAllBrands ? filteredBrands : filteredBrands.slice(0, 8)

  const handleBrandToggle = (brandId: string) => {
    const current = filters.brands || []
    const next = current.includes(brandId)
      ? current.filter((b) => b !== brandId)
      : [...current, brandId]
    onFilterChange({ ...filters, brands: next })
  }

  const handleCountryToggle = (countryCode: string) => {
    const current = filters.countries || []
    const next = current.includes(countryCode)
      ? current.filter((c) => c !== countryCode)
      : [...current, countryCode]
    onFilterChange({ ...filters, countries: next })
  }

  const handleDietaryToggle = (dietId: string) => {
    const current = filters.dietary || []
    const next = current.includes(dietId)
      ? current.filter((d) => d !== dietId)
      : [...current, dietId]
    onFilterChange({ ...filters, dietary: next })
  }

  const handlePriceApply = () => {
    const min = minPriceInput ? parseFloat(minPriceInput) : undefined
    const max = maxPriceInput ? parseFloat(maxPriceInput) : undefined
    onFilterChange({ ...filters, minPrice: min, maxPrice: max })
  }

  const handlePricePreset = (min?: number, max?: number) => {
    setMinPriceInput(min !== undefined ? String(min) : "")
    setMaxPriceInput(max !== undefined ? String(max) : "")
    onFilterChange({ ...filters, minPrice: min, maxPrice: max })
  }

  return (
    <aside className={cn("w-full space-y-5 text-xs select-none", className)}>
      {/* Header with Clear All */}
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <h3 className="font-heading text-sm font-bold text-foreground">
          {isZh ? "商品篩選" : "Filters"}
        </h3>
        <button
          type="button"
          onClick={onClearAll}
          className="flex items-center gap-1 font-semibold text-primary hover:underline hover:text-primary/80 transition-colors"
        >
          <RotateCcw className="size-3" />
          <span>{isZh ? "重設全部" : "Reset"}</span>
        </button>
      </div>

      {/* 1. Availability */}
      <div className="space-y-2 border-b border-border/60 pb-4">
        <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {isZh ? "庫存狀態" : "Availability"}
        </h4>
        <label className="flex items-center gap-2.5 cursor-pointer font-medium text-foreground hover:text-primary transition-colors">
          <input
            type="checkbox"
            checked={Boolean(filters.inStock)}
            onChange={(e) =>
              onFilterChange({ ...filters, inStock: e.target.checked || undefined })
            }
            className="size-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
          />
          <span className="flex-1">{isZh ? "僅顯示現貨" : "In Stock Only"}</span>
          <span className="text-[11px] text-muted-foreground">
            ({facets.inStockCount})
          </span>
        </label>
      </div>

      {/* 2. Offers & Deals */}
      <div className="space-y-2 border-b border-border/60 pb-4">
        <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {isZh ? "特惠專區" : "Offers & Deals"}
        </h4>
        <label className="flex items-center gap-2.5 cursor-pointer font-medium text-foreground hover:text-primary transition-colors">
          <input
            type="checkbox"
            checked={Boolean(filters.offers)}
            onChange={(e) =>
              onFilterChange({ ...filters, offers: e.target.checked || undefined })
            }
            className="size-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
          />
          <span className="flex-1 flex items-center gap-1.5">
            <Tag className="size-3 text-rose-500" />
            <span>{isZh ? "促銷特價商品" : "On Sale & Offers"}</span>
          </span>
          <span className="text-[11px] text-muted-foreground">
            ({facets.offersCount})
          </span>
        </label>
      </div>

      {/* 2b. Category / Department Filter (when multiple categories available) */}
      {facets.categories && facets.categories.length > 1 && (
        <div className="space-y-2 border-b border-border/60 pb-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {isZh ? "商品分類" : "Category"}
            </h4>
            <Link
              href="/categories"
              className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
            >
              {isZh ? "全館分類" : "View All"}
            </Link>
          </div>
          <div className="space-y-1 max-h-52 overflow-y-auto pr-1 no-scrollbar">
            {facets.categories.map((c) => {
              const checked = filters.category === c.slug || filters.category === c.id
              return (
                <Link
                  key={c.id}
                  href={`/categories/${c.slug}`}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-2 py-1.5 font-medium text-foreground transition-colors hover:bg-muted/70 hover:text-primary",
                    checked && "bg-primary/10 text-primary font-bold"
                  )}
                >
                  <span className="flex-1 truncate">
                    {isZh ? c.nameZh : c.nameEn}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    ({c.count})
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* 3. Brand Filter */}
      {facets.brands.length > 0 && (
        <div className="space-y-2.5 border-b border-border/60 pb-4">
          <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {isZh ? "精選品牌" : "Brand"}
          </h4>

          {/* Search box if > 6 brands */}
          {facets.brands.length > 6 && (
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-2 size-3 text-muted-foreground" />
              <input
                type="text"
                placeholder={isZh ? "搜尋品牌..." : "Search brands..."}
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className="h-7 w-full rounded-md border border-border/80 bg-background pl-7 pr-2 text-xs placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 no-scrollbar">
            {visibleBrands.map((b) => {
              const checked = filters.brands?.includes(b.id) ?? false
              return (
                <label
                  key={b.id}
                  className="flex items-center gap-2.5 cursor-pointer font-medium text-foreground hover:text-primary transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleBrandToggle(b.id)}
                    className="size-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                  />
                  <span className="flex-1 truncate">{b.name}</span>
                  <span className="text-[11px] text-muted-foreground">
                    ({b.count})
                  </span>
                </label>
              )
            })}
          </div>

          {filteredBrands.length > 8 && (
            <button
              type="button"
              onClick={() => setShowAllBrands(!showAllBrands)}
              className="flex items-center gap-1 font-semibold text-primary hover:underline transition-colors pt-1"
            >
              <span>
                {showAllBrands
                  ? isZh
                    ? "收起部分"
                    : "Show less"
                  : isZh
                  ? `顯示更多 (${filteredBrands.length - 8})`
                  : `Show more (${filteredBrands.length - 8})`}
              </span>
              {showAllBrands ? (
                <ChevronUp className="size-3" />
              ) : (
                <ChevronDown className="size-3" />
              )}
            </button>
          )}
        </div>
      )}

      {/* 4. Price Range Filter */}
      <div className="space-y-2.5 border-b border-border/60 pb-4">
        <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {isZh ? "價格區間 (HK$)" : "Price Range (HK$)"}
        </h4>

        {/* Min / Max inputs */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2 top-1.5 text-muted-foreground text-[10px]">
              HK$
            </span>
            <input
              type="number"
              placeholder={String(facets.minPrice)}
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              className="h-7 w-full rounded-md border border-border/80 bg-background pl-8 pr-1 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <span className="text-muted-foreground">–</span>
          <div className="relative flex-1">
            <span className="absolute left-2 top-1.5 text-muted-foreground text-[10px]">
              HK$
            </span>
            <input
              type="number"
              placeholder={String(facets.maxPrice)}
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              className="h-7 w-full rounded-md border border-border/80 bg-background pl-8 pr-1 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            type="button"
            onClick={handlePriceApply}
            className="h-7 rounded-md bg-secondary px-2.5 text-xs font-bold text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {isZh ? "套用" : "Go"}
          </button>
        </div>

        {/* Quick price preset chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => handlePricePreset(undefined, 30)}
            className="rounded border border-border/60 bg-muted/30 px-2 py-0.5 text-[11px] font-medium hover:border-primary hover:text-primary transition-colors"
          >
            &lt; HK$30
          </button>
          <button
            type="button"
            onClick={() => handlePricePreset(30, 80)}
            className="rounded border border-border/60 bg-muted/30 px-2 py-0.5 text-[11px] font-medium hover:border-primary hover:text-primary transition-colors"
          >
            HK$30–80
          </button>
          <button
            type="button"
            onClick={() => handlePricePreset(80, undefined)}
            className="rounded border border-border/60 bg-muted/30 px-2 py-0.5 text-[11px] font-medium hover:border-primary hover:text-primary transition-colors"
          >
            &gt; HK$80
          </button>
        </div>
      </div>

      {/* 5. Origin Country */}
      {facets.countries.length > 0 && (
        <div className="space-y-2 border-b border-border/60 pb-4">
          <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {isZh ? "原產地國家" : "Country of Origin"}
          </h4>
          <div className="space-y-1.5">
            {facets.countries.map((c) => {
              const checked = filters.countries?.includes(c.code) ?? false
              return (
                <label
                  key={c.code}
                  className="flex items-center gap-2.5 cursor-pointer font-medium text-foreground hover:text-primary transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleCountryToggle(c.code)}
                    className="size-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                  />
                  <span className="flex-1 flex items-center gap-1.5 truncate">
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    ({c.count})
                  </span>
                </label>
              )
            })}
          </div>
        </div>
      )}

      {/* 6. Dietary & Certifications */}
      <div className="space-y-2 pb-2">
        <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {isZh ? "飲食與認證" : "Dietary & Lifestyle"}
        </h4>
        <div className="space-y-1.5">
          {facets.dietary.map((d) => {
            const checked = filters.dietary?.includes(d.id) ?? false
            return (
              <label
                key={d.id}
                className="flex items-center gap-2.5 cursor-pointer font-medium text-foreground hover:text-primary transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleDietaryToggle(d.id)}
                  className="size-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                />
                <span className="flex-1 truncate">
                  {isZh ? d.nameZh : d.nameEn}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  ({d.count})
                </span>
              </label>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
