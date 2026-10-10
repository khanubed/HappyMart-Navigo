"use client"

import React, { useState, useEffect } from "react"
import { X, RotateCcw, Check } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import type { AvailableFacets, FilterState } from "@workspace/mock-data"
import { ProductFilterSidebar } from "./product-filter-sidebar"
import { useAppSelector } from "@/hooks/store"

export interface ProductFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  facets: AvailableFacets
  filters: FilterState
  onApplyFilters: (newFilters: FilterState) => void
  onClearAll: () => void
  totalMatchingCount: number
}

export function ProductFilterDrawer({
  isOpen,
  onClose,
  facets,
  filters,
  onApplyFilters,
  onClearAll,
  totalMatchingCount,
}: ProductFilterDrawerProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  // Local draft state so user can make multiple selections before applying
  const [draftFilters, setDraftFilters] = useState<FilterState>(filters)

  // Sync draft when opened or external filters change
  useEffect(() => {
    if (isOpen) {
      setDraftFilters(filters)
    }
  }, [isOpen, filters])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleApply = () => {
    onApplyFilters(draftFilters)
    onClose()
  }

  const handleResetDraft = () => {
    const empty: FilterState = {
      category: undefined,
      brands: [],
      countries: [],
      dietary: [],
      sort: draftFilters.sort,
      subcategory: draftFilters.subcategory,
    }
    setDraftFilters(empty)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative flex h-full w-full max-w-xs flex-col bg-background shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 className="font-heading text-sm font-bold text-foreground">
            {isZh ? "商品篩選條件" : "Filter Products"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex size-7 items-center justify-center rounded-full hover:bg-muted text-muted-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Scrollable Filters Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <ProductFilterSidebar
            facets={facets}
            filters={draftFilters}
            onFilterChange={setDraftFilters}
            onClearAll={handleResetDraft}
          />
        </div>

        {/* Sticky Footer */}
        <div className="border-t border-border bg-card p-3 flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetDraft}
            className="h-9 px-3 text-xs font-semibold gap-1"
          >
            <RotateCcw className="size-3" />
            <span>{isZh ? "重設" : "Reset"}</span>
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleApply}
            className="flex-1 h-9 text-xs font-bold gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Check className="size-3.5" />
            <span>
              {isZh
                ? `套用篩選 (${totalMatchingCount})`
                : `Apply (${totalMatchingCount})`}
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}
