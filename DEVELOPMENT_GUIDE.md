# AI-Muse 开发指导文档

## 📋 项目概述

**项目名称**: AI-Muse (AI 灵感空间)
**定位**: 全球领先的 AI 创意作品展示平台、教程社区与 Agent 共享中心
**愿景**: 打破 AI 创意作品的获取壁垒，让每个人都能轻松学习、使用和分享 AI 创意工具

---

## 🎯 核心功能模块

### 1. Interactive Lab (交互实验室)
**功能**: 在线体验各种基于 AI 的 Web 交互作品，支持实时调参和源码修改
**解决痛点**: 创意获取难、源码获取慢、博主私藏
**核心特性**:
- 在线代码编辑器（类似 CodeSandbox）
- 实时预览和参数调整
- 作品分类和标签系统
- 源码一键下载/Fork

### 2. Efficiency Matrix (效能矩阵)
**功能**: 推荐并分类各行各业的 AI 生产力工具
**解决痛点**: 用户不知道有哪些好用的专业 AI 工具
**核心特性**:
- 按行业/用途分类的工具库
- 短视频演示集成
- 用户评分和评论系统
- 工具对比功能

### 3. Agent Forge (智能体锻造炉)
**功能**: 集成主流平台的 Agent 模板，支持一键克隆
**解决痛点**: 知道 Agent 好用，但不会搭建复杂逻辑
**核心特性**:
- Dify、Coze 等平台集成
- Agent 模板市场
- 工作流可视化编辑
- 导入/导出功能

### 4. How-To Academy (灵感学院)
**功能**: 提供结构化的 AI 创意开发教程
**解决痛点**: 缺乏系统性的低门槛入门教程
**核心特性**:
- 分级教程体系（初级/中级/高级）
- 实战项目案例
- 视频+文档+代码三位一体
- 学习路径推荐

---

## 🏗️ 技术架构规划

### 整体架构
```
┌─────────────────────────────────────────────────────────┐
│                    前端层 (Frontend)                      │
│  Next.js 14+ / React 18+ / TypeScript / Tailwind CSS    │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                   API 网关层 (Gateway)                    │
│          GraphQL (Apollo) / RESTful API                 │
└─────────────────────────────────────────────────────────┘
                            ↓
┌──────────────┬──────────────┬──────────────┬────────────┐
│  Interactive │  Efficiency  │    Agent     │   How-To   │
│     Lab      │    Matrix    │    Forge     │   Academy  │
│   Service    │   Service    │   Service    │   Service  │
└──────────────┴──────────────┴──────────────┴────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    数据层 (Data Layer)                    │
│   PostgreSQL / MongoDB / Redis / Elasticsearch          │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                   第三方服务集成层                         │
│   AWS S3 / Cloudflare / AI APIs / Video Hosting        │
└─────────────────────────────────────────────────────────┘
```

### 技术栈选型

#### 前端技术栈
```yaml
核心框架:
  - Next.js 14+ (App Router)
  - React 18+
  - TypeScript 5+

UI 框架:
  - Tailwind CSS 3+
  - Shadcn/ui (组件库)
  - Framer Motion (动画)
  - Lucide React (图标)

代码编辑器:
  - Monaco Editor (VSCode 内核)
  - Sandpack (在线代码运行)

状态管理:
  - Zustand (轻量级)
  - TanStack Query (服务端状态)

数据获取:
  - GraphQL (Apollo Client)
  - REST (Axios/Fetch)
```

#### 后端技术栈
```yaml
Node.js 服务:
  - NestJS (企业级框架)
  - Fastify (高性能 HTTP)
  - GraphQL (Apollo Server)

Python 服务 (AI 相关):
  - FastAPI (API 服务)
  - LangChain (Agent 编排)
  - Celery (异步任务)

数据库:
  - PostgreSQL (主数据库)
  - MongoDB (非结构化数据)
  - Redis (缓存/会话)
  - Elasticsearch (搜索引擎)

消息队列:
  - RabbitMQ / Redis Pub/Sub

对象存储:
  - AWS S3 / Cloudflare R2
```

#### DevOps & 基础设施
```yaml
容器化:
  - Docker
  - Docker Compose
  - Kubernetes (生产环境)

CI/CD:
  - GitHub Actions
  - Vercel (前端部署)
  - AWS ECS / Railway (后端部署)

监控:
  - Sentry (错误追踪)
  - Datadog / Grafana (性能监控)
  - LogRocket (用户行为)

测试:
  - Vitest (单元测试)
  - Playwright (E2E 测试)
  - Jest (后端测试)
```

