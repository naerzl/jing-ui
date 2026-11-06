import { fileURLToPath } from 'node:url'
import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

/**
 * GitHub Pages 上文档站在 /jing-ui/docs/。
 * 构建时通过 DOCS_BASE_PATH=/jing-ui 让 Next 生成带前缀的资源与链接，
 * 本地开发留空，直接访问 http://localhost:3000/docs。
 */
const basePath = process.env.DOCS_BASE_PATH || undefined

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath ?? '' },
  turbopack: { root: fileURLToPath(new URL('..', import.meta.url)) },
}

export default withMDX(config)
