import { createApp } from 'vue'
import { createPinia } from 'pinia'
import presist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import 'vant/lib/index.css' // 在main.css之前引入 后面需要覆盖vant的样式
import './styles/main.scss'

const app = createApp(App)

app.use(createPinia().use(presist))
app.use(router)

app.mount('#app')
