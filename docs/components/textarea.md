# Textarea

原项目文本域，保留原生 Props、`ref` 与可选字数统计；迁入时仅适配语义样式类。

```bash
pnpm dlx shadcn@latest add naerzl/jing-ui/textarea
```

```tsx
;<Textarea maxLength={120} showCount placeholder="补充说明" />
```

`showCount` 为 `true` 且指定数值型 `maxLength` 时显示计数。受控与非受控值都能更新计数；超过上限由原生 `maxLength` 限制。其他属性与原生 `textarea` 相同。
