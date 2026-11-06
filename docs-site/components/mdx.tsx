import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { ComponentDirectory } from './component-directory'
import { DocsOverview } from './docs-overview'

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    DocsOverview,
    ComponentDirectory,
    ...components,
  } satisfies MDXComponents
}

export const useMDXComponents = getMDXComponents

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}
