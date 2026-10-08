"use client"

import React from "react"
import { Minus, Plus, Trash2 } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export interface QuantityStepperProps {
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
  disabled?: boolean
  size?: "sm" | "default" | "lg"
  className?: string
  showDeleteAtMin?: boolean
}

export function QuantityStepper({
  value,
  min = 0,
  max = 99,
  step = 1,
  onChange,
  disabled = false,
  size = "default",
  className,
  showDeleteAtMin = true,
}: QuantityStepperProps) {
  const isAtMin = value <= min
  const isAtMax = value >= max

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (!disabled && value > min) {
      onChange(Math.max(min, value - step))
    }
  }

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (!disabled && value < max) {
      onChange(Math.min(max, value + step))
    }
  }

  const sizeClasses = {
    sm: "h-7 text-xs",
    default: "h-8 text-sm",
    lg: "h-10 text-base",
  }[size]

  const buttonSizeClasses = {
    sm: "size-6",
    default: "size-7",
    lg: "size-9",
  }[size]

  return (
    <div
      className={cn(
        "inline-flex items-center justify-between rounded-lg border border-primary/40 bg-primary/10 text-primary p-0.5 select-none transition-colors dark:bg-primary/20",
        sizeClasses,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <button
        type="button"
        aria-label={isAtMin && showDeleteAtMin ? "Remove item" : "Decrease quantity"}
        onClick={handleDecrement}
        disabled={disabled || (isAtMin && !showDeleteAtMin)}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-bold transition-transform active:scale-90 hover:bg-primary/20 disabled:pointer-events-none disabled:opacity-40 text-primary",
          buttonSizeClasses
        )}
      >
        {isAtMin && showDeleteAtMin ? (
          <Trash2 className="size-3.5 text-destructive" />
        ) : (
          <Minus className="size-3.5" />
        )}
      </button>

      <span className="font-mono font-bold px-2.5 text-center min-w-[2rem] tabular-nums text-foreground">
        {value}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={handleIncrement}
        disabled={disabled || isAtMax}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-bold transition-transform active:scale-90 hover:bg-primary/20 disabled:pointer-events-none disabled:opacity-40 text-primary",
          buttonSizeClasses
        )}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}
