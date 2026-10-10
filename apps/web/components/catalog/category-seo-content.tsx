"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ChevronDown, HelpCircle, BookOpen, Layers, ArrowRight } from "lucide-react"
import type { CategorySeoData, CategoryFaqItem } from "@workspace/typescript-config/types"
import { getCategorySeoData } from "@workspace/mock-data"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

export interface CategorySeoContentProps {
  categorySlug: string
  seoData?: CategorySeoData
  className?: string
}

function FaqAccordionItem({
  faq,
  isOpen,
  onToggle,
  isZh,
}: {
  faq: CategoryFaqItem
  isOpen: boolean
  onToggle: () => void
  isZh: boolean
}) {
  const question = isZh ? faq.questionZh : faq.questionEn
  const answer = isZh ? faq.answerZh : faq.answerEn

  return (
    <div className="border-b border-border/60 last:border-b-0">
      <button
        type="button"
        id={`faq-trigger-${faq.id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between py-3.5 text-left text-xs sm:text-sm font-bold text-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-md"
      >
        <span className="pr-4">{question}</span>
        <span
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-full bg-muted/60 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180 bg-primary/10 text-primary"
          )}
        >
          <ChevronDown className="size-3.5" />
        </span>
      </button>

      {/* Answer container: present in DOM for search engines and screen readers */}
      <div
        id={`faq-answer-${faq.id}`}
        role="region"
        aria-labelledby={`faq-trigger-${faq.id}`}
        className={cn(
          "overflow-hidden transition-all duration-200 text-xs sm:text-sm text-muted-foreground leading-relaxed",
          isOpen ? "max-h-96 pb-3.5 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <p>{answer}</p>
      </div>
    </div>
  )
}

export function CategorySeoContent({
  categorySlug,
  seoData: customData,
  className,
}: CategorySeoContentProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const data = customData || getCategorySeoData(categorySlug)
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    // Keep the first FAQ open by default for immediate preview and interaction
    [data.faqs?.[0]?.id || ""]: true,
  })

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const heading = isZh ? data.headingZh : data.headingEn
  const intro = isZh ? data.introZh : data.introEn

  // 1. Build JSON-LD structured data for FAQPage schema
  const faqSchema = data.faqs && data.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map((f) => ({
      "@type": "Question",
      "name": isZh ? f.questionZh : f.questionEn,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": isZh ? f.answerZh : f.answerEn,
      },
    })),
  } : null

  return (
    <section
      aria-label="Category Buying Guide and FAQs"
      className={cn(
        "mt-12 sm:mt-16 border-t border-border/80 pt-10 sm:pt-12 text-foreground space-y-10 sm:space-y-12",
        className
      )}
    >
      {/* Search Engine FAQPage JSON-LD script */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* 1. Introductory Editorial Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <BookOpen className="size-3.5" />
          <span>{isZh ? "食材導購與品類指引" : "Grocery Buying Guide"}</span>
        </div>

        <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
          {heading}
        </h2>

        <p className="max-w-4xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {intro}
        </p>
      </div>

      {/* 2. Buying Guide Sections (if available) */}
      {data.buyingGuide && data.buyingGuide.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {data.buyingGuide.map((guide) => (
            <div
              key={guide.id}
              className="rounded-xl border border-border/80 bg-card p-4 sm:p-5 shadow-2xs space-y-2 transition-all hover:border-primary/40"
            >
              <h3 className="font-heading text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary" />
                {isZh ? guide.headingZh : guide.headingEn}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isZh ? guide.contentZh : guide.contentEn}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 3. Frequently Asked Questions Accordion */}
      {data.faqs && data.faqs.length > 0 && (
        <div className="space-y-4 rounded-2xl border border-border/80 bg-muted/20 p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="size-4 text-primary" />
              <h3 className="font-heading text-sm sm:text-base font-bold text-foreground">
                {isZh ? "常見問題解答 (FAQ)" : "Frequently Asked Questions"}
              </h3>
            </div>
            <span className="text-[11px] text-muted-foreground font-medium">
              {data.faqs.length} {isZh ? "個解答" : "answers"}
            </span>
          </div>

          <div className="divide-y divide-border/60">
            {data.faqs.map((faq) => (
              <FaqAccordionItem
                key={faq.id}
                faq={faq}
                isOpen={Boolean(openFaqIds[faq.id])}
                onToggle={() => toggleFaq(faq.id)}
                isZh={isZh}
              />
            ))}
          </div>
        </div>
      )}

      {/* 4. Related Categories Internal Links Strip */}
      {data.relatedCategories && data.relatedCategories.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Layers className="size-3.5 text-primary" />
            <span>{isZh ? "相關探索分類" : "Explore Related Categories"}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.relatedCategories.map((rel) => (
              <Link
                key={rel.slug}
                href={`/categories/${rel.slug}`}
                className="group inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-2xs"
              >
                <span>{isZh ? rel.nameZh : rel.nameEn}</span>
                <ArrowRight className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
