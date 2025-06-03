<template><div><h1 id="deployment-guide" tabindex="-1"><a class="header-anchor" href="#deployment-guide"><span>Deployment Guide</span></a></h1>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p>This guide provides comprehensive instructions for deploying the FoodHouse application in various environments. The application is designed to be deployed as a set of microservices using Docker containers and orchestrated with Kubernetes.</p>
<h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites"><span>Prerequisites</span></a></h2>
<h3 id="required-tools" tabindex="-1"><a class="header-anchor" href="#required-tools"><span>Required Tools</span></a></h3>
<ul>
<li>Docker (v20.10+)</li>
<li>Docker Compose (v2.0+)</li>
<li>Kubernetes (v1.20+)</li>
<li>kubectl (v1.20+)</li>
<li>AWS CLI (v2.0+)</li>
<li>Terraform (v1.0+)</li>
<li>Helm (v3.0+)</li>
</ul>
<h3 id="required-accounts" tabindex="-1"><a class="header-anchor" href="#required-accounts"><span>Required Accounts</span></a></h3>
<ul>
<li>AWS Account</li>
<li>Docker Hub Account</li>
<li>GitHub Account</li>
</ul>
<h2 id="infrastructure-setup" tabindex="-1"><a class="header-anchor" href="#infrastructure-setup"><span>Infrastructure Setup</span></a></h2>
<h3 id="aws-infrastructure" tabindex="-1"><a class="header-anchor" href="#aws-infrastructure"><span>AWS Infrastructure</span></a></h3>
<img src="https://www.plantuml.com/plantuml/svg/RP71Yi9038RlynInTqzx5xKh8iWYEx8UbZt4QT31QQPCCueiVNTRIzsjzJ8atpyX7sHQ2WQ9kLCZEL9EK3YqhCgJvG83vc1yNdWc5YrNHn382FB1aLB6-PX1CjjfI9ioWLy5m3uZIBusQTjsO1FtpXhGSSyaNGJmlMAXK2DOej05hpzTy37R3jZQOmPpTCY6Gakh-_j_KR3dUcouQP4sdh6KRhHcd-_wKIySbc9JD4TwCFtsjwLIbL93NnYF9mEpfxxzqnFeTMr-btd1Us8lyaPoIfpLHxm1" alt="">
<h3 id="terraform-configuration" tabindex="-1"><a class="header-anchor" href="#terraform-configuration"><span>Terraform Configuration</span></a></h3>
<div class="language-hcl line-numbers-mode" data-highlighter="prismjs" data-ext="hcl"><pre v-pre><code><span class="line"><span class="token comment"># main.tf</span></span>
<span class="line"><span class="token keyword">provider<span class="token type variable"> "aws" </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">region</span> <span class="token punctuation">=</span> var.aws_region</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">module<span class="token type variable"> "vpc" </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">source</span> <span class="token punctuation">=</span> <span class="token string">"./modules/vpc"</span></span>
<span class="line">  </span>
<span class="line">  <span class="token property">vpc_cidr</span> <span class="token punctuation">=</span> var.vpc_cidr</span>
<span class="line">  <span class="token property">environment</span> <span class="token punctuation">=</span> var.environment</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">module<span class="token type variable"> "ecs" </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">source</span> <span class="token punctuation">=</span> <span class="token string">"./modules/ecs"</span></span>
<span class="line">  </span>
<span class="line">  <span class="token property">vpc_id</span> <span class="token punctuation">=</span> module.vpc.vpc_id</span>
<span class="line">  <span class="token property">environment</span> <span class="token punctuation">=</span> var.environment</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">module<span class="token type variable"> "rds" </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">source</span> <span class="token punctuation">=</span> <span class="token string">"./modules/rds"</span></span>
<span class="line">  </span>
<span class="line">  <span class="token property">vpc_id</span> <span class="token punctuation">=</span> module.vpc.vpc_id</span>
<span class="line">  <span class="token property">environment</span> <span class="token punctuation">=</span> var.environment</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">module<span class="token type variable"> "elasticache" </span></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">source</span> <span class="token punctuation">=</span> <span class="token string">"./modules/elasticache"</span></span>
<span class="line">  </span>
<span class="line">  <span class="token property">vpc_id</span> <span class="token punctuation">=</span> module.vpc.vpc_id</span>
<span class="line">  <span class="token property">environment</span> <span class="token punctuation">=</span> var.environment</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="container-configuration" tabindex="-1"><a class="header-anchor" href="#container-configuration"><span>Container Configuration</span></a></h2>
<h3 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose"><span>Docker Compose</span></a></h3>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.8'</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">users</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./users</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"8080:8080"</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> DB_HOST=postgres</span>
<span class="line">      <span class="token punctuation">-</span> DB_PORT=5432</span>
<span class="line">      <span class="token punctuation">-</span> DB_NAME=foodhouse_users</span>
<span class="line">      <span class="token punctuation">-</span> DB_USER=postgres</span>
<span class="line">      <span class="token punctuation">-</span> DB_PASSWORD=secret</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> postgres</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">products</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./products</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"8081:8080"</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> DB_HOST=postgres</span>
<span class="line">      <span class="token punctuation">-</span> DB_PORT=5432</span>
<span class="line">      <span class="token punctuation">-</span> DB_NAME=foodhouse_products</span>
<span class="line">      <span class="token punctuation">-</span> DB_USER=postgres</span>
<span class="line">      <span class="token punctuation">-</span> DB_PASSWORD=secret</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> postgres</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">orders</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./orders</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"8082:8080"</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> DB_HOST=postgres</span>
<span class="line">      <span class="token punctuation">-</span> DB_PORT=5432</span>
<span class="line">      <span class="token punctuation">-</span> DB_NAME=foodhouse_orders</span>
<span class="line">      <span class="token punctuation">-</span> DB_USER=postgres</span>
<span class="line">      <span class="token punctuation">-</span> DB_PASSWORD=secret</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> postgres</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">payments</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./payments</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"8083:8080"</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> DB_HOST=postgres</span>
<span class="line">      <span class="token punctuation">-</span> DB_PORT=5432</span>
<span class="line">      <span class="token punctuation">-</span> DB_NAME=foodhouse_payments</span>
<span class="line">      <span class="token punctuation">-</span> DB_USER=postgres</span>
<span class="line">      <span class="token punctuation">-</span> DB_PASSWORD=secret</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> postgres</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">postgres</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres<span class="token punctuation">:</span><span class="token number">13</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> POSTGRES_USER=postgres</span>
<span class="line">      <span class="token punctuation">-</span> POSTGRES_PASSWORD=secret</span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> postgres_data<span class="token punctuation">:</span>/var/lib/postgresql/data</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">postgres_data</span><span class="token punctuation">:</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kubernetes-manifests" tabindex="-1"><a class="header-anchor" href="#kubernetes-manifests"><span>Kubernetes Manifests</span></a></h3>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># users-deployment.yaml</span></span>
<span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> users</span>
<span class="line">  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span></span>
<span class="line">  <span class="token key atrule">selector</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">app</span><span class="token punctuation">:</span> users</span>
<span class="line">  <span class="token key atrule">template</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">labels</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">app</span><span class="token punctuation">:</span> users</span>
<span class="line">    <span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">containers</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> users</span>
<span class="line">        <span class="token key atrule">image</span><span class="token punctuation">:</span> foodhouse/users<span class="token punctuation">:</span>latest</span>
<span class="line">        <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8080</span></span>
<span class="line">        <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_HOST</span>
<span class="line">          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span></span>
<span class="line">              <span class="token key atrule">name</span><span class="token punctuation">:</span> db<span class="token punctuation">-</span>secrets</span>
<span class="line">              <span class="token key atrule">key</span><span class="token punctuation">:</span> host</span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DB_PASSWORD</span>
<span class="line">          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span></span>
<span class="line">              <span class="token key atrule">name</span><span class="token punctuation">:</span> db<span class="token punctuation">-</span>secrets</span>
<span class="line">              <span class="token key atrule">key</span><span class="token punctuation">:</span> password</span>
<span class="line">        <span class="token key atrule">resources</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">requests</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">"256Mi"</span></span>
<span class="line">            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">"200m"</span></span>
<span class="line">          <span class="token key atrule">limits</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">"512Mi"</span></span>
<span class="line">            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">"500m"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="deployment-process" tabindex="-1"><a class="header-anchor" href="#deployment-process"><span>Deployment Process</span></a></h2>
<h3 id="_1-build-and-push-docker-images" tabindex="-1"><a class="header-anchor" href="#_1-build-and-push-docker-images"><span>1. Build and Push Docker Images</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Build images</span></span>
<span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> foodhouse/users:latest ./users</span>
<span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> foodhouse/products:latest ./products</span>
<span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> foodhouse/orders:latest ./orders</span>
<span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> foodhouse/payments:latest ./payments</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Push to registry</span></span>
<span class="line"><span class="token function">docker</span> push foodhouse/users:latest</span>
<span class="line"><span class="token function">docker</span> push foodhouse/products:latest</span>
<span class="line"><span class="token function">docker</span> push foodhouse/orders:latest</span>
<span class="line"><span class="token function">docker</span> push foodhouse/payments:latest</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-deploy-infrastructure" tabindex="-1"><a class="header-anchor" href="#_2-deploy-infrastructure"><span>2. Deploy Infrastructure</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Initialize Terraform</span></span>
<span class="line">terraform init</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Plan deployment</span></span>
<span class="line">terraform plan <span class="token parameter variable">-out</span><span class="token operator">=</span>tfplan</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Apply changes</span></span>
<span class="line">terraform apply tfplan</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-deploy-kubernetes-resources" tabindex="-1"><a class="header-anchor" href="#_3-deploy-kubernetes-resources"><span>3. Deploy Kubernetes Resources</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Create namespace</span></span>
<span class="line">kubectl create namespace foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Apply secrets</span></span>
<span class="line">kubectl apply <span class="token parameter variable">-f</span> k8s/secrets.yaml</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Deploy services</span></span>
<span class="line">kubectl apply <span class="token parameter variable">-f</span> k8s/users-deployment.yaml</span>
<span class="line">kubectl apply <span class="token parameter variable">-f</span> k8s/products-deployment.yaml</span>
<span class="line">kubectl apply <span class="token parameter variable">-f</span> k8s/orders-deployment.yaml</span>
<span class="line">kubectl apply <span class="token parameter variable">-f</span> k8s/payments-deployment.yaml</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Deploy ingress</span></span>
<span class="line">kubectl apply <span class="token parameter variable">-f</span> k8s/ingress.yaml</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="environment-configuration" tabindex="-1"><a class="header-anchor" href="#environment-configuration"><span>Environment Configuration</span></a></h2>
<h3 id="development" tabindex="-1"><a class="header-anchor" href="#development"><span>Development</span></a></h3>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># config/development.yaml</span></span>
<span class="line"><span class="token key atrule">environment</span><span class="token punctuation">:</span> development</span>
<span class="line"><span class="token key atrule">log_level</span><span class="token punctuation">:</span> debug</span>
<span class="line"><span class="token key atrule">database</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5432</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> foodhouse_dev</span>
<span class="line">  <span class="token key atrule">user</span><span class="token punctuation">:</span> postgres</span>
<span class="line">  <span class="token key atrule">password</span><span class="token punctuation">:</span> secret</span>
<span class="line"><span class="token key atrule">redis</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="staging" tabindex="-1"><a class="header-anchor" href="#staging"><span>Staging</span></a></h3>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># config/staging.yaml</span></span>
<span class="line"><span class="token key atrule">environment</span><span class="token punctuation">:</span> staging</span>
<span class="line"><span class="token key atrule">log_level</span><span class="token punctuation">:</span> info</span>
<span class="line"><span class="token key atrule">database</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> staging<span class="token punctuation">-</span>db.foodhouse.com</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5432</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> foodhouse_staging</span>
<span class="line">  <span class="token key atrule">user</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>DB_USER<span class="token punctuation">}</span></span>
<span class="line">  <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>DB_PASSWORD<span class="token punctuation">}</span></span>
<span class="line"><span class="token key atrule">redis</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> staging<span class="token punctuation">-</span>redis.foodhouse.com</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="production" tabindex="-1"><a class="header-anchor" href="#production"><span>Production</span></a></h3>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># config/production.yaml</span></span>
<span class="line"><span class="token key atrule">environment</span><span class="token punctuation">:</span> production</span>
<span class="line"><span class="token key atrule">log_level</span><span class="token punctuation">:</span> warn</span>
<span class="line"><span class="token key atrule">database</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> production<span class="token punctuation">-</span>db.foodhouse.com</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5432</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> foodhouse_prod</span>
<span class="line">  <span class="token key atrule">user</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>DB_USER<span class="token punctuation">}</span></span>
<span class="line">  <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>DB_PASSWORD<span class="token punctuation">}</span></span>
<span class="line"><span class="token key atrule">redis</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">host</span><span class="token punctuation">:</span> production<span class="token punctuation">-</span>redis.foodhouse.com</span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="monitoring-setup" tabindex="-1"><a class="header-anchor" href="#monitoring-setup"><span>Monitoring Setup</span></a></h2>
<h3 id="prometheus-configuration" tabindex="-1"><a class="header-anchor" href="#prometheus-configuration"><span>Prometheus Configuration</span></a></h3>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># prometheus.yml</span></span>
<span class="line"><span class="token key atrule">global</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 15s</span>
<span class="line">  <span class="token key atrule">evaluation_interval</span><span class="token punctuation">:</span> 15s</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">scrape_configs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">'users'</span></span>
<span class="line">    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'users:8080'</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">'products'</span></span>
<span class="line">    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'products:8080'</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">'orders'</span></span>
<span class="line">    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'orders:8080'</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">'payments'</span></span>
<span class="line">    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'payments:8080'</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="grafana-dashboards" tabindex="-1"><a class="header-anchor" href="#grafana-dashboards"><span>Grafana Dashboards</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"dashboard"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"title"</span><span class="token operator">:</span> <span class="token string">"FoodHouse Services"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"panels"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">"title"</span><span class="token operator">:</span> <span class="token string">"Service Health"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"graph"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"datasource"</span><span class="token operator">:</span> <span class="token string">"Prometheus"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"targets"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">"expr"</span><span class="token operator">:</span> <span class="token string">"up"</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">"legendFormat"</span><span class="token operator">:</span> <span class="token string">"{{service}}"</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">"title"</span><span class="token operator">:</span> <span class="token string">"Request Rate"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"graph"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"datasource"</span><span class="token operator">:</span> <span class="token string">"Prometheus"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"targets"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">"expr"</span><span class="token operator">:</span> <span class="token string">"rate(http_requests_total[5m])"</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">"legendFormat"</span><span class="token operator">:</span> <span class="token string">"{{service}}"</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="security-configuration" tabindex="-1"><a class="header-anchor" href="#security-configuration"><span>Security Configuration</span></a></h2>
<h3 id="ssl-tls-setup" tabindex="-1"><a class="header-anchor" href="#ssl-tls-setup"><span>SSL/TLS Setup</span></a></h3>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># cert-manager.yaml</span></span>
<span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> cert<span class="token punctuation">-</span>manager.io/v1</span>
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
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="network-policies" tabindex="-1"><a class="header-anchor" href="#network-policies"><span>Network Policies</span></a></h3>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># network-policy.yaml</span></span>
<span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1</span>
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
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="backup-and-recovery" tabindex="-1"><a class="header-anchor" href="#backup-and-recovery"><span>Backup and Recovery</span></a></h2>
<h3 id="database-backup" tabindex="-1"><a class="header-anchor" href="#database-backup"><span>Database Backup</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># backup.sh</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Set variables</span></span>
<span class="line"><span class="token assign-left variable">BACKUP_DIR</span><span class="token operator">=</span><span class="token string">"/backups"</span></span>
<span class="line"><span class="token assign-left variable">DATE</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y%m%d_%H%M%S<span class="token variable">)</span></span></span>
<span class="line"><span class="token assign-left variable">DB_NAME</span><span class="token operator">=</span><span class="token string">"foodhouse"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Create backup</span></span>
<span class="line">pg_dump <span class="token parameter variable">-h</span> <span class="token variable">$DB_HOST</span> <span class="token parameter variable">-U</span> <span class="token variable">$DB_USER</span> <span class="token parameter variable">-d</span> <span class="token variable">$DB_NAME</span> <span class="token operator">></span> <span class="token variable">$BACKUP_DIR</span>/<span class="token variable">$DB_NAME_</span><span class="token variable">$DATE</span>.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Compress backup</span></span>
<span class="line"><span class="token function">gzip</span> <span class="token variable">$BACKUP_DIR</span>/<span class="token variable">$DB_NAME_</span><span class="token variable">$DATE</span>.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Upload to S3</span></span>
<span class="line">aws s3 <span class="token function">cp</span> <span class="token variable">$BACKUP_DIR</span>/<span class="token variable">$DB_NAME_</span><span class="token variable">$DATE</span>.sql.gz s3://foodhouse-backups/</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="recovery-process" tabindex="-1"><a class="header-anchor" href="#recovery-process"><span>Recovery Process</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># restore.sh</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Set variables</span></span>
<span class="line"><span class="token assign-left variable">BACKUP_FILE</span><span class="token operator">=</span><span class="token variable">$1</span></span>
<span class="line"><span class="token assign-left variable">DB_NAME</span><span class="token operator">=</span><span class="token string">"foodhouse"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Download from S3</span></span>
<span class="line">aws s3 <span class="token function">cp</span> s3://foodhouse-backups/<span class="token variable">$BACKUP_FILE</span> <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Decompress backup</span></span>
<span class="line">gunzip <span class="token variable">$BACKUP_FILE</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Restore database</span></span>
<span class="line">psql <span class="token parameter variable">-h</span> <span class="token variable">$DB_HOST</span> <span class="token parameter variable">-U</span> <span class="token variable">$DB_USER</span> <span class="token parameter variable">-d</span> <span class="token variable">$DB_NAME</span> <span class="token operator">&lt;</span> <span class="token variable">${BACKUP_FILE<span class="token operator">%</span>.gz}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="scaling-configuration" tabindex="-1"><a class="header-anchor" href="#scaling-configuration"><span>Scaling Configuration</span></a></h2>
<h3 id="horizontal-pod-autoscaling" tabindex="-1"><a class="header-anchor" href="#horizontal-pod-autoscaling"><span>Horizontal Pod Autoscaling</span></a></h3>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># hpa.yaml</span></span>
<span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> autoscaling/v2</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> HorizontalPodAutoscaler</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> users<span class="token punctuation">-</span>hpa</span>
<span class="line">  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">scaleTargetRef</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1</span>
<span class="line">    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment</span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> users</span>
<span class="line">  <span class="token key atrule">minReplicas</span><span class="token punctuation">:</span> <span class="token number">3</span></span>
<span class="line">  <span class="token key atrule">maxReplicas</span><span class="token punctuation">:</span> <span class="token number">10</span></span>
<span class="line">  <span class="token key atrule">metrics</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> Resource</span>
<span class="line">    <span class="token key atrule">resource</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">name</span><span class="token punctuation">:</span> cpu</span>
<span class="line">      <span class="token key atrule">target</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">type</span><span class="token punctuation">:</span> Utilization</span>
<span class="line">        <span class="token key atrule">averageUtilization</span><span class="token punctuation">:</span> <span class="token number">70</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="database-scaling" tabindex="-1"><a class="header-anchor" href="#database-scaling"><span>Database Scaling</span></a></h3>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># rds-scaling.yaml</span></span>
<span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> autoscaling.k8s.io/v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> VerticalPodAutoscaler</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> rds<span class="token punctuation">-</span>vpa</span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">targetRef</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> <span class="token string">"apps/v1"</span></span>
<span class="line">    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment</span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> postgres</span>
<span class="line">  <span class="token key atrule">updatePolicy</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">updateMode</span><span class="token punctuation">:</span> <span class="token string">"Auto"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting"><span>Troubleshooting</span></a></h2>
<h3 id="common-issues" tabindex="-1"><a class="header-anchor" href="#common-issues"><span>Common Issues</span></a></h3>
<ol>
<li>
<p><strong>Database Connection Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check database connectivity</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> users-pod -- <span class="token function">nc</span> <span class="token parameter variable">-zv</span> postgres <span class="token number">5432</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check database logs</span></span>
<span class="line">kubectl logs <span class="token parameter variable">-f</span> postgres-pod</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Service Health Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check service health</span></span>
<span class="line">kubectl get pods <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check service logs</span></span>
<span class="line">kubectl logs <span class="token parameter variable">-f</span> users-pod <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Network Issues</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check network policies</span></span>
<span class="line">kubectl get networkpolicy <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check service endpoints</span></span>
<span class="line">kubectl get endpoints <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="monitoring-commands" tabindex="-1"><a class="header-anchor" href="#monitoring-commands"><span>Monitoring Commands</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check pod status</span></span>
<span class="line">kubectl get pods <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check service status</span></span>
<span class="line">kubectl get services <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check deployment status</span></span>
<span class="line">kubectl get deployments <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check logs</span></span>
<span class="line">kubectl logs <span class="token parameter variable">-f</span> deployment/users <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check metrics</span></span>
<span class="line">kubectl <span class="token function">top</span> pods <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="maintenance-procedures" tabindex="-1"><a class="header-anchor" href="#maintenance-procedures"><span>Maintenance Procedures</span></a></h2>
<h3 id="regular-maintenance" tabindex="-1"><a class="header-anchor" href="#regular-maintenance"><span>Regular Maintenance</span></a></h3>
<ol>
<li>
<p><strong>Database Maintenance</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Vacuum database</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> postgres-pod -- psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> foodhouse <span class="token parameter variable">-c</span> <span class="token string">"VACUUM ANALYZE;"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check database size</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> postgres-pod -- psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> foodhouse <span class="token parameter variable">-c</span> <span class="token string">"\l+"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Log Rotation</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Rotate logs</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> users-pod -- <span class="token function">logrotate</span> /etc/logrotate.conf</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Certificate Renewal</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Check certificate status</span></span>
<span class="line">kubectl get certificate <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Force certificate renewal</span></span>
<span class="line">kubectl delete certificate foodhouse-cert <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="emergency-procedures" tabindex="-1"><a class="header-anchor" href="#emergency-procedures"><span>Emergency Procedures</span></a></h3>
<ol>
<li>
<p><strong>Service Rollback</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Rollback deployment</span></span>
<span class="line">kubectl rollout undo deployment/users <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Database Recovery</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Restore from backup</span></span>
<span class="line">./restore.sh foodhouse_20240320_120000.sql.gz</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Emergency Scaling</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Scale up services</span></span>
<span class="line">kubectl scale deployment <span class="token function">users</span> <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">5</span> <span class="token parameter variable">-n</span> foodhouse</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="performance-optimization" tabindex="-1"><a class="header-anchor" href="#performance-optimization"><span>Performance Optimization</span></a></h2>
<h3 id="resource-optimization" tabindex="-1"><a class="header-anchor" href="#resource-optimization"><span>Resource Optimization</span></a></h3>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># resource-limits.yaml</span></span>
<span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> LimitRange</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> foodhouse<span class="token punctuation">-</span>limits</span>
<span class="line">  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">limits</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">default</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 500m</span>
<span class="line">      <span class="token key atrule">memory</span><span class="token punctuation">:</span> 512Mi</span>
<span class="line">    <span class="token key atrule">defaultRequest</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 200m</span>
<span class="line">      <span class="token key atrule">memory</span><span class="token punctuation">:</span> 256Mi</span>
<span class="line">    <span class="token key atrule">type</span><span class="token punctuation">:</span> Container</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cache-configuration" tabindex="-1"><a class="header-anchor" href="#cache-configuration"><span>Cache Configuration</span></a></h3>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># redis-config.yaml</span></span>
<span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>config</span>
<span class="line">  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> foodhouse</span>
<span class="line"><span class="token key atrule">data</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">redis.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">    maxmemory 2gb</span>
<span class="line">    maxmemory-policy allkeys-lru</span>
<span class="line">    appendonly yes</span>
<span class="line">    appendfsync everysec</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="security-hardening" tabindex="-1"><a class="header-anchor" href="#security-hardening"><span>Security Hardening</span></a></h2>
<h3 id="pod-security-policies" tabindex="-1"><a class="header-anchor" href="#pod-security-policies"><span>Pod Security Policies</span></a></h3>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># psp.yaml</span></span>
<span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> policy/v1beta1</span>
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
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="network-security" tabindex="-1"><a class="header-anchor" href="#network-security"><span>Network Security</span></a></h3>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># network-security.yaml</span></span>
<span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1</span>
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
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="disaster-recovery" tabindex="-1"><a class="header-anchor" href="#disaster-recovery"><span>Disaster Recovery</span></a></h2>
<h3 id="backup-strategy" tabindex="-1"><a class="header-anchor" href="#backup-strategy"><span>Backup Strategy</span></a></h3>
<ol>
<li>
<p><strong>Database Backups</strong></p>
<ul>
<li>Daily full backups</li>
<li>Hourly incremental backups</li>
<li>Point-in-time recovery enabled</li>
</ul>
</li>
<li>
<p><strong>Configuration Backups</strong></p>
<ul>
<li>Kubernetes manifests</li>
<li>Terraform state</li>
<li>Environment configurations</li>
</ul>
</li>
<li>
<p><strong>Application State</strong></p>
<ul>
<li>Redis snapshots</li>
<li>File system backups</li>
<li>Log archives</li>
</ul>
</li>
</ol>
<h3 id="recovery-procedures" tabindex="-1"><a class="header-anchor" href="#recovery-procedures"><span>Recovery Procedures</span></a></h3>
<ol>
<li>
<p><strong>Full System Recovery</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Restore infrastructure</span></span>
<span class="line">terraform apply <span class="token parameter variable">-backup</span><span class="token operator">=</span>backup.tfstate</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Restore databases</span></span>
<span class="line">./restore.sh foodhouse_full_backup.sql.gz</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Restore application state</span></span>
<span class="line">kubectl apply <span class="token parameter variable">-f</span> k8s/backup/</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Partial Recovery</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Restore specific service</span></span>
<span class="line">kubectl apply <span class="token parameter variable">-f</span> k8s/backup/users/</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Restore specific database</span></span>
<span class="line">./restore.sh foodhouse_users_backup.sql.gz</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="deployment-checklist" tabindex="-1"><a class="header-anchor" href="#deployment-checklist"><span>Deployment Checklist</span></a></h2>
<h3 id="pre-deployment" tabindex="-1"><a class="header-anchor" href="#pre-deployment"><span>Pre-deployment</span></a></h3>
<ul>
<li>[ ] Review and update configuration files</li>
<li>[ ] Run automated tests</li>
<li>[ ] Check resource availability</li>
<li>[ ] Verify backup systems</li>
<li>[ ] Review security configurations</li>
</ul>
<h3 id="deployment" tabindex="-1"><a class="header-anchor" href="#deployment"><span>Deployment</span></a></h3>
<ul>
<li>[ ] Deploy infrastructure changes</li>
<li>[ ] Deploy database migrations</li>
<li>[ ] Deploy application services</li>
<li>[ ] Verify service health</li>
<li>[ ] Run smoke tests</li>
</ul>
<h3 id="post-deployment" tabindex="-1"><a class="header-anchor" href="#post-deployment"><span>Post-deployment</span></a></h3>
<ul>
<li>[ ] Monitor system metrics</li>
<li>[ ] Check error logs</li>
<li>[ ] Verify backup systems</li>
<li>[ ] Update documentation</li>
<li>[ ] Notify stakeholders</li>
</ul>
</div></template>


