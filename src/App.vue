<template>
  <div>
    <h1>{{ store.user }}</h1>
    <Button
      type="primary"
      @click="
        store.setUser({
          id: '1',
          avatar: '1',
          token: '1',
          mobile: '1',
          account: '1'
        })
      "
      >登录</Button
    >
    <Button type="primary" @click="store.delUser()">退出</Button>
    <Button type="primary" @click="getUser">获取用户信息</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'vant'
import { useUserStore } from './stores'
import axios from './utils/request'

const store = useUserStore()

const getUser = () => {
  axios.request({
    url: 'patient/myUser',
    method: 'get'
  })
}
</script>

<style scoped lang="scss"></style>
