import { ArrowLeft, ArrowUpRight, Github, Layers3 } from 'lucide-react'
import type * as React from 'react'
import Architecture from '../../docs/architecture.md'
import CountedInputDoc from '../../docs/components/counted-input.md'
import CountedTextareaDoc from '../../docs/components/counted-textarea.md'
import DataTableDoc from '../../docs/components/data-table.md'
import DescListDoc from '../../docs/components/desc-list.md'
import EmptyStateDoc from '../../docs/components/empty-state.md'
import InputDoc from '../../docs/components/input.md'
import InputCountDoc from '../../docs/components/input-count.md'
import MoneyTextDoc from '../../docs/components/money-text.md'
import MultiSelectDoc from '../../docs/components/multi-select.md'
import PaginationDoc from '../../docs/components/pagination.md'
import ResultCardDoc from '../../docs/components/result-card.md'
import SelectDoc from '../../docs/components/select.md'
import StatusTagDoc from '../../docs/components/status-tag.md'
import StepsDoc from '../../docs/components/steps.md'
import TableDoc from '../../docs/components/table.md'
import TextareaDoc from '../../docs/components/textarea.md'
import TimeTextDoc from '../../docs/components/time-text.md'
import Contributing from '../../docs/contributing.md'
import Inventory from '../../docs/source-inventory.md'
import Theming from '../../docs/theming.md'

const DOCUMENTS = {
  architecture: { title: '技术架构', component: Architecture, group: '指南' },
  theming: { title: '主题与颜色', component: Theming, group: '指南' },
  'source-inventory': {
    title: '原项目组件盘点',
    component: Inventory,
    group: '指南',
  },
  contributing: { title: '新增组件', component: Contributing, group: '指南' },
  'components/counted-input': {
    title: 'Counted Input',
    component: CountedInputDoc,
    group: '组件',
  },
  'components/counted-textarea': {
    title: 'Counted Textarea',
    component: CountedTextareaDoc,
    group: '组件',
  },
  'components/multi-select': {
    title: 'Multi Select',
    component: MultiSelectDoc,
    group: '组件',
  },
  'components/steps': { title: 'Steps', component: StepsDoc, group: '组件' },
  'components/status-tag': {
    title: 'Status Tag',
    component: StatusTagDoc,
    group: '组件',
  },
  'components/empty-state': {
    title: 'Empty State',
    component: EmptyStateDoc,
    group: '组件',
  },
  'components/input-count': {
    title: 'Input Count',
    component: InputCountDoc,
    group: '组件',
  },
  'components/input': { title: 'Input', component: InputDoc, group: '组件' },
  'components/textarea': {
    title: 'Textarea',
    component: TextareaDoc,
    group: '组件',
  },
  'components/select': { title: 'Select', component: SelectDoc, group: '组件' },
  'components/pagination': {
    title: 'Pagination',
    component: PaginationDoc,
    group: '组件',
  },
  'components/table': { title: 'Table', component: TableDoc, group: '组件' },
  'components/desc-list': {
    title: 'Desc List',
    component: DescListDoc,
    group: '组件',
  },
  'components/money-text': {
    title: 'Money Text',
    component: MoneyTextDoc,
    group: '组件',
  },
  'components/time-text': {
    title: 'Time Text',
    component: TimeTextDoc,
    group: '组件',
  },
  'components/result-card': {
    title: 'Result Card',
    component: ResultCardDoc,
    group: '组件',
  },
  'components/data-table': {
    title: 'Data Table · 业务',
    component: DataTableDoc,
    group: '组件',
  },
} as const

type DocumentKey = keyof typeof DOCUMENTS

function isDocumentKey(value: string | null): value is DocumentKey {
  return value !== null && Object.hasOwn(DOCUMENTS, value)
}

function docHref(key: DocumentKey) {
  return `${import.meta.env.BASE_URL}?doc=${encodeURIComponent(key)}`
}

function localDocHref(href: string, current: DocumentKey) {
  if (
    href.startsWith('#') ||
    /^https?:\/\//.test(href) ||
    !href.endsWith('.md')
  )
    return href
  const currentUrl = new URL(`/docs/${current}.md`, 'https://jing-ui.local')
  const next = new URL(href, currentUrl)
  const key = next.pathname.replace(/^\/docs\//, '').replace(/\.md$/, '')
  return isDocumentKey(key) ? docHref(key) : href
}

function DocLink({
  href = '',
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const requested = new URLSearchParams(window.location.search).get('doc')
  const current: DocumentKey = isDocumentKey(requested)
    ? requested
    : 'architecture'
  return <a href={localDocHref(href, current)} {...props} />
}

export function DocsPage() {
  const requested = new URLSearchParams(window.location.search).get('doc')
  const active: DocumentKey = isDocumentKey(requested)
    ? requested
    : 'architecture'
  const document = DOCUMENTS[active]
  const Content = document.component

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-8">
          <a
            href={import.meta.env.BASE_URL}
            className="flex items-center gap-3 font-semibold tracking-tight"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Layers3 className="size-5" />
            </span>
            <span>
              jing<span className="text-primary">/</span>ui
            </span>
            <span className="ml-2 border-l pl-3 text-xs font-normal text-muted-foreground">
              文档
            </span>
          </a>
          <div className="flex items-center gap-4">
            <a
              href={import.meta.env.BASE_URL}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> 组件演示
            </a>
            <a
              href="https://github.com/naerzl/jing-ui"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs hover:bg-accent hover:text-accent-foreground"
            >
              <Github className="size-4" /> GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-24 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <nav aria-label="文档目录" className="sticky top-24 pt-12">
            {(['指南', '组件'] as const).map((group) => (
              <div key={group} className="mb-7">
                <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {group}
                </p>
                {Object.entries(DOCUMENTS)
                  .filter(([, item]) => item.group === group)
                  .map(([key, item]) => (
                    <a
                      key={key}
                      href={docHref(key as DocumentKey)}
                      aria-current={active === key ? 'page' : undefined}
                      className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${active === key ? 'bg-accent font-medium text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
                    >
                      {item.title}
                    </a>
                  ))}
              </div>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 pt-9 lg:pt-12">
          <div className="mb-7 flex flex-wrap gap-2 lg:hidden">
            {Object.entries(DOCUMENTS).map(([key, item]) => (
              <a
                key={key}
                href={docHref(key as DocumentKey)}
                className={`rounded-full border px-3 py-1.5 text-xs ${active === key ? 'border-primary bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
              >
                {item.title}
              </a>
            ))}
          </div>
          <div className="mb-8 flex items-center justify-between border-b pb-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {document.group} / Jing UI
            </span>
            {active.startsWith('components/') ? (
              <a
                href={`${import.meta.env.BASE_URL}#${active.split('/')[1]}`}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                查看交互演示 <ArrowUpRight className="size-3.5" />
              </a>
            ) : null}
          </div>
          <article className="doc-content max-w-[820px]">
            <Content components={{ a: DocLink }} />
          </article>
          <div className="mt-16 border-t pt-6 text-xs text-muted-foreground">
            本页内容来自仓库中的 Markdown 源文件，经 MDX 编译后显示。
          </div>
        </main>
      </div>
    </div>
  )
}
