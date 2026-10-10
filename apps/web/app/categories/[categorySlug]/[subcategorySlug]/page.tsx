import React from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  categories,
  parentCategories,
  subcategories,
  getProductsBySubcategory,
} from "@workspace/mock-data"
import { StorefrontShell } from "@/components/layout/storefront-shell"
import { ProductListingView } from "@/components/catalog/product-listing-view"

interface SubcategoryPageProps {
  params: Promise<{
    categorySlug: string
    subcategorySlug: string
  }>
}

export async function generateMetadata({
  params,
}: SubcategoryPageProps): Promise<Metadata> {
  const { categorySlug, subcategorySlug } = await params
  const category =
    parentCategories.find((p) => p.slug === categorySlug) ||
    categories.find((c) => c.slug === categorySlug)
  const subcategory = subcategories.find((s) => s.slug === subcategorySlug)

  if (!subcategory) {
    return { title: "Subcategory Not Found | Happymart" }
  }

  const catName = category ? ` - ${category.nameEn}` : ""
  return {
    title: `${subcategory.nameEn}${catName} | ${subcategory.nameZh} | Happymart`,
    description: `Shop authentic ${subcategory.nameEn} groceries in Hong Kong with fast home delivery.`,
  }
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { categorySlug, subcategorySlug } = await params

  const category =
    parentCategories.find((p) => p.slug === categorySlug) ||
    categories.find((c) => c.slug === categorySlug)
  const subcategory = subcategories.find((s) => s.slug === subcategorySlug)

  if (!subcategory) {
    notFound()
  }

  const initialProducts = getProductsBySubcategory(subcategory.slug)

  const breadcrumbs = [
    {
      labelEn: "Categories",
      labelZh: "商品分類",
      href: "/categories",
    },
  ]

  if (category) {
    breadcrumbs.push({
      labelEn: category.nameEn,
      labelZh: category.nameZh,
      href: `/categories/${categorySlug}`,
    })
  }

  breadcrumbs.push({
    labelEn: subcategory.nameEn,
    labelZh: subcategory.nameZh,
    href: `/categories/${categorySlug}/${subcategorySlug}`,
  })

  return (
    <StorefrontShell>
      <ProductListingView
        titleEn={subcategory.nameEn}
        titleZh={subcategory.nameZh}
        descriptionEn={`Authentic ${subcategory.nameEn} imported directly to Hong Kong homes.`}
        descriptionZh={`由精選原產地空運與海運直達香港，確保新鮮正宗與品質承諾。`}
        breadcrumbs={breadcrumbs}
        subcategories={category?.subcategories}
        activeSubcategorySlug={subcategory.slug}
        baseHref={`/categories/${categorySlug}`}
        initialProducts={initialProducts}
      />
    </StorefrontShell>
  )
}
