import type { Order } from "@workspace/typescript-config/types"
import { products } from "./products"

const getProductImage = (productId: string, fallback: string) => {
  const product = products.find((p) => p.id === productId)
  return product?.images[0] || fallback
}

export const sampleOrderHistory: Order[] = [
  {
    id: "ord-10492",
    orderNumber: "HM-HK-2026-10492",
    userId: "usr-demo",
    items: [
      {
        variantId: "var-ig-5kg",
        productId: "prod-ig-basmati-5kg",
        title: "India Gate Classic Aged Basmati Rice",
        brand: "India Gate",
        packSize: "5 kg",
        price: 128,
        mrp: 155,
        quantity: 1,
        image: getProductImage("prod-ig-basmati-5kg", ""),
        originCountry: "India",
      },
      {
        variantId: "var-ash-10kg",
        productId: "prod-aashirvaad-atta-10kg",
        title: "Aashirvaad 100% Whole Wheat Chakki Atta",
        brand: "Aashirvaad",
        packSize: "10 kg",
        price: 98,
        mrp: 118,
        quantity: 1,
        image: getProductImage("prod-aashirvaad-atta-10kg", ""),
        originCountry: "India",
      },
      {
        variantId: "var-sh-bb-60g",
        productId: "prod-shan-bombay-biryani",
        title: "Shan Special Bombay Biryani Recipe & Spice Mix",
        brand: "Shan Foods",
        packSize: "60 g",
        price: 14.5,
        mrp: 18,
        quantity: 2,
        image: getProductImage("prod-shan-bombay-biryani", ""),
        originCountry: "Pakistan",
      },
      {
        variantId: "var-amul-ghee-1l",
        productId: "prod-amul-ghee-1l",
        title: "Amul Pure Cow Ghee (Clarified Butter)",
        brand: "Amul",
        packSize: "1 Litre",
        price: 112,
        mrp: 130,
        quantity: 1,
        image: getProductImage("prod-amul-ghee-1l", ""),
        originCountry: "India",
      },
    ],
    totalCents: 36700,
    status: "delivered",
    createdAt: "2026-03-24T14:30:00Z",
    deliveredAt: "2026-03-25T11:20:00Z",
  },
]
