import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const basePath = process.env.DOCS_BASE_PATH ?? ''
const registry = JSON.parse(readFileSync('registry.json', 'utf8'))
const errors = []

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name)
    return entry.isDirectory()
      ? htmlFiles(target)
      : entry.name.endsWith('.html')
        ? [target]
        : []
  })
}

for (const item of registry.items) {
  const file = path.join(dist, 'docs', 'components', item.name, 'index.html')
  if (!existsSync(file)) {
    errors.push(`${item.name} 缺少导出的文档页面`)
    continue
  }
  const html = readFileSync(file, 'utf8')
  const frames = [...html.matchAll(/<iframe[^>]+src="([^"]+)"/g)]
  if (
    !frames.some(
      (match) =>
        new URL(
          match[1].replaceAll('&amp;', '&'),
          'https://jing-ui.local',
        ).searchParams.get('preview') === item.name,
    )
  )
    errors.push(`${item.name} 文档缺少对应的预览入口`)
}

const files = htmlFiles(path.join(dist, 'docs'))
for (const file of files) {
  const html = readFileSync(file, 'utf8')
  for (const [tag] of html.matchAll(
    /<(?:a|link|script|img|source|iframe)\b[^>]*>/g,
  )) {
    if (/\brel="(?:preconnect|dns-prefetch)"/.test(tag)) continue
    for (const [, attribute] of tag.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = attribute.replaceAll('&amp;', '&')
      if (/^https?:\/\/(?:localhost|127\.0\.0\.1)/.test(url)) {
        errors.push(`${path.relative(dist, file)} 含有本地地址 ${url}`)
        continue
      }
      if (!url.startsWith('/') || url.startsWith('//')) continue
      const pathname = decodeURIComponent(
        new URL(url, 'https://jing-ui.local').pathname,
      )
      if (
        basePath &&
        pathname !== basePath &&
        !pathname.startsWith(`${basePath}/`)
      ) {
        errors.push(
          `${path.relative(dist, file)} 的链接缺少部署前缀：${pathname}`,
        )
        continue
      }
      const target = path.join(dist, pathname.slice(basePath.length))
      if (
        !existsSync(target) ||
        (statSync(target).isDirectory() &&
          !existsSync(path.join(target, 'index.html')))
      )
        errors.push(
          `${path.relative(dist, file)} 引用了不存在的路径 ${pathname}`,
        )
    }
  }
}

if (!existsSync(path.join(dist, 'api', 'search')))
  errors.push('缺少静态搜索索引')
if (errors.length) throw new Error([...new Set(errors)].join('\n'))
console.log(
  `已验证 ${files.length} 个文档页面、${registry.items.length} 个组件预览及静态资源链接`,
)
