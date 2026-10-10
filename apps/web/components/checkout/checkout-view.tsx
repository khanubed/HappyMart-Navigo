"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  UserCheck,
  MapPin,
  Truck,
  MessageSquare,
  CreditCard,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
} from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import {
  setStep,
  setSelectedAddress,
  setCustomAddress,
  setDeliverySlot,
  setDeliveryInstructions,
  setGuestContact,
  setPaymentMethod,
  setTermsAccepted,
  setCompletedOrder,
  type HongKongAddress,
  type DeliveryType,
} from "@/features/checkout/checkoutSlice"
import { clearCart } from "@/features/cart/cartSlice"
import { ContactForm } from "./contact-form"
import { AddressSection } from "./address-section"
import { DeliverySection } from "./delivery-section"
import { DeliveryInstructions } from "./delivery-instructions"
import { PaymentSection } from "./payment-section"
import { CheckoutOrderSummary } from "./checkout-order-summary"
import { PlaceOrderButton } from "./place-order-button"
import { CheckoutSuccessView } from "./checkout-success-view"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export function CheckoutView() {
  const dispatch = useAppDispatch()

  const items = useAppSelector((state) => state.cart.items)
  const appliedCoupon = useAppSelector((state) => state.cart.appliedCoupon)
  const currentUser = useAppSelector((state) => state.auth.user)
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const {
    step: activeStep,
    guestContact,
    customAddress,
    deliveryType,
    slotId,
    selectedDate,
    selectedSlotTime,
    deliveryNotes,
    leaveAtDoor,
    callOnArrival,
    accessCode,
    paymentMethod,
    termsAccepted,
    completedOrder,
  } = useAppSelector((state) => state.checkout)

  const [isProcessing, setIsProcessing] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  // Calculate pricing
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [items])

  const productDiscounts = useMemo(() => {
    return items.reduce((sum, item) => {
      const mrp = item.mrp || item.price
      return sum + Math.max(0, mrp - item.price) * item.quantity
    }, 0)
  }, [items])

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0
    return appliedCoupon.discountCents / 100
  }, [appliedCoupon])

  const deliveryFee = useMemo(() => {
    if (appliedCoupon?.code === "FREESHIP") return 0
    if (deliveryType === "same_day") return 50.0
    if (deliveryType === "instant") return 15.0
    // Standard: Free over HK$500
    return subtotal >= 500 ? 0 : 30.0
  }, [deliveryType, subtotal, appliedCoupon])

  const total = useMemo(() => {
    return Math.max(0, subtotal - couponDiscount + deliveryFee)
  }, [subtotal, couponDiscount, deliveryFee])

  // Step completions
  const isContactComplete = guestContact.verified || !!currentUser
  const isAddressComplete = !!customAddress
  const isDeliveryComplete = !!deliveryType && !!slotId

  const handleStepToggle = (stepNumber: number) => {
    dispatch(setStep(stepNumber))
  }

  // Final Order Submission Handler
  const handlePlaceOrder = () => {
    setValidationError(null)

    if (!isContactComplete) {
      setValidationError(
        isZh ? "請先完成聯絡資料及短訊驗證 (第 1 步)" : "Please verify your contact details first (Step 1)"
      )
      dispatch(setStep(1))
      return
    }

    if (!isAddressComplete) {
      setValidationError(
        isZh ? "請確認或填寫配送地址 (第 2 步)" : "Please select or provide a delivery address (Step 2)"
      )
      dispatch(setStep(2))
      return
    }

    if (!isDeliveryComplete) {
      setValidationError(
        isZh ? "請選擇配送方式及時間窗口 (第 3 步)" : "Please select a delivery method and time slot (Step 3)"
      )
      dispatch(setStep(3))
      return
    }

    if (!termsAccepted) {
      setValidationError(
        isZh
          ? "請勾選同意 Happymart 服務條款及私隱政策"
          : "Please agree to the Terms and Conditions and Privacy Policy to proceed."
      )
      return
    }

    if (items.length === 0) {
      setValidationError(isZh ? "您的購物車內沒有商品" : "Your cart contains no items.")
      return
    }

    setIsProcessing(true)

    // Simulate Razorpay order creation and payment authorization flow in Test Mode
    setTimeout(() => {
      setIsProcessing(false)

      const orderNumber = `HM-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`

      const createdOrder = {
        id: `order-${Date.now()}`,
        orderNumber,
        userId: currentUser?.id || "guest-user",
        items: [...items],
        totalCents: Math.round(total * 100),
        status: "processing" as const,
        createdAt: new Date().toISOString(),
      }

      dispatch(setCompletedOrder(createdOrder))
      dispatch(clearCart())
    }, 1200)
  }

  // If order is completed, show the success confirmation view
  if (completedOrder) {
    const addressStr = customAddress
      ? `${customAddress.unit}, ${customAddress.floor}, ${customAddress.building}, ${customAddress.district}, ${customAddress.region}`
      : "Hong Kong"
    const slotStr = `${selectedDate} • ${selectedSlotTime}`

    return (
      <CheckoutSuccessView
        order={completedOrder}
        addressDetails={addressStr}
        slotDetails={slotStr}
        isZh={isZh}
      />
    )
  }

  // If cart is empty and no completed order
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-16 px-4 text-center space-y-4">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <ShoppingBag className="size-8" />
        </div>
        <h2 className="font-heading text-xl font-bold text-foreground">
          {isZh ? "購物車是空的，無法結帳" : "Your cart is empty"}
        </h2>
        <p className="text-xs text-muted-foreground">
          {isZh ? "請先挑選商品加入購物車後再進行結帳。" : "Please add products to your cart before proceeding to checkout."}
        </p>
        <Link href="/products">
          <Button size="sm" className="font-bold">
            {isZh ? "前往選購商品" : "Browse Products"}
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Checkout 2-column Grid on Desktop, single-column on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Checkout Steps (~65-70% / 8 cols) */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-5">
          {/* Step 1: Contact Information */}
          <StepContainer
            stepNumber={1}
            titleEn="Contact Information"
            titleZh="聯絡資料"
            icon={UserCheck}
            isActive={activeStep === 1}
            isComplete={isContactComplete}
            summaryText={
              isContactComplete
                ? `${currentUser?.email || guestContact.email || ""} • ${currentUser?.phone || guestContact.phone || ""}`
                : undefined
            }
            onToggle={() => handleStepToggle(1)}
            isZh={isZh}
          >
            <ContactForm
              guestContact={guestContact}
              currentUser={currentUser}
              onContactVerified={(c) => {
                dispatch(setGuestContact(c))
                dispatch(setStep(2))
              }}
              isZh={isZh}
            />
          </StepContainer>

          {/* Step 2: Delivery Address */}
          <StepContainer
            stepNumber={2}
            titleEn="Delivery Address"
            titleZh="配送地址"
            icon={MapPin}
            isActive={activeStep === 2}
            isComplete={isAddressComplete}
            summaryText={
              customAddress
                ? `${customAddress.unit}, ${customAddress.building}, ${customAddress.district}`
                : undefined
            }
            onToggle={() => handleStepToggle(2)}
            isZh={isZh}
          >
            <AddressSection
              selectedAddress={customAddress}
              onAddressSelect={(addr) => {
                dispatch(setSelectedAddress(addr.id || null))
                dispatch(setCustomAddress(addr))
                dispatch(setStep(3))
              }}
              isZh={isZh}
            />
          </StepContainer>

          {/* Step 3: Delivery Method & Time Slot */}
          <StepContainer
            stepNumber={3}
            titleEn="Delivery Method & Time Slot"
            titleZh="配送方式及時段"
            icon={Truck}
            isActive={activeStep === 3}
            isComplete={isDeliveryComplete}
            summaryText={
              isDeliveryComplete
                ? `${selectedDate} • ${selectedSlotTime}`
                : undefined
            }
            onToggle={() => handleStepToggle(3)}
            isZh={isZh}
          >
            <DeliverySection
              selectedType={deliveryType}
              selectedSlotId={slotId}
              selectedDate={selectedDate}
              selectedTime={selectedSlotTime}
              subtotal={subtotal}
              onSelectMethod={(type, fee) => {
                dispatch(setDeliverySlot({ type, slotId: slotId || "slot-sched-1" }))
              }}
              onSelectSlot={(sId, date, time) => {
                dispatch(
                  setDeliverySlot({
                    type: deliveryType || "scheduled",
                    slotId: sId,
                    date,
                    time,
                  })
                )
                dispatch(setStep(4))
              }}
              isZh={isZh}
            />
          </StepContainer>

          {/* Step 4: Delivery Instructions (Optional) */}
          <StepContainer
            stepNumber={4}
            titleEn="Delivery Instructions"
            titleZh="配送指示 (選填)"
            icon={MessageSquare}
            isActive={activeStep === 4}
            isComplete={true}
            summaryText={
              leaveAtDoor
                ? isZh ? "放在門口" : "Leave at door"
                : callOnArrival
                ? isZh ? "到達時致電" : "Call on arrival"
                : isZh ? "標準配送" : "Standard instructions"
            }
            onToggle={() => handleStepToggle(4)}
            isZh={isZh}
          >
            <DeliveryInstructions
              leaveAtDoor={leaveAtDoor}
              callOnArrival={callOnArrival}
              accessCode={accessCode}
              notes={deliveryNotes}
              onChange={(data) => dispatch(setDeliveryInstructions(data))}
              isZh={isZh}
            />
          </StepContainer>

          {/* Step 5: Payment Method */}
          <StepContainer
            stepNumber={5}
            titleEn="Payment Method"
            titleZh="付款方式"
            icon={CreditCard}
            isActive={activeStep === 5}
            isComplete={true}
            summaryText={
              paymentMethod === "razorpay"
                ? isZh ? "Razorpay 網上支付 (測試環境)" : "Razorpay Online Payment (Test Mode)"
                : isZh ? "貨到付款 (COD)" : "Cash on Delivery (COD)"
            }
            onToggle={() => handleStepToggle(5)}
            isZh={isZh}
          >
            <PaymentSection
              paymentMethod={paymentMethod}
              onSelectPaymentMethod={(m) => dispatch(setPaymentMethod(m))}
              isZh={isZh}
            />
          </StepContainer>

          {/* Review & Place Order Button */}
          <PlaceOrderButton
            termsAccepted={termsAccepted}
            onToggleTerms={(acc) => dispatch(setTermsAccepted(acc))}
            onPlaceOrder={handlePlaceOrder}
            isProcessing={isProcessing}
            validationError={validationError}
            total={total}
            isZh={isZh}
          />
        </div>

        {/* Right Column: Order Summary (~30-35% / 4 cols) - Sticky on Desktop */}
        <div className="lg:col-span-4">
          <div className="sticky top-20 space-y-4">
            <CheckoutOrderSummary
              items={items}
              subtotal={subtotal}
              productDiscounts={productDiscounts}
              appliedCoupon={appliedCoupon}
              deliveryFee={deliveryFee}
              total={total}
              isZh={isZh}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function StepContainer({
  stepNumber,
  titleEn,
  titleZh,
  icon: Icon,
  isActive,
  isComplete,
  summaryText,
  onToggle,
  isZh,
  children,
}: {
  stepNumber: number
  titleEn: string
  titleZh: string
  icon: React.ElementType
  isActive: boolean
  isComplete: boolean
  summaryText?: string
  onToggle: () => void
  isZh?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-200 overflow-hidden",
        isActive
          ? "border-primary bg-card shadow-xs"
          : isComplete
          ? "border-border/80 bg-card/70 hover:border-primary/40"
          : "border-border/60 bg-muted/20 opacity-80"
      )}
    >
      {/* Header bar */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-4.5 text-left cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={cn(
              "flex size-7 items-center justify-center rounded-full text-xs font-bold shrink-0 transition-colors",
              isComplete
                ? "bg-emerald-600 text-white"
                : isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {isComplete ? <CheckCircle2 className="size-4" /> : stepNumber}
          </div>

          <div className="min-w-0">
            <h3 className="font-heading text-sm sm:text-base font-bold text-foreground">
              {isZh ? titleZh : titleEn}
            </h3>
            {!isActive && summaryText && (
              <p className="text-xs text-muted-foreground truncate font-medium">
                {summaryText}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isActive && isComplete && (
            <span className="text-[11px] font-bold text-primary hover:underline hidden sm:inline-block">
              {isZh ? "更改" : "Change"}
            </span>
          )}
          {isActive ? (
            <ChevronUp className="size-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Accordion Content Body */}
      {isActive && (
        <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-border/40 animate-in fade-in duration-150">
          {children}
        </div>
      )}
    </div>
  )
}
