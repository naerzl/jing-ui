# Status Tag

语义状态标签。组件会同时安装 `status-tag.tsx` 和 `status-tag.css`。

```bash
pnpm dlx shadcn@latest add naerzl/jing-ui/status-tag
```

```tsx
<StatusTag tone="success">已完成</StatusTag>
<StatusTag tone="warning" variant="outline">待处理</StatusTag>
```

`tone`：`success`、`warning`、`danger`、`info`、`neutral`、`primary`，默认 `neutral`。`variant`：`soft`（默认）、`solid`、`outline`。`dot` 默认显示，可用 `icon` 替换。使用 `--success`、`--warning`、`--info` 等语义变量，并内置回退色；状态必须保留可读文案。
