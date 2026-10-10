"use client"

import React from "react"
import type { ProductNutrition } from "@workspace/typescript-config/types"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

interface NutritionTableProps {
  nutrition?: ProductNutrition
  className?: string
}

export function NutritionTable({ nutrition, className }: NutritionTableProps) {
  const locale = useAppSelector((state) => state.locale.language)
  const isZh = locale === "zh-HK"

  if (!nutrition) {
    return (
      <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
        {isZh
          ? "此商品為天然原產農產品/調味品，依香港法例獲豁免營養標籤。"
          : "Exempted from standard nutritional panel as raw/unprocessed natural agricultural product under HK regulations."}
      </div>
    )
  }

  const rows = [
    { key: "energy", labelEn: "Energy / Calories", labelZh: "能量 / 熱量", value: nutrition.energy },
    { key: "protein", labelEn: "Protein", labelZh: "蛋白質", value: nutrition.protein },
    { key: "fat", labelEn: "Total Fat", labelZh: "總脂肪", value: nutrition.fat },
    { key: "carbs", labelEn: "Carbohydrates", labelZh: "碳水化合物", value: nutrition.carbohydrates },
    { key: "fiber", labelEn: "Dietary Fiber", labelZh: "膳食纖維", value: nutrition.fiber },
    { key: "sodium", labelEn: "Sodium", labelZh: "鈉", value: nutrition.sodium },
  ]

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xs max-w-xl", className)}>
      <div className="bg-muted/40 p-3 border-b border-border/70 flex items-center justify-between">
        <h4 className="font-heading text-xs font-bold text-foreground uppercase tracking-wider">
          {isZh ? "營養資料標籤 (香港標準)" : "Nutrition Information Panel"}
        </h4>
        {nutrition.servingSize && (
          <span className="text-[11px] font-semibold text-muted-foreground">
            {isZh ? "每份食用量：" : "Serving Size: "} {nutrition.servingSize}
          </span>
        )}
      </div>

      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-border/60 bg-muted/20 text-[11px] text-muted-foreground">
            <th className="p-3 font-semibold">{isZh ? "營養項目" : "Nutrient"}</th>
            <th className="p-3 font-semibold text-right">{isZh ? "每 100 克 / 每份含量" : "Per 100g / Serving"}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {rows.map((r, idx) => {
            if (!r.value) return null
            return (
              <tr key={r.key} className={idx % 2 === 0 ? "bg-background" : "bg-muted/10"}>
                <td className="p-3 font-medium text-foreground">
                  {isZh ? r.labelZh : r.labelEn}
                </td>
                <td className="p-3 font-mono font-bold text-foreground text-right">
                  {r.value}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="p-2.5 bg-muted/20 border-t border-border/60 text-[10px] text-muted-foreground leading-normal">
        {isZh
          ? "* 數值根據原裝進口產品化驗分析所得。每日攝取量百分比以一般成年人每日需要 2,000 千卡熱量為基礎計算。"
          : "* Values are based on verified certified laboratory analysis from origin producer. Percent daily values are based on a 2,000 calorie diet."}
      </div>
    </div>
  )
}
