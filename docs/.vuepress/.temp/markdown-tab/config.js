import { CodeTabs } from "C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "C:/Users/AJJ/Desktop/Personal/FoodHouse-CMR.github.io/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
