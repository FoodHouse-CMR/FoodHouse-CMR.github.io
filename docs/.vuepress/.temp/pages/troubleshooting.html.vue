<template><div><h1 id="troubleshooting-guide" tabindex="-1"><a class="header-anchor" href="#troubleshooting-guide"><span>Troubleshooting Guide</span></a></h1>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p>This guide provides comprehensive information about troubleshooting common issues in the FoodHouse application. It covers debugging techniques, error handling, and problem resolution strategies.</p>
<h2 id="common-issues" tabindex="-1"><a class="header-anchor" href="#common-issues"><span>Common Issues</span></a></h2>
<h3 id="application-issues" tabindex="-1"><a class="header-anchor" href="#application-issues"><span>Application Issues</span></a></h3>
<ol>
<li>
<p><strong>Application Not Starting</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check application logs</span></span>
<span class="line">kubectl logs deployment/foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check application status</span></span>
<span class="line">kubectl get pods <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check application events</span></span>
<span class="line">kubectl describe pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>foodhouse</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>High CPU Usage</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check CPU usage</span></span>
<span class="line">kubectl <span class="token function">top</span> pods <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check CPU limits</span></span>
<span class="line">kubectl describe pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>foodhouse <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-A</span> <span class="token number">5</span> <span class="token string">"Resources:"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check CPU metrics</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-s</span> localhost:9090/metrics <span class="token operator">|</span> <span class="token function">grep</span> cpu</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>High Memory Usage</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check memory usage</span></span>
<span class="line">kubectl <span class="token function">top</span> pods <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check memory limits</span></span>
<span class="line">kubectl describe pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>foodhouse <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-A</span> <span class="token number">5</span> <span class="token string">"Resources:"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check memory metrics</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-s</span> localhost:9090/metrics <span class="token operator">|</span> <span class="token function">grep</span> memory</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="database-issues" tabindex="-1"><a class="header-anchor" href="#database-issues"><span>Database Issues</span></a></h3>
<ol>
<li>
<p><strong>Database Connection Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check database connection</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>foodhouse <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.items[0].metadata.name}"</span><span class="token variable">)</span></span> -- <span class="token function">nc</span> <span class="token parameter variable">-zv</span> postgres <span class="token number">5432</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check database logs</span></span>
<span class="line">kubectl logs <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>postgres</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check database status</span></span>
<span class="line">kubectl get pods <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>postgres</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Slow Queries</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token comment">-- Check slow queries</span></span>
<span class="line"><span class="token keyword">SELECT</span> query<span class="token punctuation">,</span> calls<span class="token punctuation">,</span> total_time<span class="token punctuation">,</span> mean_time</span>
<span class="line"><span class="token keyword">FROM</span> pg_stat_statements</span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> mean_time <span class="token keyword">DESC</span></span>
<span class="line"><span class="token keyword">LIMIT</span> <span class="token number">10</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- Check table statistics</span></span>
<span class="line"><span class="token keyword">SELECT</span> schemaname<span class="token punctuation">,</span> relname<span class="token punctuation">,</span> seq_scan<span class="token punctuation">,</span> seq_tup_read<span class="token punctuation">,</span> idx_scan<span class="token punctuation">,</span> idx_tup_fetch</span>
<span class="line"><span class="token keyword">FROM</span> pg_stat_user_tables</span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> seq_scan <span class="token keyword">DESC</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Database Space Issues</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token comment">-- Check database size</span></span>
<span class="line"><span class="token keyword">SELECT</span> pg_size_pretty<span class="token punctuation">(</span>pg_database_size<span class="token punctuation">(</span><span class="token string">'foodhouse'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- Check table sizes</span></span>
<span class="line"><span class="token keyword">SELECT</span> relname<span class="token punctuation">,</span> pg_size_pretty<span class="token punctuation">(</span>pg_total_relation_size<span class="token punctuation">(</span>relid<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">FROM</span> pg_catalog<span class="token punctuation">.</span>pg_statio_user_tables</span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> pg_total_relation_size<span class="token punctuation">(</span>relid<span class="token punctuation">)</span> <span class="token keyword">DESC</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="cache-issues" tabindex="-1"><a class="header-anchor" href="#cache-issues"><span>Cache Issues</span></a></h3>
<ol>
<li>
<p><strong>Redis Connection Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check Redis connection</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>foodhouse <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.items[0].metadata.name}"</span><span class="token variable">)</span></span> -- <span class="token function">nc</span> <span class="token parameter variable">-zv</span> redis <span class="token number">6379</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check Redis logs</span></span>
<span class="line">kubectl logs <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>redis</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check Redis status</span></span>
<span class="line">kubectl get pods <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>redis</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Cache Performance Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check Redis memory usage</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>redis <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.items[0].metadata.name}"</span><span class="token variable">)</span></span> -- redis-cli info memory</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check Redis keys</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>redis <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.items[0].metadata.name}"</span><span class="token variable">)</span></span> -- redis-cli keys <span class="token string">"*"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check Redis slow log</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>redis <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.items[0].metadata.name}"</span><span class="token variable">)</span></span> -- redis-cli slowlog get <span class="token number">10</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Cache Eviction Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check Redis eviction policy</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>redis <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.items[0].metadata.name}"</span><span class="token variable">)</span></span> -- redis-cli config get maxmemory-policy</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check Redis eviction stats</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>redis <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.items[0].metadata.name}"</span><span class="token variable">)</span></span> -- redis-cli info stats <span class="token operator">|</span> <span class="token function">grep</span> evicted</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="message-queue-issues" tabindex="-1"><a class="header-anchor" href="#message-queue-issues"><span>Message Queue Issues</span></a></h3>
<ol>
<li>
<p><strong>RabbitMQ Connection Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check RabbitMQ connection</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>foodhouse <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.items[0].metadata.name}"</span><span class="token variable">)</span></span> -- <span class="token function">nc</span> <span class="token parameter variable">-zv</span> rabbitmq <span class="token number">5672</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check RabbitMQ logs</span></span>
<span class="line">kubectl logs <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>rabbitmq</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check RabbitMQ status</span></span>
<span class="line">kubectl get pods <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>rabbitmq</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Queue Performance Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check RabbitMQ queue status</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>rabbitmq <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.items[0].metadata.name}"</span><span class="token variable">)</span></span> -- rabbitmqctl list_queues</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check RabbitMQ message rates</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>rabbitmq <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.items[0].metadata.name}"</span><span class="token variable">)</span></span> -- rabbitmqctl list_queues name messages_ready messages_unacknowledged</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check RabbitMQ node status</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>rabbitmq <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.items[0].metadata.name}"</span><span class="token variable">)</span></span> -- rabbitmqctl cluster_status</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Message Processing Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check dead letter queue</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>rabbitmq <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.items[0].metadata.name}"</span><span class="token variable">)</span></span> -- rabbitmqctl list_queues name messages_ready messages_unacknowledged <span class="token operator">|</span> <span class="token function">grep</span> dead-letter</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check message rates</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>rabbitmq <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.items[0].metadata.name}"</span><span class="token variable">)</span></span> -- rabbitmqctl list_queues name message_stats.publish_details.rate message_stats.deliver_details.rate</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="debugging-techniques" tabindex="-1"><a class="header-anchor" href="#debugging-techniques"><span>Debugging Techniques</span></a></h2>
<h3 id="logging" tabindex="-1"><a class="header-anchor" href="#logging"><span>Logging</span></a></h3>
<ol>
<li>
<p><strong>Application Logs</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Configure logging</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">configureLogging</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    log<span class="token punctuation">.</span><span class="token function">SetFormatter</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>log<span class="token punctuation">.</span>JSONFormatter<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    log<span class="token punctuation">.</span><span class="token function">SetOutput</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">)</span></span>
<span class="line">    log<span class="token punctuation">.</span><span class="token function">SetLevel</span><span class="token punctuation">(</span>log<span class="token punctuation">.</span>InfoLevel<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Log with context</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">logWithContext</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> level log<span class="token punctuation">.</span>Level<span class="token punctuation">,</span> msg <span class="token builtin">string</span><span class="token punctuation">,</span> fields log<span class="token punctuation">.</span>Fields<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    logger <span class="token operator">:=</span> log<span class="token punctuation">.</span><span class="token function">WithFields</span><span class="token punctuation">(</span>fields<span class="token punctuation">)</span></span>
<span class="line">    logger<span class="token punctuation">.</span><span class="token function">WithField</span><span class="token punctuation">(</span><span class="token string">"request_id"</span><span class="token punctuation">,</span> ctx<span class="token punctuation">.</span><span class="token function">Value</span><span class="token punctuation">(</span><span class="token string">"request_id"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span>level<span class="token punctuation">,</span> msg<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Structured Logging</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Structured logging</span></span>
<span class="line"><span class="token keyword">type</span> LogEntry <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    Timestamp   time<span class="token punctuation">.</span>Time     <span class="token string">`json:"timestamp"`</span></span>
<span class="line">    Level       <span class="token builtin">string</span>        <span class="token string">`json:"level"`</span></span>
<span class="line">    Message     <span class="token builtin">string</span>        <span class="token string">`json:"message"`</span></span>
<span class="line">    RequestID   <span class="token builtin">string</span>        <span class="token string">`json:"request_id"`</span></span>
<span class="line">    UserID      <span class="token builtin">string</span>        <span class="token string">`json:"user_id"`</span></span>
<span class="line">    Service     <span class="token builtin">string</span>        <span class="token string">`json:"service"`</span></span>
<span class="line">    Environment <span class="token builtin">string</span>        <span class="token string">`json:"environment"`</span></span>
<span class="line">    Fields      log<span class="token punctuation">.</span>Fields    <span class="token string">`json:"fields"`</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Log entry</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">logEntry</span><span class="token punctuation">(</span>entry LogEntry<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    data<span class="token punctuation">,</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>entry<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">"Failed to marshal log entry:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="tracing" tabindex="-1"><a class="header-anchor" href="#tracing"><span>Tracing</span></a></h3>
<ol>
<li>
<p><strong>Distributed Tracing</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Configure tracing</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">configureTracing</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    tracer<span class="token punctuation">,</span> err <span class="token operator">:=</span> jaeger<span class="token punctuation">.</span><span class="token function">NewTracer</span><span class="token punctuation">(</span></span>
<span class="line">        <span class="token string">"foodhouse"</span><span class="token punctuation">,</span></span>
<span class="line">        jaeger<span class="token punctuation">.</span><span class="token function">NewConstSampler</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">        jaeger<span class="token punctuation">.</span><span class="token function">NewNullReporter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"Failed to create tracer:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    opentracing<span class="token punctuation">.</span><span class="token function">SetGlobalTracer</span><span class="token punctuation">(</span>tracer<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Start span</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">startSpan</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> operationName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>opentracing<span class="token punctuation">.</span>Span<span class="token punctuation">,</span> context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    span<span class="token punctuation">,</span> ctx <span class="token operator">:=</span> opentracing<span class="token punctuation">.</span><span class="token function">StartSpanFromContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> operationName<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> span<span class="token punctuation">,</span> ctx</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Trace Propagation</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Extract trace context</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">extractTraceContext</span><span class="token punctuation">(</span>r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">(</span>opentracing<span class="token punctuation">.</span>SpanContext<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> opentracing<span class="token punctuation">.</span><span class="token function">GlobalTracer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Extract</span><span class="token punctuation">(</span></span>
<span class="line">        opentracing<span class="token punctuation">.</span>HTTPHeaders<span class="token punctuation">,</span></span>
<span class="line">        opentracing<span class="token punctuation">.</span><span class="token function">HTTPHeadersCarrier</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>Header<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Inject trace context</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">injectTraceContext</span><span class="token punctuation">(</span>span opentracing<span class="token punctuation">.</span>Span<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> opentracing<span class="token punctuation">.</span><span class="token function">GlobalTracer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Inject</span><span class="token punctuation">(</span></span>
<span class="line">        span<span class="token punctuation">.</span><span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">        opentracing<span class="token punctuation">.</span>HTTPHeaders<span class="token punctuation">,</span></span>
<span class="line">        opentracing<span class="token punctuation">.</span><span class="token function">HTTPHeadersCarrier</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>Header<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="metrics" tabindex="-1"><a class="header-anchor" href="#metrics"><span>Metrics</span></a></h3>
<ol>
<li>
<p><strong>Application Metrics</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Configure metrics</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">configureMetrics</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    http<span class="token punctuation">.</span><span class="token function">Handle</span><span class="token punctuation">(</span><span class="token string">"/metrics"</span><span class="token punctuation">,</span> promhttp<span class="token punctuation">.</span><span class="token function">Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">go</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">":9090"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Record metrics</span></span>
<span class="line"><span class="token keyword">var</span> <span class="token punctuation">(</span></span>
<span class="line">    httpRequestsTotal <span class="token operator">=</span> prometheus<span class="token punctuation">.</span><span class="token function">NewCounterVec</span><span class="token punctuation">(</span></span>
<span class="line">        prometheus<span class="token punctuation">.</span>CounterOpts<span class="token punctuation">{</span></span>
<span class="line">            Name<span class="token punctuation">:</span> <span class="token string">"http_requests_total"</span><span class="token punctuation">,</span></span>
<span class="line">            Help<span class="token punctuation">:</span> <span class="token string">"Total number of HTTP requests"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"method"</span><span class="token punctuation">,</span> <span class="token string">"endpoint"</span><span class="token punctuation">,</span> <span class="token string">"status"</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line">    httpRequestDuration <span class="token operator">=</span> prometheus<span class="token punctuation">.</span><span class="token function">NewHistogramVec</span><span class="token punctuation">(</span></span>
<span class="line">        prometheus<span class="token punctuation">.</span>HistogramOpts<span class="token punctuation">{</span></span>
<span class="line">            Name<span class="token punctuation">:</span> <span class="token string">"http_request_duration_seconds"</span><span class="token punctuation">,</span></span>
<span class="line">            Help<span class="token punctuation">:</span> <span class="token string">"HTTP request duration in seconds"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"method"</span><span class="token punctuation">,</span> <span class="token string">"endpoint"</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Custom Metrics</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Custom metrics</span></span>
<span class="line"><span class="token keyword">var</span> <span class="token punctuation">(</span></span>
<span class="line">    orderProcessingTime <span class="token operator">=</span> prometheus<span class="token punctuation">.</span><span class="token function">NewHistogram</span><span class="token punctuation">(</span></span>
<span class="line">        prometheus<span class="token punctuation">.</span>HistogramOpts<span class="token punctuation">{</span></span>
<span class="line">            Name<span class="token punctuation">:</span> <span class="token string">"order_processing_time_seconds"</span><span class="token punctuation">,</span></span>
<span class="line">            Help<span class="token punctuation">:</span> <span class="token string">"Time taken to process an order"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line">    paymentProcessingTime <span class="token operator">=</span> prometheus<span class="token punctuation">.</span><span class="token function">NewHistogram</span><span class="token punctuation">(</span></span>
<span class="line">        prometheus<span class="token punctuation">.</span>HistogramOpts<span class="token punctuation">{</span></span>
<span class="line">            Name<span class="token punctuation">:</span> <span class="token string">"payment_processing_time_seconds"</span><span class="token punctuation">,</span></span>
<span class="line">            Help<span class="token punctuation">:</span> <span class="token string">"Time taken to process a payment"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="error-handling" tabindex="-1"><a class="header-anchor" href="#error-handling"><span>Error Handling</span></a></h2>
<h3 id="error-types" tabindex="-1"><a class="header-anchor" href="#error-types"><span>Error Types</span></a></h3>
<ol>
<li>
<p><strong>Application Errors</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Application error</span></span>
<span class="line"><span class="token keyword">type</span> AppError <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    Code    <span class="token builtin">string</span></span>
<span class="line">    Message <span class="token builtin">string</span></span>
<span class="line">    Err     <span class="token builtin">error</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>AppError<span class="token punctuation">)</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%s: %s"</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>Code<span class="token punctuation">,</span> e<span class="token punctuation">.</span>Message<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Error codes</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token punctuation">(</span></span>
<span class="line">    ErrInvalidInput     <span class="token operator">=</span> <span class="token string">"INVALID_INPUT"</span></span>
<span class="line">    ErrNotFound         <span class="token operator">=</span> <span class="token string">"NOT_FOUND"</span></span>
<span class="line">    ErrUnauthorized     <span class="token operator">=</span> <span class="token string">"UNAUTHORIZED"</span></span>
<span class="line">    ErrInternal         <span class="token operator">=</span> <span class="token string">"INTERNAL_ERROR"</span></span>
<span class="line">    ErrServiceUnavailable <span class="token operator">=</span> <span class="token string">"SERVICE_UNAVAILABLE"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Validation Errors</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Validation error</span></span>
<span class="line"><span class="token keyword">type</span> ValidationError <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    Field   <span class="token builtin">string</span></span>
<span class="line">    Message <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>ValidationError<span class="token punctuation">)</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%s: %s"</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>Field<span class="token punctuation">,</span> e<span class="token punctuation">.</span>Message<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Validate input</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">validateInput</span><span class="token punctuation">(</span>input <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    validate <span class="token operator">:=</span> validator<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> validate<span class="token punctuation">.</span><span class="token function">Struct</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token operator">&amp;</span>ValidationError<span class="token punctuation">{</span></span>
<span class="line">            Field<span class="token punctuation">:</span>   err<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">            Message<span class="token punctuation">:</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="error-recovery" tabindex="-1"><a class="header-anchor" href="#error-recovery"><span>Error Recovery</span></a></h3>
<ol>
<li>
<p><strong>Panic Recovery</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Recover from panic</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">recoverFromPanic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> r <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> r <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Recovered from panic: %v"</span><span class="token punctuation">,</span> r<span class="token punctuation">)</span></span>
<span class="line">        debug<span class="token punctuation">.</span><span class="token function">PrintStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Middleware</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">panicRecoveryMiddleware</span><span class="token punctuation">(</span>next http<span class="token punctuation">.</span>Handler<span class="token punctuation">)</span> http<span class="token punctuation">.</span>Handler <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">HandlerFunc</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">defer</span> <span class="token function">recoverFromPanic</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        next<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Error Handling Middleware</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Error handling middleware</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">errorHandlingMiddleware</span><span class="token punctuation">(</span>next http<span class="token punctuation">.</span>Handler<span class="token punctuation">)</span> http<span class="token punctuation">.</span>Handler <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">HandlerFunc</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">handleError</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        next<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Handle error</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">handleError</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">,</span> err <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> status <span class="token builtin">int</span></span>
<span class="line">    <span class="token keyword">var</span> message <span class="token builtin">string</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">switch</span> e <span class="token operator">:=</span> err<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token operator">*</span>AppError<span class="token punctuation">:</span></span>
<span class="line">        status <span class="token operator">=</span> <span class="token function">getStatusCode</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Code<span class="token punctuation">)</span></span>
<span class="line">        message <span class="token operator">=</span> e<span class="token punctuation">.</span>Message</span>
<span class="line">    <span class="token keyword">case</span> <span class="token operator">*</span>ValidationError<span class="token punctuation">:</span></span>
<span class="line">        status <span class="token operator">=</span> http<span class="token punctuation">.</span>StatusBadRequest</span>
<span class="line">        message <span class="token operator">=</span> e<span class="token punctuation">.</span>Message</span>
<span class="line">    <span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">        status <span class="token operator">=</span> http<span class="token punctuation">.</span>StatusInternalServerError</span>
<span class="line">        message <span class="token operator">=</span> <span class="token string">"Internal server error"</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span></span>
<span class="line">    json<span class="token punctuation">.</span><span class="token function">NewEncoder</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token string">"error"</span><span class="token punctuation">:</span> message<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="problem-resolution" tabindex="-1"><a class="header-anchor" href="#problem-resolution"><span>Problem Resolution</span></a></h2>
<h3 id="performance-issues" tabindex="-1"><a class="header-anchor" href="#performance-issues"><span>Performance Issues</span></a></h3>
<ol>
<li>
<p><strong>CPU Profiling</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// CPU profiling</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">startCPUProfile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token string">"cpu.prof"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"Could not create CPU profile:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> pprof<span class="token punctuation">.</span><span class="token function">StartCPUProfile</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"Could not start CPU profile:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">stopCPUProfile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    pprof<span class="token punctuation">.</span><span class="token function">StopCPUProfile</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Memory Profiling</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Memory profiling</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">writeMemoryProfile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token string">"mem.prof"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"Could not create memory profile:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> pprof<span class="token punctuation">.</span><span class="token function">WriteHeapProfile</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"Could not write memory profile:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="database-issues-1" tabindex="-1"><a class="header-anchor" href="#database-issues-1"><span>Database Issues</span></a></h3>
<ol>
<li>
<p><strong>Query Optimization</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token comment">-- Analyze query</span></span>
<span class="line"><span class="token keyword">EXPLAIN</span> <span class="token keyword">ANALYZE</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> orders <span class="token keyword">WHERE</span> user_id <span class="token operator">=</span> $<span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- Create index</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_orders_user_id <span class="token keyword">ON</span> orders<span class="token punctuation">(</span>user_id<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- Vacuum analyze</span></span>
<span class="line">VACUUM <span class="token keyword">ANALYZE</span> orders<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Connection Pooling</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Configure connection pool</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">configureDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>sql<span class="token punctuation">.</span>DB <span class="token punctuation">{</span></span>
<span class="line">    db<span class="token punctuation">,</span> err <span class="token operator">:=</span> sql<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"postgres"</span><span class="token punctuation">,</span> <span class="token string">"postgres://user:pass@localhost:5432/foodhouse?sslmode=disable"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    db<span class="token punctuation">.</span><span class="token function">SetMaxOpenConns</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span></span>
<span class="line">    db<span class="token punctuation">.</span><span class="token function">SetMaxIdleConns</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span></span>
<span class="line">    db<span class="token punctuation">.</span><span class="token function">SetConnMaxLifetime</span><span class="token punctuation">(</span><span class="token number">5</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Minute<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> db</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="cache-issues-1" tabindex="-1"><a class="header-anchor" href="#cache-issues-1"><span>Cache Issues</span></a></h3>
<ol>
<li>
<p><strong>Cache Optimization</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Cache optimization</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">optimizeCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Set appropriate TTL</span></span>
<span class="line">    cache<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"key"</span><span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token number">5</span><span class="token operator">*</span>time<span class="token punctuation">.</span>Minute<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Use pipeline for multiple operations</span></span>
<span class="line">    pipe <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">Pipeline</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    pipe<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"key1"</span><span class="token punctuation">,</span> value1<span class="token punctuation">,</span> <span class="token number">5</span><span class="token operator">*</span>time<span class="token punctuation">.</span>Minute<span class="token punctuation">)</span></span>
<span class="line">    pipe<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"key2"</span><span class="token punctuation">,</span> value2<span class="token punctuation">,</span> <span class="token number">5</span><span class="token operator">*</span>time<span class="token punctuation">.</span>Minute<span class="token punctuation">)</span></span>
<span class="line">    pipe<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Cache Invalidation</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Cache invalidation</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">invalidateCache</span><span class="token punctuation">(</span>pattern <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    keys<span class="token punctuation">,</span> err <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">Keys</span><span class="token punctuation">(</span>pattern<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Result</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>keys<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> cache<span class="token punctuation">.</span><span class="token function">Del</span><span class="token punctuation">(</span>keys<span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Result</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> err</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="monitoring-and-alerts" tabindex="-1"><a class="header-anchor" href="#monitoring-and-alerts"><span>Monitoring and Alerts</span></a></h2>
<h3 id="health-checks" tabindex="-1"><a class="header-anchor" href="#health-checks"><span>Health Checks</span></a></h3>
<ol>
<li>
<p><strong>Application Health</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Health check</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">healthCheck</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    health <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token string">"status"</span><span class="token punctuation">:</span> <span class="token string">"healthy"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"time"</span><span class="token punctuation">:</span>   time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">checkDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        health<span class="token punctuation">[</span><span class="token string">"status"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"unhealthy"</span></span>
<span class="line">        health<span class="token punctuation">[</span><span class="token string">"error"</span><span class="token punctuation">]</span> <span class="token operator">=</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">,</span> <span class="token string">"application/json"</span><span class="token punctuation">)</span></span>
<span class="line">    json<span class="token punctuation">.</span><span class="token function">NewEncoder</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span>health<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Service Health</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Service health check</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">serviceHealthCheck</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Check database</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">checkDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Check cache</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">checkCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Check message queue</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">checkQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="alerts" tabindex="-1"><a class="header-anchor" href="#alerts"><span>Alerts</span></a></h3>
<ol>
<li>
<p><strong>Alert Configuration</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># Alert configuration</span></span>
<span class="line"><span class="token key atrule">groups</span><span class="token punctuation">:</span></span>
<span class="line"><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line">  <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">alert</span><span class="token punctuation">:</span> HighErrorRate</span>
<span class="line">    <span class="token key atrule">expr</span><span class="token punctuation">:</span> rate(http_errors_total<span class="token punctuation">[</span>5m<span class="token punctuation">]</span>) <span class="token punctuation">></span> 0.1</span>
<span class="line">    <span class="token key atrule">for</span><span class="token punctuation">:</span> 5m</span>
<span class="line">    <span class="token key atrule">labels</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">severity</span><span class="token punctuation">:</span> critical</span>
<span class="line">    <span class="token key atrule">annotations</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">summary</span><span class="token punctuation">:</span> High error rate detected</span>
<span class="line">      <span class="token key atrule">description</span><span class="token punctuation">:</span> Error rate is above 10% for 5 minutes</span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">alert</span><span class="token punctuation">:</span> HighLatency</span>
<span class="line">    <span class="token key atrule">expr</span><span class="token punctuation">:</span> http_request_duration_seconds <span class="token punctuation">></span> 1</span>
<span class="line">    <span class="token key atrule">for</span><span class="token punctuation">:</span> 5m</span>
<span class="line">    <span class="token key atrule">labels</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">severity</span><span class="token punctuation">:</span> warning</span>
<span class="line">    <span class="token key atrule">annotations</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">summary</span><span class="token punctuation">:</span> High latency detected</span>
<span class="line">      <span class="token key atrule">description</span><span class="token punctuation">:</span> Request latency is above 1 second for 5 minutes</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Alert Notifications</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># Alert notifications</span></span>
<span class="line"><span class="token key atrule">receivers</span><span class="token punctuation">:</span></span>
<span class="line"><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">'team-foodhouse'</span></span>
<span class="line">  <span class="token key atrule">email_configs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">to</span><span class="token punctuation">:</span> <span class="token string">'team@foodhouse.com'</span></span>
<span class="line">    <span class="token key atrule">from</span><span class="token punctuation">:</span> <span class="token string">'alerts@foodhouse.com'</span></span>
<span class="line">    <span class="token key atrule">smarthost</span><span class="token punctuation">:</span> <span class="token string">'smtp.foodhouse.com:587'</span></span>
<span class="line">    <span class="token key atrule">auth_username</span><span class="token punctuation">:</span> <span class="token string">'alerts'</span></span>
<span class="line">    <span class="token key atrule">auth_password</span><span class="token punctuation">:</span> <span class="token string">'secret'</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">route</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">group_by</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'alertname'</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">group_wait</span><span class="token punctuation">:</span> 30s</span>
<span class="line">  <span class="token key atrule">group_interval</span><span class="token punctuation">:</span> 5m</span>
<span class="line">  <span class="token key atrule">repeat_interval</span><span class="token punctuation">:</span> 4h</span>
<span class="line">  <span class="token key atrule">receiver</span><span class="token punctuation">:</span> <span class="token string">'team-foodhouse'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="best-practices" tabindex="-1"><a class="header-anchor" href="#best-practices"><span>Best Practices</span></a></h2>
<h3 id="debugging" tabindex="-1"><a class="header-anchor" href="#debugging"><span>Debugging</span></a></h3>
<ol>
<li>
<p><strong>Logging Best Practices</strong></p>
<ul>
<li>Use structured logging</li>
<li>Include context in logs</li>
<li>Set appropriate log levels</li>
<li>Rotate log files</li>
</ul>
</li>
<li>
<p><strong>Tracing Best Practices</strong></p>
<ul>
<li>Use distributed tracing</li>
<li>Propagate trace context</li>
<li>Set appropriate sampling rate</li>
<li>Monitor trace data</li>
</ul>
</li>
</ol>
<h3 id="error-handling-1" tabindex="-1"><a class="header-anchor" href="#error-handling-1"><span>Error Handling</span></a></h3>
<ol>
<li>
<p><strong>Error Handling Best Practices</strong></p>
<ul>
<li>Use custom error types</li>
<li>Include error context</li>
<li>Handle errors at appropriate level</li>
<li>Log errors with stack trace</li>
</ul>
</li>
<li>
<p><strong>Recovery Best Practices</strong></p>
<ul>
<li>Implement panic recovery</li>
<li>Use error handling middleware</li>
<li>Monitor error rates</li>
<li>Alert on critical errors</li>
</ul>
</li>
</ol>
<h3 id="performance" tabindex="-1"><a class="header-anchor" href="#performance"><span>Performance</span></a></h3>
<ol>
<li>
<p><strong>Performance Best Practices</strong></p>
<ul>
<li>Profile application regularly</li>
<li>Optimize database queries</li>
<li>Use connection pooling</li>
<li>Implement caching</li>
</ul>
</li>
<li>
<p><strong>Monitoring Best Practices</strong></p>
<ul>
<li>Set up health checks</li>
<li>Configure alerts</li>
<li>Monitor key metrics</li>
<li>Review logs regularly</li>
</ul>
</li>
</ol>
</div></template>


