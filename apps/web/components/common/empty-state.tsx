import React from "react"
import { LucideIcon, PackageOpen } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon: Icon = PackageOpen,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-border bg-card/50",
        className
      )}
    >
      <div className="p-4 rounded-full bg-muted/60 text-muted-foreground mb-4">
        <Icon className="size-8" />
      </div>

      <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">
        {title}
      </h3>

      {description && (
        <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-5 font-semibold text-xs sm:text-sm">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
