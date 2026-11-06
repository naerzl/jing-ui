import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { Brand } from '@/components/brand'
import { site } from './site'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Brand />,
      url: '/docs/',
    },
    themeSwitch: { enabled: false },
    links: [
      {
        type: 'main',
        text: '组件演示',
        url: site.demo,
        external: true,
        on: 'menu',
      },
    ],
  }
}
