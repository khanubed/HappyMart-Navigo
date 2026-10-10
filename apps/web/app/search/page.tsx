import React from "react"
import type { Metadata } from "next"
import { products } from "@workspace/mock-data"
import { StorefrontShell } from "@/components/layout/storefront-shell"
import { ProductListingView } from "@/components/catalog/product-listing-view"

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams
  const query = q || ""

  return {
    title: query ? `Search: "${query}" | 搜尋結果 | Happymart` : "Search Catalog | Happymart",
    description: `Search South Asian grocery products in Hong Kong: ${query}`,
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = (q || "").trim().toLowerCase()

  const initialProducts = query
    ? products.filter((p) => {
        return (
          p.titleEn.toLowerCase().includes(query) ||
          p.titleZh.toLowerCase().includes(query) ||
          p.brandName.toLowerCase().includes(query) ||
          p.tags?.some((t) => t.toLowerCase().includes(query)) ||
          p.originCountry.toLowerCase().includes(query)
        )
      })
    : products

  const breadcrumbs = [
    {
      labelEn: "Search",
      labelZh: "商品搜尋",
      href: "/search",
    },
    ...(query
      ? [
          {
            labelEn: `"${query}"`,
            labelZh: `「${query}」`,
          },
        ]
      : []),
  ]

  const titleEn = query ? `Results for "${query}"` : "All Products"
  const titleZh = query ? `「${query}」的搜尋結果` : "全部商品目錄"

  return (
    <StorefrontShell>
      <ProductListingView
        titleEn={titleEn}
        titleZh={titleZh}
        descriptionEn={
          query
            ? `Showing matching South Asian groceries for "${query}" in Hong Kong.`
            : "Browse our complete catalog of authentic spices, basmati rice, lentils, and daily groceries."
        }
        descriptionZh={
          query
            ? `為您顯示在香港配送的「${query}」相關特色食材。`
            : "瀏覽我們完整的南亞香料、印度香米、全麥麵粉與日常食材目錄。"
        }
        breadcrumbs={breadcrumbs}
        baseHref="/search"
        initialProducts={initialProducts}
      />
    </StorefrontShell>
  )
}
