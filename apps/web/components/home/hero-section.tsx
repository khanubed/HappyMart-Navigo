"use client"

import React from "react"
import { heroMainBanners, heroSideBanners } from "@workspace/mock-data"
import { HeroCarousel } from "@/components/commerce/hero-carousel"

export function HeroSection() {
  // Combine all active supermarket campaign banners into the full-width Swiper
  const campaigns = [...heroMainBanners, ...heroSideBanners]

  return (
    <section className="w-full">
      <HeroCarousel
        banners={campaigns}
        fullWidth={true}
        autoplayDelay={5500}
      />
    </section>
  )
}
