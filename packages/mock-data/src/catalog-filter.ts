import type { Product } from "@workspace/typescript-config/types"
import { categories } from "./categories"

export type SortOption =
  | "recommended"
  | "bestselling"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "name-asc"
  | "rating-desc"
  | "category-asc"

export interface FilterState {
  brands: string[]
  countries: string[]
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  offers?: boolean
  dietary: string[] // 'veg', 'halal', 'vegan', 'gluten-free'
  category?: string
  subcategory?: string
  sort?: SortOption
  searchQuery?: string
}

export interface AvailableFacetItem {
  id: string
  name: string
  count: number
}

export interface AvailableCategoryFacet {
  id: string
  slug: string
  nameEn: string
  nameZh: string
  count: number
}

export interface AvailableFacets {
  categories?: AvailableCategoryFacet[]
  brands: AvailableFacetItem[]
  countries: { code: string; name: string; flag: string; count: number }[]
  dietary: { id: string; nameEn: string; nameZh: string; count: number }[]
  minPrice: number
  maxPrice: number
  inStockCount: number
  offersCount: number
}

const countryFlags: Record<string, string> = {
  india: "🇮🇳",
  pakistan: "🇵🇰",
  bangladesh: "🇧🇩",
  nepal: "🇳🇵",
  "sri lanka": "🇱🇰",
  uae: "🇦🇪",
  thailand: "🇹🇭",
}

export function filterCatalog(
  products: Product[],
  filters: FilterState
): Product[] {
  return products.filter((p) => {
    // 1. Subcategory filter
    if (filters.subcategory) {
      const normSub = filters.subcategory.toLowerCase().trim()
      const catObj = categories.find(
        (c) =>
          c.slug.toLowerCase().trim() === normSub ||
          c.id.toLowerCase().trim() === normSub
      )
      const targetId = catObj ? catObj.id.toLowerCase() : normSub
      const targetSlug = catObj ? catObj.slug.toLowerCase() : normSub
      const matchSub =
        p.subcategoryId?.toLowerCase() === targetId ||
        p.subcategoryId?.toLowerCase() === targetSlug ||
        p.tags?.some(
          (t) => t.toLowerCase() === targetSlug || t.toLowerCase() === targetId
        )
      if (!matchSub) return false
    }

    // 1b. Category / Department filter
    if (filters.category) {
      const normCat = filters.category.toLowerCase().trim()
      const catObj = categories.find(
        (c) =>
          c.slug.toLowerCase().trim() === normCat ||
          c.id.toLowerCase().trim() === normCat
      )
      if (catObj) {
        if (catObj.level === 1) {
          const childIds = new Set(
            categories
              .filter((c) => c.parentId === catObj.id)
              .map((c) => c.id.toLowerCase())
          )
          const pCat = p.categoryId?.toLowerCase()
          const pSub = p.subcategoryId?.toLowerCase()
          const matchCat =
            pCat === catObj.id.toLowerCase() ||
            pCat === catObj.slug.toLowerCase() ||
            (pSub && childIds.has(pSub))
          if (!matchCat) return false
        } else {
          const matchSub =
            p.subcategoryId?.toLowerCase() === catObj.id.toLowerCase() ||
            p.subcategoryId?.toLowerCase() === catObj.slug.toLowerCase()
          if (!matchSub) return false
        }
      }
    }

    // 2. Search query filter
    if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
      const q = filters.searchQuery.toLowerCase().trim()
      const matchSearch =
        p.titleEn.toLowerCase().includes(q) ||
        p.titleZh.toLowerCase().includes(q) ||
        p.brandName.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
      if (!matchSearch) return false
    }

    // 3. Brand filter (OR within brands)
    if (filters.brands && filters.brands.length > 0) {
      const pBrand = p.brandName.toLowerCase().replace(/[^a-z0-9]/g, "-")
      const pBrandId = p.brandId?.toLowerCase()
      const matchBrand = filters.brands.some(
        (b) =>
          b.toLowerCase() === pBrand ||
          b.toLowerCase() === pBrandId ||
          b.toLowerCase() === p.brandName.toLowerCase()
      )
      if (!matchBrand) return false
    }

    // 4. Country filter (OR within countries)
    if (filters.countries && filters.countries.length > 0) {
      const pCountry = p.originCountry.toLowerCase()
      const matchCountry = filters.countries.some(
        (c) => c.toLowerCase() === pCountry
      )
      if (!matchCountry) return false
    }

    // 5. Price range filter (in HKD dollars)
    const effectivePrice = (p.variants[0]?.priceCents ?? 0) / 100
    if (filters.minPrice !== undefined && effectivePrice < filters.minPrice) {
      return false
    }
    if (filters.maxPrice !== undefined && effectivePrice > filters.maxPrice) {
      return false
    }

    // 6. In stock filter
    if (filters.inStock) {
      const hasStock = p.variants.some((v) => (v.stockQuantity ?? 0) > 0)
      if (!hasStock) return false
    }

    // 7. Offers filter
    if (filters.offers) {
      const hasOffer =
        p.badges?.includes("offer") ||
        p.variants.some(
          (v) => v.mrpCents && v.mrpCents > v.priceCents
        )
      if (!hasOffer) return false
    }

    // 8. Dietary filters (AND logic across selected dietary criteria)
    if (filters.dietary && filters.dietary.length > 0) {
      for (const d of filters.dietary) {
        if (d === "veg" && !p.isVeg) return false
        if (d === "halal" && !p.isHalal) return false
        if (d === "gluten-free" && !p.tags?.includes("gluten-free")) return false
        if (d === "vegan" && !p.tags?.includes("vegan")) return false
      }
    }

    return true
  })
}

