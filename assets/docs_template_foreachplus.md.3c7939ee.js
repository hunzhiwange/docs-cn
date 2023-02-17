import{_ as s,o as n,c as a,a as l}from"./app.8bdf5597.js";const A=JSON.parse('{"title":"Foreach 增强循环","description":"","frontmatter":{},"headers":[{"level":2,"title":"普通输出","slug":"普通输出","link":"#普通输出","children":[]},{"level":2,"title":"部分输出指定开始位置和长度的记录","slug":"部分输出指定开始位置和长度的记录","link":"#部分输出指定开始位置和长度的记录","children":[]},{"level":2,"title":"部分输出指定开始位置到结尾的所有记录","slug":"部分输出指定开始位置到结尾的所有记录","link":"#部分输出指定开始位置到结尾的所有记录","children":[]},{"level":2,"title":"输出偶数记录","slug":"输出偶数记录","link":"#输出偶数记录","children":[]},{"level":2,"title":"输出奇数记录","slug":"输出奇数记录","link":"#输出奇数记录","children":[]},{"level":2,"title":"控制换行","slug":"控制换行","link":"#控制换行","children":[]},{"level":2,"title":"mod 支持变量","slug":"mod-支持变量","link":"#mod-支持变量","children":[]},{"level":2,"title":"输出循环索引","slug":"输出循环索引","link":"#输出循环索引","children":[]},{"level":2,"title":"输出数组的键值","slug":"输出数组的键值","link":"#输出数组的键值","children":[]}],"relativePath":"docs/template/foreachplus.md"}'),p={name:"docs/template/foreachplus.md"},o=l(`<h1 id="foreach-增强循环" tabindex="-1">Foreach 增强循环 <a class="header-anchor" href="#foreach-增强循环">¶</a></h1><div class="tip custom-block"><p class="custom-block-title">Testing Is Documentation</p><p><a href="https://github.com/hunzhiwange/framework/blob/master/tests/View/Compiler/CompilerForeachPlusTest.php" target="_blank" rel="noreferrer">tests/View/Compiler/CompilerForeachPlusTest.php</a></p></div><p>foreach+ 标签主要用于在模板中循环输出数据集或者多维数组。</p><h2 id="普通输出" tabindex="-1">普通输出 <a class="header-anchor" href="#普通输出">¶</a></h2><p>foreach+ 标签的 <code>name</code> 属性表示模板赋值的变量名称，因此不可随意在模板文件中改变。 <code>id</code> 表示当前的循环变量，可以随意指定，但确保不要和 name 属性冲突。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testBaseUse</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createParser</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">source </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% foreach+ name=&quot;list&quot; id=&quot;vo&quot; %}</span></span>
<span class="line"><span style="color:#C3E88D;">            {{ $vo-&gt;title }}  {{ $vo-&gt;people }}</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :foreach+ %}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">compiled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php if (is_array($list)):</span></span>
<span class="line"><span style="color:#C3E88D;">            $index = 0;</span></span>
<span class="line"><span style="color:#C3E88D;">            $tmp = $list;</span></span>
<span class="line"><span style="color:#C3E88D;">            if (0 === count($tmp)):</span></span>
<span class="line"><span style="color:#C3E88D;">                echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">            else:</span></span>
<span class="line"><span style="color:#C3E88D;">                foreach ($tmp as $key =&gt; $vo):</span></span>
<span class="line"><span style="color:#C3E88D;">                    ++$index;</span></span>
<span class="line"><span style="color:#C3E88D;">                    $mod = $index % 2; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php echo $vo-&gt;title; ?&gt;  &lt;?php echo $vo-&gt;people; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;?php endforeach;</span></span>
<span class="line"><span style="color:#C3E88D;">            endif;</span></span>
<span class="line"><span style="color:#C3E88D;">        else:</span></span>
<span class="line"><span style="color:#C3E88D;">            echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">        endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">compiled</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">doCompile</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="部分输出指定开始位置和长度的记录" tabindex="-1">部分输出指定开始位置和长度的记录 <a class="header-anchor" href="#部分输出指定开始位置和长度的记录">¶</a></h2><p>支持输出部分数据，例如输出其中的第 2～4 条记录。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testOffsetLength</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createParser</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">source </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% foreach+ name=&quot;list&quot; id=&quot;vo&quot; offset=&quot;2&quot; length=&#39;4&#39; %}</span></span>
<span class="line"><span style="color:#C3E88D;">            {{ $vo-&gt;title }} {{ $vo-&gt;people }}</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :foreach+ %}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">compiled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php if (is_array($list)):</span></span>
<span class="line"><span style="color:#C3E88D;">            $index = 0;</span></span>
<span class="line"><span style="color:#C3E88D;">            $tmp = array_slice($list, 2, 4);</span></span>
<span class="line"><span style="color:#C3E88D;">            if (0 === count($tmp)):</span></span>
<span class="line"><span style="color:#C3E88D;">                echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">            else:</span></span>
<span class="line"><span style="color:#C3E88D;">                foreach ($tmp as $key =&gt; $vo):</span></span>
<span class="line"><span style="color:#C3E88D;">                    ++$index;</span></span>
<span class="line"><span style="color:#C3E88D;">                    $mod = $index % 2; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php echo $vo-&gt;title; ?&gt; &lt;?php echo $vo-&gt;people; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;?php endforeach;</span></span>
<span class="line"><span style="color:#C3E88D;">            endif;</span></span>
<span class="line"><span style="color:#C3E88D;">        else:</span></span>
<span class="line"><span style="color:#C3E88D;">            echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">        endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">compiled</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">doCompile</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="部分输出指定开始位置到结尾的所有记录" tabindex="-1">部分输出指定开始位置到结尾的所有记录 <a class="header-anchor" href="#部分输出指定开始位置到结尾的所有记录">¶</a></h2><p>支持输出部分数据，例如输出指定开始位置到结尾的所有记录。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testOffset</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createParser</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">source </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% foreach+ name=&quot;list&quot; id=&quot;vo&quot; offset=&quot;3&quot; %}</span></span>
<span class="line"><span style="color:#C3E88D;">            {{ $vo-&gt;title }}  {{ $vo-&gt;people }}</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :foreach+ %}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">compiled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php if (is_array($list)):</span></span>
<span class="line"><span style="color:#C3E88D;">            $index = 0;</span></span>
<span class="line"><span style="color:#C3E88D;">            $tmp = array_slice($list, 3);</span></span>
<span class="line"><span style="color:#C3E88D;">            if (0 === count($tmp)):</span></span>
<span class="line"><span style="color:#C3E88D;">                echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">            else:</span></span>
<span class="line"><span style="color:#C3E88D;">                foreach ($tmp as $key =&gt; $vo):</span></span>
<span class="line"><span style="color:#C3E88D;">                    ++$index;</span></span>
<span class="line"><span style="color:#C3E88D;">                    $mod = $index % 2; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php echo $vo-&gt;title; ?&gt;  &lt;?php echo $vo-&gt;people; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;?php endforeach;</span></span>
<span class="line"><span style="color:#C3E88D;">            endif;</span></span>
<span class="line"><span style="color:#C3E88D;">        else:</span></span>
<span class="line"><span style="color:#C3E88D;">            echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">        endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">compiled</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">doCompile</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="输出偶数记录" tabindex="-1">输出偶数记录 <a class="header-anchor" href="#输出偶数记录">¶</a></h2><p>foreach+ 还支持偶数记录的输出，基于 <code>mod</code> 属性来控制。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testMod</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createParser</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">source </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% foreach+ name=&quot;list&quot; id=&quot;vo&quot; mod=&quot;2&quot; %}</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php if ($mod == 1): ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                {{ $vo-&gt;title }} {{ $vo-&gt;people }}</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :foreach+ %}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">compiled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php if (is_array($list)):</span></span>
<span class="line"><span style="color:#C3E88D;">            $index = 0;</span></span>
<span class="line"><span style="color:#C3E88D;">            $tmp = $list;</span></span>
<span class="line"><span style="color:#C3E88D;">            if (0 === count($tmp)):</span></span>
<span class="line"><span style="color:#C3E88D;">                echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">            else:</span></span>
<span class="line"><span style="color:#C3E88D;">                foreach ($tmp as $key =&gt; $vo):</span></span>
<span class="line"><span style="color:#C3E88D;">                    ++$index;</span></span>
<span class="line"><span style="color:#C3E88D;">                    $mod = $index % 2; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php if ($mod == 1): ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;?php echo $vo-&gt;title; ?&gt; &lt;?php echo $vo-&gt;people; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;?php endforeach;</span></span>
<span class="line"><span style="color:#C3E88D;">            endif;</span></span>
<span class="line"><span style="color:#C3E88D;">        else:</span></span>
<span class="line"><span style="color:#C3E88D;">            echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">        endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">compiled</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">doCompile</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>奇数记录和偶数记录规定如下，我们以数组的 0 为开始，0、2、4为偶记录，其它的都为基数记录。</p></div><h2 id="输出奇数记录" tabindex="-1">输出奇数记录 <a class="header-anchor" href="#输出奇数记录">¶</a></h2><p>foreach+ 还支持奇数记录的输出，基于 <code>mod</code> 属性来控制。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testMod2</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createParser</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">source </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% foreach+ name=&quot;list&quot; id=&quot;vo&quot; mod=&quot;2&quot; %}</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php if (0 === $mod): ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                {{ $vo-&gt;title }} {{ $vo-&gt;people }}</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :foreach+ %}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">compiled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php if (is_array($list)):</span></span>
<span class="line"><span style="color:#C3E88D;">            $index = 0;</span></span>
<span class="line"><span style="color:#C3E88D;">            $tmp = $list;</span></span>
<span class="line"><span style="color:#C3E88D;">            if (0 === count($tmp)):</span></span>
<span class="line"><span style="color:#C3E88D;">                echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">            else:</span></span>
<span class="line"><span style="color:#C3E88D;">                foreach ($tmp as $key =&gt; $vo):</span></span>
<span class="line"><span style="color:#C3E88D;">                    ++$index;</span></span>
<span class="line"><span style="color:#C3E88D;">                    $mod = $index % 2; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php if (0 === $mod): ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;?php echo $vo-&gt;title; ?&gt; &lt;?php echo $vo-&gt;people; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;?php endforeach;</span></span>
<span class="line"><span style="color:#C3E88D;">            endif;</span></span>
<span class="line"><span style="color:#C3E88D;">        else:</span></span>
<span class="line"><span style="color:#C3E88D;">            echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">        endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">compiled</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">doCompile</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>奇数记录和偶数记录规定如下，我们以数组索引的 0 为开始，0、2、4 为偶数记录，1、3、5 为基数记录。</p></div><h2 id="控制换行" tabindex="-1">控制换行 <a class="header-anchor" href="#控制换行">¶</a></h2><p>mod 属性还用于控制一定记录的换行。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testMod3</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createParser</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">source </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% foreach+ name=&quot;list&quot; id=&quot;vo&quot; mod=&quot;2&quot; %}</span></span>
<span class="line"><span style="color:#C3E88D;">            {{ $vo-&gt;title }} {{ $vo-&gt;people }}</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php if (0 === $mod): ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;br&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :foreach+ %}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">compiled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php if (is_array($list)):</span></span>
<span class="line"><span style="color:#C3E88D;">            $index = 0;</span></span>
<span class="line"><span style="color:#C3E88D;">            $tmp = $list;</span></span>
<span class="line"><span style="color:#C3E88D;">            if (0 === count($tmp)):</span></span>
<span class="line"><span style="color:#C3E88D;">                echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">            else:</span></span>
<span class="line"><span style="color:#C3E88D;">                foreach ($tmp as $key =&gt; $vo):</span></span>
<span class="line"><span style="color:#C3E88D;">                    ++$index;</span></span>
<span class="line"><span style="color:#C3E88D;">                    $mod = $index % 2; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php echo $vo-&gt;title; ?&gt; &lt;?php echo $vo-&gt;people; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php if (0 === $mod): ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;br&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;?php endforeach;</span></span>
<span class="line"><span style="color:#C3E88D;">            endif;</span></span>
<span class="line"><span style="color:#C3E88D;">        else:</span></span>
<span class="line"><span style="color:#C3E88D;">            echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">        endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">compiled</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">doCompile</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="mod-支持变量" tabindex="-1">mod 支持变量 <a class="header-anchor" href="#mod-支持变量">¶</a></h2><p>mod 属性支持变量。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testModCanBeVar</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createParser</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">source </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {{~ $mod = 4 }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">        {% foreach+ name=&quot;list&quot; id=&quot;vo&quot; mod=&quot;mod&quot; %}</span></span>
<span class="line"><span style="color:#C3E88D;">            {{ $vo-&gt;title }}  {{ $vo-&gt;people }}</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :foreach+ %}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">compiled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php $mod = 4; ?&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php if (is_array($list)):</span></span>
<span class="line"><span style="color:#C3E88D;">            $index = 0;</span></span>
<span class="line"><span style="color:#C3E88D;">            $tmp = $list;</span></span>
<span class="line"><span style="color:#C3E88D;">            if (0 === count($tmp)):</span></span>
<span class="line"><span style="color:#C3E88D;">                echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">            else:</span></span>
<span class="line"><span style="color:#C3E88D;">                foreach ($tmp as $key =&gt; $vo):</span></span>
<span class="line"><span style="color:#C3E88D;">                    ++$index;</span></span>
<span class="line"><span style="color:#C3E88D;">                    $mod = $index % $mod; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php echo $vo-&gt;title; ?&gt;  &lt;?php echo $vo-&gt;people; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;?php endforeach;</span></span>
<span class="line"><span style="color:#C3E88D;">            endif;</span></span>
<span class="line"><span style="color:#C3E88D;">        else:</span></span>
<span class="line"><span style="color:#C3E88D;">            echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">        endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">compiled</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">doCompile</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="输出循环索引" tabindex="-1">输出循环索引 <a class="header-anchor" href="#输出循环索引">¶</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testIndex</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createParser</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">source </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% foreach+ name=&quot;list&quot; id=&quot;vo&quot; index=&quot;k&quot; %}</span></span>
<span class="line"><span style="color:#C3E88D;">            {{ $k }} {{ $vo-&gt;people }}</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :foreach+ %}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">compiled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php if (is_array($list)):</span></span>
<span class="line"><span style="color:#C3E88D;">            $k = 0;</span></span>
<span class="line"><span style="color:#C3E88D;">            $tmp = $list;</span></span>
<span class="line"><span style="color:#C3E88D;">            if (0 === count($tmp)):</span></span>
<span class="line"><span style="color:#C3E88D;">                echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">            else:</span></span>
<span class="line"><span style="color:#C3E88D;">                foreach ($tmp as $key =&gt; $vo):</span></span>
<span class="line"><span style="color:#C3E88D;">                    ++$k;</span></span>
<span class="line"><span style="color:#C3E88D;">                    $mod = $k % 2; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;?php echo $k; ?&gt; &lt;?php echo $vo-&gt;people; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;?php endforeach;</span></span>
<span class="line"><span style="color:#C3E88D;">            endif;</span></span>
<span class="line"><span style="color:#C3E88D;">        else:</span></span>
<span class="line"><span style="color:#C3E88D;">            echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">        endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">compiled</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">doCompile</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="输出数组的键值" tabindex="-1">输出数组的键值 <a class="header-anchor" href="#输出数组的键值">¶</a></h2><p>如果要输出数组的键值，可以直接使用 <code>key</code> 变量，和循环变量不同的是，这个 <code>key</code> 是由数据本身决定，而不是循环控制的，这个 <code>key</code> 可以通过 <code>key</code> 属性指定。</p><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testKey</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$this-&gt;</span><span style="color:#82AAFF;">createParser</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">source </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        {% foreach+ name=&quot;list&quot; id=&quot;vo&quot; %}</span></span>
<span class="line"><span style="color:#C3E88D;">            key: {{ $key }}</span></span>
<span class="line"><span style="color:#C3E88D;">        {% :foreach+ %}</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">compiled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;&lt;</span><span style="color:#C3E88D;">&#39;</span><span style="color:#89DDFF;">eot</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;?php if (is_array($list)):</span></span>
<span class="line"><span style="color:#C3E88D;">            $index = 0;</span></span>
<span class="line"><span style="color:#C3E88D;">            $tmp = $list;</span></span>
<span class="line"><span style="color:#C3E88D;">            if (0 === count($tmp)):</span></span>
<span class="line"><span style="color:#C3E88D;">                echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">            else:</span></span>
<span class="line"><span style="color:#C3E88D;">                foreach ($tmp as $key =&gt; $vo):</span></span>
<span class="line"><span style="color:#C3E88D;">                    ++$index;</span></span>
<span class="line"><span style="color:#C3E88D;">                    $mod = $index % 2; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            key: &lt;?php echo $key; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;?php endforeach;</span></span>
<span class="line"><span style="color:#C3E88D;">            endif;</span></span>
<span class="line"><span style="color:#C3E88D;">        else:</span></span>
<span class="line"><span style="color:#C3E88D;">            echo &quot;&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">        endif; ?&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#89DDFF;">eot</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">static</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">assertSame</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">compiled</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">parser</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">doCompile</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true));</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,31),e=[o];function t(c,r,D,y,C,i){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{A as __pageData,d as default};