---

## 🗺️ 开发路线图

### Phase 1: MVP (最小可行产品) - 4-6 周

#### Week 1-2: 基础架构搭建
- [ ] 项目初始化和脚手架搭建
- [ ] 前端 Next.js 项目结构
- [ ] 后端 NestJS 基础框架
- [ ] 数据库设计和初始化
- [ ] 认证系统 (JWT + OAuth)
- [ ] 基础 UI 组件库

#### Week 3-4: Interactive Lab 核心功能
- [ ] 代码编辑器集成 (Monaco)
- [ ] 在线运行环境 (Sandpack)
- [ ] 作品上传和管理
- [ ] 作品展示和预览
- [ ] 基础搜索功能

#### Week 5-6: 用户系统和内容管理
- [ ] 用户注册/登录
- [ ] 用户主页和个人资料
- [ ] 作品收藏和点赞
- [ ] 评论系统
- [ ] 管理后台基础功能

**交付成果**:
- 可运行的 Interactive Lab 原型
- 用户可以上传、查看、运行代码作品
- 基础的用户交互功能

### Phase 2: 功能扩展 - 6-8 周

#### Week 7-9: Efficiency Matrix
- [ ] 工具库数据模型设计
- [ ] 工具分类和标签系统
- [ ] 工具详情页
- [ ] 视频播放器集成
- [ ] 评分和评论系统
- [ ] 工具搜索和过滤

#### Week 10-12: How-To Academy
- [ ] 教程内容管理系统
- [ ] Markdown 编辑器
- [ ] 教程分类和难度等级
- [ ] 代码示例集成
- [ ] 学习进度追踪
- [ ] 教程评价系统

#### Week 13-14: 优化和集成
- [ ] 性能优化
- [ ] SEO 优化
- [ ] 响应式设计完善
- [ ] 跨模块搜索
- [ ] 推荐算法 v1

**交付成果**:
- 完整的三大模块 (Lab + Matrix + Academy)
- 用户体验优化
- 基础推荐系统

### Phase 3: 高级功能 - 8-10 周

#### Week 15-18: Agent Forge
- [ ] Dify API 集成
- [ ] Coze API 集成
- [ ] Agent 模板解析器
- [ ] 工作流可视化编辑器
- [ ] 一键克隆功能
- [ ] Agent 测试环境

#### Week 19-22: 社区功能
- [ ] 创作者认证系统
- [ ] 关注和粉丝功能
- [ ] 动态发布系统
- [ ] 话题和标签
- [ ] 私信功能
- [ ] 举报和审核机制

#### Week 23-24: 高级特性
- [ ] AI 辅助搜索 (语义搜索)
- [ ] 智能推荐系统 v2
- [ ] 协作功能 (多人编辑)
- [ ] WebRTC 实时协作
- [ ] API 开放平台

**交付成果**:
- 完整的四大模块
- 成熟的社区功能
- 开放 API 生态

### Phase 4: 商业化和生态 - 持续

- [ ] 会员订阅系统
- [ ] 内容变现功能
- [ ] 企业版功能
- [ ] 移动端 App
- [ ] 国际化 (i18n)
- [ ] 第三方集成市场

---

## 📐 数据库设计

### 核心表结构

#### Users (用户表)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  role VARCHAR(20) DEFAULT 'user', -- user, creator, admin
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Projects (Interactive Lab 作品)
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  category VARCHAR(50),
  tags TEXT[], -- PostgreSQL array
  code_content JSONB, -- 支持多文件
  is_public BOOLEAN DEFAULT TRUE,
  view_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  fork_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tools (Efficiency Matrix 工具)
