import comp from "C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/dashboard.html.vue"
const data = JSON.parse("{\"path\":\"/dashboard.html\",\"title\":\"Dashboard\",\"lang\":\"en-US\",\"frontmatter\":{\"requireAuth\":true,\"title\":\"Dashboard\"},\"headers\":[{\"level\":2,\"title\":\"Quick Actions\",\"slug\":\"quick-actions\",\"link\":\"#quick-actions\",\"children\":[]},{\"level\":2,\"title\":\"Debug Information\",\"slug\":\"debug-information\",\"link\":\"#debug-information\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"dashboard.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
