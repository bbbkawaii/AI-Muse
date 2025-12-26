# AI-Muse 黑客松开发指南

## 🎯 项目定位

**AI-Muse (AI 灵感空间)** - 一个让 AI 创意作品触手可及的平台

核心理念：让用户能快速发现、体验和分享 AI 创意作品

---

## 🚀 黑客松目标（48小时）

### 必须完成的核心功能
1. **展示墙** - 展示 AI 生成的交互页面（如 3D 可视化、交互动画等）
2. **在线预览** - 点击即可在 iframe 中体验作品
3. **显示 Prompt** - 展示生成这个作品的 AI prompt
4. **作品说明** - 解释这个作品的创意点和实现方式
5. **简单搜索** - 按标签/类别快速找到感兴趣的内容

### 评委会看到的亮点
- ✨ 精美的作品展示界面
- 🤖 展示 AI 生成的创意作品（突出 AI 应用）
- 📝 每个作品都有 Prompt，体现 AI 提示词工程
- 🎨 至少 5-10 个优质 Demo 作品
- 🔍 良好的分类和发现机制

---

## 🛠️ 技术栈（保持简单）

### 前端（推荐）
```
Next.js 14 + TypeScript + Tailwind CSS
- 快速搭建，自带 SSR
- shadcn/ui 组件库（复制粘贴即用）
- 部署到 Vercel（一键部署）
```

### 数据存储（最简方案）
**选项 1: Supabase（推荐黑客松使用）**
- 免费 PostgreSQL 数据库
- 自带认证系统
- 自带文件存储
- 自动生成 API
- 5分钟完成配置

**选项 2: Firebase**
- 实时数据库
- 自带认证
- 文件存储
- 快速上手

**选项 3: 本地 JSON（超快速原型）**
- 最快开始
- 演示够用
- 后期可迁移

### 页面展示方式
```
方案 1: iframe 嵌入（推荐）
- 将 AI 生成的 HTML 文件上传到 Supabase Storage
- 在详情页用 iframe 嵌入显示
- 简单安全，完全隔离

方案 2: 直接渲染（快速原型）
- 将 HTML 存在数据库
- 使用 dangerouslySetInnerHTML（需注意安全）
- 适合受控环境
```

### AI 页面生成（准备 Demo）
```
使用 Claude / ChatGPT / v0.dev
- Prompt: "创建一个粒子星云动画的完整 HTML 页面"
- 复制生成的完整 HTML 代码
- 保存为 .html 文件，上传到项目
```

---

## ⚡ 48小时开发计划

### Day 1 上午（4小时）- 搭建基础

**小时 1-2: 项目初始化**
```bash
# 创建 Next.js 项目
npx create-next-app@latest ai-muse --typescript --tailwind --app

# 安装核心依赖
npm install @supabase/supabase-js
npm install lucide-react
npm install react-markdown  # 用于渲染说明文档

# 安装 UI 组件（shadcn/ui）
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input badge dialog
```

**小时 3-4: 数据库和基础页面**
- 注册 Supabase，创建项目
- 创建 `projects` 表
- 完成首页框架
- 部署到 Vercel（确保环境可用）

### Day 1 下午（4小时）- 核心功能

**小时 5-6: 作品展示**
- 瀑布流/卡片展示组件
- 假数据填充（先用 mock data）
- 分类标签系统
- 卡片显示缩略图、标题、标签

**小时 7-8: 页面预览功能**
- iframe 嵌入组件
- 准备第一个 AI 生成的 Demo（用 Claude 生成一个炫酷的 HTML）
- 测试 iframe 显示效果
- 调整 iframe 样式和响应式

### Day 1 晚上（4小时）- 完善体验

**小时 9-10: 作品详情页**
- 点击查看作品详情
- iframe 全屏预览
- 显示作品说明
- 显示生成该作品的 Prompt
- 复制 Prompt 按钮

**小时 11-12: 上传功能（可选）**
- 简单表单（标题、描述、HTML 文件、Prompt、标签）
- 文件上传到 Supabase Storage
- 保存元数据到数据库
- 或者：直接用静态数据，手动准备 5-10 个作品

### Day 2 上午（4小时）- 内容填充

**小时 13-16: 准备 Demo 作品**
这是最重要的环节！用 AI 生成 5-10 个精彩的交互页面：

**生成方式**：
1. 使用 Claude / ChatGPT / v0.dev
2. 给出详细 Prompt（保存这些 Prompt！）
3. 获取完整的 HTML 文件（包含 CSS 和 JS）
4. 保存为独立的 .html 文件

