"use client"

import React from "react"
import { X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { dismissAnnouncement } from "@/features/ui/uiSlice"
import { cn } from "@workspace/ui/lib/utils"

export interface AnnouncementBarProps {
  id?: string
  message: string
  actionLabel?: string
  onActionClick?: () => void
  className?: string
}

export function AnnouncementBar({
  id = "launch-promo-2026",
  message,
  actionLabel,
  onActionClick,
  className,
}: AnnouncementBarProps) {
  const dispatch = useAppDispatch()
  const dismissedId = useAppSelector(
    (state) => state.ui.announcementDismissedId
  )

  if (dismissedId === id) {
    return null
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center gap-2 bg-primary px-8 py-2 text-center text-xs font-medium text-primary-foreground transition-all",
        className
      )}
    >
      <span className="line-clamp-1">{message}</span>

      {actionLabel && (
        <button
          type="button"
          onClick={onActionClick}
          suppressHydrationWarning
          className="ml-2 font-bold underline underline-offset-2 transition-colors hover:text-accent"
        >
          {actionLabel}
        </button>
      )}

      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => dispatch(dismissAnnouncement(id))}
        suppressHydrationWarning
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded p-1 text-primary-foreground/80 transition-colors hover:bg-white/10 hover:text-primary-foreground"
      >
        <X className="size-3.5" />
      </button>
    </div>
  )
}
