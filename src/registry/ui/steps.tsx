import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type StepItem = { title: string; description?: string }

export type StepsProps = {
  items: readonly StepItem[]
  /** Zero-based index of the active step. */
  current: number
  variant?: 'inline' | 'cards'
  className?: string
}

export function Steps({
  items,
  current,
  variant = 'inline',
  className,
}: StepsProps) {
  if (items.length === 0) return null

  return (
    <ol
      aria-label="进度步骤"
      className={cn(
        variant === 'cards'
          ? 'grid gap-3 sm:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]'
          : 'flex flex-wrap gap-x-7 gap-y-4',
        className,
      )}
    >
      {items.map((item, index) => {
        const completed = index < current
        const active = index === current
        return (
          <li
            key={item.title}
            aria-current={active ? 'step' : undefined}
            className={cn(
              'flex min-w-0 items-start gap-3',
              variant === 'cards' && 'rounded-lg border bg-card p-4',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'grid size-8 shrink-0 place-items-center rounded-full border text-xs font-semibold',
                active && 'border-primary bg-primary text-primary-foreground',
                completed && 'border-primary bg-accent text-accent-foreground',
                !active &&
                  !completed &&
                  'border-border bg-muted text-muted-foreground',
              )}
            >
              {completed ? (
                <Check className="size-4" />
              ) : (
                String(index + 1).padStart(2, '0')
              )}
            </span>
            <span className="min-w-0 pt-0.5">
              <span
                className={cn(
                  'block text-sm font-semibold',
                  !active && !completed && 'text-muted-foreground',
                )}
              >
                {item.title}
              </span>
              {item.description ? (
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                  {item.description}
                </span>
              ) : null}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
