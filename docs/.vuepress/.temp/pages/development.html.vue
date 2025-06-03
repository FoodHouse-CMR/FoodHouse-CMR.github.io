<template><div><h1 id="development-guide" tabindex="-1"><a class="header-anchor" href="#development-guide"><span>Development Guide</span></a></h1>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p>This guide provides comprehensive instructions for developers working on the FoodHouse application. It covers the development environment setup, coding standards, testing procedures, and best practices.</p>
<h2 id="development-environment-setup" tabindex="-1"><a class="header-anchor" href="#development-environment-setup"><span>Development Environment Setup</span></a></h2>
<h3 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites"><span>Prerequisites</span></a></h3>
<ul>
<li>Go 1.20+</li>
<li>Node.js 18+</li>
<li>Docker 20.10+</li>
<li>PostgreSQL 13+</li>
<li>Redis 6+</li>
<li>gRPC tools</li>
<li>Protocol Buffers compiler</li>
</ul>
<h3 id="local-development-setup" tabindex="-1"><a class="header-anchor" href="#local-development-setup"><span>Local Development Setup</span></a></h3>
<ol>
<li>
<p><strong>Clone the Repository</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> clone https://github.com/foodhouse/foodhouseapp.git</span>
<span class="line"><span class="token builtin class-name">cd</span> foodhouseapp</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Install Dependencies</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Install Go dependencies</span></span>
<span class="line">go mod download</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Install Node.js dependencies</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Setup Development Database</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Start PostgreSQL</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> foodhouse-postgres <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_USER</span><span class="token operator">=</span>postgres <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_PASSWORD</span><span class="token operator">=</span>secret <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_DB</span><span class="token operator">=</span>foodhouse <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">5432</span>:5432 <span class="token punctuation">\</span></span>
<span class="line">  postgres:13</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Start Redis</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> foodhouse-redis <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token punctuation">\</span></span>
<span class="line">  redis:6</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Generate Protocol Buffers</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">make</span> proto</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ol>
<h2 id="project-structure" tabindex="-1"><a class="header-anchor" href="#project-structure"><span>Project Structure</span></a></h2>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">foodhouseapp/</span>
<span class="line">├── users/                 # User management service</span>
<span class="line">│   ├── cmd/              # Service entry points</span>
<span class="line">│   ├── internal/         # Internal packages</span>
<span class="line">│   │   ├── api/         # API handlers</span>
<span class="line">│   │   ├── models/      # Data models</span>
<span class="line">│   │   └── repository/  # Database layer</span>
<span class="line">│   └── pkg/             # Public packages</span>
<span class="line">├── products/             # Product management service</span>
<span class="line">├── orders/              # Order management service</span>
<span class="line">├── payments/            # Payment processing service</span>
<span class="line">├── protobuf/            # Protocol Buffer definitions</span>
<span class="line">└── docs/                # Documentation</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="coding-standards" tabindex="-1"><a class="header-anchor" href="#coding-standards"><span>Coding Standards</span></a></h2>
<h3 id="go-code-style" tabindex="-1"><a class="header-anchor" href="#go-code-style"><span>Go Code Style</span></a></h3>
<ol>
<li>
<p><strong>Formatting</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Format code</span></span>
<span class="line">go <span class="token function">fmt</span> ./<span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Run linter</span></span>
<span class="line">golangci-lint run</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Naming Conventions</strong></p>
<ul>
<li>Use camelCase for variable names</li>
<li>Use PascalCase for exported types and functions</li>
<li>Use snake_case for file names</li>
<li>Prefix interfaces with 'I' (e.g., IUserRepository)</li>
</ul>
</li>
<li>
<p><strong>Error Handling</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Good</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"failed to create user: %w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Bad</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> err</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Documentation</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// User represents a user in the system</span></span>
<span class="line"><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    ID        <span class="token builtin">string</span>    <span class="token string">`json:"id"`</span></span>
<span class="line">    Email     <span class="token builtin">string</span>    <span class="token string">`json:"email"`</span></span>
<span class="line">    CreatedAt time<span class="token punctuation">.</span>Time <span class="token string">`json:"created_at"`</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// CreateUser creates a new user</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>Service<span class="token punctuation">)</span> <span class="token function">CreateUser</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Implementation</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="testing-standards" tabindex="-1"><a class="header-anchor" href="#testing-standards"><span>Testing Standards</span></a></h3>
<ol>
<li>
<p><strong>Unit Tests</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">TestUserService_CreateUser</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    tests <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">        name    <span class="token builtin">string</span></span>
<span class="line">        user    <span class="token operator">*</span>User</span>
<span class="line">        wantErr <span class="token builtin">bool</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            name<span class="token punctuation">:</span> <span class="token string">"valid user"</span><span class="token punctuation">,</span></span>
<span class="line">            user<span class="token punctuation">:</span> <span class="token operator">&amp;</span>User<span class="token punctuation">{</span></span>
<span class="line">                Email<span class="token punctuation">:</span> <span class="token string">"test@example.com"</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">            wantErr<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            name<span class="token punctuation">:</span> <span class="token string">"invalid email"</span><span class="token punctuation">,</span></span>
<span class="line">            user<span class="token punctuation">:</span> <span class="token operator">&amp;</span>User<span class="token punctuation">{</span></span>
<span class="line">                Email<span class="token punctuation">:</span> <span class="token string">"invalid-email"</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">            wantErr<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> tt <span class="token operator">:=</span> <span class="token keyword">range</span> tests <span class="token punctuation">{</span></span>
<span class="line">        t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>tt<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token comment">// Test implementation</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Integration Tests</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">TestUserService_Integration</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> testing<span class="token punctuation">.</span><span class="token function">Short</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        t<span class="token punctuation">.</span><span class="token function">Skip</span><span class="token punctuation">(</span><span class="token string">"skipping integration test"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Setup test database</span></span>
<span class="line">    db <span class="token operator">:=</span> <span class="token function">setupTestDB</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">defer</span> db<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Run tests</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Mocking</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// mock_user_repository.go</span></span>
<span class="line"><span class="token keyword">type</span> MockUserRepository <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    mock<span class="token punctuation">.</span>Mock</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>MockUserRepository<span class="token punctuation">)</span> <span class="token function">Create</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    args <span class="token operator">:=</span> m<span class="token punctuation">.</span><span class="token function">Called</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> user<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> args<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="api-development" tabindex="-1"><a class="header-anchor" href="#api-development"><span>API Development</span></a></h2>
<h3 id="grpc-service-implementation" tabindex="-1"><a class="header-anchor" href="#grpc-service-implementation"><span>gRPC Service Implementation</span></a></h3>
<ol>
<li>
<p><strong>Service Definition</strong></p>
<div class="language-protobuf line-numbers-mode" data-highlighter="prismjs" data-ext="protobuf"><pre v-pre><code><span class="line"><span class="token keyword">service</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">rpc</span> <span class="token function">CreateUser</span><span class="token punctuation">(</span><span class="token class-name">CreateUserRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">CreateUserResponse</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">rpc</span> <span class="token function">GetUser</span><span class="token punctuation">(</span><span class="token class-name">GetUserRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">GetUserResponse</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Service Implementation</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> userService <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    pb<span class="token punctuation">.</span>UnimplementedUserServiceServer</span>
<span class="line">    repo IUserRepository</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>userService<span class="token punctuation">)</span> <span class="token function">CreateUser</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> req <span class="token operator">*</span>pb<span class="token punctuation">.</span>CreateUserRequest<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>pb<span class="token punctuation">.</span>CreateUserResponse<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    user <span class="token operator">:=</span> <span class="token operator">&amp;</span>User<span class="token punctuation">{</span></span>
<span class="line">        Email<span class="token punctuation">:</span> req<span class="token punctuation">.</span>Email<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span>repo<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> status<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>codes<span class="token punctuation">.</span>Internal<span class="token punctuation">,</span> <span class="token string">"failed to create user"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> <span class="token operator">&amp;</span>pb<span class="token punctuation">.</span>CreateUserResponse<span class="token punctuation">{</span></span>
<span class="line">        User<span class="token punctuation">:</span> <span class="token function">convertToProtoUser</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="rest-api-implementation" tabindex="-1"><a class="header-anchor" href="#rest-api-implementation"><span>REST API Implementation</span></a></h3>
<ol>
<li><strong>Handler Definition</strong><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> UserHandler <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    service IUserService</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>h <span class="token operator">*</span>UserHandler<span class="token punctuation">)</span> <span class="token function">CreateUser</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> req CreateUserRequest</span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">NewDecoder</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Decode</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>req<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"invalid request"</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    user<span class="token punctuation">,</span> err <span class="token operator">:=</span> h<span class="token punctuation">.</span>service<span class="token punctuation">.</span><span class="token function">CreateUser</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>req<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    json<span class="token punctuation">.</span><span class="token function">NewEncoder</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="database-development" tabindex="-1"><a class="header-anchor" href="#database-development"><span>Database Development</span></a></h2>
<h3 id="schema-migrations" tabindex="-1"><a class="header-anchor" href="#schema-migrations"><span>Schema Migrations</span></a></h3>
<ol>
<li>
<p><strong>Migration File Structure</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token comment">-- migrations/001_create_users_table.sql</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> users <span class="token punctuation">(</span></span>
<span class="line">    id UUID <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">DEFAULT</span> gen_random_uuid<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    email <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">UNIQUE</span><span class="token punctuation">,</span></span>
<span class="line">    created_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">WITH</span> <span class="token keyword">TIME</span> ZONE <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span><span class="token punctuation">,</span></span>
<span class="line">    updated_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">WITH</span> <span class="token keyword">TIME</span> ZONE <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- migrations/002_add_user_roles.sql</span></span>
<span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> users <span class="token keyword">ADD</span> <span class="token keyword">COLUMN</span> role <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">'user'</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Migration Management</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Create new migration</span></span>
<span class="line">migrate create <span class="token parameter variable">-ext</span> sql <span class="token parameter variable">-dir</span> migrations <span class="token parameter variable">-seq</span> add_user_roles</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Run migrations</span></span>
<span class="line">migrate <span class="token parameter variable">-path</span> migrations <span class="token parameter variable">-database</span> <span class="token string">"postgres://postgres:secret@localhost:5432/foodhouse?sslmode=disable"</span> up</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="repository-pattern" tabindex="-1"><a class="header-anchor" href="#repository-pattern"><span>Repository Pattern</span></a></h3>
<ol>
<li>
<p><strong>Interface Definition</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> IUserRepository <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">Create</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token builtin">error</span></span>
<span class="line">    <span class="token function">GetByID</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> id <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>User<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">Update</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token builtin">error</span></span>
<span class="line">    <span class="token function">Delete</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> id <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Implementation</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> UserRepository <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    db <span class="token operator">*</span>sql<span class="token punctuation">.</span>DB</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>UserRepository<span class="token punctuation">)</span> <span class="token function">Create</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    query <span class="token operator">:=</span> <span class="token string">`</span>
<span class="line">        INSERT INTO users (email, role)</span>
<span class="line">        VALUES ($1, $2)</span>
<span class="line">        RETURNING id, created_at, updated_at</span>
<span class="line">    `</span></span>
<span class="line">    <span class="token keyword">return</span> r<span class="token punctuation">.</span>db<span class="token punctuation">.</span><span class="token function">QueryRowContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> query<span class="token punctuation">,</span> user<span class="token punctuation">.</span>Email<span class="token punctuation">,</span> user<span class="token punctuation">.</span>Role<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span></span>
<span class="line">        <span class="token operator">&amp;</span>user<span class="token punctuation">.</span>ID<span class="token punctuation">,</span></span>
<span class="line">        <span class="token operator">&amp;</span>user<span class="token punctuation">.</span>CreatedAt<span class="token punctuation">,</span></span>
<span class="line">        <span class="token operator">&amp;</span>user<span class="token punctuation">.</span>UpdatedAt<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="frontend-development" tabindex="-1"><a class="header-anchor" href="#frontend-development"><span>Frontend Development</span></a></h2>
<h3 id="component-structure" tabindex="-1"><a class="header-anchor" href="#component-structure"><span>Component Structure</span></a></h3>
<ol>
<li>
<p><strong>Vue Component</strong></p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user-form<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">@submit.prevent</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleSubmit<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form-group<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>email<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Email<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span></span>
<span class="line">          <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>email<span class="token punctuation">"</span></span></span>
<span class="line">          <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>email<span class="token punctuation">"</span></span></span>
<span class="line">          <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>email<span class="token punctuation">"</span></span></span>
<span class="line">          <span class="token attr-name">required</span></span>
<span class="line">        <span class="token punctuation">></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Create User<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">email</span><span class="token operator">:</span> <span class="token string">''</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">async</span> <span class="token function">handleSubmit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$api<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">email</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>email <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'/users'</span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>$notify<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'Failed to create user'</span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css"></span>
<span class="line"><span class="token selector">.user-form</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">max-width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>API Integration</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// api/users.js</span></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> users <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">async</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">'/api/users'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'POST'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token string-property property">'Content-Type'</span><span class="token operator">:</span> <span class="token string">'application/json'</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>response<span class="token punctuation">.</span>ok<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'Failed to create user'</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="testing" tabindex="-1"><a class="header-anchor" href="#testing"><span>Testing</span></a></h2>
<h3 id="unit-testing" tabindex="-1"><a class="header-anchor" href="#unit-testing"><span>Unit Testing</span></a></h3>
<ol>
<li>
<p><strong>Go Tests</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">TestUserService_CreateUser</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    mockRepo <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>MockUserRepository<span class="token punctuation">)</span></span>
<span class="line">    service <span class="token operator">:=</span> <span class="token function">NewUserService</span><span class="token punctuation">(</span>mockRepo<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    user <span class="token operator">:=</span> <span class="token operator">&amp;</span>User<span class="token punctuation">{</span>Email<span class="token punctuation">:</span> <span class="token string">"test@example.com"</span><span class="token punctuation">}</span></span>
<span class="line">    mockRepo<span class="token punctuation">.</span><span class="token function">On</span><span class="token punctuation">(</span><span class="token string">"Create"</span><span class="token punctuation">,</span> mock<span class="token punctuation">.</span>Anything<span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Return</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    err <span class="token operator">:=</span> service<span class="token punctuation">.</span><span class="token function">CreateUser</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span></span>
<span class="line">    assert<span class="token punctuation">.</span><span class="token function">NoError</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    mockRepo<span class="token punctuation">.</span><span class="token function">AssertExpectations</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Vue Component Tests</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vue/test-utils'</span></span>
<span class="line"><span class="token keyword">import</span> UserForm <span class="token keyword">from</span> <span class="token string">'./UserForm.vue'</span></span>
<span class="line"></span>
<span class="line"><span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'UserForm'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'submits form data correctly'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>UserForm<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">const</span> email <span class="token operator">=</span> <span class="token string">'test@example.com'</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">'input[type="email"]'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">'form'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">'submit'</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">emitted</span><span class="token punctuation">(</span><span class="token string">'submit'</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span> email <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="integration-testing" tabindex="-1"><a class="header-anchor" href="#integration-testing"><span>Integration Testing</span></a></h3>
<ol>
<li>
<p><strong>API Tests</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">TestUserAPI_CreateUser</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    server <span class="token operator">:=</span> <span class="token function">setupTestServer</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">defer</span> server<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">Post</span><span class="token punctuation">(</span></span>
<span class="line">        server<span class="token punctuation">.</span>URL<span class="token operator">+</span><span class="token string">"/api/users"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"application/json"</span><span class="token punctuation">,</span></span>
<span class="line">        strings<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span><span class="token string">`{"email":"test@example.com"}`</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line">    assert<span class="token punctuation">.</span><span class="token function">NoError</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    assert<span class="token punctuation">.</span><span class="token function">Equal</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusCreated<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>StatusCode<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> user User</span>
<span class="line">    err <span class="token operator">=</span> json<span class="token punctuation">.</span><span class="token function">NewDecoder</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Decode</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span></span>
<span class="line">    assert<span class="token punctuation">.</span><span class="token function">NoError</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    assert<span class="token punctuation">.</span><span class="token function">Equal</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> <span class="token string">"test@example.com"</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span>Email<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>End-to-End Tests</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'User Creation'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'creates a new user successfully'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">goto</span><span class="token punctuation">(</span><span class="token string">'http://localhost:3000/users/new'</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token string">'input[type="email"]'</span><span class="token punctuation">,</span> <span class="token string">'test@example.com'</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token string">'button[type="submit"]'</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">waitForNavigation</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">expect</span><span class="token punctuation">(</span>page<span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'http://localhost:3000/users'</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="performance-optimization" tabindex="-1"><a class="header-anchor" href="#performance-optimization"><span>Performance Optimization</span></a></h2>
<h3 id="database-optimization" tabindex="-1"><a class="header-anchor" href="#database-optimization"><span>Database Optimization</span></a></h3>
<ol>
<li>
<p><strong>Indexing</strong></p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token comment">-- Add indexes for frequently queried columns</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_users_email <span class="token keyword">ON</span> users<span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_users_created_at <span class="token keyword">ON</span> users<span class="token punctuation">(</span>created_at<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Query Optimization</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Use prepared statements</span></span>
<span class="line">stmt<span class="token punctuation">,</span> err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">PrepareContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token string">`</span>
<span class="line">    SELECT id, email, created_at</span>
<span class="line">    FROM users</span>
<span class="line">    WHERE email = $1</span>
<span class="line">`</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">defer</span> stmt<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="caching" tabindex="-1"><a class="header-anchor" href="#caching"><span>Caching</span></a></h3>
<ol>
<li>
<p><strong>Redis Caching</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>UserService<span class="token punctuation">)</span> <span class="token function">GetUser</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> id <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>User<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Try to get from cache</span></span>
<span class="line">    <span class="token keyword">if</span> user<span class="token punctuation">,</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span>cache<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token string">"user:"</span><span class="token operator">+</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> user<span class="token punctuation">,</span> <span class="token boolean">nil</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Get from database</span></span>
<span class="line">    user<span class="token punctuation">,</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span>repo<span class="token punctuation">.</span><span class="token function">GetByID</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> id<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Cache the result</span></span>
<span class="line">    s<span class="token punctuation">.</span>cache<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token string">"user:"</span><span class="token operator">+</span>id<span class="token punctuation">,</span> user<span class="token punctuation">,</span> time<span class="token punctuation">.</span>Hour<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> user<span class="token punctuation">,</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Frontend Caching</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// Cache API responses</span></span>
<span class="line"><span class="token keyword">const</span> cache <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> users <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">async</span> <span class="token function">get</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> key <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">user:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>cache<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> cache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/api/users/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">await</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    cache<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> user<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> user</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="security-best-practices" tabindex="-1"><a class="header-anchor" href="#security-best-practices"><span>Security Best Practices</span></a></h2>
<h3 id="authentication" tabindex="-1"><a class="header-anchor" href="#authentication"><span>Authentication</span></a></h3>
<ol>
<li>
<p><strong>JWT Implementation</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>UserService<span class="token punctuation">)</span> <span class="token function">GenerateToken</span><span class="token punctuation">(</span>user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    claims <span class="token operator">:=</span> jwt<span class="token punctuation">.</span>MapClaims<span class="token punctuation">{</span></span>
<span class="line">        <span class="token string">"sub"</span><span class="token punctuation">:</span> user<span class="token punctuation">.</span>ID<span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"email"</span><span class="token punctuation">:</span> user<span class="token punctuation">.</span>Email<span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"exp"</span><span class="token punctuation">:</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Hour <span class="token operator">*</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    token <span class="token operator">:=</span> jwt<span class="token punctuation">.</span><span class="token function">NewWithClaims</span><span class="token punctuation">(</span>jwt<span class="token punctuation">.</span>SigningMethodHS256<span class="token punctuation">,</span> claims<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> token<span class="token punctuation">.</span><span class="token function">SignedString</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>jwtSecret<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Middleware</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">AuthMiddleware</span><span class="token punctuation">(</span>next http<span class="token punctuation">.</span>Handler<span class="token punctuation">)</span> http<span class="token punctuation">.</span>Handler <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">HandlerFunc</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        token <span class="token operator">:=</span> r<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"Authorization"</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">if</span> token <span class="token operator">==</span> <span class="token string">""</span> <span class="token punctuation">{</span></span>
<span class="line">            http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"unauthorized"</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">return</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// Validate token</span></span>
<span class="line">        claims<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">validateToken</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">            http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"invalid token"</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">return</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// Add claims to context</span></span>
<span class="line">        ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithValue</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"claims"</span><span class="token punctuation">,</span> claims<span class="token punctuation">)</span></span>
<span class="line">        next<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">.</span><span class="token function">WithContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="data-validation" tabindex="-1"><a class="header-anchor" href="#data-validation"><span>Data Validation</span></a></h3>
<ol>
<li>
<p><strong>Input Validation</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> CreateUserRequest <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    Email    <span class="token builtin">string</span> <span class="token string">`json:"email" validate:"required,email"`</span></span>
<span class="line">    Password <span class="token builtin">string</span> <span class="token string">`json:"password" validate:"required,min=8"`</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>UserService<span class="token punctuation">)</span> <span class="token function">CreateUser</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> req <span class="token operator">*</span>CreateUserRequest<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> validator<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Struct</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"invalid request: %w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">// Process request</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Output Sanitization</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">sanitizeUser</span><span class="token punctuation">(</span>user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token operator">*</span>User <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token operator">&amp;</span>User<span class="token punctuation">{</span></span>
<span class="line">        ID<span class="token punctuation">:</span>        user<span class="token punctuation">.</span>ID<span class="token punctuation">,</span></span>
<span class="line">        Email<span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Email<span class="token punctuation">,</span></span>
<span class="line">        CreatedAt<span class="token punctuation">:</span> user<span class="token punctuation">.</span>CreatedAt<span class="token punctuation">,</span></span>
<span class="line">        <span class="token comment">// Exclude sensitive fields</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="deployment" tabindex="-1"><a class="header-anchor" href="#deployment"><span>Deployment</span></a></h2>
<h3 id="ci-cd-pipeline" tabindex="-1"><a class="header-anchor" href="#ci-cd-pipeline"><span>CI/CD Pipeline</span></a></h3>
<ol>
<li>
<p><strong>GitHub Actions Workflow</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> CI/CD</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> main <span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> main <span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">test</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2</span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run tests</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> make test</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">build</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">needs</span><span class="token punctuation">:</span> test</span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2</span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build Docker images</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> make docker<span class="token punctuation">-</span>build</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">deploy</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">needs</span><span class="token punctuation">:</span> build</span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2</span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to staging</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> make deploy<span class="token punctuation">-</span>staging</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Docker Build</strong></p>
<div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker"><pre v-pre><code><span class="line"><span class="token comment"># Dockerfile</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> golang:1.20-alpine <span class="token keyword">AS</span> builder</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> . .</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> go build -o server ./cmd/server</span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> alpine:latest</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /app/server .</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"./server"</span>]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="documentation" tabindex="-1"><a class="header-anchor" href="#documentation"><span>Documentation</span></a></h2>
<h3 id="code-documentation" tabindex="-1"><a class="header-anchor" href="#code-documentation"><span>Code Documentation</span></a></h3>
<ol>
<li>
<p><strong>Go Documentation</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Package users provides user management functionality</span></span>
<span class="line"><span class="token keyword">package</span> users</span>
<span class="line"></span>
<span class="line"><span class="token comment">// User represents a user in the system</span></span>
<span class="line"><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// ID is the unique identifier for the user</span></span>
<span class="line">    ID <span class="token builtin">string</span> <span class="token string">`json:"id"`</span></span>
<span class="line">    <span class="token comment">// Email is the user's email address</span></span>
<span class="line">    Email <span class="token builtin">string</span> <span class="token string">`json:"email"`</span></span>
<span class="line">    <span class="token comment">// CreatedAt is the timestamp when the user was created</span></span>
<span class="line">    CreatedAt time<span class="token punctuation">.</span>Time <span class="token string">`json:"created_at"`</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>API Documentation</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// @Summary Create a new user</span></span>
<span class="line"><span class="token comment">// @Description Create a new user with the provided information</span></span>
<span class="line"><span class="token comment">// @Tags users</span></span>
<span class="line"><span class="token comment">// @Accept json</span></span>
<span class="line"><span class="token comment">// @Produce json</span></span>
<span class="line"><span class="token comment">// @Param user body CreateUserRequest true "User information"</span></span>
<span class="line"><span class="token comment">// @Success 201 {object} User</span></span>
<span class="line"><span class="token comment">// @Failure 400 {object} Error</span></span>
<span class="line"><span class="token comment">// @Router /users [post]</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>h <span class="token operator">*</span>UserHandler<span class="token punctuation">)</span> <span class="token function">CreateUser</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Implementation</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="development-workflow" tabindex="-1"><a class="header-anchor" href="#development-workflow"><span>Development Workflow</span></a></h3>
<ol>
<li>
<p><strong>Branch Strategy</strong></p>
<ul>
<li><code v-pre>main</code> - Production-ready code</li>
<li><code v-pre>develop</code> - Development branch</li>
<li><code v-pre>feature/*</code> - Feature branches</li>
<li><code v-pre>bugfix/*</code> - Bug fix branches</li>
<li><code v-pre>release/*</code> - Release preparation branches</li>
</ul>
</li>
<li>
<p><strong>Commit Guidelines</strong></p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">feat: add user authentication</span>
<span class="line">fix: resolve database connection issue</span>
<span class="line">docs: update API documentation</span>
<span class="line">style: format code according to style guide</span>
<span class="line">refactor: restructure user service</span>
<span class="line">test: add unit tests for user creation</span>
<span class="line">chore: update dependencies</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Code Review Process</strong></p>
<ul>
<li>Create pull request</li>
<li>Request reviews from team members</li>
<li>Address review comments</li>
<li>Ensure CI passes</li>
<li>Merge after approval</li>
</ul>
</li>
</ol>
<h2 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting"><span>Troubleshooting</span></a></h2>
<h3 id="common-issues" tabindex="-1"><a class="header-anchor" href="#common-issues"><span>Common Issues</span></a></h3>
<ol>
<li>
<p><strong>Database Connection Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check database connection</span></span>
<span class="line">psql <span class="token parameter variable">-h</span> localhost <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> foodhouse <span class="token parameter variable">-c</span> <span class="token string">"\l"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check database logs</span></span>
<span class="line"><span class="token function">docker</span> logs foodhouse-postgres</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>gRPC Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check gRPC service</span></span>
<span class="line">grpcurl <span class="token parameter variable">-plaintext</span> localhost:8080 list</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Test gRPC method</span></span>
<span class="line">grpcurl <span class="token parameter variable">-plaintext</span> <span class="token parameter variable">-d</span> <span class="token string">'{"email":"test@example.com"}'</span> localhost:8080 UserService.CreateUser</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Frontend Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check frontend build</span></span>
<span class="line"><span class="token function">npm</span> run build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Run frontend tests</span></span>
<span class="line"><span class="token function">npm</span> run <span class="token builtin class-name">test</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="debugging" tabindex="-1"><a class="header-anchor" href="#debugging"><span>Debugging</span></a></h3>
<ol>
<li>
<p><strong>Go Debugging</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Add debug logging</span></span>
<span class="line">log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Creating user: %+v"</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Use debugger</span></span>
<span class="line">dlv debug <span class="token punctuation">.</span><span class="token operator">/</span>cmd<span class="token operator">/</span>server</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Frontend Debugging</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// Add debug logging</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'User data:'</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Use Vue DevTools</span></span>
<span class="line"><span class="token comment">// Install Vue DevTools browser extension</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="best-practices" tabindex="-1"><a class="header-anchor" href="#best-practices"><span>Best Practices</span></a></h2>
<h3 id="code-organization" tabindex="-1"><a class="header-anchor" href="#code-organization"><span>Code Organization</span></a></h3>
<ol>
<li>
<p><strong>Package Structure</strong></p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">users/</span>
<span class="line">├── cmd/</span>
<span class="line">│   └── server/</span>
<span class="line">│       └── main.go</span>
<span class="line">├── internal/</span>
<span class="line">│   ├── api/</span>
<span class="line">│   │   └── handler.go</span>
<span class="line">│   ├── service/</span>
<span class="line">│   │   └── service.go</span>
<span class="line">│   └── repository/</span>
<span class="line">│       └── repository.go</span>
<span class="line">└── pkg/</span>
<span class="line">    └── models/</span>
<span class="line">        └── user.go</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Dependency Injection</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> UserService <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    repo    IUserRepository</span>
<span class="line">    cache   ICache</span>
<span class="line">    logger  ILogger</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">NewUserService</span><span class="token punctuation">(</span>repo IUserRepository<span class="token punctuation">,</span> cache ICache<span class="token punctuation">,</span> logger ILogger<span class="token punctuation">)</span> <span class="token operator">*</span>UserService <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token operator">&amp;</span>UserService<span class="token punctuation">{</span></span>
<span class="line">        repo<span class="token punctuation">:</span>    repo<span class="token punctuation">,</span></span>
<span class="line">        cache<span class="token punctuation">:</span>   cache<span class="token punctuation">,</span></span>
<span class="line">        logger<span class="token punctuation">:</span>  logger<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="error-handling" tabindex="-1"><a class="header-anchor" href="#error-handling"><span>Error Handling</span></a></h3>
<ol>
<li>
<p><strong>Custom Errors</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> <span class="token punctuation">(</span></span>
<span class="line">    ErrUserNotFound <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"user not found"</span><span class="token punctuation">)</span></span>
<span class="line">    ErrInvalidEmail <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"invalid email"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>UserService<span class="token punctuation">)</span> <span class="token function">GetUser</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> id <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>User<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    user<span class="token punctuation">,</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span>repo<span class="token punctuation">.</span><span class="token function">GetByID</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> id<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">==</span> sql<span class="token punctuation">.</span>ErrNoRows <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> ErrUserNotFound</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"failed to get user: %w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> user<span class="token punctuation">,</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Error Wrapping</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>UserService<span class="token punctuation">)</span> <span class="token function">CreateUser</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span><span class="token function">validateUser</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"invalid user: %w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span>repo<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"failed to create user: %w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="logging" tabindex="-1"><a class="header-anchor" href="#logging"><span>Logging</span></a></h3>
<ol>
<li>
<p><strong>Structured Logging</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Logger <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    logger <span class="token operator">*</span>zap<span class="token punctuation">.</span>Logger</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>Logger<span class="token punctuation">)</span> <span class="token function">Info</span><span class="token punctuation">(</span>msg <span class="token builtin">string</span><span class="token punctuation">,</span> fields <span class="token operator">...</span>zap<span class="token punctuation">.</span>Field<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    l<span class="token punctuation">.</span>logger<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>msg<span class="token punctuation">,</span> fields<span class="token operator">...</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>Logger<span class="token punctuation">)</span> <span class="token function">Error</span><span class="token punctuation">(</span>msg <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">,</span> fields <span class="token operator">...</span>zap<span class="token punctuation">.</span>Field<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    l<span class="token punctuation">.</span>logger<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>msg<span class="token punctuation">,</span> <span class="token function">append</span><span class="token punctuation">(</span>fields<span class="token punctuation">,</span> zap<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">...</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Log Levels</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Debug - Detailed information for debugging</span></span>
<span class="line">logger<span class="token punctuation">.</span><span class="token function">Debug</span><span class="token punctuation">(</span><span class="token string">"Processing user request"</span><span class="token punctuation">,</span> zap<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"user_id"</span><span class="token punctuation">,</span> userID<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Info - General operational information</span></span>
<span class="line">logger<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"User created successfully"</span><span class="token punctuation">,</span> zap<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"user_id"</span><span class="token punctuation">,</span> userID<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Warn - Warning messages</span></span>
<span class="line">logger<span class="token punctuation">.</span><span class="token function">Warn</span><span class="token punctuation">(</span><span class="token string">"Failed to send welcome email"</span><span class="token punctuation">,</span> zap<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"user_id"</span><span class="token punctuation">,</span> userID<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Error - Error messages</span></span>
<span class="line">logger<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">"Failed to create user"</span><span class="token punctuation">,</span> zap<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="contributing" tabindex="-1"><a class="header-anchor" href="#contributing"><span>Contributing</span></a></h2>
<h3 id="development-process" tabindex="-1"><a class="header-anchor" href="#development-process"><span>Development Process</span></a></h3>
<ol>
<li>
<p><strong>Setup Development Environment</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Clone repository</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/foodhouse/foodhouseapp.git</span>
<span class="line"><span class="token builtin class-name">cd</span> foodhouseapp</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Install dependencies</span></span>
<span class="line"><span class="token function">make</span> setup</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Create Feature Branch</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature/user-authentication</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p><strong>Make Changes</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Make code changes</span></span>
<span class="line"><span class="token comment"># Run tests</span></span>
<span class="line"><span class="token function">make</span> <span class="token builtin class-name">test</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Format code</span></span>
<span class="line"><span class="token function">make</span> <span class="token function">fmt</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Run linter</span></span>
<span class="line"><span class="token function">make</span> lint</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Commit Changes</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">"feat: add user authentication"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Create Pull Request</strong></p>
<ul>
<li>Push changes to remote</li>
<li>Create pull request</li>
<li>Request reviews</li>
<li>Address feedback</li>
<li>Merge after approval</li>
</ul>
</li>
</ol>
<h3 id="code-review-guidelines" tabindex="-1"><a class="header-anchor" href="#code-review-guidelines"><span>Code Review Guidelines</span></a></h3>
<ol>
<li>
<p><strong>Review Checklist</strong></p>
<ul>
<li>[ ] Code follows style guide</li>
<li>[ ] Tests are included</li>
<li>[ ] Documentation is updated</li>
<li>[ ] No security vulnerabilities</li>
<li>[ ] Performance is considered</li>
<li>[ ] Error handling is proper</li>
<li>[ ] Logging is appropriate</li>
</ul>
</li>
<li>
<p><strong>Review Comments</strong></p>
<ul>
<li>Be constructive</li>
<li>Provide examples</li>
<li>Explain reasoning</li>
<li>Suggest improvements</li>
<li>Acknowledge good practices</li>
</ul>
</li>
</ol>
<h2 id="resources" tabindex="-1"><a class="header-anchor" href="#resources"><span>Resources</span></a></h2>
<h3 id="documentation-1" tabindex="-1"><a class="header-anchor" href="#documentation-1"><span>Documentation</span></a></h3>
<ul>
<li><a href="https://golang.org/doc/" target="_blank" rel="noopener noreferrer">Go Documentation</a></li>
<li><a href="https://vuejs.org/guide/introduction.html" target="_blank" rel="noopener noreferrer">Vue.js Documentation</a></li>
<li><a href="https://grpc.io/docs/" target="_blank" rel="noopener noreferrer">gRPC Documentation</a></li>
<li><a href="https://www.postgresql.org/docs/" target="_blank" rel="noopener noreferrer">PostgreSQL Documentation</a></li>
</ul>
<h3 id="tools" tabindex="-1"><a class="header-anchor" href="#tools"><span>Tools</span></a></h3>
<ul>
<li><a href="https://www.jetbrains.com/go/" target="_blank" rel="noopener noreferrer">GoLand</a></li>
<li><a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">VS Code</a></li>
<li><a href="https://www.postman.com/" target="_blank" rel="noopener noreferrer">Postman</a></li>
<li><a href="https://dbeaver.io/" target="_blank" rel="noopener noreferrer">DBeaver</a></li>
</ul>
<h3 id="learning-resources" tabindex="-1"><a class="header-anchor" href="#learning-resources"><span>Learning Resources</span></a></h3>
<ul>
<li><a href="https://gobyexample.com/" target="_blank" rel="noopener noreferrer">Go by Example</a></li>
<li><a href="https://vuejs.org/tutorial/" target="_blank" rel="noopener noreferrer">Vue.js Tutorial</a></li>
<li><a href="https://grpc.io/docs/tutorials/" target="_blank" rel="noopener noreferrer">gRPC Tutorial</a></li>
<li><a href="https://www.postgresql.org/docs/current/tutorial.html" target="_blank" rel="noopener noreferrer">PostgreSQL Tutorial</a></li>
</ul>
</div></template>


