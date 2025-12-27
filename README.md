# AI-Muse ✨

> **AI 灵感空间** - 让 AI 创意作品触手可及的展示平台

一个专注于展示、体验和分享 AI 生成创意作品的开源项目，旨在降低创意门槛，让每个人都能轻松探索 AI 的无限可能。

## 🎯 项目简介

AI-Muse 是一个创新的 AI 创意作品展示平台，它打破了传统创意获取的壁垒。用户不仅可以浏览精美的 AI 生成作品，还能查看生成这些作品的 Prompt（提示词），从而学习和掌握 AI 提示词工程技巧。

### 核心理念

- **发现创意** - 浏览精选的 AI 生成作品集合
- **在线体验** - 点击即可在浏览器中实时运行作品
- **学习 Prompt** - 查看每个作品背后的 AI 提示词
- **降低门槛** - 让 AI 创作变得简单易学

## 🌟 核心功能

### 1. AI 作品展示墙
- 精美的卡片式布局展示 AI 生成的交互页面
- 支持 3D 可视化、交互动画、数据可视化等多种类型
- 智能分类和标签系统

### 2. 在线预览体验
- 点击作品即可在 iframe 中实时预览
- 支持全屏模式，沉浸式体验
- 安全隔离，保证浏览器安全

### 3. Prompt 展示与学习
- 展示生成每个作品的完整 AI Prompt
- 一键复制功能，方便学习和复用
- 详细的作品说明和技术解释

### 4. 分类与搜索
- 按类别快速筛选（3D、动画、可视化、游戏、艺术）
- 标签系统，精准定位感兴趣的内容
- 模糊搜索，快速找到目标作品

## 🛠️ 技术栈

### 前端框架
- **Next.js 14** - React 全栈框架，支持 SSR
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 实用优先的 CSS 框架
- **React Three Fiber** - React 中的 Three.js

### UI 组件
- **shadcn/ui** - 高质量 React 组件库
- **Lucide Icons** - 精美的图标系统
- **Framer Motion** - 流畅的动画库

### 3D 与交互
- **Three.js** - WebGL 3D 图形库
- **@react-three/drei** - R3F 辅助工具集
- **@react-three/postprocessing** - 后期处理效果

### 后端服务
- **Supabase** - 开源 Firebase 替代品
  - PostgreSQL 数据库
  - 文件存储服务
  - 实时数据订阅

### 部署平台
- **Vercel** - 前端托管和 Serverless 函数
- **Cloudflare R2** - 对象存储（兼容 S3）

## 📁 项目结构

```
AI-Muse/
├── ai-muse-app/              # Next.js 主应用
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx         # 首页 - 作品展示墙
│   │   ├── project/[id]/    # 作品详情页
│   │   └── upload/          # 作品上传页面
│   ├── components/          # React 组件
│   │   ├── ProjectCard.tsx  # 作品卡片组件
│   │   ├── ProjectGrid.tsx  # 作品网格布局
│   │   └── Header.tsx       # 导航栏
│   ├── lib/                 # 工具函数
│   │   ├── supabase.ts     # Supabase 客户端
│   │   └── types.ts        # TypeScript 类型定义
│   └── public/             # 静态资源
│
├── christmas-tree/          # 3D 圣诞树演示项目
│   ├── src/                # React 组件和逻辑
│   ├── public/             # 静态资源
│   └── README.md           # 项目说明文档
│
├── 地球&土星.html           # AI 生成的 3D 星球演示
├── 情绪卡片星云.html        # AI 生成的粒子星云演示
│
├── DEVELOPMENT_GUIDE.md    # 详细开发指南
└── README.md              # 项目说明文档（本文件）
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0
- npm 或 yarn 或 pnpm

### 1. 克隆项目

```bash
git clone https://github.com/bbbkawaii/AI-Muse.git
cd AI-Muse
```

### 2. 安装依赖

```bash
# 安装主应用依赖
cd ai-muse-app
npm install

# 或使用其他包管理器
yarn install
pnpm install
```

### 3. 配置环境变量

在 `ai-muse-app` 目录下创建 `.env.local` 文件：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 5. 体验圣诞树项目

```bash
# 切换到圣诞树项目目录
cd ../christmas-tree
npm install
npm run dev
```

打开浏览器访问 [http://localhost:3010](http://localhost:3010)

## 🎨 演示作品

项目包含多个 AI 生成的精彩演示作品：

### 1. 豪华互动圣诞树
- **技术**: React Three Fiber + MediaPipe 手势识别
- **特色**: 手势控制、混沌与秩序状态切换、照片分享
- **位置**: `christmas-tree/`

### 2. 地球与土星 3D 场景
- **技术**: Three.js + WebGL
- **特色**: 逼真的星球渲染、环形轨道、动态光照
- **位置**: `地球&土星.html`

### 3. 情绪卡片星云
- **技术**: Canvas API + 粒子系统
- **特色**: 交互式粒子效果、鼠标跟随、渐变色星云
- **位置**: `情绪卡片星云.html`

## 📦 部署指南

### 部署到 Vercel（推荐）

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   cd ai-muse-app
   vercel
   ```

4. **配置环境变量**
   在 Vercel Dashboard 中设置：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 部署到其他平台

项目支持部署到任何支持 Next.js 的平台：
- Netlify
- Railway
- Render
- AWS Amplify

## 📚 开发指南

详细的开发指南请查看 [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)，包含：

- 黑客松 48 小时开发计划
- 数据库设计方案
- AI Prompt 工程技巧
- UI/UX 设计建议
- 最佳实践和避坑指南
- 演示准备和评分技巧

## 🎯 适用场景

### 学习者
- 学习 AI Prompt 工程
- 研究前端 3D 技术
- 探索创意编程实现

### 创作者
- 展示 AI 创作作品
- 分享创意灵感
- 构建个人作品集

### 教育者
- 教学演示工具
- 课程案例资源
- 创意启发材料

## 🤝 贡献指南

欢迎贡献代码、提交 Issue 或改进文档！

### 如何贡献

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 贡献类型

- 添加新的 AI 生成作品演示
- 改进 UI/UX 设计
- 优化性能和代码质量
- 完善文档和教程
- 修复 Bug 和问题

## 📄 开源协议

本项目采用 MIT 协议开源，详见 [LICENSE](./LICENSE) 文件。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Three.js](https://threejs.org/) - 3D 图形库
- [Supabase](https://supabase.com/) - 开源后端服务
- [Vercel](https://vercel.com/) - 前端托管平台
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- Claude AI - 部分代码和创意生成

## 📞 联系方式

- GitHub: [@bbbkawaii](https://github.com/bbbkawaii)
- 项目地址: [https://github.com/bbbkawaii/AI-Muse](https://github.com/bbbkawaii/AI-Muse)

## 🌟 Star History

如果这个项目对你有帮助，请给它一个 Star ⭐️

---

**让 AI 创意触手可及，开启无限可能！** 🚀✨
