"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Brand } from "@workspace/typescript-config/types"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

interface BrandCardProps {
  brand: Brand
  className?: string
}

export function BrandCard({ brand, className }: BrandCardProps) {
  const [hasError, setHasError] = useState(false)
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const displayName = isZh && brand.nameZh ? brand.nameZh : brand.name
  const productCount = brand.productCount ?? 0

  return (
    <Link
      href={`/brands/${brand.slug}`}
      className={cn(
        "group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-3 transition-all duration-200 hover:border-primary/60 hover:shadow-2xs",
        "h-[155px] sm:h-[165px]",
        className
      )}
      aria-label={`${displayName} - ${productCount} ${isZh ? "件商品" : "products"}`}
    >
      {/* Logo Container Area: ~105-115px high */}
      <div className="relative flex h-[100px] sm:h-[110px] w-full items-center justify-center rounded-xl bg-muted/30 p-2 transition-colors group-hover:bg-muted/50 dark:bg-muted/10">
        {!brand.logoUrl || hasError ? (
          <div className="flex size-14 items-center justify-center rounded-xl border border-border/80 bg-background font-heading text-xl font-black text-primary shadow-2xs transition-transform duration-200 group-hover:scale-105">
            {brand.name.charAt(0).toUpperCase()}
          </div>
        ) : (
          <div className="relative h-full w-full">
            <Image
              src={brand.logoUrl}
              alt={`${displayName} logo`}
              fill
              sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 180px"
              className="object-contain p-1.5 transition-transform duration-200 group-hover:scale-105"
              onError={() => setHasError(true)}
              unoptimized
            />
          </div>
        )}
      </div>

      {/* Brand Text Info Area */}
      <div className="mt-2 flex flex-col text-left">
        <span className="truncate text-xs sm:text-[13px] font-semibold text-foreground transition-colors group-hover:text-primary">
          {displayName}
        </span>
        <span className="text-[11px] text-muted-foreground">
          {isZh ? `${productCount} 件商品` : `${productCount} products`}
        </span>
      </div>
    </Link>
  )
}
