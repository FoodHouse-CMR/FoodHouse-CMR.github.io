import{_ as p,c as o,b as t,d as n,e as a,f as l,w as i,g as c,a as r}from"./app-BQO2_VqH.js";const d={};function u(m,s){const e=c("RouteLink");return r(),o("div",null,[s[16]||(s[16]=t(`<h1 id="quick-start-guide" tabindex="-1"><a class="header-anchor" href="#quick-start-guide"><span>Quick Start Guide</span></a></h1><h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2><p>This guide provides a quick start to the FoodHouse application. It covers installation, configuration, and basic usage.</p><h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites"><span>Prerequisites</span></a></h2><ol><li><p><strong>Required Tools</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Check Go version</span></span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Required Accounts</strong></p><ul><li>GitHub account</li><li>Docker Hub account</li><li>AWS account (for production deployment)</li></ul></li></ol><h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2><ol><li><p><strong>Clone Repository</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Clone repository</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/foodhouse/foodhouse.git</span>
<span class="line"><span class="token builtin class-name">cd</span> foodhouse</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Install Dependencies</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Install Go dependencies</span></span>
<span class="line">go mod download</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Install Node.js dependencies</span></span>
<span class="line"><span class="token builtin class-name">cd</span> frontend</span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="line"><span class="token builtin class-name">cd</span> <span class="token punctuation">..</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Generate Protocol Buffers</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Install Protocol Buffers compiler</span></span>
<span class="line">go <span class="token function">install</span> google.golang.org/protobuf/cmd/protoc-gen-go@latest</span>
<span class="line">go <span class="token function">install</span> google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Generate Protocol Buffers</span></span>
<span class="line">protoc <span class="token parameter variable">--go_out</span><span class="token operator">=</span>. <span class="token parameter variable">--go_opt</span><span class="token operator">=</span>paths<span class="token operator">=</span>source_relative <span class="token punctuation">\\</span></span>
<span class="line">    --go-grpc_out<span class="token operator">=</span>. --go-grpc_opt<span class="token operator">=</span>paths<span class="token operator">=</span>source_relative <span class="token punctuation">\\</span></span>
<span class="line">    proto/*.proto</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration"><span>Configuration</span></a></h2><ol><li><p><strong>Environment Variables</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Copy environment file</span></span>
<span class="line"><span class="token function">cp</span> .env.example .env</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Edit environment file</span></span>
<span class="line"><span class="token function">vim</span> .env</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Database Setup</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Start PostgreSQL</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> postgres</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Run migrations</span></span>
<span class="line">go run cmd/migrate/main.go up</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Cache Setup</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Start Redis</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> redis</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Message Queue Setup</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Start RabbitMQ</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> rabbitmq</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="running-the-application" tabindex="-1"><a class="header-anchor" href="#running-the-application"><span>Running the Application</span></a></h2><ol><li><p><strong>Development Mode</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Start all services</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Start application</span></span>
<span class="line">go run cmd/api/main.go</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Production Mode</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Build application</span></span>
<span class="line"><span class="token function">docker-compose</span> build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Start application</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Kubernetes Deployment</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Apply Kubernetes manifests</span></span>
<span class="line">kubectl apply <span class="token parameter variable">-f</span> k8s/</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check deployment status</span></span>
<span class="line">kubectl get pods</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="basic-usage" tabindex="-1"><a class="header-anchor" href="#basic-usage"><span>Basic Usage</span></a></h2><ol><li><p><strong>User Management</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Create user</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8080/api/v1/users <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-d</span> <span class="token string">&#39;{</span>
<span class="line">        &quot;email&quot;: &quot;user@example.com&quot;,</span>
<span class="line">        &quot;password&quot;: &quot;password123&quot;,</span>
<span class="line">        &quot;first_name&quot;: &quot;John&quot;,</span>
<span class="line">        &quot;last_name&quot;: &quot;Doe&quot;</span>
<span class="line">    }&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Login</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8080/api/v1/auth/login <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-d</span> <span class="token string">&#39;{</span>
<span class="line">        &quot;email&quot;: &quot;user@example.com&quot;,</span>
<span class="line">        &quot;password&quot;: &quot;password123&quot;</span>
<span class="line">    }&#39;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Product Management</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Create product</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8080/api/v1/products <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">&quot;Authorization: Bearer &lt;token&gt;&quot;</span> <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-d</span> <span class="token string">&#39;{</span>
<span class="line">        &quot;name&quot;: &quot;Organic Apples&quot;,</span>
<span class="line">        &quot;description&quot;: &quot;Fresh organic apples&quot;,</span>
<span class="line">        &quot;price&quot;: 2.99,</span>
<span class="line">        &quot;category_id&quot;: &quot;1&quot;</span>
<span class="line">    }&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># List products</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> GET http://localhost:8080/api/v1/products <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">&quot;Authorization: Bearer &lt;token&gt;&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Order Management</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Create order</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8080/api/v1/orders <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">&quot;Authorization: Bearer &lt;token&gt;&quot;</span> <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-d</span> <span class="token string">&#39;{</span>
<span class="line">        &quot;items&quot;: [</span>
<span class="line">            {</span>
<span class="line">                &quot;product_id&quot;: &quot;1&quot;,</span>
<span class="line">                &quot;quantity&quot;: 2</span>
<span class="line">            }</span>
<span class="line">        ],</span>
<span class="line">        &quot;shipping_address_id&quot;: &quot;1&quot;</span>
<span class="line">    }&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># List orders</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> GET http://localhost:8080/api/v1/orders <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">&quot;Authorization: Bearer &lt;token&gt;&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Payment Processing</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Initiate payment</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8080/api/v1/payments <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">&quot;Authorization: Bearer &lt;token&gt;&quot;</span> <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-d</span> <span class="token string">&#39;{</span>
<span class="line">        &quot;order_id&quot;: &quot;1&quot;,</span>
<span class="line">        &quot;payment_method&quot;: &quot;credit_card&quot;,</span>
<span class="line">        &quot;amount&quot;: 5.98</span>
<span class="line">    }&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Confirm payment</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8080/api/v1/payments/1/confirm <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-H</span> <span class="token string">&quot;Authorization: Bearer &lt;token&gt;&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="development-workflow" tabindex="-1"><a class="header-anchor" href="#development-workflow"><span>Development Workflow</span></a></h2><ol><li><p><strong>Code Style</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Format Go code</span></span>
<span class="line">go <span class="token function">fmt</span> ./<span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Format frontend code</span></span>
<span class="line"><span class="token builtin class-name">cd</span> frontend</span>
<span class="line"><span class="token function">npm</span> run <span class="token function">format</span></span>
<span class="line"><span class="token builtin class-name">cd</span> <span class="token punctuation">..</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Testing</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Run Go tests</span></span>
<span class="line">go <span class="token builtin class-name">test</span> ./<span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Run frontend tests</span></span>
<span class="line"><span class="token builtin class-name">cd</span> frontend</span>
<span class="line"><span class="token function">npm</span> <span class="token builtin class-name">test</span></span>
<span class="line"><span class="token builtin class-name">cd</span> <span class="token punctuation">..</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Building</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Build Go application</span></span>
<span class="line">go build <span class="token parameter variable">-o</span> bin/api cmd/api/main.go</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Build frontend</span></span>
<span class="line"><span class="token builtin class-name">cd</span> frontend</span>
<span class="line"><span class="token function">npm</span> run build</span>
<span class="line"><span class="token builtin class-name">cd</span> <span class="token punctuation">..</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Docker Build</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Build Docker image</span></span>
<span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> foodhouse:latest <span class="token builtin class-name">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="monitoring" tabindex="-1"><a class="header-anchor" href="#monitoring"><span>Monitoring</span></a></h2><ol><li><p><strong>Application Metrics</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Check metrics</span></span>
<span class="line"><span class="token function">curl</span> http://localhost:9090/metrics</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Health Check</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Check health</span></span>
<span class="line"><span class="token function">curl</span> http://localhost:8080/health</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Logs</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Check application logs</span></span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting"><span>Troubleshooting</span></a></h2><ol><li><p><strong>Common Issues</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Check service status</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token function">ps</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check service logs</span></span>
<span class="line"><span class="token function">docker-compose</span> logs</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check service configuration</span></span>
<span class="line"><span class="token function">docker-compose</span> config</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Database Issues</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Check database connection</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> postgres psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check database logs</span></span>
<span class="line"><span class="token function">docker-compose</span> logs postgres</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Cache Issues</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Check Redis connection</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> redis redis-cli <span class="token function">ping</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check Redis logs</span></span>
<span class="line"><span class="token function">docker-compose</span> logs redis</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>Message Queue Issues</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Check RabbitMQ connection</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> rabbitmq rabbitmqctl status</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check RabbitMQ logs</span></span>
<span class="line"><span class="token function">docker-compose</span> logs rabbitmq</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="next-steps" tabindex="-1"><a class="header-anchor" href="#next-steps"><span>Next Steps</span></a></h2>`,20)),n("ol",null,[n("li",null,[s[8]||(s[8]=n("p",null,[n("strong",null,"Documentation")],-1)),n("ul",null,[n("li",null,[s[1]||(s[1]=a("Read the ")),l(e,{to:"/architecture.html"},{default:i(()=>s[0]||(s[0]=[a("Architecture Guide")])),_:1,__:[0]})]),n("li",null,[s[3]||(s[3]=a("Read the ")),l(e,{to:"/api-documentation.html"},{default:i(()=>s[2]||(s[2]=[a("API Documentation")])),_:1,__:[2]})]),n("li",null,[s[5]||(s[5]=a("Read the ")),l(e,{to:"/database-schema.html"},{default:i(()=>s[4]||(s[4]=[a("Database Schema")])),_:1,__:[4]})]),n("li",null,[s[7]||(s[7]=a("Read the ")),l(e,{to:"/deployment.html"},{default:i(()=>s[6]||(s[6]=[a("Deployment Guide")])),_:1,__:[6]})])])]),s[15]||(s[15]=t("<li><p><strong>Development</strong></p><ul><li>Set up your development environment</li><li>Create a new feature branch</li><li>Write tests for your changes</li><li>Submit a pull request</li></ul></li><li><p><strong>Deployment</strong></p><ul><li>Set up your production environment</li><li>Configure monitoring and alerts</li><li>Deploy the application</li><li>Monitor the deployment</li></ul></li>",2)),n("li",null,[s[14]||(s[14]=n("p",null,[n("strong",null,"Contributing")],-1)),n("ul",null,[n("li",null,[s[10]||(s[10]=a("Read the ")),l(e,{to:"/contributing.html"},{default:i(()=>s[9]||(s[9]=[a("Contributing Guide")])),_:1,__:[9]})]),s[11]||(s[11]=n("li",null,"Follow the code style guide",-1)),s[12]||(s[12]=n("li",null,"Write documentation",-1)),s[13]||(s[13]=n("li",null,"Submit issues and pull requests",-1))])])])])}const b=p(d,[["render",u]]),g=JSON.parse('{"path":"/get-started.html","title":"Get Started","lang":"en-US","frontmatter":{"title":"Get Started"},"headers":[{"level":2,"title":"Overview","slug":"overview","link":"#overview","children":[]},{"level":2,"title":"Prerequisites","slug":"prerequisites","link":"#prerequisites","children":[]},{"level":2,"title":"Installation","slug":"installation","link":"#installation","children":[]},{"level":2,"title":"Configuration","slug":"configuration","link":"#configuration","children":[]},{"level":2,"title":"Running the Application","slug":"running-the-application","link":"#running-the-application","children":[]},{"level":2,"title":"Basic Usage","slug":"basic-usage","link":"#basic-usage","children":[]},{"level":2,"title":"Development Workflow","slug":"development-workflow","link":"#development-workflow","children":[]},{"level":2,"title":"Monitoring","slug":"monitoring","link":"#monitoring","children":[]},{"level":2,"title":"Troubleshooting","slug":"troubleshooting","link":"#troubleshooting","children":[]},{"level":2,"title":"Next Steps","slug":"next-steps","link":"#next-steps","children":[]}],"git":{"updatedTime":1748990475000,"contributors":[{"name":"andojoks","username":"andojoks","email":"andojoks@gmail.com","commits":4,"url":"https://github.com/andojoks"}],"changelog":[{"hash":"1caefaa89d3d740642cd2a94b469bfb5049d9451","time":1748990475000,"email":"andojoks@gmail.com","author":"andojoks","message":"added in initial documentation pages"},{"hash":"d66806706af5e280f0e5abbad9675f8996526a60","time":1748987309000,"email":"andojoks@gmail.com","author":"andojoks","message":"final fix to hydration errors"},{"hash":"0c18329e2329d4cf0bbb682bec277fd741fa4289","time":1748538027000,"email":"andojoks@gmail.com","author":"andojoks","message":"added global authentication"},{"hash":"ae1c11349aa2c2d0dd55cd005d516d5a713f542c","time":1748299561000,"email":"andojoks@gmail.com","author":"andojoks","message":"initial commit"}]},"filePathRelative":"get-started.md"}');export{b as comp,g as data};
