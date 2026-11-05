import * as React from 'react'
import { Button } from '@/components/ui/button'
import { type ColumnDef, DataTable } from '@/registry/business/data-table'
import { DescList } from '@/registry/ui/desc-list'
import { Input } from '@/registry/ui/input'
import { InputCount } from '@/registry/ui/input-count'
import { MoneyText } from '@/registry/ui/money-text'
import { Pagination } from '@/registry/ui/pagination'
import { ResultCard } from '@/registry/ui/result-card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/registry/ui/select'
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

type SpecimenProps = {
  id: string
  number: string
  title: string
  category: string
  description: string
  code: string
  children: React.ReactNode
}

type SourceComponentsProps = {
  Specimen: React.ComponentType<SpecimenProps>
}

type DemoRow = { id: string; name: string; category: string; status: string }

const ROWS: DemoRow[] = [
  { id: '1', name: 'Input', category: '表单', status: '已发布' },
  { id: '2', name: 'Select', category: '表单', status: '已发布' },
  { id: '3', name: 'Pagination', category: '导航', status: '已发布' },
  { id: '4', name: 'Desc List', category: '展示', status: '已发布' },
  { id: '5', name: 'Result Card', category: '反馈', status: '已发布' },
  { id: '6', name: 'Data Table', category: '业务', status: '已发布' },
]

const COLUMNS: ColumnDef<DemoRow>[] = [
  { key: 'name', title: '组件', dataIndex: 'name', sorter: true, width: 180 },
  { key: 'category', title: '分类', dataIndex: 'category', width: 120 },
  { key: 'status', title: '状态', dataIndex: 'status', width: 120 },
]

