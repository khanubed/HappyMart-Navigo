"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Lock, ShieldCheck, Globe } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { setLanguage } from "@/features/ui/localeSlice"
import { ThemeToggle } from "@/components/common/theme-toggle"

export function CheckoutHeader() {
  const dispatch = useAppDispatch()
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const toggleLang = () => {
    dispatch(setLanguage(isZh ? "en" : "zh-HK"))
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo Linking Home */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90 active:scale-98"
          aria-label="Happymart Homepage"
        >
          <div className="relative size-9 overflow-hidden rounded-xl border border-primary/20 bg-primary/10 p-1.5 shadow-2xs">
            <Image
              src="/favicon.ico"
              alt="Happymart"
              width={28}
              height={28}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl leading-none font-black tracking-tight text-foreground">
              Happy<span className="text-accent">mart</span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              Supermarket HK
            </span>
          </div>
        </Link>

        {/* Center/Right: Secure Checkout Indicator */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Lock className="size-3.5 text-primary" />
            <span>{isZh ? "安全結帳" : "Secure Checkout"}</span>
          </div>

          {/* Language Toggle & Theme Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md border border-border/60 hover:bg-muted"
              aria-label="Toggle language"
            >
              <Globe className="size-3.5" />
              <span>{isZh ? "EN" : "繁中"}</span>
            </button>

            <ThemeToggle className="text-foreground" />
          </div>
        </div>
      </div>
    </header>
  )
}
