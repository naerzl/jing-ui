import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface DescItem {
  label: string
  value: ReactNode
  span?: 1 | 2 | 3 | 4
}

export interface DescListProps {
  items: DescItem[]
  column?: 1 | 2 | 3 | 4
  bordered?: boolean
  size?: 'sm' | 'md'
  className?: string
}

const colMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

export function DescList({
  items,
  column = 2,
  bordered = false,
  size = 'md',
  className,
}: DescListProps) {
  return (
    <dl
      className={cn(
        'grid gap-y-4 gap-x-6',
        colMap[column],
        bordered && 'border border-border rounded-md p-5',
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            'flex flex-col gap-1',
            item.span && colMap[item.span] && `col-span-${item.span}`,
          )}
        >
          <dt
            className={cn(
              'text-xs text-muted-foreground',
              size === 'sm' && 'text-[11px]',
            )}
          >
            {item.label}
          </dt>
          <dd
            className={cn(
              'text-sm text-foreground',
              size === 'sm' && 'text-xs',
            )}
          >
            {item.value ?? '—'}
          </dd>
        </div>
      ))}
    </dl>
  )
}
