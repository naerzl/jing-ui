import { ArrowUpRight, Github } from 'lucide-react'
import Link from 'next/link'
import { site } from '@/lib/site'
import { LIBRARY_VERSION } from '../../src/demo/component-catalog'
import { Brand } from './brand'
import { ThemeControls } from './theme-controls'

export function SiteHeader() {
  return (
    <header className="docs-desktop-header">
      <div className="docs-header-inner">
        <Link href="/docs/" aria-label="Jing UI 文档首页">
          <Brand />
        </Link>
        <nav aria-label="主导航">
          <Link href="/docs/" className="header-active">
            文档
          </Link>
          <Link href="/docs/components/">组件</Link>
          <a href={site.demo}>
            演示站 <ArrowUpRight />
          </a>
        </nav>
        <div className="header-actions">
          <a
            className="header-version"
            href={`${site.github}/releases/tag/v${LIBRARY_VERSION}`}
          >
            v{LIBRARY_VERSION}
          </a>
          <ThemeControls />
          <a
            className="header-github"
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub 仓库"
          >
            <Github />
          </a>
        </div>
      </div>
    </header>
  )
}
