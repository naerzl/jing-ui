# Pagination

保留原项目的页码、省略号、每页条数、禁用和总数下限场景。

```bash
pnpm dlx shadcn@latest add naerzl/jing-ui/pagination
```

```tsx
;<Pagination
  page={page}
  pageSize={pageSize}
  total={total}
  onChange={(nextPage, nextSize) => {
    setPage(nextPage)
    setPageSize(nextSize)
  }}
/>
```

| Prop                          | 类型                       | 默认             | 说明                               |
| ----------------------------- | -------------------------- | ---------------- | ---------------------------------- |
| `page` / `pageSize` / `total` | `number`                   | 必填             | 当前页、每页数量、已知总数         |
| `onChange`                    | `(page, pageSize) => void` | 必填             | 页码或条数变化                     |
| `pageSizeOptions`             | `number[]`                 | `[10,20,50,100]` | 每页条数                           |
| `hasNextPage`                 | `boolean`                  | 未设置           | 总数仅为下限时，控制下一页是否可用 |
| `disabled`                    | `boolean`                  | `false`          | 禁用操作                           |
