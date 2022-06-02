import { createRouter,createWebHashHistory } from 'vue-router'
import HelloWorld from '../views/HelloWorld/index.vue'
// import NotFound from '../components/NotFound/index.vue'
const routes = [
  { path:'/',redirect:'/HelloWorld' },
  { path:'/HelloWorld',component:HelloWorld }
  // { path: '/:pathMatch(.*)*', component:NotFound }
]
const router = createRouter({
  routes,
  history:createWebHashHistory()
})
export default router