**推荐的作品类型**：
- 🌌 粒子星云动画（Three.js/Canvas）
- 🎨 SVG 艺术生成器
- 📊 数据可视化（D3.js/Chart.js）
- 🎮 简单交互游戏
- 🌊 CSS 动画效果
- 🎭 AI 图片展示画廊
- 🔮 3D 几何体动画

**Prompt 示例**：
```
"创建一个完整的 HTML 页面，包含粒子星云效果。
要求：使用 Canvas API，包含鼠标交互，
渐变色背景，星星会跟随鼠标移动。
所有代码在一个文件中。"
```

### Day 2 下午（4小时）- 打磨和准备

**小时 17-18: UI 美化**
- 调整配色和排版
- 添加动画效果
- 响应式适配
- 加载状态优化

**小时 19-20: 准备展示**
- 录制演示视频
- 准备演讲稿（3分钟）
- 测试所有功能
- 修复关键 Bug

---

## 📁 项目结构（简化版）

```
ai-muse/
├── app/
│   ├── page.tsx              # 首页（作品展示墙）
│   ├── project/[id]/         # 作品详情页
│   ├── upload/               # 上传页面
│   └── api/                  # API 路由（如果不用 Supabase）
├── components/
│   ├── ProjectCard.tsx       # 作品卡片
│   ├── CodeEditor.tsx        # 代码编辑器（Sandpack）
│   ├── ProjectGrid.tsx       # 作品网格
│   └── Header.tsx            # 导航栏
├── lib/
│   ├── supabase.ts          # Supabase 客户端
│   └── types.ts             # 类型定义
└── public/
    └── demos/               # Demo 截图
```

---

## 🗄️ 数据库设计（极简）

### projects 表
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,              -- 作品说明
  html_url TEXT NOT NULL,        -- HTML 文件 URL（存在 Supabase Storage）
  prompt TEXT NOT NULL,          -- 生成该作品的 AI Prompt
  thumbnail_url TEXT,            -- 缩略图
  category TEXT,                 -- 分类: 3d, animation, visualization, game, art
  tags TEXT[],                   -- 标签数组
  author_name TEXT,              -- 简单存个名字就行
  view_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**就这一张表！** 黑客松不需要复杂的关系。

### 字段说明
- `html_url`: 指向 Supabase Storage 中的 .html 文件
- `prompt`: 展示给用户的 AI 提示词，这是亮点！
- `description`: 解释这个作品的创意和技术实现

---

## 🎨 功能模块简化版

### 1. Interactive Lab（重点！）
**MVP 范围**：
- ✅ 展示 AI 生成的作品列表
- ✅ 点击查看详情（iframe 预览）
- ✅ 显示生成该作品的 Prompt
- ✅ 显示作品说明和技术解释
- ✅ 分类筛选和标签
- ✅ 复制 Prompt 功能
- ❌ 不做：代码编辑、实时调参、用户系统、评论（时间不够）

### 2. Efficiency Matrix（简化）
**MVP 范围**：
- ✅ 静态页面，列出 AI 工具推荐
- ✅ 按行业分类
- ✅ 每个工具：名称、描述、链接、截图
- ❌ 不做：视频、评分、用户生成内容

### 3. Agent Forge（展示型）
**MVP 范围**：
- ✅ 展示几个 Agent 模板的截图
- ✅ 说明如何使用（文档形式）
- ✅ 提供配置文件下载
- ❌ 不做：在线编辑、一键克隆（太复杂）

### 4. How-To Academy（可选）
**MVP 范围**：
- ✅ 2-3 篇精选教程
- ✅ Markdown 渲染
- ✅ 代码高亮
- ❌ 不做：视频、进度追踪、用户生成

---

## 💡 快速开发技巧

### 使用现成组件库
```typescript
// shadcn/ui - 复制粘贴即用
npx shadcn-ui@latest add card button badge input

// 立即有精美组件
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
```

### 快速集成页面预览
```tsx
// components/ProjectPreview.tsx
export function ProjectPreview({ htmlUrl }: { htmlUrl: string }) {
  return (
    <iframe
      src={htmlUrl}
      className="w-full h-[600px] border-0 rounded-lg"
      sandbox="allow-scripts allow-same-origin"
      title="Project Preview"
    />
  );
}

// 使用
<ProjectPreview htmlUrl={project.html_url} />
```

### 显示 Prompt（核心功能）
```tsx
// components/PromptDisplay.tsx
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function PromptDisplay({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">生成 Prompt</h3>
        <button onClick={copyPrompt} className="flex items-center gap-2">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <p className="text-gray-300 whitespace-pre-wrap">{prompt}</p>
    </div>
  );
}
```

