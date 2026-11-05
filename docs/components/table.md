# Table

原项目表格基础元素。与常见 shadcn Table API 相同，额外提供 `wrapperClassName` 控制横向滚动容器。

```bash
pnpm dlx shadcn@latest add naerzl/jing-ui/table
```

```tsx
;<Table wrapperClassName="max-h-80" aria-label="组件列表">
  <TableHeader>
    <TableRow>
      <TableHead>名称</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data Table</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

还导出 `TableFooter` 和 `TableCaption`。此项是 `DataTable` 的直接依赖；安装业务表格时会自动带入。
