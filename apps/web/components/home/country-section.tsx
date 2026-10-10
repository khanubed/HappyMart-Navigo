"use client"

import React from "react"
import { countries } from "@workspace/mock-data"
import { useAppSelector } from "@/hooks/store"
import { BrowseCarousel, type BrowseCarouselItem } from "./browse-carousel"

export function CountrySection() {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const items: BrowseCarouselItem[] = countries.map((country) => ({
    id: country.id,
    href: `/countries/${country.code.toLowerCase()}`,
    title: isZh ? `${country.flag} ${country.nameZh}` : `${country.flag} ${country.nameEn}`,
    subtitle: `${country.productCount.toLocaleString()}+ ${isZh ? "款特產商品" : "items"}`,
    imageUrl: country.imageUrl,
    fallbackChar: country.code,
  }))

  const countryBreakpoints = {
    440: {
      slidesPerView: 2.5,
      spaceBetween: 14,
    },
    640: {
      slidesPerView: 3.5,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 4.5,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 5.2,
      spaceBetween: 18,
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
  }

  return (
    <BrowseCarousel
      eyebrow={isZh ? "探索原產地區" : "SOURCED ORIGIN REGIONS"}
      title={
        isZh ? (
          <>
            按 <span className="text-primary italic font-serif">原產國家</span> 選購。
          </>
        ) : (
          <>
            Shop by <span className="text-primary italic font-serif">country</span>.
          </>
        )
      }
      viewAllHref="/countries"
      viewAllLabel={
        isZh
          ? `查看全部 ${countries.length} 個國家`
          : `All ${countries.length} countries`
      }
      items={items}
      imageFit="cover"
      breakpoints={countryBreakpoints}
    />
  )
}