```sql
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  industry VARCHAR(50),
  url TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  pricing VARCHAR(50), -- free, freemium, paid
  rating DECIMAL(3,2),
  review_count INT DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Agents (Agent Forge 模板)
```sql
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  platform VARCHAR(50), -- dify, coze, custom
  config JSONB, -- Agent 配置
  workflow JSONB, -- 工作流定义
  thumbnail_url TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  clone_count INT DEFAULT 0,
  rating DECIMAL(3,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tutorials (How-To Academy 教程)
```sql
CREATE TABLE tutorials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  content TEXT, -- Markdown
  level VARCHAR(20), -- beginner, intermediate, advanced
  category VARCHAR(50),
  tags TEXT[],
  code_repo_url TEXT,
  video_url TEXT,
  estimated_time INT, -- 分钟
  view_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 关系表

#### Likes (点赞)
```sql
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  target_type VARCHAR(50), -- project, tool, agent, tutorial
  target_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, target_type, target_id)
);
```

#### Comments (评论)
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  target_type VARCHAR(50),
  target_id UUID NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id), -- 支持回复
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🎨 前端开发规范

### 项目结构
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 认证相关页面
│   ├── (dashboard)/       # 仪表板
│   ├── lab/               # Interactive Lab
│   ├── matrix/            # Efficiency Matrix
│   ├── forge/             # Agent Forge
│   ├── academy/           # How-To Academy
│   └── api/               # API Routes
├── components/            # 可复用组件
│   ├── ui/               # 基础 UI 组件
│   ├── lab/              # Lab 特定组件
│   ├── matrix/           # Matrix 特定组件
│   ├── forge/            # Forge 特定组件
│   └── academy/          # Academy 特定组件
├── lib/                   # 工具函数
│   ├── api/              # API 客户端
│   ├── hooks/            # 自定义 Hooks
│   ├── utils/            # 通用工具
│   └── validations/      # 表单验证
├── stores/                # 状态管理
├── types/                 # TypeScript 类型定义
└── styles/                # 全局样式
```

### 命名规范
```typescript
// 组件: PascalCase
export function ProjectCard() {}

// 文件名: kebab-case
project-card.tsx
use-project.ts

// Hooks: use + PascalCase
export function useProject() {}

// 常量: UPPER_SNAKE_CASE
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// 类型: PascalCase + 'Type' 后缀 (可选)
export type ProjectType = {};
export interface UserInterface {}
```

### 代码规范
```typescript
// 使用函数组件和 Hooks
function MyComponent({ title }: { title: string }) {
  const [count, setCount] = useState(0);

  return <div>{title}: {count}</div>;
}

// 使用 TypeScript 严格模式
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}

// 使用 ESLint + Prettier
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ]
}
```

---

## 🔧 后端开发规范

### 项目结构 (NestJS)
```
src/
├── modules/
│   ├── auth/              # 认证模块
│   ├── users/             # 用户模块
│   ├── projects/          # 项目模块
│   ├── tools/             # 工具模块
│   ├── agents/            # Agent 模块
│   └── tutorials/         # 教程模块
├── common/
│   ├── decorators/        # 装饰器
│   ├── filters/           # 异常过滤器
│   ├── guards/            # 守卫
│   ├── interceptors/      # 拦截器
│   └── pipes/             # 管道
├── config/                # 配置
├── database/              # 数据库
│   ├── migrations/        # 迁移
│   └── seeds/             # 种子数据
└── main.ts                # 入口文件
```

### API 设计规范

#### RESTful API
```typescript
// GET    /api/projects          - 获取项目列表
// GET    /api/projects/:id      - 获取单个项目
// POST   /api/projects          - 创建项目
// PUT    /api/projects/:id      - 更新项目
// DELETE /api/projects/:id      - 删除项目

// 响应格式统一
{
  "success": true,
  "data": {...},
  "message": "Success",
  "timestamp": "2024-01-01T00:00:00Z"
}

// 错误响应
{
  "success": false,
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "Project not found"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### GraphQL Schema
```graphql
type Project {
  id: ID!
  title: String!
  description: String
  author: User!
  code: String!
  tags: [String!]!
  createdAt: DateTime!
}

type Query {
  projects(
    limit: Int = 20
    offset: Int = 0
    category: String
  ): [Project!]!

  project(id: ID!): Project
}

type Mutation {
  createProject(input: CreateProjectInput!): Project!
  updateProject(id: ID!, input: UpdateProjectInput!): Project!
  deleteProject(id: ID!): Boolean!
}
```

---

## 🔐 安全规范

### 认证和授权
```typescript
// JWT Token 策略
- Access Token: 15 分钟有效期
- Refresh Token: 7 天有效期
- 存储在 HttpOnly Cookie 中

// 权限控制
enum Role {
  USER = 'user',
  CREATOR = 'creator',
  ADMIN = 'admin'
}