export function SourceComponents({ Specimen }: SourceComponentsProps) {
  const [sourceName, setSourceName] = React.useState('Jing UI')
  const [sourceNote, setSourceNote] = React.useState(
    '让原项目组件可以独立安装。',
  )
  const [environment, setEnvironment] = React.useState('dev')
  const [page, setPage] = React.useState(2)
  const [pageSize, setPageSize] = React.useState(10)
  const [tablePage, setTablePage] = React.useState(1)
  const [tablePageSize, setTablePageSize] = React.useState(3)
  const [selectedKeys, setSelectedKeys] = React.useState<(string | number)[]>(
    [],
  )
  const [tableLoading, setTableLoading] = React.useState(false)
  const [resultVariant, setResultVariant] = React.useState<
    'success' | 'warning' | 'danger' | 'info'
  >('success')

  const visibleRows = ROWS.slice(
    (tablePage - 1) * tablePageSize,
    tablePage * tablePageSize,
  )

  return (
    <>
      <Specimen
        id="input-count"
        number="07"
        title="Input Count"
        category="Internal"
        description="Input 与 Textarea 复用的计数项，可单独安装。"
        code={'<InputCount length={7} maxLength={24} layout="inline" />'}
      >
        <div className="rounded-lg border bg-background px-5 py-4 text-sm">
          当前输入：
          <InputCount length={7} maxLength={24} layout="inline" />
        </div>
      </Specimen>

      <Specimen
        id="input"
        number="08"
        title="Input"
        category="Form · 来源组件"
        description="保留原项目的单位后缀、输入计数与数值过滤行为。"
        code={
          '<Input showCount maxLength={24} unit="字" value={name} onChange={event => setName(event.target.value)} />'
        }
      >
        <div className="grid w-full max-w-lg gap-4">
          <Input
            aria-label="组件名称"
            showCount
            maxLength={24}
            unit="字"
            value={sourceName}
            onChange={(event) => setSourceName(event.target.value)}
          />
          <Input
            aria-label="非负数量"
            type="number"
            min={0}
            placeholder="输入非负数量"
          />
        </div>
      </Specimen>

      <Specimen
        id="textarea"
        number="09"
        title="Textarea"
        category="Form · 来源组件"
        description="受控和非受控模式都支持实时计数。"
        code={
          '<Textarea showCount maxLength={120} value={note} onChange={event => setNote(event.target.value)} />'
        }
      >
        <Textarea
          aria-label="组件说明"
          className="max-w-lg"
          showCount
          maxLength={120}
          value={sourceNote}
          onChange={(event) => setSourceNote(event.target.value)}
        />
      </Specimen>

      <Specimen
        id="select"
        number="10"
        title="Select"
        category="Form · 来源组件"
        description="原项目的可清空 Select，清空后可以重新选择。"
        code={
          '<Select allowClear value={value} onValueChange={setValue}>…</Select>'
        }
      >
        <div className="w-full max-w-xs">
          <Select allowClear value={environment} onValueChange={setEnvironment}>
            <SelectTrigger aria-label="运行环境">
              <SelectValue placeholder="选择运行环境" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dev">开发环境</SelectItem>
              <SelectItem value="test">测试环境</SelectItem>
              <SelectItem value="prod">生产环境</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Specimen>

      <Specimen
        id="pagination"
        number="11"
        title="Pagination"
        category="Navigation · 来源组件"
        description="页码、省略号和每页条数均可交互。"
        code={
          '<Pagination page={page} pageSize={pageSize} total={124} onChange={(page, size) => { setPage(page); setPageSize(size) }} />'
        }
      >
        <Pagination
          page={page}
          pageSize={pageSize}
          total={124}
          onChange={(nextPage, nextSize) => {
            setPage(nextPage)
            setPageSize(nextSize)
          }}
        />
      </Specimen>

      <Specimen
        id="table"
        number="12"
        title="Table"
        category="Data · 来源组件"
        description="带滚动容器的表格原语，也是 Data Table 的基础。"
        code={
          '<Table wrapperClassName="max-h-80"><TableHeader>…</TableHeader><TableBody>…</TableBody></Table>'
        }
      >
        <div className="w-full max-w-2xl overflow-hidden rounded-lg border">
          <Table aria-label="组件预览表格">
            <TableHeader>
              <TableRow>
                <TableHead>组件</TableHead>
                <TableHead>分类</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Input</TableCell>
                <TableCell>表单</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Data Table</TableCell>
                <TableCell>业务</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Specimen>

      <Specimen
        id="desc-list"
        number="13"
        title="Desc List"
        category="Display · 来源组件"
        description="详情字段按列展示，支持跨列内容。"
        code={
          '<DescList column={2} bordered items={[{ label: "名称", value: "Jing UI" }]} />'
        }
      >
        <div className="w-full max-w-xl">
          <DescList
            column={2}
            bordered
            items={[
              { label: '名称', value: 'Jing UI' },
              { label: '版本', value: '0.2.0' },
              { label: '分发方式', value: 'GitHub shadcn registry', span: 2 },
            ]}
          />
        </div>
      </Specimen>

      <Specimen
        id="money-text"
        number="14"
        title="Money Text"
        category="Display · 来源组件"
        description="千分位与分转元，超出安全整数的字符串也保留精度。"
        code={'<MoneyText value="12345678901234567890" fromCents />'}
      >
        <div className="grid gap-2 text-center">
          <span className="text-xs text-muted-foreground">
            输入：12345678901234567890 分
          </span>
          <strong className="text-2xl">
            <MoneyText value="12345678901234567890" fromCents />
          </strong>
        </div>
      </Specimen>

      <Specimen
        id="time-text"
        number="15"
        title="Time Text"
        category="Display · 来源组件"
        description="绝对时间、相对时间与悬停提示。"
        code={'<TimeText value={new Date(Date.now() - 3600000)} mode="both" />'}
      >
        <div className="grid gap-2 text-center text-sm">
          <TimeText value={new Date(Date.now() - 3600000)} mode="relative" />
          <TimeText value={new Date(Date.now() - 3600000)} mode="both" />
        </div>
      </Specimen>

      <Specimen
        id="result-card"
        number="16"
        title="Result Card"
        category="Feedback · 来源组件"
        description="四种语义状态跟随主题变化。"
        code={
          '<ResultCard variant="success" title="创建完成" description="可以继续配置组件。" />'
        }
      >
        <div className="w-full max-w-md">
          <div className="flex justify-center gap-2">
            {(['success', 'warning', 'danger', 'info'] as const).map(
              (variant) => (
                <Button
                  key={variant}
                  size="sm"
                  variant={resultVariant === variant ? 'default' : 'outline'}
                  onClick={() => setResultVariant(variant)}
                >
                  {variant}
                </Button>
              ),
            )}
          </div>
          <ResultCard
            variant={resultVariant}
            title="组件状态"
            description="选择上方状态观察图标与颜色。"
          />
        </div>
      </Specimen>

      <Specimen
        id="data-table"
        number="17"
        title="Data Table"
        category="Business · 来源组件"
        description="排序、选择、分页、加载和空状态都由同一个通用业务组件处理。"
        code={
          '<DataTable columns={columns} data={rows} rowKey="id" selection={selection} pagination={pagination} />'
        }
      >
        <div className="w-full">
          <DataTable
            aria-label="组件发布表格"
            columns={COLUMNS}
            data={visibleRows}
            rowKey="id"
            loading={tableLoading}
            toolbar={
              <div className="flex w-full items-center justify-between gap-3 text-sm">
                <span>已选择 {selectedKeys.length} 项</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTableLoading((value) => !value)}
                >
                  {tableLoading ? '结束加载' : '模拟加载'}
                </Button>
              </div>
            }
            selection={{
              selectedRowKeys: selectedKeys,
              onChange: (keys) => setSelectedKeys(keys),
            }}
            pagination={{
              page: tablePage,
              pageSize: tablePageSize,
              total: ROWS.length,
              pageSizeOptions: [2, 3, 6],
              onChange: (nextPage, nextSize) => {
                setTablePage(nextPage)
                setTablePageSize(nextSize)
              },
            }}
          />
        </div>
      </Specimen>
    </>
  )
}
