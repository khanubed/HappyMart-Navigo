import type { Product } from "@workspace/typescript-config/types"
import { products } from "./products"

export const newArrivals: Product[] = products
  .filter((p: Product) => p.isNewArrival || p.badges.includes("new") || p.originCountry !== "India")
  .slice(0, 8)
