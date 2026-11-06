/**
 * 文档站地址。生产环境与演示站同域，挂在 `docs/` 下；
 * 本地开发时文档站默认由 `pnpm docs:dev` 跑在 3000 端口。
 */
export const docsUrl = import.meta.env.DEV
  ? (import.meta.env.VITE_DOCS_URL ?? 'http://localhost:3000/docs')
  : `${import.meta.env.BASE_URL}docs`

export function docPageUrl(slug: string) {
  return `${docsUrl}/${slug}/`
}
