import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { resolve } from 'path'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default defineUserConfig({
  lang: 'en-US',

  title: 'Food House',
  description: 'A specialized e-commerce platform connecting farmers and buyers',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',
    navbar: [
      '/get-started',
      {
        text: "Explore",
        children: [
          {
            text: "Getting Started",
            children: [
              { text: "System Overview", link: "/system-overview" },
              { text: "Architecture", link: "/architecture" },
              { text: "Development", link: "/development" }
            ]
          },
          {
            text: "Technical Documentation",
            children: [
              { text: "API Documentation", link: "/api-documentation" },
              { text: "Database Schema", link: "/database-schema" },
              { text: "Configuration", link: "/configuration" }
            ]
          },
          {
            text: "Operations",
            children: [
              { text: "Deployment", link: "/deployment" },
              { text: "Testing", link: "/testing" },
              { text: "Security", link: "/security" },
              { text: "Troubleshooting", link: "/troubleshooting" }
            ]
          },
          {
            text: "Contributing",
            children: [
              { text: "Contributing Guide", link: "/contributing" }
            ]
          }
        ]
      }
    ],
  }),

  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          '@auth': resolve(__dirname, './auth'),
          '@components': resolve(__dirname, './components'),
          '@composables': resolve(__dirname, './composables'),
          '@middleware': resolve(__dirname, './middleware'),
          '@stores': resolve(__dirname, './stores')
        }
      }
    }
  }),

  plugins: [
    mdEnhancePlugin({
      // Enable plantuml
      plantuml: true,
    }),
  ],
})
