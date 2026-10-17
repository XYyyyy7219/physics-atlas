# Physics Atlas · 物理图谱

一个 Astro + Starlight 中文物理知识库框架。当前版本按你的要求只搭框架：**没有讲义、入门笔记或物理课程正文**。六个物理领域、数学工具、专题讲义和学习路线均保留内容入口。

现已补充“我的讲义”“可视化学习地图”和“学习位置导览”。“讲义推荐”不在本次范围。个人记录先保存在当前浏览器，可备份恢复，暂未接账号与云同步。详见 [学习工作台功能说明](./功能说明.md)。

## 先看网站

Windows 上双击 `preview.cmd`，然后打开终端显示的网址（通常为 http://127.0.0.1:4321/）。关闭该窗口会停止预览。第一次在新电脑解压源码后，需要联网下载项目依赖；不会安装全局软件。

也可以在本文件所在文件夹打开 PowerShell，执行：

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run preview
```

取得源码后先执行 `npm.cmd ci` 安装锁定版本的依赖。依赖已安装时，直接运行后两条即可。开发时可以用 `npm.cmd run dev`。macOS / Linux 把 `npm.cmd` 换成 `npm`。不要双击 `dist/index.html`：搜索和脚本需要通过网页服务加载。

## 已有框架

- 简洁的白底与蓝色强调色、物理图谱标识、六领域知识地图。
- 力学、电磁学、热学、振动与波、光学、近代物理分类。
- 数学工具、专题讲义、关于图谱、学习路线入口。
- 内容为空时的提示；添加文章后自动显示分类列表、首页条目与数量。
- Starlight 中文全文搜索、侧边栏、文章目录、主题切换和手机布局。
- Markdown / MDX、LaTeX 数学公式、表格、提示框与打印样式。
- 静态部署与 GitHub Pages 子路径支持。
- 知识点与前置关系、个人讲义编排、选择推导路径、前置补全与教师/学生预览。
- 可缩放、拖动的学习地图，学习状态、当前位置与侧栏导览。
- 个人条目、进度与多份讲义保存在浏览器，支持备份、恢复与撤销。

当前搜索可以查找分类和页面名称，等你补充正文后会在下次构建时自动扩充索引。开发模式 `npm.cmd run dev` 会自动刷新页面，但搜索需在 `build` 后的 `preview` 模式验证。

## 以后怎样补内容

你可以直接把讲义或笔记发给我，我来放入网站，不要求你写代码。如果想自行编辑：

1. 复制 `templates/note.md.template`。
2. 放到对应分类文件夹，改为英文小写文件名，例如 `my-note.md`。
3. 填写顶部的标题与简介，再写正文。
4. 运行 `npm.cmd run build`，然后预览。

| 文件夹 | 分类 |
| --- | --- |
| `src/content/docs/mechanics/` | 力学 |
| `src/content/docs/electromagnetism/` | 电磁学 |
| `src/content/docs/thermodynamics/` | 热学 |
| `src/content/docs/waves/` | 振动与波 |
| `src/content/docs/optics/` | 光学 |
| `src/content/docs/modern/` | 近代物理 |
| `src/content/docs/math/` | 数学工具 |
| `src/content/docs/lectures/` | 专题讲义 |

每个文件夹中的 `index.mdx` 是分类入口，保留即可。新建文章后，分类页和左侧菜单自动更新；`sidebar.order` 越小越靠前。首页展示按标题排序的前三篇领域笔记。

公式用单个美元符号包住行内式，用独占两行的双美元符号包住单独成行的公式。模板故意不附加学科正文。无效公式会使构建报错，避免把损坏的公式发布出去。

站内链接建议使用相对路径，以兼容 GitHub Pages：同分类文章用 `../my-note/`，从文章到另一分类用 `../../optics/`。详见 [Starlight 内容指南](https://starlight.astro.build/guides/authoring-content/)。

## 发布状态与后续更新

现有线上地址为 https://physics-atlas.netlify.app 。该站点来自之前的手动静态部署，用户已报告领取到自己的 Netlify 账号并更改名称；2026 年 10 月 18 日检查首页通过 HTTPS 返回 200。

本次整理源码用于独立 GitHub 仓库，不更改 Netlify 的生产部署来源、域名、DNS 或发布设置，也不触发生产部署。GitHub 仓库存在或保留 `netlify.toml` 不能证明已关联 Netlify，须以后台设置为准。原有配置仍为构建命令 `npm run build`、发布目录 `dist`、Node.js 24。

### 源码备份与本地预览

保留源码或下载源码压缩包，使用 `preview.cmd` 在自己的电脑查看。本地运行 `build` 只生成 `dist`，不会上传或改变线上网站。

### 方案 B：Netlify 手动上传

1. 由你登录自己的 Netlify 账号。
2. 在本地构建项目，取得新的 `dist` 文件夹。
3. 将**包含 index.html 的整个文件夹**拖到 Netlify 的手动部署区。
4. 平台会给出一个可访问的网站地址。

之后每次更新内容，需要重新构建并上传新 `dist` 文件夹。也可以在获得你的授权后连接 GitHub，使用已有 `netlify.toml`；构建命令 `npm run build`，发布目录 `dist`。参见 [Netlify 官方说明](https://docs.netlify.com/deploy/create-deploys/)。不在此承诺平台当前套餐或价格。

### 方案 C：GitHub Pages

保留的 `.github/workflows/deploy.yml` 仅通过 `workflow_dispatch` 手动触发。本次不运行它，也不启用 GitHub Pages；普通源码提交不会触发该工作流。

1. 选定你的 GitHub 账号与仓库名称。
2. 经你授权后，把项目源文件上传到仓库根目录（不要上传 `node_modules`、`.astro` 或 `dist`）。
3. 仓库 Settings → Pages → Source 选择 GitHub Actions。
4. Actions → “手动发布 Physics Atlas” → Run workflow。
5. 成功后打开工作流返回的网址。

工作流自动设置普通仓库的子路径；`用户名.github.io` 仓库使用根路径。自定义域名时要调整 `SITE_URL`、`BASE_PATH` 和域名设置。参见 [Astro 官方 GitHub Pages 指南](https://docs.astro.build/en/guides/deploy/github/)。远程流程仍需在你的仓库中实际运行后才能确认发布成功。

## 验证与维护

```powershell
npm.cmd run check
npm.cmd test
npm.cmd run build
npm.cmd run verify
```

`check` 检查项目错误；`build` 生成页面和搜索索引；`verify` 检查站内链接、资源、标题和独立的公式渲染。要求 Node.js ≥22.22.0，已使用你电脑上的 Node.js 24.21.0。依赖版本由 `package-lock.json` 锁定；不要直接执行可能造成不兼容的 `npm audit fix --force`。

## 权限与运行位置

原始文件保存在 Codex 的**本地 Windows 工作区**。本次在用户明确授权下整理并提交网站源代码，构建验收使用独立副本；不会上传本机依赖、构建产物、个人浏览器记录或远程访问凭据。不需要全局安装软件或修改 PowerShell 执行策略。

云端工作区则是在远程环境里创建文件、安装依赖与运行预览；云端助手不会因为你在本机打开了 PowerShell，就获得控制该窗口的能力。两者的文件不会自动同步，需要下载、上传或经授权使用 Git。

本项目启动脚本只在子进程中关闭 Astro 遥测，避免创建用户级配置。它不修改电脑的全局配置。

## 项目结构与 AI 内容工作流

`astro.config.mjs` 配置中文侧栏、主题、公式与站点路径；`src/content.config.ts` 加载并校验文章；`src/components/`、`src/styles/` 保留原有布局与外观；`src/lib/`、`src/scripts/` 实现学习工作台。依赖由 `package-lock.json` 锁定，目前为 Astro 7.4.0、Starlight 0.42.6 和 remark-math / rehype-katex / KaTeX。

AI 草稿应先写到单独分支，检查来源、推导、单位、适用条件、前置关系和实际预览，再提交 Pull Request 供人工审核。详见 [AI 讲义工作流](./docs/ai-lecture-workflow.md)。当前没有自动写作代理或自动上线服务；这些检查也不能代替学科正确性与版权审核。

不要提交 `node_modules/`、`dist/`、`.astro/`、`.netlify/`、缓存、`.env`、令牌、密钥或个人备份。`.gitignore` 默认也排除 PDF、Word 与 PowerPoint 原始材料；杨福家教材和教师课件等材料没有授权时不得上传。本仓库不为第三方材料授予许可。
