"use client"

import React, { useState } from "react"
import { ProductCard, ProductCardSkeleton } from "../commerce/product-card"
import { ProductEmptyState } from "./product-empty-state"
import type { Product } from "@workspace/typescript-config/types"
import { Button } from "@workspace/ui/components/button"
import { useAppSelector } from "@/hooks/store"
import { ChevronDown } from "lucide-react"

export interface ProductGridProps {
  products: Product[]
  viewMode?: "grid" | "list"
  quantities: Record<string, number>
  wishlist: Record<string, boolean>
  onQuantityChange: (productId: string, qty: number) => void
  onWishlistToggle: (productId: string) => void
  isLoading?: boolean
  onClearFilters?: () => void
  hasActiveFilters?: boolean
  className?: string
}

const PAGE_SIZE = 24

export function ProductGrid({
  products,
  viewMode = "grid",
  quantities,
  wishlist,
  onQuantityChange,
  onWishlistToggle,
  isLoading = false,
  onClearFilters,
  hasActiveFilters = false,
  className,
}: ProductGridProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const [visibleLimit, setVisibleLimit] = useState(PAGE_SIZE)

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <ProductEmptyState
        onClearFilters={onClearFilters}
        hasActiveFilters={hasActiveFilters}
      />
    )
  }

  const displayedProducts = products.slice(0, visibleLimit)
  const hasMore = visibleLimit < products.length

  const handleLoadMore = () => {
    setVisibleLimit((prev) => prev + PAGE_SIZE)
  }

  return (
    <div className={`space-y-6 ${className || ""}`}>
      {/* Product items display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {displayedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              quantity={quantities[p.id] ?? 0}
              isWishlisted={wishlist[p.id] ?? false}
              onQuantityChange={(qty) => onQuantityChange(p.id, qty)}
              onWishlistToggle={() => onWishlistToggle(p.id)}
            />
          ))}
        </div>
      ) : (
        /* List view layout */
        <div className="space-y-2.5">
          {displayedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              quantity={quantities[p.id] ?? 0}
              isWishlisted={wishlist[p.id] ?? false}
              onQuantityChange={(qty) => onQuantityChange(p.id, qty)}
              onWishlistToggle={() => onWishlistToggle(p.id)}
              className="flex-row items-center p-2 sm:p-3"
            />
          ))}
        </div>
      )}

      {/* Load More Pagination Trigger */}
      {hasMore && (
        <div className="flex flex-col items-center justify-center pt-4 pb-2 space-y-2">
          <p className="text-xs text-muted-foreground font-medium">
            {isZh ? (
              <>
                已顯示 {displayedProducts.length} / {products.length} 款商品
              </>
            ) : (
              <>
                Showing {displayedProducts.length} of {products.length} products
              </>
            )}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={handleLoadMore}
            className="gap-2 h-9 text-xs font-bold px-6"
          >
            <span>{isZh ? "載入更多商品" : "Load more products"}</span>
            <ChevronDown className="size-3.5" />
          </Button>
        </div>
      )}
    </div>
  )
}
