<template><div><h1 id="contributing-guide" tabindex="-1"><a class="header-anchor" href="#contributing-guide"><span>Contributing Guide</span></a></h1>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p>This guide provides comprehensive information about contributing to the FoodHouse project. It covers the development workflow, code standards, testing requirements, and submission process.</p>
<h2 id="getting-started" tabindex="-1"><a class="header-anchor" href="#getting-started"><span>Getting Started</span></a></h2>
<h3 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites"><span>Prerequisites</span></a></h3>
<ol>
<li>
<p><strong>Required Tools</strong></p>
<ul>
<li>Go 1.20+</li>
<li>Node.js 18+</li>
<li>Docker 20.10+</li>
<li>PostgreSQL 13+</li>
<li>Redis 6+</li>
<li>gRPC tools</li>
<li>Protocol Buffers compiler</li>
</ul>
</li>
<li>
<p><strong>Development Environment</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Clone repository</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/yourusername/foodhouse.git</span>
<span class="line"><span class="token builtin class-name">cd</span> foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Install Go dependencies</span></span>
<span class="line">go mod download</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Install Node.js dependencies</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Generate Protocol Buffers</span></span>
<span class="line"><span class="token function">make</span> proto</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Start development services</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="project-structure" tabindex="-1"><a class="header-anchor" href="#project-structure"><span>Project Structure</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">foodhouse/</span>
<span class="line">├── cmd/                    # Application entry points</span>
<span class="line">├── internal/              # Private application code</span>
<span class="line">│   ├── users/            # User service</span>
<span class="line">│   ├── products/         # Product service</span>
<span class="line">│   ├── orders/           # Order service</span>
<span class="line">│   └── payments/         # Payment service</span>
<span class="line">├── pkg/                   # Public library code</span>
<span class="line">├── protobuf/             # Protocol Buffer definitions</span>
<span class="line">├── web/                  # Frontend application</span>
<span class="line">└── docs/                 # Documentation</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="development-workflow" tabindex="-1"><a class="header-anchor" href="#development-workflow"><span>Development Workflow</span></a></h2>
<h3 id="branch-strategy" tabindex="-1"><a class="header-anchor" href="#branch-strategy"><span>Branch Strategy</span></a></h3>
<ol>
<li>
<p><strong>Main Branches</strong></p>
<ul>
<li><code v-pre>main</code>: Production-ready code</li>
<li><code v-pre>develop</code>: Integration branch for features</li>
</ul>
</li>
<li>
<p><strong>Supporting Branches</strong></p>
<ul>
<li><code v-pre>feature/*</code>: New features</li>
<li><code v-pre>bugfix/*</code>: Bug fixes</li>
<li><code v-pre>release/*</code>: Release preparation</li>
<li><code v-pre>hotfix/*</code>: Production fixes</li>
</ul>
</li>
</ol>
<h3 id="git-workflow" tabindex="-1"><a class="header-anchor" href="#git-workflow"><span>Git Workflow</span></a></h3>
<ol>
<li>
<p><strong>Creating a Feature Branch</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Create and switch to feature branch</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature/user-authentication</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Push branch to remote</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-u</span> origin feature/user-authentication</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Committing Changes</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Stage changes</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Commit with conventional commit message</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">"feat(auth): implement user authentication"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Push changes</span></span>
<span class="line"><span class="token function">git</span> push</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Updating Feature Branch</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Fetch latest changes</span></span>
<span class="line"><span class="token function">git</span> fetch origin</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Update develop branch</span></span>
<span class="line"><span class="token function">git</span> checkout develop</span>
<span class="line"><span class="token function">git</span> pull origin develop</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Update feature branch</span></span>
<span class="line"><span class="token function">git</span> checkout feature/user-authentication</span>
<span class="line"><span class="token function">git</span> rebase develop</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="code-review-process" tabindex="-1"><a class="header-anchor" href="#code-review-process"><span>Code Review Process</span></a></h3>
<ol>
<li>
<p><strong>Creating Pull Request</strong></p>
<ul>
<li>Use PR template</li>
<li>Link related issues</li>
<li>Add reviewers</li>
<li>Add labels</li>
</ul>
</li>
<li>
<p><strong>Review Checklist</strong></p>
<ul>
<li>Code style compliance</li>
<li>Test coverage</li>
<li>Documentation</li>
<li>Performance impact</li>
<li>Security considerations</li>
</ul>
</li>
<li>
<p><strong>Addressing Feedback</strong></p>
<ul>
<li>Respond to comments</li>
<li>Make requested changes</li>
<li>Update PR description</li>
<li>Request re-review</li>
</ul>
</li>
</ol>
<h2 id="code-standards" tabindex="-1"><a class="header-anchor" href="#code-standards"><span>Code Standards</span></a></h2>
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
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Package names</span></span>
<span class="line"><span class="token keyword">package</span> userservice</span>
<span class="line"></span>
<span class="line"><span class="token comment">// Interface names</span></span>
<span class="line"><span class="token keyword">type</span> UserRepository <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// ...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Function names</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">CreateUser</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// ...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Variable names</span></span>
<span class="line"><span class="token keyword">var</span> <span class="token punctuation">(</span></span>
<span class="line">    defaultTimeout <span class="token operator">=</span> <span class="token number">5</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second</span>
<span class="line">    maxRetries    <span class="token operator">=</span> <span class="token number">3</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Error Handling</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// Return errors</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>Service<span class="token punctuation">)</span> <span class="token function">DoSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"validation failed: %w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Check errors</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span><span class="token function">DoSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">    log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"failed to do something: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> err</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="javascript-code-style" tabindex="-1"><a class="header-anchor" href="#javascript-code-style"><span>JavaScript Code Style</span></a></h3>
<ol>
<li>
<p><strong>Formatting</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Format code</span></span>
<span class="line"><span class="token function">npm</span> run <span class="token function">format</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Run linter</span></span>
<span class="line"><span class="token function">npm</span> run lint</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Naming Conventions</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// Component names</span></span>
<span class="line"><span class="token keyword">const</span> UserProfile <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// ...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Function names</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">createUser</span><span class="token punctuation">(</span><span class="token parameter">userData</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// ...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Variable names</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">DEFAULT_TIMEOUT</span> <span class="token operator">=</span> <span class="token number">5000</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">MAX_RETRIES</span> <span class="token operator">=</span> <span class="token number">3</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Error Handling</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// Async/await</span></span>
<span class="line"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">await</span> <span class="token function">validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'Validation failed:'</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">throw</span> error</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Promises</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token function">validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">error</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'Validation failed:'</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span></span>
<span class="line">      <span class="token keyword">throw</span> error</span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="testing-requirements" tabindex="-1"><a class="header-anchor" href="#testing-requirements"><span>Testing Requirements</span></a></h2>
<h3 id="go-testing" tabindex="-1"><a class="header-anchor" href="#go-testing"><span>Go Testing</span></a></h3>
<ol>
<li>
<p><strong>Unit Tests</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">TestUserService_CreateUser</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Setup</span></span>
<span class="line">    mockRepo <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>MockUserRepository<span class="token punctuation">)</span></span>
<span class="line">    service <span class="token operator">:=</span> <span class="token function">NewUserService</span><span class="token punctuation">(</span>mockRepo<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Test cases</span></span>
<span class="line">    tests <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">        name    <span class="token builtin">string</span></span>
<span class="line">        user    <span class="token operator">*</span>User</span>
<span class="line">        wantErr <span class="token builtin">bool</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// ...</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Run tests</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> tt <span class="token operator">:=</span> <span class="token keyword">range</span> tests <span class="token punctuation">{</span></span>
<span class="line">        t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>tt<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token comment">// ...</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Integration Tests</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">TestUserRepository_Integration</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> testing<span class="token punctuation">.</span><span class="token function">Short</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        t<span class="token punctuation">.</span><span class="token function">Skip</span><span class="token punctuation">(</span><span class="token string">"skipping integration test"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Setup</span></span>
<span class="line">    db <span class="token operator">:=</span> <span class="token function">setupTestDB</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">defer</span> db<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    repo <span class="token operator">:=</span> <span class="token function">NewUserRepository</span><span class="token punctuation">(</span>db<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Run tests</span></span>
<span class="line">    <span class="token comment">// ...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="javascript-testing" tabindex="-1"><a class="header-anchor" href="#javascript-testing"><span>JavaScript Testing</span></a></h3>
<ol>
<li>
<p><strong>Component Tests</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'UserForm'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'submits form data correctly'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>UserForm<span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// ...</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Integration Tests</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'User Flow'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'completes user registration and login'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// ...</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="documentation" tabindex="-1"><a class="header-anchor" href="#documentation"><span>Documentation</span></a></h2>
<h3 id="code-documentation" tabindex="-1"><a class="header-anchor" href="#code-documentation"><span>Code Documentation</span></a></h3>
<ol>
<li>
<p><strong>Go Documentation</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// UserService handles user-related operations</span></span>
<span class="line"><span class="token keyword">type</span> UserService <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    repo UserRepository</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// CreateUser creates a new user</span></span>
<span class="line"><span class="token comment">// Returns error if user already exists</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>UserService<span class="token punctuation">)</span> <span class="token function">CreateUser</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// ...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>JavaScript Documentation</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token doc-comment comment">/**</span>
<span class="line"> * User service for handling user-related operations</span>
<span class="line"> */</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token doc-comment comment">/**</span>
<span class="line">   * Creates a new user</span>
<span class="line">   * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Object<span class="token punctuation">}</span></span> <span class="token parameter">userData</span> - User data</span>
<span class="line">   * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>Promise<span class="token punctuation">&lt;</span>User<span class="token punctuation">></span><span class="token punctuation">}</span></span> Created user</span>
<span class="line">   * <span class="token keyword">@throws</span> <span class="token class-name"><span class="token punctuation">{</span>Error<span class="token punctuation">}</span></span> If user already exists</span>
<span class="line">   */</span></span>
<span class="line">  <span class="token keyword">async</span> <span class="token function">createUser</span><span class="token punctuation">(</span><span class="token parameter">userData</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// ...</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="api-documentation" tabindex="-1"><a class="header-anchor" href="#api-documentation"><span>API Documentation</span></a></h3>
<ol>
<li>
<p><strong>OpenAPI/Swagger</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">openapi</span><span class="token punctuation">:</span> 3.0.0</span>
<span class="line"><span class="token key atrule">info</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">title</span><span class="token punctuation">:</span> FoodHouse API</span>
<span class="line">  <span class="token key atrule">version</span><span class="token punctuation">:</span> 1.0.0</span>
<span class="line"><span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">/users</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">post</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">summary</span><span class="token punctuation">:</span> Create user</span>
<span class="line">      <span class="token key atrule">requestBody</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">required</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">        <span class="token key atrule">content</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">application/json</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">schema</span><span class="token punctuation">:</span></span>
<span class="line">              <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/User'</span></span>
<span class="line">      <span class="token key atrule">responses</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">'201'</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">description</span><span class="token punctuation">:</span> User created</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>gRPC Documentation</strong></p>
<div class="language-protobuf line-numbers-mode" data-highlighter="prismjs" data-ext="protobuf"><pre v-pre><code><span class="line"><span class="token comment">// User service for managing users</span></span>
<span class="line"><span class="token keyword">service</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// CreateUser creates a new user</span></span>
<span class="line">  <span class="token keyword">rpc</span> <span class="token function">CreateUser</span><span class="token punctuation">(</span><span class="token class-name">CreateUserRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">option</span> <span class="token punctuation">(</span>google<span class="token punctuation">.</span>api<span class="token punctuation">.</span>http<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">      post<span class="token punctuation">:</span> <span class="token string">"/v1/users"</span></span>
<span class="line">      body<span class="token punctuation">:</span> <span class="token string">"*"</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="release-process" tabindex="-1"><a class="header-anchor" href="#release-process"><span>Release Process</span></a></h2>
<h3 id="versioning" tabindex="-1"><a class="header-anchor" href="#versioning"><span>Versioning</span></a></h3>
<ol>
<li>
<p><strong>Semantic Versioning</strong></p>
<ul>
<li>Major: Breaking changes</li>
<li>Minor: New features</li>
<li>Patch: Bug fixes</li>
</ul>
</li>
<li>
<p><strong>Version Tags</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Create version tag</span></span>
<span class="line"><span class="token function">git</span> tag <span class="token parameter variable">-a</span> v1.0.0 <span class="token parameter variable">-m</span> <span class="token string">"Release version 1.0.0"</span></span>
<span class="line"><span class="token function">git</span> push origin v1.0.0</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="release-checklist" tabindex="-1"><a class="header-anchor" href="#release-checklist"><span>Release Checklist</span></a></h3>
<ol>
<li>
<p><strong>Pre-release</strong></p>
<ul>
<li>Update version numbers</li>
<li>Update changelog</li>
<li>Run all tests</li>
<li>Check documentation</li>
</ul>
</li>
<li>
<p><strong>Release</strong></p>
<ul>
<li>Create release branch</li>
<li>Tag version</li>
<li>Build artifacts</li>
<li>Deploy to staging</li>
</ul>
</li>
<li>
<p><strong>Post-release</strong></p>
<ul>
<li>Deploy to production</li>
<li>Announce release</li>
<li>Monitor metrics</li>
</ul>
</li>
</ol>
<h2 id="security" tabindex="-1"><a class="header-anchor" href="#security"><span>Security</span></a></h2>
<h3 id="security-guidelines" tabindex="-1"><a class="header-anchor" href="#security-guidelines"><span>Security Guidelines</span></a></h3>
<ol>
<li>
<p><strong>Code Security</strong></p>
<ul>
<li>Input validation</li>
<li>Output sanitization</li>
<li>Error handling</li>
<li>Secure defaults</li>
</ul>
</li>
<li>
<p><strong>Authentication</strong></p>
<ul>
<li>JWT tokens</li>
<li>Password hashing</li>
<li>Rate limiting</li>
<li>Session management</li>
</ul>
</li>
<li>
<p><strong>Authorization</strong></p>
<ul>
<li>Role-based access</li>
<li>Resource ownership</li>
<li>Permission checks</li>
<li>Audit logging</li>
</ul>
</li>
</ol>
<h3 id="security-reporting" tabindex="-1"><a class="header-anchor" href="#security-reporting"><span>Security Reporting</span></a></h3>
<ol>
<li>
<p><strong>Vulnerability Reporting</strong></p>
<ul>
<li>Email: security@foodhouse.com</li>
<li>Bug bounty program</li>
<li>Responsible disclosure</li>
</ul>
</li>
<li>
<p><strong>Security Response</strong></p>
<ul>
<li>Acknowledge report</li>
<li>Assess severity</li>
<li>Fix vulnerability</li>
<li>Release patch</li>
</ul>
</li>
</ol>
<h2 id="community" tabindex="-1"><a class="header-anchor" href="#community"><span>Community</span></a></h2>
<h3 id="communication" tabindex="-1"><a class="header-anchor" href="#communication"><span>Communication</span></a></h3>
<ol>
<li>
<p><strong>Channels</strong></p>
<ul>
<li>GitHub Issues</li>
<li>GitHub Discussions</li>
<li>Slack workspace</li>
<li>Mailing list</li>
</ul>
</li>
<li>
<p><strong>Meetings</strong></p>
<ul>
<li>Weekly sync</li>
<li>Monthly review</li>
<li>Quarterly planning</li>
</ul>
</li>
</ol>
<h3 id="recognition" tabindex="-1"><a class="header-anchor" href="#recognition"><span>Recognition</span></a></h3>
<ol>
<li>
<p><strong>Contributor Levels</strong></p>
<ul>
<li>New contributor</li>
<li>Active contributor</li>
<li>Core contributor</li>
<li>Maintainer</li>
</ul>
</li>
<li>
<p><strong>Recognition Program</strong></p>
<ul>
<li>Contributor spotlight</li>
<li>Swag program</li>
<li>Conference opportunities</li>
</ul>
</li>
</ol>
<h2 id="resources" tabindex="-1"><a class="header-anchor" href="#resources"><span>Resources</span></a></h2>
<h3 id="documentation-1" tabindex="-1"><a class="header-anchor" href="#documentation-1"><span>Documentation</span></a></h3>
<ul>
<li><a href="https://github.com/yourusername/foodhouse/wiki" target="_blank" rel="noopener noreferrer">Project Wiki</a></li>
<li><a href="https://api.foodhouse.com/docs" target="_blank" rel="noopener noreferrer">API Documentation</a></li>
<li><a href="https://github.com/yourusername/foodhouse/wiki/Architecture" target="_blank" rel="noopener noreferrer">Architecture Guide</a></li>
</ul>
<h3 id="tools" tabindex="-1"><a class="header-anchor" href="#tools"><span>Tools</span></a></h3>
<ul>
<li><a href="https://github.com/yourusername/foodhouse/wiki/Development-Environment" target="_blank" rel="noopener noreferrer">Development Environment</a></li>
<li><a href="https://github.com/yourusername/foodhouse/wiki/Testing-Tools" target="_blank" rel="noopener noreferrer">Testing Tools</a></li>
<li><a href="https://github.com/yourusername/foodhouse/wiki/CI-CD" target="_blank" rel="noopener noreferrer">CI/CD Pipeline</a></li>
</ul>
<h3 id="training" tabindex="-1"><a class="header-anchor" href="#training"><span>Training</span></a></h3>
<ul>
<li><a href="https://github.com/yourusername/foodhouse/wiki/Onboarding" target="_blank" rel="noopener noreferrer">Onboarding Guide</a></li>
<li><a href="https://github.com/yourusername/foodhouse/wiki/Code-Review" target="_blank" rel="noopener noreferrer">Code Review Guide</a></li>
<li><a href="https://github.com/yourusername/foodhouse/wiki/Security" target="_blank" rel="noopener noreferrer">Security Training</a></li>
</ul>
</div></template>


