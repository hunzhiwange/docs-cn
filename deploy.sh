#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
npm run build

# 进入待发布的目录
cd .vitepress/dist

# 如果是发布到自定义域名
echo 'www.queryphp.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# git remote add origin git@github.com:hunzhiwange/docs-cn.git

# 如果部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:hunzhiwange/docs-cn.git master:gh-pages

# 回到之前的目录
cd -
