"use client"

import React from "react"
import { Plus, Bell, Loader2 } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { QuantityStepper } from "./quantity-stepper"
import { cn } from "@workspace/ui/lib/utils"

export interface AddToCartButtonProps {
  quantity: number
  inStock: boolean
  maxStock?: number
  onQuantityChange: (qty: number) => void
  onNotifyMe?: () => void
  isLoading?: boolean
  className?: string
  size?: "sm" | "default" | "lg"
}

export function AddToCartButton({
  quantity,
  inStock,
  maxStock = 99,
  onQuantityChange,
  onNotifyMe,
  isLoading = false,
  className,
  size = "default",
}: AddToCartButtonProps) {
  if (!inStock) {
    return (
      <Button
        variant="outline"
        size={size === "sm" ? "sm" : "default"}
        onClick={(e) => {
          e.stopPropagation()
          onNotifyMe?.()
        }}
        className={cn(
          "w-full gap-1.5 text-xs font-semibold text-muted-foreground",
          className
        )}
      >
        <Bell className="size-3.5" />
        Notify Me
      </Button>
    )
  }

  if (quantity > 0) {
    return (
      <QuantityStepper
        value={quantity}
        min={0}
        max={maxStock}
        onChange={onQuantityChange}
        size={size}
        className={cn("w-full justify-between", className)}
      />
    )
  }

  return (
    <Button
      variant="default"
      size={size === "sm" ? "sm" : "default"}
      disabled={isLoading}
      onClick={(e) => {
        e.stopPropagation()
        onQuantityChange(1)
      }}
      className={cn(
        "w-full gap-1 font-semibold shadow-xs transition-all hover:shadow-sm",
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <>
          <Plus className="size-4" />
          <span>Add</span>
        </>
      )}
    </Button>
  )
}
