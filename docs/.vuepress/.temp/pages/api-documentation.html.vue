<template><div><h1 id="api-documentation" tabindex="-1"><a class="header-anchor" href="#api-documentation"><span>API Documentation</span></a></h1>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p>FoodHouse provides a comprehensive set of APIs for managing users, products, orders, payments, and deliveries. The APIs are implemented using gRPC and follow RESTful principles.</p>
<h2 id="authentication" tabindex="-1"><a class="header-anchor" href="#authentication"><span>Authentication</span></a></h2>
<p>All API requests require authentication using JWT tokens. The authentication flow is as follows:</p>
<ol>
<li>User registration/login</li>
<li>OTP verification</li>
<li>JWT token generation</li>
<li>Token usage in subsequent requests</li>
</ol>
<h3 id="authentication-headers" tabindex="-1"><a class="header-anchor" href="#authentication-headers"><span>Authentication Headers</span></a></h3>
<div class="language-http line-numbers-mode" data-highlighter="prismjs" data-ext="http"><pre v-pre><code><span class="line"><span class="token header"><span class="token header-name keyword">Authorization</span><span class="token punctuation">:</span> <span class="token header-value">Bearer &lt;jwt_token></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="api-services" tabindex="-1"><a class="header-anchor" href="#api-services"><span>API Services</span></a></h2>
<h3 id="user-service" tabindex="-1"><a class="header-anchor" href="#user-service"><span>User Service</span></a></h3>
<h4 id="user-registration" tabindex="-1"><a class="header-anchor" href="#user-registration"><span>User Registration</span></a></h4>
<div class="language-protobuf line-numbers-mode" data-highlighter="prismjs" data-ext="protobuf"><pre v-pre><code><span class="line"><span class="token keyword">rpc</span> <span class="token function">Signup</span><span class="token punctuation">(</span><span class="token class-name">SignupRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">SignupResponse</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>Request:</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"phone_factor"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"SMS_OTP"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"phone_number"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"secret_value"</span><span class="token operator">:</span> <span class="token string">"otp"</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"residence_country_iso_code"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"password"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"user_type"</span><span class="token operator">:</span> <span class="token string">"FARMER|BUYER"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"email"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Response:</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"tokens"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"access_token"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"refresh_token"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="user-authentication" tabindex="-1"><a class="header-anchor" href="#user-authentication"><span>User Authentication</span></a></h4>
<div class="language-protobuf line-numbers-mode" data-highlighter="prismjs" data-ext="protobuf"><pre v-pre><code><span class="line"><span class="token keyword">rpc</span> <span class="token function">Authenticate</span><span class="token punctuation">(</span><span class="token class-name">AuthenticateRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">AuthenticateResponse</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>Request:</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"factors"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"SMS_OTP"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"phone_number"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"secret_value"</span><span class="token operator">:</span> <span class="token string">"otp"</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Response:</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"login_complete"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"tokens"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"access_token"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"refresh_token"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="product-service" tabindex="-1"><a class="header-anchor" href="#product-service"><span>Product Service</span></a></h3>
<h4 id="create-product" tabindex="-1"><a class="header-anchor" href="#create-product"><span>Create Product</span></a></h4>
<div class="language-protobuf line-numbers-mode" data-highlighter="prismjs" data-ext="protobuf"><pre v-pre><code><span class="line"><span class="token keyword">rpc</span> <span class="token function">CreateProduct</span><span class="token punctuation">(</span><span class="token class-name">CreateProductRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">CreateProductResponse</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>Request:</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"category_id"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"unit_type"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"amount"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"currency"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"image"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"whole_sale"</span><span class="token operator">:</span> boolean</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Response:</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"product"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"category"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"slug"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"unit_type"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"amount"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"currency"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"image"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"created_by"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token string">"timestamp"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"updated_at"</span><span class="token operator">:</span> <span class="token string">"timestamp"</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="list-products" tabindex="-1"><a class="header-anchor" href="#list-products"><span>List Products</span></a></h4>
<div class="language-protobuf line-numbers-mode" data-highlighter="prismjs" data-ext="protobuf"><pre v-pre><code><span class="line"><span class="token keyword">rpc</span> <span class="token function">ListProducts</span><span class="token punctuation">(</span><span class="token class-name">ListProductsRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">ListProductsResponse</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>Request:</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"category_id"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"min_amount"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"currency"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"max_amount"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"currency"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"search"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"start_key"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"count"</span><span class="token operator">:</span> integer</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Response:</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"products"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"category"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"slug"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"unit_type"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"amount"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"currency"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"image"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_by"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token string">"timestamp"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"updated_at"</span><span class="token operator">:</span> <span class="token string">"timestamp"</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"next_key"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="order-service" tabindex="-1"><a class="header-anchor" href="#order-service"><span>Order Service</span></a></h3>
<h4 id="create-order" tabindex="-1"><a class="header-anchor" href="#create-order"><span>Create Order</span></a></h4>
<div class="language-protobuf line-numbers-mode" data-highlighter="prismjs" data-ext="protobuf"><pre v-pre><code><span class="line"><span class="token keyword">rpc</span> <span class="token function">CreateOrder</span><span class="token punctuation">(</span><span class="token class-name">CreateOrderRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">CreateOrderResponse</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>Request:</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"product_id"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"quantity"</span><span class="token operator">:</span> integer<span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"delivery_location"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"latitude"</span><span class="token operator">:</span> double<span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"longitude"</span><span class="token operator">:</span> double</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Response:</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"order"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"order_number"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"delivery_location"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"latitude"</span><span class="token operator">:</span> double<span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"longitude"</span><span class="token operator">:</span> double</span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"price"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"currency"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"CREATED"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"product"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"created_by"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token string">"timestamp"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"updated_at"</span><span class="token operator">:</span> <span class="token string">"timestamp"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"secret_key"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"product_owner"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"payout_phone_number"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="list-user-orders" tabindex="-1"><a class="header-anchor" href="#list-user-orders"><span>List User Orders</span></a></h4>
<div class="language-protobuf line-numbers-mode" data-highlighter="prismjs" data-ext="protobuf"><pre v-pre><code><span class="line"><span class="token keyword">rpc</span> <span class="token function">ListUserOrders</span><span class="token punctuation">(</span><span class="token class-name">ListUserOrdersRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">ListUserOrdersResponse</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>Request:</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"count"</span><span class="token operator">:</span> integer<span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"start_key"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"CREATED|PAYMENT_SUCCESSFUL|PAYMENT_FAILED|IN_TRANSIT|DELIVERED|APPROVED"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Response:</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"orders"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"order_number"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"delivery_location"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">"latitude"</span><span class="token operator">:</span> double<span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"longitude"</span><span class="token operator">:</span> double</span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"price"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"currency"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"product"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_by"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token string">"timestamp"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"updated_at"</span><span class="token operator">:</span> <span class="token string">"timestamp"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"secret_key"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"product_owner"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"payout_phone_number"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"next_key"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="payment-service" tabindex="-1"><a class="header-anchor" href="#payment-service"><span>Payment Service</span></a></h3>
<h4 id="initiate-payment" tabindex="-1"><a class="header-anchor" href="#initiate-payment"><span>Initiate Payment</span></a></h4>
<div class="language-protobuf line-numbers-mode" data-highlighter="prismjs" data-ext="protobuf"><pre v-pre><code><span class="line"><span class="token keyword">rpc</span> <span class="token function">InitiatePayment</span><span class="token punctuation">(</span><span class="token class-name">InitiatePaymentRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">InitiatePaymentResponse</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>Request:</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"payment_entity"</span><span class="token operator">:</span> <span class="token string">"ORDER|SUBSCRIPTION"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"entity_id"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"user_id"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"amount"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"currency"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"account"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"payment_method"</span><span class="token operator">:</span> <span class="token string">"MOBILE_MONEY|ORANGE_MONEY|CREDIT_CARD"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"account_number"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Response:</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"payment"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"payment_entity"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"entity_id"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"amount"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"currency"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"created_by"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"created_at"</span><span class="token operator">:</span> <span class="token string">"timestamp"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"expires_at"</span><span class="token operator">:</span> <span class="token string">"timestamp"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"updated_at"</span><span class="token operator">:</span> <span class="token string">"timestamp"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"INITIATED|COMPLETED|FAILED|CANCELED"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"account"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"payment_method"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"account_number"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="confirm-payment" tabindex="-1"><a class="header-anchor" href="#confirm-payment"><span>Confirm Payment</span></a></h4>
<div class="language-protobuf line-numbers-mode" data-highlighter="prismjs" data-ext="protobuf"><pre v-pre><code><span class="line"><span class="token keyword">rpc</span> <span class="token function">ConfirmPayment</span><span class="token punctuation">(</span><span class="token class-name">ConfirmPaymentRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">ConfirmPaymentResponse</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>Request:</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"reference"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"amount"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"currency"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"operator"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"code"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"operator_reference"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"signature"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"endpoint"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"external_reference"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"phone_number"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="error-handling" tabindex="-1"><a class="header-anchor" href="#error-handling"><span>Error Handling</span></a></h2>
<p>All API responses follow a standard error format:</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"error"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"code"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"details"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="common-error-codes" tabindex="-1"><a class="header-anchor" href="#common-error-codes"><span>Common Error Codes</span></a></h3>
<table>
<thead>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>400</td>
<td>Bad Request</td>
</tr>
<tr>
<td>401</td>
<td>Unauthorized</td>
</tr>
<tr>
<td>403</td>
<td>Forbidden</td>
</tr>
<tr>
<td>404</td>
<td>Not Found</td>
</tr>
<tr>
<td>409</td>
<td>Conflict</td>
</tr>
<tr>
<td>429</td>
<td>Too Many Requests</td>
</tr>
<tr>
<td>500</td>
<td>Internal Server Error</td>
</tr>
</tbody>
</table>
<h2 id="rate-limiting" tabindex="-1"><a class="header-anchor" href="#rate-limiting"><span>Rate Limiting</span></a></h2>
<p>API requests are rate-limited to prevent abuse. The current limits are:</p>
<ul>
<li>100 requests per minute per IP</li>
<li>1000 requests per hour per user</li>
<li>10000 requests per day per user</li>
</ul>
<p>Rate limit headers are included in all responses:</p>
<div class="language-http line-numbers-mode" data-highlighter="prismjs" data-ext="http"><pre v-pre><code><span class="line"><span class="token header"><span class="token header-name keyword">X-RateLimit-Limit</span><span class="token punctuation">:</span> <span class="token header-value">100</span></span></span>
<span class="line"><span class="token header"><span class="token header-name keyword">X-RateLimit-Remaining</span><span class="token punctuation">:</span> <span class="token header-value">99</span></span></span>
<span class="line"><span class="token header"><span class="token header-name keyword">X-RateLimit-Reset</span><span class="token punctuation">:</span> <span class="token header-value">1620000000</span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="api-versioning" tabindex="-1"><a class="header-anchor" href="#api-versioning"><span>API Versioning</span></a></h2>
<p>The API version is included in the URL path:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">/v1/users/...</span>
<span class="line">/v1/products/...</span>
<span class="line">/v1/orders/...</span>
<span class="line">/v1/payments/...</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="webhooks" tabindex="-1"><a class="header-anchor" href="#webhooks"><span>Webhooks</span></a></h2>
<p>The system supports webhooks for real-time notifications. Webhook endpoints can be configured for:</p>
<ul>
<li>Order status changes</li>
<li>Payment status updates</li>
<li>Delivery status updates</li>
<li>User registration</li>
</ul>
<h3 id="webhook-payload" tabindex="-1"><a class="header-anchor" href="#webhook-payload"><span>Webhook Payload</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"event"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"timestamp"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Event-specific data</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"signature"</span><span class="token operator">:</span> <span class="token string">"string"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sdks-and-client-libraries" tabindex="-1"><a class="header-anchor" href="#sdks-and-client-libraries"><span>SDKs and Client Libraries</span></a></h2>
<p>Official client libraries are available for:</p>
<ul>
<li>Go</li>
<li>JavaScript/TypeScript</li>
<li>Python</li>
<li>Java</li>
<li>Swift</li>
<li>Kotlin</li>
</ul>
<h2 id="api-testing" tabindex="-1"><a class="header-anchor" href="#api-testing"><span>API Testing</span></a></h2>
<p>The API can be tested using:</p>
<ol>
<li>gRPC CLI tools</li>
<li>Postman collection</li>
<li>Swagger UI</li>
<li>Custom test clients</li>
</ol>
<h2 id="best-practices" tabindex="-1"><a class="header-anchor" href="#best-practices"><span>Best Practices</span></a></h2>
<ol>
<li>
<p><strong>Authentication</strong></p>
<ul>
<li>Always use HTTPS</li>
<li>Store tokens securely</li>
<li>Implement token refresh</li>
<li>Handle token expiration</li>
</ul>
</li>
<li>
<p><strong>Error Handling</strong></p>
<ul>
<li>Implement proper error handling</li>
<li>Use appropriate HTTP status codes</li>
<li>Provide meaningful error messages</li>
<li>Log errors for debugging</li>
</ul>
</li>
<li>
<p><strong>Performance</strong></p>
<ul>
<li>Use pagination for large datasets</li>
<li>Implement caching where appropriate</li>
<li>Optimize payload size</li>
<li>Use compression</li>
</ul>
</li>
<li>
<p><strong>Security</strong></p>
<ul>
<li>Validate all input</li>
<li>Sanitize output</li>
<li>Implement rate limiting</li>
<li>Use secure headers</li>
</ul>
</li>
</ol>
<h2 id="api-changelog" tabindex="-1"><a class="header-anchor" href="#api-changelog"><span>API Changelog</span></a></h2>
<h3 id="version-1-0-0-2024-03-20" tabindex="-1"><a class="header-anchor" href="#version-1-0-0-2024-03-20"><span>Version 1.0.0 (2024-03-20)</span></a></h3>
<ul>
<li>Initial release</li>
<li>Basic CRUD operations</li>
<li>Authentication system</li>
<li>Payment integration</li>
</ul>
<h3 id="version-1-1-0-2024-04-01" tabindex="-1"><a class="header-anchor" href="#version-1-1-0-2024-04-01"><span>Version 1.1.0 (2024-04-01)</span></a></h3>
<ul>
<li>Added webhook support</li>
<li>Enhanced error handling</li>
<li>Improved rate limiting</li>
<li>Added new payment methods</li>
</ul>
</div></template>


