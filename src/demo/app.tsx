import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clipboard,
  Github,
  Layers3,
  Monitor,
  Moon,
  RotateCcw,
  Sun,
} from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CountedInput } from '@/registry/ui/counted-input'
import { CountedTextarea } from '@/registry/ui/counted-textarea'
import { EmptyState } from '@/registry/ui/empty-state'
import { MultiSelect } from '@/registry/ui/multi-select'
import { StatusTag } from '@/registry/ui/status-tag'
import { Steps } from '@/registry/ui/steps'
import {
  type AccentColor,
  type ColorMode,
  ThemeProvider,
  useTheme,
} from '@/theme/theme-provider'
import { DocsPage } from './docs-page'
import { SourceComponents } from './source-components'

const COMPONENTS = [
  { id: 'counted-input', name: 'Counted Input', group: '表单' },
  { id: 'counted-textarea', name: 'Counted Textarea', group: '表单' },
  { id: 'multi-select', name: 'Multi Select', group: '表单' },
  { id: 'steps', name: 'Steps', group: '流程' },
  { id: 'status-tag', name: 'Status Tag', group: '展示' },
  { id: 'empty-state', name: 'Empty State', group: '展示' },
  { id: 'input-count', name: 'Input Count', group: '辅助' },
  { id: 'input', name: 'Input', group: '表单' },
  { id: 'textarea', name: 'Textarea', group: '表单' },
  { id: 'select', name: 'Select', group: '表单' },
  { id: 'pagination', name: 'Pagination', group: '导航' },
  { id: 'table', name: 'Table', group: '数据' },
  { id: 'desc-list', name: 'Desc List', group: '展示' },
  { id: 'money-text', name: 'Money Text', group: '展示' },
  { id: 'time-text', name: 'Time Text', group: '展示' },
  { id: 'result-card', name: 'Result Card', group: '反馈' },
  { id: 'data-table', name: 'Data Table', group: '业务' },
] as const

const ACCENTS: { id: AccentColor; label: string; color: string }[] = [
  { id: 'cobalt', label: '钴蓝', color: '#3158c8' },
  { id: 'orange', label: '橘红', color: '#db5817' },
  { id: 'forest', label: '森林绿', color: '#18805a' },
  { id: 'violet', label: '紫罗兰', color: '#7046ca' },
]

const MODES: { id: ColorMode; label: string; icon: React.ReactNode }[] = [
  { id: 'light', label: '浅色', icon: <Sun className="size-4" /> },
  { id: 'dark', label: '深色', icon: <Moon className="size-4" /> },
  { id: 'system', label: '系统', icon: <Monitor className="size-4" /> },
]

const OPTIONS = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Tailwind CSS', value: 'tailwind' },
  { label: 'Radix UI', value: 'radix' },
  { label: 'Vite', value: 'vite' },
  { label: 'Vitest', value: 'vitest' },
] as const

const STEP_ITEMS = [
  { title: '选择组件', description: '查看用法和依赖' },
  { title: '安装源码', description: '加入你的项目' },
  { title: '定制主题', description: '对齐设计令牌' },
]

function CopyButton({
  value,
  label = '复制',
}: {
  value: string
  label?: string
}) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? '已复制' : label}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {copied ? (
        <Check className="size-3.5" />
      ) : (
        <Clipboard className="size-3.5" />
      )}
      {copied ? '已复制' : label}
    </button>
  )
}

