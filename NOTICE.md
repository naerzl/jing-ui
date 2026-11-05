# 第三方声明

- [shadcn/ui](https://github.com/shadcn-ui/ui) — MIT License。`src/components/ui/` 中的演示站基础组件由 shadcn CLI 安装。
- [Radix UI](https://github.com/radix-ui/primitives) — MIT License。部分交互组件使用其无样式原语。
- [Lucide](https://github.com/lucide-icons/lucide) — ISC License。演示与部分组件使用图标。
- [TanStack Table](https://github.com/TanStack/table) — MIT License。`DataTable` 使用其表格状态模型。
- [Day.js](https://github.com/iamkun/dayjs) — MIT License。`TimeText` 使用日期格式化与相对时间。

`src/registry/ui/` 包含首版根据通用交互需求整理的新实现，以及从来源项目 `src/components/ui` 和 `src/components/base` 迁入的通用组件；`src/registry/business/data-table.tsx` 来自该项目的通用业务表格。迁入时移除了项目专用样式令牌，并未包含请求、权限、路由或品牌资源。