// 使用 RBAC (基于角色的访问控制)
@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
async deleteUser(@Param('id') id: string) {}
```

### 数据验证
```typescript
// 使用 class-validator
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
```

### 安全清单
- [ ] SQL 注入防护 (使用 ORM 参数化查询)
- [ ] XSS 防护 (内容转义)
- [ ] CSRF 防护 (CSRF Token)
- [ ] 速率限制 (Rate Limiting)
- [ ] 输入验证和清理
- [ ] HTTPS 强制
- [ ] 安全响应头 (Helmet.js)
- [ ] 敏感数据加密
- [ ] 日志脱敏

---

## 🚀 部署策略

### 开发环境
```yaml
Frontend: localhost:3000 (Next.js Dev Server)
Backend: localhost:4000 (NestJS)
Database: localhost:5432 (PostgreSQL)
Redis: localhost:6379
```

### 预发布环境 (Staging)
```yaml
Frontend: Vercel Preview Deployment
Backend: Railway / AWS ECS (staging)
Database: Supabase / RDS (staging)
Domain: staging.ai-muse.com
```

### 生产环境 (Production)
```yaml
Frontend:
  - Platform: Vercel / Cloudflare Pages
  - CDN: Cloudflare
  - Domain: ai-muse.com

Backend:
  - Platform: AWS ECS / Railway
  - Load Balancer: AWS ALB
  - Auto Scaling: 2-10 instances

Database:
  - Primary: AWS RDS (PostgreSQL)
  - Read Replica: 2+ instances
  - Cache: Redis Cluster
  - Search: Elasticsearch Cluster

Storage:
  - Static Assets: Cloudflare R2 / AWS S3
  - CDN: Cloudflare
```

### CI/CD 流程
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main, develop]

jobs:
  test:
    - Lint 检查
    - 单元测试
    - E2E 测试

  build:
    - 构建前端
    - 构建后端 Docker 镜像

  deploy:
    - Deploy to Staging (develop 分支)
    - Deploy to Production (main 分支)
    - 自动回滚机制
```

---

## 📊 性能优化

### 前端优化
```typescript
// 1. 代码分割
const LazyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
});

// 2. 图片优化
import Image from 'next/image';
<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  priority
  alt="Hero"
/>

// 3. 预加载关键资源
<link rel="preload" href="/fonts/main.woff2" as="font" />

// 4. 使用 React.memo 避免不必要的重渲染
export const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* ... */}</div>;
});
```

### 后端优化
```typescript
// 1. 数据库查询优化
// 使用索引
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_category ON projects(category);

// 2. 使用缓存
@UseInterceptors(CacheInterceptor)
@CacheTTL(300) // 5 分钟
async getProjects() {}

// 3. 分页查询
async findAll(page: number, limit: number) {
  return this.db.projects.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
}

// 4. 批量查询优化 (DataLoader)
const projectLoader = new DataLoader(async (ids) => {
  const projects = await db.projects.findMany({
    where: { id: { in: ids } }
  });
  return ids.map(id => projects.find(p => p.id === id));
});
```

---

## 🧪 测试策略

### 测试金字塔
```
        /\
       /  \  E2E Tests (10%)
      /    \
     /------\ Integration Tests (30%)
    /        \
   /----------\ Unit Tests (60%)
```

### 单元测试
```typescript
// src/lib/utils/format.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate } from './format';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-01');
    expect(formatDate(date)).toBe('2024-01-01');
  });
});
```

### 集成测试
```typescript
// src/modules/projects/projects.service.spec.ts
describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ProjectsService],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should create a project', async () => {
    const project = await service.create({
      title: 'Test Project',
    });
    expect(project.title).toBe('Test Project');
  });
});
```

### E2E 测试
```typescript
// e2e/projects.spec.ts
import { test, expect } from '@playwright/test';

test('create and view project', async ({ page }) => {
  await page.goto('/lab');
  await page.click('button:has-text("New Project")');
  await page.fill('input[name="title"]', 'My Project');
  await page.click('button:has-text("Create")');
  await expect(page.locator('h1')).toContainText('My Project');
});
```

---

## 📝 文档规范

### 代码注释
```typescript
/**
 * 创建一个新的项目
 * @param userId - 用户 ID
 * @param data - 项目数据
 * @returns 创建的项目
 * @throws {NotFoundException} 用户不存在时抛出
 */
async createProject(userId: string, data: CreateProjectDto): Promise<Project> {
  // 实现...
}
```

