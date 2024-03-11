<template>
  <div class="cp-nav-bar">
    <van-nav-bar
      fixed
      left-arrow
      :title="title"
      :right-text="rightText"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
// 1.通过props实现标题和右侧文字的设置
defineProps<{
  title?: string
  rightText?: string
}>()  // definePropsAPI是一个函数，它的返回值就是父亲传来的属性。

// 2.使用emit函数来触发自定义事件（点击右侧文字按钮）
const emit = defineEmits<{
  (e:'click-right'):void
}>()
const onClickRight = () => {
  emit('click-right')
}

const router = useRouter()
// 3.回退，监听箭头的点击事件按条件进行跳转
const onClickLeft = () => {
  if(history.state?.back){
    router.back()
  }else {
    router.push('/')
  }
}
</script>

<style scoped lang="scss">
:deep() {
  .van-nav-bar {
    &__arrow {
      color: var(--cp-text1);
      font-size: 18px;
    }
    &__title {
      font-size: 15px;
    }
  }
}
</style>import type { useRouter } from 'vue-router';
import type { useRouter } from 'vue-router';
import type { useRouter } from 'vue-router';

