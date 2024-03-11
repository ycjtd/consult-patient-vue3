import { useUserStore } from '@/stores'
import axios from 'axios'

const instance = axios.create({
  // 1.基准地址 超时时间
  baseURL: 'https://consult-app.itheima.net/',
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    // 2.携带token
    const store = useUserStore()
    if (store.user?.token) {
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // 处理业务逻辑
    // 摘取核心响应数据
    return res
  },
  (err) => {
    // 处理401错误
    return Promise.reject(err)
  }
)

export default instance
