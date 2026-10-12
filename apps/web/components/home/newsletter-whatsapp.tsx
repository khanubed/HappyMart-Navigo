"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Check, MessageCircle } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { useAppSelector } from "@/hooks/store"

export function NewsletterWhatsapp() {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email.trim()) return

    // Connect this handler to the newsletter API before production.
    setSubscribed(true)
    setEmail("")
  }

  return (
    <section
      aria-label={isZh ? "聯絡與訂閱" : "Contact and newsletter"}
      className="mx-auto max-w-8xl ppx-4 pt-10 pb-4"
    >
      {/* Customer support */}
      <div className="flex flex-col gap-4 border-y border-border py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#168C48]">
            <MessageCircle className="size-5" />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-foreground sm:text-base">
              {isZh ? "需要購物協助？" : "Need a hand with your shop?"}
            </h2>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {isZh
                ? "查詢商品、配送或訂單，直接聯絡我們。"
                : "Ask us about products, deliveries or your order."}
            </p>
          </div>
        </div>

        <Link
          href="https://wa.me/85251234567"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 w-fit shrink-0 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-muted"
        >
          {isZh ? "WhatsApp 聯絡我們" : "Chat on WhatsApp"}
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      {/* Newsletter */}
      <div className="grid gap-5 py-7 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10 sm:py-9">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {isZh ? "好食材，新優惠。" : "Good food. Good finds."}
          </h2>
          <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {isZh
              ? "訂閱電郵，接收新品到貨及精選優惠。"
              : "Get new arrivals and hand-picked grocery deals in your inbox."}
          </p>
        </div>

        <div className="w-full sm:max-w-md">
          {subscribed ? (
            <div
              role="status"
              className="flex min-h-11 items-center gap-2 text-sm font-medium text-foreground"
            >
              <Check className="size-4 text-primary" />
              {isZh ? "感謝訂閱！" : "Thanks for subscribing!"}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full gap-2">
              <label htmlFor="happymart-newsletter-email" className="sr-only">
                {isZh ? "電郵地址" : "Email address"}
              </label>

              <Input
                id="happymart-newsletter-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isZh ? "輸入電郵地址" : "Your email address"}
                className="h-11 min-w-0 rounded-md bg-background"
              />

              <Button
                type="submit"
                className="h-11 shrink-0 rounded-md px-4 font-medium"
              >
                {isZh ? "訂閱" : "Sign up"}
              </Button>
            </form>
          )}

          <p className="mt-2 text-[11px] text-muted-foreground">
            {isZh
              ? "只發送新品及優惠資訊。"
              : "Occasional updates only. Unsubscribe anytime."}
          </p>
        </div>
      </div>
    </section>
  )
}
