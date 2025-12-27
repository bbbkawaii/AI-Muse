#!/bin/bash

# AI-Muse Docker 部署脚本

echo "🐳 开始构建 Docker 镜像..."

# 读取环境变量
if [ -f .env.local ]; then
    export $(cat .env.local | xargs)
fi

# 构建镜像
echo "📦 构建镜像..."
docker build -t ai-muse-app:latest .

if [ $? -ne 0 ]; then
    echo "❌ 构建失败！"
    exit 1
fi

echo "✅ 构建成功！"

# 停止并删除旧容器
echo "🔄 停止旧容器..."
docker stop ai-muse-app 2>/dev/null || true
docker rm ai-muse-app 2>/dev/null || true

# 运行新容器
echo "🚀 启动新容器..."
docker run -d \
  --name ai-muse-app \
  -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL}" \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY="${NEXT_PUBLIC_SUPABASE_ANON_KEY}" \
  --restart unless-stopped \
  ai-muse-app:latest

if [ $? -eq 0 ]; then
    echo "✅ 部署成功！"
    echo "🌐 访问: http://localhost:3000"
    echo "📊 查看日志: docker logs -f ai-muse-app"
else
    echo "❌ 部署失败！"
    exit 1
fi
