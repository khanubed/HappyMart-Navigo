"use client"

import React from "react"
import { useAppSelector } from "@/hooks/store"

export interface CategoryHeadingProps {
  titleEn: string
  titleZh: string
  descriptionEn?: string
  descriptionZh?: string
  totalCount: number
  className?: string
}

export function CategoryHeading({
  titleEn,
  titleZh,
  descriptionEn,
  descriptionZh,
  totalCount,
  className,
}: CategoryHeadingProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const title = isZh ? titleZh : titleEn
  const description = isZh ? descriptionZh : descriptionEn

  return (
    <div className={`space-y-1.5 ${className || ""}`}>
      <div className="flex flex-wrap items-baseline gap-2.5">
        <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          {title}
        </h1>
        <span className="inline-flex items-center rounded-full border border-border/80 bg-muted/50 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
          {totalCount} {isZh ? "款精選商品" : "products"}
        </span>
      </div>

      {description && (
        <p className="max-w-3xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