### 快速对接数据库
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// 使用
const { data } = await supabase
  .from('projects')
  .select('*')
  .order('created_at', { ascending: false })
```

### Mock 数据快速填充
```typescript
// lib/mock-data.ts
export const mockProjects = [
  {
    id: "1",
    title: "AI 粒子星云",
    description: "使用 Canvas API 创建的交互式粒子星云效果，鼠标移动会影响粒子轨迹。",
    html_url: "/demos/particle-nebula.html",
    prompt: "创建一个完整的 HTML 页面，包含粒子星云效果。要求：使用 Canvas API，包含鼠标交互，渐变色背景，星星会跟随鼠标移动。所有代码在一个文件中。",
    thumbnail_url: "/thumbnails/particle.jpg",
    category: "3d",
    tags: ["canvas", "particles", "interactive"],
    author_name: "AI Creator",
    view_count: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "SVG 动态艺术",
    description: "基于 SVG 的生成艺术，每次刷新都会产生不同的图案。",
    html_url: "/demos/svg-art.html",
    prompt: "创建一个 SVG 生成艺术页面，使用随机算法生成抽象图案，包含渐变色和动画效果。",
    thumbnail_url: "/thumbnails/svg-art.jpg",
    category: "art",
    tags: ["svg", "generative", "animation"],
    author_name: "AI Creator",
    view_count: 0,
    created_at: new Date().toISOString(),
  },
  // ... 更多
];
```

---

## 🎯 评分标准（针对性准备）

### 创新性（30分）
**怎么拿分**：
- 强调"打破创意获取壁垒"的痛点
- 突出 **展示 AI Prompt** 的独特性（帮助学习提示词工程）
- 展示 AI 生成的创意作品质量
- 强调降低创意门槛的社会价值

### 技术实现（25分）
**怎么拿分**：
- 代码整洁，使用现代技术栈（Next.js + TypeScript）
- 展示 **AI 生成内容** 的技术亮点
- iframe 安全隔离的技术考量
- 性能流畅（提前测试）
- 响应式设计良好

### 商业价值（25分）
**怎么拿分**：
- 讲清楚用户群体（创作者 + 学习者）
- 说明变现路径（会员、广告、课程）
- 展示市场空白

### 完成度（20分）
**怎么拿分**：
- 核心功能都能跑通
- UI 精美
- 至少 5-10 个优质 Demo
- 无明显 Bug

---

## 🚨 黑客松避坑指南

### ❌ 不要做的事
1. **不要做用户系统** - 直接用假数据展示
2. **不要做复杂后端** - Supabase 自动生成 API
3. **不要追求完美** - 能跑能看就行
4. **不要做太多模块** - 专注 1-2 个核心功能
5. **不要最后一天写代码** - 留时间准备演示

### ✅ 一定要做的事
1. **提前准备 Demo 作品** - 这是演示的核心
2. **美化首页** - 第一印象很重要
3. **确保能部署** - 提前部署到 Vercel
4. **录制演示视频** - 防止现场翻车
5. **准备演讲稿** - 3 分钟讲清楚价值

---

## 📦 部署清单

### Vercel 部署（推荐）
```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel

# 4. 设置环境变量
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 环境变量
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

---

## 🎤 演示准备

### 3 分钟演讲结构
```
0:00 - 0:30  开场 - 痛点
  "AI 创意作品很酷，但你想看源码学习？很难！"

0:30 - 1:30  Demo - 核心功能
  1. 展示作品墙（精美）
  2. 点击作品，在线运行
  3. 查看/修改代码，实时预览

1:30 - 2:30  价值 - 为什么重要
  - 降低学习门槛
  - 促进创意共享
  - 构建创作者社区

2:30 - 3:00  未来 - 想象空间
  - Agent 市场
  - 教程平台
  - 变现模式
```

### Demo 脚本
```
1. 打开首页 - "这是我们的 AI 创意作品展示墙"
2. 筛选标签 - "可以快速找到感兴趣的类别"
3. 点击作品 - "点击即可在线体验，无需下载"
4. 展示预览 - "这个粒子星云动画完全由 AI 生成"
5. 显示 Prompt - "看，这就是我用来生成它的 Prompt"
6. 复制功能 - "你可以复制这个 Prompt，用 AI 生成自己的作品"
7. 作品说明 - "我们还提供了技术解释，帮助理解实现原理"
8. （彩蛋）- 准备一个特别炫酷的作品作为高潮
```

