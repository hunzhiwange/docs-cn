import{_ as s,o as n,c as a,a as l}from"./app.8bdf5597.js";const A=JSON.parse('{"title":"动态查询.find.findStart.findBy.findAllBy","description":"","frontmatter":{},"headers":[{"level":2,"title":"find[0-9] 查询指定条数数据","slug":"find-0-9-查询指定条数数据","link":"#find-0-9-查询指定条数数据","children":[]},{"level":2,"title":"find[0-9]start[0-9] 查询指定开始位置指定条数数据","slug":"find-0-9-start-0-9-查询指定开始位置指定条数数据","link":"#find-0-9-start-0-9-查询指定开始位置指定条数数据","children":[]},{"level":2,"title":"findBy 字段条件查询单条数据","slug":"findby-字段条件查询单条数据","link":"#findby-字段条件查询单条数据","children":[]},{"level":2,"title":"findBy 字段条件查询单条数据，字段保持原样","slug":"findby-字段条件查询单条数据-字段保持原样","link":"#findby-字段条件查询单条数据-字段保持原样","children":[]},{"level":2,"title":"findAllBy 字段条件查询多条数据，字段保持原样","slug":"findallby-字段条件查询多条数据-字段保持原样","link":"#findallby-字段条件查询多条数据-字段保持原样","children":[]},{"level":2,"title":"findAllBy 字段条件查询多条数据，字段保持原样","slug":"findallby-字段条件查询多条数据-字段保持原样-1","link":"#findallby-字段条件查询多条数据-字段保持原样-1","children":[]}],"relativePath":"docs/database/read/finddynamics.md"}'),p={name:"docs/database/read/finddynamics.md"},o=l(`<h1 id="动态查询-find-findstart-findby-findallby" tabindex="-1">动态查询.find.findStart.findBy.findAllBy <a class="header-anchor" href="#动态查询-find-findstart-findby-findallby">¶</a></h1><div class="tip custom-block"><p class="custom-block-title">Testing Is Documentation</p><p><a href="https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/FindDynamicsTest.php" target="_blank" rel="noreferrer">tests/Database/Read/FindDynamicsTest.php</a></p></div><p><strong>Uses</strong></p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;?</span><span style="color:#A6ACCD;">php</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">use</span><span style="color:#FFCB6B;"> </span><span style="color:#A6ACCD;">Tests</span><span style="color:#89DDFF;">\\</span><span style="color:#A6ACCD;">Database</span><span style="color:#89DDFF;">\\</span><span style="color:#A6ACCD;">DatabaseTestCase</span><span style="color:#FFCB6B;"> </span><span style="color:#F78C6C;">as</span><span style="color:#FFCB6B;"> TestCase</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="find-0-9-查询指定条数数据" tabindex="-1">find[0-9] 查询指定条数数据 <a class="header-anchor" href="#find-0-9-查询指定条数数据">¶</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testBaseUse</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createDatabaseConnectMock</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        [</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;SELECT \`test_query\`.* FROM \`test_query\` LIMIT 0,10&quot;,</span></span>
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
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">table</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test_query</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">find10</span><span style="color:#89DDFF;">(),</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="find-0-9-start-0-9-查询指定开始位置指定条数数据" tabindex="-1">find[0-9]start[0-9] 查询指定开始位置指定条数数据 <a class="header-anchor" href="#find-0-9-start-0-9-查询指定开始位置指定条数数据">¶</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testFindStart</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createDatabaseConnectMock</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        [</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;SELECT \`test_query\`.* FROM \`test_query\` LIMIT 3,10&quot;,</span></span>
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
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">table</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test_query</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">find10start3</span><span style="color:#89DDFF;">(),</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="findby-字段条件查询单条数据" tabindex="-1">findBy 字段条件查询单条数据 <a class="header-anchor" href="#findby-字段条件查询单条数据">¶</a></h2><p>方法遵循驼峰法，相应的字段为下划线。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testFindByField</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createDatabaseConnectMock</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        [</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;SELECT \`test_query\`.* FROM \`test_query\` WHERE \`test_query\`.\`user_name\` = :test_query_user_name LIMIT 1&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">            {</span></span>
<span class="line"><span style="color:#C3E88D;">                &quot;test_query_user_name&quot;: [</span></span>
<span class="line"><span style="color:#C3E88D;">                    &quot;1111&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">                ]</span></span>
<span class="line"><span style="color:#C3E88D;">            },</span></span>
<span class="line"><span style="color:#C3E88D;">            false</span></span>
<span class="line"><span style="color:#C3E88D;">        ]</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">varJsonSql</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">table</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test_query</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">findByUserName</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">1111</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">2</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="findby-字段条件查询单条数据-字段保持原样" tabindex="-1">findBy 字段条件查询单条数据，字段保持原样 <a class="header-anchor" href="#findby-字段条件查询单条数据-字段保持原样">¶</a></h2><p>方法遵循驼峰法，尾巴加一个下划线 <code>_</code>，相应的字段保持原样。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testFindByFieldWithoutCamelize</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createDatabaseConnectMock</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        [</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;SELECT \`test_query\`.* FROM \`test_query\` WHERE \`test_query\`.\`UserName\` = :test_query_UserName LIMIT 1&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">            {</span></span>
<span class="line"><span style="color:#C3E88D;">                &quot;test_query_UserName&quot;: [</span></span>
<span class="line"><span style="color:#C3E88D;">                    &quot;1111&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">                ]</span></span>
<span class="line"><span style="color:#C3E88D;">            },</span></span>
<span class="line"><span style="color:#C3E88D;">            false</span></span>
<span class="line"><span style="color:#C3E88D;">        ]</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">varJsonSql</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">table</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test_query</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">findByUserName_</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">1111</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">3</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="findallby-字段条件查询多条数据-字段保持原样" tabindex="-1">findAllBy 字段条件查询多条数据，字段保持原样 <a class="header-anchor" href="#findallby-字段条件查询多条数据-字段保持原样">¶</a></h2><p>方法遵循驼峰法，相应的字段为下划线。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testTestfindAllByField</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createDatabaseConnectMock</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        [</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;SELECT \`test_query\`.* FROM \`test_query\` WHERE \`test_query\`.\`user_name\` = :test_query_user_name AND \`test_query\`.\`sex\` = :test_query_sex&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">            {</span></span>
<span class="line"><span style="color:#C3E88D;">                &quot;test_query_user_name&quot;: [</span></span>
<span class="line"><span style="color:#C3E88D;">                    &quot;1111&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">                ],</span></span>
<span class="line"><span style="color:#C3E88D;">                &quot;test_query_sex&quot;: [</span></span>
<span class="line"><span style="color:#C3E88D;">                    &quot;222&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">                ]</span></span>
<span class="line"><span style="color:#C3E88D;">            },</span></span>
<span class="line"><span style="color:#C3E88D;">            false</span></span>
<span class="line"><span style="color:#C3E88D;">        ]</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">varJsonSql</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">table</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test_query</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">findAllByUserNameAndSex</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">1111</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">222</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">4</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="findallby-字段条件查询多条数据-字段保持原样-1" tabindex="-1">findAllBy 字段条件查询多条数据，字段保持原样 <a class="header-anchor" href="#findallby-字段条件查询多条数据-字段保持原样-1">¶</a></h2><p>方法遵循驼峰法，尾巴加一个下划线 <code>_</code>，相应的字段保持原样。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testTestfindAllByFieldWithoutCamelize</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createDatabaseConnectMock</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        [</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;SELECT \`test_query\`.* FROM \`test_query\` WHERE \`test_query\`.\`UserName\` = :test_query_UserName AND \`test_query\`.\`Sex\` = :test_query_Sex&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">            {</span></span>
<span class="line"><span style="color:#C3E88D;">                &quot;test_query_UserName&quot;: [</span></span>
<span class="line"><span style="color:#C3E88D;">                    &quot;1111&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">                ],</span></span>
<span class="line"><span style="color:#C3E88D;">                &quot;test_query_Sex&quot;: [</span></span>
<span class="line"><span style="color:#C3E88D;">                    &quot;222&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">                ]</span></span>
<span class="line"><span style="color:#C3E88D;">            },</span></span>
<span class="line"><span style="color:#C3E88D;">            false</span></span>
<span class="line"><span style="color:#C3E88D;">        ]</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">sql</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">varJsonSql</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">table</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test_query</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">findAllByUserNameAndSex_</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">1111</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">222</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">connect</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">5</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,20),e=[o];function t(c,r,D,y,F,C){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{A as __pageData,d as default};
