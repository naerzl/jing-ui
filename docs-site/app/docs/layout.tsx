import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/site-header'
import { ThemeControls } from '@/components/theme-controls'
import { baseOptions } from '@/lib/layout.shared'
import { source } from '@/lib/source'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <DocsLayout
        tree={source.getPageTree()}
        {...baseOptions()}
        sidebar={{
          collapsible: false,
          defaultOpenLevel: 2,
          banner: <p className="sidebar-caption">组件文档</p>,
          footer: (
            <div className="sidebar-footer">
              <div className="sidebar-mobile-theme">
                <ThemeControls />
              </div>
              <a
                href="https://github.com/naerzl/jing-ui"
                target="_blank"
                rel="noreferrer"
              >
                在 GitHub 参与共建 <span aria-hidden="true">↗</span>
              </a>
              <p>源码属于你的项目，风格由你决定。</p>
            </div>
          ),
        }}
      >
        {children}
      </DocsLayout>
    </>
  )
}
