"use client"

import React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export interface SectionHeaderProps {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  viewAllHref?: string
  viewAllLabel?: string
  actions?: React.ReactNode
  headingLevel?: "h2" | "h3"
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = "View All",
  actions,
  headingLevel = "h2",
  className,
}: SectionHeaderProps) {
  const Heading = headingLevel

  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="space-y-1">
        {/* Eyebrow with decorative rule */}
        {eyebrow && (
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-muted-foreground">
            {typeof eyebrow === "string" ? <span>{eyebrow}</span> : eyebrow}
            <span className="h-px w-8 bg-border" />
          </div>
        )}

        {/* Main Title */}
        <Heading
          className={cn(
            "font-heading font-black text-foreground tracking-tight",
            headingLevel === "h2" ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          )}
        >
          {title}
        </Heading>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-xs text-muted-foreground sm:text-sm">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right side: View all link + extra actions / slider controls */}
      {(viewAllHref || actions) && (
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-0.5 text-xs sm:text-sm font-bold text-primary transition-colors hover:underline hover:text-primary/80"
            >
              <span>{viewAllLabel}</span>
              <ChevronRight className="size-4" />
            </Link>
          )}
          {actions}
        </div>
      )}
    </div>
  )
}
