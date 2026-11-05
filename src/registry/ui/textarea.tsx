import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  getInputCountWrapperClassName,
  getInputValueLength,
  InputCount,
  useInputCount,
  type WithInputCountProps,
} from './input-count'

export type TextareaProps = React.ComponentProps<'textarea'> &
  WithInputCountProps

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      maxLength,
      onChange,
      showCount,
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

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      setInputLength(getInputValueLength(event.target.value))
      onChange?.(event)
    }

    const textarea = (
      <textarea
        className={cn(
          'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
          shouldShowCount && 'pb-12',
        )}
        ref={ref}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...props}
      />
    )

    if (!shouldShowCount) return textarea

    return (
      <div
        className={cn(
          'relative w-full',
          getInputCountWrapperClassName(className),
        )}
      >
        {textarea}
        <InputCount
          className="right-4"
          length={inputLength}
          maxLength={maxLength}
        />
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
