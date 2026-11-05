# Multi Select

受控多选器，支持搜索、选择当前搜索结果、取消选择当前搜索结果与清空全部。

```bash
pnpm dlx shadcn@latest add naerzl/jing-ui/multi-select
```

```tsx
const [selected, setSelected] = useState<string[]>([])

<MultiSelect
  aria-label="技术栈"
  options={[
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
  ]}
  value={selected}
  onValueChange={setSelected}
/>
```

| Prop             | 类型                                                                        | 默认    | 说明             |
| ---------------- | --------------------------------------------------------------------------- | ------- | ---------------- |
| `options`        | `readonly { label: string; value: string \| number; disabled?: boolean }[]` | 必填    | 候选项           |
| `value`          | `readonly (string \| number)[]`                                             | 必填    | 当前选择         |
| `onValueChange`  | `(next) => void`                                                            | 必填    | 选择变化回调     |
| `searchable`     | `boolean`                                                                   | `true`  | 显示搜索         |
| `allowSelectAll` | `boolean`                                                                   | `true`  | 操作当前过滤结果 |
| `allowClear`     | `boolean`                                                                   | `true`  | 清空全部         |
| `disabled`       | `boolean`                                                                   | `false` | 禁用触发器       |

`aria-label` 应明确说明选择内容。此组件适合中小列表；大数据量需要服务端搜索或虚拟列表时应另建组件。
