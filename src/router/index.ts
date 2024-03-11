import { createRouter, createWebHistory } from 'vue-router'

// 如何得到路由实例 createRouter()
// 如何设置路由模式 history
// history模式 createWebHistory()
// hash模式 createWebHashHistory()
const router = createRouter({
  // 默认参数 '/' 路由的基础路由
  // import.meta.env.BASE_URL
  // import.meta JavaScript模块暴露的描述模块的信息对象
  // env.BASE_URL 是Vite环境变量
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
