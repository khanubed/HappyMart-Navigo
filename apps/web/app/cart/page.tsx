import type { Metadata } from "next"
import { CartView } from "@/components/cart/cart-view"

export const metadata: Metadata = {
  title: "Your Cart | Happymart",
  description:
    "Review your shopping cart, manage grocery items, apply promo codes, and proceed to secure checkout on Happymart Hong Kong.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function CartPage() {
  return <CartView />
}
