import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ComponentPreview } from '@/components/component-preview'
import { getMDXComponents } from '@/components/mdx'
import { site } from '@/lib/site'
import { source } from '@/lib/source'
import {
  COMPONENT_CATALOG,
  isComponentId,
} from '../../../../src/demo/component-catalog'

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await props.params
  const page = source.getPage(slug)
  if (!page) notFound()

  const MDX = page.data.body
  const componentName =
    slug?.[0] === 'components' && slug.length === 2 && isComponentId(slug[1])
      ? slug[1]
      : null
  const info = componentName ? COMPONENT_CATALOG[componentName] : null
  const toc = componentName
    ? [{ title: '交互预览', url: '#preview', depth: 2 }, ...page.data.toc]
    : page.data.toc

  return (
    <DocsPage toc={toc} full={page.data.full} className="jing-docs-page">
      {info && (
        <div className="component-page-meta">
          <span>{info.category}</span>
          <a
            href={`${site.github}/blob/main/src/registry/${componentName === 'data-table' ? 'business' : 'ui'}/${componentName}.tsx`}
            target="_blank"
            rel="noreferrer"
          >
            查看源码 ↗
          </a>
        </div>
      )}
      <div className="docs-page-intro">
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
      </div>
      {componentName && (
        <ComponentPreview name={componentName} demoUrl={site.demo} />
      )}
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      <a
        className="edit-doc-link"
        href={`${site.github}/edit/main/docs-site/content/docs/${slug?.length ? (slug.length === 1 && slug[0] === 'components' ? 'components/index' : slug.join('/')) : 'index'}.mdx`}
        target="_blank"
        rel="noreferrer"
      >
        帮助完善这篇文档 ↗
      </a>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const page = source.getPage(slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
