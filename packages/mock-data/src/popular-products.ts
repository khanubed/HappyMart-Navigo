import type { Product } from "@workspace/typescript-config/types"
import { products } from "./products"

// 12 top selling staples for the Popular Products row
export const popularProducts: Product[] = products.slice(0, 12)
