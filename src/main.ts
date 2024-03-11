import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'

import 'vant/lib/index.css' // 在main.css之前引入 后面需要覆盖vant的样式
import './styles/main.scss'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
