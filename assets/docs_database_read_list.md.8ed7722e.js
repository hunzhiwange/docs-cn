import{_ as s,o as n,c as a,a as l}from"./app.8bdf5597.js";const i=JSON.parse('{"title":"查询一列数据.list","description":"","frontmatter":{},"headers":[{"level":2,"title":"list 查询基础用法","slug":"list-查询基础用法","link":"#list-查询基础用法","children":[]},{"level":2,"title":"list 查询字段逗号分隔","slug":"list-查询字段逗号分隔","link":"#list-查询字段逗号分隔","children":[]},{"level":2,"title":"list 查询字段多个字符串","slug":"list-查询字段多个字符串","link":"#list-查询字段多个字符串","children":[]},{"level":2,"title":"list 查询字段数组","slug":"list-查询字段数组","link":"#list-查询字段数组","children":[]},{"level":2,"title":"list 查询字段数组和字符串混合","slug":"list-查询字段数组和字符串混合","link":"#list-查询字段数组和字符串混合","children":[]}],"relativePath":"docs/database/read/list.md"}'),p={name:"docs/database/read/list.md"},o=l(`<h1 id="查询一列数据-list" tabindex="-1">查询一列数据.list <a class="header-anchor" href="#查询一列数据-list">¶</a></h1><div class="tip custom-block"><p class="custom-block-title">Testing Is Documentation</p><p><a href="https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/ListTest.php" target="_blank" rel="noreferrer">tests/Database/Read/ListTest.php</a></p></div><p><strong>Uses</strong></p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;?</span><span style="color:#A6ACCD;">php</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">use</span><span style="color:#FFCB6B;"> </span><span style="color:#A6ACCD;">Tests</span><span style="color:#89DDFF;">\\</span><span style="color:#A6ACCD;">Database</span><span style="color:#89DDFF;">\\</span><span style="color:#A6ACCD;">DatabaseTestCase</span><span style="color:#FFCB6B;"> </span><span style="color:#F78C6C;">as</span><span style="color:#FFCB6B;"> TestCase</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="list-查询基础用法" tabindex="-1">list 查询基础用法 <a class="header-anchor" href="#list-查询基础用法">¶</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testBaseUse</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createDatabaseConnectMock</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        [</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;SELECT \`test\`.\`name\` FROM \`test\`&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">            [],</span></span>
<span class="line"><span style="color:#C3E88D;">            false</span></span>
<span class="line"><span style="color:#C3E88D;">        ]</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">varJsonSql</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">table</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">list</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="list-查询字段逗号分隔" tabindex="-1">list 查询字段逗号分隔 <a class="header-anchor" href="#list-查询字段逗号分隔">¶</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testStringByCommaSeparation</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createDatabaseConnectMock</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        [</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;SELECT \`test\`.\`name\`,\`test\`.\`id\` FROM \`test\`&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">            [],</span></span>
<span class="line"><span style="color:#C3E88D;">            false</span></span>
<span class="line"><span style="color:#C3E88D;">        ]</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">varJsonSql</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">table</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">list</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name,id</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="list-查询字段多个字符串" tabindex="-1">list 查询字段多个字符串 <a class="header-anchor" href="#list-查询字段多个字符串">¶</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testMoreString</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createDatabaseConnectMock</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        [</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;SELECT \`test\`.\`name\`,\`test\`.\`id\` FROM \`test\`&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">            [],</span></span>
<span class="line"><span style="color:#C3E88D;">            false</span></span>
<span class="line"><span style="color:#C3E88D;">        ]</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">varJsonSql</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">table</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">list</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">2</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="list-查询字段数组" tabindex="-1">list 查询字段数组 <a class="header-anchor" href="#list-查询字段数组">¶</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testArray</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createDatabaseConnectMock</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        [</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;SELECT \`test\`.\`name\`,\`test\`.\`id\` FROM \`test\`&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">            [],</span></span>
<span class="line"><span style="color:#C3E88D;">            false</span></span>
<span class="line"><span style="color:#C3E88D;">        ]</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">varJsonSql</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">table</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">list</span><span style="color:#89DDFF;">([</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">]),</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">3</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="list-查询字段数组和字符串混合" tabindex="-1">list 查询字段数组和字符串混合 <a class="header-anchor" href="#list-查询字段数组和字符串混合">¶</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testArrayAndString</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createDatabaseConnectMock</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        [</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;SELECT \`test\`.\`name\`,\`test\`.\`id\` FROM \`test\`&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">            [],</span></span>
<span class="line"><span style="color:#C3E88D;">            false</span></span>
<span class="line"><span style="color:#C3E88D;">        ]</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">varJsonSql</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">table</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">list</span><span style="color:#89DDFF;">([</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">],</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">4</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,14),e=[o];function t(c,D,r,F,y,C){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{i as __pageData,d as default};
