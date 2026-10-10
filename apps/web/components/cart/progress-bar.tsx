"use client"

import React from "react"
import { Truck, CheckCircle2 } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export interface ProgressBarProps {
  subtotal: number
  threshold?: number
  isZh?: boolean
  className?: string
}

export function ProgressBar({
  subtotal,
  threshold = 500,
  isZh = false,
  className,
}: ProgressBarProps) {
  const remaining = Math.max(0, threshold - subtotal)
  const isUnlocked = remaining === 0
  const percent = Math.min(100, Math.max(0, Math.round((subtotal / threshold) * 100)))

  return (
    <div
      role="region"
      aria-label={isZh ? "免運費進度" : "Free delivery progress"}
      className={cn(
        "rounded-xl border border-border bg-card p-3 sm:p-4 shadow-2xs space-y-2",
        className
      )}
    >
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-medium">
          {isUnlocked ? (
            <span className="flex items-center gap-1.5 font-bold text-success">
              <CheckCircle2 className="size-4 shrink-0 text-success" />
              <span>{isZh ? "🎉 恭喜！您已享全港免費送貨到府！" : "🎉 You've unlocked free delivery!"}</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-foreground font-semibold">
              <Truck className="size-4 shrink-0 text-primary" />
              <span>
                {isZh ? (
                  <>
                    還差 <strong className="font-mono text-primary font-bold">HK${remaining.toFixed(2)}</strong> 即享免費送貨到府
                  </>
                ) : (
                  <>
                    Add <strong className="font-mono text-primary font-bold">HK${remaining.toFixed(2)}</strong> more for free delivery
                  </>
                )}
              </span>
            </span>
          )}
        </div>
        <span className="font-mono text-xs font-bold text-muted-foreground tabular-nums">
          {percent}%
        </span>
      </div>

      {/* Progress Bar Track */}
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={
          isUnlocked
            ? isZh
              ? "已達成免運費"
              : "Free delivery unlocked"
            : isZh
            ? `免運費進度 ${percent}%`
            : `Free delivery progress ${percent}%`
        }
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            isUnlocked ? "bg-success" : "bg-primary"
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
