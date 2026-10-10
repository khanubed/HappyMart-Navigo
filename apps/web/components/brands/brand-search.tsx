"use client"

import React, { useRef } from "react"
import { Search, X } from "lucide-react"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

interface BrandSearchProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
}

export function BrandSearch({
  value,
  onChange,
  className,
  placeholder,
}: BrandSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  const defaultPlaceholder = isZh ? "搜尋品牌名稱..." : "Find a brand..."

  const handleClear = () => {
    onChange("")
    inputRef.current?.focus()
  }

  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <label htmlFor="brand-search-input" className="sr-only">
        {isZh ? "搜尋品牌" : "Search brands"}
      </label>
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground/80" />
        <input
          ref={inputRef}
          id="brand-search-input"
          type="search"
          autoComplete="off"
          spellCheck="false"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || defaultPlaceholder}
          className="h-10 w-full rounded-full border border-border bg-card pr-9 pl-10 text-xs sm:text-sm text-foreground shadow-2xs transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={isZh ? "清除搜尋內容" : "Clear search"}
          >
            <X className="size-3.5" />
          </button>
        ) : null}
      </div>
    </div>
  )
}
