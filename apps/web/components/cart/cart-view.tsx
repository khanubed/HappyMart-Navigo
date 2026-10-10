"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import {
  updateQuantity,
  removeFromCart,
  undoRemove,
  saveForLater,
  moveToCart,
  removeSavedItem,
  applyCoupon,
  removeCoupon,
  addToCart,
  type CartItem,
} from "@/features/cart/cartSlice"
import { ProgressBar } from "./progress-bar"
import { CartLineItem } from "./cart-line-item"
import { CouponInput } from "./coupon-input"
import { OrderSummary } from "./order-summary"
import { SavedItems } from "./saved-items"
import { ProductRow } from "./product-row"
import { EmptyState } from "./empty-state"
import { products as allProducts } from "@workspace/mock-data"
import { Button } from "@workspace/ui/components/button"

export function CartView() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const savedItems = useAppSelector((state) => state.cart.savedItems)
  const appliedCoupon = useAppSelector((state) => state.cart.appliedCoupon)
  const lastRemovedItem = useAppSelector((state) => state.cart.lastRemovedItem)
  const pendingItemIds = useAppSelector((state) => state.cart.pendingItemIds)
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const totalItemsCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }, [items])

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [items])

  const productDiscounts = useMemo(() => {
    return items.reduce((sum, item) => {
      const mrp = item.mrp || item.price
      return sum + Math.max(0, mrp - item.price) * item.quantity
    }, 0)
  }, [items])

  const deliveryThreshold = 500
  const isFreeDelivery = subtotal >= deliveryThreshold || appliedCoupon?.code === "FREESHIP"
  const deliveryFee = isFreeDelivery ? 0 : 30.0

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0
    return appliedCoupon.discountCents / 100
  }, [appliedCoupon])

  const total = useMemo(() => {
    return Math.max(0, subtotal - couponDiscount + deliveryFee)
  }, [subtotal, couponDiscount, deliveryFee])

  // Get curated suggestions excluding current cart items
  const suggestedProducts = useMemo(() => {
    const currentProductIds = new Set(items.map((i) => i.productId))
    return allProducts
      .filter((p) => !currentProductIds.has(p.id))
      .slice(0, 4)
  }, [items])

  const isCartEmpty = items.length === 0

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Top Header: H1, item count & Continue shopping link */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-border/80">
        <div className="flex items-baseline gap-3">
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {isZh ? "購物車" : "Your Cart"}
          </h1>
          {!isCartEmpty && (
            <span className="text-sm font-mono font-bold text-muted-foreground">
              ({totalItemsCount} {isZh ? "件商品" : totalItemsCount === 1 ? "item" : "items"})
            </span>
          )}
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>{isZh ? "繼續購物" : "Continue Shopping"}</span>
        </Link>
      </div>

      {isCartEmpty ? (
        // Empty Cart View
        <div className="space-y-8">
          <EmptyState isZh={isZh} />
          {savedItems.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <SavedItems
                savedItems={savedItems}
                onMoveToCart={(vId) => dispatch(moveToCart(vId))}
                onRemoveSaved={(vId) => dispatch(removeSavedItem(vId))}
                isZh={isZh}
              />
            </div>
          )}
        </div>
      ) : (
        // Two-column layout on Desktop, single-column on mobile
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-6">
          {/* Main Column (~65-70% / 8 cols) */}
          <main className="lg:col-span-8 space-y-6">
            {/* Free Delivery Progress */}
            <ProgressBar
              subtotal={subtotal}
              threshold={deliveryThreshold}
              isZh={isZh}
            />

            {/* Inline Undo Restoration Banner */}
            {lastRemovedItem && (
              <div className="flex items-center justify-between p-3 rounded-xl border border-primary/20 bg-primary/5 text-xs">
                <span className="font-medium text-foreground">
                  {isZh
                    ? `已移除「${lastRemovedItem.item.title}」`
                    : `"${lastRemovedItem.item.title}" was removed from your cart.`}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => dispatch(undoRemove())}
                  className="h-7 px-3 text-xs font-bold text-primary border-primary/30 hover:bg-primary/10"
                >
                  {isZh ? "復原" : "Undo"}
                </Button>
              </div>
            )}

            {/* Active Cart Line Items */}
            <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="size-4 text-primary" />
                  <span className="font-heading text-sm font-bold text-foreground">
                    {isZh ? "購物籃商品清單" : "Cart Items"}
                  </span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {items.length} {isZh ? "種品項" : items.length === 1 ? "product" : "products"}
                </span>
              </div>

              <div className="divide-y divide-border/60">
                {items.map((item) => (
                  <CartLineItem
                    key={item.variantId}
                    item={item}
                    onUpdateQuantity={(vId, qty) =>
                      dispatch(updateQuantity({ variantId: vId, quantity: qty }))
                    }
                    onRemove={(vId) => dispatch(removeFromCart(vId))}
                    onSaveForLater={(vId) => dispatch(saveForLater(vId))}
                    isPending={pendingItemIds.includes(item.variantId)}
                    isZh={isZh}
                  />
                ))}
              </div>
            </div>

            {/* Mobile / Tablet Order Summary (Appears after line items on small screens) */}
            <div className="block lg:hidden space-y-4">
              <div className="rounded-xl border border-border bg-card p-4 shadow-2xs">
                <CouponInput
                  appliedCoupon={appliedCoupon}
                  subtotal={subtotal}
                  deliveryFee={deliveryFee}
                  onApply={(coupon) => dispatch(applyCoupon(coupon))}
                  onRemove={() => dispatch(removeCoupon())}
                  isZh={isZh}
                />
              </div>

              <OrderSummary
                subtotal={subtotal}
                productDiscount={productDiscounts}
                couponDiscount={couponDiscount}
                deliveryFee={deliveryFee}
                total={total}
                isCartEmpty={isCartEmpty}
                isZh={isZh}
              />
            </div>

            {/* Saved For Later Section */}
            {savedItems.length > 0 && (
              <SavedItems
                savedItems={savedItems}
                onMoveToCart={(vId) => dispatch(moveToCart(vId))}
                onRemoveSaved={(vId) => dispatch(removeSavedItem(vId))}
                isZh={isZh}
              />
            )}

            {/* Product Suggestions Row */}
            {suggestedProducts.length > 0 && (
              <ProductRow
                products={suggestedProducts}
                onAddToCart={(item) => dispatch(addToCart(item))}
                isZh={isZh}
              />
            )}
          </main>

          {/* Sidebar (~30-35% / 4 cols) - Sticky on Desktop */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              {/* Promo Code Input Card */}
              <div className="rounded-xl border border-border bg-card p-4 shadow-2xs">
                <CouponInput
                  appliedCoupon={appliedCoupon}
                  subtotal={subtotal}
                  deliveryFee={deliveryFee}
                  onApply={(coupon) => dispatch(applyCoupon(coupon))}
                  onRemove={() => dispatch(removeCoupon())}
                  isZh={isZh}
                />
              </div>

              {/* Order Summary & Checkout */}
              <OrderSummary
                subtotal={subtotal}
                productDiscount={productDiscounts}
                couponDiscount={couponDiscount}
                deliveryFee={deliveryFee}
                total={total}
                isCartEmpty={isCartEmpty}
                isZh={isZh}
              />
            </div>
          </aside>
        </div>
      )}

      {/* Compact Sticky Checkout Bar for Mobile Screens */}
      {!isCartEmpty && (
        <div className="lg:hidden fixed bottom-14 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border px-4 py-2.5 shadow-lg">
          <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
            <div>
              <span className="text-[10px] text-muted-foreground block font-medium">
                {isZh ? "預計總額" : "Estimated Total"}
              </span>
              <span className="font-mono text-base font-black text-primary">
                HK${total.toFixed(2)}
              </span>
            </div>

            <Link href="/checkout" className="flex-1 max-w-[200px]">
              <Button className="w-full h-10 font-bold text-xs shadow-sm">
                {isZh ? "前往結帳" : "Proceed to Checkout"}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
