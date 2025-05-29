import comp from "C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/profile copy.html.vue"
const data = JSON.parse("{\"path\":\"/profile%20copy.html\",\"title\":\"User Profile\",\"lang\":\"en-US\",\"frontmatter\":{\"requireAuth\":true,\"title\":\"User Profile\"},\"headers\":[],\"git\":{},\"filePathRelative\":\"profile copy.md\"}")
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
