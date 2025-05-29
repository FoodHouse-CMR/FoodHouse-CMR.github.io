import comp from "C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/docs/.vuepress/.temp/pages/get-started.html.vue"
const data = JSON.parse("{\"path\":\"/get-started.html\",\"title\":\"Get Started\",\"lang\":\"en-US\",\"frontmatter\":{\"requireAuth\":true,\"title\":\"Get Started\"},\"headers\":[{\"level\":2,\"title\":\"Pages\",\"slug\":\"pages\",\"link\":\"#pages\",\"children\":[]},{\"level\":2,\"title\":\"Content\",\"slug\":\"content\",\"link\":\"#content\",\"children\":[]},{\"level\":2,\"title\":\"Configuration\",\"slug\":\"configuration\",\"link\":\"#configuration\",\"children\":[]},{\"level\":2,\"title\":\"Layouts and customization\",\"slug\":\"layouts-and-customization\",\"link\":\"#layouts-and-customization\",\"children\":[]}],\"git\":{\"updatedTime\":1748299561000,\"contributors\":[{\"name\":\"andojoks\",\"username\":\"andojoks\",\"email\":\"andojoks@gmail.com\",\"commits\":1,\"url\":\"https://github.com/andojoks\"}],\"changelog\":[{\"hash\":\"ae1c11349aa2c2d0dd55cd005d516d5a713f542c\",\"time\":1748299561000,\"email\":\"andojoks@gmail.com\",\"author\":\"andojoks\",\"message\":\"initial commit\"}]},\"filePathRelative\":\"get-started.md\"}")
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
