import { createRouter,createWebHashHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
const routes = [
  { path:'/',redirect:'/HelloWorld' },
  { path:'/HelloWorld',component:HelloWorld }

]
const router = createRouter({
  routes,
  history:createWebHashHistory()
})
export default router