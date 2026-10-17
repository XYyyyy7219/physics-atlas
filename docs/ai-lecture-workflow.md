# AI 讲义工作流：现有能力与提交步骤

本文件记录现有框架的使用方式。尚未接入自动写作服务、自动发布代理或云端数据服务，不改变原有网站设计。

## 内容放在哪里

专题讲义放在 `src/content/docs/lectures/<slug>.md` 或 `.mdx`；领域笔记放在同一内容目录下的 `mechanics/`、`electromagnetism/`、`thermodynamics/`、`waves/`、`optics/`、`modern/`、`math/` 中。使用英文小写文件名和连字符，保留每个目录的 `index.mdx`。

从 `templates/note.md.template` 复制结构即可。它故意没有正式学科内容。文章顶部填写标题、简介和排序；需要进入学习地图时再填写可选的 `atlas`。

## 网站如何发现文章

`src/content.config.ts` 使用 Starlight 内容加载器读取 Markdown / MDX，并校验元数据。`astro.config.mjs` 为领域和讲义目录配置了自动侧栏。`CollectionPage.astro` 从内容集合自动生成分类列表，首页 `RecentNotes.astro` 展示前三篇领域笔记。Pagefind 在构建时重建全文索引。

`src/lib/catalog.ts` 只将带 `atlas` 的内容加入图谱。`atlas.id` 必须唯一，`domain` 必须是已有领域，前置标识必须能解析，关系不得成环；这些问题会在构建时被拒绝。`variants` 用于不同推导路径，不应为了填满地图而虚构依赖关系。

当前“我的讲义”是浏览器内的知识点编排工具。新增全站讲义要提交内容文件；网页里的个人概要条目、教师备注和学习进度不会自动写回源码。

## 数学公式与构建

现有配置采用 remark-math + rehype-katex + KaTeX，支持行内和独立公式，设置了严格错误处理。`npm run verify` 使用网站实际 Markdown 配置检查两种公式渲染。数学符号能被排版不代表物理推导正确。

每篇新增内容在提交前执行：

```sh
npm ci
npm run check
npm test
npm run build
npm run verify
npm run preview
```

Windows PowerShell 可将 `npm` 写为 `npm.cmd`。依赖未改变且已安装时无需重复 `npm ci`。预览需要实际检查新文章、标题、公式、目录、链接、搜索和必要的图谱关系。

## 将来由 AI 生成内容时

1. 根据用户指定的主题、深度、符号和可用来源生成草稿；缺少资料时明确标记待核实，不编造教材页码、引用或结论。
2. 在单独分支写入内容文件，例如 `content/<slug>`。图片优先使用原创图或明确授权资源，记录出处；不上传整本教材 PDF、教师课件或私人资料。
3. 校验元数据与前置关系，逐步核查推导、单位、适用条件、极限情况和算例，避免仅做语言润色。
4. 运行上述项目检查并查看实际预览。在改动说明中记录检查结果、引用来源与仍需确认的问题。
5. 将草稿提交到 GitHub，并用 Pull Request 提供可审查差异。由用户或指定审核人确认学科内容和版权后再合并。
6. 合并源码与上线分开处理。只有获得明确部署授权并确认 Netlify 的关联状态后，才改变生产站点。后续如要自动化，可另行增加只做检查的 CI 与部署预览。

本次不生成正式讲义、不连接持续部署、不触发 GitHub Pages，也不为 AI 配置访问令牌或持续执行权限。