function ThemeControls() {
  const { mode, accent, setMode, setAccent } = useTheme()

  return (
    <div className="grid gap-5 rounded-2xl border bg-card p-5 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center lg:p-6">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
          Live theme
        </p>
        <h2 className="mt-1 font-editorial text-2xl">一处换色，全部响应。</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          切换主题色和明暗模式，观察下面所有组件。
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
              title={option.label}
              className={cn(
                'grid size-9 place-items-center rounded-full border-2 border-card outline outline-1 outline-border transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring',
                accent === option.id && 'outline-2 outline-primary',
              )}
              style={{ backgroundColor: option.color }}
            >
              {accent === option.id ? (
                <Check className="size-4 text-white" />
              ) : null}
            </button>
          ))}
        </fieldset>
        <fieldset className="flex rounded-lg bg-muted p-1">
          <legend className="sr-only">明暗模式</legend>
          {MODES.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setMode(option.id)}
              title={option.label}
              aria-label={option.label}
              aria-pressed={mode === option.id}
              className={cn(
                'grid size-8 place-items-center rounded-md text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                mode === option.id && 'bg-card text-foreground shadow-sm',
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

type SpecimenProps = {
  id: string
  number: string
  title: string
  category: string
  description: string
  code: string
  children: React.ReactNode
}

function Specimen({
  id,
  number,
  title,
  category,
  description,
  code,
  children,
}: SpecimenProps) {
  const command = `pnpm dlx shadcn@latest add naerzl/jing-ui/${id}`
  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex gap-4">
          <span className="pt-1 font-mono text-xs text-muted-foreground">
            {number}
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {category}
            </p>
            <h3 className="mt-1 font-editorial text-3xl tracking-tight">
              {title}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        <a
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          href={`${import.meta.env.BASE_URL}?doc=components%2F${id}`}
        >
          文档 <ArrowUpRight className="size-3.5" />
        </a>
      </div>
      <div className="mt-6 overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex min-h-52 items-center justify-center p-6 sm:p-9">
          {children}
        </div>
        <div className="border-t bg-muted/40 px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <code className="overflow-x-auto whitespace-nowrap font-mono text-[11px] text-foreground">
              {command}
            </code>
            <CopyButton value={command} label="复制命令" />
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-lg border border-border/70 bg-card/50">
        <div className="flex items-center justify-between border-b px-4 py-2.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Usage
          </span>
          <CopyButton value={code} label="复制代码" />
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-muted-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </section>
  )
}

function Catalog() {
  const [name, setName] = React.useState('')
  const [note, setNote] = React.useState('')
  const [selected, setSelected] = React.useState<string[]>([
    'react',
    'typescript',
  ])
  const [currentStep, setCurrentStep] = React.useState(1)
  const [created, setCreated] = React.useState(false)

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-8">
          <a
            href="#top"
            className="flex items-center gap-3 font-semibold tracking-tight"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Layers3 className="size-5" />
            </span>
            <span>
              jing<span className="text-primary">/</span>ui
            </span>
            <span className="ml-1 hidden rounded-full border px-2 py-0.5 font-mono text-[10px] font-normal text-muted-foreground sm:inline">
              v0.2.2
            </span>
          </a>
          <div className="flex items-center gap-4">
            <a
              className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline"
              href="#components"
            >
              组件
            </a>
            <a
              className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline"
              href={`${import.meta.env.BASE_URL}?doc=architecture`}
            >
              架构
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              href="https://github.com/naerzl/jing-ui"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="size-4" /> GitHub{' '}
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-28 md:px-8 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <nav aria-label="组件目录" className="sticky top-24 pt-11">
            <p className="mb-4 pl-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Catalog / {String(COMPONENTS.length).padStart(2, '0')}
            </p>
            {COMPONENTS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {item.name}
                <span className="text-[10px]">{item.group}</span>
              </a>
            ))}
            <div className="mt-8 border-t pt-6">
              <p className="pl-3 text-xs leading-6 text-muted-foreground">
                源码可复制，设计可延展。
                <br />
                每个组件都能独立安装。
              </p>
            </div>
          </nav>
        </aside>

        <main id="top" className="min-w-0">
          <div className="relative overflow-hidden py-14 sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Personal component registry <ArrowRight className="size-3" />
            </span>
            <h1 className="mt-7 max-w-3xl font-editorial text-5xl leading-[1.03] tracking-[-0.035em] sm:text-7xl">
              组件有自己的
              <br />
              <em className="font-normal text-primary">生长方式。</em>
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              基于 shadcn 的源码分发仓库。为常见交互整理清晰的
              API，让组件在你的项目里继续演化。
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span>React 18</span>
              <span className="size-1 rounded-full bg-primary" />
              <span>TypeScript</span>
              <span className="size-1 rounded-full bg-primary" />
              <span>Tailwind 3</span>
              <span className="size-1 rounded-full bg-primary" />
              <span>GitHub Registry</span>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 top-8 hidden rotate-[-13deg] font-editorial text-[210px] leading-none text-primary/5 xl:block"
            >
              J
            </div>
          </div>

          <ThemeControls />

          <div id="components" className="scroll-mt-24 pt-16">
            <div className="mb-9 flex items-end justify-between gap-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                  The collection
                </p>
                <h2 className="mt-2 font-editorial text-4xl">组件目录</h2>
              </div>
              <p className="hidden max-w-xs text-right text-xs leading-5 text-muted-foreground sm:block">
                点击预览，修改状态，复制命令。
                <br />
                每一处颜色都跟随上方主题。
              </p>
            </div>
            <div className="space-y-16">
              <Specimen
                id="counted-input"
                number="01"
                title="Counted Input"
                category="Form"
                description="保留 shadcn 输入框的基础能力，增加字数上限和单位后缀。"
                code={
                  '<CountedInput maxLength={24} unit="字" value={name} onChange={event => setName(event.target.value)} />'
                }
              >
                <div className="w-full max-w-md">
                  <label
                    htmlFor="demo-name"
                    className="mb-2 block text-sm font-medium"
                  >
                    组件名称
                  </label>
                  <CountedInput
                    id="demo-name"
                    maxLength={24}
                    unit="字"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="给你的组件取一个名字"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    输入内容，观察右侧实时计数。
                  </p>
                </div>
              </Specimen>
              <Specimen
                id="counted-textarea"
                number="02"
                title="Counted Textarea"
                category="Form"
                description="在文本域里保持清晰的剩余空间，支持受控与非受控写法。"
                code={
                  '<CountedTextarea maxLength={120} value={note} onChange={event => setNote(event.target.value)} />'
                }
              >
                <div className="w-full max-w-md">
                  <label
                    htmlFor="demo-note"
                    className="mb-2 block text-sm font-medium"
                  >
                    设计说明
                  </label>
                  <CountedTextarea
                    id="demo-note"
                    maxLength={120}
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="写下这个组件要解决的问题…"
                  />
                </div>
              </Specimen>
              <Specimen
                id="multi-select"
                number="03"
                title="Multi Select"
                category="Form"
                description="搜索、选择当前结果、取消全选与清空，所有值由调用方管理。"
                code={
                  '<MultiSelect options={options} value={selected} onValueChange={setSelected} aria-label="技术栈" />'
                }
              >
                <div className="w-full max-w-md">
                  <span className="mb-2 block text-sm font-medium">
                    使用的技术
                  </span>
                  <MultiSelect
                    options={OPTIONS}
                    value={selected}
                    onValueChange={setSelected}
                    aria-label="技术栈"
                    placeholder="选择技术栈"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    试试搜索 “t”，再点击全选。
                  </p>
                </div>
              </Specimen>
              <Specimen
                id="steps"
                number="04"
                title="Steps"
                category="Process"
                description="把多步流程的位置讲清楚，提供行内和卡片两种布局。"
                code={
                  '<Steps items={items} current={currentStep} variant="cards" />'
                }
              >
                <div className="w-full">
                  <Steps
                    items={STEP_ITEMS}
                    current={currentStep}
                    variant="cards"
                  />
                  <div className="mt-6 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentStep(Math.max(0, currentStep - 1))
                      }
                      disabled={currentStep === 0}
                    >
                      上一步
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        setCurrentStep(
                          Math.min(STEP_ITEMS.length - 1, currentStep + 1),
                        )
                      }
                      disabled={currentStep === STEP_ITEMS.length - 1}
                    >
                      下一步
                    </Button>
                  </div>
                </div>
              </Specimen>
              <Specimen
                id="status-tag"
                number="05"
                title="Status Tag"
                category="Display"
                description="状态语义由文案和颜色共同表达，三种样式适合不同密度。"
                code={
                  '<StatusTag tone="success">已完成</StatusTag>\n<StatusTag tone="warning" variant="outline">待处理</StatusTag>'
                }
              >
                <div className="grid w-full max-w-2xl gap-4">
                  <div className="flex flex-wrap gap-3">
                    <StatusTag tone="success">已完成</StatusTag>
                    <StatusTag tone="warning">待处理</StatusTag>
                    <StatusTag tone="danger">已失败</StatusTag>
                    <StatusTag tone="info">运行中</StatusTag>
                    <StatusTag tone="primary">已发布</StatusTag>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <StatusTag tone="success" variant="outline">
                      已完成
                    </StatusTag>
                    <StatusTag tone="warning" variant="outline">
                      待处理
                    </StatusTag>
                    <StatusTag tone="danger" variant="outline">
                      已失败
                    </StatusTag>
                    <StatusTag tone="primary" variant="solid">
                      重点
                    </StatusTag>
                  </div>
                </div>
              </Specimen>
              <Specimen
                id="empty-state"
                number="06"
                title="Empty State"
                category="Display"
                description="给空列表一个明确解释和下一步操作，而不只留下一片空白。"
                code={
                  '<EmptyState title="还没有组件" description="创建第一条记录后会显示在这里。" action={<Button>创建组件</Button>} />'
                }
              >
                <div className="w-full max-w-lg rounded-xl border border-dashed">
                  <EmptyState
                    title={created ? '示例已创建' : '还没有组件'}
                    description={
                      created
                        ? '点击重置可以继续体验空状态。'
                        : '创建第一条记录后，它会出现在你的工作区。'
                    }
                    action={
                      <Button
                        variant={created ? 'outline' : 'default'}
                        onClick={() => setCreated(!created)}
                      >
                        {created ? (
                          <>
                            <RotateCcw className="mr-2 size-4" />
                            重置示例
                          </>
                        ) : (
                          '创建组件'
                        )}
                      </Button>
                    }
                  />
                </div>
              </Specimen>
              <SourceComponents Specimen={Specimen} />
            </div>
          </div>
        </main>
      </div>
      <footer className="border-t bg-card">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-8 text-xs text-muted-foreground md:px-8">
          <span>jing/ui · Source first, theme ready.</span>
          <a
            className="inline-flex items-center gap-1 hover:text-foreground"
            href={`${import.meta.env.BASE_URL}?doc=source-inventory`}
          >
            查看原项目组件盘点 <ArrowUpRight className="size-3" />
          </a>
        </div>
      </footer>
    </div>
  )
}

export function App() {
  return (
    <ThemeProvider>
      {new URLSearchParams(window.location.search).has('doc') ? (
        <DocsPage />
      ) : (
        <Catalog />
      )}
    </ThemeProvider>
  )
}
