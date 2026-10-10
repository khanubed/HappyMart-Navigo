import type { Product } from "@workspace/typescript-config/types"
import { products } from "./products"

// Top 12 selling staples derived from master products catalogue sorted by popularityScore
export const popularProducts: Product[] = [...products]
  .sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0))
  .slice(0, 12)
