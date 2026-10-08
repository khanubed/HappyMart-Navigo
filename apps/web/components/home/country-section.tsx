"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Globe } from "lucide-react"
import { countries } from "@workspace/mock-data"
import { useAppSelector } from "@/hooks/store"

export function CountrySection() {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  return (
    <section className="max-w-8xl mx-auto space-y-5 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
            <Globe className="size-3.5" />
            <span>{isZh ? "原產地直選" : "Six Sourced Regions"}</span>
          </div>
          <h2 className="font-heading text-xl font-extrabold text-foreground sm:text-2xl">
            {isZh ? "按國家專區選購" : "Shop By Country of Origin"}
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {isZh
              ? "探索 4,000+ 道地南亞各國進口糧油、香料及零食"
              : "Discover specialty staples and beloved imports from across South Asia"}
          </p>
        </div>

        <Link
          href="/countries"
          className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
        >
          {isZh ? "全部國家" : "View All"} <ArrowRight className="size-3" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
        {countries.map((country) => (
          <Link
            key={country.id}
            href={`/countries/${country.code.toLowerCase()}`}
            className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:border-primary/50 hover:shadow-xs"
          >
            <div>
              {/* Full width Image spanning card edges with top rounded overlap */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                {country.imageUrl ? (
                  <Image
                    src={country.imageUrl}
                    alt={isZh ? country.nameZh : country.nameEn}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : null}
              </div>

              {/* Title & Description */}
              <div className="space-y-1 p-3 pb-0">
                <h3 className="font-heading text-sm font-bold text-foreground transition-colors group-hover:text-primary sm:text-base">
                  {isZh ? country.nameZh : country.nameEn}
                </h3>

                <p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                  {isZh ? country.descriptionZh : country.descriptionEn}
                </p>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between border-t border-border/60 px-3 py-2 text-[11px] font-bold text-primary">
              <span>{isZh ? "進入專區" : "Browse"}</span>
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
