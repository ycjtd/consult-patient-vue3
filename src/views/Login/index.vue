<template>
  <div class="login">
    <cp-nav-bar @click-right="fn" title="登录" right-text="注册"></cp-nav-bar>
  </div>
</template>

<script setup lang="ts">
const fn = () => {
  console.log('触发了')
}
</script>

<style scoped lang="scss"></style>
