"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@workspace/ui/components/button"
import { useAppDispatch } from "@/hooks/store"
import { setThemeMode } from "@/features/ui/themeSlice"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const dispatch = useAppDispatch()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className={className} disabled>
        <Sun className="size-4 opacity-50" />
      </Button>
    )
  }

  const isDark = theme === "dark"

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark"
    setTheme(nextTheme)
    dispatch(setThemeMode(nextTheme))
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      className={className}
    >
      {isDark ? (
        <Sun className="size-4 text-warning transition-transform rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="size-4 text-muted-foreground transition-transform -rotate-12 hover:rotate-0" />
      )}
    </Button>
  )
}
