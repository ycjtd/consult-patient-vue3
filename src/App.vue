<script setup lang="ts">
import { Button } from 'vant'
</script>

<template>
  <div>
    <h1>Hello World!</h1>
    <Button type="primary">点我提交</Button>
    <div class="main">main</div>
    <div class="footer">footer</div>
  </div>
</template>

<style scoped lang="scss">
.main {
  color: var(--cp-primary);
  background-color: var(--footer-color);
}

.footer {
  color: var(--main-color);
  background-color: var(--footer-color);
}
</style>
