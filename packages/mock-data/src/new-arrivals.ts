import type { Product } from "@workspace/typescript-config/types"
import { products } from "./products"

// Fresh imports and newly landed shipments across South Asian master producers
export const newArrivals: Product[] = products
  .filter((p) => p.isNewArrival || p.badges.includes("new"))
  .slice(0, 8)
