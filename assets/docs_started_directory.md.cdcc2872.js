import{_ as s,o as n,c as a,a as e}from"./app.42c4a044.js";const y=JSON.parse('{"title":"Directory","description":"","frontmatter":{},"headers":[{"level":2,"title":"基本结构","slug":"基本结构","link":"#基本结构","children":[]},{"level":2,"title":"多应用","slug":"多应用","link":"#多应用","children":[]}],"relativePath":"docs/started/directory.md"}'),p={name:"docs/started/directory.md"},l=e(`<h1 id="directory" tabindex="-1">Directory <a class="header-anchor" href="#directory">¶</a></h1><div class="tip custom-block"><p class="custom-block-title">Testing Is Documentation</p><p><a href="https://github.com/hunzhiwange/framework/blob/master/tests/Docs/Started/DirectoryDoc.php" target="_blank" rel="noreferrer">tests/Docs/Started/DirectoryDoc.php</a></p></div><p>QueryPHP 遵循 <strong>“约定优于配置”</strong> 的原则，主张通过领域驱动设计来构建更可靠的软件。</p><h2 id="基本结构" tabindex="-1">基本结构 <a class="header-anchor" href="#基本结构">¶</a></h2><p>下面是整个应用基本目录结构，系统结构可以自由定义。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">├── assets 资源目录</span></span>
<span class="line"><span style="color:#A6ACCD;">│── app （默认应用）</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── Domain 领域模型层（Domain Model）</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   └── Entity 实体 (Entity)</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   └── Event 事件（Event）</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   └── Listener 监听器（Listener）</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │── Infra 基础设施层（Infrastructure）</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   └── Provider 服务提供者 (Provider)</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   └── Repository 仓储 (Repository)</span></span>
<span class="line"><span style="color:#A6ACCD;">│-- option 配置目录</span></span>
<span class="line"><span style="color:#A6ACCD;">│-- storage 缓存目录</span></span>
<span class="line"><span style="color:#A6ACCD;">│-- tests 单元测试目录</span></span>
<span class="line"><span style="color:#A6ACCD;">│-- vendor Composer 第三方库目录</span></span>
<span class="line"><span style="color:#A6ACCD;">│-- www Web 入口目录</span></span>
<span class="line"><span style="color:#A6ACCD;">│-- .env 环境变量</span></span>
<span class="line"><span style="color:#A6ACCD;">│-- .env.phpunit 单元测试环境变量</span></span>
<span class="line"><span style="color:#A6ACCD;">│-- .php-cs-fixer.dist.php 统一团队风格配置</span></span>
<span class="line"><span style="color:#A6ACCD;">│-- composer.json Composer 配置</span></span>
<span class="line"><span style="color:#A6ACCD;">│-- leevel 命令行工具集 php leevel</span></span>
<span class="line"><span style="color:#A6ACCD;">│-- phinx.php 数据库迁移配置</span></span>
<span class="line"><span style="color:#A6ACCD;">│-- phpunit.xml.dist PHPUnit 配置</span></span>
<span class="line"><span style="color:#A6ACCD;">│-- phpunit.xml.coverage PHPUnit 生成 HTML 覆盖率配置，需要安装 xdebug</span></span>
<span class="line"><span style="color:#A6ACCD;">└── ...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">注意</p><p>请留意目录名的大写。</p></div><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>在 Mac 或者 Linux 环境下面，注意需要设置 <code>storage</code> 目录权限为 0777。</p></div><h2 id="多应用" tabindex="-1">多应用 <a class="header-anchor" href="#多应用">¶</a></h2><p>QueryPHP 设计了一个很简单的规则来访问多应用，只需要加 <code>:</code> 即可，该目录会自动识别为应用，例如:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">http://127.0.0.1:9527/ 默认应用首页</span></span>
<span class="line"><span style="color:#A6ACCD;">http://127.0.0.1:9527/:admin/ Admin 应用首页</span></span>
<span class="line"><span style="color:#A6ACCD;">http://127.0.0.1:9527/api/show 默认应用 API 控制器 show 方法</span></span>
<span class="line"><span style="color:#A6ACCD;">http://127.0.0.1:9527/:admin/api/show Admin 应用 API 控制器 show 方法</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,11),o=[l];function t(c,r,i,A,C,d){return n(),a("div",null,o)}const D=s(p,[["render",t]]);export{y as __pageData,D as default};
