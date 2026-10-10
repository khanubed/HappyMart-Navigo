import React from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  getProductBySlug,
  getProductById,
  getProductsByBrand,
  getProductsByCategory,
  getRelatedProducts,
  categories,
  parentCategories,
  getBrandBySlug,
} from "@workspace/mock-data"
import { StorefrontShell } from "@/components/layout/storefront-shell"
import { CategoryBreadcrumbs } from "@/components/catalog/category-breadcrumbs"
import { ProductDetailView } from "@/components/product/product-detail-view"

interface ProductPageRouteProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: ProductPageRouteProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug) || getProductById(slug)

  if (!product) {
    return { title: "Product Not Found | Happymart" }
  }

  const defaultVariant =
    product.variants.find((v) => v.isDefault) || product.variants[0]
  const packSize = defaultVariant?.packSize ? ` ${defaultVariant.packSize}` : ""
  const title = `${product.titleEn}${packSize} | Happymart Hong Kong`

  const description =
    product.descriptionEn ||
    `Buy authentic ${product.titleEn} by ${product.brandName} at Happymart Hong Kong. Direct import from ${product.originCountry} with express territory-wide delivery.`

  const imageUrl = product.images?.[0]

  return {
    title,
    description,
    alternates: {
      canonical: `/p/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/p/${product.slug}`,
      type: "website",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: product.titleEn,
            },
          ]
        : undefined,
    },
  }
}

export default async function ProductDetailPage({
  params,
}: ProductPageRouteProps) {
  const { slug } = await params
  const product = getProductBySlug(slug) || getProductById(slug)

  if (!product) {
    notFound()
  }

  const defaultVariant =
    product.variants.find((v) => v.isDefault) ||
    product.variants[0] || {
      id: `${product.id}-default`,
      productId: product.id,
      sku: product.id,
      packSize: "Standard",
      priceCents: 0,
      stockQuantity: 99,
    }

  const brand =
    getBrandBySlug(product.brandName) || getBrandBySlug(product.brandId)
  const brandSlug =
    brand?.slug ||
    product.brandSlug ||
    product.brandName.toLowerCase().replace(/[^a-z0-9]/g, "-")

  // Resolve Category hierarchy
  const category = categories.find(
    (c) => c.id === product.categoryId || c.slug === product.categoryId
  )
  const parent = parentCategories.find((p) => p.id === category?.parentId)
  const subcategory = categories.find(
    (s) => s.id === product.subcategoryId || s.slug === product.subcategoryId
  )

  // Specification 7.2.4: Home > Category > Sub-category > Product
  const mainCategory = parent || category
  const subCategoryItem = subcategory || (parent ? category : undefined)

  const breadcrumbs = [
    ...(mainCategory
      ? [
          {
            labelEn: mainCategory.nameEn,
            labelZh: mainCategory.nameZh,
            href: `/categories/${mainCategory.slug}`,
          },
        ]
      : []),
    ...(subCategoryItem && subCategoryItem.id !== mainCategory?.id
      ? [
          {
            labelEn: subCategoryItem.nameEn,
            labelZh: subCategoryItem.nameZh,
            href: `/categories/${mainCategory?.slug || "all"}/${subCategoryItem.slug}`,
          },
        ]
      : []),
    {
      labelEn: product.titleEn,
      labelZh: product.titleZh,
      href: `/p/${product.slug}`,
    },
  ]

  // Recommendations and Bundles
  const brandProducts = getProductsByBrand(brandSlug || product.brandName)
  const categoryProducts = getProductsByCategory(product.categoryId)
  const bundleProducts = getRelatedProducts(product.id, "bundle")

  // Specification 7.2.4 SEO: Product + Offer + AggregateRating (S) + BreadcrumbList schema
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
          ...breadcrumbs.map((b, idx) => ({
            "@type": "ListItem",
            position: idx + 2,
            name: b.labelEn,
            item: b.href ? `https://happymart.hk${b.href}` : undefined,
          })),
        ],
      },
      {
        "@type": "Product",
        name: product.titleEn,
        image: product.images,
        description: product.descriptionEn,
        sku: defaultVariant.sku || product.id,
        brand: {
          "@type": "Brand",
          name: product.brandName,
        },
        countryOfOrigin: {
          "@type": "Country",
          name: product.originCountry,
        },
        offers: {
          "@type": "Offer",
          url: `https://happymart.hk/p/${product.slug}`,
          priceCurrency: "HKD",
          price: (defaultVariant.priceCents / 100).toFixed(2),
          priceValidUntil: "2027-12-31",
          availability:
            defaultVariant.stockQuantity > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
        },
        ...(product.rating && product.reviewCount
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.reviewCount,
                bestRating: "5",
                worstRating: "1",
              },
            }
          : {}),
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

      <main className="max-w-8xl mx-auto space-y-6 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <CategoryBreadcrumbs items={breadcrumbs} />

        <ProductDetailView
          product={product}
          brandSlug={brandSlug}
          brandProducts={brandProducts}
          categoryProducts={categoryProducts}
          bundleProducts={bundleProducts}
        />
      </main>
    </StorefrontShell>
  )
}
