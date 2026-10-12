"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"

import { AddToCartButton } from "./add-to-cart-button"
import { Skeleton } from "@workspace/ui/components/skeleton"
import type {
  Product,
  ProductVariant,
} from "@workspace/typescript-config/types"
import { cn } from "@workspace/ui/lib/utils"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { addToCart, updateQuantity, removeFromCart } from "@/features/cart/cartSlice"

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
  quantity,
  isWishlisted = false,
  onQuantityChange,
  onWishlistToggle,
  onCardClick,
  className,
}: ProductCardProps) {
  const dispatch = useAppDispatch()
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"
  const cartItems = useAppSelector((state) => state.cart.items)

  const [imgError, setImgError] = React.useState(false)
  const activeVariant = variant || product.variants[0]
  const stock = activeVariant?.stockQuantity ?? 0
  const inStock = stock > 0

  const price = (activeVariant?.priceCents ?? 0) / 100
  const mrp = activeVariant?.mrpCents
    ? activeVariant.mrpCents / 100
    : undefined

  const discount =
    mrp && mrp > price
      ? Math.round(((mrp - price) / mrp) * 100)
      : 0

  const isNew = product.badges?.includes("new")
  const productHref = `/p/${product.slug || product.id}`
  const title = isZh && product.titleZh ? product.titleZh : product.titleEn

  // Find item in Redux cart state
  const cartItem = cartItems.find(
    (item) =>
      item.productId === product.id ||
      (activeVariant && item.variantId === activeVariant.id)
  )

  const activeQuantity = cartItem?.quantity ?? (quantity || 0)

  const handleQuantityChange = (newQty: number) => {
    const variantId = activeVariant?.id || `var-${product.id}`

    if (newQty > 0) {
      if (cartItem) {
        dispatch(
          updateQuantity({
            variantId: cartItem.variantId,
            quantity: newQty,
          })
        )
      } else {
        dispatch(
          addToCart({
            variantId,
            productId: product.id,
            title,
            brand: product.brandName,
            packSize: activeVariant?.packSize,
            price,
            mrp,
            quantity: newQty,
            image: product.images?.[0] || "",
            originCountry: product.originCountry,
          })
        )
      }
    } else {
      const vid = cartItem?.variantId || variantId
      dispatch(removeFromCart(vid))
    }

    onQuantityChange?.(newQty)
  }

  return (
    <article
      className={cn(
        "group relative flex min-w-0 w-full flex-col overflow-hidden",
        "rounded-xl sm:rounded-2xl border border-border/80 bg-card",
        "transition-all duration-200 hover:border-primary/40 hover:shadow-2xs",
        className,
      )}
    >
      {/* Product image container */}
      <div className="relative m-1.5 sm:m-2 mb-0 overflow-hidden rounded-lg sm:rounded-xl bg-muted/40">
        <Link
          href={productHref}
          aria-label={`View ${product.titleEn}`}
          className="relative flex aspect-square w-full items-center justify-center"
          onClick={(event) => {
            if (onCardClick) {
              event.preventDefault()
            }
          }}
        >
          {product.images?.[0] && !imgError ? (
            <Image
              src={product.images[0]}
              alt={product.titleEn}
              fill
              sizes="(max-width: 639px) 40vw, (max-width: 1023px) 25vw, 15vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex size-full items-center justify-center rounded-lg bg-muted/60 font-heading text-lg sm:text-xl font-bold text-muted-foreground/60">
              {product.brandName?.charAt(0) || "P"}
            </div>
          )}
        </Link>

        {/* Promotional / discount badge */}
        {(isNew || discount > 0) && (
          <span className="absolute left-1.5 top-1.5 rounded-md bg-foreground/90 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-background leading-none">
            {discount > 0 ? `${discount}% OFF` : "NEW"}
          </span>
        )}

        {/* Wishlist control button */}
        <button
          type="button"
          suppressHydrationWarning
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          aria-pressed={isWishlisted}
          onClick={(event) => {
            event.stopPropagation()
            onWishlistToggle?.()
          }}
          className={cn(
            "absolute right-1.5 top-1.5 flex size-6 sm:size-7 items-center justify-center cursor-pointer",
            "rounded-full bg-background/90 text-muted-foreground shadow-2xs backdrop-blur-xs",
            "transition-colors hover:text-rose-600 hover:bg-background",
          )}
        >
          <Heart
            className={cn(
              "size-3.5 sm:size-4",
              isWishlisted ? "fill-rose-500 text-rose-500" : "text-primary",
            )}
            strokeWidth={1.7}
          />
        </button>
      </div>

      {/* Product information with fixed vertical rhythm */}
      <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-3 pt-2">
        <div>
          {/* Title: exactly 2 lines height allocated */}
          <Link
            href={productHref}
            onClick={(event) => {
              if (onCardClick) {
                event.preventDefault()
                onCardClick()
              }
            }}
            className="block"
          >
            <h3 className="line-clamp-2 h-7 sm:h-8 text-[11px] sm:text-xs font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
              {title}
            </h3>
          </Link>

          {/* Price row */}
          <div className="mt-1.5 flex items-baseline justify-between gap-1">
            <div className="flex items-baseline gap-1.5 min-w-0">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-foreground">
                HK${price.toFixed(2)}
              </span>
              {mrp && mrp > price && (
                <span className="text-[10px] sm:text-[11px] text-muted-foreground line-through">
                  HK${mrp.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Fixed pack info slot to prevent height shift */}
          <div className="h-4 mt-0.5">
            <p className="truncate text-[10px] sm:text-[11px] text-muted-foreground">
              {activeVariant?.packSize || "\u00A0"}
            </p>
          </div>
        </div>

        {/* Pinned action button */}
        <div className="mt-2 pt-0.5">
          <AddToCartButton
            quantity={activeQuantity}
            inStock={inStock}
            maxStock={stock}
            onQuantityChange={handleQuantityChange}
            size="sm"
          />
        </div>

        {!inStock && (
          <p className="mt-1 text-center text-[10px] text-muted-foreground">
            Currently unavailable
          </p>
        )}
      </div>
    </article>
  )
}

export function ProductCardSkeleton({
  className,
}: {
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card p-2 sm:p-2.5",
        className,
      )}
    >
      <Skeleton className="aspect-square w-full rounded-lg sm:rounded-xl" />

      <div className="space-y-2 px-0.5 pt-2">
        <Skeleton className="h-3.5 w-4/5" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex justify-between items-baseline pt-1">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-3 w-10" />
        </div>
        <Skeleton className="h-7 sm:h-8 w-full rounded-lg" />
      </div>
    </div>
  )
}
