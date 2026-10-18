# 课程入口与章节总览

现有 Astro + Starlight 项目中的增量实现，继续使用原有路由、搜索与 Netlify 站点。

## 路由与数据

- `/`：课程入口，统一卡片展示五门普通物理课程。
- `/mechanics/`：力学总览，三个明确标注为可调整的章节示例。
- `/thermodynamics/`、`/electromagnetism/`、`/optics/`、`/atomic-physics/`：复用同一总览模板，未提供大纲时显示待整理状态。
- `/library/`、`/my-lectures/`、`/learning-map/` 保留原有功能与个人存储键。

`src/data/courses.ts` 是课程标题、顺序、简介与目标的单一数据来源。课程 `id` 同时是已有网址的 slug，修改标题或顺序时保留 ID。增加课程时添加对应的 MDX 入口目录，侧栏与分类校验从课程数据生成。

`src/data/chapters.ts` 管理章节 ID、课程归属、slug、顺序、简述、探索线索、前置关系与 `example` 标记。当前力学目录仅为布局示例，不能作为正式教学大纲。章节 ID 供知识点引用；slug 决定页内锚点，调整时应保留旧引用或补充兼容链接。

`src/lib/course-outline.ts` 在构建时检查重复标识、重复章节路径、缺失课程、缺失前置和循环依赖。前置章节可以跨课程引用。所有页面保留基础 HTML 链接，即使脚本不可用仍能导航。

## 添加知识条目

讲义继续放入 `src/content/docs/<课程 ID>/` 的 `.md` 或 `.mdx` 文件中。建议使用非 index 的文件名。按原有 `atlas` 元数据接入知识库、搜索和学习地图，可选 `chapter` 关联到真实章节：

```yaml
---
title: 知识点标题
description: 一句话概述
atlas:
  id: mechanics-unique-knowledge-id
  domain: mechanics
  chapter: mechanics-motion
  kind: concept
  requires: []
---
```

`kind` 沿用现有 concept / law / method / example 分类。本次没有扩展成新的教学内容系统。未设置 chapter 的已有知识点显示在课程底部，不会丢失。设置 chapter 后，总览自动展示真实条目链接和数量；课程卡片的数量只统计实际 atlas 条目。无条目时不显示数量或完成率。

数学公式继续使用 `$...$` 与 `$$...$$`，由现有 remark-math、rehype-katex、KaTeX 渲染。搜索索引由构建自动更新。

## 组件与交互

CourseCard、KnowledgeMap 提供统一课程入口。CourseOverview 负责总览正文、章节卡片与锚点区域。CourseNavigation 复用 Starlight 左栏与移动抽屉；CourseChapterNav 提供桌面右栏和窄屏折叠目录。CourseColumns、CoursePageTitle、CoursePageSidebar 仅覆盖课程页，其他页面委托 Starlight 原组件。

course-navigation.ts 同步滚动位置、当前章节、卡片边框和 aria-current；原生锚点保留历史记录和键盘访问。移动目录选中后折叠，侧栏抽屉选中章节后关闭并聚焦正文。样式由 courses.css 维护，复用 Atlas 颜色变量，首次默认深色，仍可切换浅色或自动主题。

现有个人进度与讲义存储保持不变。本次没有新增总览进度统计、用户系统、数据库、云同步、完整图谱算法或自动讲义生成。稳定的章节关联为后续功能提供数据基础。

## 检查与发布

运行 `npm.cmd run check`、`npm.cmd test`，再设置 `SITE_URL=https://physics-atlas.netlify.app` 执行 `npm.cmd run build` 与 `npm.cmd run verify`。构建生成静态页面、搜索索引和站点地图。

AI 内容先在独立分支整理并检查来源、物理正确性与实际预览，再通过 Pull Request 审核。上传 GitHub 不会自动更新当前 Netlify，因为站点尚未关联 Git 仓库。发布沿用已授权的 Netlify CLI 手动部署同一站点的 dist，不能新建站点或修改域名。
