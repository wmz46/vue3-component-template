import { App } from 'vue'
// 使用同步方法
const components1 = import.meta.globEager('../components/*.vue')
const components2 = import.meta.globEager('../components/*/index.vue')
// 自动导入当前文件夹下的所有自定义组件
export default (app:App<Element>):void => {
  for (const path in components1) {
    const component = components1[path].default
    // 如果组件未定义名称，则根据文件名命名
    const name = component.name || path.match(/^\.\.\/components\/(.+)\.vue/)?.[1]
    app.component(name,component)
  }
  for (const path in components2) {
    const component = components2[path].default
    // 如果组件未定义名称，则根据文件夹名称命名
    const name = component.name || path.match(/^\.\.\/components\/(.+)\/index\.vue/)?.[1]
    app.component(name,component)
  }
}