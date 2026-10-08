"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, Award } from "lucide-react"
import { brands } from "@workspace/mock-data"
import { useAppSelector } from "@/hooks/store"

export function BrandCarousel() {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  return (
    <section className="max-w-8xl mx-auto space-y-5 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
            <Award className="size-3.5" />
            <span>{isZh ? "信譽品牌" : "Trusted Heritage Brands"}</span>
          </div>
          <h2 className="font-heading text-xl font-extrabold text-foreground sm:text-2xl">
            {isZh ? "按知名品牌選購" : "Shop By Brand"}
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {isZh
              ? "匯聚數十個世代相傳的印巴南亞經典國民品牌"
              : "Directly imported certified household staples from origin master producers"}
          </p>
        </div>

        <Link
          href="/brands"
          className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
        >
          {isZh ? "全部品牌" : "All Brands"} <ArrowRight className="size-3" />
        </Link>
      </div>

      {/* Brand Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
        {brands.slice(0, 10).map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="group flex flex-col items-center justify-between rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary/50 hover:shadow-xs"
          >
            {/* Logo placeholder with brand initials */}
            <div className="mb-2 flex size-14 items-center justify-center rounded-full border border-border/80 bg-gradient-to-tr from-muted to-secondary/50 font-heading text-base font-black text-primary shadow-2xs transition-transform group-hover:scale-110">
              {brand.name.charAt(0)}
            </div>

            <div className="space-y-0.5">
              <h3 className="truncate font-heading text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                {brand.name}
              </h3>
              <p className="text-[10px] font-medium text-muted-foreground">
                {brand.countryOfOrigin} • {brand.productCount}+{" "}
                {isZh ? "款" : "SKUs"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
