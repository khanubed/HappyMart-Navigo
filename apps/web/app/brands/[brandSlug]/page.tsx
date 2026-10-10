import React from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getBrandBySlug, getProductsByBrand } from "@workspace/mock-data"
import { StorefrontShell } from "@/components/layout/storefront-shell"
import { ProductListingView } from "@/components/catalog/product-listing-view"
import { BrandHeader } from "@/components/brands/brand-header"

interface BrandPageProps {
  params: Promise<{
    brandSlug: string
  }>
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { brandSlug } = await params
  const brand = getBrandBySlug(brandSlug)

  if (!brand) {
    return { title: "Brand Not Found | Happymart" }
  }

  const title = `Shop ${brand.name} Products | Happymart Hong Kong`
  const description =
    brand.descriptionEn ||
    `Shop authentic imported ${brand.name} groceries directly from ${brand.countryOfOrigin}. Fast delivery across Hong Kong.`

  return {
    title,
    description,
    alternates: {
      canonical: `/brands/${brand.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/brands/${brand.slug}`,
      type: "website",
      images: brand.logoUrl ? [{ url: brand.logoUrl, alt: brand.name }] : undefined,
    },
  }
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brandSlug } = await params
  const brand = getBrandBySlug(brandSlug)

  if (!brand) {
    notFound()
  }

  const initialProducts = getProductsByBrand(brand.slug)

  const breadcrumbs = [
    {
      labelEn: "Brands",
      labelZh: "品牌專區",
      href: "/brands",
    },
    {
      labelEn: brand.nameEn || brand.name,
      labelZh: brand.nameZh || brand.name,
      href: `/brands/${brand.slug}`,
    },
  ]

  // Structured Data (JSON-LD) for Brand & BreadcrumbList
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
          {
            "@type": "ListItem",
            position: 3,
            name: brand.name,
            item: `https://happymart.hk/brands/${brand.slug}`,
          },
        ],
      },
      {
        "@type": "Brand",
        name: brand.name,
        logo: brand.logoUrl,
        description: brand.descriptionEn,
        url: `https://happymart.hk/brands/${brand.slug}`,
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

      <ProductListingView
        titleEn={`${brand.name} Products`}
        titleZh={`${brand.name} 品牌專區`}
        descriptionEn={brand.descriptionEn}
        descriptionZh={brand.descriptionZh}
        breadcrumbs={breadcrumbs}
        baseHref={`/brands/${brand.slug}`}
        initialProducts={initialProducts}
        headerSlot={
          <BrandHeader
            brand={brand}
            productCount={initialProducts.length || (brand.productCount ?? 0)}
          />
        }
      />
    </StorefrontShell>
  )
}
