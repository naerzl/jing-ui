declare module '*.md' {
  import type { AnchorHTMLAttributes, ComponentType } from 'react'

  const Content: ComponentType<{
    components?: {
      a?: ComponentType<AnchorHTMLAttributes<HTMLAnchorElement>>
    }
  }>
  export default Content
}
