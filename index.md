---
layout: home

title: QueryPHP
titleTemplate: High performance PHP progressive framework

hero:
  name: QueryPHP
  text: High performance PHP progressive framework.
  tagline: QueryPHP is a modern, high performance PHP progressive framework, to provide a stable and reliable high-quality enterprise level framework as its historical mission.USE LEEVEL DO BETTER.
  image:
    src: /hero-old.png
    alt: Vite
  actions:
    - theme: brand
      text: 开始
      link: /guide/
    - theme: alt
      text: 为什么选 QueryPHP？
      link: /guide/
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/hunzhiwange/queryphp

features:
  - icon: 🟢
    title: Query the endless software world
    details: is complex enough
  - icon: 🔵
    title: But yet
    details: This is not what we want
  - icon: 🟣
    title: We just want to write code
    details: simply and happily
  - icon: ⚫️
    title: Production-ready
    details: 
  - icon: ⚪️
    title: Simple high performance routing
    details: 
  - icon: 🟤
    title: Expressive template engine
    details: 
  - icon: 🔴
    title: Powerful ORM based on domain driven design
    details:
  - icon: 🟠
    title: High quality code and high coverage unit testing
    details:
  - icon: 🟡
    title: USE LEEVEL DO BETTER.
    details:
---

<script setup>
import { onMounted } from 'vue'
import { fetchReleaseTag } from './.vitepress/utils/fetchReleaseTag.js'

onMounted(() => {
  fetchReleaseTag()
})
</script>