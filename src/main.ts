import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import router from './router/index'
import direct from '@/directive/index'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
// 注入自定义指令
direct(app)
app.use(router)
app.use(ElementPlus,{
  locale: zhCn
})
app.mount('#app')
