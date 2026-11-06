# 变更记录

## 0.2.3

- 文档站改用 Fumadocs（Next.js 16 + fumadocs 16）实现，独立为 `docs-site` 子应用，提供侧栏、页面目录、静态搜索、代码块复制与明暗模式。
- 文档源文件从 `docs/` 迁至 `docs-site/content/docs/`，转为带 frontmatter 的 MDX，并用 `meta.json` 组织侧栏顺序；演示站的文档入口改为链接到新站点。
- GitHub Pages 构建改为 `pnpm build:pages`：先构建演示站，再导出文档站，最后合并到 `dist/docs`。
- 重新设计文档导航、阅读布局和组件目录，17 个组件文档均接入可交互预览、代码页签、主题色同步、预览宽度与重置。
- 演示站与文档预览共用示例，旧文档链接自动跳转至新站点。
- DataTable 的分页页脚支持换行，改善窄屏显示。

## 0.2.2

- 分页器显式声明官方 Button 所需的 `class-variance-authority`，确保从全新 shadcn 项目安装 DataTable 时可直接通过 TypeScript 检查。

## 0.2.1

- 将 registry 内部自有依赖固定到同一发布标签。安装带版本号的业务组件时，Table、Pagination、Select 等自有依赖不会意外跟随默认分支变化。

## 0.2.0

- 从来源项目迁入 `Input`、`Textarea`、可清空 `Select`、`Pagination`、`Table`、`DescList`、`MoneyText`、`TimeText`、`ResultCard` 和业务组件 `DataTable`，并提供 `InputCount` 辅助项。
- 为新增条目补齐独立安装、依赖声明、文档和交互演示；组件数量从 6 增至 17 个 registry 条目。
- 保留迁入组件的主要 Props 和交互，将原项目颜色类适配为 shadcn 语义令牌。`MoneyText` 分转元改用字符串运算，`DataTable` 无分页回调时禁用分页。

## 0.1.0

- 建立 GitHub shadcn registry、Vite + MDX 文档演示站、4 套主题色与明暗模式。
- 发布 6 个通用交互的新实现：`counted-input`、`counted-textarea`、`multi-select`、`steps`、`status-tag`、`empty-state`。
