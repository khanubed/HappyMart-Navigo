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
import { Button, buttonVariants } from "@workspace/ui/components/button"
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
                  "min-h-[250px] sm:min-h-[270px] lg:min-h-[270px] max-h-[320px]",
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

                {/* Main Content Container */}
                <div className="max-w-8xl relative z-10 mx-auto flex h-full w-full flex-1 flex-col justify-between px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
                  {/* Top Badges Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/95 px-2.5 py-0.5 text-[11px] font-bold text-foreground shadow-2xs backdrop-blur-xs">
                      {isZh ? banner.badgeZh : banner.badgeEn}
                    </span>

                    {banner.offerText && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/95 px-2.5 py-0.5 text-[11px] font-bold text-foreground shadow-2xs backdrop-blur-xs">
                        <Tag className="size-3 text-primary" />
                        {banner.offerText}
                      </span>
                    )}

                    <span className="hidden items-center gap-1.5 rounded-full border border-border bg-background/95 px-2.5 py-0.5 text-[11px] font-bold text-foreground shadow-2xs backdrop-blur-xs sm:inline-flex">
                      <ShieldCheck className="size-3 text-success" />
                      {isZh ? "全港現貨速遞" : "HK Stock Ready"}
                    </span>

                    <span className="hidden items-center gap-1.5 rounded-full border border-border bg-background/95 px-2.5 py-0.5 text-[11px] font-bold text-foreground shadow-2xs backdrop-blur-xs md:inline-flex">
                      <ShoppingBag className="size-3 text-primary" />
                      {isZh ? "滿 HK$500 全港免運" : "Free Delivery HK$500+"}
                    </span>
                  </div>

                  {/* Center Main Headline & Value Statement */}
                  <div className="relative z-10 max-w-2xl space-y-1 py-1 sm:space-y-1.5 sm:py-1.5">
                    <h1 className="font-heading text-xl sm:text-2xl lg:text-3xl leading-tight font-black tracking-tight text-white">
                      {isZh ? banner.titleZh : banner.titleEn}
                    </h1>

                    <p className="max-w-xl text-xs sm:text-sm leading-snug font-normal text-slate-200 line-clamp-1 sm:line-clamp-2">
                      {isZh ? banner.subtitleZh : banner.subtitleEn}
                    </p>

                    <div className="flex flex-wrap items-center gap-2.5 pt-1 sm:pt-1.5">
                      <Link
                        href={banner.ctaUrl || "/collections"}
                        className={cn(
                          buttonVariants({ size: "sm" }),
                          "h-8 sm:h-9 gap-2 rounded-lg px-4 text-xs font-bold shadow-xs transition-all hover:shadow-sm"
                        )}
                      >
                        <span>
                          {isZh ? banner.ctaLabelZh : banner.ctaLabelEn}
                        </span>
                        <ArrowRight className="size-3.5" />
                      </Link>

                      <Link
                        href="/categories"
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "h-8 sm:h-9 rounded-lg border-border bg-background/80 px-3.5 text-xs font-semibold backdrop-blur-xs hover:bg-background"
                        )}
                      >
                        {isZh ? "瀏覽全部類別" : "Explore All Aisles"}
                      </Link>

                      <Link
                        href="/countries"
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" }),
                          "h-8 sm:h-9 rounded-lg px-3 text-xs font-medium transition-colors hover:text-primary text-white hover:text-white hover:bg-white/10"
                        )}
                      >
                        {isZh ? "按國家瀏覽" : "Shop By Country"}
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
        type="button"
        suppressHydrationWarning
        onClick={() => swiperInstance?.slidePrev()}
        aria-label="Previous Campaign Slide"
        className="absolute top-1/2 left-3 z-20 flex size-8 sm:size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-border/80 bg-background/85 text-foreground opacity-0 shadow-xs backdrop-blur-sm transition-all group-hover:opacity-100 hover:scale-105 hover:bg-background focus:opacity-100 active:scale-95 sm:left-5"
      >
        <ChevronLeft className="size-4 sm:size-5" />
      </button>

      {/* Custom Next Navigation Arrow */}
      <button
        type="button"
        suppressHydrationWarning
        onClick={() => swiperInstance?.slideNext()}
        aria-label="Next Campaign Slide"
        className="absolute top-1/2 right-3 z-20 flex size-8 sm:size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-border/80 bg-background/85 text-foreground opacity-0 shadow-xs backdrop-blur-sm transition-all group-hover:opacity-100 hover:scale-105 hover:bg-background focus:opacity-100 active:scale-95 sm:right-5"
      >
        <ChevronRight className="size-4 sm:size-5" />
      </button>

      {/* Bottom Floating Pagination Indicators & Slide Counter */}
      <div className="absolute right-4 bottom-2.5 sm:right-6 z-20 flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-2.5 py-1 text-xs shadow-xs backdrop-blur-md">
        <span className="font-mono text-[11px] font-bold text-foreground">
          {activeIndex + 1}
        </span>
        <span className="text-muted-foreground text-[11px]">/</span>
        <span className="font-mono text-[11px] font-medium text-muted-foreground">
          {banners.length}
        </span>

        <div className="ml-1.5 flex items-center gap-1">
          {banners.map((_, idx) => (
            <button
              type="button"
              suppressHydrationWarning
              key={idx}
              onClick={() => swiperInstance?.slideToLoop(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-1.5 cursor-pointer rounded-full transition-all",
                activeIndex === idx
                  ? "w-4 bg-primary"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
