"use client"

import React, { useState } from "react"
import { Header } from "@/components/layout/header"
import { MegaMenu } from "@/components/layout/mega-menu"
import { Footer } from "@/components/layout/footer"
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"
import { MobileDrawer } from "@/components/layout/mobile-drawer"
import { CartDrawer } from "@/components/commerce/cart-drawer"
import { AnnouncementBar } from "@/components/common/announcement-bar"
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
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors selection:bg-primary/20">
      {/* 1. Global Announcement Bar (32-40px height) */}
      <AnnouncementBar
        id="hk-free-delivery-500"
        message={
          isZh
            ? "全港配送：買滿 HK$500 享免費送貨到府！2026 齋戒月及排燈節各國食材專區熱賣中"
            : "Hong Kong Wide Delivery: FREE shipping on orders over HK$500! Ramadan & Festive Essentials now in stock."
        }
        actionLabel={isZh ? "立即查看" : "Shop Deals"}
        className="h-10 text-xs"
      />

      {/* 2. Sticky Supermarket Header */}
      <Header />

      {/* 3. Image-Supported Mega Menu Navigation */}
      <MegaMenu />

      {/* Main Content Sections Container (1280px max width) */}
      <main className="flex-1 w-full space-y-2 sm:space-y-4">
        {/* 4. Hero Section (70% Main Banner + 30% Side Campaign Cards) */}
        <HeroSection />

        {/* 5. Trust Strip (4 supermarket confidence cards) */}
        <TrustStrip />

        {/* 6. Shop By Country (6 origin regions: India, Pakistan, Bangladesh, Nepal, Sri Lanka, UAE) */}
        <CountrySection />

        {/* 7. Shop By Category (Image-first dense aisle grid) */}
        <CategoryGrid />

        {/* 8. Reorder Section ("Buy Again" for frequent shoppers) */}
        <ReorderSection />

        {/* 9. Popular Products (12 top staples horizontal rail) */}
        <ProductRail
          title={isZh ? "熱門暢銷日常必備" : "Popular Household Staples"}
          subtitle={
            isZh
              ? "備受香港南亞家庭與本地顧客喜愛的高回購率商品"
              : "Most purchased authentic spices, basmati rice, atta, and daily staples"
          }
          badgeText={isZh ? "熱銷榜單" : "Top 12 Most Loved"}
          products={popularProducts}
          viewAllHref="/catalog/popular"
          quantities={quantities}
          wishlist={wishlist}
          onQuantityChange={handleQuantityChange}
          onWishlistToggle={handleWishlistToggle}
        />

        {/* 10. Shop By Brand (Heritage brand carousel) */}
        <BrandCarousel />

        {/* 11. Festival Collections (Ramadan, Pakistan, Indian Pantry, Chai) */}
        <FestivalCollections
          quantities={quantities}
          wishlist={wishlist}
          onQuantityChange={handleQuantityChange}
          onWishlistToggle={handleWishlistToggle}
        />

        {/* 12. New Arrivals (Newly landed shipments rail) */}
        <ProductRail
          title={isZh ? "最新抵港食材與零食" : "New Arrivals & Fresh Shipments"}
          subtitle={
            isZh
              ? "本週新到貨的尼泊爾泡麵、阿聯酋椰棗、斯里蘭卡錫蘭茶及特色即食餐包"
              : "Fresh imports just landed in our Hong Kong warehouse from master producers"
          }
          badgeText={isZh ? "新品上架" : "Just Landed in HK"}
          products={newArrivals}
          viewAllHref="/catalog/new"
          quantities={quantities}
          wishlist={wishlist}
          onQuantityChange={handleQuantityChange}
          onWishlistToggle={handleWishlistToggle}
        />

        {/* 13. Recommended For You / Best Sellers */}
        <ProductRail
          title={isZh ? "為您推薦精選" : "Recommended For You"}
          subtitle={
            isZh
              ? "根據熱門烹飪搭配與顧客評價精心推薦的高分好物"
              : "Top-rated South Asian ingredients based on community reviews and seasonal cooking"
          }
          badgeText={isZh ? "嚴選推薦" : "Chef & Family Choice"}
          products={recommendations}
          viewAllHref="/catalog/recommended"
          quantities={quantities}
          wishlist={wishlist}
          onQuantityChange={handleQuantityChange}
          onWishlistToggle={handleWishlistToggle}
        />

        {/* 14. WhatsApp Support + Newsletter Signup Section */}
        <NewsletterWhatsapp />
      </main>

      {/* 15. Comprehensive Supermarket Footer */}
      <Footer />

      {/* Mobile Overlays & Navigation */}
      <MobileBottomNav />
      <MobileDrawer />
      <CartDrawer />
    </div>
  )
}
