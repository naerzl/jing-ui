# Jing UI

一个可直接从 GitHub 安装的个人 shadcn 组件源码仓库。组件源码与演示站使用同一份文件；安装后代码归使用者项目所有，便于继续定制。

## 快速开始

前提：目标项目已经执行过 `shadcn init`，并配置了 Tailwind CSS 与 `components.json`。

```bash
pnpm dlx shadcn@latest add naerzl/jing-ui/multi-select
pnpm dlx shadcn@latest add naerzl/jing-ui/input
pnpm dlx shadcn@latest add naerzl/jing-ui/data-table
```

也可以用发布标签锁定版本：`pnpm dlx shadcn@latest add naerzl/jing-ui/data-table#v0.2.3`。自有组件依赖也固定到同一标签，CLI 会一并安装。安装 `input`、`textarea`、`select`、`table` 会覆盖目标项目中的同名组件；先检查目标项目已有的定制。

## 本地运行

```bash
pnpm install
pnpm --dir docs-site install
pnpm dev          # 组件演示站，http://localhost:5173
pnpm docs:dev     # 文档站，http://localhost:3000/docs
pnpm check
pnpm registry:validate
pnpm build        # 演示站
pnpm build:docs   # 文档站静态导出
```

文档站使用独立依赖。两个开发服务同时运行时，文档页面会嵌入 Vite 提供的组件预览；预览与演示站共用示例。

演示站：<https://naerzl.github.io/jing-ui/>，文档站：<https://naerzl.github.io/jing-ui/docs/>。文档由 [fumadocs](https://github.com/fuma-nama/fumadocs) 驱动，内容源是 `docs-site/content/docs` 下的 MDX。原项目盘点和迁移状态见 [来源项目组件盘点](https://naerzl.github.io/jing-ui/docs/source-inventory/)。当前有 17 个 registry 条目，其中 6 个是首版新实现、10 个是从原项目迁入的组件、1 个是输入计数辅助项；包含 `DataTable` 业务组件。

## 架构

| 目录                            | 作用                                        |
| ------------------------------- | ------------------------------------------- |
| `src/registry/ui/`              | 对外分发的组件源码，演示站直接引用          |
| `src/registry/business/`        | 无 API、路由和权限依赖的业务组合组件        |
| `registry.json`                 | GitHub shadcn registry 清单、依赖、安装目标 |
| `src/components/ui/`            | 演示站通过 shadcn CLI 安装的官方基础组件    |
| `src/demo/`                     | 交互式组件示例                              |
| `src/demo/component-catalog.ts` | 组件目录、分类和代码示例的共同来源          |
| `src/theme/`、`src/styles.css`  | 演示站的明暗模式、主题色与语义令牌          |
| `docs-site/`                    | fumadocs 文档站（Next.js，独立依赖与构建）  |
| `docs-site/content/docs/`       | 文档 MDX 与侧栏顺序（`meta.json`）          |

发布组件只使用通用 shadcn 语义令牌，不引用原业务项目的 API、路由、权限或专有状态。目标项目可以继续使用自己的主题；演示站展示 4 套主色和明暗模式切换。迁入组件尽量保留原有 Props 和交互，样式类按语义令牌适配；`MoneyText` 的分转元实现改为字符串移位以避免大数精度损失。

## 技术基线

组件与演示站以 React 18、TypeScript、Tailwind CSS 3、Radix 版 shadcn 组件和 Vite 构建，便于从现有 React 18 / Tailwind 3 项目迁移。仓库分发方式是源码 registry，不打包 npm 组件；未来可另增 Tailwind 4 / React 19 适配，而不改变组件的交互契约。

文档站使用 Next.js 16 + fumadocs 16 + Tailwind CSS 4，运行在独立的 `docs-site` 依赖里。文档中的 iframe 预览运行实际分发组件，支持主题联动、宽度切换与重置。构建时通过 `GITHUB_PAGES=true DOCS_BASE_PATH=/jing-ui pnpm build:pages` 生成完整静态站；构建会验证全部组件文档、预览和资源链接。参见 [技术方案](https://naerzl.github.io/jing-ui/docs/architecture/)。

## 许可与来源

自有组件以 MIT 许可发布。演示站使用 shadcn CLI 安装的基础组件；shadcn/ui、Radix UI 与 fumadocs 的许可信息见 [NOTICE.md](./NOTICE.md)。
