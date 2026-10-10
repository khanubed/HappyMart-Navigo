"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import type { Product, ProductVariant } from "@workspace/typescript-config/types"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { addToCart, setLastAddedItem } from "@/features/cart/cartSlice"
import { cn } from "@workspace/ui/lib/utils"

interface MobileStickyPurchaseBarProps {
  product: Product
  activeVariant: ProductVariant
}

export function MobileStickyPurchaseBar({
  product,
  activeVariant,
}: MobileStickyPurchaseBarProps) {
  const dispatch = useAppDispatch()
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"
  const [isVisible, setIsVisible] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 450px
      if (window.scrollY > 450) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  const price = (activeVariant.priceCents / 100).toFixed(2)
  const stock = activeVariant.stockQuantity ?? 0
  const inStock = stock > 0
  const image = product.images?.[0]

  const title = isZh && product.titleZh ? product.titleZh : product.titleEn

  const handleAddToCart = (qty: number) => {
    setQuantity(qty)
    dispatch(
      addToCart({
        variantId: activeVariant.id,
        productId: product.id,
        title,
        brand: product.brandName,
        packSize: activeVariant.packSize,
        price: (activeVariant.priceCents ?? 0) / 100,
        mrp: activeVariant.mrpCents ? activeVariant.mrpCents / 100 : undefined,
        quantity: qty,
        image: image || "",
        originCountry: product.originCountry,
      })
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 p-3 shadow-lg backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-3">
        {image && (
          <div className="relative size-11 shrink-0 overflow-hidden rounded-lg border border-border bg-white p-1">
            <Image
              src={image}
              alt={product.titleEn}
              fill
              sizes="44px"
              className="object-contain"
              unoptimized
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h4 className="truncate text-xs font-bold text-foreground">
            {product.titleEn}
          </h4>
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-sm font-black text-foreground">
              HK${price}
            </span>
            <span className="text-[10px] text-muted-foreground">
              ({activeVariant.packSize})
            </span>
          </div>
        </div>

        <div className="w-32 shrink-0">
          <AddToCartButton
            quantity={quantity}
            inStock={inStock}
            maxStock={stock}
            onQuantityChange={handleAddToCart}
            size="sm"
            className="w-full text-xs font-bold"
          />
        </div>
      </div>
    </div>
  )
}
