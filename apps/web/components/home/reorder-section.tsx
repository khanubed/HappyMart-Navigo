"use client"

import React from "react"
import { products } from "@workspace/mock-data"
import { useAppSelector } from "@/hooks/store"
import { BrowseCarousel, type BrowseCarouselItem } from "./browse-carousel"

// High-frequency staple grocery items for quick re-order ("Buy Again")
const REORDER_PRODUCT_IDS = [
  "prod-ig-basmati-5kg",
  "prod-aashirvaad-atta-10kg",
  "prod-shan-bombay-biryani",
  "prod-amul-ghee-1l",
  "prod-tata-toor-dal-1kg",
  "prod-mdh-deggi-mirch-100g",
  "prod-haldirams-bhujia-400g",
  "prod-tata-tea-gold-500g",
]

export function ReorderSection() {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const reorderProducts = REORDER_PRODUCT_IDS.map((id) =>
    products.find((p) => p.id === id)
  ).filter((p): p is (typeof products)[number] => Boolean(p))

  const displayProducts = reorderProducts.length > 0 ? reorderProducts : products.slice(0, 8)

  if (displayProducts.length === 0) {
    return null
  }

  const items: BrowseCarouselItem[] = displayProducts.map((product) => {
    const defaultVariant =
      product.variants.find((v) => v.isDefault) || product.variants[0]
    const price = (defaultVariant?.priceCents ?? 0) / 100
    const packSize = defaultVariant?.packSize

    return {
      id: product.id,
      href: `/p/${product.slug || product.id}`,
      title: isZh ? product.titleZh : product.titleEn,
      subtitle: packSize
        ? `HK$${price.toFixed(2)} • ${packSize}`
        : `HK$${price.toFixed(2)}`,
      imageUrl: product.images[0],
      fallbackChar: product.brandName?.charAt(0) || product.titleEn.charAt(0) || "P",
    }
  })

  return (
    <BrowseCarousel
      eyebrow={isZh ? "再次選購" : "PREVIOUSLY PURCHASED"}
      title={
        isZh ? (
          <>
            再次 <span className="text-primary italic font-serif">購買</span>。
          </>
        ) : (
          <>
            Buy <span className="text-primary italic font-serif">again</span>.
          </>
        )
      }
      viewAllHref="/orders"
      viewAllLabel={isZh ? "查看全部訂單" : "View Previous Orders"}
      items={items}
      imageFit="contain"
    />
  )
}
