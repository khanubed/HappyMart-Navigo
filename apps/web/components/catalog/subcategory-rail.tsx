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
      <div className="no-scrollbar flex items-start gap-4 overflow-x-auto pb-2 pt-1 sm:gap-5">
        {/* 'All' button tile */}
        <Link
          href={baseHref === "/products" ? "/categories" : baseHref}
          className="group flex min-w-[72px] sm:min-w-[80px] max-w-[96px] flex-col items-center text-center shrink-0 cursor-pointer py-1"
        >
          <div className="relative flex size-14 sm:size-16 items-center justify-center overflow-hidden rounded-2xl bg-muted/50 text-foreground shrink-0 border border-border/50">
            <LayoutGrid className="size-6 text-foreground/80" />
          </div>
          <span
            className={cn(
              "mt-2 block text-[11px] sm:text-xs font-semibold leading-tight line-clamp-2 w-full transition-colors",
              !activeSubcategorySlug
                ? "font-bold text-primary underline underline-offset-4 decoration-2 decoration-primary"
                : "text-foreground group-hover:underline group-hover:underline-offset-4"
            )}
          >
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
              className="group flex min-w-[72px] sm:min-w-[80px] max-w-[96px] flex-col items-center text-center shrink-0 cursor-pointer py-1"
            >
              <div className="relative size-14 sm:size-16 overflow-hidden rounded-2xl bg-muted/40 shrink-0 border border-border/50">
                <Image
                  src={sub.imageUrl || "/images/categories/snacks.png"}
                  alt={label}
                  fill
                  sizes="64px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span
                className={cn(
                  "mt-2 block text-[11px] sm:text-xs font-semibold leading-tight line-clamp-2 w-full transition-colors",
                  isActive
                    ? "font-bold text-primary underline underline-offset-4 decoration-2 decoration-primary"
                    : "text-foreground group-hover:underline group-hover:underline-offset-4"
                )}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
