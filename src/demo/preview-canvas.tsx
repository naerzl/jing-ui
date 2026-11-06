import { useEffect, useRef } from 'react'
import { useTheme } from '@/theme/theme-provider'
import { COMPONENT_CATALOG, type ComponentId } from './component-catalog'
import { ComponentExample } from './component-examples'

export function PreviewCanvas({ name }: { name: ComponentId }) {
  const canvasRef = useRef<HTMLElement>(null)
  const { setAccent, setMode } = useTheme()

  useEffect(() => {
    const parentOrigin = document.referrer
      ? new URL(document.referrer).origin
      : window.location.origin
    function receiveTheme(event: MessageEvent<unknown>) {
      if (event.source !== window.parent || event.origin !== parentOrigin)
        return
      const message = event.data
      if (
        typeof message !== 'object' ||
        message === null ||
        !('type' in message) ||
        message.type !== 'jing-ui:theme'
      )
        return
      if (
        'mode' in message &&
        (message.mode === 'light' || message.mode === 'dark')
      )
        setMode(message.mode)
      if (
        'accent' in message &&
        (message.accent === 'cobalt' ||
          message.accent === 'orange' ||
          message.accent === 'forest' ||
          message.accent === 'violet')
      )
        setAccent(message.accent)
      window.parent.postMessage({ type: 'jing-ui:ready', name }, parentOrigin)
      reportSize()
    }

    let frame = 0
    function reportSize() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const baseHeight =
          canvasRef.current?.getBoundingClientRect().height ??
          COMPONENT_CATALOG[name].height
        const overlays = Array.from(
          document.querySelectorAll('[data-radix-popper-content-wrapper]'),
        )
        const overlayBottom = Math.max(
          0,
          ...overlays.map(
            (element) => element.getBoundingClientRect().bottom + 20,
          ),
        )
        window.parent.postMessage(
          {
            type: 'jing-ui:resize',
            name,
            height: Math.ceil(Math.max(baseHeight, overlayBottom)),
          },
          parentOrigin,
        )
      })
    }

    const resizeObserver = new ResizeObserver(reportSize)
    const mutationObserver = new MutationObserver(reportSize)
    if (canvasRef.current) resizeObserver.observe(canvasRef.current)
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    })
    window.addEventListener('message', receiveTheme)
    window.addEventListener('resize', reportSize)
    document.documentElement.dataset.preview = 'true'
    window.parent.postMessage({ type: 'jing-ui:ready', name }, parentOrigin)
    reportSize()
    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('message', receiveTheme)
      window.removeEventListener('resize', reportSize)
      delete document.documentElement.dataset.preview
    }
  }, [name, setAccent, setMode])

  return (
    <main
      ref={canvasRef}
      className="preview-canvas"
      style={{ minHeight: COMPONENT_CATALOG[name].height }}
      aria-label={`${COMPONENT_CATALOG[name].title} 交互预览`}
    >
      <ComponentExample name={name} />
    </main>
  )
}
