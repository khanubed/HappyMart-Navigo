"use client"

import React from "react"
import { parentCategories } from "@workspace/mock-data"
import { useAppSelector } from "@/hooks/store"
import { BrowseCarousel, type BrowseCarouselItem } from "./browse-carousel"

export function CategoryGrid() {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const items: BrowseCarouselItem[] = parentCategories.map((cat) => ({
    id: cat.id,
    href: `/categories/${cat.slug}`,
    title: isZh ? cat.nameZh : cat.nameEn,
    subtitle: `${cat.subcategories?.length ?? 4}+ ${isZh ? "種品類" : "items"}`,
    imageUrl: cat.imageUrl || "/images/categories/rice-grains.png",
    fallbackChar: cat.nameEn.charAt(0),
  }))

  const categoryBreakpoints = {
    360: {
      slidesPerView: 3.5,
      spaceBetween: 10,
    },
    420: {
      slidesPerView: 3.8,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 4.5,
      spaceBetween: 12,
    },
    640: {
      slidesPerView: 5.5,
      spaceBetween: 14,
    },
    768: {
      slidesPerView: 6.5,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 7.5,
      spaceBetween: 18,
    },
    1280: {
      slidesPerView: 8.2,
      spaceBetween: 18,
    },
  }

  return (
    <BrowseCarousel
      eyebrow={isZh ? "探索南亞市集" : "BROWSE THE MARKETPLACE"}
      title={
        isZh ? (
          <>
            按 <span className="text-primary italic font-serif">商品分類</span> 選購。
          </>
        ) : (
          <>
            Shop by <span className="text-primary italic font-serif">category</span>.
          </>
        )
      }
      viewAllHref="/departments"
      viewAllLabel={
        isZh
          ? `查看全部 ${parentCategories.length} 個專區`
          : `All ${parentCategories.length} departments`
      }
      items={items}
      imageFit="cover"
      slidesPerView={3.4}
      spaceBetween={10}
      breakpoints={categoryBreakpoints}
    />
  )
}
