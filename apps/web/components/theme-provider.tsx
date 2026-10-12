"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { THEMES, DEFAULT_THEME_ID, isValidThemeId, type ThemeConfig } from "@/config/themes"
import type { ThemeId, ThemeMode } from "@workspace/typescript-config/types"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { setThemeId, setThemeMode } from "@/features/ui/themeSlice"

interface ThemeContextValue {
  themeId: ThemeId
  setThemeId: (id: ThemeId) => void
  mode: string | undefined
  setMode: (mode: string) => void
  isDark: boolean
  themes: ThemeConfig[]
  currentTheme: ThemeConfig
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export function useAppTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useAppTheme must be used within a ThemeProvider")
  }
  return context
}

// Re-export useTheme from next-themes for backwards compatibility
export { useTheme }

function ThemeSyncProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const reduxThemeId = useAppSelector((state) => state.theme?.themeId)
  const { theme, setTheme, resolvedTheme } = useTheme()

  const [activeThemeId, setActiveThemeId] = React.useState<ThemeId>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("happymart_theme_id")
      if (isValidThemeId(stored)) return stored
    }
    return reduxThemeId || DEFAULT_THEME_ID
  })

  // Synchronize on mount and apply data-theme attribute
  React.useEffect(() => {
    const stored = localStorage.getItem("happymart_theme_id")
    const initial = isValidThemeId(stored) ? stored : reduxThemeId || DEFAULT_THEME_ID
    setActiveThemeId(initial)
    document.documentElement.setAttribute("data-theme", initial)
  }, [reduxThemeId])

  const handleSetThemeId = React.useCallback(
    (newThemeId: ThemeId) => {
      if (!isValidThemeId(newThemeId)) return
      setActiveThemeId(newThemeId)
      dispatch(setThemeId(newThemeId))
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("happymart_theme_id", newThemeId)
          document.documentElement.setAttribute("data-theme", newThemeId)
        } catch { }
      }
    },
    [dispatch]
  )

  const handleSetMode = React.useCallback(
    (newMode: string) => {
      setTheme(newMode)
      if (newMode === "light" || newMode === "dark" || newMode === "system") {
        dispatch(setThemeMode(newMode as ThemeMode))
      }
    },
    [setTheme, dispatch]
  )

  const currentTheme = React.useMemo(() => {
    return THEMES.find((t) => t.id === activeThemeId) || THEMES[0]!
  }, [activeThemeId])

  const isDark = (resolvedTheme || theme) === "dark"

  const contextValue = React.useMemo<ThemeContextValue>(() => {
    return {
      themeId: activeThemeId,
      setThemeId: handleSetThemeId,
      mode: theme,
      setMode: handleSetMode,
      isDark,
      themes: THEMES,
      currentTheme,
    }
  }, [activeThemeId, handleSetThemeId, theme, handleSetMode, isDark, currentTheme])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      <ThemeSyncProvider>
        <ThemeHotkey />
        {children}
      </ThemeSyncProvider>
    </NextThemesProvider>
  )
}
