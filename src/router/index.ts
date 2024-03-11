import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false
})

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
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue'),
          meta: { title: '消息中心' }
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: { title: '个人中心' }
        }
      ]
    }
  ]
})

// 导航守卫
router.beforeEach((to) => {
  NProgress.start()
  const store = useUserStore()
  // 白名单
  const whiteList = ['/login']
  // 如果没有token并且不在白名单中，重定向到登录
  if (!store.user?.token && !whiteList.includes(to.path)) return '/login'
})

// 后置守卫
router.afterEach((to) => {
  document.title = `${to.meta.title || ''}-优医问诊`
  NProgress.done()
})
export default router
