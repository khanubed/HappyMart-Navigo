"use client"

import React from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { useAppSelector } from "@/hooks/store"

export interface BreadcrumbItem {
  labelEn: string
  labelZh: string
  href?: string
}

export interface CategoryBreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function CategoryBreadcrumbs({
  items,
  className,
}: CategoryBreadcrumbsProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs text-muted-foreground ${className || ""}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <Home className="size-3.5 text-primary" />
            <span className="sr-only">Home</span>
            <span>{isZh ? "首頁" : "Home"}</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const label = isZh ? item.labelZh : item.labelEn

          return (
            <li key={item.href || index} className="flex items-center gap-1.5">
              <ChevronRight className="size-3 text-muted-foreground/60" />
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="font-medium text-foreground truncate max-w-[200px]"
                >
                  {label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground truncate max-w-[160px]"
                >
                  {label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
