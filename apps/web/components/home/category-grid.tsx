"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, LayoutGrid } from "lucide-react"
import { categories } from "@workspace/mock-data"
import { useAppSelector } from "@/hooks/store"

export function CategoryGrid() {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  return (
    <section className="max-w-8xl mx-auto space-y-5 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
            <LayoutGrid className="size-3.5" />
            <span>{isZh ? "分類導航" : "Supermarket Aisles"}</span>
          </div>
          <h2 className="font-heading text-xl font-extrabold text-foreground sm:text-2xl">
            {isZh ? "按商品分類選購" : "Shop By Category"}
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {isZh
              ? "清晰分類，輕鬆兩步找到您需要的正宗食材"
              : "Dense, image-first categorization for effortless discovery"}
          </p>
        </div>

        <Link
          href="/categories"
          className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
        >
          {isZh ? "全部類別" : "All Aisles"} <ArrowRight className="size-3" />
        </Link>
      </div>

      {/* Grid: 3 mobile, 4 tablet, 6 desktop */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group flex flex-col items-center rounded-2xl border border-border bg-card p-3 text-center transition-all hover:border-primary/50 hover:shadow-xs"
          >
            {/* Visual Icon / Tile */}
            <div className="mb-2 flex size-16 items-center justify-center rounded-xl border border-border/50 bg-gradient-to-br from-muted/80 to-secondary/40 p-2 transition-transform group-hover:scale-105 sm:size-20">
              <span className="font-heading text-xl font-black text-primary/80 select-none">
                {category.nameEn.charAt(0)}
              </span>
            </div>

            <h3 className="line-clamp-1 font-heading text-xs font-bold text-foreground transition-colors group-hover:text-primary sm:text-sm">
              {isZh ? category.nameZh : category.nameEn}
            </h3>

            <span className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">
              {category.subcategories?.length ?? 4}+ {isZh ? "種品類" : "items"}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
