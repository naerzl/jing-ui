# Steps

展示流程当前位置，`current` 为从 0 开始的索引；当前项带有 `aria-current="step"`。

```bash
pnpm dlx shadcn@latest add naerzl/jing-ui/steps
```

```tsx
;<Steps
  current={1}
  variant="cards"
  items={[
    { title: '基本信息', description: '填写名称' },
    { title: '配置规则', description: '确定范围' },
    { title: '完成', description: '检查结果' },
  ]}
/>
```

`items` 是只读步骤数组；`variant` 可选 `inline`（默认）或 `cards`；`className` 作用于有序列表。组件仅负责显示进度，提交和跳转由宿主页面控制。
