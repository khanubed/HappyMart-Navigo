"use client"

import React, { useState } from "react"
import { HeroSection } from "@/components/home/hero-section"
import { TrustStrip } from "@/components/home/trust-strip"
import { CountrySection } from "@/components/home/country-section"
import { CategoryGrid } from "@/components/home/category-grid"
import { ReorderSection } from "@/components/home/reorder-section"
import { ProductRail } from "@/components/home/product-rail"
import { BrandCarousel } from "@/components/home/brand-carousel"
import { FestivalCollections } from "@/components/home/festival-collections"
import { NewsletterWhatsapp } from "@/components/home/newsletter-whatsapp"
import {
  popularProducts,
  newArrivals,
  recommendations,
} from "@workspace/mock-data"
import { useAppSelector } from "@/hooks/store"

export default function HomePage() {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({})

  const handleQuantityChange = (productId: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: qty }))
  }

  const handleWishlistToggle = (productId: string) => {
    setWishlist((prev) => ({ ...prev, [productId]: !prev[productId] }))
  }

  return (
    <div className="w-full space-y-2 sm:space-y-4">
      {/* 4. Hero Section (70% Main Banner + 30% Side Campaign Cards) */}
      <HeroSection />

      {/* 7. Shop By Category (Image-first dense aisle grid) */}
      <CategoryGrid />

      {/* 5. Trust Strip (4 supermarket confidence cards) */}
      <TrustStrip />

      {/* 11. Buy Again (Previously Purchased row) */}
      <ReorderSection />

      {/* 9. Shop By Brand (Heritage brand carousel) */}
      <BrandCarousel />

      {/* 8. Popular Products (12 top staples horizontal rail) */}
      <ProductRail
        title={
          isZh ? (
            <>
              熱門暢銷 <span className="text-primary italic font-serif">日常必備</span>。
            </>
          ) : (
            <>
              Popular household <span className="text-primary italic font-serif">staples</span>.
            </>
          )
        }
        subtitle={
          isZh
            ? "備受香港南亞家庭與本地顧客喜愛的高回購率商品"
            : "Most purchased authentic spices, basmati rice, atta, and daily staples"
        }
        badgeText={isZh ? "熱銷榜單" : "TOP 12 MOST LOVED"}
        products={popularProducts}
        viewAllHref="/catalog/popular"
        quantities={quantities}
        wishlist={wishlist}
        onQuantityChange={handleQuantityChange}
        onWishlistToggle={handleWishlistToggle}
      />

      {/* 10. Festival Collections (Ramadan, Pakistan, Indian Pantry, Chai) */}
      <FestivalCollections
        quantities={quantities}
        wishlist={wishlist}
        onQuantityChange={handleQuantityChange}
        onWishlistToggle={handleWishlistToggle}
      />

      {/* 12. New Arrivals (Newly landed shipments rail) */}
      <ProductRail
        title={
          isZh ? (
            <>
              最新抵港 <span className="text-primary italic font-serif">特色食材</span>。
            </>
          ) : (
            <>
              Fresh imports & <span className="text-primary italic font-serif">new arrivals</span>.
            </>
          )
        }
        subtitle={
          isZh
            ? "本週新到貨的尼泊爾泡麵、阿聯酋椰棗、斯里蘭卡錫蘭茶及特色即食餐包"
            : "Fresh imports just landed in our Hong Kong warehouse from master producers"
        }
        badgeText={isZh ? "新品上架" : "JUST LANDED IN HK"}
        products={newArrivals}
        viewAllHref="/catalog/new"
        quantities={quantities}
        wishlist={wishlist}
        onQuantityChange={handleQuantityChange}
        onWishlistToggle={handleWishlistToggle}
      />

      {/* 13. Recommended For You / Best Sellers */}
      <ProductRail
        title={
          isZh ? (
            <>
              為您推薦 <span className="text-primary italic font-serif">嚴選好物</span>。
            </>
          ) : (
            <>
              Recommended for <span className="text-primary italic font-serif">you</span>.
            </>
          )
        }
        subtitle={
          isZh
            ? "根據熱門烹飪搭配與顧客評價精心推薦的高分好物"
            : "Top-rated South Asian ingredients based on community reviews and seasonal cooking"
        }
        badgeText={isZh ? "嚴選推薦" : "CHEF & FAMILY CHOICE"}
        products={recommendations}
        viewAllHref="/catalog/recommended"
        quantities={quantities}
        wishlist={wishlist}
        onQuantityChange={handleQuantityChange}
        onWishlistToggle={handleWishlistToggle}
      />

      {/* 6. Shop By Country (6 origin regions: India, Pakistan, Bangladesh, Nepal, Sri Lanka, UAE) */}
      <CountrySection />

      {/* 14. WhatsApp Support + Newsletter Signup Section */}
      <NewsletterWhatsapp />
    </div>
  )
}
