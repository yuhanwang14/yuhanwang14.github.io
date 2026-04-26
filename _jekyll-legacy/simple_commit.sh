#!/bin/bash

# 简单自动提交脚本
echo "🚀 开始自动提交..."

# 拉取最新更改
echo "📥 拉取最新更改..."
git pull origin main

# 添加所有更改
echo "📝 添加所有更改..."
git add .

# 检查是否有更改
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ 没有检测到更改，无需提交"
    exit 0
fi

# 提交更改
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
COMMIT_MSG="Auto commit: $TIMESTAMP"
echo "💾 提交更改: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# 推送到GitHub
echo "🌐 推送到GitHub..."
git push origin main

echo "✅ 自动提交完成！"
echo "🔗 你的网站将在几分钟内更新: https://gracee-chen.github.io"
