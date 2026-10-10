import React from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  categories,
  parentCategories,
  getProductsByCategory,
} from "@workspace/mock-data"
import { StorefrontShell } from "@/components/layout/storefront-shell"
import { ProductListingView } from "@/components/catalog/product-listing-view"

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string
  }>
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params
  const category =
    parentCategories.find((p) => p.slug === categorySlug) ||
    categories.find((c) => c.slug === categorySlug)

  if (!category) {
    return { title: "Category Not Found | Happymart" }
  }

  return {
    title: `${category.nameEn} | ${category.nameZh} | Happymart`,
    description: `Shop authentic ${category.nameEn} groceries in Hong Kong with fast home delivery.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params

  // Check parent department or category
  const department = parentCategories.find((p) => p.slug === categorySlug)
  const category = department || categories.find((c) => c.slug === categorySlug)

  if (!category) {
    notFound()
  }

  const initialProducts = getProductsByCategory(categorySlug)

  const breadcrumbs = [
    {
      labelEn: "Categories",
      labelZh: "商品分類",
      href: "/categories",
    },
    {
      labelEn: category.nameEn,
      labelZh: category.nameZh,
      href: `/categories/${categorySlug}`,
    },
  ]

  return (
    <StorefrontShell>
      <ProductListingView
        titleEn={category.nameEn}
        titleZh={category.nameZh}
        descriptionEn={department?.descriptionEn}
        descriptionZh={department?.descriptionZh}
        breadcrumbs={breadcrumbs}
        subcategories={category.subcategories}
        baseHref={`/categories/${categorySlug}`}
        initialProducts={initialProducts}
      />
    </StorefrontShell>
  )
}
