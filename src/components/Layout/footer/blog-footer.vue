<template>
  <!-- 最外层 div 是占位置的 -->
  <div
    v-if="route.path !== '/message/chat'"
    class="footer_box flex flex-col items-center justify-center"
  >
    <!-- eslint-disable-next-line -->
<!--    <div class="footer-color">&copy 冒泡的博客 2023</div>-->
<!--    <a class="footer-color change-color mt-[5px]" href="http://beian.miit.gov.cn/" target="_blank"-->
<!--      >沪ICP备19003704号</a-->
<!--    >-->
      <p>
          Copyright 2020-2025 @冒泡的博客  <a href="https://beian.miit.gov.cn" target="_blank"> 沪ICP备19003704号</a>
      </p>
    <div class="footer-color mt-[5px] flex justify-center flex-wrap">
      <a
        class="p-[3px]"
        href="https://vuejs.org/"
        target="_blank"
      >
        <img
          src="https://img.shields.io/badge/Vue3.5.17-Vite-yellow"
          alt=""
      /></a>
      <a class="p-[3px]" href="https://cn.element-plus.org/zh-CN/" target="_blank">
        <img
          src="https://img.shields.io/badge/ElementPlus-UI-blue"
          alt=""
      /></a>
      <a class="p-[3px]" href="https://spring.io/projects/spring-cloud-alibaba" target="_blank">
        <img src="https://img.shields.io/badge/SpringCloud-Alibaba-green" alt="" />
      </a>
      <a class="p-[3px]" href="https://www.elastic.co/cn/" target="_blank">
        <img
          src="https://img.shields.io/badge/ElaticSearch-ELK-violet"
          alt=""
        />
      </a>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style lang="scss" scoped>
.footer-color {
  color: var(--font-color);
  text-align: center;
}

.change-color {
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    color: var(--global-black);
  }
}
</style>
