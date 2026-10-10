"use client"

import React from "react"
import { SearchX, RotateCcw } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { useAppSelector } from "@/hooks/store"

export interface ProductEmptyStateProps {
  onClearFilters?: () => void
  hasActiveFilters?: boolean
  className?: string
}

export function ProductEmptyState({
  onClearFilters,
  hasActiveFilters = true,
  className,
}: ProductEmptyStateProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  return (
    <div
      className={`flex min-h-[340px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/20 p-8 text-center ${
        className || ""
      }`}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-muted/60 text-muted-foreground mb-3">
        <SearchX className="size-7" />
      </div>

      <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">
        {isZh ? "未找到符合條件的商品" : "No products found"}
      </h3>

      <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {isZh
          ? "請嘗試放寬篩選條件、重設價格區間或清除品牌勾選以查看更多商品。"
          : "Try adjusting your filters, clearing brand selections, or broadening your price range."}
      </p>

      {hasActiveFilters && onClearFilters && (
        <div className="mt-5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="gap-2 font-semibold"
          >
            <RotateCcw className="size-3.5" />
            <span>{isZh ? "重設所有篩選" : "Clear all filters"}</span>
          </Button>
        </div>
      )}
    </div>
  )
}
