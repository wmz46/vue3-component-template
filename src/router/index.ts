import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { DefineComponent } from 'vue'
import Layout from '@/layout/index.vue'
// import NotFound from '../components/NotFound/index.vue'
const routes: RouteRecordRaw[] = [
  // { path: '/', redirect: '/HelloWorld' }
  { path:'/Layout' ,component:Layout }
  // { path: '/:pathMatch(.*)*', component:NotFound }
]

const components1 = import.meta.globEager('../views/*.vue')
const components2 = import.meta.globEager('../views/*/index.vue')
for (const path in components1) {
  const name = `${path.match(/^\.\.\/views\/(.+)\.vue/)?.[1]}`
  const url = name == 'Index' ? '/' : `/${name}`
  if (routes.findIndex(m => m.path == url) > -1) {
    continue
  }
  const component = components1[path].default as DefineComponent
  routes.push({
    path: url,
    name: name,
    component: component
  })
}
for (const path in components2) {
  const name = path.match(/^\.\.\/views\/(.+)\/index\.vue/)?.[1]
  const url = name == 'Index' ? '/' : `/${name}`
  if (routes.findIndex(m => m.path == url) > -1) {
    continue
  }
  const component = components2[path].default as DefineComponent
  routes.push({
    path: url,
    name: name,
    component: component
  })
}
const router = createRouter({
  routes,
  history: createWebHashHistory()
})
export default router