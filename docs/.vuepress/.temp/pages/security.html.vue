<template><div><h1 id="security-guide" tabindex="-1"><a class="header-anchor" href="#security-guide"><span>Security Guide</span></a></h1>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p>This guide provides comprehensive information about security measures implemented in the FoodHouse application. It covers authentication, authorization, data protection, API security, and infrastructure security.</p>
<h2 id="authentication" tabindex="-1"><a class="header-anchor" href="#authentication"><span>Authentication</span></a></h2>
<h3 id="jwt-authentication" tabindex="-1"><a class="header-anchor" href="#jwt-authentication"><span>JWT Authentication</span></a></h3>
<ol>
<li>
<p><strong>Token Generation</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>UserService<span class="token punctuation">)</span> <span class="token function">GenerateToken</span><span class="token punctuation">(</span>user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    claims <span class="token operator">:=</span> jwt<span class="token punctuation">.</span>MapClaims<span class="token punctuation">{</span></span>
<span class="line">        <span class="token string">"sub"</span><span class="token punctuation">:</span> user<span class="token punctuation">.</span>ID<span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"email"</span><span class="token punctuation">:</span> user<span class="token punctuation">.</span>Email<span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"role"</span><span class="token punctuation">:</span> user<span class="token punctuation">.</span>Role<span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"exp"</span><span class="token punctuation">:</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Hour <span class="token operator">*</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"iat"</span><span class="token punctuation">:</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    token <span class="token operator">:=</span> jwt<span class="token punctuation">.</span><span class="token function">NewWithClaims</span><span class="token punctuation">(</span>jwt<span class="token punctuation">.</span>SigningMethodHS256<span class="token punctuation">,</span> claims<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> token<span class="token punctuation">.</span><span class="token function">SignedString</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>jwtSecret<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Token Validation</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">validateToken</span><span class="token punctuation">(</span>tokenString <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>jwt<span class="token punctuation">.</span>Token<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> jwt<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>tokenString<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>token <span class="token operator">*</span>jwt<span class="token punctuation">.</span>Token<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> token<span class="token punctuation">.</span>Method<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>jwt<span class="token punctuation">.</span>SigningMethodHMAC<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"unexpected signing method: %v"</span><span class="token punctuation">,</span> token<span class="token punctuation">.</span>Header<span class="token punctuation">[</span><span class="token string">"alg"</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>jwtSecret<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="oauth2-integration" tabindex="-1"><a class="header-anchor" href="#oauth2-integration"><span>OAuth2 Integration</span></a></h3>
<ol>
<li>
<p><strong>OAuth2 Configuration</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> oauth2Config <span class="token operator">=</span> <span class="token operator">&amp;</span>oauth2<span class="token punctuation">.</span>Config<span class="token punctuation">{</span></span>
<span class="line">    ClientID<span class="token punctuation">:</span>     os<span class="token punctuation">.</span><span class="token function">Getenv</span><span class="token punctuation">(</span><span class="token string">"OAUTH_CLIENT_ID"</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    ClientSecret<span class="token punctuation">:</span> os<span class="token punctuation">.</span><span class="token function">Getenv</span><span class="token punctuation">(</span><span class="token string">"OAUTH_CLIENT_SECRET"</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    RedirectURL<span class="token punctuation">:</span>  <span class="token string">"http://localhost:8080/oauth/callback"</span><span class="token punctuation">,</span></span>
<span class="line">    Scopes<span class="token punctuation">:</span>       <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"email"</span><span class="token punctuation">,</span> <span class="token string">"profile"</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    Endpoint<span class="token punctuation">:</span>     google<span class="token punctuation">.</span>Endpoint<span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>OAuth2 Handler</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>h <span class="token operator">*</span>AuthHandler<span class="token punctuation">)</span> <span class="token function">OAuthCallback</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    code <span class="token operator">:=</span> r<span class="token punctuation">.</span>URL<span class="token punctuation">.</span><span class="token function">Query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"code"</span><span class="token punctuation">)</span></span>
<span class="line">    token<span class="token punctuation">,</span> err <span class="token operator">:=</span> oauth2Config<span class="token punctuation">.</span><span class="token function">Exchange</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> code<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"Failed to exchange token"</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Get user info</span></span>
<span class="line">    client <span class="token operator">:=</span> oauth2Config<span class="token punctuation">.</span><span class="token function">Client</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> token<span class="token punctuation">)</span></span>
<span class="line">    resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"https://www.googleapis.com/oauth2/v2/userinfo"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"Failed to get user info"</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">defer</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Process user info and create session</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="authorization" tabindex="-1"><a class="header-anchor" href="#authorization"><span>Authorization</span></a></h2>
<h3 id="role-based-access-control-rbac" tabindex="-1"><a class="header-anchor" href="#role-based-access-control-rbac"><span>Role-Based Access Control (RBAC)</span></a></h3>
<ol>
<li>
<p><strong>Role Definitions</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Role <span class="token builtin">string</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token punctuation">(</span></span>
<span class="line">    RoleAdmin    Role <span class="token operator">=</span> <span class="token string">"admin"</span></span>
<span class="line">    RoleMerchant Role <span class="token operator">=</span> <span class="token string">"merchant"</span></span>
<span class="line">    RoleCustomer Role <span class="token operator">=</span> <span class="token string">"customer"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Permission <span class="token builtin">string</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token punctuation">(</span></span>
<span class="line">    PermissionCreateProduct Permission <span class="token operator">=</span> <span class="token string">"create:product"</span></span>
<span class="line">    PermissionUpdateProduct Permission <span class="token operator">=</span> <span class="token string">"update:product"</span></span>
<span class="line">    PermissionDeleteProduct Permission <span class="token operator">=</span> <span class="token string">"delete:product"</span></span>
<span class="line">    PermissionViewOrders    Permission <span class="token operator">=</span> <span class="token string">"view:orders"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Permission Check</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>UserService<span class="token punctuation">)</span> <span class="token function">HasPermission</span><span class="token punctuation">(</span>userID <span class="token builtin">string</span><span class="token punctuation">,</span> permission Permission<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">bool</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    user<span class="token punctuation">,</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span>repo<span class="token punctuation">.</span><span class="token function">GetByID</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> userID<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">,</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Get role permissions</span></span>
<span class="line">    permissions<span class="token punctuation">,</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span><span class="token function">getRolePermissions</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>Role<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">,</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Check if user has permission</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> p <span class="token operator">:=</span> <span class="token keyword">range</span> permissions <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> p <span class="token operator">==</span> permission <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">nil</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="middleware-implementation" tabindex="-1"><a class="header-anchor" href="#middleware-implementation"><span>Middleware Implementation</span></a></h3>
<ol>
<li>
<p><strong>Auth Middleware</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">AuthMiddleware</span><span class="token punctuation">(</span>next http<span class="token punctuation">.</span>Handler<span class="token punctuation">)</span> http<span class="token punctuation">.</span>Handler <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">HandlerFunc</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        token <span class="token operator">:=</span> r<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"Authorization"</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">if</span> token <span class="token operator">==</span> <span class="token string">""</span> <span class="token punctuation">{</span></span>
<span class="line">            http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"unauthorized"</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">return</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        claims<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">validateToken</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">            http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"invalid token"</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">return</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithValue</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"claims"</span><span class="token punctuation">,</span> claims<span class="token punctuation">)</span></span>
<span class="line">        next<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">.</span><span class="token function">WithContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Permission Middleware</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">RequirePermission</span><span class="token punctuation">(</span>permission Permission<span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>Handler<span class="token punctuation">)</span> http<span class="token punctuation">.</span>Handler <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>next http<span class="token punctuation">.</span>Handler<span class="token punctuation">)</span> http<span class="token punctuation">.</span>Handler <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">HandlerFunc</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            claims <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Value</span><span class="token punctuation">(</span><span class="token string">"claims"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span>jwt<span class="token punctuation">.</span>MapClaims<span class="token punctuation">)</span></span>
<span class="line">            userID <span class="token operator">:=</span> claims<span class="token punctuation">[</span><span class="token string">"sub"</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">            hasPermission<span class="token punctuation">,</span> err <span class="token operator">:=</span> userService<span class="token punctuation">.</span><span class="token function">HasPermission</span><span class="token punctuation">(</span>userID<span class="token punctuation">,</span> permission<span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">||</span> <span class="token operator">!</span>hasPermission <span class="token punctuation">{</span></span>
<span class="line">                http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"forbidden"</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusForbidden<span class="token punctuation">)</span></span>
<span class="line">                <span class="token keyword">return</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">            next<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="data-protection" tabindex="-1"><a class="header-anchor" href="#data-protection"><span>Data Protection</span></a></h2>
<h3 id="encryption" tabindex="-1"><a class="header-anchor" href="#encryption"><span>Encryption</span></a></h3>
<ol>
<li>
<p><strong>Data Encryption</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Encryptor <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    key <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>Encryptor<span class="token punctuation">)</span> <span class="token function">Encrypt</span><span class="token punctuation">(</span>data <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    block<span class="token punctuation">,</span> err <span class="token operator">:=</span> aes<span class="token punctuation">.</span><span class="token function">NewCipher</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>key<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    gcm<span class="token punctuation">,</span> err <span class="token operator">:=</span> cipher<span class="token punctuation">.</span><span class="token function">NewGCM</span><span class="token punctuation">(</span>block<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    nonce <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> gcm<span class="token punctuation">.</span><span class="token function">NonceSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span>Reader<span class="token punctuation">,</span> nonce<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> gcm<span class="token punctuation">.</span><span class="token function">Seal</span><span class="token punctuation">(</span>nonce<span class="token punctuation">,</span> nonce<span class="token punctuation">,</span> data<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Data Decryption</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>Encryptor<span class="token punctuation">)</span> <span class="token function">Decrypt</span><span class="token punctuation">(</span>data <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    block<span class="token punctuation">,</span> err <span class="token operator">:=</span> aes<span class="token punctuation">.</span><span class="token function">NewCipher</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>key<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    gcm<span class="token punctuation">,</span> err <span class="token operator">:=</span> cipher<span class="token punctuation">.</span><span class="token function">NewGCM</span><span class="token punctuation">(</span>block<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    nonceSize <span class="token operator">:=</span> gcm<span class="token punctuation">.</span><span class="token function">NonceSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">&lt;</span> nonceSize <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"ciphertext too short"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    nonce<span class="token punctuation">,</span> ciphertext <span class="token operator">:=</span> data<span class="token punctuation">[</span><span class="token punctuation">:</span>nonceSize<span class="token punctuation">]</span><span class="token punctuation">,</span> data<span class="token punctuation">[</span>nonceSize<span class="token punctuation">:</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token keyword">return</span> gcm<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">,</span> nonce<span class="token punctuation">,</span> ciphertext<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="password-hashing" tabindex="-1"><a class="header-anchor" href="#password-hashing"><span>Password Hashing</span></a></h3>
<ol>
<li>
<p><strong>Password Hashing</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">HashPassword</span><span class="token punctuation">(</span>password <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    bytes<span class="token punctuation">,</span> err <span class="token operator">:=</span> bcrypt<span class="token punctuation">.</span><span class="token function">GenerateFromPassword</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>password<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token function">string</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">,</span> err</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Password Verification</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">CheckPasswordHash</span><span class="token punctuation">(</span>password<span class="token punctuation">,</span> hash <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span></span>
<span class="line">    err <span class="token operator">:=</span> bcrypt<span class="token punctuation">.</span><span class="token function">CompareHashAndPassword</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>hash<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>password<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> err <span class="token operator">==</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="api-security" tabindex="-1"><a class="header-anchor" href="#api-security"><span>API Security</span></a></h2>
<h3 id="rate-limiting" tabindex="-1"><a class="header-anchor" href="#rate-limiting"><span>Rate Limiting</span></a></h3>
<ol>
<li>
<p><strong>Rate Limiter Implementation</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> RateLimiter <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    redis <span class="token operator">*</span>redis<span class="token punctuation">.</span>Client</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>rl <span class="token operator">*</span>RateLimiter<span class="token punctuation">)</span> <span class="token function">IsAllowed</span><span class="token punctuation">(</span>key <span class="token builtin">string</span><span class="token punctuation">,</span> limit <span class="token builtin">int</span><span class="token punctuation">,</span> window time<span class="token punctuation">.</span>Duration<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">bool</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    current <span class="token operator">:=</span> rl<span class="token punctuation">.</span>redis<span class="token punctuation">.</span><span class="token function">Incr</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Val</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> current <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span></span>
<span class="line">        rl<span class="token punctuation">.</span>redis<span class="token punctuation">.</span><span class="token function">Expire</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> window<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> current <span class="token operator">&lt;=</span> <span class="token function">int64</span><span class="token punctuation">(</span>limit<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Rate Limiter Middleware</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">RateLimit</span><span class="token punctuation">(</span>limit <span class="token builtin">int</span><span class="token punctuation">,</span> window time<span class="token punctuation">.</span>Duration<span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>Handler<span class="token punctuation">)</span> http<span class="token punctuation">.</span>Handler <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>next http<span class="token punctuation">.</span>Handler<span class="token punctuation">)</span> http<span class="token punctuation">.</span>Handler <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">HandlerFunc</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            key <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"ratelimit:%s"</span><span class="token punctuation">,</span> r<span class="token punctuation">.</span>RemoteAddr<span class="token punctuation">)</span></span>
<span class="line">            allowed<span class="token punctuation">,</span> err <span class="token operator">:=</span> rateLimiter<span class="token punctuation">.</span><span class="token function">IsAllowed</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> limit<span class="token punctuation">,</span> window<span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">||</span> <span class="token operator">!</span>allowed <span class="token punctuation">{</span></span>
<span class="line">                http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"too many requests"</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusTooManyRequests<span class="token punctuation">)</span></span>
<span class="line">                <span class="token keyword">return</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            next<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="input-validation" tabindex="-1"><a class="header-anchor" href="#input-validation"><span>Input Validation</span></a></h3>
<ol>
<li>
<p><strong>Request Validation</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> CreateUserRequest <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    Email    <span class="token builtin">string</span> <span class="token string">`json:"email" validate:"required,email"`</span></span>
<span class="line">    Password <span class="token builtin">string</span> <span class="token string">`json:"password" validate:"required,min=8"`</span></span>
<span class="line">    Role     <span class="token builtin">string</span> <span class="token string">`json:"role" validate:"required,oneof=admin merchant customer"`</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>h <span class="token operator">*</span>UserHandler<span class="token punctuation">)</span> <span class="token function">CreateUser</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> req CreateUserRequest</span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">NewDecoder</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Decode</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>req<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"invalid request"</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> validator<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Struct</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Process request</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>SQL Injection Prevention</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>UserRepository<span class="token punctuation">)</span> <span class="token function">GetByEmail</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> email <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>User<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    query <span class="token operator">:=</span> <span class="token string">`</span>
<span class="line">        SELECT id, email, role, created_at</span>
<span class="line">        FROM users</span>
<span class="line">        WHERE email = $1</span>
<span class="line">    `</span></span>
<span class="line">    <span class="token keyword">var</span> user User</span>
<span class="line">    err <span class="token operator">:=</span> r<span class="token punctuation">.</span>db<span class="token punctuation">.</span><span class="token function">QueryRowContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> query<span class="token punctuation">,</span> email<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span></span>
<span class="line">        <span class="token operator">&amp;</span>user<span class="token punctuation">.</span>ID<span class="token punctuation">,</span></span>
<span class="line">        <span class="token operator">&amp;</span>user<span class="token punctuation">.</span>Email<span class="token punctuation">,</span></span>
<span class="line">        <span class="token operator">&amp;</span>user<span class="token punctuation">.</span>Role<span class="token punctuation">,</span></span>
<span class="line">        <span class="token operator">&amp;</span>user<span class="token punctuation">.</span>CreatedAt<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token operator">&amp;</span>user<span class="token punctuation">,</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="infrastructure-security" tabindex="-1"><a class="header-anchor" href="#infrastructure-security"><span>Infrastructure Security</span></a></h2>
<h3 id="network-security" tabindex="-1"><a class="header-anchor" href="#network-security"><span>Network Security</span></a></h3>
<ol>
<li>
<p><strong>Network Policies</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> NetworkPolicy</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> foodhouse<span class="token punctuation">-</span>network<span class="token punctuation">-</span>policy</span>
<span class="line">  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">podSelector</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">app</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line">  <span class="token key atrule">policyTypes</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> Ingress</span>
<span class="line">  <span class="token punctuation">-</span> Egress</span>
<span class="line">  <span class="token key atrule">ingress</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">from</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">namespaceSelector</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">name</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>nginx</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP</span>
<span class="line">      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span></span>
<span class="line">  <span class="token key atrule">egress</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">to</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">namespaceSelector</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">name</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP</span>
<span class="line">      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">53</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>SSL/TLS Configuration</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> cert<span class="token punctuation">-</span>manager.io/v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> Certificate</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> foodhouse<span class="token punctuation">-</span>cert</span>
<span class="line">  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">secretName</span><span class="token punctuation">:</span> foodhouse<span class="token punctuation">-</span>tls</span>
<span class="line">  <span class="token key atrule">issuerRef</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> letsencrypt<span class="token punctuation">-</span>prod</span>
<span class="line">    <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterIssuer</span>
<span class="line">  <span class="token key atrule">dnsNames</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> api.foodhouse.com</span>
<span class="line">    <span class="token punctuation">-</span> www.foodhouse.com</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="container-security" tabindex="-1"><a class="header-anchor" href="#container-security"><span>Container Security</span></a></h3>
<ol>
<li>
<p><strong>Security Context</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> users</span>
<span class="line">  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">template</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">securityContext</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">runAsNonRoot</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">        <span class="token key atrule">runAsUser</span><span class="token punctuation">:</span> <span class="token number">1000</span></span>
<span class="line">        <span class="token key atrule">runAsGroup</span><span class="token punctuation">:</span> <span class="token number">1000</span></span>
<span class="line">      <span class="token key atrule">containers</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> users</span>
<span class="line">        <span class="token key atrule">securityContext</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">allowPrivilegeEscalation</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line">          <span class="token key atrule">capabilities</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">drop</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> ALL</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Pod Security Policies</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> policy/v1beta1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> PodSecurityPolicy</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> foodhouse<span class="token punctuation">-</span>psp</span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line">  <span class="token key atrule">seLinux</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">rule</span><span class="token punctuation">:</span> RunAsAny</span>
<span class="line">  <span class="token key atrule">runAsUser</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">rule</span><span class="token punctuation">:</span> MustRunAsNonRoot</span>
<span class="line">  <span class="token key atrule">fsGroup</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">rule</span><span class="token punctuation">:</span> MustRunAs</span>
<span class="line">    <span class="token key atrule">ranges</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">min</span><span class="token punctuation">:</span> <span class="token number">1</span></span>
<span class="line">      <span class="token key atrule">max</span><span class="token punctuation">:</span> <span class="token number">65535</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="security-monitoring" tabindex="-1"><a class="header-anchor" href="#security-monitoring"><span>Security Monitoring</span></a></h2>
<h3 id="logging" tabindex="-1"><a class="header-anchor" href="#logging"><span>Logging</span></a></h3>
<ol>
<li>
<p><strong>Security Event Logging</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> SecurityLogger <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    logger <span class="token operator">*</span>zap<span class="token punctuation">.</span>Logger</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>SecurityLogger<span class="token punctuation">)</span> <span class="token function">LogAuthAttempt</span><span class="token punctuation">(</span>userID <span class="token builtin">string</span><span class="token punctuation">,</span> success <span class="token builtin">bool</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    l<span class="token punctuation">.</span>logger<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"authentication attempt"</span><span class="token punctuation">,</span></span>
<span class="line">        zap<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"user_id"</span><span class="token punctuation">,</span> userID<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">        zap<span class="token punctuation">.</span><span class="token function">Bool</span><span class="token punctuation">(</span><span class="token string">"success"</span><span class="token punctuation">,</span> success<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">        zap<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>SecurityLogger<span class="token punctuation">)</span> <span class="token function">LogPermissionDenied</span><span class="token punctuation">(</span>userID <span class="token builtin">string</span><span class="token punctuation">,</span> permission <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    l<span class="token punctuation">.</span>logger<span class="token punctuation">.</span><span class="token function">Warn</span><span class="token punctuation">(</span><span class="token string">"permission denied"</span><span class="token punctuation">,</span></span>
<span class="line">        zap<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"user_id"</span><span class="token punctuation">,</span> userID<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">        zap<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"permission"</span><span class="token punctuation">,</span> permission<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Audit Logging</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> AuditLogger <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    logger <span class="token operator">*</span>zap<span class="token punctuation">.</span>Logger</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>AuditLogger<span class="token punctuation">)</span> <span class="token function">LogUserAction</span><span class="token punctuation">(</span>userID <span class="token builtin">string</span><span class="token punctuation">,</span> action <span class="token builtin">string</span><span class="token punctuation">,</span> resource <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    l<span class="token punctuation">.</span>logger<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"user action"</span><span class="token punctuation">,</span></span>
<span class="line">        zap<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"user_id"</span><span class="token punctuation">,</span> userID<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">        zap<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"action"</span><span class="token punctuation">,</span> action<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">        zap<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"resource"</span><span class="token punctuation">,</span> resource<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">        zap<span class="token punctuation">.</span><span class="token function">Time</span><span class="token punctuation">(</span><span class="token string">"timestamp"</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="monitoring" tabindex="-1"><a class="header-anchor" href="#monitoring"><span>Monitoring</span></a></h3>
<ol>
<li>
<p><strong>Security Metrics</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">var</span> <span class="token punctuation">(</span></span>
<span class="line">    authAttempts <span class="token operator">=</span> prometheus<span class="token punctuation">.</span><span class="token function">NewCounterVec</span><span class="token punctuation">(</span></span>
<span class="line">        prometheus<span class="token punctuation">.</span>CounterOpts<span class="token punctuation">{</span></span>
<span class="line">            Name<span class="token punctuation">:</span> <span class="token string">"auth_attempts_total"</span><span class="token punctuation">,</span></span>
<span class="line">            Help<span class="token punctuation">:</span> <span class="token string">"Total number of authentication attempts"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"success"</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    permissionDenied <span class="token operator">=</span> prometheus<span class="token punctuation">.</span><span class="token function">NewCounterVec</span><span class="token punctuation">(</span></span>
<span class="line">        prometheus<span class="token punctuation">.</span>CounterOpts<span class="token punctuation">{</span></span>
<span class="line">            Name<span class="token punctuation">:</span> <span class="token string">"permission_denied_total"</span><span class="token punctuation">,</span></span>
<span class="line">            Help<span class="token punctuation">:</span> <span class="token string">"Total number of permission denied events"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"permission"</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Alerting Rules</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">groups</span><span class="token punctuation">:</span></span>
<span class="line"><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> security</span>
<span class="line">  <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">alert</span><span class="token punctuation">:</span> HighAuthFailures</span>
<span class="line">    <span class="token key atrule">expr</span><span class="token punctuation">:</span> rate(auth_attempts_total<span class="token punctuation">{</span>success="false"<span class="token punctuation">}</span><span class="token punctuation">[</span>5m<span class="token punctuation">]</span>) <span class="token punctuation">></span> 10</span>
<span class="line">    <span class="token key atrule">for</span><span class="token punctuation">:</span> 5m</span>
<span class="line">    <span class="token key atrule">labels</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">severity</span><span class="token punctuation">:</span> warning</span>
<span class="line">    <span class="token key atrule">annotations</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">summary</span><span class="token punctuation">:</span> High number of authentication failures</span>
<span class="line">      <span class="token key atrule">description</span><span class="token punctuation">:</span> Authentication failures are above threshold</span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">alert</span><span class="token punctuation">:</span> PermissionDeniedSpike</span>
<span class="line">    <span class="token key atrule">expr</span><span class="token punctuation">:</span> rate(permission_denied_total<span class="token punctuation">[</span>5m<span class="token punctuation">]</span>) <span class="token punctuation">></span> 5</span>
<span class="line">    <span class="token key atrule">for</span><span class="token punctuation">:</span> 5m</span>
<span class="line">    <span class="token key atrule">labels</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">severity</span><span class="token punctuation">:</span> warning</span>
<span class="line">    <span class="token key atrule">annotations</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">summary</span><span class="token punctuation">:</span> Spike in permission denied events</span>
<span class="line">      <span class="token key atrule">description</span><span class="token punctuation">:</span> Permission denied events are above threshold</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="security-best-practices" tabindex="-1"><a class="header-anchor" href="#security-best-practices"><span>Security Best Practices</span></a></h2>
<h3 id="code-security" tabindex="-1"><a class="header-anchor" href="#code-security"><span>Code Security</span></a></h3>
<ol>
<li>
<p><strong>Dependency Scanning</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Scan Go dependencies</span></span>
<span class="line">go list <span class="token parameter variable">-json</span> <span class="token parameter variable">-m</span> all <span class="token operator">|</span> nancy sleuth</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Scan Node.js dependencies</span></span>
<span class="line"><span class="token function">npm</span> audit</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Code Scanning</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Run static analysis</span></span>
<span class="line">golangci-lint run</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Run security scanner</span></span>
<span class="line">gosec ./<span class="token punctuation">..</span>.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="configuration-security" tabindex="-1"><a class="header-anchor" href="#configuration-security"><span>Configuration Security</span></a></h3>
<ol>
<li>
<p><strong>Secret Management</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> foodhouse<span class="token punctuation">-</span>secrets</span>
<span class="line">  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line"><span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque</span>
<span class="line"><span class="token key atrule">data</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">jwt-secret</span><span class="token punctuation">:</span> base64<span class="token punctuation">-</span>encoded<span class="token punctuation">-</span>secret</span>
<span class="line">  <span class="token key atrule">db-password</span><span class="token punctuation">:</span> base64<span class="token punctuation">-</span>encoded<span class="token punctuation">-</span>password</span>
<span class="line">  <span class="token key atrule">api-key</span><span class="token punctuation">:</span> base64<span class="token punctuation">-</span>encoded<span class="token punctuation">-</span>key</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Environment Variables</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> users</span>
<span class="line">  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">template</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">containers</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> users</span>
<span class="line">        <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> JWT_SECRET</span>
<span class="line">          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span></span>
<span class="line">              <span class="token key atrule">name</span><span class="token punctuation">:</span> foodhouse<span class="token punctuation">-</span>secrets</span>
<span class="line">              <span class="token key atrule">key</span><span class="token punctuation">:</span> jwt<span class="token punctuation">-</span>secret</span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_PASSWORD</span>
<span class="line">          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span></span>
<span class="line">              <span class="token key atrule">name</span><span class="token punctuation">:</span> foodhouse<span class="token punctuation">-</span>secrets</span>
<span class="line">              <span class="token key atrule">key</span><span class="token punctuation">:</span> db<span class="token punctuation">-</span>password</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="security-incident-response" tabindex="-1"><a class="header-anchor" href="#security-incident-response"><span>Security Incident Response</span></a></h2>
<h3 id="incident-response-plan" tabindex="-1"><a class="header-anchor" href="#incident-response-plan"><span>Incident Response Plan</span></a></h3>
<ol>
<li>
<p><strong>Detection</strong></p>
<ul>
<li>Monitor security logs</li>
<li>Review alert notifications</li>
<li>Investigate suspicious activities</li>
</ul>
</li>
<li>
<p><strong>Containment</strong></p>
<ul>
<li>Isolate affected systems</li>
<li>Block malicious IPs</li>
<li>Revoke compromised credentials</li>
</ul>
</li>
<li>
<p><strong>Eradication</strong></p>
<ul>
<li>Remove malware</li>
<li>Patch vulnerabilities</li>
<li>Update security controls</li>
</ul>
</li>
<li>
<p><strong>Recovery</strong></p>
<ul>
<li>Restore from backups</li>
<li>Verify system integrity</li>
<li>Resume normal operations</li>
</ul>
</li>
</ol>
<h3 id="incident-response-procedures" tabindex="-1"><a class="header-anchor" href="#incident-response-procedures"><span>Incident Response Procedures</span></a></h3>
<ol>
<li>
<p><strong>Security Breach</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 1. Identify affected systems</span></span>
<span class="line">kubectl get pods <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. Isolate affected pods</span></span>
<span class="line">kubectl scale deployment <span class="token function">users</span> <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">0</span> <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. Revoke compromised credentials</span></span>
<span class="line">kubectl delete secret foodhouse-secrets <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. Restore from backup</span></span>
<span class="line">./restore.sh foodhouse_backup.sql.gz</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>DDoS Attack</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 1. Enable rate limiting</span></span>
<span class="line">kubectl patch deployment <span class="token function">users</span> <span class="token parameter variable">-n</span> foodhouse <span class="token parameter variable">--patch</span> <span class="token string">'</span>
<span class="line">{</span>
<span class="line">  "spec": {</span>
<span class="line">    "template": {</span>
<span class="line">      "spec": {</span>
<span class="line">        "containers": [{</span>
<span class="line">          "name": "users",</span>
<span class="line">          "env": [{</span>
<span class="line">            "name": "RATE_LIMIT",</span>
<span class="line">            "value": "100"</span>
<span class="line">          }]</span>
<span class="line">        }]</span>
<span class="line">      }</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}'</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. Block malicious IPs</span></span>
<span class="line">kubectl apply <span class="token parameter variable">-f</span> network-policy.yaml</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="security-compliance" tabindex="-1"><a class="header-anchor" href="#security-compliance"><span>Security Compliance</span></a></h2>
<h3 id="gdpr-compliance" tabindex="-1"><a class="header-anchor" href="#gdpr-compliance"><span>GDPR Compliance</span></a></h3>
<ol>
<li>
<p><strong>Data Protection</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> UserData <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    ID        <span class="token builtin">string</span>    <span class="token string">`json:"id"`</span></span>
<span class="line">    Email     <span class="token builtin">string</span>    <span class="token string">`json:"email"`</span></span>
<span class="line">    CreatedAt time<span class="token punctuation">.</span>Time <span class="token string">`json:"created_at"`</span></span>
<span class="line">    <span class="token comment">// Exclude sensitive data</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>UserService<span class="token punctuation">)</span> <span class="token function">GetUserData</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> userID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>UserData<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    user<span class="token punctuation">,</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span>repo<span class="token punctuation">.</span><span class="token function">GetByID</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> userID<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> <span class="token operator">&amp;</span>UserData<span class="token punctuation">{</span></span>
<span class="line">        ID<span class="token punctuation">:</span>        user<span class="token punctuation">.</span>ID<span class="token punctuation">,</span></span>
<span class="line">        Email<span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Email<span class="token punctuation">,</span></span>
<span class="line">        CreatedAt<span class="token punctuation">:</span> user<span class="token punctuation">.</span>CreatedAt<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Data Deletion</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>UserService<span class="token punctuation">)</span> <span class="token function">DeleteUserData</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> userID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Anonymize user data</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span>repo<span class="token punctuation">.</span><span class="token function">AnonymizeUser</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> userID<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Delete user data</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span>repo<span class="token punctuation">.</span><span class="token function">DeleteUser</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> userID<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">nil</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="pci-dss-compliance" tabindex="-1"><a class="header-anchor" href="#pci-dss-compliance"><span>PCI DSS Compliance</span></a></h3>
<ol>
<li>
<p><strong>Payment Data Protection</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> PaymentService <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    encryptor <span class="token operator">*</span>Encryptor</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>PaymentService<span class="token punctuation">)</span> <span class="token function">ProcessPayment</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> payment <span class="token operator">*</span>Payment<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Encrypt sensitive data</span></span>
<span class="line">    encryptedCard<span class="token punctuation">,</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span>encryptor<span class="token punctuation">.</span><span class="token function">Encrypt</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>payment<span class="token punctuation">.</span>CardNumber<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> err</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Store encrypted data</span></span>
<span class="line">    payment<span class="token punctuation">.</span>EncryptedCard <span class="token operator">=</span> encryptedCard</span>
<span class="line">    payment<span class="token punctuation">.</span>CardNumber <span class="token operator">=</span> <span class="token string">""</span> <span class="token comment">// Clear sensitive data</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> s<span class="token punctuation">.</span>repo<span class="token punctuation">.</span><span class="token function">SavePayment</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> payment<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Audit Logging</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>PaymentService<span class="token punctuation">)</span> <span class="token function">LogPaymentAttempt</span><span class="token punctuation">(</span>payment <span class="token operator">*</span>Payment<span class="token punctuation">,</span> success <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    s<span class="token punctuation">.</span>auditLogger<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"payment attempt"</span><span class="token punctuation">,</span></span>
<span class="line">        zap<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"payment_id"</span><span class="token punctuation">,</span> payment<span class="token punctuation">.</span>ID<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">        zap<span class="token punctuation">.</span><span class="token function">Bool</span><span class="token punctuation">(</span><span class="token string">"success"</span><span class="token punctuation">,</span> success<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">        zap<span class="token punctuation">.</span><span class="token function">Time</span><span class="token punctuation">(</span><span class="token string">"timestamp"</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="security-resources" tabindex="-1"><a class="header-anchor" href="#security-resources"><span>Security Resources</span></a></h2>
<h3 id="documentation" tabindex="-1"><a class="header-anchor" href="#documentation"><span>Documentation</span></a></h3>
<ul>
<li><a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer">OWASP Top 10</a></li>
<li><a href="https://kubernetes.io/docs/concepts/security/" target="_blank" rel="noopener noreferrer">Kubernetes Security</a></li>
<li><a href="https://golang.org/doc/security" target="_blank" rel="noopener noreferrer">Go Security</a></li>
<li><a href="https://vuejs.org/guide/best-practices/security.html" target="_blank" rel="noopener noreferrer">Vue.js Security</a></li>
</ul>
<h3 id="tools" tabindex="-1"><a class="header-anchor" href="#tools"><span>Tools</span></a></h3>
<ul>
<li><a href="https://www.sonarqube.org/" target="_blank" rel="noopener noreferrer">SonarQube</a></li>
<li><a href="https://github.com/aquasecurity/trivy" target="_blank" rel="noopener noreferrer">Trivy</a></li>
<li><a href="https://falco.org/" target="_blank" rel="noopener noreferrer">Falco</a></li>
<li><a href="https://www.vaultproject.io/" target="_blank" rel="noopener noreferrer">Vault</a></li>
</ul>
<h3 id="training" tabindex="-1"><a class="header-anchor" href="#training"><span>Training</span></a></h3>
<ul>
<li><a href="https://owasp.org/www-project-web-security-testing-guide/" target="_blank" rel="noopener noreferrer">OWASP Web Security</a></li>
<li><a href="https://kubernetes.io/docs/tutorials/security/" target="_blank" rel="noopener noreferrer">Kubernetes Security</a></li>
<li><a href="https://golang.org/doc/security" target="_blank" rel="noopener noreferrer">Go Security Training</a></li>
<li><a href="https://vuejs.org/guide/best-practices/security.html" target="_blank" rel="noopener noreferrer">Vue.js Security Training</a></li>
</ul>
</div></template>


