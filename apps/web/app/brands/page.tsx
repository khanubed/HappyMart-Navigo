import React, { Suspense } from "react"
import type { Metadata } from "next"
import { getAllBrands } from "@workspace/mock-data"
import { StorefrontShell } from "@/components/layout/storefront-shell"
import { CategoryBreadcrumbs } from "@/components/catalog/category-breadcrumbs"
import { BrandDirectoryView } from "@/components/brands/brand-directory-view"

export const metadata: Metadata = {
  title: "Shop by Brand | Happymart Hong Kong",
  description:
    "Explore trusted authentic South Asian grocery brands in Hong Kong. Shop spices, basmati rice, tea, snacks, and Ayurvedic personal care from India, Pakistan, Bangladesh, Nepal, Sri Lanka, and UAE.",
  alternates: {
    canonical: "/brands",
  },
  openGraph: {
    title: "Shop by Brand | Happymart Supermarket HK",
    description:
      "Explore 45+ trusted authentic South Asian grocery brands imported directly to Hong Kong with territory-wide delivery.",
    url: "/brands",
    type: "website",
  },
}

function BrandDirectorySkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-border/70 pb-6">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded-lg bg-muted" />
          <div className="h-4 w-96 rounded bg-muted" />
        </div>
        <div className="h-10 w-full md:w-80 rounded-full bg-muted" />
      </div>

      <div className="h-12 w-full rounded-2xl bg-muted" />

      <div className="space-y-4">
        <div className="h-6 w-36 rounded bg-muted" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 sm:gap-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-[160px] rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function BrandsPage() {
  const allBrands = getAllBrands()

  const breadcrumbs = [
    {
      labelEn: "Brands",
      labelZh: "品牌專區",
      href: "/brands",
    },
  ]

  // Structured Data (JSON-LD) for CollectionPage & BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://happymart.hk",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Brands",
            item: "https://happymart.hk/brands",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Shop by Brand",
        description:
          "Directory of authentic South Asian grocery and household brands available on Happymart Hong Kong.",
        url: "https://happymart.hk/brands",
        numberOfItems: allBrands.length,
      },
    ],
  }

  return (
    <StorefrontShell>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-8xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 space-y-4">
        <CategoryBreadcrumbs items={breadcrumbs} />

        <Suspense fallback={<BrandDirectorySkeleton />}>
          <BrandDirectoryView initialBrands={allBrands} />
        </Suspense>
      </main>
    </StorefrontShell>
  )
}
