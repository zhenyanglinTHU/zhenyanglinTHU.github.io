# 林镇阳个人学术网站

面向 GitHub Pages 的纯静态双语网站。当前版本仅在本地生成，尚未上传或部署。

## 本地预览

在本目录运行：

```powershell
python -m http.server 4173
```

然后访问 `http://127.0.0.1:4173/`。

## 页面结构

- `index.html`：首页与个人定位
- `research.html`：研究问题、研究方向与方法原则
- `systems.html`：系统、数据与实验基础设施
- `publications.html`：代表性论文及检索筛选
- `impact.html`：科研项目、经历、荣誉与鉴远智能
- `join.html`：研究切口、适合背景与申请方式
- `404.html`：GitHub Pages 错误页

## 内容维护

- 中英文内容位于同一 HTML 文件，通过 `.lang-zh` 和 `.lang-en` 切换。
- 全站样式位于 `assets/css/site.css`。
- 语言切换、移动导航和论文筛选位于 `assets/js/site.js`。
- 本地图片位于 `assets/images/`，不依赖第三方图床。

## 正式部署前待确认

1. GitHub 用户名与最终仓库名。
2. 北京中关村学院正式职务名称。
3. Google Scholar、ORCID、GitHub 等公开主页链接。
4. 完整论文目录、DOI 与可公开项目链接。
5. 奖项中的个人排序及适合公开的证书或官方链接。
6. 鉴远智能图示在个人公开网站上的最终授权范围。

收到确认前，不执行 GitHub 登录、建库、推送或 Pages 发布。
