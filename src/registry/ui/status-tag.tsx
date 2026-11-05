import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import './status-tag.css'

export type StatusTone =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'primary'

export type StatusTagProps = {
  children: ReactNode
  tone?: StatusTone
  variant?: 'soft' | 'solid' | 'outline'
  dot?: boolean
  icon?: ReactNode
  className?: string
}

export function StatusTag({
  children,
  tone = 'neutral',
  variant = 'soft',
  dot = true,
  icon,
  className,
}: StatusTagProps) {
  return (
    <span
      className={cn(
        'jing-status-tag inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        className,
      )}
      data-tone={tone}
      data-variant={variant}
    >
      {icon ??
        (dot ? (
          <span
            aria-hidden="true"
            className="jing-status-dot size-1.5 rounded-full"
          />
        ) : null)}
      <span>{children}</span>
    </span>
  )
}
