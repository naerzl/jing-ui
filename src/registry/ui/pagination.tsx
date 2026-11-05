import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

export interface PaginationProps {
  page: number
  pageSize: number
  total: number
  pageSizeOptions?: number[]
  /** 总数可能是下限时，由调用方判断是否还能继续翻页。 */
  hasNextPage?: boolean
  disabled?: boolean
  onChange: (page: number, pageSize: number) => void
}

export type PaginationItem = number | 'ellipsis-left' | 'ellipsis-right'

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export function getPaginationItems(
  page: number,
  maxPage: number,
): PaginationItem[] {
  const safeMaxPage = Number.isFinite(maxPage)
    ? Math.max(1, Math.floor(maxPage))
    : 1
  const currentPage = Math.min(Math.max(1, page), safeMaxPage)

  if (safeMaxPage <= 7) {
    return range(1, safeMaxPage)
  }

  if (currentPage <= 4) {
    return [...range(1, 5), 'ellipsis-right', safeMaxPage]
  }

  if (currentPage >= safeMaxPage - 3) {
    return [1, 'ellipsis-left', ...range(safeMaxPage - 4, safeMaxPage)]
  }

  return [
    1,
    'ellipsis-left',
    ...range(currentPage - 2, currentPage + 2),
    'ellipsis-right',
    safeMaxPage,
  ]
}

export function Pagination({
  page,
  pageSize,
  total,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  hasNextPage,
  disabled = false,
  onChange,
}: PaginationProps) {
  const normalizedPageSize =
    Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 1
  const knownMaxPage = Math.max(1, Math.ceil(total / normalizedPageSize))
  const currentPage =
    hasNextPage === undefined
      ? Math.min(Math.max(1, page), knownMaxPage)
      : Math.max(1, page)
  const maxPage = Math.max(knownMaxPage, currentPage)
  const visiblePages = getPaginationItems(currentPage, maxPage)
  const hasPageSizeOptions =
    pageSizeOptions.length > 1 || !pageSizeOptions.includes(normalizedPageSize)

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          className="size-7 p-0"
          aria-label="上一页"
          disabled={disabled || currentPage <= 1}
          onClick={() => onChange(currentPage - 1, normalizedPageSize)}
        >
          <ChevronLeft className="size-2" />
        </Button>
        {visiblePages.map((item) =>
          typeof item === 'number' ? (
            <button
              key={item}
              type="button"
              aria-current={currentPage === item ? 'page' : undefined}
              disabled={disabled}
              className={cn(
                'size-7 rounded-lg border border-border bg-card text-[9px] font-semibold text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/35',
                currentPage === item &&
                  'border-primary bg-primary text-primary-foreground shadow-md hover:bg-primary hover:text-primary-foreground',
              )}
              onClick={() => onChange(item, normalizedPageSize)}
            >
              {item}
            </button>
          ) : (
            <span key={item} className="px-2 text-xs text-muted-foreground">
              ...
            </span>
          ),
        )}
        <Button
          variant="outline"
          size="sm"
          className="size-7 p-0"
          aria-label="下一页"
          disabled={disabled || !(hasNextPage ?? currentPage < maxPage)}
          onClick={() => onChange(currentPage + 1, normalizedPageSize)}
        >
          <ChevronRight className="size-2" />
        </Button>
      </div>
      {hasPageSizeOptions && (
        <Select
          disabled={disabled}
          value={String(normalizedPageSize)}
          onValueChange={(value) => onChange(1, Number(value))}
        >
          <SelectTrigger
            aria-label="每页条数"
            className="h-7 w-auto gap-1 px-2 text-sm font-normal"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option} 条/页
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  )
}
