import comp from "C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/admin copy.html.vue"
const data = JSON.parse("{\"path\":\"/admin%20copy.html\",\"title\":\"Admin Panel\",\"lang\":\"en-US\",\"frontmatter\":{\"requireRole\":[\"admin\"],\"title\":\"Admin Panel\"},\"headers\":[],\"git\":{},\"filePathRelative\":\"admin copy.md\"}")
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
