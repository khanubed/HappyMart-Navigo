"use client"

import React from "react"
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import type { SortOption } from "@workspace/mock-data"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

export interface ActiveChip {
  id: string
  label: string
  onRemove: () => void
}

export interface ProductListingToolbarProps {
  totalCount: number
  showingCount: number
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  onOpenMobileFilters: () => void
  activeFilterCount: number
  activeChips: ActiveChip[]
  onClearAllFilters: () => void
  className?: string
}

export function ProductListingToolbar({
  totalCount,
  showingCount,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenMobileFilters,
  activeFilterCount,
  activeChips,
  onClearAllFilters,
  className,
}: ProductListingToolbarProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const sortLabels: Record<SortOption, { en: string; zh: string }> = {
    recommended: { en: "Recommended", zh: "推薦排序" },
    bestselling: { en: "Best Selling", zh: "熱銷優先" },
    "category-asc": { en: "Category (A-Z)", zh: "按分類排序" },
    "price-asc": { en: "Price: Low to High", zh: "價格：由低到高" },
    "price-desc": { en: "Price: High to Low", zh: "價格：由高到低" },
    newest: { en: "New Arrivals", zh: "最新上架" },
    "name-asc": { en: "Name: A to Z", zh: "名稱：A 到 Z" },
    "rating-desc": { en: "Highest Rated", zh: "顧客高評分" },
  }

  return (
    <div className={cn("space-y-2.5", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-border/80 bg-card p-2 sm:p-2.5 shadow-2xs">
        {/* Left: Product count summary */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium pl-1">
          <span>
            {isZh ? (
              <>
                顯示 <strong className="text-foreground font-bold">{showingCount}</strong> /{" "}
                {totalCount} 款
              </>
            ) : (
              <>
                Showing <strong className="text-foreground font-bold">{showingCount}</strong> of{" "}
                {totalCount}
              </>
            )}
          </span>
        </div>

        {/* Right: Controls (Filter button on mobile, Sort select, View mode toggle) */}
        <div className="flex items-center gap-2">
          {/* Mobile Filter Trigger Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onOpenMobileFilters}
            className="flex items-center gap-1.5 h-8 text-xs font-semibold lg:hidden"
          >
            <SlidersHorizontal className="size-3.5 text-primary" />
            <span>{isZh ? "篩選" : "Filters"}</span>
            {activeFilterCount > 0 && (
              <span className="flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </Button>

          {/* Sort selector dropdown */}
          <div className="relative flex items-center">
            <label htmlFor="catalog-sort" className="sr-only">
              Sort by
            </label>
            <div className="pointer-events-none absolute left-2.5 text-muted-foreground">
              <ArrowUpDown className="size-3.5" />
            </div>
            <select
              id="catalog-sort"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="h-8 cursor-pointer rounded-lg border border-border/80 bg-background pl-8 pr-7 text-xs font-semibold text-foreground transition-colors hover:border-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
            >
              {Object.entries(sortLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {isZh ? label.zh : label.en}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Grid / List view switcher */}
          <div className="hidden sm:flex items-center rounded-lg border border-border/80 p-0.5 bg-muted/40">
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => onViewModeChange("grid")}
              className={cn(
                "flex size-7 items-center justify-center rounded-md transition-colors",
                viewMode === "grid"
                  ? "bg-card text-primary shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label="List view"
              onClick={() => onViewModeChange("list")}
              className={cn(
                "flex size-7 items-center justify-center rounded-md transition-colors",
                viewMode === "list"
                  ? "bg-card text-primary shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips Strip */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span className="text-[11px] font-semibold text-muted-foreground mr-1">
            {isZh ? "已套用篩選:" : "Active filters:"}
          </span>

          {activeChips.map((chip) => (
            <span
              key={chip.id}
              className="group inline-flex items-center gap-1 rounded-md border border-border/80 bg-card py-0.5 pl-2 pr-1 text-xs font-medium text-foreground transition-all hover:border-destructive/40"
            >
              <span>{chip.label}</span>
              <button
                type="button"
                onClick={chip.onRemove}
                aria-label={`Remove filter ${chip.label}`}
                className="flex size-4 items-center justify-center rounded hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}

          <button
            type="button"
            onClick={onClearAllFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline hover:text-primary/80 ml-1 cursor-pointer"
          >
            <RotateCcw className="size-3" />
            <span>{isZh ? "清除全部" : "Clear all"}</span>
          </button>
        </div>
      )}
    </div>
  )
}
