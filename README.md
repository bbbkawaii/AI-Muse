# AI Nexus - AI产品发现与学习平台

<div align="center">

**探索、学习、分享 - 汇聚全球最有趣的AI创意产品**

[English](./README_EN.md) | 简体中文

</div>

## 📖 项目简介

AI Nexus 是一个专注于AI创意产品的发现、学习和分享平台。我们致力于解决以下问题：

- ❌ **获取难**：优秀的AI交互游戏、创意应用分散在各个博主手中，获取困难
- ❌ **信息慢**：需要逐个向创作者索要，信息传播效率低
- ❌ **知名度低**：很多优秀的AI产品因为缺乏展示平台而鲜为人知
- ❌ **学习难**：想学习AI产品开发但缺少系统的教程和案例

## ✨ 核心功能

### 🎮 产品展示
- **3D交互游戏**：基于Gemini 3、Three.js等的沉浸式交互体验
- **AI生成应用**：各类AI驱动的创意网站和工具
- **专业AI工具**：提高效率的AI办公、设计、开发工具
- **Agent助手**：可复用的AI Agent模板和配置

### 📚 学习中心
- 详细的产品介绍和使用教程
- 从入门到进阶的开发指南
- 技术栈和实现原理解析
- 最佳实践和案例分享

### 👥 社区互动
- 上传和分享你的AI创意作品
- 浏览和收藏其他创作者的作品
- 评论、点赞和反馈
- 跟随优秀创作者获取最新动态

### 🔍 智能发现
- 基于AI的个性化推荐
- 多维度分类和标签体系
- 强大的搜索功能
- 热门趋势和排行榜

## 🎯 目标用户

- **AI爱好者**：想要探索和体验最新AI产品的用户
- **创作者**：希望展示自己AI作品并获得反馈的开发者
- **学习者**：想要学习AI产品开发的初学者和进阶者
- **普通用户**：寻找实用AI工具提高工作效率的普通用户

## 🏗️ 技术栈

### 前端
- **框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式**：Tailwind CSS + shadcn/ui
- **状态管理**：Zustand / Redux Toolkit
- **路由**：React Router v6
- **3D渲染**：Three.js / React Three Fiber

### 后端
- **运行时**：Node.js 20+
- **框架**：NestJS
- **API**：RESTful + GraphQL
- **认证**：JWT + OAuth 2.0
- **文件存储**：AWS S3 / 阿里云OSS

### 数据库
- **主数据库**：PostgreSQL 15+
- **缓存**：Redis 7+
- **搜索引擎**：Elasticsearch 8+ (可选)
- **对象存储**：MinIO / S3

### DevOps
- **容器化**：Docker + Docker Compose
- **CI/CD**：GitHub Actions
- **监控**：Prometheus + Grafana
- **日志**：ELK Stack

## 📁 项目结构

```
AI-Nexus/
├── docs/                      # 项目文档
│   ├── PRD.md                # 产品需求文档
│   ├── TECHNICAL_DESIGN.md   # 技术设计文档
│   ├── API_DESIGN.md         # API设计文档
│   ├── DATABASE_DESIGN.md    # 数据库设计
│   └── DEVELOPMENT_GUIDE.md  # 开发指南
├── frontend/                  # 前端项目
│   ├── src/
│   │   ├── components/       # 组件
│   │   ├── pages/           # 页面
│   │   ├── hooks/           # 自定义Hooks
│   │   ├── store/           # 状态管理
│   │   ├── api/             # API调用
│   │   ├── utils/           # 工具函数
│   │   └── types/           # TypeScript类型
│   └── public/              # 静态资源
├── backend/                   # 后端项目
│   ├── src/
│   │   ├── modules/         # 功能模块
│   │   ├── common/          # 公共模块
│   │   ├── config/          # 配置
│   │   └── database/        # 数据库
│   └── test/                # 测试
├── mobile/                    # 移动端(未来规划)
├── scripts/                   # 脚本工具
└── docker/                    # Docker配置
```

## 🚀 快速开始

### 前置要求

- Node.js >= 20.0.0
- pnpm >= 8.0.0
- PostgreSQL >= 15.0
- Redis >= 7.0
- Docker (可选)

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/bbbkawaii/AI-Nexus.git
cd AI-Nexus
```

2. **安装依赖**
```bash
# 安装前端依赖
cd frontend
pnpm install

# 安装后端依赖
cd ../backend
pnpm install
```

3. **配置环境变量**
```bash
# 复制环境变量模板
cp .env.example .env
# 编辑 .env 文件，填入你的配置
```

4. **启动数据库**
```bash
# 使用 Docker Compose 启动
docker-compose up -d postgres redis
```

5. **运行数据库迁移**
```bash
cd backend
pnpm run migration:run
```

6. **启动开发服务器**
```bash
# 启动后端 (终端1)
cd backend
pnpm run dev

# 启动前端 (终端2)
cd frontend
pnpm run dev
```

7. **访问应用**
- 前端：http://localhost:5173
- 后端API：http://localhost:3000
- API文档：http://localhost:3000/api/docs

## 📚 文档

详细文档请查看 [docs](./docs) 目录：

- [产品需求文档 (PRD)](./docs/PRD.md)
- [技术设计文档](./docs/TECHNICAL_DESIGN.md)
- [API设计文档](./docs/API_DESIGN.md)
- [数据库设计](./docs/DATABASE_DESIGN.md)
- [开发指南](./docs/DEVELOPMENT_GUIDE.md)

## 🗺️ 开发路线图

### Phase 1: MVP (Week 1-4)
- [x] 项目初始化和文档
- [ ] 基础UI框架搭建
- [ ] 用户认证系统
- [ ] 产品展示页面
- [ ] 基础搜索功能

### Phase 2: 核心功能 (Week 5-8)
- [ ] 用户上传功能
- [ ] 教程系统
- [ ] 评论和点赞
- [ ] 个人主页
- [ ] 推荐算法v1

### Phase 3: 社区功能 (Week 9-12)
- [ ] 关注系统
- [ ] 消息通知
- [ ] 标签和分类优化
- [ ] 高级搜索
- [ ] 数据统计面板

### Phase 4: 优化与扩展 (Week 13+)
- [ ] 移动端适配/App开发
- [ ] 性能优化
- [ ] SEO优化
- [ ] 国际化
- [ ] AI辅助功能

## 🤝 贡献指南

我们欢迎所有形式的贡献！

- 🐛 报告Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码

请查看 [贡献指南](./CONTRIBUTING.md) 了解更多。

## 📄 开源协议

本项目采用 [MIT License](./LICENSE)

## 👏 致谢

感谢所有为AI创意产品发展做出贡献的创作者和开发者！

## 📧 联系我们

- GitHub Issues: [提交问题](https://github.com/bbbkawaii/AI-Nexus/issues)
- Email: contact@ai-nexus.com
- Twitter: [@AIoNexus](https://twitter.com/AINexus)

---

<div align="center">

**如果这个项目对你有帮助，请给我们一个 ⭐️**

Made with ❤️ by AI Nexus Team

</div>
