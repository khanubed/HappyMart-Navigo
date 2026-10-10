"use client"

import React, { useState, useMemo, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import type { Brand } from "@workspace/typescript-config/types"
import { useAppSelector } from "@/hooks/store"
import { BrandCard } from "@/components/brands/brand-card"
import { BrandSearch } from "@/components/brands/brand-search"
import { BrandAlphabetFilter } from "@/components/brands/brand-alphabet-filter"
import { BrandSeoSection } from "@/components/brands/brand-seo-section"
import { EmptyState } from "@/components/common/empty-state"
import { Sparkles, Layers } from "lucide-react"

interface BrandDirectoryViewProps {
  initialBrands: Brand[]
}

export function BrandDirectoryView({ initialBrands }: BrandDirectoryViewProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const urlLetter = searchParams.get("letter") || "popular"
  const [selectedLetter, setSelectedLetter] = useState<string>(urlLetter)
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Keep state synced with URL param changes (e.g. back/forward buttons)
  useEffect(() => {
    const currentParam = searchParams.get("letter") || "popular"
    setSelectedLetter(currentParam)
  }, [searchParams])

  const handleSelectLetter = (letter: string | null) => {
    const target = letter || "popular"
    setSelectedLetter(target)
    const params = new URLSearchParams(searchParams.toString())
    if (target === "popular") {
      params.delete("letter")
    } else {
      params.set("letter", target)
    }
    const newQuery = params.toString()
    router.push(newQuery ? `${pathname}?${newQuery}` : pathname, { scroll: false })
  }

  // Calculate available initials
  const availableInitials = useMemo(() => {
    const set = new Set<string>()
    for (const b of initialBrands) {
      const firstChar = b.name.trim().charAt(0).toUpperCase()
      if (/[0-9]/.test(firstChar)) {
        set.add("0-9")
      } else if (/[A-Z]/.test(firstChar)) {
        set.add(firstChar)
      }
    }
    return set
  }, [initialBrands])

  // Popular brands list (ranked by featured & product count)
  const popularBrands = useMemo(() => {
    return initialBrands
      .filter((b) => b.featured)
      .sort((a, b) => (b.productCount ?? 0) - (a.productCount ?? 0))
  }, [initialBrands])

  // Filtered brands based on search and/or letter
  const searchFilteredBrands = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return null

    return initialBrands.filter((b) => {
      const nameMatch = b.name.toLowerCase().includes(q)
      const enMatch = b.nameEn?.toLowerCase().includes(q) ?? false
      const zhMatch = b.nameZh?.includes(q) ?? false
      const countryMatch = b.countryOfOrigin.toLowerCase().includes(q)
      return nameMatch || enMatch || zhMatch || countryMatch
    })
  }, [initialBrands, searchQuery])

  // Letter filtered brands
  const letterFilteredBrands = useMemo(() => {
    if (selectedLetter === "popular" || !selectedLetter) return []

    if (selectedLetter === "0-9") {
      return initialBrands.filter((b) => /^[0-9]/.test(b.name.trim()))
    }

    return initialBrands.filter((b) =>
      b.name.trim().toUpperCase().startsWith(selectedLetter.toUpperCase())
    )
  }, [initialBrands, selectedLetter])

  // Grouped brands for directory overview (when in popular / all mode)
  const groupedBrands = useMemo(() => {
    const groups: Record<string, Brand[]> = {}
    const sorted = [...initialBrands].sort((a, b) => a.name.localeCompare(b.name))

    for (const brand of sorted) {
      const firstChar = brand.name.trim().charAt(0).toUpperCase()
      const key = /[0-9]/.test(firstChar) ? "0-9" : firstChar
      if (!groups[key]) groups[key] = []
      groups[key].push(brand)
    }

    return Object.entries(groups).sort(([a], [b]) => {
      if (a === "0-9") return 1
      if (b === "0-9") return -1
      return a.localeCompare(b)
    })
  }, [initialBrands])

  return (
    <div className="space-y-8">
      {/* Page Header Introduction Row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-border/70 pb-6">
        <div className="max-w-2xl space-y-1.5">
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {isZh ? "按品牌選購" : "Shop by brand"}
            </h1>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
              {isZh ? `${initialBrands.length} 個品牌` : `${initialBrands.length} brands`}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {isZh
              ? "探索涵蓋食品糧油、個人草本護理、傳統滋補品、家居必需品等各領域的原裝進口信賴品牌。"
              : "Explore trusted heritage brands across South Asian groceries, personal care, wellness, and pantry staples."}
          </p>
        </div>

        {/* Brand Search on Right */}
        <div className="w-full md:w-auto">
          <BrandSearch
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            className="w-full md:w-80"
          />
        </div>
      </div>

      {/* Alphabetical Filter Bar */}
      <div className="rounded-2xl border border-border/80 bg-card/60 p-2 sm:p-2.5 shadow-2xs">
        <BrandAlphabetFilter
          selectedLetter={selectedLetter}
          onSelectLetter={handleSelectLetter}
          availableInitials={availableInitials}
        />
      </div>

      {/* Mode 1: Search Query Active */}
      {searchFilteredBrands !== null ? (
        <section aria-label={isZh ? "搜尋結果" : "Search results"}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-foreground">
              {isZh
                ? `「${searchQuery}」的搜尋結果 (${searchFilteredBrands.length})`
                : `Search results for "${searchQuery}" (${searchFilteredBrands.length})`}
            </h2>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-medium text-primary hover:underline"
            >
              {isZh ? "清除搜尋" : "Clear search"}
            </button>
          </div>

          {searchFilteredBrands.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 sm:gap-4">
              {searchFilteredBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          ) : (
            <div className="py-12">
              <EmptyState
                title={isZh ? "找不到相符的品牌" : "No matching brands found"}
                description={
                  isZh
                    ? `未有找到與「${searchQuery}」相符的品牌名稱。請嘗試其他關鍵字或按字母索引瀏覽。`
                    : `We couldn't find any brands matching "${searchQuery}". Try a different spelling or browse by alphabet.`
                }
                actionLabel={isZh ? "重設搜尋" : "Reset search"}
                onAction={() => setSearchQuery("")}
              />
            </div>
          )}
        </section>
      ) : selectedLetter !== "popular" && selectedLetter ? (
        /* Mode 2: Specific Letter Active (e.g. A, B, 0-9) */
        <section aria-label={`${selectedLetter} brands`}>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                {selectedLetter}
              </span>
              <h2 className="font-heading text-lg font-bold text-foreground">
                {selectedLetter === "0-9"
                  ? isZh
                    ? "以數字開頭的品牌"
                    : "Brands starting with 0–9"
                  : isZh
                    ? `${selectedLetter} 開頭的品牌`
                    : `Brands starting with ${selectedLetter}`}
              </h2>
              <span className="text-xs text-muted-foreground">
                ({letterFilteredBrands.length})
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleSelectLetter("popular")}
              className="text-xs font-medium text-primary hover:underline"
            >
              {isZh ? "查看熱門品牌" : "View popular brands"}
            </button>
          </div>

          {letterFilteredBrands.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 sm:gap-4">
              {letterFilteredBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          ) : (
            <div className="py-12">
              <EmptyState
                title={isZh ? "此字母暫無品牌" : "No brands starting with this letter"}
                description={
                  isZh
                    ? "我們正在持續引進更多南亞優質品牌，歡迎瀏覽其他字母或熱門品牌。"
                    : "We are regularly adding new regional brands. Browse other letters or popular brands."
                }
                actionLabel={isZh ? "返回熱門品牌" : "Back to popular"}
                onAction={() => handleSelectLetter("popular")}
              />
            </div>
          )}
        </section>
      ) : (
        /* Mode 3: Default Popular View with Grouped Alphabetical Directory below */
        <div className="space-y-12">
          {/* Section 1: Curated Popular Brands Grid */}
          <section aria-label={isZh ? "熱門品牌" : "Popular brands"}>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                {isZh ? "熱門推薦品牌" : "Popular brands"}
              </h2>
              <span className="text-xs text-muted-foreground">
                ({popularBrands.length})
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 sm:gap-4">
              {popularBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          </section>

          {/* Section 2: Complete Alphabetical Directory Overview */}
          <section aria-label={isZh ? "全字母品牌目錄" : "Alphabetical directory"} className="space-y-8">
            <div className="flex items-center gap-2 border-b border-border/70 pb-3">
              <Layers className="size-4 text-primary" />
              <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                {isZh ? "所有品牌目錄 (A–Z)" : "All Brands Directory (A–Z)"}
              </h2>
            </div>

            <div className="space-y-10">
              {groupedBrands.map(([letterGroup, groupBrands]) => (
                <div
                  key={letterGroup}
                  id={`group-${letterGroup}`}
                  className="space-y-3.5 scroll-mt-24"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-muted text-xs font-bold text-foreground">
                      {letterGroup}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {isZh ? `${groupBrands.length} 個品牌` : `${groupBrands.length} brands`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 sm:gap-4">
                    {groupBrands.map((brand) => (
                      <BrandCard key={brand.id} brand={brand} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* SEO Content Section at bottom */}
      <BrandSeoSection />
    </div>
  )
}
