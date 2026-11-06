import packageJson from '../../package.json'

export const LIBRARY_VERSION = packageJson.version

export const COMPONENT_CATALOG = {
  input: {
    title: 'Input',
    category: '表单输入',
    description: '在同一个输入框里处理单位、字数和数值输入。',
    height: 270,
    code: `import { Input } from '@/components/ui/input'

<Input defaultValue="Jing UI" showCount maxLength={24} unit="字" />
<Input type="number" min={0} unit="个" placeholder="输入非负数量" />`,
  },
  textarea: {
    title: 'Textarea',
    category: '表单输入',
    description: '给长文本一个清楚的输入边界。',
    height: 260,
    code: `import { Textarea } from '@/components/ui/textarea'

<Textarea
  defaultValue="让组件随着你的项目一起演化。"
  showCount
  maxLength={120}
  aria-label="组件说明"
/>`,
  },
  select: {
    title: 'Select',
    category: '表单输入',
    description: '支持清空与键盘操作的组合式选择器。',
    height: 260,
    code: `const [value, setValue] = useState('dev')

<Select allowClear value={value} onValueChange={setValue}>
  <SelectTrigger aria-label="运行环境">
    <SelectValue placeholder="选择运行环境" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="dev">开发环境</SelectItem>
      <SelectItem value="test">测试环境</SelectItem>
      <SelectItem value="prod">生产环境</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
  },
  'multi-select': {
    title: 'Multi Select',
    category: '表单输入',
    description: '搜索选项、批量选择，再带走你的结果。',
    height: 290,
    code: `const [selected, setSelected] = useState(['react', 'typescript'])

<MultiSelect
  aria-label="技术栈"
  placeholder="选择技术栈"
  options={[
    { label: 'React', value: 'react' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Tailwind CSS', value: 'tailwind' },
    { label: 'Radix UI', value: 'radix' },
  ]}
  value={selected}
  onValueChange={setSelected}
/>`,
  },
  'counted-input': {
    title: 'Counted Input',
    category: '表单输入',
    description: '组合 shadcn Input 的轻量计数输入框。',
    height: 250,
    code: `import { CountedInput } from '@/components/ui/counted-input'

<CountedInput
  defaultValue="Jing UI"
  maxLength={24}
  unit="字"
  aria-label="组件名称"
/>`,
  },
  'counted-textarea': {
    title: 'Counted Textarea',
    category: '表单输入',
    description: '组合 shadcn Textarea 的轻量计数文本域。',
    height: 260,
    code: `import { CountedTextarea } from '@/components/ui/counted-textarea'

<CountedTextarea
  defaultValue="把设计想法写下来。"
  maxLength={120}
  aria-label="设计说明"
/>`,
  },
  'input-count': {
    title: 'Input Count',
    category: '表单输入',
    description: 'Input 与 Textarea 共同使用的计数辅助项。',
    height: 220,
    code: `<InputCount length={7} maxLength={24} layout="inline" />`,
  },
  table: {
    title: 'Table',
    category: '数据展示',
    description: '清晰呈现行列，也为组合表格保留扩展空间。',
    height: 300,
    code: `<Table aria-label="组件列表">
  <TableHeader>
    <TableRow><TableHead>组件</TableHead><TableHead>分类</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>Input</TableCell><TableCell>表单输入</TableCell></TableRow>
    <TableRow><TableCell>Data Table</TableCell><TableCell>业务组件</TableCell></TableRow>
  </TableBody>
</Table>`,
  },
  'desc-list': {
    title: 'Desc List',
    category: '数据展示',
    description: '让详情字段、说明与状态各得其所。',
    height: 300,
    code: `<DescList
  column={2}
  bordered
  items={[
    { label: '项目名称', value: 'Jing UI' },
    { label: '当前版本', value: '${packageJson.version}' },
    { label: '分发方式', value: 'GitHub shadcn registry', span: 2 },
  ]}
/>`,
  },
  'money-text': {
    title: 'Money Text',
    category: '数据展示',
    description: '保留大数精度的金额、千分位与分转元展示。',
    height: 250,
    code: `<MoneyText value="12345678901234567890" fromCents />
<MoneyText value="2680.5" currency="¥" />`,
  },
  'time-text': {
    title: 'Time Text',
    category: '数据展示',
    description: '在绝对时间、相对时间和空值间保持一致。',
    height: 250,
    code: `<TimeText value={new Date(Date.now() - 3600000)} mode="relative" />
<TimeText value={new Date(Date.now() - 3600000)} mode="both" />
<TimeText value={null} fallback="尚未更新" />`,
  },
  steps: {
    title: 'Steps',
    category: '导航流程',
    description: '让多步流程中的当前位置一目了然。',
    height: 290,
    code: `const [current, setCurrent] = useState(1)

<Steps
  current={current}
  variant="cards"
  items={[
    { title: '选择组件', description: '查看用法与依赖' },
    { title: '安装源码', description: '加入你的项目' },
    { title: '定制主题', description: '对齐设计令牌' },
  ]}
/>`,
  },
  pagination: {
    title: 'Pagination',
    category: '导航流程',
    description: '页码、每页条数与不确定总数的翻页控制。',
    height: 230,
    code: `<Pagination
  page={page}
  pageSize={pageSize}
  total={124}
  onChange={(nextPage, nextSize) => {
    setPage(nextPage)
    setPageSize(nextSize)
  }}
/>`,
  },
  'status-tag': {
    title: 'Status Tag',
    category: '状态反馈',
    description: '用明确的文案与语义颜色表达状态。',
    height: 260,
    code: `<StatusTag tone="success">已完成</StatusTag>
<StatusTag tone="warning">待处理</StatusTag>
<StatusTag tone="danger">已失败</StatusTag>
<StatusTag tone="info">运行中</StatusTag>
<StatusTag tone="primary" variant="outline">已发布</StatusTag>`,
  },
  'empty-state': {
    title: 'Empty State',
    category: '状态反馈',
    description: '解释当前的空白，并给出可执行的下一步。',
    height: 340,
    code: `<EmptyState
  title="还没有项目"
  description="创建第一个项目，开始整理你的组件。"
  action={<Button onClick={onCreate}>创建项目</Button>}
/>`,
  },
  'result-card': {
    title: 'Result Card',
    category: '状态反馈',
    description: '为操作结果提供完整的图标、说明与后续操作。',
    height: 360,
    code: `<ResultCard
  variant="success"
  title="项目创建完成"
  description="现在可以开始添加你的组件。"
/>`,
  },
  'data-table': {
    title: 'Data Table',
    category: '业务组件',
    description: '将排序、行选择、分页与列表状态组合成可用的业务表格。',
    height: 450,
    code: `const columns: ColumnDef<Row>[] = [
  { key: 'name', title: '组件名称', dataIndex: 'name', sorter: true },
  { key: 'category', title: '分类', dataIndex: 'category' },
  { key: 'status', title: '状态', dataIndex: 'status' },
]

<DataTable
  columns={columns}
  data={rows}
  rowKey="id"
  selection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
  pagination={{ page, pageSize, total, onChange: onPageChange }}
/>`,
  },
} as const

export type ComponentId = keyof typeof COMPONENT_CATALOG

export const COMPONENT_IDS = Object.keys(COMPONENT_CATALOG) as ComponentId[]

export function isComponentId(value: string | null): value is ComponentId {
  return value !== null && Object.hasOwn(COMPONENT_CATALOG, value)
}
