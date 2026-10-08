"use client"

import React from "react"
import { Heart } from "lucide-react"
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { PriceBlock } from "./price-block"
import { AddToCartButton } from "./add-to-cart-button"
import type {
  Product,
  ProductVariant,
} from "@workspace/typescript-config/types"
import { cn } from "@workspace/ui/lib/utils"

export interface ProductCardProps {
  product: Product
  variant?: ProductVariant
  quantity?: number
  isWishlisted?: boolean
  onQuantityChange?: (qty: number) => void
  onWishlistToggle?: () => void
  onCardClick?: () => void
  className?: string
}

export function ProductCard({
  product,
  variant,
  quantity = 0,
  isWishlisted = false,
  onQuantityChange,
  onWishlistToggle,
  onCardClick,
  className,
}: ProductCardProps) {
  const activeVariant = variant || product.variants[0]
  const inStock = (activeVariant?.stockQuantity ?? 0) > 0
  const isLowStock = inStock && (activeVariant?.stockQuantity ?? 0) <= 5

  // Price conversion (cents to dollars for display)
  const price = (activeVariant?.priceCents ?? 0) / 100
  const mrp = activeVariant?.mrpCents ? activeVariant.mrpCents / 100 : undefined

  return (
    <Card
      onClick={onCardClick}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-sm",
        onCardClick && "cursor-pointer",
        className
      )}
    >
      <CardHeader className="p-3 pb-0 sm:p-4 sm:pb-0">
        {/* Top Badges & Wishlist Button */}
        <div className="mb-2 flex items-start justify-between gap-1">
          <div className="flex flex-wrap items-center gap-1">
            {product.badges?.includes("veg") && (
              <Badge variant="veg" size="sm">
                Veg
              </Badge>
            )}
            {product.badges?.includes("non-veg") && (
              <Badge variant="non-veg" size="sm">
                Non-veg
              </Badge>
            )}
            {product.badges?.includes("halal") && (
              <Badge variant="halal" size="sm">
                Halal
              </Badge>
            )}
            {isLowStock && (
              <Badge variant="lowStock" size="sm">
                Only {activeVariant?.stockQuantity} left
              </Badge>
            )}
            {!inStock && (
              <Badge variant="outOfStock" size="sm">
                Out of stock
              </Badge>
            )}
          </div>

          <button
            type="button"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            onClick={(e) => {
              e.stopPropagation()
              onWishlistToggle?.()
            }}
            className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
          >
            <Heart
              className={cn(
                "size-4",
                isWishlisted && "fill-destructive text-destructive"
              )}
            />
          </button>
        </div>

        {/* 1:1 Product Image Container */}
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-border/40 bg-white/80 p-3 dark:bg-card/80">
          {product.images?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.titleEn}
              loading="lazy"
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="text-center text-xs font-medium text-muted-foreground">
              1:1 Image
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-1 p-3 pt-3 sm:p-4">
        {/* Brand Name */}
        <span className="line-clamp-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          {product.originCountry ? `${product.originCountry} • ` : ""} Happymart
        </span>

        {/* Product Title (Strict 2 lines clamped) */}
        <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-foreground transition-colors group-hover:text-primary">
          {product.titleEn}
        </h3>

        {/* Pack Size */}
        <p className="text-xs font-medium text-muted-foreground">
          Pack: {activeVariant?.packSize || "Standard"}
        </p>

        {/* Price Block */}
        <div className="pt-2">
          <PriceBlock price={price} mrp={mrp} size="default" />
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0 sm:p-4">
        <AddToCartButton
          quantity={quantity}
          inStock={inStock}
          maxStock={activeVariant?.stockQuantity}
          onQuantityChange={(qty) => onQuantityChange?.(qty)}
          size="sm"
        />
      </CardFooter>
    </Card>
  )
}

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "flex flex-col justify-between space-y-3 overflow-hidden rounded-xl border border-border p-3 sm:p-4",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-12 rounded-full" />
        <Skeleton className="size-6 rounded-full" />
      </div>
      <Skeleton className="aspect-square w-full rounded-lg" />
      <div className="space-y-1.5 pt-1">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-14" />
      </div>
      <div className="space-y-2 pt-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </Card>
  )
}
