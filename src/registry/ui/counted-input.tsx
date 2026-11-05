import * as React from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export type CountedInputProps = Omit<
  React.ComponentProps<typeof Input>,
  'size'
> & {
  /** Optional suffix such as kg or %. */
  unit?: string
  /** Show the character count when maxLength is provided. */
  showCount?: boolean
}

function valueLength(value: React.ComponentProps<typeof Input>['value']) {
  if (value == null) return 0
  return Array.isArray(value) ? value.join('').length : String(value).length
}

export const CountedInput = React.forwardRef<
  HTMLInputElement,
  CountedInputProps
>(function CountedInput(
  {
    className,
    value,
    defaultValue,
    onChange,
    maxLength,
    unit,
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
      <Input
        {...props}
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        className={cn('w-full', (unit || hasCounter) && 'pr-24')}
        onChange={(event) => {
          setUncontrolledLength(event.target.value.length)
          onChange?.(event)
        }}
      />
      {unit || hasCounter ? (
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center gap-2 text-xs text-muted-foreground">
          {unit ? <span>{unit}</span> : null}
          {hasCounter ? (
            <span>
              {length}/{maxLength}
            </span>
          ) : null}
        </span>
      ) : null}
    </div>
  )
})
