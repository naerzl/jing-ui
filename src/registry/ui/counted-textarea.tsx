import * as React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export type CountedTextareaProps = React.ComponentProps<typeof Textarea> & {
  showCount?: boolean
}

function valueLength(value: React.ComponentProps<typeof Textarea>['value']) {
  if (value == null) return 0
  return Array.isArray(value) ? value.join('').length : String(value).length
}

export const CountedTextarea = React.forwardRef<
  HTMLTextAreaElement,
  CountedTextareaProps
>(function CountedTextarea(
  {
    className,
    value,
    defaultValue,
    onChange,
    maxLength,
    showCount = true,
    ...props
  },
  ref,
) {
  const [uncontrolledLength, setUncontrolledLength] = React.useState(() =>
    valueLength(defaultValue),
  )
  const length = value === undefined ? uncontrolledLength : valueLength(value)
  const hasCounter = showCount && typeof maxLength === 'number'

  return (
    <div className={cn('relative w-full', className)}>
      <Textarea
        {...props}
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        className={cn('min-h-28', hasCounter && 'pb-9')}
        onChange={(event) => {
          setUncontrolledLength(event.target.value.length)
          onChange?.(event)
        }}
      />
      {hasCounter ? (
        <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-muted-foreground">
          {length}/{maxLength}
        </span>
      ) : null}
    </div>
  )
})
