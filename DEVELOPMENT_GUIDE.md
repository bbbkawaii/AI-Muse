# AI-Muse 黑客松开发指南

## 🎯 项目定位

**AI-Muse (AI 灵感空间)** - 一个让 AI 创意作品触手可及的平台

核心理念：让用户能快速发现、体验和分享 AI 创意作品

---

## 🚀 黑客松目标（48小时）

### 必须完成的核心功能
1. **展示墙** - 展示 AI 创意作品（如 3D 可视化、交互动画等）
2. **在线体验** - 点击即可体验作品，无需下载
3. **快速上传** - 创作者能快速分享自己的作品
4. **简单搜索** - 按标签/类别快速找到感兴趣的内容

### 评委会看到的亮点
- ✨ 精美的作品展示界面
- ⚡ 流畅的在线体验（代码在线运行）
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

### 代码在线运行
```
Sandpack (CodeSandbox 开源组件)
- npm install @codesandbox/sandpack-react
- 支持 React/Vue/Vanilla JS
- 5分钟集成完成
```

### 认证（如果需要）
```
NextAuth.js
- GitHub 登录（最简单）
- 一个配置文件搞定
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
npm install @codesandbox/sandpack-react
npm install lucide-react

# 安装 UI 组件（shadcn/ui）
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input
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

**小时 7-8: 代码编辑器**
- 集成 Sandpack
- 实现代码预览功能
- 测试基础运行

### Day 1 晚上（4小时）- 完善体验

**小时 9-10: 作品详情页**
- 点击查看作品详情
- 显示代码和运行效果
- 添加作者信息

**小时 11-12: 上传功能**
- 简单表单（标题、描述、代码、标签）
- 保存到数据库
- 可以不做认证，后台手动审核

### Day 2 上午（4小时）- 内容填充

**小时 13-16: 准备 Demo 作品**
这是最重要的环节！准备 5-10 个精彩的 AI 创意作品：
- 3D 可视化（Three.js + AI 生成）
- 粒子动画
- AI 绘画展示
- 数据可视化
- 交互式游戏

**作品来源**：
- CodePen 上的优秀作品
- 自己写几个简单 Demo
- GitHub 开源项目改编

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
  description TEXT,
  code TEXT NOT NULL,           -- 直接存代码
  thumbnail_url TEXT,            -- 缩略图
  category TEXT,                 -- 分类: 3d, animation, game, ai
  tags TEXT[],                   -- 标签数组
  author_name TEXT,              -- 简单存个名字就行
  view_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**就这一张表！** 黑客松不需要复杂的关系。

---

## 🎨 功能模块简化版

### 1. Interactive Lab（重点！）
**MVP 范围**：
- ✅ 展示作品列表
- ✅ 点击查看详情
- ✅ 在线运行代码（Sandpack）
- ✅ 分类筛选
- ❌ 不做：用户系统、评论、点赞（时间不够）

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

### 快速集成代码运行
```tsx
import { Sandpack } from "@codesandbox/sandpack-react";

export function CodePreview({ code }: { code: string }) {
  return (
    <Sandpack
      template="react"
      files={{
        "/App.js": code,
      }}
      theme="dark"
    />
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
    code: `/* React 代码 */`,
    category: "3d",
    tags: ["three.js", "particles", "ai"],
  },
  // ... 更多
];
```

---

## 🎯 评分标准（针对性准备）

### 创新性（30分）
**怎么拿分**：
- 强调"打破创意获取壁垒"的痛点
- 展示独特的在线代码运行功能
- 强调社区共享的理念

### 技术实现（25分）
**怎么拿分**：
- 代码整洁，使用现代技术栈
- 展示 Sandpack 集成的技术亮点
- 性能流畅（提前测试）

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
1. 打开首页 - "这是我们的作品展示墙"
2. 筛选标签 - "可以快速找到感兴趣的类别"
3. 点击作品 - "点击即可在线体验，无需下载"
4. 运行代码 - "所有代码都能直接运行"
5. 修改参数 - "改个颜色试试，实时看到效果"
6. （彩蛋）- 准备一个特别炫酷的作品作为高潮
```

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
const { data } = await supabase.from('projects').insert({ title: 'xxx' })
```

### Sandpack 快速集成
```tsx
import { Sandpack } from "@codesandbox/sandpack-react";

<Sandpack template="react" files={{ "/App.js": code }} />
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
