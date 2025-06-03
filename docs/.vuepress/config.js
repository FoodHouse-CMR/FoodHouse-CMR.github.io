import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { resolve } from 'path'

export default defineUserConfig({
  lang: 'en-US',

  title: 'VuePress',
  description: 'My first VuePress Site',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',
    navbar: ['/get-started'],
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
  })
})
