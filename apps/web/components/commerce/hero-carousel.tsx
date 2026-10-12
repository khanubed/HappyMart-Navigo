"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import type { Swiper as SwiperCore } from "swiper"
import { buttonVariants } from "@workspace/ui/components/button"
import type { Banner } from "@workspace/typescript-config/types"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

// Swiper core & fade styles
import "swiper/css"
import "swiper/css/effect-fade"

export interface HeroCarouselProps {
  banners: Banner[]
  autoplayDelay?: number
  className?: string
  fullWidth?: boolean
}

interface BannerSlideProps {
  banner: Banner
  isPriority: boolean
  isZh: boolean
}

function BannerSlideContent({ banner, isPriority, isZh }: BannerSlideProps) {
  const title = isZh ? banner.titleZh : banner.titleEn
  const subtitle = isZh ? banner.subtitleZh : banner.subtitleEn
  const eyebrow = isZh
    ? banner.badgeZh || banner.offerText
    : banner.badgeEn || banner.offerText
  const ctaLabel = isZh ? banner.ctaLabelZh : banner.ctaLabelEn

  return (
    <div className="relative flex h-full w-full items-center overflow-hidden">
      {/* Campaign Photography */}
      {banner.imageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={banner.imageUrl}
            alt={title}
            fill
            priority={isPriority}
            loading={isPriority ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1440px"
            className="object-cover object-right md:object-right-center"
          />
        </div>
      )}

      {/* Opacity Black Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-1 bg-black/55"
      />

      {/* Slide Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-8xl flex-col justify-center px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="max-w-xl space-y-1.5 sm:space-y-2">
          {/* Eyebrow with decorative rule (inspired by section-header) */}
          {eyebrow && (
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-accent">
              <span>{eyebrow}</span>
              <span className="h-px w-8 bg-white/40" />
            </div>
          )}

          {/* Main Title (inspired by section-header) */}
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            {title}
          </h2>

          {/* Subtitle (inspired by section-header) */}
          {subtitle && (
            <p className="max-w-lg text-xs sm:text-sm text-white/85 leading-relaxed line-clamp-2">
              {subtitle}
            </p>
          )}

          <div className="pt-2 sm:pt-3">
            <Link
              href={banner.ctaUrl || "/collections"}
              className={cn(
                buttonVariants({ size: "sm" }),
                "h-8 sm:h-9 gap-1.5 rounded-lg px-4 text-xs sm:text-sm font-bold shadow-sm transition-all"
              )}
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroCarousel({
  banners,
  autoplayDelay = 5500,
  className,
  fullWidth = true,
}: HeroCarouselProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  if (!banners || banners.length === 0) return null

  const hasMultiple = banners.length > 1
  const heightClass = "h-[250px] sm:h-[280px] lg:h-[305px]"

  // Single Banner Variant: Clean presentation without Swiper overhead
  if (!hasMultiple) {
    const singleBanner = banners[0]!
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden select-none bg-card",
          fullWidth ? "border-y border-border/70" : "max-w-8xl mx-auto rounded-2xl border border-border/80 px-4 sm:px-6 lg:px-8",
          heightClass,
          className
        )}
        aria-label="Campaign Banner"
      >
        <BannerSlideContent
          banner={singleBanner}
          isPriority={true}
          isZh={isZh}
        />
      </div>
    )
  }

  // Multi-Banner Carousel Variant
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden select-none bg-card",
        fullWidth ? "border-y border-border/70" : "max-w-8xl mx-auto rounded-2xl border border-border/80 px-4 sm:px-6 lg:px-8",
        heightClass,
        className
      )}
      aria-label="Campaign Carousel"
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={prefersReducedMotion ? 0 : 600}
        loop={true}
        autoplay={
          prefersReducedMotion
            ? false
            : {
                delay: autoplayDelay,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id} className="h-full w-full">
            <BannerSlideContent
              banner={banner}
              isPriority={index === 0}
              isZh={isZh}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Accessible Previous Slide Control */}
      <button
        type="button"
        onClick={() => swiperInstance?.slidePrev()}
        aria-label="Previous slide"
        className="absolute top-1/2 left-3 z-20 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 shadow-2xs backdrop-blur-xs transition-all hover:bg-black/70 focus-visible:opacity-100 group-hover:opacity-100 md:left-5"
      >
        <ChevronLeft className="size-4" />
      </button>

      {/* Accessible Next Slide Control */}
      <button
        type="button"
        onClick={() => swiperInstance?.slideNext()}
        aria-label="Next slide"
        className="absolute top-1/2 right-3 z-20 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 shadow-2xs backdrop-blur-xs transition-all hover:bg-black/70 focus-visible:opacity-100 group-hover:opacity-100 md:right-5"
      >
        <ChevronRight className="size-4" />
      </button>

      {/* Understated Pagination Indicators */}
      <div
        className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5"
        role="tablist"
        aria-label="Slide indicators"
      >
        {banners.map((banner, idx) => (
          <button
            key={banner.id || idx}
            type="button"
            onClick={() => swiperInstance?.slideToLoop(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            aria-selected={activeIndex === idx}
            role="tab"
            className={cn(
              "h-1.5 cursor-pointer rounded-full transition-all duration-300",
              activeIndex === idx
                ? "w-5 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </div>
  )
}

