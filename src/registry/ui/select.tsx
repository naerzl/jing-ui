'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp, CircleX } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

type SelectRootProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Root
>

export type SelectProps = SelectRootProps & {
  allowClear?: boolean
  clearValue?: string
}

type SelectContextValue = {
  allowClear: boolean
  hasValue: boolean
  onClear: () => void
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

function Select(props: SelectProps) {
  const {
    allowClear = false,
    clearValue = '',
    value,
    defaultValue,
    onValueChange,
    ...restProps
  } = props
  const [innerValue, setInnerValue] = React.useState(defaultValue)
  const isControlled = Object.hasOwn(props, 'value')
  const currentValue = isControlled ? (value ?? '') : innerValue
  const hasValue = currentValue !== undefined && currentValue !== ''

  function handleValueChange(nextValue: string) {
    setInnerValue(nextValue)
    onValueChange?.(nextValue)
  }

  function handleClear() {
    setInnerValue(undefined)
    onValueChange?.(clearValue)
  }

  return (
    <SelectContext.Provider
      value={{
        allowClear,
        hasValue,
        onClear: handleClear,
      }}
    >
      <SelectPrimitive.Root
        value={currentValue}
        onValueChange={handleValueChange}
        {...restProps}
      />
    </SelectContext.Provider>
  )
}

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const selectContext = React.useContext(SelectContext)
  const canClear = Boolean(selectContext?.allowClear && selectContext.hasValue)

  function handleClear(event: React.MouseEvent<HTMLSpanElement>) {
    event.preventDefault()
    event.stopPropagation()
    selectContext?.onClear()
  }

  function handleClearKeyDown(event: React.KeyboardEvent<HTMLSpanElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      event.stopPropagation()
      selectContext?.onClear()
    }
  }

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'group/select flex h-10 min-w-0 w-full items-center justify-between overflow-hidden whitespace-nowrap rounded-lg border border-input bg-card px-3 py-2 text-sm font-normal text-foreground/80 ring-offset-background transition-colors hover:border-primary/30 data-[placeholder]:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70 [&>span:first-child]:truncate',
        className,
      )}
      {...props}
    >
      {children}
      <span className="relative flex size-4 shrink-0 items-center justify-center text-muted-foreground">
        {canClear ? (
          // biome-ignore lint/a11y/useSemanticElements: Radix Trigger 本身是按钮，内部不能嵌套原生 button。
          <span
            role="button"
            aria-label="清除选择"
            tabIndex={0}
            className="flex size-4 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            onPointerDown={handleClear}
            onClick={handleClear}
            onKeyDown={handleClearKeyDown}
          >
            <CircleX className="size-4" />
          </span>
        ) : (
          <ChevronDown className={cn('size-4 opacity-50 transition-opacity')} />
        )}
      </span>
    </SelectPrimitive.Trigger>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-select-content-transform-origin)]',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm font-normal outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
