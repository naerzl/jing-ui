# Counted Textarea

带字数统计的文本域，组合官方 shadcn `Textarea`。

```bash
pnpm dlx shadcn@latest add naerzl/jing-ui/counted-textarea
```

```tsx
;<CountedTextarea maxLength={120} placeholder="补充说明" />
```

`CountedTextareaProps` 继承 `Textarea` 属性，增加 `showCount?: boolean`。仅在 `maxLength` 为数字且 `showCount` 为真时展示计数；默认展示。支持受控和非受控值。`className` 作用于外层容器。
