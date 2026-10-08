import type { Product } from "@workspace/typescript-config/types"
import { products } from "./products"

export const recommendations: Product[] = products
  .filter((p: Product) => p.isBestSeller || (p.rating ?? 0) >= 4.8)
  .slice(0, 8)
