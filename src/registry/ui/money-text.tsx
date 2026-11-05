/**
 * MoneyText — 金额展示。基于字符串避免精度损失。
 * 千分位、可选币种符号、可选「分→元」换算。
 */
import { cn } from '@/lib/utils'

export interface MoneyTextProps {
  /** 数字或字符串（推荐字符串以保留精度） */
  value: number | string | null | undefined
  /** 货币符号；默认 ¥ */
  currency?: string
  /** 小数位（默认 2）；显示用，不修改入参精度 */
  fractionDigits?: number
  /** 后端是否传分；为真则除以 100 */
  fromCents?: boolean
  /** 自定义类名 */
  className?: string
  /** 0 或 null 显示占位 — */
  fallback?: string
}

function formatNumber(n: string, fractionDigits: number) {
  const sign = n.startsWith('-') ? '-' : ''
  const abs = sign ? n.slice(1) : n
  const [intRaw, decRaw = ''] = abs.split('.')
  const intPart = intRaw.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const decPart = (decRaw + '0'.repeat(fractionDigits)).slice(0, fractionDigits)
  return `${sign}${intPart}${fractionDigits > 0 ? `.${decPart}` : ''}`
}

function centsToUnits(value: string) {
  const match = /^(-?)(\d+)(?:\.(\d+))?$/.exec(value.trim())
  if (!match) return undefined

  const [, sign, integer, fraction = ''] = match
  const digits = integer + fraction
  const point = integer.length - 2
  const units =
    point > 0
      ? `${digits.slice(0, point)}.${digits.slice(point)}`
      : `0.${'0'.repeat(-point)}${digits}`
  return sign + units
}

export function MoneyText({
  value,
  currency = '¥',
  fractionDigits = 2,
  fromCents = false,
  className,
  fallback = '—',
}: MoneyTextProps) {
  if (value == null || value === '') {
    return (
      <span className={cn('text-muted-foreground/70', className)}>
        {fallback}
      </span>
    )
  }

  let str = String(value)
  if (fromCents) {
    const units = centsToUnits(str)
    if (units === undefined)
      return <span className={className}>{fallback}</span>
    str = units
  }

  return (
    <span className={cn(className)}>
      <span className="text-muted-foreground mr-0.5">{currency}</span>
      {formatNumber(str, fractionDigits)}
    </span>
  )
}
