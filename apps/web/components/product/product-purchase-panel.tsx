"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Star,
  CheckCircle2,
  XCircle,
  Heart,
  Share2,
  ShoppingCart,
  ShoppingBag,
  Zap,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { useRouter } from "next/navigation"
import type { Product, ProductVariant } from "@workspace/typescript-config/types"
import { ProductVariantSelector } from "./product-variant-selector"
import { QuantityStepper } from "@/components/commerce/quantity-stepper"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { addToCart } from "@/features/cart/cartSlice"
import { cn } from "@workspace/ui/lib/utils"

interface ProductPurchasePanelProps {
  product: Product
  activeVariant: ProductVariant
  onSelectVariant: (variant: ProductVariant) => void
  className?: string
}

const countryFlags: Record<string, string> = {
  india: "🇮🇳",
  pakistan: "🇵🇰",
  bangladesh: "🇧🇩",
  nepal: "🇳🇵",
  "sri lanka": "🇱🇰",
  uae: "🇦🇪",
  thailand: "🇹🇭",
}

export function ProductPurchasePanel({
  product,
  activeVariant,
  onSelectVariant,
  className,
}: ProductPurchasePanelProps) {
  const dispatch = useAppDispatch()
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [copied, setCopied] = useState(false)

  const cartItems = useAppSelector((state) => state.cart.items)
  const existingCartItem = cartItems.find(
    (item) =>
      item.variantId === activeVariant.id || item.productId === product.id
  )
  const alreadyInCartQty = existingCartItem?.quantity ?? 0

  const brandSlug =
    product.brandSlug ||
    product.brandId?.replace("brand-", "") ||
    product.brandName.toLowerCase().replace(/[^a-z0-9]/g, "-")

  const title = isZh && product.titleZh ? product.titleZh : product.titleEn
  const stock = activeVariant.stockQuantity ?? 0
  const inStock = stock > 0

  const price = (activeVariant.priceCents ?? 0) / 100
  const mrp = activeVariant.mrpCents ? activeVariant.mrpCents / 100 : undefined
  const discount =
    mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0

  const flagEmoji = countryFlags[product.originCountry.toLowerCase()] || "🌍"

  // Unit price calculation
  const unitPriceString = (() => {
    const pack = activeVariant.packSize.toLowerCase()
    if (pack.includes("5 kg")) return `HK$${(price / 5).toFixed(2)} / kg`
    if (pack.includes("10 kg")) return `HK$${(price / 10).toFixed(2)} / kg`
    if (pack.includes("1 kg") || pack.includes("1000 g")) return `HK$${price.toFixed(2)} / kg`
    if (pack.includes("500 g")) return `HK$${(price * 2).toFixed(2)} / kg`
    if (pack.includes("1 l") || pack.includes("1000 ml")) return `HK$${price.toFixed(2)} / L`
    return null
  })()

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        variantId: activeVariant.id,
        productId: product.id,
        title,
        brand: product.brandName,
        packSize: activeVariant.packSize,
        price,
        mrp,
        quantity,
        image: product.images?.[0] || "",
        originCountry: product.originCountry,
      })
    )
  }

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        variantId: activeVariant.id,
        productId: product.id,
        title,
        brand: product.brandName,
        packSize: activeVariant.packSize,
        price,
        mrp,
        quantity: quantity || 1,
        image: product.images?.[0] || "",
        originCountry: product.originCountry,
      })
    )
    router.push("/checkout")
  }

  const handleShare = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      // User cancelled
    }
  }

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {/* Brand & Social Actions Row */}
      <div className="flex items-center justify-between">
        <Link
          href={`/brands/${brandSlug}`}
          className="text-xs font-bold text-primary tracking-wider hover:underline uppercase transition-colors"
        >
          {product.brandName}
        </Link>

        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="flex size-8 items-center justify-center rounded-full border border-border/70 text-primary hover:bg-muted transition-colors cursor-pointer"
            aria-label="Share product"
            title={copied ? (isZh ? "已複製連結！" : "Copied to clipboard!") : "Share product"}
          >
            <Share2 className="size-3.5 text-primary" />
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={cn(
              "flex size-8 items-center justify-center rounded-full border border-border/70 transition-colors cursor-pointer",
              isWishlisted
                ? "border-rose-200 bg-rose-50 text-rose-600 dark:bg-rose-950/40"
                : "text-primary hover:bg-muted"
            )}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("size-3.5", isWishlisted ? "fill-rose-500 text-rose-500" : "text-primary")} />
          </button>
        </div>
      </div>

      {/* Main Single H1 Product Title */}
      <h1 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground leading-snug">
        {title}
      </h1>

      {/* Origin Flag, Rating & SKU row */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {/* Origin Flag */}
        <span className="flex items-center gap-1.5 font-bold text-foreground">
          <span className="text-sm">{flagEmoji}</span>
          <span>{product.originCountry}</span>
        </span>

        <span className="text-border">•</span>

        {/* Rating */}
        {product.rating && (
          <a
            href="#reviews"
            className="flex items-center gap-1 font-semibold text-foreground hover:text-primary transition-colors"
          >
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-muted-foreground font-normal">
              ({product.reviewCount ?? 0} {isZh ? "則評價" : "reviews"})
            </span>
          </a>
        )}

        {product.rating && <span className="text-border">•</span>}

        {/* SKU */}
        <span className="font-mono text-[11px]">
          SKU: {activeVariant.sku || product.id}
        </span>
      </div>

      {/* Price Block */}
      <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-2xs space-y-2">
        <div className="flex flex-wrap items-baseline gap-2.5">
          <span className="font-heading text-2xl sm:text-3xl font-black text-foreground">
            HK${price.toFixed(2)}
          </span>

          {mrp && mrp > price && (
            <span className="text-sm sm:text-base font-semibold text-muted-foreground line-through">
              HK${mrp.toFixed(2)}
            </span>
          )}

          {discount > 0 && (
            <span className="rounded-md bg-accent/20 px-2 py-0.5 text-xs font-bold text-accent">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Unit Price & Tax notice */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
          {unitPriceString && <span>({unitPriceString})</span>}
          <span>•</span>
          <span>{isZh ? "包裝容量：" : "Pack Size: "} {activeVariant.packSize}</span>
          <span>•</span>
          <span>{isZh ? "香港進口特惠價 (無額外稅費)" : "All taxes included in HK"}</span>
        </div>
      </div>

      {/* Variant Selector (Pack-size selector) */}
      {product.variants.length > 1 && (
        <ProductVariantSelector
          variants={product.variants}
          selectedVariantId={activeVariant.id}
          onSelectVariant={onSelectVariant}
        />
      )}

      {/* Stock Availability Indicator */}
      <div className="flex items-center gap-2 text-xs font-semibold">
        {inStock ? (
          <div className="flex items-center gap-1.5 text-primary">
            <CheckCircle2 className="size-4 text-primary" />
            <span>{isZh ? "有現貨 (專屬溫控庫存，可即時發貨)" : "In Stock (Ready for Next-Day Dispatch)"}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-destructive">
            <XCircle className="size-4" />
            <span>{isZh ? "暫時缺貨 (補貨中)" : "Currently Out of Stock"}</span>
          </div>
        )}
      </div>

      {/* Main Purchase Action Target Anchor for StickyBuyBar */}
      <div id="main-purchase-anchor" className="space-y-3 pt-1">
        {/* Quantity Stepper & Add to Cart Row */}
        <div className="flex items-center gap-3">
          {inStock && (
            <div className="w-28 shrink-0">
              <QuantityStepper
                value={quantity}
                min={1}
                max={stock}
                showDeleteAtMin={false}
                onChange={setQuantity}
                size="lg"
                className="w-full"
              />
            </div>
          )}

          <Button
            type="button"
            variant="default"
            size="lg"
            disabled={!inStock}
            onClick={handleAddToCart}
            className="h-12 flex-1 rounded-xl font-bold shadow-xs text-sm gap-2 cursor-pointer transition-transform active:scale-[0.98]"
          >
            <ShoppingCart className="size-4" />
            <span>
              {inStock
                ? isZh
                  ? "加入購物車"
                  : "Add to Cart"
                : isZh
                  ? "暫時缺貨"
                  : "Out of Stock"}
            </span>
          </Button>
        </div>

        {alreadyInCartQty > 0 && (
          <p className="text-xs font-semibold text-primary/90 flex items-center gap-1.5">
            <span className="inline-block size-1.5 rounded-full bg-primary" />
            <span>
              {isZh
                ? `購物車已有 ${alreadyInCartQty} 件`
                : `${alreadyInCartQty} already in cart`}
            </span>
          </p>
        )}

        {/* Buy Now Button */}
        {inStock && (
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleBuyNow}
            className="w-full h-11 rounded-xl font-bold gap-2 text-xs sm:text-sm border border-border/80 hover:bg-secondary/80 cursor-pointer"
          >
            <Zap className="size-4 text-primary" />
            <span>{isZh ? "立即購買 (前往結帳)" : "Buy Now (Fast Checkout)"}</span>
          </Button>
        )}
      </div>
    </div>
  )
}
