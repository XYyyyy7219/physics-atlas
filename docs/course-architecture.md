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

CourseCard、KnowledgeMap 提供统一课程入口，首页标题为“物理图谱”，课程组标题为“普通物理”。CourseOverview 负责总览正文、章节卡片与锚点区域。CourseNavigation 复用 Starlight 左栏与移动抽屉，在各页面统一显示可折叠的“知识库”、浅色“普通物理”分类、无编号的五门课程，以及独立的“我的讲义”入口。左侧不再重复课程总览或章节树，点击品牌返回首页。

CourseChapterNav 保留桌面右栏和窄屏折叠目录，章节编号统一使用“第一章、第二章”等中文表达，稳定的 ID 和锚点不受显示名称影响。CourseColumns、CoursePageTitle、CoursePageSidebar 仅覆盖课程页，其他页面委托 Starlight 原组件。

course-navigation.ts 同步滚动位置、当前章节、卡片边框和 aria-current；原生锚点保留历史记录和键盘访问。移动章节目录选中后折叠并聚焦正文。样式由 courses.css 维护，复用 Atlas 颜色变量，首次默认深色，仍可切换浅色或自动主题。顶部和工作台导航不再显示独立的学习地图菜单；底部学习位置导览保留，可继续打开完整地图，既有个人记录和地图路由不变。“开始探索”“知识库首页”“专题讲义”不再作为侧栏选项，原有内容文件没有删除。

现有个人进度与讲义存储保持不变。已发布章节复用相同的浏览器存储显示真实节点掌握数，没有增加用户系统、数据库、云同步或自动讲义生成。

## 已发布的原子物理学讲义

第一章“原子的位形：卢瑟福模型”位于 `/atomic-physics/chapter-01/`，全章六节，当前收录前三节的十三个知识节点。章节卡片进入分节知识库，节点按钮切换概要和快速回顾，阅读链接打开完整讲义，加入讲义与掌握状态沿用现有个人工作台。未提供的三节只显示节次与待补充状态，不拟定标题。

完整 Markdown 位于 `src/content/docs/atomic-physics/chapter-01/section-01.md` 至 `section-03.md`。`lecture` 元数据管理节次、章节归属和节点目录；正文以 `data-knowledge-content` 区域标识节点，使个人讲义预览仅提取选中的节点。节点 ID 和原文锚点保留，N04、N06、N05 的阅读顺序沿用提供的稿件。前置关系只录入稿件明确链接的前置节点，相关知识与未发布节点不自动当作先修。

新增一节时，增加含 `lecture` 元数据的 Markdown，沿用章节 ID、唯一节次和节点 ID。章节页、课程统计、知识库、搜索和地图会在构建后更新。前置标识必须指向已收录节点。正文更改时同时维护同一文件的 summary、quickReview 与节点目录；正文详细内容仍只保存在 Markdown 中。科学来源、待核实说明与待绘制配图说明继续保留，未上传教材 PDF 或课件。

## 检查与发布

运行 `npm.cmd run check`、`npm.cmd test`，再设置 `SITE_URL=https://physics-atlas.netlify.app` 执行 `npm.cmd run build` 与 `npm.cmd run verify`。构建生成静态页面、搜索索引和站点地图。

AI 内容先在独立分支整理并检查来源、物理正确性与实际预览，再通过 Pull Request 审核。上传 GitHub 不会自动更新当前 Netlify，因为站点尚未关联 Git 仓库。发布沿用已授权的 Netlify CLI 手动部署同一站点的 dist，不能新建站点或修改域名。
