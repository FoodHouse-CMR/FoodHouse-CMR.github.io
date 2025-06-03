<!-- .vuepress/layouts/Layout.vue -->
<template>
  <ParentLayout>
    <template #navbar-after>
        <Auth />
    </template>
  </ParentLayout>
</template>

<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import Auth from '@components/Auth.vue'
</script>
