export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/api-documentation.html", { loader: () => import(/* webpackChunkName: "api-documentation.html" */"C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/api-documentation.html.js"), meta: {"title":"API Documentation"} }],
  ["/architecture.html", { loader: () => import(/* webpackChunkName: "architecture.html" */"C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/architecture.html.js"), meta: {"title":"Architecture Guide"} }],
  ["/configuration.html", { loader: () => import(/* webpackChunkName: "configuration.html" */"C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/configuration.html.js"), meta: {"title":"Configuration Guide"} }],
  ["/contributing.html", { loader: () => import(/* webpackChunkName: "contributing.html" */"C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/contributing.html.js"), meta: {"title":"Contributing Guide"} }],
  ["/database-schema.html", { loader: () => import(/* webpackChunkName: "database-schema.html" */"C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/database-schema.html.js"), meta: {"title":"Database Schema"} }],
  ["/deployment.html", { loader: () => import(/* webpackChunkName: "deployment.html" */"C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/deployment.html.js"), meta: {"title":"Deployment Guide"} }],
  ["/development.html", { loader: () => import(/* webpackChunkName: "development.html" */"C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/development.html.js"), meta: {"title":"Development Guide"} }],
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":"Get Started"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"FoodHouse Documentation"} }],
  ["/security.html", { loader: () => import(/* webpackChunkName: "security.html" */"C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/security.html.js"), meta: {"title":"Security Guide"} }],
  ["/system-overview.html", { loader: () => import(/* webpackChunkName: "system-overview.html" */"C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/system-overview.html.js"), meta: {"title":"System Overview"} }],
  ["/testing.html", { loader: () => import(/* webpackChunkName: "testing.html" */"C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/testing.html.js"), meta: {"title":"Testing Guide"} }],
  ["/troubleshooting.html", { loader: () => import(/* webpackChunkName: "troubleshooting.html" */"C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/troubleshooting.html.js"), meta: {"title":"Troubleshooting Guide"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
