import comp from "C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/READMEOld.html.vue"
const data = JSON.parse("{\"path\":\"/READMEOld.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":1748538027000,\"contributors\":[{\"name\":\"andojoks\",\"username\":\"andojoks\",\"email\":\"andojoks@gmail.com\",\"commits\":1,\"url\":\"https://github.com/andojoks\"}],\"changelog\":[{\"hash\":\"0c18329e2329d4cf0bbb682bec277fd741fa4289\",\"time\":1748538027000,\"email\":\"andojoks@gmail.com\",\"author\":\"andojoks\",\"message\":\"added global authentication\"}]},\"filePathRelative\":\"READMEOld.md\"}")
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
