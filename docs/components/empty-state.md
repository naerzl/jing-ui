# Empty State

可组合的空状态，图标、说明与操作均由调用方提供。

```bash
pnpm dlx shadcn@latest add naerzl/jing-ui/empty-state
```

```tsx
;<EmptyState
  title="还没有数据"
  description="创建第一条记录后会显示在这里。"
  action={<Button onClick={onCreate}>创建记录</Button>}
/>
```

`title` 必填；`description`、`icon`、`action`、`className` 可选。默认使用 Lucide `Inbox` 图标。操作按钮由调用方自行导入并处理业务行为。
