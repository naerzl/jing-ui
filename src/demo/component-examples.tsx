import { RotateCcw } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { Button } from '@/components/ui/button'
import { type ColumnDef, DataTable } from '@/registry/business/data-table'
import { CountedInput } from '@/registry/ui/counted-input'
import { CountedTextarea } from '@/registry/ui/counted-textarea'
import { DescList } from '@/registry/ui/desc-list'
import { EmptyState } from '@/registry/ui/empty-state'
import { Input } from '@/registry/ui/input'
import { InputCount } from '@/registry/ui/input-count'
import { MoneyText } from '@/registry/ui/money-text'
import { MultiSelect } from '@/registry/ui/multi-select'
import { Pagination } from '@/registry/ui/pagination'
import { ResultCard, type ResultVariant } from '@/registry/ui/result-card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/registry/ui/select'
import { StatusTag } from '@/registry/ui/status-tag'
import { Steps } from '@/registry/ui/steps'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'
import { Textarea } from '@/registry/ui/textarea'
import { TimeText } from '@/registry/ui/time-text'
import { type ComponentId, LIBRARY_VERSION } from './component-catalog'

function ExampleField({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  )
}

function InputExample() {
  return (
    <div className="grid w-full max-w-md gap-5">
      <ExampleField label="组件名称" htmlFor="example-input">
        <Input
          id="example-input"
          defaultValue="Jing UI"
          showCount
          maxLength={24}
          unit="字"
        />
      </ExampleField>
      <ExampleField label="组件数量" htmlFor="example-number">
        <Input
          id="example-number"
          type="number"
          min={0}
          unit="个"
          placeholder="输入非负数量"
        />
      </ExampleField>
    </div>
  )
}

function TextareaExample() {
  return (
    <div className="w-full max-w-md">
      <ExampleField label="组件说明" htmlFor="example-textarea">
        <Textarea
          id="example-textarea"
          defaultValue="让组件随着你的项目一起演化。"
          showCount
          maxLength={120}
          rows={3}
        />
      </ExampleField>
    </div>
  )
}

function CountedInputExample() {
  return (
    <div className="w-full max-w-md">
      <ExampleField label="组件名称" htmlFor="example-counted-input">
        <CountedInput
          id="example-counted-input"
          defaultValue="Jing UI"
          maxLength={24}
          unit="字"
        />
      </ExampleField>
    </div>
  )
}

function CountedTextareaExample() {
  return (
    <div className="w-full max-w-md">
      <ExampleField label="设计说明" htmlFor="example-counted-textarea">
        <CountedTextarea
          id="example-counted-textarea"
          defaultValue="把设计想法写下来。"
          maxLength={120}
          rows={3}
        />
      </ExampleField>
    </div>
  )
}

function InputCountExample() {
  const [value, setValue] = useState('Jing UI')
  return (
    <div className="grid w-full max-w-md gap-3">
      <ExampleField label="试着输入内容" htmlFor="example-input-count">
        <Input
          id="example-input-count"
          value={value}
          maxLength={24}
          onChange={(event) => setValue(event.target.value)}
        />
      </ExampleField>
      <div className="flex justify-end text-muted-foreground">
        <InputCount length={value.length} maxLength={24} layout="inline" />
      </div>
    </div>
  )
}

function SelectExample() {
  const [value, setValue] = useState('dev')
  return (
    <div className="grid w-full max-w-xs gap-3">
      <ExampleField label="运行环境" htmlFor="example-select">
        <Select allowClear value={value} onValueChange={setValue}>
          <SelectTrigger id="example-select">
            <SelectValue placeholder="选择运行环境" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="dev">开发环境</SelectItem>
              <SelectItem value="test">测试环境</SelectItem>
              <SelectItem value="prod">生产环境</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </ExampleField>
      <p className="text-xs text-muted-foreground">
        可以清空选择，也可以使用方向键浏览选项。
      </p>
    </div>
  )
}

const TECH_OPTIONS = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Tailwind CSS', value: 'tailwind' },
  { label: 'Radix UI', value: 'radix' },
  { label: 'Vite', value: 'vite' },
  { label: 'Vitest', value: 'vitest' },
] as const

