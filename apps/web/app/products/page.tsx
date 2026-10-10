import React, { Suspense } from "react"
import type { Metadata } from "next"
import { products, parentCategories } from "@workspace/mock-data"
import { StorefrontShell } from "@/components/layout/storefront-shell"
import { ProductListingView } from "@/components/catalog/product-listing-view"

export const metadata: Metadata = {
  title: "All Products | 全部商品庫 | Happymart Supermarket HK",
  description:
    "Browse our complete South Asian grocery catalog in Hong Kong. Authentic basmati rice, atta flour, lentils, spices, snacks, beverages, wellness, baby care, and home care delivered next-day.",
}

export default function AllProductsPage() {
  const breadcrumbs = [
    {
      labelEn: "All Products",
      labelZh: "全部商品庫",
      href: "/products",
    },
  ]

  return (
    <StorefrontShell>
      <Suspense fallback={<div className="min-h-screen animate-pulse bg-muted/20" />}>
        <ProductListingView
          titleEn="All Products"
          titleZh="全部商品庫"
          descriptionEn="Browse our complete collection of authentic South Asian groceries, pantry staples, fresh dairy, spices, and personal care across all departments."
          descriptionZh="探索香港最齊全的南亞正宗食材庫，包括各類頂級印度香米、全麥麵粉、香料、零食及個人護理用品，全港快速送貨。"
          breadcrumbs={breadcrumbs}
          subcategories={parentCategories}
          baseHref="/products"
          initialProducts={products}
        />
      </Suspense>
    </StorefrontShell>
  )
}
