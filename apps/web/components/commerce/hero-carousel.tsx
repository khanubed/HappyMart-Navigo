"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Tag,
  ShieldCheck,
  Flame,
  Clock,
  ShoppingBag,
} from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules"
import type { Swiper as SwiperCore } from "swiper"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import type { Banner } from "@workspace/typescript-config/types"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

// Swiper core & modules styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"

export interface HeroCarouselProps {
  banners: Banner[]
  autoplayDelay?: number
  className?: string
  fullWidth?: boolean
}

const slideGradientStyles = [
  {
    bg: "bg-gradient-to-r from-emerald-950/20 via-background to-primary/10",
    glow: "bg-primary/20",
    accent: "text-primary",
    badgeVariant: "default" as const,
  },
  {
    bg: "bg-gradient-to-r from-amber-950/20 via-background to-accent/15",
    glow: "bg-accent/25",
    accent: "text-accent",
    badgeVariant: "offer" as const,
  },
  {
    bg: "bg-gradient-to-r from-teal-950/20 via-background to-emerald-900/15",
    glow: "bg-emerald-500/20",
    accent: "text-emerald-500",
    badgeVariant: "halal" as const,
  },
  {
    bg: "bg-gradient-to-r from-orange-950/20 via-background to-secondary/40",
    glow: "bg-orange-500/20",
    accent: "text-orange-500",
    badgeVariant: "offer" as const,
  },
]

