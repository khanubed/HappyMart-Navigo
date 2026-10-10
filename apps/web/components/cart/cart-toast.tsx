"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { CheckCircle2, AlertCircle, Info, X, Undo2, ArrowRight } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { clearNotification, undoRemove } from "@/features/cart/cartSlice"
import { cn } from "@workspace/ui/lib/utils"

export function CartToast() {
  const dispatch = useAppDispatch()
  const notification = useAppSelector((state) => state.cart.notification)
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  useEffect(() => {
    if (!notification) return

    const timer = setTimeout(() => {
      dispatch(clearNotification())
    }, 7000)

    return () => clearTimeout(timer)
  }, [notification, dispatch])

  if (!notification) return null

  const message = isZh ? notification.messageZh : notification.messageEn
  const actionLabel = isZh ? notification.actionLabelZh : notification.actionLabelEn

  return (
    <aside
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-auto animate-in slide-in-from-bottom-3 duration-200"
    >
      <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-xl text-foreground text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {notification.type === "success" && (
            <CheckCircle2 className="size-4 shrink-0 text-success" />
          )}
          {notification.type === "info" && (
            <Info className="size-4 shrink-0 text-primary" />
          )}
          {notification.type === "error" && (
            <AlertCircle className="size-4 shrink-0 text-destructive" />
          )}

          <span className="font-medium truncate">{message}</span>
        </div>

        {/* Action Link or Undo Button */}
        <div className="flex items-center gap-2 shrink-0">
          {notification.actionType === "undo" && (
            <button
              type="button"
              onClick={() => {
                dispatch(undoRemove())
              }}
              className="inline-flex items-center gap-1 font-bold text-primary hover:underline px-1.5 py-0.5 rounded cursor-pointer"
            >
              <Undo2 className="size-3.5" />
              <span>{actionLabel || (isZh ? "復原" : "Undo")}</span>
            </button>
          )}

          {notification.actionType === "link" && notification.actionHref && (
            <Link
              href={notification.actionHref}
              onClick={() => dispatch(clearNotification())}
              className="inline-flex items-center gap-1 font-bold text-primary hover:underline px-1.5 py-0.5 rounded cursor-pointer"
            >
              <span>{actionLabel || (isZh ? "查看" : "View")}</span>
              <ArrowRight className="size-3" />
            </Link>
          )}

          {/* Dismiss button */}
          <button
            type="button"
            onClick={() => dispatch(clearNotification())}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
