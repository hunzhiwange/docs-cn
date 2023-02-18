import{_ as s,o as a,c as n,a as l}from"./app.42c4a044.js";const A=JSON.parse('{"title":"Tagself 保护标签","description":"","frontmatter":{},"headers":[{"level":2,"title":"基本使用","slug":"基本使用","link":"#基本使用","children":[]}],"relativePath":"docs/template/tagself.md"}'),p={name:"docs/template/tagself.md"},e=l(`<h1 id="tagself-保护标签" tabindex="-1">Tagself 保护标签 <a class="header-anchor" href="#tagself-保护标签">¶</a></h1><div class="tip custom-block"><p class="custom-block-title">Testing Is Documentation</p><p><a href="https://github.com/hunzhiwange/framework/blob/master/tests/View/Compiler/CompilerTagselfTest.php" target="_blank" rel="noreferrer">tests/View/Compiler/CompilerTagselfTest.php</a></p></div><p>可以使用 tagself 标签来防止模板标签被解析，在特殊场景非常有用。</p><h2 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用">¶</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testBaseUse</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createParser</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">source </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% tagself %}</span></span>
<span class="line"><span style="color:#C3E88D;">            {% if cond=&quot;1 == $name&quot; %} value1</span></span>
<span class="line"><span style="color:#C3E88D;">            {% elseif cond=&quot;2 == $name&quot; %} value2</span></span>
<span class="line"><span style="color:#C3E88D;">            {% else %} value3</span></span>
<span class="line"><span style="color:#C3E88D;">            {% :if %}</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :tagself %}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">        {% tagself %}</span></span>
<span class="line"><span style="color:#C3E88D;">             {{ $i + 1 }}</span></span>
<span class="line"><span style="color:#C3E88D;">             {{ $value }}</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :tagself %}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">compiled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% if cond=&quot;1 == $name&quot; %} value1</span></span>
<span class="line"><span style="color:#C3E88D;">            {% elseif cond=&quot;2 == $name&quot; %} value2</span></span>
<span class="line"><span style="color:#C3E88D;">            {% else %} value3</span></span>
<span class="line"><span style="color:#C3E88D;">            {% :if %}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">        {{ $i + 1 }}</span></span>
<span class="line"><span style="color:#C3E88D;">             {{ $value }}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">compiled</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">doCompile</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>上面的 <strong>if 标签</strong> 被 <strong>tagself</strong> 标签包含，因此 <strong>if 标签</strong> 里面的内容并不会被模板引擎解析，而是保持原样输出。</p></div>`,6),o=[e];function t(c,r,D,i,y,C){return a(),n("div",null,o)}const d=s(p,[["render",t]]);export{A as __pageData,d as default};
