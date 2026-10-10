"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Award } from "lucide-react"
import { getFeaturedBrands } from "@workspace/mock-data"
import { useAppSelector } from "@/hooks/store"
import { SectionHeader } from "@/components/common/section-header"

function BrandLogo({
  name,
  logoUrl,
}: {
  name: string
  logoUrl?: string
}) {
  const [hasError, setHasError] = useState(false)

  if (!logoUrl || hasError) {
    return (
      <div className="flex size-20 sm:size-24 md:size-28 items-center justify-center rounded-full border border-border/80 bg-gradient-to-tr from-muted to-secondary/50 font-heading text-2xl sm:text-3xl font-black text-primary shadow-xs transition-transform duration-300 group-hover:scale-105">
        {name.charAt(0)}
      </div>
    )
  }

  return (
    <div className="relative flex size-20 sm:size-24 md:size-28 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-white dark:bg-card p-2 shadow-xs transition-transform duration-300 group-hover:scale-105">
      <Image
        src={logoUrl}
        alt={name}
        fill
        sizes="(max-width: 640px) 80px, 112px"
        className="object-contain p-2 sm:p-3"
        onError={() => setHasError(true)}
        unoptimized
      />
    </div>
  )
}

export function BrandCarousel() {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  return (
    <section className="max-w-8xl mx-auto space-y-4 sm:space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Brand Header */}
      <SectionHeader
        eyebrow={
          <span className="flex items-center gap-1.5 text-primary font-bold">
            <Award className="size-3.5" />
            <span>{isZh ? "信譽品牌" : "TRUSTED HERITAGE BRANDS"}</span>
          </span>
        }
        title={
          isZh ? (
            <>
              按 <span className="text-primary italic font-serif">知名品牌</span> 選購。
            </>
          ) : (
            <>
              Shop by <span className="text-primary italic font-serif">brand</span>.
            </>
          )
        }
        subtitle={
          isZh
            ? "匯聚數十個世代相傳的印巴南亞經典國民品牌"
            : "Directly imported certified household staples from origin master producers"
        }
        viewAllHref="/brands"
        viewAllLabel={isZh ? "全部品牌" : "All Brands"}
      />

      {/* Brand Cards Grid: 3 in a row on mobile */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
        {getFeaturedBrands(12).map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="group flex flex-col items-center justify-center p-2 sm:p-3 text-center transition-transform duration-200 hover:-translate-y-1"
          >
            <BrandLogo name={brand.name} logoUrl={brand.logoUrl} />

            <h3 className="mt-2 w-full truncate font-heading text-xs sm:text-sm font-bold text-foreground transition-colors group-hover:text-primary">
              {brand.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  )
}
