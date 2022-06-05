import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from '@/store'
import router from './router/index'
import direct from '@/directive/index'
import components from './components'
import './assets/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'

const app = createApp(App)
// 注入pinia
app.use(pinia)
app.use(ElementPlus)
// 注入自定义指令
app.use(direct)
// 注入公共组件
app.use(components)
// 注入路由
app.use(router)
// 挂载
app.mount('#app')
