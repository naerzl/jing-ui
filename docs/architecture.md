# 技术方案与演进路径

## 目标和边界

本仓库面向 React 项目分发**可复制的源码**。每个公开组件要有独立安装项、依赖声明、交互示例和 API 文档。演示站直接 import `src/registry/ui`，让预览与安装内容保持一致。

公开组件不承载业务 API、权限、路由、上传服务或 ECharts 主题状态。`DataTable` 通过 Props 接收行数据、排序和分页回调，因此可以独立分发；其他业务组件仍需先拆除项目依赖。

## 选型

| 层       | 选择                                                      | 原因                                                                       |
| -------- | --------------------------------------------------------- | -------------------------------------------------------------------------- |
| 分发     | GitHub 源码 registry + 根目录 `registry.json`             | shadcn CLI 可直接安装 `owner/repo/item`；无需 npm 打包或 registry 服务     |
| 组件     | React 18 + TypeScript + Radix 版 shadcn 原语              | 与原项目兼容，保留无样式原语的可访问性能力                                 |
| 样式     | Tailwind CSS 3 + HSL 语义 CSS 变量                        | 与现有项目兼容；组件不绑定具体主色                                         |
| 文档演示 | Vite + React + MDX 静态站                                 | Markdown 是内容源，MDX 编译后与实时组件演示同站呈现，可部署至 GitHub Pages |
| 质量     | TypeScript、Biome、`shadcn registry validate`、Vite build | 分别校验源码、格式、分发清单和演示站                                       |

## 依赖规则

1. 没有本项目扩展的基础原语优先由官方 shadcn CLI 安装，`registryDependencies` 使用其裸名称，例如 `button`。
2. 自有组件之间若有依赖，使用完整 GitHub 地址并锁定发布标签，如 `naerzl/jing-ui/table#v0.2.2`。裸名称会解析到官方组件；顶层安装标签不会自动传给依赖。
3. npm 包写入 `dependencies`；每个组件仅声明自身实际需要的包。
4. 公开组件不得 import `src/demo`、`src/theme` 或原项目的 `api`、`router`、`store`。业务组件放在 `src/registry/business`，依赖的自有 UI 项用相对路径引用，安装目标对应 `@components/business` 与 `@ui`。
5. 组件文件名和 registry item 名称保持 kebab-case。

## 主题契约

公开组件以 `background`、`foreground`、`primary`、`accent`、`muted`、`border`、`ring` 等 shadcn 语义令牌绘制；状态标签和结果卡片额外读取 `--success`、`--warning`、`--info`，并提供默认值。演示站在 `data-accent` 上切换 4 套主色，在 `.dark` 上切换明暗模式。详见 [theming.md](./theming.md)。

## 发布流程

1. 新组件先进入 `src/registry/ui` 或 `src/registry/business`，补充 `registry.json`、`docs/components` 与演示。
2. 变更版本时先更新 `package.json`，运行 `pnpm registry:sync` 将自有依赖锁定到同一标签，再运行 `pnpm check`、`pnpm registry:validate`、`pnpm build`。
3. 合并到 `main` 后，由 GitHub Actions 部署演示站；发布时打相同的 `vX.Y.Z` 标签。
4. 使用者可安装 `#vX.Y.Z` 固定版本。组件源码安装到使用者项目后不自动升级，升级前比较本地改动。

## 后续迭代

- **下一批**：完整 DatePicker、FilterBar、图片预览和复制反馈。先拆原项目令牌与业务约束，再迁移。
- **组合组件**：DataTable 已以 Props 接收数据与回调；后续补充更多排序、选择和固定列场景的交互验证。FilterBar 需先完成日期与多选依赖迁移。
- **多版本适配**：Tailwind 4 / React 19 可新增 `v4` 分支或独立 registry item，兼容性验证通过后再调整主线；不在首版同时维护两套样式源码。
- **扩展分发**：只有在需要私有鉴权、统计或命名空间时，再添加独立 HTTP registry；GitHub 源码 registry 已覆盖当前需求。
