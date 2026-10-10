"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import type { Product, ProductVariant } from "@workspace/typescript-config/types"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { addToCart, setLastAddedItem } from "@/features/cart/cartSlice"
import { cn } from "@workspace/ui/lib/utils"

interface StickyBuyBarProps {
  product: Product
  activeVariant: ProductVariant
  targetAnchorId?: string
}

export function StickyBuyBar({
  product,
  activeVariant,
  targetAnchorId = "main-purchase-anchor",
}: StickyBuyBarProps) {
  const dispatch = useAppDispatch()
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const targetEl = document.getElementById(targetAnchorId)
    if (!targetEl) {
      // Fallback to window scroll if anchor is not mounted yet
      const handleScroll = () => {
        setIsVisible(window.scrollY > 400)
      }
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) {
          // Show when main purchase anchor is scrolled out of viewport
          setIsVisible(!entry.isIntersecting)
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-80px 0px 0px 0px",
      }
    )

    observer.observe(targetEl)
    return () => observer.disconnect()
  }, [targetAnchorId])

  const price = (activeVariant.priceCents / 100).toFixed(2)
  const stock = activeVariant.stockQuantity ?? 0
  const inStock = stock > 0
  const image = product.images?.[0]
  const title = isZh && product.titleZh ? product.titleZh : product.titleEn

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        variantId: activeVariant.id,
        productId: product.id,
        title,
        brand: product.brandName,
        packSize: activeVariant.packSize,
        price: (activeVariant.priceCents ?? 0) / 100,
        mrp: activeVariant.mrpCents ? activeVariant.mrpCents / 100 : undefined,
        quantity: 1,
        image: image || "",
        originCountry: product.originCountry,
      })
    )
  }

  return (
    <div
      aria-hidden={!isVisible}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 p-3 shadow-2xl backdrop-blur-md transition-transform duration-300 lg:hidden",
        isVisible ? "translate-y-0" : "translate-y-full pointer-events-none"
      )}
    >
      <div className="flex items-center gap-3 max-w-md mx-auto">
        {image && (
          <div className="relative size-11 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-white p-0.5">
            <Image
              src={image}
              alt={product.titleEn}
              fill
              sizes="44px"
              className="object-contain p-0.5"
              unoptimized
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h4 className="truncate text-xs font-bold text-foreground">
            {title}
          </h4>
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-sm font-black text-foreground">
              HK${price}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">
              ({activeVariant.packSize})
            </span>
          </div>
        </div>

        <div className="w-36 shrink-0">
          <Button
            type="button"
            size="sm"
            onClick={handleAddToCart}
            disabled={!inStock}
            className="w-full h-9 rounded-xl text-xs font-bold gap-1.5 shadow-xs cursor-pointer"
          >
            <ShoppingCart className="size-3.5" />
            <span>{inStock ? (isZh ? "加入購物車" : "Add to Cart") : (isZh ? "缺貨" : "Out of Stock")}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
