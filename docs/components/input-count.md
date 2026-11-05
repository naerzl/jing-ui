# Input Count

`Input` 和 `Textarea` 共用的计数辅助项。安装这两个组件时会自动带入，通常无需单独安装。

```bash
pnpm dlx shadcn@latest add naerzl/jing-ui/input-count
```

```tsx
;<InputCount length={7} maxLength={30} layout="inline" />
```

`length`、`maxLength` 必填；`layout` 为 `inline` 或 `overlay`，默认 `overlay`。同时导出 `useInputCount`、`getInputValueLength` 与宽度类名辅助函数，供输入组件复用。

源码来自原项目 `src/components/ui/input-count.tsx`，仅将字体尺寸适配为标准 Tailwind 类名。
