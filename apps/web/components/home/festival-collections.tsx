"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, Flame } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { festivalCollections, products } from "@workspace/mock-data"
import { ProductCard } from "@/components/commerce/product-card"
import { useAppSelector } from "@/hooks/store"
import { SectionHeader } from "@/components/common/section-header"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper/modules"

import "swiper/css"
import "swiper/css/free-mode"

export interface FestivalCollectionsProps {
  quantities?: Record<string, number>
  wishlist?: Record<string, boolean>
  onQuantityChange?: (productId: string, qty: number) => void
  onWishlistToggle?: (productId: string) => void
}

// Helper to apply the signature italic font-serif typography accent to headings
function renderStyledTitle(title: string, isZh: boolean) {
  if (isZh) {
    if (title.length > 2) {
      const prefix = title.slice(0, -2)
      const highlight = title.slice(-2)
      return (
        <>
          {prefix} <span className="text-primary italic font-serif">{highlight}</span>
        </>
      )
    }
    return title
  }

  const words = title.split(" ")
  if (words.length > 1) {
    const lastWord = words.pop()
    return (
      <>
        {words.join(" ")} <span className="text-primary italic font-serif">{lastWord}</span>
      </>
    )
  }
  return title
}

export function FestivalCollections({
  quantities = {},
  wishlist = {},
  onQuantityChange,
  onWishlistToggle,
}: FestivalCollectionsProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  // Show 2 highlighted collections on homepage
  const activeCollections = festivalCollections.slice(0, 2)

  return (
    <section className="max-w-8xl mx-auto space-y-6 sm:space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Main SectionHeader */}
      <SectionHeader
        eyebrow={
          <span className="flex items-center gap-1.5 text-accent font-bold">
            <Flame className="size-3.5 fill-current" />
            <span>{isZh ? "節慶與主題專區" : "SEASONAL & FESTIVE CURATIONS"}</span>
          </span>
        }
        title={
          isZh ? (
            <>
              主題節慶 <span className="text-primary italic font-serif">食材特輯</span>。
            </>
          ) : (
            <>
              Featured festival <span className="text-primary italic font-serif">collections</span>.
            </>
          )
        }
        subtitle={
          isZh
            ? "為特別節日與日常盛宴精心挑選的正宗食材組合"
            : "Hand-selected bundles and staples for cultural celebrations across Hong Kong"
        }
        viewAllHref="/collections"
        viewAllLabel={isZh ? "查看全部特輯" : "View All Collections"}
      />

      <div className="space-y-10">
        {activeCollections.map((col, idx) => {
          const colProducts = products.filter((p) =>
            col.productIds.includes(p.id)
          )

          return (
            <div
              key={col.id}
              className="space-y-6 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-xs sm:p-8"
            >
              {/* Collection Header Banner Strip */}
              <div
                className={`flex flex-col items-start justify-between gap-4 rounded-xl border border-border/80 p-6 sm:flex-row sm:items-center sm:p-8 ${
                  idx === 0
                    ? "bg-gradient-to-r from-accent/20 via-background to-secondary"
                    : "bg-gradient-to-r from-primary/15 via-background to-secondary"
                }`}
              >
                <SectionHeader
                  headingLevel="h3"
                  className="max-w-xl"
                  eyebrow={
                    <span className="text-primary font-bold">
                      {isZh ? col.badgeZh : col.badgeEn}
                    </span>
                  }
                  title={renderStyledTitle(isZh ? col.titleZh : col.titleEn, isZh)}
                  subtitle={isZh ? col.subtitleZh : col.subtitleEn}
                />

                <Link href={`/collections/${col.slug}`} className="shrink-0">
                  <Button className="gap-2 rounded-xl font-bold shadow-xs">
                    {isZh ? "選購全系列" : "Shop Collection"}
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>

              {/* Mobile: Swipable Product Row (2.15 cards in view) */}
              <div className="sm:hidden -mx-6 px-6">
                <Swiper
                  modules={[FreeMode]}
                  freeMode={{
                    enabled: true,
                    sticky: false,
                    momentum: true,
                    momentumRatio: 0.8,
                    momentumBounce: true,
                  }}
                  grabCursor={true}
                  allowTouchMove={true}
                  touchEventsTarget="container"
                  touchRatio={1}
                  touchAngle={45}
                  resistance={true}
                  resistanceRatio={0.85}
                  watchSlidesProgress={true}
                  spaceBetween={10}
                  slidesPerView={2.15}
                  className="w-full !py-1"
                >
                  {colProducts.map((product) => (
                    <SwiperSlide key={product.id} className="!h-auto flex">
                      <ProductCard
                        product={product}
                        quantity={quantities[product.id] ?? 0}
                        isWishlisted={wishlist[product.id] ?? false}
                        onQuantityChange={(qty) =>
                          onQuantityChange?.(product.id, qty)
                        }
                        onWishlistToggle={() => onWishlistToggle?.(product.id)}
                        className="h-full w-full"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Desktop: Grid */}
              <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {colProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={quantities[product.id] ?? 0}
                    isWishlisted={wishlist[product.id] ?? false}
                    onQuantityChange={(qty) =>
                      onQuantityChange?.(product.id, qty)
                    }
                    onWishlistToggle={() => onWishlistToggle?.(product.id)}
                    className="h-full"
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
