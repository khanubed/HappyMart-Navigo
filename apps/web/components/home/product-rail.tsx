"use client"

import React, { useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { ProductCard } from "@/components/commerce/product-card"
import type { Product } from "@workspace/typescript-config/types"

export interface ProductRailProps {
  title: string
  subtitle?: string
  badgeText?: string
  products: Product[]
  viewAllHref?: string
  quantities?: Record<string, number>
  wishlist?: Record<string, boolean>
  onQuantityChange?: (productId: string, qty: number) => void
  onWishlistToggle?: (productId: string) => void
}

export function ProductRail({
  title,
  subtitle,
  badgeText,
  products,
  viewAllHref = "/catalog",
  quantities = {},
  wishlist = {},
  onQuantityChange,
  onWishlistToggle,
}: ProductRailProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="max-w-8xl mx-auto space-y-4 px-4 py-8 sm:px-6 lg:px-8">
      {/* Rail Header with Controls */}
      <div className="flex items-end justify-between">
        <div>
          {badgeText && (
            <span className="mb-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-primary uppercase">
              {badgeText}
            </span>
          )}
          <h2 className="font-heading text-xl font-extrabold text-foreground sm:text-2xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Arrow Buttons */}
          <div className="hidden items-center gap-1 rounded-lg border border-border bg-muted/30 p-0.5 sm:flex">
            <Button
              variant="ghost"
              size="icon"
              className="size-7 rounded-md"
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 rounded-md"
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <Link href={viewAllHref}>
            <Button
              variant="link"
              size="sm"
              className="gap-1 text-xs font-bold"
            >
              View All <ArrowRight className="size-3" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Horizontal Scrollable Row */}
      <div
        ref={scrollContainerRef}
        className="-mx-4 no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pt-1 pb-3 sm:-mx-6 sm:gap-5 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[180px] shrink-0 snap-start sm:w-[220px] md:w-[240px]"
          >
            <ProductCard
              product={product}
              quantity={quantities[product.id] ?? 0}
              isWishlisted={wishlist[product.id] ?? false}
              onQuantityChange={(qty) => onQuantityChange?.(product.id, qty)}
              onWishlistToggle={() => onWishlistToggle?.(product.id)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
