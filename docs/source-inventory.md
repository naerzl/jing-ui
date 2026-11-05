# 来源项目组件盘点

盘点日期：2026-11-05。以下记录是源码依赖和复用性判断，不代表运行环境已验证。公开仓库只收录通用交互的新实现，不包含来源项目的业务代码。

## `src/components/ui`：33 个

| 类型                      | 组件                                                                                                                                                                                                                                       | 处理                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| shadcn 基础原语与本地样式 | `alert`、`avatar`、`badge`、`breadcrumb`、`button`、`card`、`checkbox`、`dialog`、`drawer`、`dropdown-menu`、`form`、`label`、`popover`、`progress`、`radio-group`、`separator`、`skeleton`、`switch`、`table`、`tabs`、`toast`、`tooltip` | 消费端优先由官方 shadcn CLI 安装，避免在个人 registry 里重复维护原语                |
| 已扩展的基础输入          | `input`、`input-count`、`textarea`、`select`                                                                                                                                                                                               | 首批提取字数统计为 `counted-input` / `counted-textarea`；可清空 Select 后续单独抽象 |
| 组合型通用组件            | `multi-select`、`steps`、`calendar`、`date-picker`、`pagination`、`table-pagination`、`image-viewer`                                                                                                                                       | 首批重做 `multi-select`、`steps`；日期、分页和图片预览需要拆令牌与兼容行为          |

## `src/components/base`：13 个

| 迁移优先级   | 组件                                                                                            | 原因                                                                        |
| ------------ | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 首批         | `empty-state`、`status-tag`                                                                     | API 简单、无请求或路由依赖；已以独立实现进入本仓库                          |
| 第二批       | `copyable-text`、`desc-list`、`money-text`、`page-header`、`result-card`、`time-text`           | 通用性较高，但需要统一日期、金额、反馈消息和颜色契约                        |
| 拆分后再评估 | `metric-card`、`trend-card`、`e-chart`、`page-detail-shell`、`page-list-shell`、`box-animation` | 图表依赖 ECharts/Valtio，页面壳依赖路由或页面布局；动画需要明确业务以外用途 |

## `src/components/business`：8 个

`data-table`、`filter-bar` 有通用潜力，但当前分别依赖 TanStack Table 和项目的日期/筛选组件，且表格包含较多项目行为。`detail-link`、`list-actions` 依赖路由或权限；`file-upload-field` 依赖项目上传 API；`monitoring-trend-chart`、`usage-rank-chart` 依赖图表主题和业务数据；`user-info-card` 依赖管理 API。首版均不公开。

## `src/components/feedback`：2 个

`toast` 是 Sonner 的项目适配；`modal` 是命令式弹窗适配。后续若要发布，应设计为可注入的通用适配器，避免把项目反馈文案和挂载约定带入公共组件。

## 首批发布清单

`counted-input`、`counted-textarea`、`multi-select`、`steps`、`status-tag`、`empty-state`。这些是从现有交互需求提炼的新实现，API 与原项目并非完全等价；迁回原项目时要逐页核对原有 Props 和视觉行为。
