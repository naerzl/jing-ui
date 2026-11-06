'use client'

import { RootProvider } from 'fumadocs-ui/provider/next'
import type { ReactNode } from 'react'
import { StaticSearchDialog } from './search'
import { AccentProvider } from './theme-controls'

const translations: Record<string, string> = {
  'Search(search dialog)': '搜索文档',
  'Search(search trigger)': '搜索文档',
  'Open Search(search trigger)(aria-label)': '打开搜索',
  'Close Search(search dialog)(aria-label)': '关闭搜索',
  'No results found(search dialog)': '没有找到相关内容',
  'Search failed(search dialog)': '搜索失败',
  'On this page(table of contents)': '本页目录',
  'No Headings(table of contents)': '暂无标题',
  'Table of Contents(inline table of contents)': '目录',
  'Previous Page(pagination)': '上一页',
  'Next Page(pagination)': '下一页',
  'Last updated on(page footer)': '最后更新于',
  'Edit on GitHub(edit page)': '在 GitHub 编辑',
  'Toggle Theme(theme switcher)(aria-label)': '切换主题',
  'Light(theme switcher)(aria-label)': '浅色',
  'Dark(theme switcher)(aria-label)': '深色',
  'System(theme switcher)(aria-label)': '跟随系统',
  'Copy Text(code block)(aria-label)': '复制代码',
  'Copied Text(code block)(aria-label)': '已复制',
  'Toggle Menu(mobile menu)(aria-label)': '打开菜单',
  'Open Sidebar(sidebar)(aria-label)': '展开侧栏',
  'Close Sidebar(sidebar)(aria-label)': '收起侧栏',
  'Collapse Sidebar(sidebar)(aria-label)': '折叠侧栏',
  'Hide Sidebar(sidebar)': '隐藏侧栏',
  'Show Sidebar(sidebar)': '显示侧栏',
  'Skip to Content(skip link)': '跳到正文',
  'Page Not Found(404 page)': '页面不存在',
  'Back to Home(404 page)': '返回首页',
  'Prop(type table)': '属性',
  'Type(type table)': '类型',
  'Default(type table)': '默认值',
  'Parameters(type table)': '参数',
  'Returns(type table)': '返回值',
}

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      i18n={{ locale: 'zh-CN', translations }}
      search={{ SearchDialog: StaticSearchDialog }}
      theme={{
        storageKey: 'jing-ui-mode',
        defaultTheme: 'system',
        enableSystem: true,
      }}
    >
      <AccentProvider>{children}</AccentProvider>
    </RootProvider>
  )
}