**演示要点**：
- 强调 **AI 生成** 的特性
- 突出 **Prompt 展示** 的价值（学习提示词工程）
- 展示作品的交互性和视觉效果

---

## 🎨 UI 设计建议

### 配色方案（现代感）
```css
/* 主色调：科技蓝 */
--primary: #3B82F6
--primary-dark: #1E40AF

/* 背景：深色主题 */
--bg: #0A0A0A
--surface: #1A1A1A

/* 强调色：渐变 */
--gradient: linear-gradient(135deg, #667EEA 0%, #764BA2 100%)
```

### 参考网站
- **Dribbble** - 找灵感
- **Awwwards** - 看优秀网站设计
- **CodePen** - 找炫酷效果

---

## 🔥 加分项（如果有时间）

### 1. 炫酷的首页动画
```tsx
// 使用 Framer Motion
import { motion } from "framer-motion"

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* 内容 */}
</motion.div>
```

### 2. 响应式设计
```tsx
// Tailwind 响应式
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 手机1列，平板2列，桌面3列 */}
</div>
```

### 3. 加载骨架屏
```tsx
import { Skeleton } from "@/components/ui/skeleton"

// 加载时显示骨架
{loading ? <Skeleton /> : <ProjectCard />}
```

### 4. 搜索高亮
```tsx
// 简单的模糊搜索
const filtered = projects.filter(p =>
  p.title.toLowerCase().includes(search.toLowerCase())
)
```

---

## 🎁 资源清单

### 免费服务
- **Vercel** - 前端部署（无限免费项目）
- **Supabase** - 数据库（500MB 免费）
- **Cloudflare** - CDN（免费）
- **Unsplash** - 免费图片
- **Google Fonts** - 免费字体

### 开发工具
- **v0.dev** - AI 生成 UI 组件
- **Claude / ChatGPT** - AI 辅助编程
- **GitHub Copilot** - 代码自动补全

### Demo 素材来源
- **CodePen** - 优秀代码作品
- **Three.js Examples** - 3D 示例
- **Awwwards** - 获奖网站
- **Codrops** - 创意效果

---

## ✅ 提交前检查清单

### 代码
- [ ] 所有功能都能正常运行
- [ ] 没有 console.error
- [ ] 移动端适配正常
- [ ] 加载速度快（< 3秒）

### 内容
- [ ] 至少 5 个精选 Demo
- [ ] 每个 Demo 都有描述
- [ ] 缩略图美观
- [ ] 代码可以运行

### 演示
- [ ] 录制演示视频（防止现场网络问题）
- [ ] 准备演讲稿
- [ ] 测试演示流程
- [ ] 准备 Q&A

### 部署
- [ ] 部署到 Vercel
- [ ] 域名可访问
- [ ] HTTPS 正常
- [ ] 环境变量配置正确

---

## 🏁 最后的话

**黑客松的关键：**
1. ⚡ **速度** > 完美 - 能跑就行
2. 🎨 **展示** > 功能 - 好看很重要
3. 💡 **创意** > 技术 - 讲好故事
4. 🎯 **聚焦** > 全面 - 1 个核心功能做好

**时间分配建议：**
- 40% - 核心功能开发
- 30% - 内容准备（Demo 作品）
- 20% - UI 美化
- 10% - 演示准备

**记住：**
评委看的是 **创意 + 展示 + 潜力**，不是完整的产品！

**现在开始，48 小时倒计时！🚀**

---

## 📞 快速参考

### Supabase 快速开始
```typescript
// 1. 创建表
// 在 Supabase Dashboard 中运行 SQL

// 2. 查询数据
const { data } = await supabase.from('projects').select('*')

// 3. 插入数据
const { data } = await supabase.from('projects').insert({
  title: 'AI 粒子星云',
  description: '...',
  html_url: 'https://xxx.supabase.co/storage/v1/object/public/demos/particle.html',
  prompt: '创建一个...',
  category: '3d',
  tags: ['canvas', 'particles']
})

// 4. 上传文件到 Storage
const { data, error } = await supabase.storage
  .from('demos')
  .upload('particle.html', file)
```

### iframe 嵌入预览
```tsx
<iframe
  src={htmlUrl}
  sandbox="allow-scripts allow-same-origin"
  className="w-full h-[600px]"
/>
```

### 文件上传组件
```tsx
// 简单的文件上传
<input
  type="file"
  accept=".html"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  }}
/>
```

### Vercel 快速部署
```bash
vercel --prod
```

---

**最后更新**: 2024-12-26
**适用于**: 48小时黑客松
**难度等级**: ⭐⭐ (中等)

**开始 Hacking！💻✨**
