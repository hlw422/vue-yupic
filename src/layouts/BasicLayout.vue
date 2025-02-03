<template>
    <div id="basicLayout">
      <a-layout style="min-height: 100vh">
        <a-layout-header class="header">
            <GlobalHeader/>
        </a-layout-header>
        <a-layout-content class="conent">
            <RouterView></RouterView>
        </a-layout-content>
        <a-layout-footer class="footer">
           <a href="https://github.com/lwh2015">copyright © {{date.getFullYear()}}</a>
        </a-layout-footer>
      </a-layout>
    </div>
  </template>
  
  <script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue';

   const date=new Date();
</script>
  

<style scoped>
  #basicLayout .footer {
    text-align: center;
    background-color: #f5f5f5;
    padding: 10px;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
  }
  #basicLayout .conent {
    background: linear-gradient(to right, #f5f5f5, #fff);
    padding: 20px;
    margin-bottom: 28px;
  }
  #basicLayout .header {
    padding-inline: 20px;
    margin-bottom: 16px;
    color:unset;
    background-color: #fff;
  }
</style>