function MultiSelectExample() {
  const [selected, setSelected] = useState<string[]>(['react', 'typescript'])
  return (
    <div className="grid w-full max-w-md gap-3">
      <div className="grid gap-2">
        <span className="text-sm font-medium" id="example-multi-label">
          项目技术栈
        </span>
        <MultiSelect
          aria-label="项目技术栈"
          options={TECH_OPTIONS}
          value={selected}
          onValueChange={setSelected}
          placeholder="选择技术栈"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        已选择 {selected.length} 项。展开后可以搜索、全选或清空。
      </p>
    </div>
  )
}

const STEP_ITEMS = [
  { title: '选择组件', description: '查看用法与依赖' },
  { title: '安装源码', description: '加入你的项目' },
  { title: '定制主题', description: '对齐设计令牌' },
]

function StepsExample() {
  const [current, setCurrent] = useState(1)
  return (
    <div className="grid w-full gap-6">
      <Steps current={current} variant="cards" items={STEP_ITEMS} />
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={current === 0}
          onClick={() => setCurrent(current - 1)}
        >
          上一步
        </Button>
        <Button
          size="sm"
          disabled={current === STEP_ITEMS.length - 1}
          onClick={() => setCurrent(current + 1)}
        >
          下一步
        </Button>
      </div>
    </div>
  )
}

function StatusTagExample() {
  const [variant, setVariant] = useState<'soft' | 'solid' | 'outline'>('soft')
  return (
    <div className="grid w-full gap-6">
      <div className="mx-auto w-36">
        <Select
          value={variant}
          onValueChange={(value) => setVariant(value as typeof variant)}
        >
          <SelectTrigger aria-label="标签样式">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="soft">柔和底色</SelectItem>
              <SelectItem value="outline">描边样式</SelectItem>
              <SelectItem value="solid">实色样式</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <StatusTag tone="success" variant={variant}>
          已完成
        </StatusTag>
        <StatusTag tone="warning" variant={variant}>
          待处理
        </StatusTag>
        <StatusTag tone="danger" variant={variant}>
          已失败
        </StatusTag>
        <StatusTag tone="info" variant={variant}>
          运行中
        </StatusTag>
        <StatusTag tone="primary" variant={variant}>
          已发布
        </StatusTag>
      </div>
    </div>
  )
}

function EmptyStateExample() {
  const [created, setCreated] = useState(false)
  return (
    <div className="w-full max-w-lg">
      <EmptyState
        title={created ? '第一个项目已就绪' : '还没有项目'}
        description={
          created
            ? '现在可以开始添加组件，或重置这个示例。'
            : '创建第一个项目，开始整理你的组件。'
        }
        action={
          <Button
            variant={created ? 'outline' : 'default'}
            onClick={() => setCreated(!created)}
          >
            {created ? (
              <>
                <RotateCcw className="mr-2 size-4" />
                重置示例
              </>
            ) : (
              '创建项目'
            )}
          </Button>
        }
      />
    </div>
  )
}

function PaginationExample() {
  const [page, setPage] = useState(2)
  const [pageSize, setPageSize] = useState(10)
  return (
    <div className="grid justify-items-center gap-4">
      <Pagination
        page={page}
        pageSize={pageSize}
        total={124}
        onChange={(nextPage, nextSize) => {
          setPage(nextPage)
          setPageSize(nextSize)
        }}
      />
      <p className="text-xs text-muted-foreground">
        第 {page} 页，每页 {pageSize} 条，共 124 条记录
      </p>
    </div>
  )
}

function TableExample() {
  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <Table aria-label="组件预览表格">
        <TableHeader>
          <TableRow>
            <TableHead>组件名称</TableHead>
            <TableHead>分类</TableHead>
            <TableHead>状态</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Input</TableCell>
            <TableCell>表单输入</TableCell>
            <TableCell>
              <StatusTag tone="success">已发布</StatusTag>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Data Table</TableCell>
            <TableCell>业务组件</TableCell>
            <TableCell>
              <StatusTag tone="success">已发布</StatusTag>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

function DescListExample() {
  return (
    <div className="w-full max-w-xl">
      <DescList
        column={2}
        bordered
        items={[
          { label: '项目名称', value: 'Jing UI' },
          { label: '当前版本', value: LIBRARY_VERSION },
          { label: '分发方式', value: 'GitHub shadcn registry', span: 2 },
        ]}
      />
    </div>
  )
}

function MoneyTextExample() {
  return (
    <div className="grid w-full gap-6 text-center">
      <div>
        <p className="mb-2 text-xs text-muted-foreground">大数金额 · 分转元</p>
        <p className="break-all text-2xl font-semibold tabular-nums">
          <MoneyText value="12345678901234567890" fromCents />
        </p>
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">标准金额</p>
        <p className="text-lg tabular-nums">
          <MoneyText value="2680.5" />
        </p>
      </div>
    </div>
  )
}

function TimeTextExample() {
  const [time] = useState(() => new Date(Date.now() - 3600000))
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 text-sm">
      <dt className="text-muted-foreground">相对时间</dt>
      <dd>
        <TimeText value={time} mode="relative" />
      </dd>
      <dt className="text-muted-foreground">完整时间</dt>
      <dd>
        <TimeText value={time} mode="both" />
      </dd>
      <dt className="text-muted-foreground">空值占位</dt>
      <dd>
        <TimeText value={null} fallback="尚未更新" />
      </dd>
    </dl>
  )
}

