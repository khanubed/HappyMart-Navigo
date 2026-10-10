"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus, Check, Sparkles } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import type { Product } from "@workspace/typescript-config/types"
import type { CartItem } from "@/features/cart/cartSlice"
import { cn } from "@workspace/ui/lib/utils"

export interface ProductRowProps {
  products: Product[]
  onAddToCart: (item: CartItem) => void
  isZh?: boolean
  className?: string
}

export function ProductRow({
  products,
  onAddToCart,
  isZh = false,
  className,
}: ProductRowProps) {
  if (products.length === 0) return null

  return (
    <section
      aria-label={isZh ? "常購加購推薦" : "Recommended add-ons"}
      className={cn("space-y-3 pt-6 border-t border-border/80", className)}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-accent" />
        <h2 className="font-heading text-base sm:text-lg font-bold text-foreground">
          {isZh ? "推薦加購商品" : "Frequently Added With Your Cart"}
        </h2>
      </div>

      <p className="text-xs text-muted-foreground">
        {isZh
          ? "根據您購物車中的食材推薦搭配的香料、抹醬與日常雜貨"
          : "Pairings and essentials curated based on items in your cart"}
      </p>

      {/* Compact Supermarket Product Row Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        {products.map((product) => (
          <CompactSuggestionCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            isZh={isZh}
          />
        ))}
      </div>
    </section>
  )
}

function CompactSuggestionCard({
  product,
  onAddToCart,
  isZh,
}: {
  product: Product
  onAddToCart: (item: CartItem) => void
  isZh?: boolean
}) {
  const [justAdded, setJustAdded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const variant = product.variants[0]
  if (!variant) return null

  const price = (variant.priceCents || 0) / 100
  const mrp = variant.mrpCents ? variant.mrpCents / 100 : undefined
  const title = isZh && product.titleZh ? product.titleZh : product.titleEn
  const image = product.images?.[0] || ""

  const handleAdd = () => {
    onAddToCart({
      variantId: variant.id,
      productId: product.id,
      title,
      brand: product.brandName,
      packSize: variant.packSize,
      price,
      mrp,
      quantity: 1,
      image,
      originCountry: product.originCountry,
    })

    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  return (
    <div className="flex flex-col justify-between rounded-xl border border-border/80 bg-card p-2.5 sm:p-3 hover:border-primary/40 transition-colors shadow-2xs">
      <div className="space-y-2">
        {/* Thumbnail */}
        <Link
          href={`/products/${product.slug || product.id}`}
          className="relative block aspect-square w-full overflow-hidden rounded-lg border border-border/60 bg-white p-1 hover:opacity-90 transition-opacity"
        >
          {image && !imgError ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-contain p-1"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-bold text-muted-foreground">
              {product.brandName ? product.brandName.slice(0, 2).toUpperCase() : "HM"}
            </div>
          )}
        </Link>

        {/* Details */}
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block truncate">
            {product.brandName}
          </span>
          <Link
            href={`/products/${product.slug || product.id}`}
            className="font-heading text-xs font-bold text-foreground line-clamp-2 hover:text-primary transition-colors leading-snug"
          >
            {title}
          </Link>
          <p className="text-[10px] text-muted-foreground">{variant.packSize}</p>
        </div>
      </div>

      {/* Price & Add Action */}
      <div className="pt-2 flex items-center justify-between gap-1.5 border-t border-border/50 mt-2">
        <span className="font-mono text-xs sm:text-sm font-black text-primary">
          HK${price.toFixed(2)}
        </span>

        <Button
          size="sm"
          variant={justAdded ? "outline" : "default"}
          onClick={handleAdd}
          className={cn(
            "h-7 px-2.5 text-xs font-bold gap-1",
            justAdded && "border-success text-success bg-success/10"
          )}
        >
          {justAdded ? (
            <>
              <Check className="size-3" />
              <span>{isZh ? "已加" : "Added"}</span>
            </>
          ) : (
            <>
              <Plus className="size-3" />
              <span>{isZh ? "加購" : "Add"}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
