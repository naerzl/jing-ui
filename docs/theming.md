# 主题与颜色

组件使用语义令牌，主题色由宿主应用决定。演示站提供钴蓝、橘红、森林绿、紫罗兰四套主色，同时支持浅色、深色和跟随系统。

## 演示站实现

- `src/styles.css` 定义基础 shadcn 变量和 `[data-accent]` 调色板。
- `src/theme/theme-provider.tsx` 管理模式和主色，并保存到 `localStorage`。
- 选择主题时仅改 CSS 变量；组件不会维护第二套颜色样式。

## 目标项目接入

已有 shadcn 项目安装组件后，会沿用其 `--primary`、`--primary-foreground`、`--accent`、`--ring` 等变量。想切换主色，可以在自己的全局 CSS 中覆盖变量：

```css
:root[data-accent="forest"] {
  --primary: 155 69% 30%;
  --primary-foreground: 0 0% 100%;
  --accent: 150 35% 92%;
  --accent-foreground: 155 68% 22%;
  --ring: 155 69% 30%;
}
```

Tailwind 3 的颜色映射需使用 `hsl(var(--primary) / <alpha-value>)` 等形式。若应用已有十六进制令牌，先在自身主题层建立 shadcn 语义别名，避免让分发组件依赖项目专用的 `text-1`、`surface`、`primary-500` 等名称。

`StatusTag` 与 `ResultCard` 额外读取 `--success`、`--warning`、`--info`；没有定义时会使用组件内置回退色。颜色只是辅助信息，文案仍需明确表达状态。
