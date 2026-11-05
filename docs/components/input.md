# Input

保留原项目 `Input` 的原生输入框 Props，并支持 `showCount`、`unit` 与数值输入过滤。迁入时将项目专用颜色类替换为 shadcn 语义令牌。

```bash
pnpm dlx shadcn@latest add naerzl/jing-ui/input
```

```tsx
<Input maxLength={24} showCount unit="字" placeholder="组件名称" />
<Input type="number" min={0} placeholder="仅输入非负数" />
```

| Prop           | 类型             | 说明                                            |
| -------------- | ---------------- | ----------------------------------------------- |
| `showCount`    | `boolean`        | 与数值型 `maxLength` 同时传入时显示字数         |
| `unit`         | `string`         | 输入框右侧单位；空字符串视为无单位              |
| `type` / `min` | 原生 input Props | `type="number"` 时按 `min` 过滤不合法的输入草稿 |

其余属性、`ref`、`onChange` 均沿用原生输入框。带单位或计数时，`className` 作用于外层输入容器。
