import * as React from 'react'

import { cn } from '@/lib/utils'

type CountableValue = string | number | readonly string[] | undefined

type UseInputCountOptions = {
  value: CountableValue
  defaultValue: CountableValue
}

type InputCountProps = {
  length: number
  maxLength: number
  className?: string
  layout?: 'inline' | 'overlay'
}

export type WithInputCountProps = {
  showCount?: boolean
}

function getBaseClassName(className: string) {
  const importantClassName = className.startsWith('!')
    ? className.slice(1)
    : className
  const parts = importantClassName.split(':')

  return parts[parts.length - 1] ?? importantClassName
}

function isInputCountWrapperClassName(className: string) {
  const baseClassName = getBaseClassName(className)

  return (
    baseClassName.startsWith('w-') ||
    baseClassName.startsWith('min-w-') ||
    baseClassName.startsWith('max-w-') ||
    baseClassName.startsWith('basis-') ||
    baseClassName === 'flex-1' ||
    baseClassName === 'flex-auto' ||
    baseClassName === 'flex-initial' ||
    baseClassName === 'flex-none' ||
    baseClassName === 'grow' ||
    baseClassName.startsWith('grow-') ||
    baseClassName === 'shrink' ||
    baseClassName.startsWith('shrink-')
  )
}

export function getInputCountWrapperClassName(className?: string) {
  if (!className) return undefined

  return className
    .split(/\s+/)
    .filter(Boolean)
    .filter(isInputCountWrapperClassName)
    .join(' ')
}

export function getInputValueLength(value: CountableValue) {
  if (value === undefined) return 0
  if (Array.isArray(value)) return value.join('').length

  return String(value).length
}

export function useInputCount({ value, defaultValue }: UseInputCountOptions) {
  const [uncontrolledLength, setUncontrolledLength] = React.useState(() =>
    getInputValueLength(value ?? defaultValue),
  )

  const isControlled = value !== undefined
  const length = isControlled ? getInputValueLength(value) : uncontrolledLength

  return [length, setUncontrolledLength] as const
}

export function InputCount({
  length,
  maxLength,
  className,
  layout = 'overlay',
}: InputCountProps) {
  return (
    <span
      className={cn(
        'pointer-events-none rounded-sm px-1 text-sm font-medium leading-none text-muted-foreground',
        layout === 'inline'
          ? 'shrink-0 whitespace-nowrap'
          : 'absolute bottom-2 right-3',
        className,
      )}
    >
      {length}/{maxLength}
    </span>
  )
}