### API 文档
- 使用 Swagger/OpenAPI 自动生成
- 每个 API 必须包含示例请求和响应
- 标注必需参数和可选参数
- 说明错误码和错误场景

### README 文档
每个模块应包含 README：
- 功能概述
- 技术栈
- 安装和运行
- 配置说明
- API 文档链接
- 常见问题

---

## 🤝 协作规范

### Git 工作流
```bash
# 主分支
main        - 生产环境
develop     - 开发环境

# 功能分支
feature/interactive-lab
feature/agent-forge

# 修复分支
fix/project-upload-bug

# 发布分支
release/v1.0.0
```

### Commit 规范
```bash
# 格式: <type>(<scope>): <subject>

feat(lab): 添加代码编辑器功能
fix(auth): 修复登录 token 过期问题
docs(readme): 更新安装文档
style(ui): 调整按钮样式
refactor(api): 重构项目 API
test(projects): 添加项目创建测试
chore(deps): 升级依赖包
```

### Code Review 检查清单
- [ ] 代码符合项目规范
- [ ] 有适当的测试覆盖
- [ ] 没有硬编码的敏感信息
- [ ] 性能考虑 (避免 N+1 查询等)
- [ ] 错误处理完善
- [ ] 文档和注释清晰
- [ ] UI/UX 符合设计稿

---

## 🎯 开发优先级

### P0 (必须完成)
- 用户认证系统
- Interactive Lab 核心功能
- 数据库基础设计
- 部署和 CI/CD

### P1 (重要)
- Efficiency Matrix
- How-To Academy
- 搜索功能
- 评论和点赞系统

### P2 (可以延后)
- Agent Forge
- 高级社区功能
- 协作编辑
- 移动端适配

### P3 (锦上添花)
- AI 辅助搜索
- 实时协作
- 国际化
- 第三方集成

---

## 📚 学习资源

### 官方文档
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [GraphQL Documentation](https://graphql.org/learn)

### 推荐工具
- [shadcn/ui](https://ui.shadcn.com) - UI 组件库
- [Prisma](https://www.prisma.io) - ORM
- [Zod](https://zod.dev) - Schema 验证
- [TanStack Query](https://tanstack.com/query) - 数据获取

### 设计参考
- [Vercel](https://vercel.com) - 简洁现代设计
- [CodeSandbox](https://codesandbox.io) - 代码编辑器
- [Dribbble](https://dribbble.com) - 设计灵感

---

## 🚦 开始开发

### 第一步：环境准备
```bash
# 安装必要工具
- Node.js 18+
- pnpm / npm / yarn
- Docker Desktop
- VS Code + 推荐插件

# 推荐的 VS Code 插件
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitLens
- Thunder Client (API 测试)
```

### 第二步：项目初始化
```bash
# 克隆项目
git clone https://github.com/your-org/ai-muse.git
cd ai-muse

# 安装依赖
pnpm install

# 启动开发环境
docker-compose up -d  # 启动数据库等服务
pnpm dev             # 启动开发服务器
```

### 第三步：选择模块开始开发
1. 查看 GitHub Issues 选择任务
2. 创建功能分支
3. 开发和测试
4. 提交 Pull Request
5. Code Review
6. 合并到 develop 分支

---

## ❓ 常见问题

### Q: 选择 Next.js App Router 还是 Pages Router?
A: 使用 App Router (Next.js 13+)，这是未来方向。

### Q: 使用哪种状态管理库?
A: 推荐 Zustand (简单场景) + TanStack Query (服务端状态)。

### Q: 如何处理大文件上传?
A: 使用分片上传 + 对象存储 (S3/R2)，前端使用 uppy 或 filepond。

### Q: 如何实现代码在线运行?
A: 使用 Sandpack (React) 或自建 WebContainer (StackBlitz 技术)。

### Q: 如何保证代码安全?
A: 沙箱环境运行，限制 API 调用，内容审核机制。

---

## 📞 联系方式

- **项目负责人**: [待定]
- **技术讨论**: [Discord/Slack 链接]
- **Bug 报告**: GitHub Issues
- **功能建议**: GitHub Discussions

---

**最后更新**: 2024-12-26
**文档版本**: v1.0.0

开始构建 AI-Muse，让创意触手可及！🚀
