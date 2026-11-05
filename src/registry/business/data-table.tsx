/**
 * DataTable — schema 驱动的列表容器。
 *
 * 内部使用 @tanstack/react-table + shadcn Table 渲染，
 * 对外 API（ColumnDef / DataTableProps）保持不变。
 *
 * 与设计令牌一一对应：
 *   - 表头浅灰背景；行 hover 浅蓝
 *   - 支持空 / 加载态
 *   - 内置分页（默认 [10,20,50,100]）
 *   - 支持工具栏 / 行选择
 */

import {
  flexRender,
  getCoreRowModel,
  type ColumnDef as RTColumnDef,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ChevronsUpDown, Loader2 } from 'lucide-react'
import {
  type CSSProperties,
  type ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { EmptyState } from '../ui/empty-state'
import { Pagination } from '../ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

export interface ColumnDef<T> {
  key: string
  title: ReactNode
  width?: number | string
  fixed?: 'left' | 'right'
  align?: 'left' | 'center' | 'right'
  ellipsis?: boolean
  render?: (row: T, index: number) => ReactNode
  dataIndex?: keyof T | string
  sorter?: boolean
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  rowKey: keyof T | ((r: T) => string)
  loading?: boolean
  toolbar?: ReactNode
  empty?: ReactNode
  className?: string
  fillHeight?: boolean
  size?: 'default' | 'compact'
  tableLayout?: 'auto' | 'fixed'
  scroll?: {
    x?: number | string
  }
  'aria-label'?: string
  pagination?: {
    page: number
    pageSize: number
    total: number
    onChange?: (page: number, pageSize: number) => void
    pageSizeOptions?: number[]
    /** 后端未提供精确总数时，显示已知记录数的下限。 */
    totalIsEstimate?: boolean
    hasNextPage?: boolean
    disabled?: boolean
  }
  selection?: {
    type?: 'checkbox' | 'radio'
    selectedRowKeys: TableRowKey[]
    onChange: (keys: TableRowKey[], rows: T[]) => void
  }
  sortState?: DataTableSortState
  onSortChange?: (sortState: DataTableSortState | undefined) => void
}

type TableRowKey = string | number
type ColumnMeta = {
  width?: number | string
  align?: string
  fixed?: 'left' | 'right'
  ellipsis?: boolean
  hasCustomRender?: boolean
  sorter?: boolean
}

export type DataTableSortState = {
  key: string
  order: 'asc' | 'desc'
}

type OverflowTooltipTextProps = {
  children: string
}

function getRowKey<T>(row: T, rowKey: keyof T | ((r: T) => string)): string {
  if (typeof rowKey === 'function') return rowKey(row)
  const val = row[rowKey]
  return val != null ? String(val) : ''
}

function getSelectionKey<T>(
  row: T,
  rowKey: keyof T | ((r: T) => string),
): TableRowKey {
  if (typeof rowKey === 'function') return rowKey(row)
  const val = row[rowKey]
  return typeof val === 'string' || typeof val === 'number' ? val : String(val)
}

function toKeySet(keys?: TableRowKey[]) {
  return new Set((keys ?? []).map((key) => String(key)))
}

function toAlignClass(align?: 'left' | 'center' | 'right') {
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  return 'text-left'
}

function toColumnSizeStyle(width?: number | string) {
  if (width == null) return undefined
  return typeof width === 'number'
    ? { width, minWidth: width }
    : { width, minWidth: width }
}

function compareSortableValue(left: unknown, right: unknown) {
  if (left == null && right == null) return 0
  if (left == null) return -1
  if (right == null) return 1

  const leftNumber =
    typeof left === 'number'
      ? left
      : typeof left === 'string'
        ? Number(left)
        : NaN
  const rightNumber =
    typeof right === 'number'
      ? right
      : typeof right === 'string'
        ? Number(right)
        : NaN

  if (Number.isFinite(leftNumber) && Number.isFinite(rightNumber)) {
    return leftNumber - rightNumber
  }

  return String(left).localeCompare(String(right), 'zh-CN', {
    numeric: true,
    sensitivity: 'base',
  })
}

function getSortableValue<T extends object>(row: T, column: ColumnDef<T>) {
  const key = column.dataIndex ?? column.key
  return row[key as keyof T]
}

function getNumericWidth(width?: number | string) {
  if (typeof width === 'number') return width
  if (typeof width !== 'string') return 0

  const match = width.match(/^(\d+(?:\.\d+)?)px$/)
  return match ? Number(match[1]) : 0
}

function getColumnMeta<T>(
  columns: Array<RTColumnDef<T, unknown>>,
  columnIndex: number,
) {
  return columns[columnIndex]?.meta as ColumnMeta | undefined
}

function OverflowTooltipText({ children }: OverflowTooltipTextProps) {
  const textRef = useRef<HTMLButtonElement>(null)
  const overflowRef = useRef(false)
  const [open, setOpen] = useState(false)

  function updateOpenState() {
    const el = textRef.current
    if (!el) return
    overflowRef.current = el.scrollWidth > el.clientWidth
    setOpen(overflowRef.current)
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setOpen(false)
      return
    }

    if (overflowRef.current) {
      setOpen(true)
    }
  }

  return (
    <Tooltip open={open} onOpenChange={handleOpenChange}>
      <TooltipTrigger asChild>
        <button
          type="button"
          ref={textRef}
          className="block w-full truncate text-left"
          onPointerEnter={updateOpenState}
          onPointerLeave={() => setOpen(false)}
          onFocus={updateOpenState}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[32rem] whitespace-pre-wrap break-words">
        {children}
      </TooltipContent>
    </Tooltip>
  )
}

