"use client"

import React from "react"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

export const ALPHABET_LETTERS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
  "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
  "U", "V", "W", "X", "Y", "Z", "0-9",
]

interface BrandAlphabetFilterProps {
  selectedLetter: string | null
  onSelectLetter: (letter: string | null) => void
  availableInitials: Set<string>
  className?: string
}

export function BrandAlphabetFilter({
  selectedLetter,
  onSelectLetter,
  availableInitials,
  className,
}: BrandAlphabetFilterProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const isPopularActive = !selectedLetter || selectedLetter === "popular"

  return (
    <nav
      aria-label={isZh ? "按字母篩選品牌" : "Filter brands by letter"}
      className={cn(
        "no-scrollbar flex w-full items-center gap-1 overflow-x-auto py-1",
        className
      )}
    >
      {/* Popular button */}
      <button
        type="button"
        onClick={() => onSelectLetter("popular")}
        className={cn(
          "shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          isPopularActive
            ? "bg-primary text-primary-foreground shadow-2xs"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
        aria-pressed={isPopularActive}
      >
        {isZh ? "熱門品牌" : "Popular"}
      </button>

      {/* A-Z & 0-9 buttons */}
      {ALPHABET_LETTERS.map((char) => {
        const isAvailable = availableInitials.has(char)
        const isSelected = selectedLetter === char

        return (
          <button
            key={char}
            type="button"
            disabled={!isAvailable}
            onClick={() => onSelectLetter(char)}
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isSelected
                ? "bg-primary text-primary-foreground shadow-2xs"
                : isAvailable
                  ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                  : "cursor-not-allowed opacity-30 text-muted-foreground"
            )}
            aria-pressed={isSelected}
            aria-disabled={!isAvailable}
            title={!isAvailable ? `${char} - ${isZh ? "暫無品牌" : "No brands"}` : undefined}
          >
            {char}
          </button>
        )
      })}
    </nav>
  )
}
