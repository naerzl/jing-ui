'use client'

import { useStaticSearch } from 'fumadocs-core/search/client/orama-static'
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search'

/**
 * 静态导出没有服务端，索引由 `app/api/search/route.ts` 预渲染，
 * 浏览器下载后在本地检索；basePath 需手动拼接，fetch 不会自动加前缀。
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function StaticSearchDialog(props: SharedProps) {
  const search = useStaticSearch({ from: `${basePath}/api/search` })

  return (
    <SearchDialog {...search} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList />
      </SearchDialogContent>
    </SearchDialog>
  )
}
