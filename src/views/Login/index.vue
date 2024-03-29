<template>
  <div class="login-page">
    <cp-nav-bar
      right-text="注册"
      @click-right="$router.push('/register')"
    ></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;">
        <span @click="isPass = !isPass">{{
          isPass ? '短信验证码登录' : '密码登录'
        }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" @submit="onSubmit" ref="form">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        type="tel"
        v-model="mobile"
        :rules="mobileRules"
      ></van-field>
      <van-field
        v-if="isPass"
        placeholder="请输入密码"
        :type="isShow ? 'text' : 'password'"
        v-model="password"
        :rules="passwordRules"
      >
        <template #button>
          <cp-icon
            :name="`login-eye-${isShow ? 'on' : 'off'}`"
            style="margin-right: 10px"
            @click="isShow = !isShow"
          ></cp-icon>
        </template>
      </van-field>
      <van-field
        v-else
        placeholder="短信验证码"
        v-model="code"
        :rules="codeRules"
      >
        <template #button>
          <span
            class="btn-send"
            :class="{ active: time > 0 }"
            @click="onSend"
            >{{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}</span
          >
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { showToast, showSuccessToast } from 'vant'
import { loginByPassword, sendMobileCode, loginByMobile } from '@/services/user'
import { useUserStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'

const mobile = ref('')
const password = ref('')
const agree = ref(false)

const store = useUserStore()
const router = useRouter()
const route = useRoute()
const onSubmit = async () => {
  // 手机号和密码验证成功后点击登录按钮触发
  // 在这里验证是否勾选了已经同意协议
  if (!agree.value) return showToast('请勾选协议')
  //  进行登录(合并短信登录)
  const res = isPass.value
    ? await loginByPassword(mobile.value, password.value)
    : await loginByMobile(mobile.value, code.value)
  store.setUser(res.data) // 存储用户信息
  console.log('route.query.returnUrl', route.query.returnUrl)
  // 如果有回跳地址就进行回跳，没有跳转到个人中心
  router.push((route.query.returnUrl as string) || '/user')
  showSuccessToast('登录成功')
}

// 短信登录界面切换
const isPass = ref(true)
const code = ref('')

// 发送短信验证码
const time = ref(0)
const form = ref()
let timer: any
const onSend = async () => {
  // 验证:倒计时 手机号
  if (time.value > 0) return
  // TODO 发送验证码之前校验手机号是否正确
  // await form.value?.validate('mobile')
  await sendMobileCode(mobile.value, 'login')
  showToast('发送成功')
  time.value = 60
  // 开启倒计时
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    time.value--
    if (time.value <= 0) clearInterval(timer)
  }, 1000)
}

onUnmounted(() => {
  clearInterval(timer)
})

// 密码的可见与不可见
const isShow = ref(false)
</script>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
