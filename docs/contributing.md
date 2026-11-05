# 新增组件

1. 确定组件是通用交互，先检查 shadcn 官方是否已有原语可以组合。
2. 在 `src/registry/ui/<name>.tsx` 实现组件，使用语义令牌和明确的 Props 类型；额外 CSS 与组件放在同目录。
3. 在根目录 `registry.json` 增加同名 item，并写全 npm 与 registry 依赖。内部组件依赖使用完整 GitHub 地址。
4. 在 `src/demo/app.tsx` 增加可交互的真实状态示例，在 `docs/components/` 写安装方式、Props、示例和注意事项。
5. 运行 `pnpm check`、`pnpm registry:validate`、`pnpm build`，确认组件在明暗模式及各主题色下可读。
6. 合并后打版本标签，并用标签地址验证安装。

组件不得直接依赖原项目的 API、权限、路由或 Valtio store。需要这些能力时，通过 Props 传入数据与回调。
