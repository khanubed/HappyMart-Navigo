"use client"

import React, { useState } from "react"
import type { Product, ProductVariant } from "@workspace/typescript-config/types"
import { ProductGallery } from "./product-gallery"
import { ProductPurchasePanel } from "./product-purchase-panel"
import { DeliveryChecker } from "./delivery-checker"
import { TrustPoints } from "./trust-points"
import { BundleCard } from "./bundle-card"
import { ProductDetailsTabs } from "./product-details-tabs"
import { ProductReviews } from "./product-reviews"
import { RelatedProducts } from "./related-products"
import { StickyBuyBar } from "./sticky-buy-bar"

interface ProductDetailViewProps {
  product: Product
  brandSlug: string
  brandProducts: Product[]
  categoryProducts: Product[]
  bundleProducts: Product[]
}

export function ProductDetailView({
  product,
  brandSlug,
  brandProducts,
  categoryProducts,
  bundleProducts,
}: ProductDetailViewProps) {
  const defaultVariant =
    product.variants.find((v) => v.isDefault) || product.variants[0] || {
      id: `${product.id}-default`,
      productId: product.id,
      sku: product.id,
      packSize: "Standard",
      priceCents: 0,
      stockQuantity: 99,
    }

  const [activeVariant, setActiveVariant] = useState<ProductVariant>(defaultVariant)

  const price = (activeVariant.priceCents ?? 0) / 100
  const mrp = activeVariant.mrpCents ? activeVariant.mrpCents / 100 : undefined
  const discount =
    mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* 1. Main 2-Column Section: Gallery (left) + Purchase & Delivery (right) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <ProductGallery
            product={product}
            discountPercent={discount}
          />
        </div>

        {/* Right Column: Info, Purchase Actions & Delivery Checker */}
        <div className="lg:col-span-6 space-y-6">
          <ProductPurchasePanel
            product={product}
            activeVariant={activeVariant}
            onSelectVariant={setActiveVariant}
          />

          {/* Delivery Checker Component */}
          <DeliveryChecker />
        </div>
      </div>

      {/* 2. Trust Points Bar (Authentic import, expiry, secure payment, returns) */}
      <TrustPoints />

      {/* 3. Frequently Bought Together (BundleCard) */}
      {bundleProducts && bundleProducts.length > 0 && (
        <BundleCard
          currentProduct={product}
          bundleProducts={bundleProducts}
        />
      )}

      {/* 4. Details Tabs (Description, Ingredients, Nutrition Table, Storage, Origin & Importer, Policies) */}
      <ProductDetailsTabs
        product={product}
        activeVariant={activeVariant}
      />

      {/* 5. Reviews Section (Summary bars, list, write review) */}
      <ProductReviews product={product} />

      {/* 6. Related Products (Same brand row & same category row) */}
      <RelatedProducts
        currentProductId={product.id}
        brandName={product.brandName}
        brandSlug={brandSlug}
        brandProducts={brandProducts}
        categoryProducts={categoryProducts}
      />

      {/* 7. Sticky Mobile Bar (Intersection Observer on main purchase anchor) */}
      <StickyBuyBar
        product={product}
        activeVariant={activeVariant}
        targetAnchorId="main-purchase-anchor"
      />
    </div>
  )
}
