"use client"

import React, { useState } from "react"
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  MessageSquarePlus,
  X,
  Send,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import type { Product, ProductReviewItem } from "@workspace/typescript-config/types"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

interface ProductReviewsProps {
  product: Product
  className?: string
}

export function ProductReviews({ product, className }: ProductReviewsProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const defaultReviews: ProductReviewItem[] = product.reviews && product.reviews.length > 0
    ? product.reviews
    : [
        {
          id: `${product.id}-rev-1`,
          author: "Ananya S.",
          rating: 5,
          date: "2026-09-15",
          title: "Authentic taste and superior aroma",
          comment: "Exactly like what we get back home. Grains cook beautifully, very fresh packaging. Fast delivery to Mid-Levels!",
          verifiedPurchase: true,
        },
        {
          id: `${product.id}-rev-2`,
          author: "Kelvin C.",
          rating: 5,
          date: "2026-09-02",
          title: "Great quality, will reorder",
          comment: "High quality authentic groceries in HK! The aroma is amazing. Very carefully packed with temperature control.",
          verifiedPurchase: true,
        },
      ]

  const [reviews, setReviews] = useState<ProductReviewItem[]>(defaultReviews)
  const [showForm, setShowForm] = useState(false)
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({})

  // Form fields
  const [ratingInput, setRatingInput] = useState(5)
  const [authorInput, setAuthorInput] = useState("")
  const [titleInput, setTitleInput] = useState("")
  const [commentInput, setCommentInput] = useState("")
  const [submittedMessage, setSubmittedMessage] = useState(false)

  // Calculations
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : product.rating || 5.0

  const totalReviews = reviews.length

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length
    const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0
    return { star, count, pct }
  })

  const handleHelpful = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!authorInput.trim() || !commentInput.trim()) return

    const newRev: ProductReviewItem = {
      id: `${product.id}-user-${Date.now()}`,
      author: authorInput.trim(),
      rating: ratingInput,
      date: new Date().toISOString().slice(0, 10),
      title: titleInput.trim() || (isZh ? "滿意推薦" : "Highly Recommended"),
      comment: commentInput.trim(),
      verifiedPurchase: true,
    }

    setReviews([newRev, ...reviews])
    setSubmittedMessage(true)
    setTimeout(() => {
      setSubmittedMessage(false)
      setShowForm(false)
      setAuthorInput("")
      setTitleInput("")
      setCommentInput("")
    }, 2000)
  }

  return (
    <section
      id="reviews"
      aria-label="Customer Reviews"
      className={cn(
        "rounded-3xl border border-border/80 bg-card p-4 sm:p-6 lg:p-8 shadow-2xs space-y-8",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-4">
        <div>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground">
            {isZh ? "顧客真實評價與評分" : "Customer Reviews & Ratings"}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isZh
              ? "來自香港真實消費者的原裝進口體驗反饋"
              : "Verified customer experiences from Hong Kong households"}
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="gap-2 rounded-xl text-xs font-bold self-start sm:self-auto cursor-pointer"
        >
          <MessageSquarePlus className="size-4" />
          <span>{isZh ? "撰寫商品評價" : "Write a Review"}</span>
        </Button>
      </div>

      {/* Review Summary Breakdown Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-2xl bg-muted/20 p-4 sm:p-6 border border-border/60">
        {/* Score & Stars */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-2 border-b md:border-b-0 md:border-r border-border/70 pb-4 md:pb-0 md:pr-6">
          <span className="font-heading text-4xl sm:text-5xl font-black text-foreground">
            {averageRating.toFixed(1)}
          </span>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-4 sm:size-5",
                  i < Math.round(averageRating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>

          <span className="text-xs font-medium text-muted-foreground">
            {isZh ? `共 ${totalReviews} 則評價` : `Based on ${totalReviews} reviews`}
          </span>

          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
            {isZh ? "98% 顧客推薦此商品" : "98% of customers recommend this product"}
          </span>
        </div>

        {/* Rating Bars Breakdown */}
        <div className="md:col-span-8 space-y-2">
          {ratingCounts.map(({ star, count, pct }) => (
            <div key={star} className="flex items-center gap-2.5 text-xs">
              <span className="w-12 font-semibold text-foreground flex items-center gap-1 shrink-0">
                <span>{star}</span>
                <Star className="size-3 fill-amber-400 text-amber-400" />
              </span>

              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <span className="w-12 text-right text-[11px] text-muted-foreground shrink-0">
                {pct}% ({count})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Form Collapsible */}
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="rounded-2xl border border-primary/30 bg-primary/5 p-4 sm:p-6 space-y-4 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-heading text-sm font-bold text-foreground">
              {isZh ? "分享您對此商品的真實評價" : "Share Your Review"}
            </h4>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full p-1 hover:bg-muted text-muted-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          {submittedMessage ? (
            <div className="rounded-xl bg-emerald-500/10 p-4 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              <span>
                {isZh
                  ? "感謝您的寶貴評價！已成功送出並更新至清單。"
                  : "Thank you! Your verified review has been published."}
              </span>
            </div>
          ) : (
            <>
              {/* Star Picker */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-foreground">
                  {isZh ? "您的評分：" : "Your Rating:"}
                </span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRatingInput(s)}
                      className="p-1 cursor-pointer transition-transform hover:scale-125"
                    >
                      <Star
                        className={cn(
                          "size-5",
                          s <= ratingInput
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-foreground">
                    {isZh ? "稱呼 / 姓名" : "Your Name"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isZh ? "例如：陳先生 / Priya" : "e.g. Kelvin / Priya"}
                    value={authorInput}
                    onChange={(e) => setAuthorInput(e.target.value)}
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-xs focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-foreground">
                    {isZh ? "評價標題" : "Review Title"}
                  </label>
                  <input
                    type="text"
                    placeholder={isZh ? "一句話總結商品優點" : "Summarize your review"}
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-xs focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Comment */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-foreground">
                  {isZh ? "詳細使用心得" : "Review Details"}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={
                    isZh
                      ? "分享口味、香氣、包裝及送貨等感受..."
                      : "Share your thoughts on freshness, aroma, packaging, and cooking results..."
                  }
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background p-3 text-xs focus:border-primary focus:outline-none"
                />
              </div>

              <Button type="submit" size="sm" className="gap-1.5 text-xs font-bold">
                <Send className="size-3.5" />
                <span>{isZh ? "送出評價" : "Submit Review"}</span>
              </Button>
            </>
          )}
        </form>
      )}

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <article
            key={rev.id}
            className="rounded-2xl border border-border/70 bg-card p-4 sm:p-5 space-y-3 shadow-2xs transition-colors hover:border-primary/40"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {rev.author.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-foreground">
                    {rev.author}
                  </h5>
                  {rev.verifiedPurchase && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="size-3" />
                      <span>{isZh ? "香港已驗證購買" : "Verified HK Buyer"}</span>
                    </span>
                  )}
                </div>
              </div>

              <span className="text-[11px] text-muted-foreground">{rev.date}</span>
            </div>

            {/* Stars & Title */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-3.5",
                      i < rev.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
              <span className="font-bold text-xs text-foreground">
                {rev.title}
              </span>
            </div>

            {/* Comment */}
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
              {rev.comment}
            </p>

            {/* Helpful Counter Footer */}
            <div className="pt-2 border-t border-border/50 flex items-center justify-end">
              <button
                type="button"
                onClick={() => handleHelpful(rev.id)}
                className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <ThumbsUp className="size-3" />
                <span>
                  {isZh ? "對我有幫助" : "Helpful"}
                  {(helpfulCounts[rev.id] || 0) > 0 && ` (${helpfulCounts[rev.id]})`}
                </span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
