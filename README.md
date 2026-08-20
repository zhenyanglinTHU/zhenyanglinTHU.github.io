# 林镇阳个人学术网站

林镇阳的中英文个人学术网站，围绕社会世界模型、多智能体社会模拟、
AI Data 与计算治理，以及科研成果产业化实践展开。

- 正式网站：<https://zhenyanglinthu.github.io/>
- GitHub 仓库：<https://github.com/zhenyanglinTHU/zhenyanglinTHU.github.io>
- 部署方式：GitHub Pages，`main` 分支根目录
- 默认语言：英文，可切换中文

## 目录结构

```text
.
|-- index.html                  # 首页与个人定位
|-- research.html               # 研究问题、方向与方法
|-- systems.html                # 系统、数据与实验基础设施
|-- publications.html           # 代表性论文与成果
|-- impact.html                 # 经历、项目、荣誉与产业实践
|-- join.html                   # 课题组方向与申请方式
|-- 404.html                    # GitHub Pages 错误页
|-- assets/
|   |-- css/
|   |   `-- main.css            # 全站样式
|   |-- js/
|   |   `-- main.js             # 语言、导航与筛选交互
|   `-- images/
|       |-- brand/              # 网站图标与品牌资源
|       |-- profile/            # 个人照片
|       |-- research/           # 研究框架与系统图
|       `-- venture/            # 产业化与鉴远智能素材
|-- .nojekyll                   # 禁用 Jekyll 处理
`-- .gitignore                  # 本地文件排除规则
```

## 命名约定

- 文件与目录统一使用小写英文和连字符，例如
  `social-world-model-framework.png`。
- 页面文件保留在仓库根目录，确保 GitHub Pages 地址简洁稳定。
- 正式网页只保留实际使用的图片；历史版本可通过 Git 提交记录恢复。
- 新图片按用途放入 `brand`、`profile`、`research` 或 `venture`。

## 本地预览

在本目录启动任意静态文件服务器。例如：

```powershell
python -m http.server 4173
```

然后访问 <http://127.0.0.1:4173/>。

## 内容维护

- 中英文内容位于同一 HTML 文件，通过 `.lang-zh` 和 `.lang-en` 切换。
- 修改公共视觉样式时编辑 `assets/css/main.css`。
- 修改语言切换、移动导航或论文筛选时编辑 `assets/js/main.js`。
- 不直接修改线上文件；所有变更先在本地检查，再提交到 Git。

## 发布流程

```powershell
git status
git add .
git commit -m "Describe the update"
git push
```

推送到 `main` 后，GitHub Pages 会自动构建并更新正式网站。每次提交均保留
完整修改记录，可通过 Git 查看差异或恢复历史版本。
