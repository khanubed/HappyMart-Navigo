"use client"

import React, { useState, useMemo, useCallback } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import type { Product, Subcategory } from "@workspace/typescript-config/types"
import {
  filterCatalog,
  sortCatalog,
  getAvailableFacets,
  type FilterState,
  type SortOption,
} from "@workspace/mock-data"
import {
  CategoryBreadcrumbs,
  type BreadcrumbItem,
} from "./category-breadcrumbs"
import { CategoryHeading } from "./category-heading"
import { SubcategoryRail } from "./subcategory-rail"
import {
  ProductListingToolbar,
  type ActiveChip,
} from "./product-listing-toolbar"
import { ProductFilterSidebar } from "./product-filter-sidebar"
import { ProductFilterDrawer } from "./product-filter-drawer"
import { ProductGrid } from "./product-grid"
import { CategorySeoContent } from "./category-seo-content"
import { useAppSelector } from "@/hooks/store"

export interface ProductListingViewProps {
  titleEn: string
  titleZh: string
  descriptionEn?: string
  descriptionZh?: string
  breadcrumbs: BreadcrumbItem[]
  subcategories?: Subcategory[]
  activeSubcategorySlug?: string
  baseHref: string
  initialProducts: Product[]
  headerSlot?: React.ReactNode
}

