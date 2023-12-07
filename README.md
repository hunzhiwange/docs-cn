# queryphp.com

This site is built with [VitePress](https://vitepress.vuejs.org/).

## Developing

```
# node 版本
node -v v19.5.0
n 19.5.0

# 克隆本仓库
$ git clone git@github.com:hunzhiwange/docs-cn.git

# 安装依赖
$ npm install
# 或者使用 pnpm
$ pnpm i

# 启动开发服务器
$ pnpm dev
```

## Node Memory Limit

``` sh
npm install -g increase-memory-limit cross-env
npm run fix-memory-limit #cross-env LIMIT=8192 increase-memory-limit
```