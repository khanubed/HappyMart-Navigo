"use client"

import * as React from "react"
import Image from "next/image"
import { Palette, Check, Moon, Sun, X, Sparkles, RotateCcw } from "lucide-react"
import { useAppTheme } from "@/components/theme-provider"
import { THEMES, DEFAULT_THEME_ID, type ThemeId } from "@/config/themes"
import { useAppSelector } from "@/hooks/store"
import { cn } from "@workspace/ui/lib/utils"

export function DemoThemeSwitcher() {
  // If explicitly disabled via env, do not render in production
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "false") {
    return null
  }

  const { themeId, setThemeId, mode, setMode } = useAppTheme()
  const locale = useAppSelector((state) => state.locale?.language)
  const isZh = locale === "zh-HK"

  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  if (!mounted) {
    return null
  }

  const activeTheme = THEMES.find((t) => t.id === themeId) ?? THEMES[0]!
  const isDark = mode === "dark"

  const toggleMode = () => {
    setMode(isDark ? "light" : "dark")
  }

  const handleSelectTheme = (id: ThemeId) => {
    setThemeId(id)
  }

  const handleReset = () => {
    setThemeId(DEFAULT_THEME_ID)
    setMode("light")
  }

  return (
    <div
      ref={containerRef}
      className="fixed bottom-20 left-4 z-50 lg:bottom-6 lg:left-6 transition-all select-none print:hidden"
      aria-label="Theme Customizer"
    >
      {/* Floating Trigger Pill */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full shadow-lg border border-border/80",
            "bg-background/95 backdrop-blur-md text-foreground hover:bg-muted/80",
            "transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          )}
          title="Open Theme Switcher"
          aria-expanded={isOpen}
        >
          {/* Active theme logo & indicator */}
          <div className="relative size-6 shrink-0 overflow-hidden rounded-md border border-border/70 shadow-xs">
            <Image
              src={activeTheme.logoSrc}
              alt={activeTheme.name}
              width={24}
              height={24}
              className="size-full object-cover"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-tight">
            <span>{isZh ? activeTheme.nameZh : activeTheme.name}</span>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              Demo
            </span>
          </div>
        </button>
      )}

      {/* Expanded Popover Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="theme-switcher-title"
          className={cn(
            "w-[340px] sm:w-[380px] max-h-[85vh] flex flex-col rounded-2xl shadow-2xl border border-border",
            "bg-card/95 backdrop-blur-xl text-card-foreground overflow-hidden",
            "animate-in fade-in-0 zoom-in-95 duration-200"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                <Palette className="size-4" />
              </div>
              <div>
                <h3 id="theme-switcher-title" className="text-sm font-bold leading-tight">
                  {isZh ? "風格主題展示" : "Theme Switcher"}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-tight">
                  {isZh ? "客戶演示專用多主題切換" : "Client Preview • 5 Retail Palettes"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Light/Dark Toggle */}
              <button
                type="button"
                onClick={toggleMode}
                className={cn(
                  "p-1.5 rounded-lg border border-border/80 hover:bg-muted/80 text-foreground transition-colors cursor-pointer",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                )}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDark ? (
                  <Sun className="size-4 text-warning" />
                ) : (
                  <Moon className="size-4 text-muted-foreground" />
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                aria-label="Close theme switcher"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Theme List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {THEMES.map((item) => {
              const isSelected = item.id === themeId

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTheme(item.id)}
                  className={cn(
                    "w-full flex items-start gap-3 p-2.5 rounded-xl text-left border transition-all cursor-pointer",
                    isSelected
                      ? "border-primary bg-primary/8 shadow-sm ring-1 ring-primary/30"
                      : "border-border/60 hover:border-border hover:bg-muted/40"
                  )}
                >
                  {/* Theme Brand Logo & Color Indicator */}
                  <div className="shrink-0 pt-0.5 flex flex-col items-center gap-1.5">
                    <div className="relative size-9 rounded-lg overflow-hidden border border-border/80 shadow-xs">
                      <Image
                        src={item.logoSrc}
                        alt={item.name}
                        width={36}
                        height={36}
                        className="size-full object-cover"
                      />
                    </div>
                    {/* Mini Color Chips */}
                    <div className="flex items-center gap-1">
                      <span
                        className="size-2 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: item.primaryColor }}
                        title="Primary Color"
                      />
                      <span
                        className="size-2 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: item.accentColor }}
                        title="Accent Color"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold truncate">
                        {isZh ? item.nameZh : item.name}
                      </span>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-primary shrink-0">
                          <Check className="size-3 stroke-[3]" />
                          {isZh ? "當前使用" : "Active"}
                        </span>
                      )}
                    </div>
                    <span className="block text-[10px] text-muted-foreground truncate mb-0.5">
                      {isZh ? item.name : item.nameZh}
                    </span>
                    <p className="text-[11px] text-muted-foreground/90 line-clamp-2 leading-relaxed">
                      {isZh ? item.descriptionZh : item.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-3 py-2.5 border-t border-border bg-muted/20 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Sparkles className="size-3 text-primary" />
              {isDark ? "Dark Mode" : "Light Mode"} • {isZh ? "即時切換無延遲" : "Instant switch"}
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 text-[11px] hover:text-foreground transition-colors cursor-pointer"
            >
              <RotateCcw className="size-3" />
              {isZh ? "重設" : "Reset"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
