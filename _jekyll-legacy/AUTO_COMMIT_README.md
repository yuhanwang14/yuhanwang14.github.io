# 自动提交到GitHub

## 🚀 快速开始

### 方法1: 简单提交（推荐）
```bash
./simple_commit.sh
```

### 方法2: 手动提交
```bash
./auto_commit.sh
```

### 方法3: 自动监控
```bash
./watch_and_commit.sh
```

## 📋 功能说明

### `auto_commit.sh`
- 手动执行一次提交
- 自动添加所有更改
- 自动推送到GitHub
- 显示网站更新链接

### `watch_and_commit.sh`
- 自动监控文件变化
- 检测到变化时自动提交
- 支持的文件类型：.md, .yml, .html, .css, .js, .scss
- 按 Ctrl+C 停止监控

## 🔧 安装依赖

如果使用自动监控功能，需要安装fswatch：
```bash
brew install fswatch
```

## 📝 使用流程

1. **开始监控**：
   ```bash
   ./watch_and_commit.sh
   ```

2. **修改文件**：
   - 编辑任何网站文件
   - 保存文件

3. **自动提交**：
   - 脚本自动检测变化
   - 自动提交到GitHub
   - 网站自动更新

## 🌐 网站更新

- 提交后，网站会在几分钟内自动更新
- 访问：https://gracee-chen.github.io
- GitHub Pages构建状态：https://github.com/gracee-chen/gracee-chen.github.io/actions

## ⚠️ 注意事项

- 确保GitHub仓库已正确配置
- 确保有推送权限
- 大文件可能需要更长时间上传
- 网络问题可能导致推送失败

## 🛠 故障排除

如果推送失败：
1. 检查网络连接
2. 检查GitHub认证
3. 手动运行：`git push origin main`
