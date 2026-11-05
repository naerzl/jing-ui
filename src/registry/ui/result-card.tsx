import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import './result-card.css'

export type ResultVariant = 'success' | 'warning' | 'danger' | 'info'

export interface ResultCardProps {
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  variant?: ResultVariant
  children?: ReactNode
  className?: string
}

const variantIcon: Record<ResultVariant, ReactNode> = {
  success: <CheckCircle2 className="size-7" />,
  warning: <AlertTriangle className="size-7" />,
  danger: <XCircle className="size-7" />,
  info: <Info className="size-7" />,
}

export function ResultCard({
  title,
  description,
  icon,
  variant = 'success',
  children,
  className,
}: ResultCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center px-4 py-12 text-center',
        className,
      )}
    >
      <div
        className="jing-result-icon flex h-14 w-14 items-center justify-center rounded-2xl"
        data-variant={variant}
      >
        {icon ?? variantIcon[variant]}
      </div>
      <h3 className="mt-5 text-base font-semibold leading-6 text-foreground">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      )}
      {children && <div className="mt-8 w-full text-left">{children}</div>}
    </div>
  )
}
