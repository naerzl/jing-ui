import { createFromSource } from 'fumadocs-core/search/server'
import { source } from '@/lib/source'

// 静态导出：索引在构建时生成，浏览器下载后本地检索。
export const revalidate = false

export const { staticGET: GET } = createFromSource(source)
