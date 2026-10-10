import type { Product } from "@workspace/typescript-config/types"
import { products } from "./products"

// Top-rated community favorites and chef recommendations
export const recommendations: Product[] = products
  .filter((p) => (p.rating ?? 0) >= 4.8 && !p.isNewArrival)
  .slice(0, 8)
