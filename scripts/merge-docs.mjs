import { cp, mkdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * 把 docs-site 的静态导出并进演示站的 dist：
 *   docs-site/out/docs -> dist/docs    文档页面（URL 为 /docs/*）
 *   docs-site/out/_next -> dist/_next  Next 的静态资源
 *   docs-site/out/api   -> dist/api    预渲染的搜索索引
 *
 * 构建 docs-site 时必须带上 DOCS_BASE_PATH，页面里的资源路径才会指向 /<base>/_next。
 */
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const outDir = path.join(root, 'docs-site', 'out')
const distDir = path.join(root, 'dist')
const basePath = process.env.DOCS_BASE_PATH ?? ''

async function exists(target) {
  try {
    await stat(target)
    return true
  } catch {
    return false
  }
}

if (process.env.GITHUB_PAGES === 'true' && !basePath) {
  throw new Error(
    '部署到 GitHub Pages 时必须设置 DOCS_BASE_PATH，例如 /jing-ui',
  )
}

if (!(await exists(outDir))) {
  throw new Error('找不到 docs-site/out，请先运行 pnpm build:docs')
}

if (!(await exists(distDir))) {
  throw new Error('找不到 dist，请先运行 pnpm build')
}

for (const entry of ['docs', '_next', 'api', 'icon.svg', 'fonts-license.txt']) {
  const source = path.join(outDir, entry)
  if (!(await exists(source))) continue
  const target = path.join(distDir, entry)
  await rm(target, { recursive: true, force: true })
  await mkdir(path.dirname(target), { recursive: true })
  await cp(source, target, { recursive: true })
  console.log(
    `已复制 ${path.relative(root, source)} -> ${path.relative(root, target)}`,
  )
}

await writeFile(path.join(distDir, '.nojekyll'), '')

if (!basePath) {
  console.log('未设置 DOCS_BASE_PATH：产物按站点根目录生成，只适合本地预览。')
}
