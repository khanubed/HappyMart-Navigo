"use client"

import React, { useState } from "react"
import Image from "next/image"
import type { Brand } from "@workspace/typescript-config/types"
import { useAppSelector } from "@/hooks/store"
import { ShieldCheck, MapPin } from "lucide-react"

interface BrandHeaderProps {
  brand: Brand
  productCount: number
}

export function BrandHeader({ brand, productCount }: BrandHeaderProps) {
  const [hasError, setHasError] = useState(false)
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const displayName = isZh && brand.nameZh ? brand.nameZh : brand.name
  const description =
    isZh && brand.descriptionZh
      ? brand.descriptionZh
      : brand.descriptionEn ||
        `Authentic ${brand.name} groceries from ${brand.countryOfOrigin}, guaranteed fresh with express delivery across Hong Kong.`

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-4 sm:p-6 md:flex-row md:items-center md:gap-6 shadow-2xs">
      {/* Brand Logo Container */}
      <div className="relative flex size-20 sm:size-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted/40 p-2 shadow-2xs">
        {!brand.logoUrl || hasError ? (
          <div className="flex size-full items-center justify-center font-heading text-2xl font-black text-primary">
            {brand.name.charAt(0).toUpperCase()}
          </div>
        ) : (
          <div className="relative size-full">
            <Image
              src={brand.logoUrl}
              alt={`${displayName} logo`}
              fill
              sizes="96px"
              className="object-contain p-1"
              onError={() => setHasError(true)}
              unoptimized
              priority
            />
          </div>
        )}
      </div>

      {/* Brand Info & Badges */}
      <div className="flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            {displayName}
          </h1>

          <div className="flex items-center gap-1.5">
            {/* Origin Country Badge */}
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
              <MapPin className="size-3 text-primary" />
              <span>{brand.countryOfOrigin}</span>
            </span>

            {/* Product Count Badge */}
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
              {productCount} {isZh ? "款精選商品" : "products"}
            </span>

            {/* Authenticity Badge */}
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">
              <ShieldCheck className="size-3" />
              <span>{isZh ? "官方授權正品" : "Authentic Origin"}</span>
            </span>
          </div>
        </div>

        <p className="max-w-3xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
