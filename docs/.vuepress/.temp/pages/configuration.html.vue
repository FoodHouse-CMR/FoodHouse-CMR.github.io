<template><div><h1 id="configuration-guide" tabindex="-1"><a class="header-anchor" href="#configuration-guide"><span>Configuration Guide</span></a></h1>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p>This guide provides comprehensive information about configuring the FoodHouse application. It covers environment variables, configuration files, and deployment configurations.</p>
<h2 id="environment-variables" tabindex="-1"><a class="header-anchor" href="#environment-variables"><span>Environment Variables</span></a></h2>
<h3 id="core-configuration" tabindex="-1"><a class="header-anchor" href="#core-configuration"><span>Core Configuration</span></a></h3>
<ol>
<li>
<p><strong>Application Settings</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Application settings</span></span>
<span class="line"><span class="token assign-left variable">APP_NAME</span><span class="token operator">=</span>FoodHouse</span>
<span class="line"><span class="token assign-left variable">APP_ENV</span><span class="token operator">=</span>development</span>
<span class="line"><span class="token assign-left variable">APP_DEBUG</span><span class="token operator">=</span>true</span>
<span class="line"><span class="token assign-left variable">APP_URL</span><span class="token operator">=</span>http://localhost:8080</span>
<span class="line"><span class="token assign-left variable">APP_PORT</span><span class="token operator">=</span><span class="token number">8080</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Database Settings</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Database settings</span></span>
<span class="line"><span class="token assign-left variable">DB_CONNECTION</span><span class="token operator">=</span>postgres</span>
<span class="line"><span class="token assign-left variable">DB_HOST</span><span class="token operator">=</span>localhost</span>
<span class="line"><span class="token assign-left variable">DB_PORT</span><span class="token operator">=</span><span class="token number">5432</span></span>
<span class="line"><span class="token assign-left variable">DB_DATABASE</span><span class="token operator">=</span>foodhouse</span>
<span class="line"><span class="token assign-left variable">DB_USERNAME</span><span class="token operator">=</span>postgres</span>
<span class="line"><span class="token assign-left variable">DB_PASSWORD</span><span class="token operator">=</span>secret</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Cache Settings</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Cache settings</span></span>
<span class="line"><span class="token assign-left variable">CACHE_DRIVER</span><span class="token operator">=</span>redis</span>
<span class="line"><span class="token assign-left variable">REDIS_HOST</span><span class="token operator">=</span>localhost</span>
<span class="line"><span class="token assign-left variable">REDIS_PORT</span><span class="token operator">=</span><span class="token number">6379</span></span>
<span class="line"><span class="token assign-left variable">REDIS_PASSWORD</span><span class="token operator">=</span>null</span>
<span class="line"><span class="token assign-left variable">REDIS_DB</span><span class="token operator">=</span><span class="token number">0</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Message Queue Settings</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Message queue settings</span></span>
<span class="line"><span class="token assign-left variable">QUEUE_CONNECTION</span><span class="token operator">=</span>rabbitmq</span>
<span class="line"><span class="token assign-left variable">RABBITMQ_HOST</span><span class="token operator">=</span>localhost</span>
<span class="line"><span class="token assign-left variable">RABBITMQ_PORT</span><span class="token operator">=</span><span class="token number">5672</span></span>
<span class="line"><span class="token assign-left variable">RABBITMQ_USER</span><span class="token operator">=</span>guest</span>
<span class="line"><span class="token assign-left variable">RABBITMQ_PASSWORD</span><span class="token operator">=</span>guest</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="service-configuration" tabindex="-1"><a class="header-anchor" href="#service-configuration"><span>Service Configuration</span></a></h3>
<ol>
<li>
<p><strong>User Service</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># User service settings</span></span>
<span class="line"><span class="token assign-left variable">USER_SERVICE_PORT</span><span class="token operator">=</span><span class="token number">8081</span></span>
<span class="line"><span class="token assign-left variable">USER_SERVICE_HOST</span><span class="token operator">=</span>localhost</span>
<span class="line"><span class="token assign-left variable">USER_SERVICE_GRPC_PORT</span><span class="token operator">=</span><span class="token number">50051</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Product Service</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Product service settings</span></span>
<span class="line"><span class="token assign-left variable">PRODUCT_SERVICE_PORT</span><span class="token operator">=</span><span class="token number">8082</span></span>
<span class="line"><span class="token assign-left variable">PRODUCT_SERVICE_HOST</span><span class="token operator">=</span>localhost</span>
<span class="line"><span class="token assign-left variable">PRODUCT_SERVICE_GRPC_PORT</span><span class="token operator">=</span><span class="token number">50052</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Order Service</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Order service settings</span></span>
<span class="line"><span class="token assign-left variable">ORDER_SERVICE_PORT</span><span class="token operator">=</span><span class="token number">8083</span></span>
<span class="line"><span class="token assign-left variable">ORDER_SERVICE_HOST</span><span class="token operator">=</span>localhost</span>
<span class="line"><span class="token assign-left variable">ORDER_SERVICE_GRPC_PORT</span><span class="token operator">=</span><span class="token number">50053</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Payment Service</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Payment service settings</span></span>
<span class="line"><span class="token assign-left variable">PAYMENT_SERVICE_PORT</span><span class="token operator">=</span><span class="token number">8084</span></span>
<span class="line"><span class="token assign-left variable">PAYMENT_SERVICE_HOST</span><span class="token operator">=</span>localhost</span>
<span class="line"><span class="token assign-left variable">PAYMENT_SERVICE_GRPC_PORT</span><span class="token operator">=</span><span class="token number">50054</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="security-configuration" tabindex="-1"><a class="header-anchor" href="#security-configuration"><span>Security Configuration</span></a></h3>
<ol>
<li>
<p><strong>JWT Settings</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># JWT settings</span></span>
<span class="line"><span class="token assign-left variable">JWT_SECRET</span><span class="token operator">=</span>your-secret-key</span>
<span class="line"><span class="token assign-left variable">JWT_EXPIRY</span><span class="token operator">=</span>24h</span>
<span class="line"><span class="token assign-left variable">JWT_REFRESH_EXPIRY</span><span class="token operator">=</span>168h</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>OAuth2 Settings</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># OAuth2 settings</span></span>
<span class="line"><span class="token assign-left variable">OAUTH2_CLIENT_ID</span><span class="token operator">=</span>your-client-id</span>
<span class="line"><span class="token assign-left variable">OAUTH2_CLIENT_SECRET</span><span class="token operator">=</span>your-client-secret</span>
<span class="line"><span class="token assign-left variable">OAUTH2_REDIRECT_URL</span><span class="token operator">=</span>http://localhost:8080/oauth/callback</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Rate Limiting</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Rate limiting settings</span></span>
<span class="line"><span class="token assign-left variable">RATE_LIMIT_REQUESTS</span><span class="token operator">=</span><span class="token number">100</span></span>
<span class="line"><span class="token assign-left variable">RATE_LIMIT_WINDOW</span><span class="token operator">=</span>1m</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="monitoring-configuration" tabindex="-1"><a class="header-anchor" href="#monitoring-configuration"><span>Monitoring Configuration</span></a></h3>
<ol>
<li>
<p><strong>Prometheus Settings</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Prometheus settings</span></span>
<span class="line"><span class="token assign-left variable">PROMETHEUS_ENABLED</span><span class="token operator">=</span>true</span>
<span class="line"><span class="token assign-left variable">PROMETHEUS_PORT</span><span class="token operator">=</span><span class="token number">9090</span></span>
<span class="line"><span class="token assign-left variable">PROMETHEUS_PATH</span><span class="token operator">=</span>/metrics</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Grafana Settings</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Grafana settings</span></span>
<span class="line"><span class="token assign-left variable">GRAFANA_ENABLED</span><span class="token operator">=</span>true</span>
<span class="line"><span class="token assign-left variable">GRAFANA_PORT</span><span class="token operator">=</span><span class="token number">3000</span></span>
<span class="line"><span class="token assign-left variable">GRAFANA_ADMIN_USER</span><span class="token operator">=</span>admin</span>
<span class="line"><span class="token assign-left variable">GRAFANA_ADMIN_PASSWORD</span><span class="token operator">=</span>admin</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="configuration-files" tabindex="-1"><a class="header-anchor" href="#configuration-files"><span>Configuration Files</span></a></h2>
<h3 id="application-configuration" tabindex="-1"><a class="header-anchor" href="#application-configuration"><span>Application Configuration</span></a></h3>
<ol>
<li>
<p><strong>config.yaml</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># Application configuration</span></span>
<span class="line"><span class="token key atrule">app</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> FoodHouse</span>
<span class="line">  <span class="token key atrule">env</span><span class="token punctuation">:</span> development</span>
<span class="line">  <span class="token key atrule">debug</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">8080</span></span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">database</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">connection</span><span class="token punctuation">:</span> postgres</span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5432</span></span>
<span class="line">  <span class="token key atrule">database</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line">  <span class="token key atrule">username</span><span class="token punctuation">:</span> postgres</span>
<span class="line">  <span class="token key atrule">password</span><span class="token punctuation">:</span> secret</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">cache</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">driver</span><span class="token punctuation">:</span> redis</span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span></span>
<span class="line">  <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token null important">null</span></span>
<span class="line">  <span class="token key atrule">db</span><span class="token punctuation">:</span> <span class="token number">0</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">queue</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">connection</span><span class="token punctuation">:</span> rabbitmq</span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5672</span></span>
<span class="line">  <span class="token key atrule">user</span><span class="token punctuation">:</span> guest</span>
<span class="line">  <span class="token key atrule">password</span><span class="token punctuation">:</span> guest</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>services.yaml</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># Services configuration</span></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">user</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8081</span></span>
<span class="line">    <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost</span>
<span class="line">    <span class="token key atrule">grpc_port</span><span class="token punctuation">:</span> <span class="token number">50051</span></span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">product</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8082</span></span>
<span class="line">    <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost</span>
<span class="line">    <span class="token key atrule">grpc_port</span><span class="token punctuation">:</span> <span class="token number">50052</span></span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">order</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8083</span></span>
<span class="line">    <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost</span>
<span class="line">    <span class="token key atrule">grpc_port</span><span class="token punctuation">:</span> <span class="token number">50053</span></span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">payment</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8084</span></span>
<span class="line">    <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost</span>
<span class="line">    <span class="token key atrule">grpc_port</span><span class="token punctuation">:</span> <span class="token number">50054</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="security-configuration-1" tabindex="-1"><a class="header-anchor" href="#security-configuration-1"><span>Security Configuration</span></a></h3>
<ol>
<li>
<p><strong>security.yaml</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># Security configuration</span></span>
<span class="line"><span class="token key atrule">security</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">jwt</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">secret</span><span class="token punctuation">:</span> your<span class="token punctuation">-</span>secret<span class="token punctuation">-</span>key</span>
<span class="line">    <span class="token key atrule">expiry</span><span class="token punctuation">:</span> 24h</span>
<span class="line">    <span class="token key atrule">refresh_expiry</span><span class="token punctuation">:</span> 168h</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">oauth2</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">client_id</span><span class="token punctuation">:</span> your<span class="token punctuation">-</span>client<span class="token punctuation">-</span>id</span>
<span class="line">    <span class="token key atrule">client_secret</span><span class="token punctuation">:</span> your<span class="token punctuation">-</span>client<span class="token punctuation">-</span>secret</span>
<span class="line">    <span class="token key atrule">redirect_url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>8080/oauth/callback</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">rate_limit</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">requests</span><span class="token punctuation">:</span> <span class="token number">100</span></span>
<span class="line">    <span class="token key atrule">window</span><span class="token punctuation">:</span> 1m</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>cors.yaml</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># CORS configuration</span></span>
<span class="line"><span class="token key atrule">cors</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">allowed_origins</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">3000</span></span>
<span class="line">    <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//foodhouse.com</span>
<span class="line">  <span class="token key atrule">allowed_methods</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> GET</span>
<span class="line">    <span class="token punctuation">-</span> POST</span>
<span class="line">    <span class="token punctuation">-</span> PUT</span>
<span class="line">    <span class="token punctuation">-</span> DELETE</span>
<span class="line">  <span class="token key atrule">allowed_headers</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> Authorization</span>
<span class="line">    <span class="token punctuation">-</span> Content<span class="token punctuation">-</span>Type</span>
<span class="line">  <span class="token key atrule">exposed_headers</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> X<span class="token punctuation">-</span>Total<span class="token punctuation">-</span>Count</span>
<span class="line">  <span class="token key atrule">max_age</span><span class="token punctuation">:</span> <span class="token number">3600</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="monitoring-configuration-1" tabindex="-1"><a class="header-anchor" href="#monitoring-configuration-1"><span>Monitoring Configuration</span></a></h3>
<ol>
<li>
<p><strong>prometheus.yaml</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># Prometheus configuration</span></span>
<span class="line"><span class="token key atrule">prometheus</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9090</span></span>
<span class="line">  <span class="token key atrule">path</span><span class="token punctuation">:</span> /metrics</span>
<span class="line">  <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 15s</span>
<span class="line">  <span class="token key atrule">evaluation_interval</span><span class="token punctuation">:</span> 15s</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">scrape_configs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">'users-service'</span></span>
<span class="line">    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'users-service:8080'</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">'products-service'</span></span>
<span class="line">    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'products-service:8080'</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">'orders-service'</span></span>
<span class="line">    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'orders-service:8080'</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">'payments-service'</span></span>
<span class="line">    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'payments-service:8080'</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>grafana.yaml</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># Grafana configuration</span></span>
<span class="line"><span class="token key atrule">grafana</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3000</span></span>
<span class="line">  <span class="token key atrule">admin_user</span><span class="token punctuation">:</span> admin</span>
<span class="line">  <span class="token key atrule">admin_password</span><span class="token punctuation">:</span> admin</span>
<span class="line">  <span class="token key atrule">security</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">allow_embedding</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">cookie_secure</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">    <span class="token key atrule">disable_initial_admin_creation</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line">  <span class="token key atrule">server</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">root_url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">3000</span></span>
<span class="line">    <span class="token key atrule">serve_from_sub_path</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="deployment-configuration" tabindex="-1"><a class="header-anchor" href="#deployment-configuration"><span>Deployment Configuration</span></a></h2>
<h3 id="docker-configuration" tabindex="-1"><a class="header-anchor" href="#docker-configuration"><span>Docker Configuration</span></a></h3>
<ol>
<li>
<p><strong>Dockerfile</strong></p>
<div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker"><pre v-pre><code><span class="line"><span class="token comment"># Base image</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> golang:1.20-alpine <span class="token keyword">AS</span> builder</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Set working directory</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Copy go mod and sum files</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> go.mod go.sum ./</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Download dependencies</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> go mod download</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Copy source code</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> . .</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Build application</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Final image</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> alpine:latest</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Install ca-certificates</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apk --no-cache add ca-certificates</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Set working directory</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /root/</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Copy binary from builder</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /app/main .</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Expose port</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Run application</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"./main"</span>]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>docker-compose.yaml</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># Docker Compose configuration</span></span>
<span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.8'</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">app</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">build</span><span class="token punctuation">:</span> .</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"8080:8080"</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> APP_ENV=development</span>
<span class="line">      <span class="token punctuation">-</span> DB_HOST=postgres</span>
<span class="line">      <span class="token punctuation">-</span> REDIS_HOST=redis</span>
<span class="line">      <span class="token punctuation">-</span> RABBITMQ_HOST=rabbitmq</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> postgres</span>
<span class="line">      <span class="token punctuation">-</span> redis</span>
<span class="line">      <span class="token punctuation">-</span> rabbitmq</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">postgres</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres<span class="token punctuation">:</span><span class="token number">13</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> POSTGRES_DB=foodhouse</span>
<span class="line">      <span class="token punctuation">-</span> POSTGRES_USER=postgres</span>
<span class="line">      <span class="token punctuation">-</span> POSTGRES_PASSWORD=secret</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"5432:5432"</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> postgres_data<span class="token punctuation">:</span>/var/lib/postgresql/data</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">redis</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span><span class="token number">6</span></span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"6379:6379"</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> redis_data<span class="token punctuation">:</span>/data</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> rabbitmq<span class="token punctuation">:</span>3<span class="token punctuation">-</span>management</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"5672:5672"</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"15672:15672"</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> rabbitmq_data<span class="token punctuation">:</span>/var/lib/rabbitmq</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">postgres_data</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">redis_data</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">rabbitmq_data</span><span class="token punctuation">:</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="kubernetes-configuration" tabindex="-1"><a class="header-anchor" href="#kubernetes-configuration"><span>Kubernetes Configuration</span></a></h3>
<ol>
<li>
<p><strong>deployment.yaml</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># Kubernetes deployment configuration</span></span>
<span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span></span>
<span class="line">  <span class="token key atrule">selector</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">app</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line">  <span class="token key atrule">template</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">labels</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">app</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line">    <span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">containers</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line">        <span class="token key atrule">image</span><span class="token punctuation">:</span> foodhouse<span class="token punctuation">:</span>latest</span>
<span class="line">        <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8080</span></span>
<span class="line">        <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> APP_ENV</span>
<span class="line">          <span class="token key atrule">value</span><span class="token punctuation">:</span> production</span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_HOST</span>
<span class="line">          <span class="token key atrule">value</span><span class="token punctuation">:</span> postgres</span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> REDIS_HOST</span>
<span class="line">          <span class="token key atrule">value</span><span class="token punctuation">:</span> redis</span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> RABBITMQ_HOST</span>
<span class="line">          <span class="token key atrule">value</span><span class="token punctuation">:</span> rabbitmq</span>
<span class="line">        <span class="token key atrule">resources</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">requests</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">"500m"</span></span>
<span class="line">            <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">"512Mi"</span></span>
<span class="line">          <span class="token key atrule">limits</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">"1000m"</span></span>
<span class="line">            <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">"1Gi"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>service.yaml</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># Kubernetes service configuration</span></span>
<span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> Service</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">type</span><span class="token punctuation">:</span> LoadBalancer</span>
<span class="line">  <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span></span>
<span class="line">    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span></span>
<span class="line">  <span class="token key atrule">selector</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">app</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="aws-configuration" tabindex="-1"><a class="header-anchor" href="#aws-configuration"><span>AWS Configuration</span></a></h3>
<ol>
<li>
<p><strong>terraform/main.tf</strong></p>
<div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl"><pre v-pre><code><span class="line"><span class="token comment"># AWS infrastructure configuration</span></span>
<span class="line"><span class="token keyword">provider<span class="token type variable"> "aws" </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">region</span> <span class="token punctuation">=</span> <span class="token string">"us-west-2"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># VPC</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">"aws_vpc"</span></span> <span class="token string">"main"</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">cidr_block</span> <span class="token punctuation">=</span> <span class="token string">"10.0.0.0/16"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ECS Cluster</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">"aws_ecs_cluster"</span></span> <span class="token string">"main"</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">name</span> <span class="token punctuation">=</span> <span class="token string">"foodhouse"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># RDS</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">"aws_db_instance"</span></span> <span class="token string">"main"</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">engine</span>         <span class="token punctuation">=</span> <span class="token string">"postgres"</span></span>
<span class="line">  <span class="token property">instance_class</span> <span class="token punctuation">=</span> <span class="token string">"db.t3.micro"</span></span>
<span class="line">  <span class="token property">name</span>           <span class="token punctuation">=</span> <span class="token string">"foodhouse"</span></span>
<span class="line">  <span class="token property">username</span>       <span class="token punctuation">=</span> <span class="token string">"postgres"</span></span>
<span class="line">  <span class="token property">password</span>       <span class="token punctuation">=</span> <span class="token string">"secret"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ElastiCache</span></span>
<span class="line"><span class="token keyword">resource <span class="token type variable">"aws_elasticache_cluster"</span></span> <span class="token string">"main"</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">engine</span>         <span class="token punctuation">=</span> <span class="token string">"redis"</span></span>
<span class="line">  <span class="token property">node_type</span>      <span class="token punctuation">=</span> <span class="token string">"cache.t3.micro"</span></span>
<span class="line">  <span class="token property">num_cache_nodes</span> <span class="token punctuation">=</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>terraform/variables.tf</strong></p>
<div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl"><pre v-pre><code><span class="line"><span class="token comment"># AWS variables</span></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> "aws_region" </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">"AWS region"</span></span>
<span class="line">  <span class="token property">type</span>        <span class="token punctuation">=</span> string</span>
<span class="line">  <span class="token property">default</span>     <span class="token punctuation">=</span> <span class="token string">"us-west-2"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> "environment" </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">"Environment name"</span></span>
<span class="line">  <span class="token property">type</span>        <span class="token punctuation">=</span> string</span>
<span class="line">  <span class="token property">default</span>     <span class="token punctuation">=</span> <span class="token string">"production"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> "db_instance_class" </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">"RDS instance class"</span></span>
<span class="line">  <span class="token property">type</span>        <span class="token punctuation">=</span> string</span>
<span class="line">  <span class="token property">default</span>     <span class="token punctuation">=</span> <span class="token string">"db.t3.micro"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">variable<span class="token type variable"> "cache_node_type" </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">description</span> <span class="token punctuation">=</span> <span class="token string">"ElastiCache node type"</span></span>
<span class="line">  <span class="token property">type</span>        <span class="token punctuation">=</span> string</span>
<span class="line">  <span class="token property">default</span>     <span class="token punctuation">=</span> <span class="token string">"cache.t3.micro"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="configuration-management" tabindex="-1"><a class="header-anchor" href="#configuration-management"><span>Configuration Management</span></a></h2>
<h3 id="environment-specific-configuration" tabindex="-1"><a class="header-anchor" href="#environment-specific-configuration"><span>Environment-Specific Configuration</span></a></h3>
<ol>
<li>
<p><strong>Development</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># Development configuration</span></span>
<span class="line"><span class="token key atrule">app</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">env</span><span class="token punctuation">:</span> development</span>
<span class="line">  <span class="token key atrule">debug</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">8080</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">database</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5432</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">cache</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">queue</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5672</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Staging</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># Staging configuration</span></span>
<span class="line"><span class="token key atrule">app</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">env</span><span class="token punctuation">:</span> staging</span>
<span class="line">  <span class="token key atrule">debug</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line">  <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//staging.foodhouse.com</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">database</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> staging<span class="token punctuation">-</span>db.foodhouse.com</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5432</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">cache</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> staging<span class="token punctuation">-</span>cache.foodhouse.com</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">queue</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> staging<span class="token punctuation">-</span>queue.foodhouse.com</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5672</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Production</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># Production configuration</span></span>
<span class="line"><span class="token key atrule">app</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">env</span><span class="token punctuation">:</span> production</span>
<span class="line">  <span class="token key atrule">debug</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line">  <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//foodhouse.com</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">database</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> prod<span class="token punctuation">-</span>db.foodhouse.com</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5432</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">cache</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> prod<span class="token punctuation">-</span>cache.foodhouse.com</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">queue</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> prod<span class="token punctuation">-</span>queue.foodhouse.com</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5672</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="configuration-validation" tabindex="-1"><a class="header-anchor" href="#configuration-validation"><span>Configuration Validation</span></a></h3>
<ol>
<li>
<p><strong>Schema Validation</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Configuration schema</span></span>
<span class="line"><span class="token keyword">type</span> Config <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    App <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">        Name  <span class="token builtin">string</span> <span class="token string">`yaml:"name" validate:"required"`</span></span>
<span class="line">        Env   <span class="token builtin">string</span> <span class="token string">`yaml:"env" validate:"required,oneof=development staging production"`</span></span>
<span class="line">        Debug <span class="token builtin">bool</span>   <span class="token string">`yaml:"debug"`</span></span>
<span class="line">        URL   <span class="token builtin">string</span> <span class="token string">`yaml:"url" validate:"required,url"`</span></span>
<span class="line">        Port  <span class="token builtin">int</span>    <span class="token string">`yaml:"port" validate:"required,min=1,max=65535"`</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token string">`yaml:"app"`</span></span>
<span class="line"></span>
<span class="line">    Database <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">        Connection <span class="token builtin">string</span> <span class="token string">`yaml:"connection" validate:"required"`</span></span>
<span class="line">        Host       <span class="token builtin">string</span> <span class="token string">`yaml:"host" validate:"required"`</span></span>
<span class="line">        Port       <span class="token builtin">int</span>    <span class="token string">`yaml:"port" validate:"required,min=1,max=65535"`</span></span>
<span class="line">        Database   <span class="token builtin">string</span> <span class="token string">`yaml:"database" validate:"required"`</span></span>
<span class="line">        Username   <span class="token builtin">string</span> <span class="token string">`yaml:"username" validate:"required"`</span></span>
<span class="line">        Password   <span class="token builtin">string</span> <span class="token string">`yaml:"password" validate:"required"`</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token string">`yaml:"database"`</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Validation Function</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Validate configuration</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">ValidateConfig</span><span class="token punctuation">(</span>config <span class="token operator">*</span>Config<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    validate <span class="token operator">:=</span> validator<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> validate<span class="token punctuation">.</span><span class="token function">Struct</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"invalid configuration: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="configuration-loading" tabindex="-1"><a class="header-anchor" href="#configuration-loading"><span>Configuration Loading</span></a></h3>
<ol>
<li>
<p><strong>Load Configuration</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Load configuration</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">LoadConfig</span><span class="token punctuation">(</span>path <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>Config<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Read file</span></span>
<span class="line">    data<span class="token punctuation">,</span> err <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">ReadFile</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"error reading config file: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Parse YAML</span></span>
<span class="line">    <span class="token keyword">var</span> config Config</span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> yaml<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token operator">&amp;</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"error parsing config file: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Validate configuration</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">ValidateConfig</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> <span class="token operator">&amp;</span>config<span class="token punctuation">,</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Environment Overrides</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Override configuration with environment variables</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">OverrideConfig</span><span class="token punctuation">(</span>config <span class="token operator">*</span>Config<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> env <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Getenv</span><span class="token punctuation">(</span><span class="token string">"APP_ENV"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> env <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">{</span></span>
<span class="line">        config<span class="token punctuation">.</span>App<span class="token punctuation">.</span>Env <span class="token operator">=</span> env</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">if</span> debug <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Getenv</span><span class="token punctuation">(</span><span class="token string">"APP_DEBUG"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> debug <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">{</span></span>
<span class="line">        config<span class="token punctuation">.</span>App<span class="token punctuation">.</span>Debug <span class="token operator">=</span> debug <span class="token operator">==</span> <span class="token string">"true"</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">if</span> url <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Getenv</span><span class="token punctuation">(</span><span class="token string">"APP_URL"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> url <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">{</span></span>
<span class="line">        config<span class="token punctuation">.</span>App<span class="token punctuation">.</span>URL <span class="token operator">=</span> url</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">if</span> port <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Getenv</span><span class="token punctuation">(</span><span class="token string">"APP_PORT"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> port <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> p<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">            config<span class="token punctuation">.</span>App<span class="token punctuation">.</span>Port <span class="token operator">=</span> p</span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="configuration-best-practices" tabindex="-1"><a class="header-anchor" href="#configuration-best-practices"><span>Configuration Best Practices</span></a></h2>
<h3 id="security" tabindex="-1"><a class="header-anchor" href="#security"><span>Security</span></a></h3>
<ol>
<li>
<p><strong>Secret Management</strong></p>
<ul>
<li>Use environment variables for secrets</li>
<li>Use a secret management service</li>
<li>Encrypt sensitive configuration</li>
<li>Rotate secrets regularly</li>
</ul>
</li>
<li>
<p><strong>Access Control</strong></p>
<ul>
<li>Restrict configuration file access</li>
<li>Use least privilege principle</li>
<li>Audit configuration changes</li>
<li>Monitor configuration access</li>
</ul>
</li>
</ol>
<h3 id="performance" tabindex="-1"><a class="header-anchor" href="#performance"><span>Performance</span></a></h3>
<ol>
<li>
<p><strong>Caching</strong></p>
<ul>
<li>Cache configuration values</li>
<li>Use appropriate cache TTL</li>
<li>Implement cache invalidation</li>
<li>Monitor cache performance</li>
</ul>
</li>
<li>
<p><strong>Optimization</strong></p>
<ul>
<li>Minimize configuration size</li>
<li>Use efficient serialization</li>
<li>Implement lazy loading</li>
<li>Profile configuration loading</li>
</ul>
</li>
</ol>
<h3 id="maintenance" tabindex="-1"><a class="header-anchor" href="#maintenance"><span>Maintenance</span></a></h3>
<ol>
<li>
<p><strong>Version Control</strong></p>
<ul>
<li>Track configuration changes</li>
<li>Use configuration templates</li>
<li>Document configuration changes</li>
<li>Review configuration changes</li>
</ul>
</li>
<li>
<p><strong>Monitoring</strong></p>
<ul>
<li>Monitor configuration loading</li>
<li>Track configuration errors</li>
<li>Alert on configuration issues</li>
<li>Log configuration changes</li>
</ul>
</li>
</ol>
<h3 id="documentation" tabindex="-1"><a class="header-anchor" href="#documentation"><span>Documentation</span></a></h3>
<ol>
<li>
<p><strong>Configuration Documentation</strong></p>
<ul>
<li>Document all configuration options</li>
<li>Provide examples</li>
<li>Explain dependencies</li>
<li>Include validation rules</li>
</ul>
</li>
<li>
<p><strong>Change Management</strong></p>
<ul>
<li>Document configuration changes</li>
<li>Track configuration versions</li>
<li>Plan configuration updates</li>
<li>Test configuration changes</li>
</ul>
</li>
</ol>
</div></template>


