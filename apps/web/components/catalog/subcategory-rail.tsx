"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { LayoutGrid } from "lucide-react"
import type { Subcategory } from "@workspace/typescript-config/types"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

export interface SubcategoryRailProps {
  subcategories: Subcategory[]
  activeSubcategorySlug?: string
  baseHref: string
  className?: string
}

export function SubcategoryRail({
  subcategories,
  activeSubcategorySlug,
  baseHref,
  className,
}: SubcategoryRailProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  if (!subcategories || subcategories.length === 0) return null

  return (
    <div className={cn("w-full", className)}>
      <div className="no-scrollbar flex items-stretch gap-2.5 overflow-x-auto pb-1 pt-0.5 sm:gap-3">
        {/* 'All' button tile */}
        <Link
          href={baseHref === "/products" ? "/categories" : baseHref}
          className={cn(
            "group flex min-w-[76px] sm:min-w-[88px] flex-col items-center rounded-xl border p-2 text-center transition-all shrink-0",
            !activeSubcategorySlug
              ? "border-primary bg-primary/5 text-primary shadow-2xs ring-1 ring-primary/20"
              : "border-border/80 bg-card hover:border-primary/40 hover:bg-muted/40 text-foreground"
          )}
        >
          <div className="flex size-11 sm:size-12 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground transition-transform group-hover:scale-105">
            <LayoutGrid className="size-5 text-primary" />
          </div>
          <span className="mt-1.5 block text-[11px] sm:text-xs font-semibold leading-tight line-clamp-1">
            {isZh ? "全館分類" : "All Categories"}
          </span>
        </Link>

        {/* Subcategory tiles */}
        {subcategories.map((sub) => {
          const isActive =
            activeSubcategorySlug === sub.slug || activeSubcategorySlug === sub.id
          const label = isZh ? sub.nameZh : sub.nameEn

          const targetHref =
            baseHref === "/products"
              ? `/categories/${sub.slug}`
              : baseHref.startsWith("/categories/")
              ? `${baseHref}/${sub.slug}`
              : `${baseHref}?sub=${sub.slug}`

          return (
            <Link
              key={sub.id}
              href={targetHref}
              className={cn(
                "group flex min-w-[88px] max-w-[120px] flex-col items-center rounded-xl border p-2 text-center transition-all shrink-0",
                isActive
                  ? "border-primary bg-primary/5 text-primary shadow-2xs ring-1 ring-primary/20"
                  : "border-border/80 bg-card hover:border-primary/40 hover:bg-muted/40 text-foreground"
              )}
            >
              <div className="relative size-11 sm:size-12 overflow-hidden rounded-lg border border-border/50 bg-muted/30 p-1 transition-transform group-hover:scale-105">
                <Image
                  src={sub.imageUrl || "/images/categories/snacks.png"}
                  alt={label}
                  fill
                  sizes="48px"
                  className="object-contain p-0.5"
                  unoptimized
                />
              </div>
              <span className="mt-1.5 block text-[11px] sm:text-xs font-semibold leading-tight line-clamp-2 w-full">
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
