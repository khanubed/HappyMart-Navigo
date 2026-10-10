"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import type { Product } from "@workspace/typescript-config/types"
import { ProductCard } from "@/components/commerce/product-card"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

interface RelatedProductsProps {
  currentProductId: string
  brandName: string
  brandSlug: string
  brandProducts: Product[]
  categoryProducts: Product[]
  className?: string
}

export function RelatedProducts({
  currentProductId,
  brandName,
  brandSlug,
  brandProducts,
  categoryProducts,
  className,
}: RelatedProductsProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const filteredBrandProducts = brandProducts
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4)

  const filteredCategoryProducts = categoryProducts
    .filter((p) => p.id !== currentProductId && !filteredBrandProducts.some((bp) => bp.id === p.id))
    .slice(0, 4)

  if (filteredBrandProducts.length === 0 && filteredCategoryProducts.length === 0) {
    return null
  }

  return (
    <div className={cn("space-y-12", className)}>
      {/* 1. More From This Brand */}
      {filteredBrandProducts.length > 0 && (
        <section aria-label={`More from ${brandName}`} className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/70 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground">
                {isZh ? `更多 ${brandName} 旗下精選` : `More from ${brandName}`}
              </h3>
            </div>

            <Link
              href={`/brands/${brandSlug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              <span>{isZh ? "查看品牌專區" : "View brand store"}</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
            {filteredBrandProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* 2. Similar Products in Same Category */}
      {filteredCategoryProducts.length > 0 && (
        <section aria-label="Similar products" className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/70 pb-3">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground">
              {isZh ? "同類熱門推薦商品" : "Similar Products in Category"}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
            {filteredCategoryProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
