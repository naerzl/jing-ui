'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export type Accent = 'cobalt' | 'orange' | 'forest' | 'violet'
const AccentContext = createContext<{
  accent: Accent
  setAccent: (value: Accent) => void
} | null>(null)
const COLORS: { value: Accent; label: string }[] = [
  { value: 'cobalt', label: '钴蓝' },
  { value: 'orange', label: '橘红' },
  { value: 'forest', label: '森林绿' },
  { value: 'violet', label: '紫罗兰' },
]

export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccent] = useState<Accent>('cobalt')
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const stored = localStorage.getItem('jing-ui-accent')
    if (stored === 'orange' || stored === 'forest' || stored === 'violet')
      setAccent(stored)
    setMounted(true)
  }, [])
  useEffect(() => {
    if (!mounted) return
    document.documentElement.dataset.accent = accent
    localStorage.setItem('jing-ui-accent', accent)
  }, [accent, mounted])
  return (
    <AccentContext.Provider value={{ accent, setAccent }}>
      {children}
    </AccentContext.Provider>
  )
}

export function useAccent() {
  const value = useContext(AccentContext)
  if (!value) throw new Error('主题色控件需要 AccentProvider')
  return value
}

export function ThemeControls() {
  const { accent, setAccent } = useAccent()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <div className="docs-theme-controls">
      <fieldset className="accent-picker">
        <legend className="sr-only">主题色</legend>
        {COLORS.map(({ value, label }) => (
          <button
            type="button"
            key={value}
            data-accent-color={value}
            data-active={accent === value}
            aria-label={`${label}主题`}
            aria-pressed={accent === value}
            onClick={() => setAccent(value)}
            title={label}
          >
            <span />
          </button>
        ))}
      </fieldset>
      <span className="theme-divider" aria-hidden="true" />
      <fieldset className="mode-picker">
        <legend className="sr-only">明暗模式</legend>
        {[
          { value: 'light', label: '浅色', Icon: Sun },
          { value: 'dark', label: '深色', Icon: Moon },
          { value: 'system', label: '跟随系统', Icon: Monitor },
        ].map(({ value, label, Icon }) => (
          <button
            type="button"
            key={value}
            aria-label={label}
            title={label}
            aria-pressed={mounted && theme === value}
            data-active={mounted && theme === value}
            onClick={() => setTheme(value)}
          >
            <Icon />
          </button>
        ))}
      </fieldset>
    </div>
  )
}
