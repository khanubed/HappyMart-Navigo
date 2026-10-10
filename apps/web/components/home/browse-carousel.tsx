"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, FreeMode } from "swiper/modules"
import type { Swiper as SwiperCore } from "swiper"
import { cn } from "@workspace/ui/lib/utils"
import { SectionHeader } from "@/components/common/section-header"

// Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/free-mode"

export interface BrowseCarouselItem {
  id: string
  href: string
  title: string
  subtitle?: string
  imageUrl?: string
  fallbackChar?: string
  badge?: React.ReactNode
}

export interface BrowseCarouselProps<T = BrowseCarouselItem> {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: string
  viewAllHref: string
  viewAllLabel?: string
  items?: T[]
  renderItem?: (item: T, index: number) => React.ReactNode
  imageFit?: "cover" | "contain"
  className?: string
  slidesPerView?: number
  spaceBetween?: number
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween: number }>
  children?: React.ReactNode
}

export function BrowseCarousel<T = BrowseCarouselItem>({
  eyebrow,
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = "View All",
  items,
  renderItem,
  imageFit = "cover",
  className,
  slidesPerView = 2.15,
  spaceBetween = 10,
  breakpoints,
  children,
}: BrowseCarouselProps<T>) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const defaultBreakpoints = {
    0: {
      slidesPerView: 2.15,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 2.6,
      spaceBetween: 12,
    },
    640: {
      slidesPerView: 3.5,
      spaceBetween: 14,
    },
    768: {
      slidesPerView: 4.3,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 5.3,
      spaceBetween: 16,
    },
    1280: {
      slidesPerView: 6.3,
      spaceBetween: 18,
    },
  }

  return (
    <section className={cn("max-w-8xl mx-auto space-y-4 sm:space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8", className)}>
      {/* Reusable SectionHeader with controls */}
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        viewAllHref={viewAllHref}
        viewAllLabel={viewAllLabel}
        actions={
          <div className="hidden sm:flex items-center gap-1.5 ml-2">
            <button
              type="button"
              suppressHydrationWarning
              disabled={isBeginning}
              onClick={() => swiperInstance?.slidePrev()}
              aria-label="Previous items"
              className={cn(
                "flex size-8 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-foreground shadow-2xs transition-all hover:bg-muted active:scale-95",
                isBeginning && "opacity-40 cursor-not-allowed hover:bg-background active:scale-100"
              )}
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              type="button"
              suppressHydrationWarning
              disabled={isEnd}
              onClick={() => swiperInstance?.slideNext()}
              aria-label="Next items"
              className={cn(
                "flex size-8 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-foreground shadow-2xs transition-all hover:bg-muted active:scale-95",
                isEnd && "opacity-40 cursor-not-allowed hover:bg-background active:scale-100"
              )}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        }
      />

      {/* Swiper Slider Carousel */}
      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <Swiper
          modules={[Navigation, FreeMode]}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper)
            setIsBeginning(swiper.isBeginning)
            setIsEnd(swiper.isEnd)
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning)
            setIsEnd(swiper.isEnd)
          }}
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
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          breakpoints={breakpoints || defaultBreakpoints}
          className="w-full !py-1"
        >
          {renderItem && items
            ? items.map((item, index) => {
                const key =
                  typeof item === "object" && item !== null && "id" in item
                    ? String((item as { id: string | number }).id)
                    : index
                return (
                  <SwiperSlide key={key} className="!h-auto flex">
                    {renderItem(item, index)}
                  </SwiperSlide>
                )
              })
            : children
            ? children
            : (items as unknown as BrowseCarouselItem[] | undefined)?.map((item) => (
                <SwiperSlide key={item.id} className="!h-auto">
                  <Link
                    href={item.href}
                    className="group flex flex-col transition-all"
                  >
                    {/* Rounded Soft Tile Card with Product Image */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl bg-muted/60 dark:bg-card border border-border/50 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-xs">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 30vw, (max-width: 1024px) 20vw, 12vw"
                          className={cn(
                            "transition-transform duration-500 ease-out group-hover:scale-105",
                            imageFit === "cover" ? "object-cover" : "object-contain p-2"
                          )}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-heading text-xl sm:text-2xl font-black text-primary/80">
                          {item.fallbackChar || item.title.charAt(0)}
                        </div>
                      )}

                      {item.badge && (
                        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10">
                          {item.badge}
                        </div>
                      )}
                    </div>

                    {/* Left-aligned Label Below Tile */}
                    <div className="pt-1.5 sm:pt-2.5 px-0.5 space-y-0.5">
                      <h3 className="line-clamp-1 font-heading text-[11px] sm:text-xs md:text-sm font-semibold sm:font-bold text-foreground transition-colors group-hover:text-primary">
                        {item.title}
                      </h3>

                      {item.subtitle && (
                        <p className="line-clamp-1 text-[10px] sm:text-[11px] font-medium text-muted-foreground">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  )
}