export function HeroCarousel({
  banners,
  autoplayDelay = 6000,
  className,
  fullWidth = true,
}: HeroCarouselProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  if (!banners || banners.length === 0) return null

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden select-none",
        fullWidth ? "w-full" : "max-w-8xl mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
      aria-label="Supermarket Campaign Swiper"
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={700}
        loop={banners.length > 1}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {banners.map((banner, index) => {
          const theme =
            slideGradientStyles[index % slideGradientStyles.length] ??
            slideGradientStyles[0]!

          return (
            <SwiperSlide key={banner.id} className="w-full">
              <div
                className={cn(
                  "relative flex w-full flex-col justify-between overflow-hidden border-y border-border/80",
                  "min-h-[440px] sm:min-h-[500px] lg:min-h-[540px]",
                  theme.bg
                )}
              >
                {/* Background Banner Poster Image */}
                {banner.imageUrl && (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={banner.imageUrl}
                      alt={isZh ? banner.titleZh : banner.titleEn}
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="object-cover object-right transition-transform duration-1000 ease-out group-hover:scale-105 md:object-center"
                    />
                    {/* Horizontal gradient to ensure headline & text on left remain razor sharp */}
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-background/0 dark:from-background dark:via-background/90 dark:to-background/35" /> */}
                    {/* Vertical subtle gradient for seamless top/bottom borders */}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" /> */}
                  </div>
                )}

                {/* Background Ambient Glow Shapes */}
                <div
                  className={cn(
                    "pointer-events-none absolute -top-32 right-0 z-1 size-[500px] rounded-full opacity-50 blur-3xl transition-all duration-1000",
                    theme.glow
                  )}
                />
                <div className="pointer-events-none absolute right-1/4 bottom-0 z-1 size-96 rounded-full bg-primary/10 blur-2xl" />

                {/* Main Content Container (Bounded at 1280px/8xl for crisp readability) */}
                <div className="max-w-8xl relative z-10 mx-auto flex h-full w-full flex-1 flex-col justify-between px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                  {/* Top Badges Row */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/95 px-3 py-1 text-xs font-bold text-foreground shadow-2xs backdrop-blur-xs">
                      {/* <Sparkles className="size-3 text-accent" /> */}
                      {isZh ? banner.badgeZh : banner.badgeEn}
                    </span>

                    {banner.offerText && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/95 px-3 py-1 text-xs font-bold text-foreground shadow-2xs backdrop-blur-xs">
                        <Tag className="size-3 text-primary" />
                        {banner.offerText}
                      </span>
                    )}

                    <span className="hidden items-center gap-1.5 rounded-full border border-border bg-background/95 px-3 py-1 text-xs font-bold text-foreground shadow-2xs backdrop-blur-xs sm:inline-flex">
                      <ShieldCheck className="size-3 text-success" />
                      {isZh ? "全港現貨速遞" : "HK Stock Ready"}
                    </span>

                    <span className="hidden items-center gap-1.5 rounded-full border border-border bg-background/95 px-3 py-1 text-xs font-bold text-foreground shadow-2xs backdrop-blur-xs md:inline-flex">
                      <ShoppingBag className="size-3 text-primary" />
                      {isZh ? "滿 HK$500 全港免運" : "Free Delivery HK$500+"}
                    </span>
                  </div>

                  {/* Center Main Headline & Value Statement */}
                  <div className="relative z-10 max-w-3xl space-y-4 py-6  sm:space-y-5 sm:py-10">
                    <h1 className="font-heading text-3xl leading-[1.12] font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                      {isZh ? banner.titleZh : banner.titleEn}
                    </h1>

                    <p className="max-w-2xl text-sm leading-relaxed font-normal text-slate-300 sm:text-lg">
                      {isZh ? banner.subtitleZh : banner.subtitleEn}
                    </p>

                    <div className="flex flex-wrap items-center gap-3.5 pt-2 sm:pt-4">
                      <Link href={banner.ctaUrl || "/collections"}>
                        <Button
                          size="lg"
                          className="h-12 gap-2.5 rounded-xl px-7 text-sm font-bold shadow-md transition-all hover:shadow-lg"
                        >
                          <span>
                            {isZh ? banner.ctaLabelZh : banner.ctaLabelEn}
                          </span>
                          <ArrowRight className="size-4" />
                        </Button>
                      </Link>

                      <Link href="/categories">
                        <Button
                          variant="outline"
                          size="lg"
                          className="h-12 rounded-xl border-border bg-background/80 px-6 text-sm font-bold backdrop-blur-xs hover:bg-background"
                        >
                          {isZh ? "瀏覽全部類別" : "Explore All Aisles"}
                        </Button>
                      </Link>

                      <Link href="/countries">
                        <Button
                          variant="ghost"
                          size="lg"
                          className="h-12 rounded-xl px-5 text-sm font-semibold transition-colors hover:text-primary"
                        >
                          {isZh ? "按國家瀏覽" : "Shop By Country"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Custom Prev Navigation Arrow */}
      <button
        onClick={() => swiperInstance?.slidePrev()}
        aria-label="Previous Campaign Slide"
        className="absolute top-1/2 left-3 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border border-border/80 bg-background/85 text-foreground opacity-0 shadow-md backdrop-blur-sm transition-all group-hover:opacity-100 hover:scale-105 hover:bg-background focus:opacity-100 active:scale-95 sm:left-6 sm:size-12"
      >
        <ChevronLeft className="size-5 sm:size-6" />
      </button>

      {/* Custom Next Navigation Arrow */}
      <button
        onClick={() => swiperInstance?.slideNext()}
        aria-label="Next Campaign Slide"
        className="absolute top-1/2 right-3 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border border-border/80 bg-background/85 text-foreground opacity-0 shadow-md backdrop-blur-sm transition-all group-hover:opacity-100 hover:scale-105 hover:bg-background focus:opacity-100 active:scale-95 sm:right-6 sm:size-12"
      >
        <ChevronRight className="size-5 sm:size-6" />
      </button>

      {/* Bottom Floating Pagination Indicators & Slide Counter */}
      <div className="absolute right-4 bottom-5 z-20 flex items-center gap-2.5 rounded-full border border-border/60 bg-background/80 px-3.5 py-1.5 shadow-xs backdrop-blur-md sm:right-8 sm:bottom-6">
        <span className="font-mono text-xs font-bold text-foreground">
          {activeIndex + 1}
        </span>
        <span className="text-xs text-muted-foreground">/</span>
        <span className="font-mono text-xs font-medium text-muted-foreground">
          {banners.length}
        </span>

        <div className="ml-2 flex items-center gap-1.5">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => swiperInstance?.slideToLoop(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-2 cursor-pointer rounded-full transition-all",
                activeIndex === idx
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
