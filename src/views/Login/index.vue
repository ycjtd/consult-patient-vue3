<template>
  <div class="home">
    <Button>d</Button>
    <van-radio-group v-model="checked">
      <van-radio name="1">单选框 1</van-radio>
      <van-radio name="2">单选框 2</van-radio>
    </van-radio-group>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home {
  color: red;
}
</style>
