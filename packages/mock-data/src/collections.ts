import type { Collection, Product } from "@workspace/typescript-config/types"
import { products } from "./products"

export interface CollectionProductRelation {
  collectionId: string
  productId: string
  sortOrder: number
}

export const festivalCollections: Collection[] = [
  {
    id: "col-ramadan",
    slug: "ramadan-collection",
    titleEn: "Ramadan & Iftar Specials",
    titleZh: "齋戒月與開齋聚餐特選",
    subtitleEn: "Dates, Rooh Afza, Samosas, Vermicelli & Biryani Rice",
    subtitleZh: "頂級椰棗、玫瑰露、咖哩角與香料飯特惠",
    badgeEn: "Ramadan Essentials",
    badgeZh: "齋月必備",
    bannerImageUrl: "/images/collections/ramadan-banner.jpg",
    ctaLabelEn: "Shop Ramadan",
    ctaLabelZh: "選購專區",
    productIds: [
      "prod-bateel-khudri-dates-500g",
      "prod-rooh-afza-800ml",
      "prod-shan-bombay-biryani",
      "prod-ig-basmati-5kg",
    ],
    startsAt: "2026-02-15T00:00:00Z",
    endsAt: "2026-04-10T23:59:59Z",
    isActive: true,
  },
  {
    id: "col-pakistani",
    slug: "pakistani-favorites",
    titleEn: "Pakistani Household Favorites",
    titleZh: "巴基斯坦經典家庭最愛",
    subtitleEn: "Specialty Biryani Mixes, National Pickles & Tapal Tea",
    subtitleZh: "Shan 香料粉、National 醃菜油漬醬與經典紅茶",
    badgeEn: "Direct Import",
    badgeZh: "直送品質",
    bannerImageUrl: "/images/collections/pakistan-banner.jpg",
    ctaLabelEn: "Explore Pakistan",
    ctaLabelZh: "選購專區",
    productIds: [
      "prod-shan-bombay-biryani",
      "prod-national-mixed-pickle-1kg",
      "prod-rooh-afza-800ml",
      "prod-shan-nihari-masala",
    ],
    startsAt: "2026-01-01T00:00:00Z",
    isActive: true,
  },
  {
    id: "col-indian-essentials",
    slug: "indian-essentials",
    titleEn: "Indian Daily Essentials",
    titleZh: "印度日常廚房不可或缺",
    subtitleEn: "Fresh Chakki Atta, Pure Cow Ghee, Long Grain Basmati & Dal",
    subtitleZh: "天然石磨全麥粉、特級純酥油與未拋光豆類",
    badgeEn: "Pantry Staples",
    badgeZh: "生活主糧",
    bannerImageUrl: "/images/collections/indian-banner.jpg",
    ctaLabelEn: "Shop Staples",
    ctaLabelZh: "選購主糧",
    productIds: [
      "prod-ig-basmati-5kg",
      "prod-aashirvaad-atta-10kg",
      "prod-tata-toor-dal-1kg",
      "prod-amul-ghee-1l",
    ],
    startsAt: "2026-01-01T00:00:00Z",
    isActive: true,
  },
  {
    id: "col-tea-lovers",
    slug: "tea-lovers-collection",
    titleEn: "Tea Lovers & Chai Corner",
    titleZh: "愛茶人之選：經典香料奶茶與錫蘭紅茶",
    subtitleEn: "Pure Ceylon Black Tea, Cardamom Chai & Crunchy Dipping Rusks",
    subtitleZh: "斯里蘭卡單一產區錫蘭茶、印度奶茶與香脆吐司酥餅",
    badgeEn: "Chai Time",
    badgeZh: "下午茶時光",
    bannerImageUrl: "/images/collections/tea-banner.jpg",
    ctaLabelEn: "Shop Chai",
    ctaLabelZh: "選購茶點",
    productIds: [
      "prod-dilmah-ceylon-tea-100tb",
      "prod-tata-tea-gold-500g",
      "prod-pran-toast-rusk-300g",
      "prod-britannia-good-day-600g",
    ],
    startsAt: "2026-01-01T00:00:00Z",
    isActive: true,
  },
]

// Join table mapping collection_products
export const collectionProducts: CollectionProductRelation[] = festivalCollections.flatMap(
  (col) =>
    col.productIds.map((productId, index) => ({
      collectionId: col.id,
      productId,
      sortOrder: index + 1,
    }))
)

// Helper: Get hydrated products for a collection
export function getCollectionProducts(collectionId: string): Product[] {
  const collection = festivalCollections.find((c) => c.id === collectionId)
  if (!collection) return []
  return collection.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined)
}
