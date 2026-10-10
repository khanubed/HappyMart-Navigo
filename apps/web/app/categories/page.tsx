import React from "react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { parentCategories } from "@workspace/mock-data"
import { StorefrontShell } from "@/components/layout/storefront-shell"
import { CategoryBreadcrumbs } from "@/components/catalog/category-breadcrumbs"
import { CategorySeoContent } from "@/components/catalog/category-seo-content"

export const metadata: Metadata = {
  title: "All Categories & Departments | 探索全館分類 | Happymart",
  description: "Browse authentic South Asian grocery departments: Food & Beverages, Spices, Staples, Wellness, Baby Care, and Home Care in Hong Kong.",
}

export default function AllCategoriesPage() {
  const breadcrumbs = [
    {
      labelEn: "All Departments & Categories",
      labelZh: "全館專區分類",
      href: "/categories",
    },
  ]

  return (
    <StorefrontShell>
      <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
        <CategoryBreadcrumbs items={breadcrumbs} />

        {/* Heading */}
        <div className="space-y-1.5 border-b border-border/80 pb-5">
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            All Departments & Categories / 全館分類專區
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            Explore authentic Indian, Pakistani, Bangladeshi, Nepali and Sri Lankan groceries delivered straight to Hong Kong homes.
          </p>
        </div>

        {/* Category Departments Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {parentCategories.map((dept) => (
            <div
              key={dept.id}
              className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-2xs transition-all hover:border-primary/40"
            >
              <div className="space-y-4">
                {/* Department Header */}
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted/30 p-1">
                      <Image
                        src={dept.imageUrl || "/images/categories/rice-grains.png"}
                        alt={dept.nameEn}
                        fill
                        sizes="40px"
                        className="object-contain p-0.5"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h2 className="font-heading text-base font-bold text-foreground">
                        {dept.nameEn}
                      </h2>
                      <p className="text-xs text-muted-foreground font-medium">
                        {dept.nameZh}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/categories/${dept.slug}`}
                    className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    <span>View All</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>

                {/* Subcategories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(dept.subcategories || []).map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/categories/${dept.slug}/${sub.slug}`}
                      className="group flex items-center gap-2 rounded-lg border border-border/40 bg-muted/20 p-2 transition-colors hover:border-primary/40 hover:bg-muted"
                    >
                      <div className="relative size-8 shrink-0 overflow-hidden rounded-md border border-border/50 bg-background p-0.5 transition-transform group-hover:scale-105">
                        <Image
                          src={sub.imageUrl || "/images/categories/snacks.png"}
                          alt={sub.nameEn}
                          fill
                          sizes="32px"
                          className="object-contain p-0.5"
                          unoptimized
                        />
                      </div>
                      <span className="truncate text-xs font-semibold text-foreground/90 transition-colors group-hover:text-primary">
                        {sub.nameEn}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Department Footer CTA */}
              <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                <span>{dept.subcategories?.length ?? 0} subcategories</span>
                <Link
                  href={`/categories/${dept.slug}`}
                  className="font-bold text-primary hover:underline"
                >
                  Shop {dept.nameEn} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* SEO Editorial Content & FAQs */}
        <CategorySeoContent categorySlug="food-beverages" />
      </div>
    </StorefrontShell>
  )
}
