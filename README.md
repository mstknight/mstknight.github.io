# elio · Personal Space

React + Vite + Tailwind CSS v4 + Motion + Lucide + hls.js。暗色全屏个人网站，含首页、个人介绍、作品和联系页面。支持手机、键盘导航、减少动态效果设置和视频不可用时的静态背景。

## 本地运行

需要 Node.js 22.12 或更新版本。

```bash
npm ci
npm run dev
```

构建：`npm run build`。预览构建产物：`npm run preview`。

## 修改内容

在 `src/profile.js` 更新简介和作品。页面结构在 `src/main.jsx`，样式在 `src/index.css`。个人经历尚未提供，因此简介和作品区域明确标为待更新。

联系功能使用真实邮件链接和邮箱复制。GitHub Pages 是静态托管，不提供邮件收集后端；网站不会假装已订阅或发送邮件。

## 发布到 GitHub Pages

1. 在 GitHub 账号 `mstknight` 下新建公开仓库 `mstknight.github.io`。
2. 将项目文件推送到仓库的 `main` 分支（不包含 `node_modules`、`dist`）。
3. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
4. 在 **Actions** 页面运行 **Deploy to GitHub Pages**，或再次推送提交触发部署。
5. 部署成功后访问 https://mstknight.github.io/ 。

也支持其他仓库名：地址为 `https://mstknight.github.io/仓库名/`。Vite 使用相对资源路径，兼容此类子目录。

首次推送命令（请先创建对应仓库）：

```bash
git init -b main
git add .
git commit -m "Build elio personal website"
git remote add origin https://github.com/mstknight/mstknight.github.io.git
git push -u origin main
```

工作流在 `.github/workflows/deploy.yml`。在线字体来自 Google Fonts，背景视频来自提示词中的 Mux HLS 地址；网络不可用时自动保留系统字体和本地 CSS 背景。尊重系统减少动态效果设置，右下角可暂停视频。
