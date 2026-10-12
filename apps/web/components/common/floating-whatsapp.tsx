"use client"

import * as React from "react"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

export function FloatingWhatsApp() {
  const locale = useAppSelector((state) => state.locale?.language)
  const isZh = locale === "zh-HK"
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const message = isZh
    ? "你好 Happymart，我想查詢商品或配送訂單詳情。"
    : "Hello Happymart HK, I have an inquiry regarding a product or order."

  const whatsappUrl = `https://wa.me/85251234567?text=${encodeURIComponent(message)}`

  return (
    <div
      className="fixed bottom-20 right-4 z-40 lg:bottom-6 lg:right-6 select-none print:hidden"
      aria-label="WhatsApp Customer Service"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isZh ? "透過 WhatsApp 聯絡即時客服" : "Chat with us on WhatsApp"}
        title={isZh ? "WhatsApp 專人客服 (+852 5123 4567)" : "WhatsApp Customer Support (+852 5123 4567)"}
        className={cn(
          "group flex items-center gap-2.5 rounded-full p-3 sm:px-4 sm:py-3",
          "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30",
          "hover:bg-[#20ba59] hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-105 active:scale-95",
          "transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-[#25D366]/50"
        )}
      >
        <div className="relative flex items-center justify-center">
          <WhatsAppIcon className="size-6 shrink-0 fill-white" />
          {/* Subtle online pulse indicator */}
          <span className="absolute -top-1 -right-1 flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-100 border border-white" />
          </span>
        </div>

        {/* Text visible on tablet and desktop */}
        <span className="hidden sm:inline-block text-xs font-bold tracking-tight text-white drop-shadow-2xs">
          {isZh ? "WhatsApp 查詢" : "WhatsApp Us"}
        </span>
      </a>
    </div>
  )
}
