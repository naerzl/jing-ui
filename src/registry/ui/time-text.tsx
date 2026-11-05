import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

import { cn } from '@/lib/utils'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export interface TimeTextProps {
  value: string | number | Date | null | undefined
  format?: string
  /** 显示模式：absolute=绝对，relative=相对（"3 分钟前"），both=绝对 + tooltip 相对 */
  mode?: 'absolute' | 'relative' | 'both'
  className?: string
  fallback?: string
}

export function TimeText({
  value,
  format = 'YYYY-MM-DD HH:mm',
  mode = 'absolute',
  className,
  fallback = '—',
}: TimeTextProps) {
  if (value == null || value === '') {
    return (
      <span className={cn('text-muted-foreground/70', className)}>
        {fallback}
      </span>
    )
  }
  const t = dayjs(value)
  if (!t.isValid()) {
    return (
      <span className={cn('text-muted-foreground/70', className)}>
        {fallback}
      </span>
    )
  }
  if (mode === 'relative') {
    return (
      <span className={cn('', className)} title={t.format(format)}>
        {t.fromNow()}
      </span>
    )
  }
  if (mode === 'both') {
    return (
      <span className={cn('', className)} title={t.fromNow()}>
        {t.format(format)}
      </span>
    )
  }
  return <span className={cn('', className)}>{t.format(format)}</span>
}
