"use client"

import React, { useState } from "react"
import { MessageSquare, Mail, Check, BellRing } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { useAppSelector } from "@/hooks/store"

export function NewsletterWhatsapp() {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  return (
    <section className="max-w-8xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        {/* WhatsApp Direct Help Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-success/30 bg-gradient-to-br from-success/10 via-background to-secondary/30 p-6 shadow-2xs sm:p-8">
          <div className="space-y-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-success/20 text-success">
              <MessageSquare className="size-6" />
            </div>

            <h3 className="font-heading text-xl font-black text-foreground sm:text-2xl">
              {isZh
                ? "需要幫忙？直接 WhatsApp 聯繫我們"
                : "Need Quick Help? WhatsApp Our HK Support Team"}
            </h3>

            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {isZh
                ? "尋找特定進口香料、確認今日配送時段或大宗團購需求，我們親切的客服人員隨時為您服務。"
                : "Looking for a hard-to-find spice, tracking your delivery slot, or inquiring about bulk orders? Chat with our Hong Kong team."}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-muted-foreground">
              <span>
                ✓{" "}
                {isZh
                  ? "中英印巴多語言支援"
                  : "English, Cantonese & Hindi Support"}
              </span>
              <span>
                ✓ {isZh ? "9am - 10pm 即時回覆" : "Daily 9am - 10pm Active"}
              </span>
            </div>
          </div>

          <div className="pt-6">
            <a
              href="https://wa.me/85251234567?text=Hi%20Happymart%20Team%2C%20I%20have%20an%20inquiry%20regarding%20my%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="h-11 gap-2 rounded-xl bg-[#25D366] px-6 font-bold text-white shadow-xs hover:bg-[#20BD5A]">
                <MessageSquare className="size-4 fill-current" />
                {isZh ? "立即 WhatsApp 對話" : "Start WhatsApp Chat"}
              </Button>
            </a>
          </div>
        </div>

        {/* Newsletter Signup Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-secondary/30 p-6 shadow-2xs sm:p-8">
          <div className="space-y-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <BellRing className="size-6" />
            </div>

            <h3 className="font-heading text-xl font-black text-foreground sm:text-2xl">
              {isZh
                ? "訂閱 Happymart 節慶特惠與新品通知"
                : "Join the Happymart HK Club for Weekly Deals"}
            </h3>

            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {isZh
                ? "首單享受獨家立減優惠，第一時間掌握排燈節、齋月限定食材與最新到港好物。"
                : "Get notified about festival pantry restocks, weekly promo codes, and freshly arrived shipments directly to your inbox."}
            </p>

            <ul className="grid grid-cols-2 gap-2 pt-1 text-xs font-medium text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary" />
                {isZh ? "獨家折扣碼" : "Exclusive Member Codes"}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary" />
                {isZh ? "新到港食材速報" : "New Shipment Alerts"}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary" />
                {isZh ? "節慶精選預約" : "Festival Pre-Orders"}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary" />
                {isZh ? "隨時可取消訂閱" : "Zero Spam Promise"}
              </li>
            </ul>
          </div>

          <div className="pt-6">
            {subscribed ? (
              <div className="flex items-center gap-2 rounded-xl border border-success/30 bg-success/15 p-3 text-xs font-bold text-success">
                <Check className="size-4" />
                <span>
                  {isZh
                    ? "感謝訂閱！優惠碼已發送至您的信箱。"
                    : "Thank you for joining! Check your inbox for your welcome discount code."}
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Mail className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      isZh ? "輸入您的電郵地址" : "Enter your email address"
                    }
                    className="h-11 rounded-xl bg-background pl-10"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-11 shrink-0 rounded-xl px-6 font-bold shadow-xs"
                >
                  {isZh ? "立即訂閱" : "Subscribe"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
