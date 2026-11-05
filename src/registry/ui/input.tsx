import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  getInputValueLength,
  InputCount,
  useInputCount,
  type WithInputCountProps,
} from './input-count'

function isValidNumberInputValue(
  value: string,
  min: string | number | undefined,
) {
  if (value === '') return true

  const minNumber =
    typeof min === 'number' ? min : min === undefined ? undefined : Number(min)
  const canBeNegative =
    minNumber === undefined || Number.isNaN(minNumber) || minNumber < 0
  const pattern = canBeNegative ? /^-?\d+\.?\d*$/ : /^\d+\.?\d*$/

  return pattern.test(value)
}

export type InputProps = React.ComponentProps<'input'> &
  WithInputCountProps & {
    unit?: string
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      min,
      maxLength,
      disabled,
      onChange,
      showCount,
      unit,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const [inputLength, setInputLength] = useInputCount({
      value,
      defaultValue,
    })
    const shouldShowCount = showCount && typeof maxLength === 'number'
    // 有单位文本时需要渲染右侧后缀，空字符串视为无单位
    const hasUnit = typeof unit === 'string' && unit !== ''
    const hasTrailingContent = hasUnit || shouldShowCount

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (
        type === 'number' &&
        !isValidNumberInputValue(event.target.value, min)
      ) {
        return
      }
      setInputLength(getInputValueLength(event.target.value))
      onChange?.(event)
    }

    if (hasTrailingContent) {
      return (
        <div
          data-disabled={disabled || undefined}
          className={cn(
            'flex h-10 min-w-0 w-full items-center gap-2 rounded-lg border border-input bg-card px-3 py-2 text-sm font-normal transition-colors',
            !disabled &&
              'hover:border-primary/30 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-ring/20',
            className,
            disabled && 'cursor-not-allowed bg-muted opacity-70',
          )}
        >
          <input
            type={type}
            min={min}
            maxLength={maxLength}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-inherit outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
            data-slot="input-group-control"
            ref={ref}
            onChange={handleChange}
            {...props}
          />
          {hasUnit ? (
            <button
              type="button"
              tabIndex={-1}
              aria-label={`${unit}，聚焦输入框`}
              className="shrink-0 cursor-text select-none whitespace-nowrap text-sm font-normal text-muted-foreground"
              onMouseDown={(event) => {
                event.preventDefault()
                event.currentTarget.parentElement
                  ?.querySelector('input')
                  ?.focus()
              }}
            >
              {unit}
            </button>
          ) : null}
          {shouldShowCount ? (
            <InputCount
              length={inputLength}
              maxLength={maxLength}
              layout="inline"
            />
          ) : null}
        </div>
      )
    }

    return (
      <input
        type={type}
        min={min}
        maxLength={maxLength}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        className={cn(
          'flex h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm font-normal transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-primary/30 focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70',
          className,
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
