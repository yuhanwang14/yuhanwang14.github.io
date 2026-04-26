#!/bin/bash

# 自动提交和推送脚本
echo "🚀 开始自动提交到GitHub..."

# 检查是否有未提交的更改
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ 没有检测到更改，无需提交"
    exit 0
fi

# 添加所有更改
echo "📝 添加所有更改..."
git add .

# 获取当前时间作为提交信息
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
COMMIT_MSG="Auto commit: $TIMESTAMP"

# 提交更改
echo "💾 提交更改: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# 推送到GitHub
echo "🌐 推送到GitHub..."
git push origin main

echo "✅ 自动提交完成！"
echo "🔗 你的网站将在几分钟内更新: https://gracee-chen.github.io"
