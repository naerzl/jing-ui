import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Provider } from '@/components/provider'
import './global.css'

export const metadata: Metadata = {
  title: {
    default: 'Jing UI 文档',
    template: '%s · Jing UI',
  },
  description: '可复制、可组合、可切换主题的 shadcn 组件源码仓库。',
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