export function sortCatalog(products: Product[], sort: SortOption = "recommended"): Product[] {
  const list = [...products]
  switch (sort) {
    case "price-asc":
      return list.sort(
        (a, b) => (a.variants[0]?.priceCents ?? 0) - (b.variants[0]?.priceCents ?? 0)
      )
    case "price-desc":
      return list.sort(
        (a, b) => (b.variants[0]?.priceCents ?? 0) - (a.variants[0]?.priceCents ?? 0)
      )
    case "bestselling":
      return list.sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0))
    case "newest":
      return list.sort((a, b) => {
        const aNew = a.badges?.includes("new") ? 1 : 0
        const bNew = b.badges?.includes("new") ? 1 : 0
        return bNew - aNew
      })
    case "rating-desc":
      return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    case "name-asc":
      return list.sort((a, b) => a.titleEn.localeCompare(b.titleEn))
    case "category-asc": {
      const catMap: Record<string, string> = {}
      categories.forEach((c) => {
        catMap[c.id] = c.nameEn
        catMap[c.slug] = c.nameEn
      })
      return list.sort((a, b) => {
        const aName = catMap[a.categoryId] || a.categoryId || ""
        const bName = catMap[b.categoryId] || b.categoryId || ""
        if (aName !== bName) return aName.localeCompare(bName)
        return (b.popularityScore ?? 0) - (a.popularityScore ?? 0)
      })
    }
    case "recommended":
    default:
      return list.sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0))
  }
}

export function getAvailableFacets(products: Product[]): AvailableFacets {
  const brandCounts: Record<string, number> = {}
  const countryCounts: Record<string, number> = {}
  const catCounts: Record<string, number> = {}
  let inStockCount = 0
  let offersCount = 0
  let vegCount = 0
  let halalCount = 0
  let veganCount = 0
  let glutenFreeCount = 0

  let minPrice = Infinity
  let maxPrice = -Infinity

  for (const p of products) {
    // Categories
    if (p.categoryId) {
      catCounts[p.categoryId] = (catCounts[p.categoryId] || 0) + 1
    }

    // Brands
    if (p.brandName) {
      brandCounts[p.brandName] = (brandCounts[p.brandName] || 0) + 1
    }

    // Country
    if (p.originCountry) {
      const norm = p.originCountry.toLowerCase()
      countryCounts[norm] = (countryCounts[norm] || 0) + 1
    }

    // Stock
    const hasStock = p.variants.some((v) => (v.stockQuantity ?? 0) > 0)
    if (hasStock) inStockCount++

    // Offers
    const hasOffer =
      p.badges?.includes("offer") ||
      p.variants.some((v) => v.mrpCents && v.mrpCents > v.priceCents)
    if (hasOffer) offersCount++

    // Dietary
    if (p.isVeg) vegCount++
    if (p.isHalal) halalCount++
    if (p.tags?.includes("vegan")) veganCount++
    if (p.tags?.includes("gluten-free")) glutenFreeCount++

    // Prices
    const priceDollars = (p.variants[0]?.priceCents ?? 0) / 100
    if (priceDollars < minPrice) minPrice = priceDollars
    if (priceDollars > maxPrice) maxPrice = priceDollars
  }

  const categoryFacets: AvailableCategoryFacet[] = categories
    .filter((c) => c.level === 1)
    .map((c) => ({
      id: c.id,
      slug: c.slug,
      nameEn: c.nameEn,
      nameZh: c.nameZh,
      count: catCounts[c.id] || catCounts[c.slug] || 0,
    }))
    .filter((c) => c.count > 0)

  const brands: AvailableFacetItem[] = Object.entries(brandCounts)
    .map(([name, count]) => ({
      id: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count)

  const countries = Object.entries(countryCounts).map(([norm, count]) => {
    const displayName = norm.charAt(0).toUpperCase() + norm.slice(1)
    return {
      code: norm,
      name: displayName,
      flag: countryFlags[norm] || "🌍",
      count,
    }
  })

  return {
    categories: categoryFacets,
    brands,
    countries,
    dietary: [
      { id: "veg", nameEn: "Vegetarian", nameZh: "純素食 / 素食", count: vegCount },
      { id: "halal", nameEn: "Halal Certified", nameZh: "清真認證", count: halalCount },
      { id: "vegan", nameEn: "Vegan", nameZh: "全純植物性", count: veganCount },
      { id: "gluten-free", nameEn: "Gluten-Free", nameZh: "無麩質", count: glutenFreeCount },
    ],
    minPrice: minPrice === Infinity ? 0 : Math.floor(minPrice),
    maxPrice: maxPrice === -Infinity ? 500 : Math.ceil(maxPrice),
    inStockCount,
    offersCount,
  }
}