function getFixedOffset<T>(
  columns: Array<RTColumnDef<T, unknown>>,
  columnIndex: number,
  fixed?: 'left' | 'right',
) {
  if (!fixed) return undefined

  const offsetColumns =
    fixed === 'left'
      ? columns.slice(0, columnIndex)
      : columns.slice(columnIndex + 1)

  return offsetColumns.reduce((total, column) => {
    const meta = column.meta as ColumnMeta | undefined
    if (meta?.fixed !== fixed) return total

    return total + getNumericWidth(meta.width)
  }, 0)
}

function toColumnStyle(
  meta: ColumnMeta | undefined,
  fixedOffset?: number,
): CSSProperties | undefined {
  const sizeStyle = toColumnSizeStyle(meta?.width)
  if (!meta?.fixed) return sizeStyle

  const fixedStyle =
    meta.fixed === 'left'
      ? { left: fixedOffset ?? 0 }
      : { right: fixedOffset ?? 0 }

  return { ...sizeStyle, ...fixedStyle }
}

function toFixedClass(fixed?: 'left' | 'right', isHeader?: boolean) {
  if (!fixed) return undefined

  return cn(
    'sticky',
    isHeader ? cn('z-30') : 'z-20 bg-card group-hover:bg-muted/50',
    fixed === 'left' && 'shadow-md',
    fixed === 'right' && 'shadow-md',
  )
}

type SelectionRadioProps = {
  checked: boolean
  onSelect: () => void
  'aria-label': string
}

function SelectionRadio({
  checked,
  onSelect,
  'aria-label': ariaLabel,
}: SelectionRadioProps) {
  return (
    <input
      type="radio"
      checked={checked}
      aria-label={ariaLabel}
      className="size-4 shrink-0 accent-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      onChange={onSelect}
    />
  )
}