export function ProductListingView({
  titleEn,
  titleZh,
  descriptionEn,
  descriptionZh,
  breadcrumbs,
  subcategories,
  activeSubcategorySlug,
  baseHref,
  initialProducts,
  headerSlot,
}: ProductListingViewProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({})

  const handleQuantityChange = useCallback((id: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: qty }))
  }, [])

  const handleWishlistToggle = useCallback((id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  // 1. Parse active filters from URL query parameters
  const currentFilters: FilterState = useMemo(() => {
    const categoryParam = searchParams.get("category")
    const brandsParam = searchParams.get("brand")
    const countryParam = searchParams.get("country")
    const minParam = searchParams.get("minPrice")
    const maxParam = searchParams.get("maxPrice")
    const inStockParam = searchParams.get("inStock")
    const offersParam = searchParams.get("offers")
    const dietaryParam = searchParams.get("dietary")
    const sortParam = (searchParams.get("sort") as SortOption) || "recommended"
    const subParam = searchParams.get("sub") || activeSubcategorySlug

    return {
      category: categoryParam || undefined,
      brands: brandsParam ? brandsParam.split(",") : [],
      countries: countryParam ? countryParam.split(",") : [],
      minPrice: minParam ? parseFloat(minParam) : undefined,
      maxPrice: maxParam ? parseFloat(maxParam) : undefined,
      inStock: inStockParam === "true",
      offers: offersParam === "true",
      dietary: dietaryParam ? dietaryParam.split(",") : [],
      sort: sortParam,
      subcategory: subParam,
    }
  }, [searchParams, activeSubcategorySlug])

  // 2. Synchronize filter changes back to the URL
  const updateUrlFilters = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams()

      if (newFilters.category) {
        params.set("category", newFilters.category)
      }
      if (newFilters.brands && newFilters.brands.length > 0) {
        params.set("brand", newFilters.brands.join(","))
      }
      if (newFilters.countries && newFilters.countries.length > 0) {
        params.set("country", newFilters.countries.join(","))
      }
      if (newFilters.minPrice !== undefined) {
        params.set("minPrice", String(newFilters.minPrice))
      }
      if (newFilters.maxPrice !== undefined) {
        params.set("maxPrice", String(newFilters.maxPrice))
      }
      if (newFilters.inStock) {
        params.set("inStock", "true")
      }
      if (newFilters.offers) {
        params.set("offers", "true")
      }
      if (newFilters.dietary && newFilters.dietary.length > 0) {
        params.set("dietary", newFilters.dietary.join(","))
      }
      if (newFilters.sort && newFilters.sort !== "recommended") {
        params.set("sort", newFilters.sort)
      }
      if (newFilters.subcategory) {
        params.set("sub", newFilters.subcategory)
      }

      const queryStr = params.toString()
      router.push(queryStr ? `${pathname}?${queryStr}` : pathname, {
        scroll: false,
      })
    },
    [router, pathname]
  )

  // 3. Compute available facet counts from category scope products
  const facets = useMemo(() => {
    return getAvailableFacets(initialProducts)
  }, [initialProducts])

  // 4. Filter and sort catalog
  const filteredProducts = useMemo(() => {
    const matched = filterCatalog(initialProducts, currentFilters)
    return sortCatalog(matched, currentFilters.sort)
  }, [initialProducts, currentFilters])

  // 5. Build active chips for removal
  const activeChips: ActiveChip[] = useMemo(() => {
    const chips: ActiveChip[] = []

    // Category
    if (currentFilters.category && facets.categories) {
      const catObj = facets.categories.find(
        (c) =>
          c.slug.toLowerCase() === currentFilters.category?.toLowerCase() ||
          c.id.toLowerCase() === currentFilters.category?.toLowerCase()
      )
      chips.push({
        id: `category-${currentFilters.category}`,
        label: catObj ? (isZh ? catObj.nameZh : catObj.nameEn) : currentFilters.category,
        onRemove: () => {
          updateUrlFilters({ ...currentFilters, category: undefined })
        },
      })
    }

    // Brands
    currentFilters.brands.forEach((bId) => {
      const bObj = facets.brands.find((b) => b.id === bId)
      chips.push({
        id: `brand-${bId}`,
        label: bObj?.name || bId,
        onRemove: () => {
          const next = currentFilters.brands.filter((b) => b !== bId)
          updateUrlFilters({ ...currentFilters, brands: next })
        },
      })
    })

    // Countries
    currentFilters.countries.forEach((cCode) => {
      const cObj = facets.countries.find((c) => c.code === cCode)
      chips.push({
        id: `country-${cCode}`,
        label: cObj ? `${cObj.flag} ${cObj.name}` : cCode,
        onRemove: () => {
          const next = currentFilters.countries.filter((c) => c !== cCode)
          updateUrlFilters({ ...currentFilters, countries: next })
        },
      })
    })

    // Price range
    if (
      currentFilters.minPrice !== undefined ||
      currentFilters.maxPrice !== undefined
    ) {
      chips.push({
        id: "price-range",
        label: `HK$${currentFilters.minPrice ?? 0} – HK$${currentFilters.maxPrice ?? facets.maxPrice}`,
        onRemove: () => {
          updateUrlFilters({
            ...currentFilters,
            minPrice: undefined,
            maxPrice: undefined,
          })
        },
      })
    }

    // In stock
    if (currentFilters.inStock) {
      chips.push({
        id: "in-stock",
        label: isZh ? "僅現貨" : "In Stock",
        onRemove: () => {
          updateUrlFilters({ ...currentFilters, inStock: undefined })
        },
      })
    }

    // Offers
    if (currentFilters.offers) {
      chips.push({
        id: "offers",
        label: isZh ? "特惠商品" : "On Sale",
        onRemove: () => {
          updateUrlFilters({ ...currentFilters, offers: undefined })
        },
      })
    }

    // Dietary
    currentFilters.dietary.forEach((dId) => {
      const dObj = facets.dietary.find((d) => d.id === dId)
      chips.push({
        id: `diet-${dId}`,
        label: dObj ? (isZh ? dObj.nameZh : dObj.nameEn) : dId,
        onRemove: () => {
          const next = currentFilters.dietary.filter((d) => d !== dId)
          updateUrlFilters({ ...currentFilters, dietary: next })
        },
      })
    })

    return chips
  }, [currentFilters, facets, updateUrlFilters, isZh])

  const handleClearAllFilters = useCallback(() => {
    updateUrlFilters({
      category: undefined,
      brands: [],
      countries: [],
      dietary: [],
      sort: currentFilters.sort,
      subcategory: undefined,
    })
  }, [updateUrlFilters, currentFilters.sort])

  const activeFilterCount = activeChips.length

  return (
    <div className="max-w-8xl mx-auto space-y-6 px-4 py-5 sm:px-6 lg:px-8">
      {/* 1. Breadcrumbs */}
      <CategoryBreadcrumbs items={breadcrumbs} />

      {/* 2. Category Title / Brand Header */}
      {headerSlot ? (
        headerSlot
      ) : (
        <CategoryHeading
          titleEn={titleEn}
          titleZh={titleZh}
          descriptionEn={descriptionEn}
          descriptionZh={descriptionZh}
          totalCount={initialProducts.length}
        />
      )}

      {/* 3. Subcategory Image Rail (if available) */}
      {subcategories && subcategories.length > 0 && (
        <SubcategoryRail
          subcategories={subcategories}
          activeSubcategorySlug={currentFilters.category || currentFilters.subcategory}
          baseHref={baseHref}
        />
      )}

      {/* 4. Catalog Toolbar */}
      <ProductListingToolbar
        totalCount={initialProducts.length}
        showingCount={filteredProducts.length}
        sort={currentFilters.sort || "recommended"}
        onSortChange={(newSort) =>
          updateUrlFilters({ ...currentFilters, sort: newSort })
        }
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenMobileFilters={() => setIsMobileDrawerOpen(true)}
        activeFilterCount={activeFilterCount}
        activeChips={activeChips}
        onClearAllFilters={handleClearAllFilters}
      />

      {/* 5. Main Content: Filter Sidebar + Product Grid */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Desktop Sticky Sidebar (~240-260px) */}
        <div className="sticky top-20 hidden lg:col-span-3 lg:block">
          <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs">
            <ProductFilterSidebar
              facets={facets}
              filters={currentFilters}
              onFilterChange={updateUrlFilters}
              onClearAll={handleClearAllFilters}
            />
          </div>
        </div>

        {/* Product Grid Area (Remaining 9 columns) */}
        <div className="lg:col-span-9">
          <ProductGrid
            products={filteredProducts}
            viewMode={viewMode}
            quantities={quantities}
            wishlist={wishlist}
            onQuantityChange={handleQuantityChange}
            onWishlistToggle={handleWishlistToggle}
            onClearFilters={handleClearAllFilters}
            hasActiveFilters={activeFilterCount > 0}
          />
        </div>
      </div>

      {/* 6. SEO Editorial Content & FAQ Section */}
      <CategorySeoContent
        categorySlug={
          currentFilters.subcategory ||
          activeSubcategorySlug ||
          baseHref.replace(/^\/(departments|categories|brands)\//, "")
        }
      />

      {/* 7. Mobile Filter Slide-Over Drawer */}
      <ProductFilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        facets={facets}
        filters={currentFilters}
        onApplyFilters={updateUrlFilters}
        onClearAll={handleClearAllFilters}
        totalMatchingCount={filteredProducts.length}
      />
    </div>
  )
}
