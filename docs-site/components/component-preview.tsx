'use client'

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'fumadocs-ui/components/ui/tabs'
import { ArrowUpRight, Code2, Monitor, Play, RotateCcw } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  COMPONENT_CATALOG,
  type ComponentId,
} from '../../src/demo/component-catalog'
import { useAccent } from './theme-controls'

export function ComponentPreview({
  name,
  demoUrl,
}: {
  name: ComponentId
  demoUrl: string
}) {
  const info = COMPONENT_CATALOG[name]
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState<number>(info.height)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [revision, setRevision] = useState(0)
  const [width, setWidth] = useState('responsive')
  const [activeTab, setActiveTab] = useState('preview')
  const { resolvedTheme } = useTheme()
  const { accent } = useAccent()
  const source = useMemo(() => {
    const url = new URL(demoUrl, 'https://jing-ui.local')
    url.searchParams.set('preview', name)
    url.searchParams.set('mode', 'light')
    return {
      href: demoUrl.startsWith('/') ? `${url.pathname}${url.search}` : url.href,
      origin:
        typeof window === 'undefined'
          ? ''
          : new URL(demoUrl, window.location.href).origin,
    }
  }, [demoUrl, name])

  const sendTheme = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: 'jing-ui:theme',
        mode: resolvedTheme === 'dark' ? 'dark' : 'light',
        accent,
      },
      source.origin,
    )
  }, [resolvedTheme, accent, source])

  useEffect(() => {
    function receive(event: MessageEvent<unknown>) {
      if (
        event.origin !== source.origin ||
        event.source !== iframeRef.current?.contentWindow
      )
        return
      const message = event.data
      if (
        typeof message !== 'object' ||
        message === null ||
        !('name' in message) ||
        message.name !== name ||
        !('type' in message)
      )
        return
      if (message.type === 'jing-ui:ready') {
        setReady(true)
        setFailed(false)
      }
      if (
        message.type === 'jing-ui:resize' &&
        'height' in message &&
        typeof message.height === 'number' &&
        Number.isFinite(message.height)
      )
        setHeight(Math.min(1200, Math.max(180, message.height)))
    }
    window.addEventListener('message', receive)
    sendTheme()
    return () => window.removeEventListener('message', receive)
  }, [name, source, sendTheme])

  useEffect(() => {
    if (ready) sendTheme()
  }, [sendTheme, ready])
  // biome-ignore lint/correctness/useExhaustiveDependencies: 每次重置都重新计时，即使上一次仍处于未加载状态。
  useEffect(() => {
    if (ready) return
    const timeout = window.setTimeout(() => setFailed(true), 15000)
    return () => window.clearTimeout(timeout)
  }, [ready, revision])

  function reset() {
    setReady(false)
    setFailed(false)
    setHeight(info.height)
    setRevision((value) => value + 1)
  }

  return (
    <section
      id="preview"
      className="component-preview not-prose"
      aria-label={`${info.title} 组件预览`}
    >
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="preview-tabs"
      >
        <div className="preview-toolbar">
          <TabsList className="preview-tab-list" aria-label="组件示例内容">
            <TabsTrigger value="preview">
              <Play />
              预览
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code2 />
              代码
            </TabsTrigger>
          </TabsList>
          <div className="preview-tools">
            <label className="preview-width">
              <Monitor aria-hidden="true" />
              <span className="sr-only">预览宽度</span>
              <select
                aria-label="预览宽度"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
              >
                <option value="responsive">自适应</option>
                <option value="tablet">平板 · 640px</option>
                <option value="mobile">手机 · 360px</option>
              </select>
            </label>
            <button
              type="button"
              className="preview-reset"
              aria-label="重置组件预览"
              title="重置组件预览"
              onClick={reset}
            >
              <RotateCcw />
            </button>
          </div>
        </div>
        <TabsContent value="preview" forceMount className="preview-panel">
          <div className="preview-stage" data-width={width}>
            <div
              className="preview-frame-wrap"
              style={{
                width:
                  width === 'mobile' ? 360 : width === 'tablet' ? 640 : '100%',
              }}
            >
              {!ready && !failed && (
                <div className="preview-loading" role="status">
                  <span className="preview-skeleton" />
                  <span>正在加载交互预览…</span>
                </div>
              )}
              {failed && (
                <div className="preview-failed" role="status">
                  <p>预览暂时未能加载。</p>
                  <button type="button" onClick={reset}>
                    重新加载
                  </button>
                  <a href={source.href} target="_blank" rel="noreferrer">
                    在新窗口打开
                  </a>
                </div>
              )}
              <iframe
                key={revision}
                ref={iframeRef}
                src={source.href}
                title={`${info.title} 可交互预览`}
                className="preview-frame"
                style={{ height, opacity: ready ? 1 : 0 }}
                onLoad={sendTheme}
                allow="clipboard-write"
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="code" className="preview-code-panel">
          <DynamicCodeBlock
            lang="tsx"
            code={info.code}
            codeblock={{ title: `${name}-example.tsx` }}
          />
        </TabsContent>
      </Tabs>
      <div className="preview-footer">
        <span>
          <span className="preview-status-dot" data-ready={ready} />
          {ready ? '可交互示例' : failed ? '预览未加载' : '正在连接预览'}
        </span>
        <a href={source.href} target="_blank" rel="noreferrer">
          在新窗口打开 <ArrowUpRight />
        </a>
      </div>
    </section>
  )
}
