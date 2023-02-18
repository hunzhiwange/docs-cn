import{_ as s,o as n,c as a,a as l}from"./app.42c4a044.js";const d=JSON.parse('{"title":"如何成为 QueryPHP 开发者","description":"","frontmatter":{},"headers":[{"level":2,"title":"克隆 queryphp 仓库","slug":"克隆-queryphp-仓库","link":"#克隆-queryphp-仓库","children":[]},{"level":2,"title":"搭建后台 API 端","slug":"搭建后台-api-端","link":"#搭建后台-api-端","children":[]},{"level":2,"title":"搭建前端","slug":"搭建前端","link":"#搭建前端","children":[]},{"level":2,"title":"运行测试用例","slug":"运行测试用例","link":"#运行测试用例","children":[]},{"level":2,"title":"统一团队代码风格","slug":"统一团队代码风格","link":"#统一团队代码风格","children":[{"level":3,"title":"格式化后的 PHP","slug":"格式化后的-php","link":"#格式化后的-php","children":[]},{"level":3,"title":"格式化后的 JavaScript","slug":"格式化后的-javascript","link":"#格式化后的-javascript","children":[]},{"level":3,"title":"回滚测试提交","slug":"回滚测试提交","link":"#回滚测试提交","children":[]}]},{"level":2,"title":"克隆 framework 仓库将框架替换为开发版本","slug":"克隆-framework-仓库将框架替换为开发版本","link":"#克隆-framework-仓库将框架替换为开发版本","children":[]},{"level":2,"title":"运行框架核心测试用例","slug":"运行框架核心测试用例","link":"#运行框架核心测试用例","children":[]},{"level":2,"title":"统一框架核心团队代码风格","slug":"统一框架核心团队代码风格","link":"#统一框架核心团队代码风格","children":[{"level":3,"title":"格式化后的 PHP","slug":"格式化后的-php-1","link":"#格式化后的-php-1","children":[]}]},{"level":2,"title":"克隆 queryphp.com 仓库实现自动化文档搭建","slug":"克隆-queryphp-com-仓库实现自动化文档搭建","link":"#克隆-queryphp-com-仓库实现自动化文档搭建","children":[]},{"level":2,"title":"结尾","slug":"结尾","link":"#结尾","children":[]}],"relativePath":"docs/developer/index.md"}'),p={name:"docs/developer/index.md"},e=l(`<h1 id="如何成为-queryphp-开发者" tabindex="-1">如何成为 QueryPHP 开发者 <a class="header-anchor" href="#如何成为-queryphp-开发者">¶</a></h1><div class="tip custom-block"><p class="custom-block-title">Testing Is Documentation</p><p><a href="https://github.com/hunzhiwange/framework/blob/master/tests/Docs/BecomeAQueryphpDeveloperDoc.php" target="_blank" rel="noreferrer">tests/Docs/BecomeAQueryphpDeveloperDoc.php</a></p></div><p>QueryPHP 非常欢迎各位给我们共同的充满想象且令人惊叹的完成度的开源作品添砖加瓦，实现为 PHP 社区提供一个好框架的美好愿景。</p><ul><li>文档开发.基于单元测试实现的自动化文档 <a href="https://github.com/hunzhiwange/framework/projects/2" target="_blank" rel="noreferrer">当前文档开发</a></li><li>计划功能.开发 <a href="https://github.com/hunzhiwange/framework/projects/6" target="_blank" rel="noreferrer">当前计划功能</a></li><li>技术债务.清偿 <a href="https://github.com/hunzhiwange/framework/projects/7" target="_blank" rel="noreferrer">当前技术债务</a></li><li>单元测试.尽可能减少 Bug <a href="https://github.com/hunzhiwange/framework/projects/4" target="_blank" rel="noreferrer">当前单元测试</a></li></ul><p>成为开发者需要加入我们的组织，如有相关意愿请发送邮件至 <code>小牛哥 &lt;635750556@qq.com&gt;</code>，我们会联系你的。</p><p>成为开发者并没有什么任务负担，一切主要以你的意愿，兴趣才是最重要的。</p><p>本篇指南将带你搭建的 QueryPHP 开发框架的开发环境，使得你可以参与 QueryPHP 底层代码、单元测试和文档等开发工作。</p><p>这里以笔者的 Mac 为例子说明，其实 Windows 下面还更简单些。</p><h2 id="克隆-queryphp-仓库" tabindex="-1">克隆 <code>queryphp</code> 仓库 <a class="header-anchor" href="#克隆-queryphp-仓库">¶</a></h2><p>QueryPHP 框架的开发来自于从克隆主仓库开始，由于国内访问 Github 网速的问题，只需要等待一小段时间。</p><p><strong>下载代码</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">$cd /data/codes/test</span></span>
<span class="line"><span style="color:#A6ACCD;">$git clone git@github.com:hunzhiwange/queryphp.git</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>Composer 安装</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">composer install</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><blockquote><p>如果你电脑没有安装 <code>composer</code>，那么已经为你下载一个版本。</p></blockquote><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">sudo chmod 777 ./build/composer</span></span>
<span class="line"><span style="color:#A6ACCD;">./build/composer install</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>安装过程</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Cloning into &#39;queryphp&#39;...</span></span>
<span class="line"><span style="color:#A6ACCD;">remote: Enumerating objects: 54, done.</span></span>
<span class="line"><span style="color:#A6ACCD;">remote: Counting objects: 100% (54/54), done.</span></span>
<span class="line"><span style="color:#A6ACCD;">remote: Compressing objects: 100% (39/39), done.</span></span>
<span class="line"><span style="color:#A6ACCD;">remote: Total 17821 (delta 19), reused 36 (delta 14), pack-reused 17767</span></span>
<span class="line"><span style="color:#A6ACCD;">Receiving objects: 100% (17821/17821), 45.12 MiB | 693.00 KiB/s, done.</span></span>
<span class="line"><span style="color:#A6ACCD;">Resolving deltas: 100% (8700/8700), done.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>测试是否安装成功</strong></p><p>如果可以访问，那么恭喜你第一阶段即安装完毕。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">php</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">leevel</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">server</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">Visite</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">http://127.0.0.1:</span><span style="color:#F78C6C;">9527</span><span style="color:#A6ACCD;">/</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="搭建后台-api-端" tabindex="-1">搭建后台 API 端 <a class="header-anchor" href="#搭建后台-api-端">¶</a></h2><p>首先我们需要创建一个数据库来运行我们的后台，让我们对 QueryPHP 有一个直观的感受，同时方便后期开发调试等。</p><p><strong>首先创建一个数据库</strong></p><p>可以用 Navicat For Mysql 创建一个数据库 <code>queryphp_development_db</code>.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">CREATE DATABASE IF NOT EXISTS queryphp_development_db DEFAULT CHARSET utf8 COLLATE utf8_general_ci;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>修改 .env</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">// Database</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_DRIVER = mysql</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_HOST = 127.0.0.1</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_PORT = 3306</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_NAME = queryphp_development_db</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_USER = root</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_PASSWORD =</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">修改为</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">// Database</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_DRIVER = mysql</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_HOST = 127.0.0.1</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_PORT = 3306</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_NAME = queryphp_development_db</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_USER = root</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_PASSWORD = 123456</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>执行数据库迁移命令</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">php leevel migrate:migrate</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>安装过程</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">using config file ./phinx.php</span></span>
<span class="line"><span style="color:#A6ACCD;">using config parser php</span></span>
<span class="line"><span style="color:#A6ACCD;">using migration paths</span></span>
<span class="line"><span style="color:#A6ACCD;">- /data/codes/test/queryphp/database/migrations</span></span>
<span class="line"><span style="color:#A6ACCD;">using seed paths</span></span>
<span class="line"><span style="color:#A6ACCD;">- /data/codes/test/queryphp/database/seeds</span></span>
<span class="line"><span style="color:#A6ACCD;">warning no environment specified, defaulting to: development</span></span>
<span class="line"><span style="color:#A6ACCD;">using adapter mysql</span></span>
<span class="line"><span style="color:#A6ACCD;">using database queryphp_development_db</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181109060739 App: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181109060739 App: migrated 0.0155s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112023649 Role: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112023649 Role: migrated 0.0160s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024140 User: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024140 User: migrated 0.0166s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024211 Permission: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024211 Permission: migrated 0.0225s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024241 UserRole: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024241 UserRole: migrated 0.0155s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024302 RolePermission: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024302 RolePermission: migrated 0.0206s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024416 Resource: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024416 Resource: migrated 0.0328s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024450 PermissionResource: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024450 PermissionResource: migrated 0.0305s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181203130724 Option: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181203130724 Option: migrated 0.0170s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181203144731 Test: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181203144731 Test: migrated 0.0133s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">All Done. Took 0.2273s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>测试数据库是否正常</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">php leevel server &lt;http://127.0.0.1:9527/api/entity&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>结果</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    count: 4,</span></span>
<span class="line"><span style="color:#A6ACCD;">    :trace: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="搭建前端" tabindex="-1">搭建前端 <a class="header-anchor" href="#搭建前端">¶</a></h2><p>后台 API 搭建好了，我们开始搭建前端了，前端基于 <code>Vue-cli 3</code> 和 <code>IView</code>，首先需要安装 <code>node</code> 才能够跑起来。</p><p>对于开发 QueryPHP 来说，你不需要会 <code>Vue</code> 或者 <code>JavaScript</code>，所以请放心不要有心里负担。</p><p><strong>安装前端</strong></p><p>第一步安装前端,细节信息可以在 frontend/README.md 查看.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">cd frontend</span></span>
<span class="line"><span style="color:#A6ACCD;">npm install -g cnpm --registry=https://registry.npm.taobao.org // Just once</span></span>
<span class="line"><span style="color:#A6ACCD;">cnpm install</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>安装过程</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">✔ All packages installed (1264 packages installed from npm registry, used 14s(network 13s), speed 221.08kB/s, json 1086(2.23MB), tarball 501.92kB)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>运行前端</strong></p><p>接着访问这个登陆地址.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm run serve # npm run dev &lt;http://127.0.0.1:9528/#/login&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>输入登陆用户名和密码,这个时候 QueryPHP 不再是一个冰冷的代码，而是有一个干净的带有基础权限系统的后台。</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">user: admin</span></span>
<span class="line"><span style="color:#A6ACCD;">password: 123456</span></span>
<span class="line"></span></code></pre></div><h2 id="运行测试用例" tabindex="-1">运行测试用例 <a class="header-anchor" href="#运行测试用例">¶</a></h2><p>QueryPHP 推崇通过编写测试用例来让代码变得可维护，所以这里需要本地开发跑通测试用例。</p><p><strong>首先创建一个数据库</strong></p><p>可以用 Navicat For Mysql 创建一个数据库 <code>queryphp_development_test</code>.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">CREATE DATABASE IF NOT EXISTS queryphp_development_test DEFAULT CHARSET utf8 COLLATE utf8_general_ci;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>修改 .env</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">// Database</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_DRIVER = mysql</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_HOST = 127.0.0.1</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_PORT = 3306</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_NAME = test</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_USER = root</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_PASSWORD =</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">修改为</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">// Database</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_DRIVER = mysql</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_HOST = 127.0.0.1</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_PORT = 3306</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_NAME = queryphp_development_test</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_USER = root</span></span>
<span class="line"><span style="color:#A6ACCD;">DATABASE_PASSWORD = 123456</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>执行数据库迁移命令</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">php leevel migrate:migrate -e testing</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>安装过程</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">using config file ./phinx.php</span></span>
<span class="line"><span style="color:#A6ACCD;">using config parser php</span></span>
<span class="line"><span style="color:#A6ACCD;">using migration paths</span></span>
<span class="line"><span style="color:#A6ACCD;">- /data/codes/test/queryphp/database/migrations</span></span>
<span class="line"><span style="color:#A6ACCD;">using seed paths</span></span>
<span class="line"><span style="color:#A6ACCD;">- /data/codes/test/queryphp/database/seeds</span></span>
<span class="line"><span style="color:#A6ACCD;">using environment testing</span></span>
<span class="line"><span style="color:#A6ACCD;">using adapter mysql</span></span>
<span class="line"><span style="color:#A6ACCD;">using database queryphp_development_test</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181109060739 App: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181109060739 App: migrated 0.0155s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112023649 Role: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112023649 Role: migrated 0.0160s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024140 User: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024140 User: migrated 0.0166s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024211 Permission: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024211 Permission: migrated 0.0225s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024241 UserRole: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024241 UserRole: migrated 0.0155s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024302 RolePermission: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024302 RolePermission: migrated 0.0206s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024416 Resource: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024416 Resource: migrated 0.0328s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024450 PermissionResource: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181112024450 PermissionResource: migrated 0.0305s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181203130724 Option: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181203130724 Option: migrated 0.0170s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181203144731 Test: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;">== 20181203144731 Test: migrated 0.0133s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">All Done. Took 0.2273s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>运行测试用例</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">php ./build/phpunit</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>结果</p><blockquote><p>注意随着系统演进，测试用例会增加，输出结果就有所不同。</p></blockquote><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">PHPUnit Pretty Result Printer 0.26.2 by Codedungeon and contributors.</span></span>
<span class="line"><span style="color:#A6ACCD;">PHPUnit 8.1.3 by Sebastian Bergmann and contributors.</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Tests\\Admin\\Service\\Resource\\IndexTest       ✓  ✓</span></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Tests\\Example\\ExampleTest                    ✓</span></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Tests\\Example\\PHPUnitTest                    ✓</span></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Common\\Domain\\Service\\Search\\IndexTest       ✓  ✓  ✓  ✓  ✓  ✓</span></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Common\\Infra\\Helper\\ArrayToFormTest          ✓  ✓  ✓  ✓  ✓  ✓</span></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Common\\Infra\\Support\\WorkflowServiceTest     ✓  ✓  ✓  ✓  ✓</span></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Common\\Infra\\Support\\WorkflowTest            ✓  ✓  ✓  ✓  ✓</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">Time: 391 ms, Memory: 18.00 MB</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">OK (26 tests, 43 assertions)</span></span>
<span class="line"></span></code></pre></div><h2 id="统一团队代码风格" tabindex="-1">统一团队代码风格 <a class="header-anchor" href="#统一团队代码风格">¶</a></h2><p>风格统一对保证我们系统一致性非常重要，我们做到开箱即用，支持 <code>PHP</code> 和 <code>JavaScript</code>。</p><p><strong>使用 Git 钩子</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">cp ./build/pre-commit.sh ./.git/hooks/pre-commit</span></span>
<span class="line"><span style="color:#A6ACCD;">chmod 777 ./.git/hooks/pre-commit</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>测试自动化格式</strong></p><p><code>common/Test.php</code></p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;?</span><span style="color:#A6ACCD;">php</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">declare</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">strict_types</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">namespace</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Common</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Test</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">demo</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">b</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><code>frontend/src/hello.js</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">function hello(a,b) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    var c</span></span>
<span class="line"><span style="color:#A6ACCD;">        if(a&gt;b) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            c=a</span></span>
<span class="line"><span style="color:#A6ACCD;">        } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">            c=b</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    console.log(c)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>Git 提交测试格式化</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git add .</span></span>
<span class="line"><span style="color:#A6ACCD;">git commit -m &#39;测试格式化&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>运行过程</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">Checking</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PHP</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Lint...</span></span>
<span class="line"><span style="color:#FFCB6B;">No</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">syntax</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">errors</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">detected</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">common/Test.php</span></span>
<span class="line"><span style="color:#FFCB6B;">Running</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Code</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Sniffer...</span></span>
<span class="line"><span style="color:#FFCB6B;">Loaded</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.php_cs.dist</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.</span></span>
<span class="line"><span style="color:#FFCB6B;">Paths</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">configuration</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">file</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">have</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">been</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">overridden</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">by</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">paths</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">provided</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">command</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">arguments.</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">) common/Test.php Fixed all files </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0.009</span><span style="color:#A6ACCD;"> seconds, </span><span style="color:#F78C6C;">12.000</span><span style="color:#A6ACCD;"> MB memory used</span></span>
<span class="line"><span style="color:#FFCB6B;">The</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">file</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">has</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">been</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">automatically</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">formatted.</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">13</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">04</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">00</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> Working directory changed to /data/codes/test/queryphp/frontend</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">13</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">04</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">00</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> Using gulpfile /data/codes/test/queryphp/frontend/gulpfile.js</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">13</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">04</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">00</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> Starting </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">iview</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">13</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">04</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">00</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> Finished </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">iview</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> after </span><span style="color:#F78C6C;">413</span><span style="color:#A6ACCD;"> μs</span></span>
<span class="line"><span style="color:#FFCB6B;">frontend/src/hello.js</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">53ms</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">master 681d7e29</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> 测试格式化</span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;"> files changed, </span><span style="color:#F78C6C;">32</span><span style="color:#A6ACCD;"> insertions</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">+</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#FFCB6B;">mode</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">change</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100644</span><span style="color:#A6ACCD;"> =</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100755</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build/composer</span></span>
<span class="line"><span style="color:#FFCB6B;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mode</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100644</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">common/Test.php</span></span>
<span class="line"><span style="color:#FFCB6B;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mode</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100644</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">frontend/src/hello.js</span></span>
<span class="line"></span></code></pre></div><h3 id="格式化后的-php" tabindex="-1">格式化后的 PHP <a class="header-anchor" href="#格式化后的-php">¶</a></h3><p>代码干净漂亮了不少，不是吗。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;?</span><span style="color:#A6ACCD;">php</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">declare</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">strict_types</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * This file is part of the your app package.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> *</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * The PHP Application For Code Poem For You.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * (c) 2018-2099 http://yourdomian.com All rights reserved.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> *</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * For the full copyright and license information, please view the LICENSE</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * file that was distributed with this source code.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">namespace</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Common</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Test</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">demo</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="格式化后的-javascript" tabindex="-1">格式化后的 JavaScript <a class="header-anchor" href="#格式化后的-javascript">¶</a></h3><p>代码干净漂亮了不少，不是吗。</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">hello</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">a</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">b</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">c</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">a</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">b</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">c</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">a</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">c</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">b</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">c</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="回滚测试提交" tabindex="-1">回滚测试提交 <a class="header-anchor" href="#回滚测试提交">¶</a></h3><p>这些测试代码不需要提交到 Git 库，你可以回滚掉刚才测试的这些代码。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">log</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">reset</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--hard</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">931f283b0b8847e4a3f2ad86efb3c07cd7974c3b</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">//</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">或者</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">revert</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">xxx</span></span>
<span class="line"><span style="color:#FFCB6B;">HEAD</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">is</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">now</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">at</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">931f283b</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Merge</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">branch</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">dev</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><h2 id="克隆-framework-仓库将框架替换为开发版本" tabindex="-1">克隆 <code>framework</code> 仓库将框架替换为开发版本 <a class="header-anchor" href="#克隆-framework-仓库将框架替换为开发版本">¶</a></h2><p>应用层框架全部搭建完毕，接下来我们将框架层代码替换为开发阶段的代码来进行日常框架迭代。</p><p><strong>删除框架层</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">rm -rf ./vendor/hunzhiwange/framework</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>克隆框架层开发库</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">$cd /data/codes/test</span></span>
<span class="line"><span style="color:#A6ACCD;">$git clone git@github.com:hunzhiwange/framework.git ./vendor/hunzhiwange/framework</span></span>
<span class="line"><span style="color:#A6ACCD;">cd ./vendor/hunzhiwange/framework</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>Composer 安装</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">composer install</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><blockquote><p>如果你电脑没有安装 <code>composer</code>，那么已经为你下载一个版本。</p></blockquote><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">sudo chmod 777 ./build/composer</span></span>
<span class="line"><span style="color:#A6ACCD;">./build/composer install</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>安装过程</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Cloning into &#39;./vendor/hunzhiwange/framework&#39;...</span></span>
<span class="line"><span style="color:#A6ACCD;">remote: Enumerating objects: 382, done.</span></span>
<span class="line"><span style="color:#A6ACCD;">remote: Counting objects: 100% (382/382), done.</span></span>
<span class="line"><span style="color:#A6ACCD;">remote: Compressing objects: 100% (218/218), done.</span></span>
<span class="line"><span style="color:#A6ACCD;">remote: Total 39304 (delta 196), reused 262 (delta 125), pack-reused 38922</span></span>
<span class="line"><span style="color:#A6ACCD;">Receiving objects: 100% (39304/39304), 14.49 MiB | 12.00 KiB/s, done.</span></span>
<span class="line"><span style="color:#A6ACCD;">Resolving deltas: 100% (27594/27594), done.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>测试是否安装成功</strong></p><p>从新访问首页，如果可以访问，那么恭喜你第一阶段即安装完毕。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">php</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">leevel</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">server</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">Visite</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">http://127.0.0.1:</span><span style="color:#F78C6C;">9527</span><span style="color:#A6ACCD;">/</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="运行框架核心测试用例" tabindex="-1">运行框架核心测试用例 <a class="header-anchor" href="#运行框架核心测试用例">¶</a></h2><p>QueryPHP 底层框架拥有 3000 多例测试用例，这些测试用例需要被维护，所以这里需要本地开发跑通测试用例。</p><p><strong>首先创建一个数据库</strong></p><p>可以用 Navicat For Mysql 创建一个数据库 <code>test</code>.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">CREATE DATABASE IF NOT EXISTS test DEFAULT CHARSET utf8 COLLATE utf8_general_ci;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>复制一份配置文件并修改</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">cp ./tests/config.php ./tests/config.local.php</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>修改为</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;?</span><span style="color:#A6ACCD;">php</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">GLOBALS</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">LEEVEL_ENV</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">][</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">DATABASE</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">][</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">MYSQL</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HOST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">127.0.0.1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">PORT</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3306</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">NAME</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">USER</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">root</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">PASSWORD</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">123456</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">GLOBALS</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">LEEVEL_ENV</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">][</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">CACHE</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">][</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">REDIS</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HOST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">127.0.0.1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">PORT</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">6380</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">PASSWORD</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">123456</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">GLOBALS</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">LEEVEL_ENV</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">][</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">SESSION</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">][</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">REDIS</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HOST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">127.0.0.1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">PORT</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">6380</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">PASSWORD</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">123456</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">];</span></span>
<span class="line"></span></code></pre></div><p><strong>执行数据库迁移命令</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">php vendor/bin/phinx migrate</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>安装过程</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Phinx by CakePHP - https://phinx.org. 0.9.2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">using config file ./phinx.php</span></span>
<span class="line"><span style="color:#A6ACCD;">using config parser php</span></span>
<span class="line"><span style="color:#A6ACCD;">using migration paths</span></span>
<span class="line"><span style="color:#A6ACCD;"> - /data/codes/test/queryphp/vendor/hunzhiwange/framework/tests/assert/database/migrations</span></span>
<span class="line"><span style="color:#A6ACCD;">using seed paths</span></span>
<span class="line"><span style="color:#A6ACCD;"> - /data/codes/test/queryphp/vendor/hunzhiwange/framework/tests/assert/database/seeds</span></span>
<span class="line"><span style="color:#A6ACCD;">warning no environment specified, defaulting to: development</span></span>
<span class="line"><span style="color:#A6ACCD;">using adapter mysql</span></span>
<span class="line"><span style="color:#A6ACCD;">using database test</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181010111946 User: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181010111946 User: migrated 0.0076s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181011111926 Post: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181011111926 Post: migrated 0.0101s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181011111937 Comment: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181011111937 Comment: migrated 0.0106s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181011151247 PostContent: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181011151247 PostContent: migrated 0.0087s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181011160957 Role: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181011160957 Role: migrated 0.0078s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181011161035 UserRole: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181011161035 UserRole: migrated 0.0100s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181031094608 CompositeId: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181031094608 CompositeId: migrated 0.0094s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181107044153 GuestBook: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20181107044153 GuestBook: migrated 0.0086s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20190424055915 TestUnique: migrating</span></span>
<span class="line"><span style="color:#A6ACCD;"> == 20190424055915 TestUnique: migrated 0.0133s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">All Done. Took 0.1179s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>运行测试用例</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">php ./build/phpunit</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>结果</p><blockquote><p>注意随着系统演进，测试用例会增加，输出结果就有所不同。</p></blockquote><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">PHPUnit 8.1.3 by Sebastian Bergmann and contributors.</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Tests\\Auth\\HashTest                          ✓  ✓</span></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Tests\\Auth\\ManagerTest                       ✓  ✓  ✓</span></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Tests\\Auth\\Middleware\\AuthTest               ✓  ✓</span></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Tests\\Auth\\Provider\\RegisterTest             ✓</span></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Tests\\Auth\\SessionTest                       ✓  ✓</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Tests\\View\\Compiler\\CompilerWhileTest        ✓  ✓</span></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Tests\\View\\HtmlTest                          ✓  ✓  ✓  ✓  ✓  ✓  ✓  ✓  ✓</span></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Tests\\View\\ManagerTest                       ✓</span></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Tests\\View\\PhpuiTest                         ✓  ✓  ✓  ✓  ✓  ✓  ✓  ✓</span></span>
<span class="line"><span style="color:#A6ACCD;">==&gt; Tests\\View\\Provider\\RegisterTest             ✓</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">Time: 19.51 seconds, Memory: 93.19 MB</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">Tests: 2978, Assertions: 10031, Failures: 0, Skipped: 6.</span></span>
<span class="line"></span></code></pre></div><h2 id="统一框架核心团队代码风格" tabindex="-1">统一框架核心团队代码风格 <a class="header-anchor" href="#统一框架核心团队代码风格">¶</a></h2><p>风格统一对保证我们系统一致性非常重要，我们做到开箱即用，核心库只包含 PHP 文件。</p><p><strong>使用 Git 钩子</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">cp ./build/pre-commit.sh ./.git/hooks/pre-commit</span></span>
<span class="line"><span style="color:#A6ACCD;">chmod 777 ./.git/hooks/pre-commit</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>测试自动化格式</strong></p><p><code>tests/Name.php</code></p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;?</span><span style="color:#A6ACCD;">php</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">declare</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">strict_types</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">namespace</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Test</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Name</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">demo</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">b</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><strong>Git 提交测试格式化</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git add .</span></span>
<span class="line"><span style="color:#A6ACCD;">git commit -m &#39;测试格式化&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>运行过程</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">Checking</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PHP</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Lint...</span></span>
<span class="line"><span style="color:#FFCB6B;">No</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">syntax</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">errors</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">detected</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">tests/Name.php</span></span>
<span class="line"><span style="color:#FFCB6B;">Running</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Code</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Sniffer...</span></span>
<span class="line"><span style="color:#FFCB6B;">Loaded</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.php_cs.dist</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.</span></span>
<span class="line"><span style="color:#FFCB6B;">Paths</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">configuration</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">file</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">have</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">been</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">overridden</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">by</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">paths</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">provided</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">command</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">arguments.</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">) tests/Name.php Fixed all files </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0.009</span><span style="color:#A6ACCD;"> seconds, </span><span style="color:#F78C6C;">12.000</span><span style="color:#A6ACCD;"> MB memory used</span></span>
<span class="line"><span style="color:#FFCB6B;">The</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">file</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">has</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">been</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">automatically</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">formatted.</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">master 20f2f845</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> 测试格式化</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;"> files changed, </span><span style="color:#F78C6C;">29</span><span style="color:#A6ACCD;"> insertions</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">+</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#FFCB6B;">mode</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">change</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100644</span><span style="color:#A6ACCD;"> =</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100755</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build/composer</span></span>
<span class="line"><span style="color:#FFCB6B;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mode</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100644</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">tests/Name.php</span></span>
<span class="line"></span></code></pre></div><h3 id="格式化后的-php-1" tabindex="-1">格式化后的 PHP <a class="header-anchor" href="#格式化后的-php-1">¶</a></h3><p>代码干净漂亮了不少，不是吗。</p><p>测试代码回滚请见上面的方法，谢谢。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;?</span><span style="color:#A6ACCD;">php</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">declare</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">strict_types</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">namespace</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Test</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Name</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">demo</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="克隆-queryphp-com-仓库实现自动化文档搭建" tabindex="-1">克隆 <code>queryphp.com</code> 仓库实现自动化文档搭建 <a class="header-anchor" href="#克隆-queryphp-com-仓库实现自动化文档搭建">¶</a></h2><p>QueryPHP 底层的文档基于单元测试加备注的方式来实现的，通过命名工具全部采用自动化生成 Markdown，这大幅度简化了文档的编写工作，同时保证了文档实时性。</p><p><strong>官方文档采用 VuePress 读取 Markdown 来实现的</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">$cd /data/codes/test</span></span>
<span class="line"><span style="color:#A6ACCD;">$git clone git@github.com:hunzhiwange/queryphp.com.git</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>修改文档工具生成 Markdown 的路径</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">$cd /data/codes/test/queryphp</span></span>
<span class="line"><span style="color:#A6ACCD;">$vim .env</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 修改路径</span></span>
<span class="line"><span style="color:#A6ACCD;">FRAMEWORK_DOC_OUTPUTDIR = &quot;/data/codes/test/queryphp.com/docs/docs/&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>生成文档</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">$cd /data/codes/test/queryphp</span></span>
<span class="line"><span style="color:#A6ACCD;">$php leevel make:docwithin vendor/hunzhiwange/framework/tests</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>运行过程</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Class Tests\\Encryption\\EncryptionTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\Encryption\\HelperTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\Database\\ManagerTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\Database\\Ddd\\UnitOfWorkTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\Database\\Ddd\\Create\\CreateTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\Database\\Query\\AggregateTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\Validate\\AssertTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\Di\\ContainerTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\Docs\\BecomeAQueryphpDeveloperDoc was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\Support\\FnTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\Support\\StrTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\Support\\ArrTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\View\\SummaryDoc was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\View\\Compiler\\CompilerAssignTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\View\\Compiler\\CompilerPhpTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\View\\Compiler\\CompilerBreakTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\View\\Compiler\\CompilerIncludeTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\View\\Compiler\\CompilerTagselfTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\View\\Compiler\\CompilerWhileTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\View\\Compiler\\CompilerCssTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\View\\Compiler\\CompilerForTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\View\\Compiler\\CompilerVarTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\View\\Compiler\\CompilerListTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">Class Tests\\Debug\\DebugTest was generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;">A total of 24 files generate succeed.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>修改文档菜单</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">$vim docs/.vuepress/config.js</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>运行本地文档网站</strong></p><p>访问地址 <code>localhost:8088</code> 即可。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">$npm install -g yarn</span></span>
<span class="line"><span style="color:#A6ACCD;">$yarn add -D vuepress # or npm install -D vuepress</span></span>
<span class="line"><span style="color:#A6ACCD;">$yarn run dev # or npx vuepress dev docs</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="结尾" tabindex="-1">结尾 <a class="header-anchor" href="#结尾">¶</a></h2><p>到这里为止，我们本地开发环境已经全部搭建完毕，可以愉快地开发了。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>值得注意的是，我们通常在 <code>dev</code> 分支开发，开发完毕后 <code>merge</code> 到 <code>master</code> 分支完成开发。</p></div>`,153),o=[e];function t(c,r,C,i,A,y){return n(),a("div",null,o)}const F=s(p,[["render",t]]);export{d as __pageData,F as default};
