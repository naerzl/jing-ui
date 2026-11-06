import {
  ArrowUpRight,
  Check,
  Clipboard,
  Github,
  Layers3,
  Monitor,
  Moon,
  Sun,
} from 'lucide-react'
import { type ReactNode, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  type AccentColor,
  type ColorMode,
  ThemeProvider,
  useTheme,
} from '@/theme/theme-provider'
import {
  COMPONENT_CATALOG,
  COMPONENT_IDS,
  type ComponentId,
  isComponentId,
  LIBRARY_VERSION,
} from './component-catalog'
import { ComponentExample } from './component-examples'
import { docPageUrl, docsUrl } from './docs-url'
import { PreviewCanvas } from './preview-canvas'

const ACCENTS: { id: AccentColor; label: string; color: string }[] = [
  { id: 'cobalt', label: '钴蓝', color: '#4561df' },
  { id: 'orange', label: '橘红', color: '#c76639' },
  { id: 'forest', label: '森林绿', color: '#258363' },
  { id: 'violet', label: '紫罗兰', color: '#7b5ac2' },
]
const MODES: { id: ColorMode; label: string; icon: ReactNode }[] = [
  { id: 'light', label: '浅色', icon: <Sun className="size-4" /> },
  { id: 'dark', label: '深色', icon: <Moon className="size-4" /> },
  { id: 'system', label: '系统', icon: <Monitor className="size-4" /> },
]

function CopyButton({
  value,
  label = '复制',
}: {
  value: string
  label?: string
}) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  useEffect(() => {
    if (status === 'idle') return
    const timeout = window.setTimeout(() => setStatus('idle'), 1800)
    return () => window.clearTimeout(timeout)
  }, [status])
  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setStatus('copied')
    } catch {
      setStatus('error')
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={status === 'copied' ? '已复制' : label}
    >
      {status === 'copied' ? (
        <Check className="size-3.5" />
      ) : (
        <Clipboard className="size-3.5" />
      )}
      <span aria-live="polite">
        {status === 'copied'
          ? '已复制'
          : status === 'error'
            ? '复制失败，请手动选择'
            : label}
      </span>
    </button>
  )
}

function ThemeControls() {
  const { mode, accent, setMode, setAccent } = useTheme()
  return (
    <div className="flex flex-wrap items-center justify-between gap-5 rounded-xl border bg-card px-5 py-4">
      <div>
        <h2 className="text-sm font-semibold">试试你的主题</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          预览所有组件在不同主色与明暗模式下的效果。
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <fieldset className="flex items-center gap-2">
          <legend className="sr-only">主题色</legend>
          {ACCENTS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setAccent(option.id)}
              aria-label={`${option.label}主题`}
              aria-pressed={accent === option.id}
              className={cn(
                'grid size-7 place-items-center rounded-full border-2 border-card outline outline-1 outline-border focus-visible:ring-2 focus-visible:ring-ring',
                accent === option.id && 'outline-2 outline-primary',
              )}
              style={{ backgroundColor: option.color }}
            >
              {accent === option.id && (
                <Check className="size-3.5 text-white" />
              )}
            </button>
          ))}
        </fieldset>
        <fieldset className="flex rounded-lg border p-0.5">
          <legend className="sr-only">明暗模式</legend>
          {MODES.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setMode(option.id)}
              aria-label={option.label}
              aria-pressed={mode === option.id}
              className={cn(
                'grid size-8 place-items-center rounded-md text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring',
                mode === option.id && 'bg-muted text-foreground',
              )}
            >
              {option.icon}
            </button>
          ))}
        </fieldset>
      </div>
    </div>
  )
}

