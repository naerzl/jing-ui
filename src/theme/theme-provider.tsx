import * as React from 'react'

export type ColorMode = 'light' | 'dark' | 'system'
export type AccentColor = 'cobalt' | 'orange' | 'forest' | 'violet'

type ThemeContextValue = {
  mode: ColorMode
  accent: AccentColor
  setMode: (mode: ColorMode) => void
  setAccent: (accent: AccentColor) => void
}

const THEME_STORAGE_KEY = 'jing-ui-mode'
const ACCENT_STORAGE_KEY = 'jing-ui-accent'
const ThemeContext = React.createContext<ThemeContextValue | null>(null)

function getStoredMode(): ColorMode {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  return stored === 'light' || stored === 'dark' || stored === 'system'
    ? stored
    : 'system'
}

function getStoredAccent(): AccentColor {
  const stored = localStorage.getItem(ACCENT_STORAGE_KEY)
  return stored === 'orange' || stored === 'forest' || stored === 'violet'
    ? stored
    : 'cobalt'
}

export function ThemeProvider({
  children,
  initialMode,
  initialAccent,
  persist = true,
}: {
  children: React.ReactNode
  initialMode?: ColorMode
  initialAccent?: AccentColor
  persist?: boolean
}) {
  const [mode, setMode] = React.useState<ColorMode>(
    () => initialMode ?? getStoredMode(),
  )
  const [accent, setAccent] = React.useState<AccentColor>(
    () => initialAccent ?? getStoredAccent(),
  )

  React.useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const isDark = mode === 'dark' || (mode === 'system' && media.matches)
      document.documentElement.classList.toggle('dark', isDark)
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    }
    apply()
    media.addEventListener('change', apply)
    if (persist) localStorage.setItem(THEME_STORAGE_KEY, mode)
    return () => media.removeEventListener('change', apply)
  }, [mode, persist])

  React.useEffect(() => {
    document.documentElement.dataset.accent = accent
    if (persist) localStorage.setItem(ACCENT_STORAGE_KEY, accent)
  }, [accent, persist])

  return (
    <ThemeContext.Provider value={{ mode, accent, setMode, setAccent }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) throw new Error('useTheme 必须在 ThemeProvider 内使用')
  return context
}
