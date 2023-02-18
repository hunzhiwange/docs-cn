import{_ as s,o as n,c as a,a as l}from"./app.7722c78a.js";const A=JSON.parse('{"title":"跳出循环","description":"","frontmatter":{},"headers":[{"level":2,"title":"break 标签","slug":"break-标签","link":"#break-标签","children":[]},{"level":2,"title":"ontinue 标签","slug":"ontinue-标签","link":"#ontinue-标签","children":[]}],"relativePath":"docs/template/break.md"}'),p={name:"docs/template/break.md"},o=l(`<h1 id="跳出循环" tabindex="-1">跳出循环 <a class="header-anchor" href="#跳出循环">¶</a></h1><div class="tip custom-block"><p class="custom-block-title">Testing Is Documentation</p><p><a href="https://github.com/hunzhiwange/framework/blob/master/tests/View/Compiler/CompilerBreakTest.php" target="_blank" rel="noreferrer">tests/View/Compiler/CompilerBreakTest.php</a></p></div><p>break 和 continue 是各种循环中非常重要的两个流程标记语言，框架当然也会支持它们。</p><h2 id="break-标签" tabindex="-1">break 标签 <a class="header-anchor" href="#break-标签">¶</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testBaseUse</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createParser</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">source </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% foreach for=list %}</span></span>
<span class="line"><span style="color:#C3E88D;">            {% if cond=&quot;$value &gt; &#39;H&#39;&quot; %}</span></span>
<span class="line"><span style="color:#C3E88D;">                {% break %}</span></span>
<span class="line"><span style="color:#C3E88D;">            {% :if %}</span></span>
<span class="line"><span style="color:#C3E88D;">            {{ $value }}</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :foreach %}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">compiled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php $index = 1; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php if (is_array($list)): foreach ($list as $key =&gt; $value): ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php if ($value &gt; &#39;H&#39;): ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;?php break; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php echo $value; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php $index++; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php endforeach; endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">compiled</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">doCompile</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="ontinue-标签" tabindex="-1">ontinue 标签 <a class="header-anchor" href="#ontinue-标签">¶</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testContinue</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createParser</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">source </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% foreach for=list %}</span></span>
<span class="line"><span style="color:#C3E88D;">            {% if cond=&quot;&#39;H&#39; === $value&quot; %}</span></span>
<span class="line"><span style="color:#C3E88D;">                {% continue %}</span></span>
<span class="line"><span style="color:#C3E88D;">            {% :if %}</span></span>
<span class="line"><span style="color:#C3E88D;">            {{ $value }}</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :foreach %}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">compiled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php $index = 1; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php if (is_array($list)): foreach ($list as $key =&gt; $value): ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php if (&#39;H&#39; === $value): ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;?php continue; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php echo $value; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php $index++; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php endforeach; endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">compiled</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">doCompile</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,7),e=[o];function t(c,r,D,y,i,C){return n(),a("div",null,e)}const h=s(p,[["render",t]]);export{A as __pageData,h as default};
