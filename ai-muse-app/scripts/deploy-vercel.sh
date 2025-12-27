#!/bin/bash

# AI-Muse Vercel 快速部署脚本

echo "🚀 开始部署 AI-Muse 到 Vercel..."

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null
then
    echo "❌ 未检测到 Vercel CLI，正在安装..."
    npm install -g vercel
fi

# 检查是否已登录
echo "📝 检查 Vercel 登录状态..."
vercel whoami &> /dev/null

if [ $? -ne 0 ]; then
    echo "🔐 请先登录 Vercel..."
    vercel login
fi

# 部署到生产环境
echo "🎯 部署到生产环境..."
vercel --prod

echo "✅ 部署完成！"
echo "🌐 访问你的应用: https://your-app.vercel.app"
