# 变更记录

## 0.2.0

- 从来源项目迁入 `Input`、`Textarea`、可清空 `Select`、`Pagination`、`Table`、`DescList`、`MoneyText`、`TimeText`、`ResultCard` 和业务组件 `DataTable`，并提供 `InputCount` 辅助项。
- 为新增条目补齐独立安装、依赖声明、文档和交互演示；组件数量从 6 增至 17 个 registry 条目。
- 保留迁入组件的主要 Props 和交互，将原项目颜色类适配为 shadcn 语义令牌。`MoneyText` 分转元改用字符串运算，`DataTable` 无分页回调时禁用分页。

## 0.1.0

- 建立 GitHub shadcn registry、Vite + MDX 文档演示站、4 套主题色与明暗模式。
- 发布 6 个通用交互的新实现：`counted-input`、`counted-textarea`、`multi-select`、`steps`、`status-tag`、`empty-state`。
