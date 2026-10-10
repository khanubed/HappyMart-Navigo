import type { Metadata } from "next"
import { CheckoutView } from "@/components/checkout/checkout-view"

export const metadata: Metadata = {
  title: "Checkout | Happymart",
  description:
    "Secure single-page checkout for Happymart Hong Kong. Complete your grocery order with territory-wide delivery.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function CheckoutPage() {
  return <CheckoutView />
}
