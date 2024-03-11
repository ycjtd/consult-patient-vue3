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
    <Button type="primary" @click="login">接口登录</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'vant'
import { useUserStore } from './stores'
import { request } from './utils/request'

const store = useUserStore()

const getUser = () => {
  request('patient/myUser', 'get', { test: 1 })
}

const login = () => {
  request('login/password', 'POST', {
    mobile: '13211112222',
    password: 'abc12345'
  })
    .then((res) => {
      console.log('登录成功', res)
    })
    .catch((err) => {
      console.log('失败', err)
    })
}
</script>

<style scoped lang="scss"></style>
import type axios from 'node_modules/axios/index.cjs';
