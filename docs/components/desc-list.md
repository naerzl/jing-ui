# Desc List

原项目通用详情展示组件，支持 1–4 列、跨列、边框和两种密度。

```bash
pnpm dlx shadcn@latest add naerzl/jing-ui/desc-list
```

```tsx
;<DescList
  column={2}
  bordered
  items={[
    { label: '名称', value: 'Jing UI' },
    { label: '状态', value: '已发布' },
    { label: '说明', value: '源码分发', span: 2 },
  ]}
/>
```

`items` 必填，单项为 `{ label, value, span? }`；`column` 默认 `2`，`bordered` 默认 `false`，`size` 为 `sm` 或 `md`，默认 `md`。迁入时仅替换项目专用颜色类。
