import { ArrowUpRight, Braces, Palette, Terminal } from 'lucide-react'
import Link from 'next/link'
import { site } from '@/lib/site'
import {
  COMPONENT_IDS,
  LIBRARY_VERSION,
} from '../../src/demo/component-catalog'
import { ComponentPreview } from './component-preview'

export function DocsOverview() {
  return (
    <div className="docs-overview not-prose">
      <div className="overview-summary">
        <span>
          <span className="release-dot" />v{LIBRARY_VERSION}
        </span>
        <span>{COMPONENT_IDS.length} 个可安装组件</span>
        <span>React + TypeScript</span>
      </div>
      <div className="overview-start">
        <div>
          <Terminal />
          <h2>从一个组件开始</h2>
          <p>查看效果，复制命令，把可继续修改的源码加入项目。</p>
          <code>pnpm dlx shadcn@latest add naerzl/jing-ui/input</code>
          <Link href="/docs/components/input/">
            使用 Input <ArrowUpRight />
          </Link>
        </div>
        <nav aria-label="快速入口">
          <Link href="/docs/components/">
            <Braces />
            <span>
              <strong>浏览组件</strong>
              <small>表单、数据与业务组合</small>
            </span>
            <ArrowUpRight />
          </Link>
          <Link href="/docs/theming/">
            <Palette />
            <span>
              <strong>定制主题</strong>
              <small>让组件符合你的产品风格</small>
            </span>
            <ArrowUpRight />
          </Link>
          <Link href="/docs/contributing/">
            <Terminal />
            <span>
              <strong>添加组件</strong>
              <small>实现、文档与源码分发</small>
            </span>
            <ArrowUpRight />
          </Link>
        </nav>
      </div>
      <div className="overview-preview-heading">
        <div>
          <h2>先试一个组件</h2>
          <p>搜索、选择、清空，看看 Multi Select 如何工作。</p>
        </div>
        <Link href="/docs/components/multi-select/">
          完整文档 <ArrowUpRight />
        </Link>
      </div>
      <ComponentPreview name="multi-select" demoUrl={site.demo} />
    </div>
  )
}
