<template>
  <div id="app">
    <a-locale-provider :locale="zhCN">
      <BasicLayout />
    </a-locale-provider>
  </div>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import BasicLayout from "@/layouts/BasicLayout.vue";
/*
import { healthCheckUsingGet } from '@/api/healthController';
healthCheckUsingGet().then((res) => {
  console.log(res)
})
  */
</script>
