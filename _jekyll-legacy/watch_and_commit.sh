#!/bin/bash

# 文件监控和自动提交脚本
echo "👀 开始监控文件变化..."

# 检查是否安装了fswatch
if ! command -v fswatch &> /dev/null; then
    echo "❌ 需要安装fswatch来监控文件变化"
    echo "💡 请运行: brew install fswatch"
    exit 1
fi

# 自动提交函数
auto_commit() {
    echo "📝 检测到文件变化，开始自动提交..."
    
    # 等待1秒确保文件写入完成
    sleep 1
    
    # 检查是否有未提交的更改
    if [ -z "$(git status --porcelain)" ]; then
        echo "✅ 没有检测到更改，跳过提交"
        return
    fi
    
    # 添加所有更改
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
    echo "⏰ 下次变化将在 $(date) 被检测到"
}

# 监控以下文件类型的变化
echo "📁 监控文件类型: .md, .yml, .html, .css, .js, .scss"
echo "🔄 按 Ctrl+C 停止监控"

# 使用fswatch监控文件变化
fswatch -o \
    --include='\.(md|yml|html|css|js|scss)$' \
    --exclude='\.git' \
    --exclude='_site' \
    --exclude='vendor' \
    . | while read; do
    auto_commit
done
