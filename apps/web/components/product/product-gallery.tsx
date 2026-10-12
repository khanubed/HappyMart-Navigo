"use client"

import React, { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import type { Product } from "@workspace/typescript-config/types"
import { cn } from "@workspace/ui/lib/utils"

interface ProductGalleryProps {
  product: Product
  discountPercent?: number
  className?: string
}

export function ProductGallery({
  product,
  discountPercent = 0,
  className,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hasError, setHasError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Touch swipe support on mobile
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const images =
    product.images && product.images.length > 0 ? product.images : []
  const activeImage = images[selectedIndex] || images[0]

  const handlePrev = () => {
    if (images.length <= 1) return
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    if (images.length <= 1) return
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0]?.clientX ?? null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0]?.clientX ?? null
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 45
    const isRightSwipe = distance < -45

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Main Image Stage */}
      <div
        className="relative aspect-square w-full touch-pan-y overflow-hidden rounded-2xl border border-border/80 bg-white p-4 shadow-2xs select-none sm:p-6 dark:bg-card"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {activeImage && !hasError ? (
          <div
            className="group relative size-full cursor-zoom-in"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={activeImage}
              alt={`${product.titleEn} - view ${selectedIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              priority
              className="object-covertransition-transform duration-300 group-hover:scale-105"
              onError={() => setHasError(true)}
              unoptimized
            />
          </div>
        ) : (
          <div className="flex size-full items-center justify-center font-heading text-4xl font-black text-muted-foreground/30">
            {product.brandName?.charAt(0) || "P"}
          </div>
        )}

        {/* Dietary & Offer Badges Overlay Top-Left */}
        <div className="pointer-events-none absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
          {product.isVeg && <Badge variant="veg" size="sm" />}
          {product.isHalal && <Badge variant="halal" size="sm" />}
          {discountPercent > 0 && (
            <span className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-extrabold text-accent-foreground shadow-2xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="rounded-md bg-primary px-2 py-0.5 text-[11px] font-extrabold text-primary-foreground shadow-2xs">
              NEW
            </span>
          )}
        </div>

        {/* Zoom Hint Indicator Top-Right */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          aria-label="Zoom image"
          className="absolute top-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-2xs backdrop-blur-xs transition-colors hover:bg-background hover:text-foreground"
        >
          <ZoomIn className="size-4" />
        </button>

        {/* Next / Prev Controls (only if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute top-1/2 left-2.5 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground shadow-xs transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="size-4.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute top-1/2 right-2.5 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground shadow-xs transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronRight className="size-4.5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Strip (if > 1 image) */}
      {images.length > 1 && (
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto py-1">
          {images.map((img, idx) => {
            const isSelected = selectedIndex === idx
            return (
              <button
                key={img + idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={cn(
                  "relative size-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border bg-white p-1.5 transition-all dark:bg-card",
                  isSelected
                    ? "border-primary shadow-xs ring-2 ring-primary/20"
                    : "border-border/70 opacity-70 hover:border-primary/50 hover:opacity-100"
                )}
                aria-label={`Select product image ${idx + 1}`}
                aria-current={isSelected ? "true" : undefined}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                  unoptimized
                />
              </button>
            )
          })}
        </div>
      )}

      {/* Full-Screen Zoom Modal */}
      {isModalOpen && activeImage && (
        <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/80 p-4 backdrop-blur-sm duration-200 fade-in-0">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close zoomed view"
            className="absolute top-4 right-4 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
          >
            <X className="size-6" />
          </button>

          <div className="relative flex h-[80vh] max-h-[85vh] w-full max-w-4xl items-center justify-center">
            <Image
              src={activeImage}
              alt={product.titleEn}
              fill
              sizes="90vw"
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  )
}
