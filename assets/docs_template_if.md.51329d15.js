import{_ as s,o as n,c as a,a as l}from"./app.7722c78a.js";const A=JSON.parse('{"title":"流程控制","description":"","frontmatter":{},"headers":[{"level":2,"title":"Node 语法流程控制","slug":"node-语法流程控制","link":"#node-语法流程控制","children":[]},{"level":2,"title":"cond 可省略","slug":"cond-可省略","link":"#cond-可省略","children":[]},{"level":2,"title":"Node 语法流程控制支持表达式","slug":"node-语法流程控制支持表达式","link":"#node-语法流程控制支持表达式","children":[]}],"relativePath":"docs/template/if.md"}'),p={name:"docs/template/if.md"},o=l(`<h1 id="流程控制" tabindex="-1">流程控制 <a class="header-anchor" href="#流程控制">¶</a></h1><div class="tip custom-block"><p class="custom-block-title">Testing Is Documentation</p><p><a href="https://github.com/hunzhiwange/framework/blob/master/tests/View/Compiler/CompilerIfTest.php" target="_blank" rel="noreferrer">tests/View/Compiler/CompilerIfTest.php</a></p></div><p>条件表达式是最基本流程控制语句，这个在任何地方都是相当的实用。</p><h2 id="node-语法流程控制" tabindex="-1">Node 语法流程控制 <a class="header-anchor" href="#node-语法流程控制">¶</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testNodeStyle</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createParser</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">source </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% if cond=&quot;(1 == $id) OR ($id &gt; 100)&quot; %}one</span></span>
<span class="line"><span style="color:#C3E88D;">            {% elseif cond=&quot;2 == $id&quot; %}two?</span></span>
<span class="line"><span style="color:#C3E88D;">            {% else %}other?</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :if %}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">compiled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php if ((1 == $id) OR ($id &gt; 100)): ?&gt;one</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php elseif (2 == $id): ?&gt;two?</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php else: ?&gt;other?</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">compiled</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">doCompile</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="cond-可省略" tabindex="-1">cond 可省略 <a class="header-anchor" href="#cond-可省略">¶</a></h2><p>默认第一个条件会自动解析为 cond。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testNodeSimple</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createParser</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">source </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% if &quot;(1 == $id) OR ($id &gt; 100)&quot; %}one</span></span>
<span class="line"><span style="color:#C3E88D;">            {% elseif &quot;2 == $id&quot; %}two?</span></span>
<span class="line"><span style="color:#C3E88D;">            {% else %}other?</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :if %}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">compiled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php if ((1 == $id) OR ($id &gt; 100)): ?&gt;one</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php elseif (2 == $id): ?&gt;two?</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php else: ?&gt;other?</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">compiled</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">doCompile</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="node-语法流程控制支持表达式" tabindex="-1">Node 语法流程控制支持表达式 <a class="header-anchor" href="#node-语法流程控制支持表达式">¶</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testNodeStyleSupportExpression</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createParser</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">source </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% if cond=&quot;1 == $a-&gt;name&quot; %}</span></span>
<span class="line"><span style="color:#C3E88D;">            one</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :if %}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">        {% if cond=&quot;1 == hello::run()&quot; %}</span></span>
<span class="line"><span style="color:#C3E88D;">            two</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :if %}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">compiled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php if (1 == $a-&gt;name): ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            one</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php endif; ?&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php if (1 == hello::run()): ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            two</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">compiled</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">doCompile</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,10),e=[o];function t(c,r,D,y,F,i){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{A as __pageData,d as default};
