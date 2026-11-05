# Money Text

金额格式化组件，支持千分位、货币符号、分转元与空值占位。

```bash
pnpm dlx shadcn@latest add naerzl/jing-ui/money-text
```

```tsx
;<MoneyText value="12345678901234567890" fromCents />
```

`value` 接受字符串或数字，建议传字符串以保留大数精度；`currency` 默认 `¥`，`fractionDigits` 默认 `2`，`fromCents` 默认 `false`，`fallback` 默认 `—`。从原项目迁入时将分转元改为字符串移位，避免 `Number` 对大额数值造成精度损失。小数位按原实现截取并补零，不作四舍五入。
