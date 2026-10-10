"use client"

import React from "react"
import { ProductCard } from "@/components/commerce/product-card"
import type { Product } from "@workspace/typescript-config/types"
import { BrowseCarousel } from "./browse-carousel"
import { useAppSelector } from "@/hooks/store"

export interface ProductRailProps {
  title: React.ReactNode
  subtitle?: string
  badgeText?: string
  products: Product[]
  viewAllHref?: string
  viewAllLabel?: string
  quantities?: Record<string, number>
  wishlist?: Record<string, boolean>
  onQuantityChange?: (productId: string, qty: number) => void
  onWishlistToggle?: (productId: string) => void
  className?: string
}

export function ProductRail({
  title,
  subtitle,
  badgeText,
  products,
  viewAllHref = "/catalog",
  viewAllLabel,
  quantities = {},
  wishlist = {},
  onQuantityChange,
  onWishlistToggle,
  className,
}: ProductRailProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const railBreakpoints = {
    0: {
      slidesPerView: 2.15,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 2.6,
      spaceBetween: 12,
    },
    640: {
      slidesPerView: 3.5,
      spaceBetween: 14,
    },
    768: {
      slidesPerView: 4.3,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 5.3,
      spaceBetween: 16,
    },
    1280: {
      slidesPerView: 6.3,
      spaceBetween: 18,
    },
  }

  return (
    <BrowseCarousel<Product>
      eyebrow={badgeText || (isZh ? "熱門精選" : "FEATURED COLLECTION")}
      title={title}
      subtitle={subtitle}
      viewAllHref={viewAllHref}
      viewAllLabel={viewAllLabel || (isZh ? "查看全部" : "View All")}
      items={products}
      slidesPerView={2.15}
      spaceBetween={10}
      breakpoints={railBreakpoints}
      className={className}
      renderItem={(product) => (
        <ProductCard
          product={product}
          quantity={quantities[product.id] ?? 0}
          isWishlisted={wishlist[product.id] ?? false}
          onQuantityChange={(qty) => onQuantityChange?.(product.id, qty)}
          onWishlistToggle={() => onWishlistToggle?.(product.id)}
          className="h-full"
        />
      )}
    />
  )
}