export function DataTable<T extends object>({
  columns,
  data,
  rowKey,
  loading,
  toolbar,
  empty,
  className,
  fillHeight = false,
  size = 'default',
  tableLayout,
  scroll,
  pagination,
  selection,
  sortState: controlledSortState,
  onSortChange,
  'aria-label': ariaLabel,
}: DataTableProps<T>) {
  const pageStart = pagination?.total
    ? (pagination.page - 1) * pagination.pageSize + 1
    : 0
  const pageEnd = pagination
    ? Math.min(pagination.page * pagination.pageSize, pagination.total)
    : 0
  const selectedKeySet = useMemo(
    () => toKeySet(selection?.selectedRowKeys),
    [selection?.selectedRowKeys],
  )
  const selectionType = selection?.type ?? 'checkbox'
  const hasEllipsis = useMemo(
    () => columns.some((column) => column.ellipsis),
    [columns],
  )
  const resolvedTableLayout = tableLayout ?? (hasEllipsis ? 'fixed' : 'auto')
  const [internalSortState, setInternalSortState] =
    useState<DataTableSortState>()
  const sortState = controlledSortState ?? internalSortState
  const isRemoteSort = Boolean(onSortChange)
  const sortedData = useMemo(() => {
    if (isRemoteSort || !sortState) return data

    const column = columns.find((item) => item.key === sortState.key)
    if (!column) return data

    return [...data].sort((left, right) => {
      const result = compareSortableValue(
        getSortableValue(left, column),
        getSortableValue(right, column),
      )
      return sortState.order === 'asc' ? result : -result
    })
  }, [columns, data, isRemoteSort, sortState])

  // 将自定义 ColumnDef 转换为 react-table 的 ColumnDef
  const rtColumns = useMemo<Array<RTColumnDef<T, unknown>>>(() => {
    const cols: Array<RTColumnDef<T, unknown>> = []

    // 选择列
    if (selection) {
      const allKeys = data.map((r) => getRowKey(r, rowKey))
      const allSelected =
        allKeys.length > 0 && allKeys.every((k) => selectedKeySet.has(k))
      const someSelected =
        !allSelected && allKeys.some((k) => selectedKeySet.has(k))

      cols.push({
        id: '__selection__',
        header: () =>
          selectionType === 'radio' ? null : (
            <Checkbox
              checked={allSelected}
              {...(someSelected && { 'data-state': 'indeterminate' })}
              onCheckedChange={(checked) => {
                if (checked) {
                  const newKeys = [
                    ...selection.selectedRowKeys,
                    ...data
                      .filter((r) => !selectedKeySet.has(getRowKey(r, rowKey)))
                      .map((r) => getSelectionKey(r, rowKey)),
                  ]
                  const nextKeySet = toKeySet(newKeys)
                  const newRows = data.filter((r) =>
                    nextKeySet.has(getRowKey(r, rowKey)),
                  )
                  selection.onChange(newKeys, newRows)
                } else {
                  const currentKeys = new Set<string>(allKeys)
                  const remainingKeys = selection.selectedRowKeys.filter(
                    (k) => !currentKeys.has(String(k)),
                  )
                  const remainingKeySet = toKeySet(remainingKeys)
                  const remainingRows = data.filter((r) =>
                    remainingKeySet.has(getRowKey(r, rowKey)),
                  )
                  selection.onChange(remainingKeys, remainingRows)
                }
              }}
              aria-label="全选"
            />
          ),
        cell: ({ row }) => {
          const key = getRowKey(row.original, rowKey)
          const selectionKey = getSelectionKey(row.original, rowKey)
          const checked = selectedKeySet.has(key)
          if (selectionType === 'radio') {
            return (
              <SelectionRadio
                checked={checked}
                onSelect={() =>
                  selection.onChange([selectionKey], [row.original])
                }
                aria-label="选择行"
              />
            )
          }

          return (
            <Checkbox
              checked={checked}
              onCheckedChange={(isChecked) => {
                const nextKeys = isChecked
                  ? [...selection.selectedRowKeys, selectionKey]
                  : selection.selectedRowKeys.filter((k) => String(k) !== key)
                const nextKeySet = toKeySet(nextKeys)
                const nextRows = data.filter((r) =>
                  nextKeySet.has(getRowKey(r, rowKey)),
                )
                selection.onChange(nextKeys, nextRows)
              }}
              aria-label="选择行"
            />
          )
        },
        meta: { width: 48, align: 'center' as const },
      })
    }

    // 数据列
    for (const c of columns) {
      cols.push({
        id: c.key,
        accessorKey: (c.dataIndex as string) ?? c.key,
        header: () => {
          const activeOrder =
            sortState?.key === c.key ? sortState.order : undefined

          if (!c.sorter) return c.title

          const SortIcon =
            activeOrder === 'asc'
              ? ArrowUp
              : activeOrder === 'desc'
                ? ArrowDown
                : ChevronsUpDown

          return (
            <button
              type="button"
              className="inline-flex items-center gap-1 text-inherit transition-colors hover:text-foreground"
              onClick={() => {
                const nextSortState =
                  sortState?.key !== c.key
                    ? { key: c.key, order: 'asc' as const }
                    : sortState.order === 'asc'
                      ? { key: c.key, order: 'desc' as const }
                      : undefined

                if (onSortChange) {
                  onSortChange(nextSortState)
                } else {
                  setInternalSortState(nextSortState)
                }
              }}
            >
              <span>{c.title}</span>
              <SortIcon className="size-3.5" />
            </button>
          )
        },
        cell: c.render
          ? ({ row, cell }) => c.render?.(row.original, cell.row.index)
          : ({ getValue }) => {
              const val = getValue()
              return val != null ? String(val) : ''
            },
        meta: {
          width: c.width,
          align: c.align,
          fixed: c.fixed,
          ellipsis: c.ellipsis,
          hasCustomRender: !!c.render,
          sorter: c.sorter,
        },
      })
    }

    return cols
  }, [
    columns,
    data,
    rowKey,
    selection,
    selectedKeySet,
    selectionType,
    sortState,
    onSortChange,
  ])

  const table = useReactTable({
    data: sortedData,
    columns: rtColumns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => getRowKey(row, rowKey),
  })

  const columnMinWidth = useMemo(
    () =>
      rtColumns.reduce((total, column) => {
        const meta = column.meta as { width?: number | string } | undefined
        return total + getNumericWidth(meta?.width)
      }, 0),
    [rtColumns],
  )
  const tableMinWidth = scroll?.x ?? columnMinWidth

  return (
    <TooltipProvider delayDuration={150}>
      <div
        className={cn(
          'data-table overflow-hidden border border-border bg-card shadow-sm',
          'flex min-h-0 flex-col',
          fillHeight && 'h-full',
          'rounded-lg',
          className,
        )}
      >
        {toolbar && (
          <div
            className={cn(
              'flex items-center justify-between border-b border-border',
              'shrink-0',
              size === 'compact' ? 'px-4 py-3' : 'px-5 py-4',
            )}
          >
            {toolbar}
          </div>
        )}
        <Table
          aria-label={ariaLabel}
          wrapperClassName={cn(fillHeight && 'min-h-0 flex-1')}
          className={cn(
            size === 'compact' && 'text-xs',
            resolvedTableLayout === 'fixed' && 'table-fixed',
          )}
          style={tableMinWidth ? { minWidth: tableMinWidth } : undefined}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const headerIndex = headerGroup.headers.findIndex(
                    (item) => item.id === header.id,
                  )
                  const meta = getColumnMeta(rtColumns, headerIndex)
                  const fixedOffset = getFixedOffset(
                    rtColumns,
                    headerIndex,
                    meta?.fixed,
                  )
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'whitespace-nowrap px-4 py-[11px] text-muted-foreground',
                        fillHeight && 'sticky top-0 z-10',
                        size === 'compact' &&
                          'h-auto  px-3 py-2 text-xs text-muted-foreground',
                        toFixedClass(meta?.fixed, true),
                        meta?.align &&
                          toAlignClass(
                            meta.align as 'left' | 'center' | 'right',
                          ),
                      )}
                      style={toColumnStyle(meta, fixedOffset)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={rtColumns.length}
                  className="h-32 text-center text-muted-foreground"
                >
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    加载中...
                  </span>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={rtColumns.length}>
                  {empty ?? <EmptyState title="暂无数据" />}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="group"
                  data-state={
                    selectedKeySet.has(getRowKey(row.original, rowKey))
                      ? 'selected'
                      : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => {
                    const cellIndex = row
                      .getVisibleCells()
                      .findIndex((item) => item.id === cell.id)
                    const meta = getColumnMeta(rtColumns, cellIndex)
                    const rawValue = cell.getValue()
                    const cellTitle =
                      meta?.ellipsis &&
                      !meta.hasCustomRender &&
                      (typeof rawValue === 'string' ||
                        typeof rawValue === 'number' ||
                        typeof rawValue === 'boolean')
                        ? String(rawValue)
                        : undefined
                    const fixedOffset = getFixedOffset(
                      rtColumns,
                      cellIndex,
                      meta?.fixed,
                    )
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          'whitespace-nowrap',
                          size === 'compact' &&
                            'px-3 py-3 [&_b]:text-foreground',
                          toFixedClass(meta?.fixed, false),
                          meta?.align &&
                            toAlignClass(
                              meta.align as 'left' | 'center' | 'right',
                            ),
                          meta?.ellipsis && 'truncate',
                        )}
                        style={toColumnStyle(meta, fixedOffset)}
                      >
                        {cellTitle ? (
                          <OverflowTooltipText>{cellTitle}</OverflowTooltipText>
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {pagination && (
          <div
            className={cn(
              'flex items-center justify-between',
              'shrink-0 border-t border-border',
              size === 'compact'
                ? 'px-4 py-3 text-xs text-muted-foreground'
                : 'px-5 py-4',
            )}
          >
            <div
              className={cn(
                size === 'compact' ? 'text-xs' : 'text-xs',
                'text-muted-foreground',
              )}
            >
              {pagination.totalIsEstimate ? (
                <span title="后端总数可能为已获取记录的下限，满页时可继续翻页。">
                  本页 {data.length} 条，共至少 {pagination.total} 条
                </span>
              ) : (
                <>
                  显示第 {pageStart} 条-第 {pageEnd} 条，共 {pagination.total}{' '}
                  条
                </>
              )}
            </div>
            <Pagination
              page={pagination.page}
              pageSize={pagination.pageSize}
              total={pagination.total}
              pageSizeOptions={pagination.pageSizeOptions}
              hasNextPage={pagination.hasNextPage}
              disabled={pagination.disabled || !pagination.onChange}
              onChange={pagination.onChange ?? (() => {})}
            />
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
