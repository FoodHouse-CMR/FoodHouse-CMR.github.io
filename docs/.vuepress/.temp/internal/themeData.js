export const themeData = JSON.parse("{\"logo\":\"https://vuejs.press/images/hero.png\",\"navbar\":[\"/get-started\",{\"text\":\"Explore\",\"children\":[{\"text\":\"Getting Started\",\"children\":[{\"text\":\"System Overview\",\"link\":\"/system-overview\"},{\"text\":\"Architecture\",\"link\":\"/architecture\"},{\"text\":\"Development\",\"link\":\"/development\"}]},{\"text\":\"Technical Documentation\",\"children\":[{\"text\":\"API Documentation\",\"link\":\"/api-documentation\"},{\"text\":\"Database Schema\",\"link\":\"/database-schema\"},{\"text\":\"Configuration\",\"link\":\"/configuration\"}]},{\"text\":\"Operations\",\"children\":[{\"text\":\"Deployment\",\"link\":\"/deployment\"},{\"text\":\"Testing\",\"link\":\"/testing\"},{\"text\":\"Security\",\"link\":\"/security\"},{\"text\":\"Troubleshooting\",\"link\":\"/troubleshooting\"}]},{\"text\":\"Contributing\",\"children\":[{\"text\":\"Contributing Guide\",\"link\":\"/contributing\"}]}]}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebar\":\"heading\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
