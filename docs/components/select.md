# Select

原项目在 Radix Select 上增加的清空能力，保留 `Select`、`SelectTrigger`、`SelectValue`、`SelectContent`、`SelectItem` 等组合 API。

```bash
pnpm dlx shadcn@latest add naerzl/jing-ui/select
```

```tsx
;<Select allowClear value={value} onValueChange={setValue}>
  <SelectTrigger aria-label="环境">
    <SelectValue placeholder="选择环境" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="dev">开发环境</SelectItem>
    <SelectItem value="prod">生产环境</SelectItem>
  </SelectContent>
</Select>
```

`allowClear` 默认 `false`；清空会调用 `onValueChange(clearValue)`，`clearValue` 默认空字符串。支持 `value` 与 `defaultValue` 两种用法。清空按钮有独立的键盘交互与可访问名称。