const RESULT_LABELS = {
  success: '创建成功',
  warning: '需要确认',
  danger: '创建失败',
  info: '准备就绪',
} as const

function ResultCardExample() {
  const [variant, setVariant] = useState<ResultVariant>('success')
  return (
    <div className="w-full max-w-md">
      <div className="mx-auto w-40">
        <Select
          value={variant}
          onValueChange={(value) => setVariant(value as ResultVariant)}
        >
          <SelectTrigger aria-label="结果状态">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.entries(RESULT_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ResultCard
        variant={variant}
        title={RESULT_LABELS[variant]}
        description="选择上方状态，查看不同的结果反馈。"
      />
    </div>
  )
}

type DemoRow = { id: string; name: string; category: string; status: string }
const ROWS: DemoRow[] = [
  { id: '1', name: 'Input', category: '表单输入', status: '已发布' },
  { id: '2', name: 'Select', category: '表单输入', status: '已发布' },
  { id: '3', name: 'Pagination', category: '导航流程', status: '已发布' },
  { id: '4', name: 'Desc List', category: '数据展示', status: '已发布' },
  { id: '5', name: 'Result Card', category: '状态反馈', status: '已发布' },
  { id: '6', name: 'Data Table', category: '业务组件', status: '已发布' },
]
const COLUMNS: ColumnDef<DemoRow>[] = [
  {
    key: 'name',
    title: '组件名称',
    dataIndex: 'name',
    sorter: true,
    width: 170,
  },
  { key: 'category', title: '分类', dataIndex: 'category', width: 120 },
  {
    key: 'status',
    title: '状态',
    width: 115,
    render: (row) => <StatusTag tone="success">{row.status}</StatusTag>,
  },
]

function DataTableExample() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([])
  const [state, setState] = useState('ready')
  const rows =
    state === 'empty' ? [] : ROWS.slice((page - 1) * pageSize, page * pageSize)
  return (
    <div className="w-full">
      <DataTable
        aria-label="组件发布表格"
        columns={COLUMNS}
        data={rows}
        rowKey="id"
        loading={state === 'loading'}
        size="compact"
        toolbar={
          <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">
              已选择 {selectedKeys.length} 项
            </span>
            <div className="w-32">
              <Select value={state} onValueChange={setState}>
                <SelectTrigger className="h-8" aria-label="表格状态">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ready">显示数据</SelectItem>
                    <SelectItem value="loading">加载状态</SelectItem>
                    <SelectItem value="empty">空数据</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        }
        selection={{
          selectedRowKeys: selectedKeys,
          onChange: (keys) => setSelectedKeys(keys),
        }}
        pagination={{
          page,
          pageSize,
          total: state === 'empty' ? 0 : ROWS.length,
          pageSizeOptions: [2, 3, 6],
          onChange: (nextPage, nextSize) => {
            setPage(nextPage)
            setPageSize(nextSize)
          },
        }}
      />
    </div>
  )
}

const EXAMPLES: Record<ComponentId, () => ReactNode> = {
  input: InputExample,
  textarea: TextareaExample,
  select: SelectExample,
  'multi-select': MultiSelectExample,
  'counted-input': CountedInputExample,
  'counted-textarea': CountedTextareaExample,
  'input-count': InputCountExample,
  table: TableExample,
  'desc-list': DescListExample,
  'money-text': MoneyTextExample,
  'time-text': TimeTextExample,
  steps: StepsExample,
  pagination: PaginationExample,
  'status-tag': StatusTagExample,
  'empty-state': EmptyStateExample,
  'result-card': ResultCardExample,
  'data-table': DataTableExample,
}

export function ComponentExample({ name }: { name: ComponentId }) {
  const Example = EXAMPLES[name]
  return <Example />
}
