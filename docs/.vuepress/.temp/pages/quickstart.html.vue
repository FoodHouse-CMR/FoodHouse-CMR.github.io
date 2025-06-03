<template><div><h1 id="quick-start-guide" tabindex="-1"><a class="header-anchor" href="#quick-start-guide"><span>Quick Start Guide</span></a></h1>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p>This guide provides a quick start to the FoodHouse application. It covers installation, configuration, and basic usage.</p>
<h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites"><span>Prerequisites</span></a></h2>
<ol>
<li>
<p><strong>Required Tools</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check Go version</span></span>
<span class="line">go version  <span class="token comment"># Should be 1.20 or higher</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check Node.js version</span></span>
<span class="line"><span class="token function">node</span> <span class="token parameter variable">--version</span>  <span class="token comment"># Should be 18 or higher</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check Docker version</span></span>
<span class="line"><span class="token function">docker</span> <span class="token parameter variable">--version</span>  <span class="token comment"># Should be 20.10 or higher</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check Docker Compose version</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token parameter variable">--version</span>  <span class="token comment"># Should be 2.0 or higher</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check Kubernetes version</span></span>
<span class="line">kubectl version  <span class="token comment"># Should be 1.20 or higher</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Required Accounts</strong></p>
<ul>
<li>GitHub account</li>
<li>Docker Hub account</li>
<li>AWS account (for production deployment)</li>
</ul>
</li>
</ol>
<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2>
<ol>
<li>
<p><strong>Clone Repository</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Clone repository</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/foodhouse/foodhouse.git</span>
<span class="line"><span class="token builtin class-name">cd</span> foodhouse</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Install Dependencies</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Install Go dependencies</span></span>
<span class="line">go mod download</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Install Node.js dependencies</span></span>
<span class="line"><span class="token builtin class-name">cd</span> frontend</span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="line"><span class="token builtin class-name">cd</span> <span class="token punctuation">..</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Generate Protocol Buffers</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Install Protocol Buffers compiler</span></span>
<span class="line">go <span class="token function">install</span> google.golang.org/protobuf/cmd/protoc-gen-go@latest</span>
<span class="line">go <span class="token function">install</span> google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Generate Protocol Buffers</span></span>
<span class="line">protoc <span class="token parameter variable">--go_out</span><span class="token operator">=</span>. <span class="token parameter variable">--go_opt</span><span class="token operator">=</span>paths<span class="token operator">=</span>source_relative <span class="token punctuation">\</span></span>
<span class="line">    --go-grpc_out<span class="token operator">=</span>. --go-grpc_opt<span class="token operator">=</span>paths<span class="token operator">=</span>source_relative <span class="token punctuation">\</span></span>
<span class="line">    proto/*.proto</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration"><span>Configuration</span></a></h2>
<ol>
<li>
<p><strong>Environment Variables</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Copy environment file</span></span>
<span class="line"><span class="token function">cp</span> .env.example .env</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Edit environment file</span></span>
<span class="line"><span class="token function">vim</span> .env</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Database Setup</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Start PostgreSQL</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> postgres</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Run migrations</span></span>
<span class="line">go run cmd/migrate/main.go up</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Cache Setup</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Start Redis</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> redis</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Message Queue Setup</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Start RabbitMQ</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> rabbitmq</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="running-the-application" tabindex="-1"><a class="header-anchor" href="#running-the-application"><span>Running the Application</span></a></h2>
<ol>
<li>
<p><strong>Development Mode</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Start all services</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Start application</span></span>
<span class="line">go run cmd/api/main.go</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Production Mode</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Build application</span></span>
<span class="line"><span class="token function">docker-compose</span> build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Start application</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Kubernetes Deployment</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Apply Kubernetes manifests</span></span>
<span class="line">kubectl apply <span class="token parameter variable">-f</span> k8s/</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check deployment status</span></span>
<span class="line">kubectl get pods</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="basic-usage" tabindex="-1"><a class="header-anchor" href="#basic-usage"><span>Basic Usage</span></a></h2>
<ol>
<li>
<p><strong>User Management</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Create user</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8080/api/v1/users <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-d</span> <span class="token string">'{</span>
<span class="line">        "email": "user@example.com",</span>
<span class="line">        "password": "password123",</span>
<span class="line">        "first_name": "John",</span>
<span class="line">        "last_name": "Doe"</span>
<span class="line">    }'</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Login</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8080/api/v1/auth/login <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-d</span> <span class="token string">'{</span>
<span class="line">        "email": "user@example.com",</span>
<span class="line">        "password": "password123"</span>
<span class="line">    }'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Product Management</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Create product</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8080/api/v1/products <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer &lt;token>"</span> <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-d</span> <span class="token string">'{</span>
<span class="line">        "name": "Organic Apples",</span>
<span class="line">        "description": "Fresh organic apples",</span>
<span class="line">        "price": 2.99,</span>
<span class="line">        "category_id": "1"</span>
<span class="line">    }'</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># List products</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> GET http://localhost:8080/api/v1/products <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer &lt;token>"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Order Management</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Create order</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8080/api/v1/orders <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer &lt;token>"</span> <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-d</span> <span class="token string">'{</span>
<span class="line">        "items": [</span>
<span class="line">            {</span>
<span class="line">                "product_id": "1",</span>
<span class="line">                "quantity": 2</span>
<span class="line">            }</span>
<span class="line">        ],</span>
<span class="line">        "shipping_address_id": "1"</span>
<span class="line">    }'</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># List orders</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> GET http://localhost:8080/api/v1/orders <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer &lt;token>"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Payment Processing</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Initiate payment</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8080/api/v1/payments <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer &lt;token>"</span> <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-d</span> <span class="token string">'{</span>
<span class="line">        "order_id": "1",</span>
<span class="line">        "payment_method": "credit_card",</span>
<span class="line">        "amount": 5.98</span>
<span class="line">    }'</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Confirm payment</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8080/api/v1/payments/1/confirm <span class="token punctuation">\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer &lt;token>"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="development-workflow" tabindex="-1"><a class="header-anchor" href="#development-workflow"><span>Development Workflow</span></a></h2>
<ol>
<li>
<p><strong>Code Style</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Format Go code</span></span>
<span class="line">go <span class="token function">fmt</span> ./<span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Format frontend code</span></span>
<span class="line"><span class="token builtin class-name">cd</span> frontend</span>
<span class="line"><span class="token function">npm</span> run <span class="token function">format</span></span>
<span class="line"><span class="token builtin class-name">cd</span> <span class="token punctuation">..</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Testing</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Run Go tests</span></span>
<span class="line">go <span class="token builtin class-name">test</span> ./<span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Run frontend tests</span></span>
<span class="line"><span class="token builtin class-name">cd</span> frontend</span>
<span class="line"><span class="token function">npm</span> <span class="token builtin class-name">test</span></span>
<span class="line"><span class="token builtin class-name">cd</span> <span class="token punctuation">..</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Building</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Build Go application</span></span>
<span class="line">go build <span class="token parameter variable">-o</span> bin/api cmd/api/main.go</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Build frontend</span></span>
<span class="line"><span class="token builtin class-name">cd</span> frontend</span>
<span class="line"><span class="token function">npm</span> run build</span>
<span class="line"><span class="token builtin class-name">cd</span> <span class="token punctuation">..</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Docker Build</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Build Docker image</span></span>
<span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> foodhouse:latest <span class="token builtin class-name">.</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="monitoring" tabindex="-1"><a class="header-anchor" href="#monitoring"><span>Monitoring</span></a></h2>
<ol>
<li>
<p><strong>Application Metrics</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check metrics</span></span>
<span class="line"><span class="token function">curl</span> http://localhost:9090/metrics</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Health Check</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check health</span></span>
<span class="line"><span class="token function">curl</span> http://localhost:8080/health</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Logs</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check application logs</span></span>
<span class="line"><span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span> api</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check database logs</span></span>
<span class="line"><span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span> postgres</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check cache logs</span></span>
<span class="line"><span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span> redis</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check message queue logs</span></span>
<span class="line"><span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span> rabbitmq</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting"><span>Troubleshooting</span></a></h2>
<ol>
<li>
<p><strong>Common Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check service status</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token function">ps</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check service logs</span></span>
<span class="line"><span class="token function">docker-compose</span> logs</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check service configuration</span></span>
<span class="line"><span class="token function">docker-compose</span> config</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Database Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check database connection</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> postgres psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check database logs</span></span>
<span class="line"><span class="token function">docker-compose</span> logs postgres</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Cache Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check Redis connection</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> redis redis-cli <span class="token function">ping</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check Redis logs</span></span>
<span class="line"><span class="token function">docker-compose</span> logs redis</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Message Queue Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check RabbitMQ connection</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> rabbitmq rabbitmqctl status</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check RabbitMQ logs</span></span>
<span class="line"><span class="token function">docker-compose</span> logs rabbitmq</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="next-steps" tabindex="-1"><a class="header-anchor" href="#next-steps"><span>Next Steps</span></a></h2>
<ol>
<li>
<p><strong>Documentation</strong></p>
<ul>
<li>Read the <RouteLink to="/architecture.html">Architecture Guide</RouteLink></li>
<li>Read the <RouteLink to="/api-documentation.html">API Documentation</RouteLink></li>
<li>Read the <RouteLink to="/database-schema.html">Database Schema</RouteLink></li>
<li>Read the <RouteLink to="/deployment.html">Deployment Guide</RouteLink></li>
</ul>
</li>
<li>
<p><strong>Development</strong></p>
<ul>
<li>Set up your development environment</li>
<li>Create a new feature branch</li>
<li>Write tests for your changes</li>
<li>Submit a pull request</li>
</ul>
</li>
<li>
<p><strong>Deployment</strong></p>
<ul>
<li>Set up your production environment</li>
<li>Configure monitoring and alerts</li>
<li>Deploy the application</li>
<li>Monitor the deployment</li>
</ul>
</li>
<li>
<p><strong>Contributing</strong></p>
<ul>
<li>Read the <RouteLink to="/contributing.html">Contributing Guide</RouteLink></li>
<li>Follow the code style guide</li>
<li>Write documentation</li>
<li>Submit issues and pull requests</li>
</ul>
</li>
</ol>
</div></template>


