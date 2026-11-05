import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export type MultiSelectValue = string | number
export type MultiSelectOption<T extends MultiSelectValue = MultiSelectValue> = {
  label: string
  value: T
  disabled?: boolean
}

export type MultiSelectProps<T extends MultiSelectValue = MultiSelectValue> = {
  options: readonly MultiSelectOption<T>[]
  value: readonly T[]
  onValueChange: (next: T[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  searchable?: boolean
  allowSelectAll?: boolean
  allowClear?: boolean
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

export function MultiSelect<T extends MultiSelectValue>({
  options,
  value,
  onValueChange,
  placeholder = '请选择',
  searchPlaceholder = '搜索选项',
  emptyText = '没有匹配的选项',
  searchable = true,
  allowSelectAll = true,
  allowClear = true,
  disabled,
  className,
  'aria-label': ariaLabel = '多选',
}: MultiSelectProps<T>) {
  const id = React.useId()
  const [query, setQuery] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const search = query.trim().toLocaleLowerCase()
  const filtered = search
    ? options.filter((option) =>
        option.label.toLocaleLowerCase().includes(search),
      )
    : options
  const selected = new Set(value)
  const labels = new Map(options.map((option) => [option.value, option.label]))
  const selectedLabel = value
    .map((item) => labels.get(item) ?? String(item))
    .join('、')
  const selectable = filtered.filter((option) => !option.disabled)
  const allSelected =
    selectable.length > 0 &&
    selectable.every((option) => selected.has(option.value))

  function toggle(item: T) {
    onValueChange(
      selected.has(item)
        ? value.filter((valueItem) => valueItem !== item)
        : [...value, item],
    )
  }

  function toggleAll() {
    if (allSelected) {
      const visible = new Set(selectable.map((option) => option.value))
      onValueChange(value.filter((item) => !visible.has(item)))
      return
    }
    onValueChange([
      ...new Set([...value, ...selectable.map((option) => option.value)]),
    ])
  }

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) setQuery('')
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          aria-label={ariaLabel}
          aria-expanded={open}
          className={cn('w-full justify-between gap-3 font-normal', className)}
        >
          <span
            className={cn(
              'truncate',
              !selectedLabel && 'text-muted-foreground',
            )}
            title={selectedLabel}
          >
            {selectedLabel || placeholder}
          </span>
          <ChevronDown aria-hidden="true" className="size-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] min-w-52 p-2"
      >
        {searchable ? (
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label={`搜索${ariaLabel}`}
            placeholder={searchPlaceholder}
            className="mb-2 h-9"
          />
        ) : null}
        <fieldset className="max-h-56 overflow-y-auto">
          <legend className="sr-only">{ariaLabel}选项</legend>
          {filtered.map((option, index) => (
            <label
              key={`${typeof option.value}-${option.value}`}
              htmlFor={`${id}-${index}`}
              className={cn(
                'flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm transition-colors hover:bg-accent',
                selected.has(option.value) && 'bg-accent',
                option.disabled && 'cursor-not-allowed opacity-45',
              )}
            >
              <Checkbox
                id={`${id}-${index}`}
                checked={selected.has(option.value)}
                disabled={option.disabled}
                onCheckedChange={() => toggle(option.value)}
              />
              <span className="truncate">{option.label}</span>
            </label>
          ))}
          {filtered.length === 0 ? (
            <p
              role="status"
              className="py-5 text-center text-sm text-muted-foreground"
            >
              {emptyText}
            </p>
          ) : null}
        </fieldset>
        {allowSelectAll || allowClear ? (
          <>
            <Separator className="my-2" />
            <div className="flex items-center justify-between gap-2 px-1">
              <span className="text-xs text-muted-foreground">
                已选 {value.length} 项
              </span>
              <div className="flex gap-1">
                {allowSelectAll ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={selectable.length === 0}
                    onClick={toggleAll}
                  >
                    {allSelected ? '取消全选' : '全选'}
                  </Button>
                ) : null}
                {allowClear ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={value.length === 0}
                    onClick={() => onValueChange([])}
                  >
                    清空
                  </Button>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </PopoverContent>
    </Popover>
  )
}
