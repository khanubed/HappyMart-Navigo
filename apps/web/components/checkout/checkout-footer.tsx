"use client"

import React from "react"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { useAppSelector } from "@/hooks/store"

export function CheckoutFooter() {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  return (
    <footer className="w-full border-t border-border/70 bg-card/60 py-6 text-xs text-muted-foreground">
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-primary" />
          <span>
            {isZh
              ? "© 2026 Happymart 香港。所有敏感資料均受 256 位元 SSL 加密保護。"
              : "© 2026 Happymart Hong Kong. All sensitive transactions are SSL encrypted."}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors hover:underline"
          >
            {isZh ? "服務條款" : "Terms & Conditions"}
          </Link>
          <span>•</span>
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors hover:underline"
          >
            {isZh ? "私隱政策" : "Privacy Policy"}
          </Link>
          <span>•</span>
          <Link
            href="/delivery-policy"
            className="hover:text-foreground transition-colors hover:underline"
          >
            {isZh ? "配送須知" : "Delivery Policy"}
          </Link>
        </div>
      </div>
    </footer>
  )
}