function Specimen({ name }: { name: ComponentId }) {
  const component = COMPONENT_CATALOG[name]
  const command = `pnpm dlx shadcn@latest add naerzl/jing-ui/${name}#v${LIBRARY_VERSION}`
  return (
    <section id={name} className="scroll-mt-24 border-t pt-8">
      <div className="mb-5 flex items-start justify-between gap-5">
        <div>
          <p className="mb-2 text-xs text-muted-foreground">
            {component.category}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">
            {component.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {component.description}
          </p>
        </div>
        <a
          href={docPageUrl(`components/${name}`)}
          className="inline-flex shrink-0 items-center gap-1 text-xs text-primary"
        >
          文档 <ArrowUpRight className="size-3.5" />
        </a>
      </div>
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="flex min-h-52 items-center justify-center p-6 sm:p-9">
          <ComponentExample name={name} />
        </div>
        <div className="flex items-center justify-between gap-3 border-t bg-muted/30 px-4 py-3">
          <code className="overflow-x-auto whitespace-nowrap text-[11px]">
            {command}
          </code>
          <CopyButton value={command} label="复制命令" />
        </div>
      </div>
      <details className="mt-3 rounded-lg border bg-card">
        <summary className="cursor-pointer px-4 py-3 text-xs text-muted-foreground">
          查看用法代码
        </summary>
        <div className="flex justify-end border-t px-3 pt-2">
          <CopyButton value={component.code} label="复制代码" />
        </div>
        <pre className="overflow-auto px-4 pb-4 text-xs leading-6 text-muted-foreground">
          <code>{component.code}</code>
        </pre>
      </details>
    </section>
  )
}

function Catalog() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-8">
          <a
            href="#top"
            className="flex items-center gap-2.5 font-semibold tracking-tight"
          >
            <Layers3 className="size-5 text-primary" />
            <span>jing/ui</span>
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              组件演示
            </span>
          </a>
          <div className="flex items-center gap-5">
            <a
              className="text-sm text-muted-foreground hover:text-foreground"
              href={docsUrl}
            >
              文档
            </a>
            <a
              href="https://github.com/naerzl/jing-ui"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub 仓库"
            >
              <Github className="size-5" />
            </a>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-24 md:px-8 lg:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <nav
            aria-label="组件目录"
            className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-auto py-5"
          >
            {Array.from(
              new Set(
                COMPONENT_IDS.map((name) => COMPONENT_CATALOG[name].category),
              ),
            ).map((category) => (
              <div className="mb-6" key={category}>
                <p className="mb-2 px-2 text-xs font-medium text-foreground">
                  {category}
                </p>
                {COMPONENT_IDS.filter(
                  (name) => COMPONENT_CATALOG[name].category === category,
                ).map((name) => (
                  <a
                    href={`#${name}`}
                    key={name}
                    className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    {COMPONENT_CATALOG[name].title}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </aside>
        <main className="min-w-0" id="top">
          <div className="py-12 sm:py-16">
            <div className="mb-5 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border px-2.5 py-1">
                v{LIBRARY_VERSION}
              </span>
              <span>{COMPONENT_IDS.length} 个源码组件</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              先试一试，再放进项目。
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
              每个预览都直接运行分发源码。选择组件、体验交互，复制安装命令后继续按你的需要定制。
            </p>
            <a
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              href={docsUrl}
            >
              打开组件文档 <ArrowUpRight className="size-4" />
            </a>
          </div>
          <ThemeControls />
          <div className="mt-12 grid gap-12">
            {COMPONENT_IDS.map((name) => (
              <Specimen key={name} name={name} />
            ))}
          </div>
        </main>
      </div>
      <footer className="border-t px-5 py-6 text-center text-xs text-muted-foreground">
        Jing UI · 组件源码与预览共同维护
      </footer>
    </div>
  )
}

function LegacyDocsRedirect({ slug }: { slug: string }) {
  const target =
    slug === 'architecture' ||
    slug === 'theming' ||
    slug === 'source-inventory' ||
    slug === 'contributing' ||
    (slug.startsWith('components/') &&
      isComponentId(slug.slice('components/'.length)))
      ? docPageUrl(slug)
      : docsUrl
  useEffect(() => {
    window.location.replace(target)
  }, [target])
  return (
    <main className="p-8 text-sm">
      <a href={target}>正在打开文档，点击这里继续。</a>
    </main>
  )
}

export function App() {
  const params = new URLSearchParams(window.location.search)
  const preview = params.get('preview')
  const mode = params.get('mode')
  const accent = params.get('accent')
  const initialMode = mode === 'light' || mode === 'dark' ? mode : undefined
  const initialAccent =
    accent === 'cobalt' ||
    accent === 'orange' ||
    accent === 'forest' ||
    accent === 'violet'
      ? accent
      : undefined
  if (preview !== null)
    return (
      <ThemeProvider
        initialMode={initialMode}
        initialAccent={initialAccent}
        persist={false}
      >
        {isComponentId(preview) ? (
          <PreviewCanvas name={preview} />
        ) : (
          <main className="p-8 text-sm">
            未找到预览组件。
            <a className="ml-2 text-primary" href={docsUrl}>
              查看组件目录
            </a>
          </main>
        )}
      </ThemeProvider>
    )
  const legacyDoc = params.get('doc')
  if (legacyDoc) return <LegacyDocsRedirect slug={legacyDoc} />
  return (
    <ThemeProvider>
      <Catalog />
    </ThemeProvider>
  )
}
