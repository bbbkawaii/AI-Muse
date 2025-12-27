# AI-Muse 部署指南 🚀

本指南详细介绍如何将 AI-Muse 项目部署到生产环境，让全世界都能访问你的作品。

## 📋 目录

- [部署前准备](#部署前准备)
- [方案一：Vercel 部署（推荐）](#方案一vercel-部署推荐)
- [方案二：Netlify 部署](#方案二netlify-部署)
- [方案三：Docker 自托管](#方案三docker-自托管)
- [环境变量配置](#环境变量配置)
- [域名配置](#域名配置)
- [常见问题](#常见问题)

---

## 部署前准备

### 1. 确保项目可以本地运行

```bash
cd ai-muse-app
npm install
npm run dev
```

访问 http://localhost:3000 确认项目正常运行。

### 2. 构建测试

```bash
npm run build
npm start
```

确保生产构建没有错误。

### 3. 准备环境变量

如果项目使用了 Supabase 或其他外部服务，准备好以下信息：

- Supabase URL
- Supabase Anon Key
- 其他 API Keys

---

## 方案一：Vercel 部署（推荐）

Vercel 是 Next.js 的官方推荐部署平台，零配置，自动 CI/CD。

### 方法 A：通过 Vercel 网站部署（最简单）

1. **访问 Vercel 官网**
   - 打开 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择你的 GitHub 仓库 `bbbkawaii/AI-Muse`
   - Vercel 会自动检测到这是 Next.js 项目

3. **配置项目**
   - Root Directory: 选择 `ai-muse-app`
   - Framework Preset: Next.js（自动检测）
   - Build Command: `npm run build`（默认）
   - Output Directory: `.next`（默认）

4. **设置环境变量**
   - 在 "Environment Variables" 部分添加：
     ```
     NEXT_PUBLIC_SUPABASE_URL=你的supabase地址
     NEXT_PUBLIC_SUPABASE_ANON_KEY=你的supabase密钥
     ```

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待 2-3 分钟，部署完成！
   - 你会得到一个 `.vercel.app` 域名

6. **自动部署**
   - 以后每次推送到 GitHub，Vercel 会自动重新部署
   - 预览环境：每个 PR 都会自动生成预览链接

### 方法 B：通过 Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
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

   首次部署会询问：
   - Set up and deploy? `Y`
   - Which scope? 选择你的账号
   - Link to existing project? `N`
   - What's your project's name? `ai-muse`
   - In which directory? `./`
   - Override settings? `N`

4. **部署到生产环境**
   ```bash
   vercel --prod
   ```

5. **设置环境变量**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

### Vercel 优势

- ✅ 零配置，自动优化
- ✅ 全球 CDN 加速
- ✅ 自动 HTTPS
- ✅ 无限带宽（免费套餐）
- ✅ 自动 CI/CD
- ✅ 预览部署
- ✅ 实时日志和监控

---

## 方案二：Netlify 部署

Netlify 也是优秀的前端托管平台，适合静态站点和 JAMstack 应用。

### 通过 Netlify 网站部署

1. **访问 Netlify**
   - 打开 https://netlify.com
   - 使用 GitHub 登录

2. **导入项目**
   - 点击 "Add new site" → "Import an existing project"
   - 选择 GitHub 仓库

3. **配置构建**
   - Base directory: `ai-muse-app`
   - Build command: `npm run build`
   - Publish directory: `ai-muse-app/.next`

4. **环境变量**
   - Site settings → Environment variables
   - 添加你的环境变量

5. **部署**
   - 点击 "Deploy site"
   - 获得 `.netlify.app` 域名

### 通过 Netlify CLI 部署

1. **安装 Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **登录并部署**
   ```bash
   cd ai-muse-app
   netlify login
   netlify init
   netlify deploy --prod
   ```

---

## 方案三：Docker 自托管

如果你有自己的服务器（VPS、云主机等），可以使用 Docker 部署。

### 1. 创建 Dockerfile

在 `ai-muse-app` 目录下创建 `Dockerfile`：

```dockerfile
# 使用官方 Node.js 镜像
FROM node:18-alpine AS base

# 安装依赖
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 构建应用
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 生产运行
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. 创建 .dockerignore

```
node_modules
.next
.git
.gitignore
README.md
.env*.local
```

### 3. 修改 next.config.ts

添加 standalone 输出配置：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
};

export default nextConfig;
```

### 4. 构建并运行

```bash
# 构建 Docker 镜像
docker build -t ai-muse-app .

# 运行容器
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  ai-muse-app
```

### 5. 使用 Docker Compose（可选）

创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
    restart: unless-stopped
```

运行：
```bash
docker-compose up -d
```

### 6. 部署到云服务器

**使用 Nginx 反向代理：**

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**配置 HTTPS（使用 Let's Encrypt）：**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 环境变量配置

### 创建 .env.local 文件

在本地开发时使用：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# 其他可选配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 生产环境变量

在部署平台中设置相同的环境变量：

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site settings → Environment variables
- **Docker**: 通过 `-e` 参数或 `.env` 文件

### 重要提示

- ⚠️ 永远不要将 `.env.local` 提交到 Git
- ⚠️ 以 `NEXT_PUBLIC_` 开头的变量会暴露给浏览器
- ⚠️ 敏感密钥（API Secret）不要使用 `NEXT_PUBLIC_` 前缀

---

## 域名配置

### Vercel 自定义域名

1. 进入项目设置 → Domains
2. 添加你的域名（如 `aimuse.com`）
3. 按照提示配置 DNS 记录：
   - **A 记录**: 指向 `76.76.21.21`
   - **CNAME**: 指向 `cname.vercel-dns.com`
4. 等待 DNS 生效（最多 48 小时）
5. Vercel 自动配置 HTTPS

### Netlify 自定义域名

1. Site settings → Domain management
2. Add custom domain
3. 配置 DNS：
   - **A 记录**: 指向 Netlify 的 IP
   - **CNAME**: 指向 `your-site.netlify.app`
4. SSL 自动配置

---

## 性能优化建议

### 1. 图片优化

使用 Next.js Image 组件：

```tsx
import Image from 'next/image'

<Image
  src="/image.jpg"
  width={500}
  height={300}
  alt="Description"
/>
```

### 2. 代码分割

Next.js 自动代码分割，但可以手动优化：

```tsx
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./Component'), {
  loading: () => <p>Loading...</p>,
})
```

### 3. 启用压缩

在 `next.config.ts` 中：

```typescript
const nextConfig: NextConfig = {
  compress: true,
  swcMinify: true,
}
```

### 4. 配置 CDN 缓存

对于静态资源，设置合适的缓存头。

---

## 监控和分析

### Vercel Analytics

```bash
npm install @vercel/analytics
```

在 `_app.tsx` 中：

```tsx
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
```

### Google Analytics

使用 `next-ga4` 或直接集成。

---

## 常见问题

### Q1: 部署后页面空白？

**检查点：**
- 浏览器控制台是否有错误
- 环境变量是否正确设置
- 构建日志是否有错误

### Q2: 环境变量不生效？

**解决方案：**
- 确保变量以 `NEXT_PUBLIC_` 开头（客户端使用）
- 重新部署项目
- 清除浏览器缓存

### Q3: 404 错误？

**检查：**
- 路由配置是否正确
- `app` 目录结构
- Vercel 的 Root Directory 设置

### Q4: 构建失败？

**常见原因：**
- 依赖版本冲突
- TypeScript 类型错误
- 缺少环境变量

**解决：**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Q5: 部署后样式丢失？

**检查：**
- Tailwind 配置
- CSS 导入顺序
- PostCSS 配置

---

## 快速部署命令汇总

### Vercel 一键部署

```bash
cd ai-muse-app
vercel --prod
```

### Netlify 一键部署

```bash
cd ai-muse-app
netlify deploy --prod
```

### Docker 快速启动

```bash
cd ai-muse-app
docker build -t ai-muse .
docker run -p 3000:3000 ai-muse
```

---

## 推荐部署方案

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 个人项目 | Vercel | 免费、简单、自动化 |
| 团队协作 | Vercel/Netlify | 预览部署、团队管理 |
| 企业应用 | Docker + 云服务器 | 完全控制、可定制 |
| 国内访问 | 阿里云/腾讯云 + Docker | 访问速度快 |

---

## 下一步

部署完成后：

1. ✅ 测试所有功能
2. ✅ 配置自定义域名
3. ✅ 设置监控和分析
4. ✅ 配置 SEO 优化
5. ✅ 备份数据和配置

---

**祝部署顺利！** 🎉

如有问题，请查看：
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Vercel 文档](https://vercel.com/docs)
- [Netlify 文档](https://docs.netlify.com)
